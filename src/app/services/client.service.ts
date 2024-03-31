import { Injectable } from '@angular/core';
import { Client } from '../pages/models/client';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  /* Login and Password for test client:  emily_johnson */

  private _url: string = 'https://json-placeholder.mock.beeceptor.com/users';
  clients: Client[];
  public client: Client | null;

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this._url)
      .pipe(map(data => {
        this.clients = data;
        
        return data.map(client => {
          if(!client.password) { 
            client.password = client.username;
          }
          return client;
        });
      }))
  }

  onSignOut() {
    let createClients:string | null = this._localStorageService.getItem('CreatedClients');
    let createCls: Client[] = [];
    let client:string | null = this._localStorageService.getItem('client');
    let cl: Client;
    this._localStorageService.removeItem('client');
    if (createClients) {
      if(client)
      cl = JSON.parse(client);
      createCls = JSON.parse(createClients);
          createCls.map(clItem => {
            if(clItem.id === cl.id) {
              clItem.cart = cl.cart;
            }
          })
          console.log(createCls);
          this._localStorageService.setItem('CreatedClients', createCls)
    }
    this.client = null;

  }


  constructor(private http: HttpClient,
              private _localStorageService: LocalStorageService) { }


}
