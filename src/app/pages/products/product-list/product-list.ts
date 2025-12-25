import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { ProductService } from '../../../core/services/product';
import { Product } from '../../../models/product';

type ProductsResponse = { products: Product[]; total: number; skip: number; limit: number };

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductsListComponent {
  products$!: Observable<ProductsResponse>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
  }
}