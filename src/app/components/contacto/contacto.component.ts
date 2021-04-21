import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../models/contact';
import { GLOBAL } from '../../services/global';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

var moment = require('moment');
var current_timestamp = moment().format("YYYY/MM/DD hh:mm:ss");

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  providers: [ContactService]
})
export class ContactoComponent {
  public contacto: Contact;
  date=new Date();

  contactForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    asunto: new FormControl(''),    
    mensaje: new FormControl(''),
    fecha: new FormControl(current_timestamp),
  });

  constructor(private _route:ActivatedRoute,private _router:Router, private _contactService: ContactService, private fb: FormBuilder) { 
  }

  onSubmit(){
    this._contactService.addContact(this.contactForm.value).subscribe(
      result => {
        let json=JSON.stringify(result);
        console.log(current_timestamp);
        console.log(json);
      },
      error => {
          console.log(<any>error);
      }
    );
  }
}
