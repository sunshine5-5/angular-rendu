import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

type ProductsResponse = { products: Product[]; total: number; skip: number; limit: number };

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.baseUrl}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  createProduct(payload: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products/add`, payload);
  }

  updateProduct(id: number, payload: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${id}`, payload);
  }

  deleteProduct(id: number): Observable<{ id: number; isDeleted: boolean }> {
    return this.http.delete<{ id: number; isDeleted: boolean }>(`${this.baseUrl}/products/${id}`);
  }
}
