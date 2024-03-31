import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-profiles-client',
  templateUrl: './profiles-client.component.html',
  styleUrl: './profiles-client.component.css'
})
export class ProfilesClientComponent implements OnInit {

  client: Client;

  constructor(private _clientService: ClientService) {}

  ngOnInit(): void {
    if(this._clientService.client){
      this.client = this._clientService.client;
    }
   
  }

}
