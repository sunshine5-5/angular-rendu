import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import { ProductService } from '../../../core/services/product';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],

  templateUrl: './product-create.html'
})
export class ProductCreateComponent implements OnInit {
  loading = false;
  error = '';

  
  form!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation après injection
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: [0, [Validators.required, Validators.min(0)]],
      brand: [''],
      category: [''],
      thumbnail: ['']
    });
  }

  //  Création du produit
  create(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const payload: Partial<Product> = this.form.getRawValue();

    this.productService.createProduct(payload).subscribe({
      next: (created: Product) => {
        this.loading = false;
        this.router.navigate(['/products', created.id]);
      },
      error: () => {
        this.loading = false;
        this.error = 'Erreur lors de la création du produit.';
      }
    });
  }
}
