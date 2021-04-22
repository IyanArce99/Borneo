import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../models/contact';
import { GLOBAL } from '../../services/global';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

var moment = require('moment');
var current_timestamp = moment().format("YYYY/MM/DD hh:mm:ss");

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
  providers: [ContactService]
})
export class SubmitComponent {
  public contacto: Contact;

  contactForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    asunto: new FormControl(''),    
    mensaje: new FormControl(''),
    fecha: new FormControl(current_timestamp),
  });

  constructor(private toastr: ToastrService,private _route:ActivatedRoute,private _router:Router, private _contactService: ContactService, private fb: FormBuilder) { 
  }

  onSubmit(){
    this._contactService.addContact(this.contactForm.value).subscribe(
      result => {
        this.contactForm=result;
      },
      error => {
          console.log(<any>error);
      }
    );

    this.contactForm.reset();
    this.toastr.success('Mensaje enviado correctamente, Gracias','',{ "positionClass" : "toast-bottom-right"});
  }

}
