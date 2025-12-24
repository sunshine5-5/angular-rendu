import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api/api.config';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // GET /products
  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(`${API_URL}/products`);
  }

  // GET /products/{id}
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  // POST /products/add
  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/products/add`, product);
  }

  // PUT /products/{id}
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${API_URL}/products/${id}`, product);
  }

  // DELETE /products/{id}
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/products/${id}`);
  }
}
