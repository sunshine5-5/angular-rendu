import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css'
})
export class ProductCreateComponent {
  form!: FormGroup;   // 👈 déclaration seulement

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ fb est maintenant initialisé
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      description: ['']
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.productService.createProduct(this.form.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
