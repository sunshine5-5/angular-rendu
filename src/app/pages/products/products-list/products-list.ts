import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductService } from '../../../core/services/product';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res.products;
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }
}
