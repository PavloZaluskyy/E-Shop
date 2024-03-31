import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../pages/models/cart.model';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../pages/models/client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, DoCheck {
  private _cart: Cart = {items: []};
  itemsQuantity = 0;
  client: Client | null;
  @Input() 
    get cart (): Cart {
    return this._cart;
    }
    set cart(cart: Cart) {
      this._cart = cart;
      this.itemsQuantity = cart.items.length;
        // .map(item => item.quantity)
        // .reduce((prev, curr) => prev + curr, 0);
    }
  constructor (private _cartService: CartService, 
               private router: Router, 
               private _clientService: ClientService,
               private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    console.log(this._clientService.client)
    // if(this._clientService.client) {
    //   this.client = this._clientService.client;
    // }
  }

  ngDoCheck() {
    if(this._clientService.client) {
      this.client = this._clientService.client;
    } else this.client = null;
  }

  onSignOut() {
    if (this.client){
      this.router.navigate(['/signIn'])
      this._snackBar.open(`Bye ${this.client.name}`, "OK", {duration: 3000});
      this.cart = {items: []};
      this._clientService.onSignOut();
    }
    
  }

    getTotal(items: CartItem[]): number {
      return this._cartService.getTotal(items);
    }

    onClearCart() {
      this._cartService.clearCart()
    }

}
