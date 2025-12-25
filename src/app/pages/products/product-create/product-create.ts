import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from '../../../core/services/product';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './product-create.html'
})
export class ProductCreateComponent {
  loading = false;
  error = '';

  // Reactive Form
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: [0, [Validators.required, Validators.min(0)]],
    brand: [''],
    category: [''],
    thumbnail: ['']
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

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
