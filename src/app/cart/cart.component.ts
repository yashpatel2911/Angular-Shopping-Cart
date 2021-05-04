import { Component } from '@angular/core';
import { CartService } from '../cartService/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

// Component for Cart Display
export class CartComponent{

  // Injecting CartService Dependency
  constructor(
    private cartService: CartService
  ) {}

  // Getting Products
  items = this.cartService.getItems();

  // Calculating TotalPrice using CartService
  totalPrice = this.cartService.getTotalPrice();

  // Removing Item
  removeProduct(product: any): void{
    this.cartService.removeItem(product);
  }

  // Removing All Items
  EmptyCart(): void{
    this.cartService.clearCart()
  }

}
