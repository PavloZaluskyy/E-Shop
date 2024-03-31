import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from './pages/models/cart.model';
import { CartService } from './services/cart.service';
import { LocalStorageService } from './services/local-storage.service';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cart: Cart = { items: [] };

  constructor(private cartService: CartService,
              private _localStorage: LocalStorageService,
              private clientService: ClientService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      
    //   let locStorCl = this._localStorage.getItem('client');
    //   if (locStorCl) {
    //     let cl = JSON.parse(locStorCl);
    //     this.cart = { items: [...cl.cart]};
    //     this.cartService.cart.next({ items: [...cl.cart]})
    //     this.clientService.client = cl;
    //   }
    });
    this.onCheckSingInClient();
   console.log(this.clientService.client);
   
  }

  onCheckSingInClient(){
    let locStorCl = this._localStorage.getItem('client');
      if (locStorCl) {
        let cl = JSON.parse(locStorCl);
        this.cart = { items: [...cl.cart]};
        this.cartService.cart.next(this.cart)

        // this.cartService.cart.next(this.cart)
        this.clientService.client = cl;
      }
    };

  
}
