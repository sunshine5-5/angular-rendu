import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, map, switchMap, tap } from 'rxjs';

import { ProductService } from '../../../core/services/product';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent {
  product$!: Observable<Product>;
  form: FormGroup;
  saving = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private productService: ProductService
  ) {
    

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: [0, [Validators.required, Validators.min(0)]],
      brand: [''],
      category: [''],
      thumbnail: ['']
    });

    
    this.product$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.productService.getProduct(id)),
      tap((p) => {
        
        
        this.form.patchValue({
          title: p.title,
          description: p.description,
          price: p.price,
          brand: p.brand ?? '',
          category: p.category ?? '',
          thumbnail: p.thumbnail ?? ''
        });
      })
    );
  }

  save(product: Product): void {
    if (this.form.invalid) return;

    this.saving = true;

    this.productService
      .updateProduct(product.id, this.form.getRawValue())
      .subscribe({
        next: () => {
          this.saving = false;
          alert('Produit modifié ');
        },
        error: () => {
          this.saving = false;
          alert('Erreur modification ');
        }
      });
  }

  remove(product: Product): void {
    const ok = confirm('Supprimer ce produit ?');
    if (!ok) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        alert('Produit supprimé ');
        this.router.navigateByUrl('/products');
      },
      error: () => alert('Erreur suppression ')
    });
  }
}
