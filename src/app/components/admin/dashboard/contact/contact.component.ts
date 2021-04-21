import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../../../services/contact.service';
import {Contact} from '../../../../models/contact';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  public contactos:Array<Contact>;
  
  constructor(private _route:ActivatedRoute,private _router:Router, 
    private _contactoService: ContactService) {}

  ngOnInit() {
    this.getContact();
  }

  getContact(){
    this._contactoService.getContact().subscribe(
        result => {
            this.contactos = result;
        },
        error => {
            console.log(<any>error);
        }
    );
  }

}
