import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  { path: 'users', loadComponent: () => import('./pages/users/users-list/users-list').then(m => m.UsersListComponent) },
  { path: 'users/:id', loadComponent: () => import('./pages/users/user-detail/user-detail').then(m => m.UserDetailComponent) },

  { path: 'posts', loadComponent: () => import('./pages/posts/posts-list/posts-list').then(m => m.PostsListComponent) },
  { path: 'posts/:id', loadComponent: () => import('./pages/posts/post-detail/post-detail').then(m => m.PostDetailComponent) },

  { path: 'products', loadComponent: () => import('./pages/products/products-list/products-list').then(m => m.ProductsListComponent) },
  { path: 'products/new', loadComponent: () => import('./pages/products/product-create/product-create').then(m => m.ProductCreateComponent) },
  { path: 'products/:id', loadComponent: () => import('./pages/products/product-detail/product-detail').then(m => m.ProductDetailComponent) },

  { path: '**', redirectTo: 'users' }
];
