import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../service/product-service';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Product } from '../models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any = null;
  form: FormGroup;
  loading = false;
  imagePreview: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService, private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({ title: [''], description: [''], price: [0], thumbnail: [''] });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (p) => {
        this.product = p;
        this.imagePreview = p['thumbnail'];
        this.form.patchValue({ title: p.title, description: p.description, price: p.price, thumbnail: p['thumbnail'] });
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.loading = false;
      },
    });
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

  save() {
    if (!this.product) return;
    const data = this.form.value as Partial<Product>;
    this.productService.updateProduct(this.product.id, data).subscribe({ next: () => alert('Saved') });
  }

  remove() {
    if (!this.product) return;
    if (!confirm('Delete product?')) return;
    this.productService.deleteProduct(this.product.id).subscribe({ next: () => this.router.navigate(['/products']) });
  }
}
