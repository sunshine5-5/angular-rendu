import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur chargement produits.';
        this.loading = false;
      }
    });
  }
}
