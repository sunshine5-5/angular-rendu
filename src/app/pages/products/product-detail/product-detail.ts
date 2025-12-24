import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  form!: FormGroup;   // 👈 déclaration seulement

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // ✅ ici fb existe
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      description: ['']
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(this.productId).subscribe(product => {
      this.form.patchValue(product);
    });
  }

  update(): void {
    this.productService
      .updateProduct(this.productId, this.form.value)
      .subscribe(() => this.router.navigate(['/products']));
  }
}
