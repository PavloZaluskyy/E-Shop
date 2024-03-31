import { Component } from '@angular/core';
import { ClientService } from '../../../../services/client.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { Client } from '../../../models/client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  isNotValid: boolean = true;
  login: string = "";
  firstName: string = "";
  lastName: string = "";
  phone: string = "";
  email: string = "";
  password: string = "";
  errMess: string = "";

  constructor(private _clientService: ClientService,
    private router: Router,
    private _localStorage: LocalStorageService,
    private _snackBar: MatSnackBar) {
  }

  showPassword(elem: any) {
    console.log(elem.type);
    if (elem.type === 'password') {
      elem.type = 'text';
    } else {
      elem.type = 'password';
    }
  }

  onSignUp() {
    console.log(this.phone);

    if (this.onValidForms()) {
      let createdClientsArr: Client[] = [];
      let a = this._localStorage.getItem('CreatedClients');
      let yourData: Client = {
        id: Date.now(),
        name: this.firstName.concat(" ", this.lastName),
        company: '',
        username: this.login,
        email: this.email,
        address: '',
        zip: '',
        state: '',
        country: '',
        phone: this.phone,
        password: this.password
      }
      console.log(a);
      if (!a) {
        createdClientsArr.push(yourData)
        this._localStorage.removeItem('CreatedClients');
        this._localStorage.setItem('CreatedClients', createdClientsArr);
        this.onSignIn(yourData);
      } else {
        createdClientsArr = JSON.parse(a);
        console.log(createdClientsArr);
        createdClientsArr.push(yourData);
        console.log(createdClientsArr);

        this._localStorage.removeItem('CreatedClients');
        this._localStorage.setItem('CreatedClients', createdClientsArr)
        this.onSignIn(yourData);
      }

      // if(this._localStorage.getItem('CreatedClients')){
      //   createdClientsArr.push(JSON.parse(this._localStorage.getItem('CreatedClients')));
      // }


    }
  }

  onSignIn(yourData: Client) {
    this.router.navigate(['/home', {user: this.login}])
    this.isNotValid = true;
    this._clientService.client = yourData;
    this._localStorage.removeItem('client');
    this._localStorage.setItem('client', yourData);
    this._snackBar.open(`Wellcome ${this.firstName}`, "OK", {duration: 3000});
  }

  onValidForms() {
    if (!this.login.trim() && this.login.length < 3) {
      this.isNotValid = false;
      this.errMess = "Create a login or longer";
      return false;
    }
    if (!this.firstName.trim()) {
      this.isNotValid = false;
      this.errMess = "Enter a First Name";
      return false;
    }
    if (!this.lastName.trim()) {
      this.isNotValid = false;
      this.errMess = "Enter a Last Name";
      return false;
    }
    if (!this.phone.trim() && !this.validatePhone(this.phone)) {
      this.isNotValid = false;
      this.errMess = "Enter a Telephone. Must contain only numbers";
      return false;
    }
    if (!this.validateEmail(this.email)) {
      this.isNotValid = false;
      this.errMess = "Enter correct E-mail";
      return false;
    }
    if (this.password.trim() && this.password.length < 3) {
      this.isNotValid = false;
      this.errMess = "Create a password or longer";
      return false;
    }
    this.isNotValid = true;
    return true;
  }

  validateEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email)
  }

  validatePhone(tel: string): boolean {
    return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(tel)
  }
}
