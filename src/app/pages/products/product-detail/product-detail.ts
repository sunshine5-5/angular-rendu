import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  loading = true;
  error = '';
  saving = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: [0, [Validators.required, Validators.min(0)]],
    brand: [''],
    category: [''],
    thumbnail: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(id).subscribe({
      next: (p) => {
        this.product = p;
        this.form.patchValue({
          title: p.title,
          description: p.description,
          price: p.price,
          brand: p.brand ?? '',
          category: p.category ?? '',
          thumbnail: p.thumbnail ?? ''
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Produit introuvable.';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (!this.product || this.form.invalid) return;

    this.saving = true;
    this.productService.updateProduct(this.product.id, this.form.value).subscribe({
      next: (updated) => {
        this.product = updated;
        this.saving = false;
        alert('Produit modifié ✅');
      },
      error: () => {
        this.saving = false;
        alert('Erreur modification ❌');
      }
    });
  }

  remove(): void {
    if (!this.product) return;
    const ok = confirm('Supprimer ce produit ?');
    if (!ok) return;

    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        alert('Produit supprimé ✅');
        this.router.navigateByUrl('/products');
      },
      error: () => alert('Erreur suppression ❌')
    });
  }
}
