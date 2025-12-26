import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../service/product-service';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Product } from '../models';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {
  form: FormGroup;
  imagePreview: string | null = null;
  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.form = this.fb.group({ title: [''], description: [''], price: [0], thumbnail: [''] });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
        this.form.patchValue({ thumbnail: this.imagePreview });
      };
      reader.readAsDataURL(file);
    }
  }

  create() {
    const data = this.form.value as Partial<Product>;
    this.productService.createProduct(data).subscribe({ next: () => this.router.navigate(['/products']) });
  }
}
