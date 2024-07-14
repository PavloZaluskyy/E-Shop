import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../models/cart.model';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Client } from '../models/client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  isSaveData: boolean = true;
  client: Client;
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    company: [''],
  });
  secondFormGroup = this._formBuilder.group({
    countryCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    addressCtrl: ['', Validators.required],
    zipCtrl: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  thirdFormGroup = this._formBuilder.group({
    numberCardCtrl: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    termCtrl: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    cvvCtrl: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
  });
  cart: CartItem[];

  constructor(private _cartService: CartService,
    private _localStorage: LocalStorageService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _formBuilder: FormBuilder){}

  ngOnInit(): void {
    this._cartService.cart.subscribe(data => {
      this.cart = data.items;
    })
    let locStorCl = this._localStorage.getItem('client');
      if (locStorCl) {
         this.client = JSON.parse(locStorCl);
         console.log(this.client);
        this.fillDataOnClient();
      }
    console.log(this.cart[0].name);
    
  }
  fillDataOnClient(){
      // this.firstFormGroup.value.name = this.client.name;
      // this.firstFormGroup.value.company = this.client.company;
      // this.firstFormGroup.value.email = this.client.email;
      // this.firstFormGroup.value.phone = this.client.phone;

      this.firstFormGroup =  this._formBuilder.group({
        name: [this.client.name, Validators.required],
        email: [this.client.email, [Validators.required, Validators.email]],
        phone: [this.client.phone, Validators.required],
        company: [this.client.company],
      });
      this.secondFormGroup =  this._formBuilder.group({
        addressCtrl: [this.client.address, Validators.required],
        countryCtrl: [this.client.country, Validators.required],
        stateCtrl: [this.client.state, Validators.required],
        zipCtrl: [this.client.zip, [Validators.required, Validators.pattern(/^\d{6}$/)]],
      });

      if(this.client.codeCard && this.client.termCard && this.client.cvv) {
        // this.thirdFormGroup.value.numberCardCtrl = this.client.payment?.codeCart;
        // this.thirdFormGroup.value.termCtrl = this.client.payment?.termCart;
        // this.thirdFormGroup.value.cvvCtrl = this.client.payment?.cvv;
        this.thirdFormGroup = this._formBuilder.group({
          numberCardCtrl: [this.client.codeCard, [Validators.required, Validators.pattern(/^\d{16}$/)]],
          termCtrl: [this.client.termCard, [Validators.required, Validators.pattern(/^\d{4}$/)]],
          cvvCtrl: [this.client.cvv, [Validators.required, Validators.pattern(/^\d{3}$/)]],
        });

      }
      console.log(this.firstFormGroup.value.name);

      
    
    // this.firstFormGroup.value.companyCtrl = this.client.company;
    // this.firstFormGroup.value.emailCtrl = this.client.email;
    // this.firstFormGroup
     
  }

  saveData(){
    if(this.isSaveData) {
      console.log(this.firstFormGroup.value.name);
      this.client.name = this.firstFormGroup.value.name || "";
      this.client.email = this.firstFormGroup.value.email || "";
      this.client.phone = this.firstFormGroup.value.phone || "";
      this.client.company = this.firstFormGroup.value.company || "";

      this.client.address = this.secondFormGroup.value.addressCtrl || "";
      this.client.country = this.secondFormGroup.value.countryCtrl || "";
      this.client.state = this.secondFormGroup.value.stateCtrl || "";
      this.client.zip = this.secondFormGroup.value.zipCtrl || "";
      
      this.client.codeCard = this.thirdFormGroup.value.numberCardCtrl || "" ;
      this.client.cvv = this.thirdFormGroup.value.cvvCtrl || "";
      this.client.termCard = this.thirdFormGroup.value.termCtrl || "";

      this._localStorage.setItem('client', this.client);
    }
  }

  sentOrder(){
    if(this.client) {
      this.saveData();
      console.log(this.cart, " ->  " ,  this.client);
      this._cartService.clearCart();
      this._snackBar.open("Еhe order has been processed!", "OK", {duration: 3000})
      this.router.navigate(['/home', {user: this.client.username}])
    } else {
      console.log("Ordering:", this.cart,)
      console.log(this.firstFormGroup.value.name, '\n', this.firstFormGroup.value.email, '\n', this.firstFormGroup.value.company, '\n', this.firstFormGroup.value.phone);
      console.log(this.secondFormGroup.value.countryCtrl, '\n', this.secondFormGroup.value.stateCtrl, '\n', this.secondFormGroup.value.addressCtrl, '\n', this.secondFormGroup.value.zipCtrl);
      console.log("CARTING ", this.thirdFormGroup.value.numberCardCtrl)
      this._cartService.clearCart();
      this._snackBar.open("Еhe order has been processed!", "OK", {duration: 3000})
      this.router.navigate(['/home'])
    }
    
  }

  getTotal(items: CartItem[]): number {
    return this._cartService.getTotal(items);
  }

}
