import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { Client } from '../models/client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  remember: boolean;
  login: string = "";
  password: string = "";
  isNotValid: boolean = true;
  forgotPass: boolean = true;
  newPassword: string = "";
  confirmPassword: string = "";
  isNotValidNewPass: boolean = true;
  isNotValidConfPass: boolean = true;
  constructor(private _clientService: ClientService, 
              private router: Router,
              private _snackBar: MatSnackBar,
              private _localStorage: LocalStorageService) {
  }
  showPassword(elem: any){
    console.log(elem.type);
    if(elem.type === 'password') {
      elem.type = 'text';
    } else {
      elem.type = 'password';
    }
  }

  onSignIn() {
    console.log(this.login);
    console.log(this.password);
    this._clientService.getAllClients()
      .subscribe(data=> {
        let createdClientsArr: Client[] = [];
        let createdClients: string | null = this._localStorage.getItem('CreatedClients');
        let cl = data.find(client => client.username === this.login && client.password === this.password);
        if(!cl?.id && createdClients) {
          createdClientsArr = JSON.parse(createdClients);
          cl = createdClientsArr.find(client => client.username === this.login && client.password === this.password);
        }
        if(cl?.id){
          this.router.navigate(['/home', {user: this.login}])
          this._snackBar.open(`Wellcome ${cl.name}`, "OK", {duration: 3000});
          this.isNotValid = true;
          this._clientService.client = cl;
          if(this.remember) {
            this._localStorage.setItem('client', cl);
          }
        }
        else {
          console.log("not sign in");
          this.isNotValid = false;
        }
      })
    
  }
  onForgotPass(){
    this.forgotPass = !this.forgotPass;
  }

  onSaveNewPass(){
    if (this.onValidNewPass()) {
      this.forgotPass = false;
      this.password = this.newPassword;
      this._clientService.getAllClients()
        .subscribe(data => {
          let cl = data.find(client => client.username === this.login)
          if(cl?.id){
            this.router.navigate(['/home', {user: this.login}])
            this.isNotValid = true;
            cl.password = this.newPassword;
            this._clientService.client = cl;
            this._localStorage.setItem('client', cl);
            
          }
          else {
            console.log("not sign in");
            this.isNotValid = false;
          }
        })
    }
  }

  onValidNewPass(): boolean{
    if(this.newPassword.trim() && this.newPassword.length > 3){
      this.isNotValidNewPass = true;
      if(this.confirmPassword.trim() && this.confirmPassword === this.newPassword){
        this.isNotValidConfPass = true;
        return true;
      } else {
        this.isNotValidConfPass = false;
      }
    } else {
      this.isNotValidNewPass = false;
    }
    
    
    return false;
  }
}
