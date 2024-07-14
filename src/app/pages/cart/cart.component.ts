import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { CartService } from '../../services/cart.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Client } from '../models/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart = {items: [{
    product: "https://via.placeholder.com/600/92c952",
    name: "Product Name",
    price: 1500,
    quantity: 125,
    id: 1
  }, {
    product: "https://via.placeholder.com/600/92c952",
    name: "Product Name",
    price: 1500,
    quantity: 125,
    id: 1
  }

]};

  displayedColumns: string[] = [
    'product',
    'name',
    'chooseDetail',
    'price',
    'quantity',
    'total',
    'action',
  ];

  dataSource: CartItem[] = [];

  constructor (private _cartService: CartService, private _localStorage: LocalStorageService, private router: Router) {}

  ngOnInit(){
    this._cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
     })
  }

  onRemoveQuantity(item: CartItem): void{this._cartService.onRemoveQuantity(item);}

  onAddQuantity(item: CartItem): void{this._cartService.addToCart(item);}

  getTotal(items: CartItem[]): number{
    return items.map(item => item.price * item.quantity)
      .reduce((prew, curr) => prew + curr, 0)
  }

  onClearCart(): void{this._cartService.clearCart()}

  onRemoveFromCart(item: CartItem): void {
    this._cartService.removeFromCart(item);
  }

  onCheckout(){
    this.router.navigate(['/order']);
  }

}
