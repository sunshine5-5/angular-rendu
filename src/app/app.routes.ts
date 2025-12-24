import { Routes } from '@angular/router';

// USERS
import { UsersListComponent } from './pages/users/users-list/users-list';
import { UserDetailComponent } from './pages/users/user-detail/user-detail';

// POSTS
import { PostsListComponent } from './pages/posts/posts-list/posts-list';
import { PostDetailComponent } from './pages/posts/post-detail/post-detail';

// PRODUCTS
import { ProductsListComponent } from './pages/products/products-list/products-list';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail';
import { ProductCreateComponent } from './pages/products/product-create/product-create';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  // USERS
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailComponent },

  // POSTS
  { path: 'posts', component: PostsListComponent },
  { path: 'posts/:id', component: PostDetailComponent },

  // PRODUCTS
  { path: 'products', component: ProductsListComponent },
  { path: 'products/new', component: ProductCreateComponent },
  { path: 'products/:id', component: ProductDetailComponent },

  // Fallback
  { path: '**', redirectTo: 'users' }
];
