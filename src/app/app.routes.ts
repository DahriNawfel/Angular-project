import { Routes } from '@angular/router';
import { User } from './user/user';
import { UserDetail } from './user/user-detail';
import { Posts } from './post/posts';
import { PostDetail } from './post/post-detail';
import { ProductList } from './product/product-list';
import { ProductDetail } from './product/product-detail';
import { ProductCreate } from './product/product-create';

export const routes: Routes = [
	{ path: '', redirectTo: 'users', pathMatch: 'full' },
	{ path: 'users', component: User },
	{ path: 'users/:id', component: UserDetail },
	{ path: 'posts', component: Posts },
	{ path: 'posts/:id', component: PostDetail },
	{ path: 'products', component: ProductList },
	{ path: 'products/new', component: ProductCreate },
	{ path: 'products/:id', component: ProductDetail },
];
