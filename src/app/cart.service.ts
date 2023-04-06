import { HttpClient } from '@angular/common/http';
import { Product, CartProduct } from './products';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: CartProduct[] = [];
  total: number = 0; // Agregar la variable total y su valor inicial

  constructor(private http: HttpClient) {}

  addToCart(product: Product) {
    let cartProduct = this.items.find((item) => item.id === product.id);
    if (cartProduct) {
      cartProduct.quantity++;
    } else {
      this.items.push({
        ...product,
        quantity: 1,
      });
    }
    this.updateTotal(); // Actualizar el total después de agregar un producto
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.updateTotal(); // Actualizar el total después de limpiar el carrito
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }

  setTotal(total: number) {
    // Agregar la función setTotal
    this.total = total;
  }

  getTotal() {
    // Agregar la función getTotal
    return this.total;
  }

  private updateTotal() {
    // Actualizar el total
    this.total = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
