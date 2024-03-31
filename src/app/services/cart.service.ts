import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../pages/models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from './local-storage.service';
import { Client } from '../pages/models/client';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({items: []})

  constructor(private _snackBar: MatSnackBar, private _localStorage: LocalStorageService) { }

  addToCart(item: any): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find(_item => _item.id === item.id);
    this._snackBar.open("The one product added to cart!", "OK", {duration: 3000});
    if(itemInCart){
      itemInCart.quantity += 1;
    } else {
      items.push(item);
      this.cart.next({items});
    }
    this.onAddtoCartInUpdateLocalStore(item);
  }

  onAddtoCartInUpdateLocalStore(item: any){
    // let createClients:string | null = this._localStorage.getItem('CreatedClients');
    // let createCls: Client[] = [];
    let client:string | null = this._localStorage.getItem('client');
    let cl: Client;
    if(client) {
      cl = JSON.parse(client);
      const itemInCart = cl.cart?.find(_item => _item.id === item.id);
      if(itemInCart){
        itemInCart.quantity += 1;
      } else {
        cl.cart?.push(item);
      }
      console.log(this.cart.value);
      console.log(cl);
      this._localStorage.setItem('client', cl)
      // if (createClients) {
      //   createCls = JSON.parse(createClients);
      //   createCls.map(clItem => {
      //     if(clItem.id === cl.id) {
      //       clItem.cart = cl.cart;
      //     }
      //   })
      //   console.log(createCls);
      //   this._localStorage.setItem('CreatedClients', createCls)
        
      // }
    }
  } 

  onClearCardInLocalStor() {
    // let createClients:string | null = this._localStorage.getItem('CreatedClients');
    // let createCls: Client[] = [];
    let client:string | null = this._localStorage.getItem('client');
    let cl: Client;
    if(client) {
      cl = JSON.parse(client);
      cl.cart = [];
      this._localStorage.setItem('client', cl);
      // if (createClients) {
      //   createCls = JSON.parse(createClients);
      //   createCls.map(clItem => {
      //     if(clItem.id === cl.id) {
      //       clItem.cart = [];
      //     }
      //   })
      //   console.log(createCls);
      //   this._localStorage.setItem('CreatedClients', createCls)
      // }
    } else {
      this.cart.next({items: []})
    }
  }

  // onRemoveQuantityInLocalStor(item: any){
  //   let client:string | null = this._localStorage.getItem('client');
  //   let cl: Client;
  //   if(client) {
  //     cl = JSON.parse(client);
  //   }
  // }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  onRemoveQuantity(item: any):void {
      // let createClients:string | null = this._localStorage.getItem('CreatedClients');
      // let createCls: Client[] = [];
      let itemForRemoval!: CartItem;
      let client:string | null = this._localStorage.getItem('client');
      let cl: Client;
       
        let filteredItems = this.cart.value.items.map((_item) => {
          if (_item.id === item.id) {
            _item.quantity--;
            console.log(_item);
            
            if (_item.quantity === 0) {
              itemForRemoval = _item;
            }
          }
    
          return _item;
        });
        if (itemForRemoval) {
          filteredItems = this.removeFromCart(itemForRemoval, false);
        }
        
        
      this.cart.next({ items: filteredItems });
      if(client) {
        cl = JSON.parse(client);
        cl.cart = filteredItems;
        console.log(this.cart.value.items);
        this._localStorage.setItem('client', cl)
      //   if (createClients) {
      //     createCls = JSON.parse(createClients);
      //     createCls.map(clItem => {
      //       if(clItem.id === cl.id) {
      //         clItem.cart = cl.cart;
      //       }
      //     })
      //     console.log(createCls);
      //     this._localStorage.setItem('CreatedClients', createCls)
      // }
      
      }
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
      
  
     
  
      
      // this.onRemoveQuantityInLocalStor(item);
    }
    
  clearCart(): void {
    this.cart.next({ items: [] });
    this.onClearCardInLocalStor();
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
  }

  removeFromCart(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }
}
