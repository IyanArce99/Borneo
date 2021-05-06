import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../models/contact';
import { GLOBAL } from '../../services/global';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  contactForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZñÑ]{3,50}$")]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
    asunto: new FormControl(''),    
    mensaje: new FormControl(''),
    fecha: new FormControl(current_timestamp),
  });

  constructor(private toastr: ToastrService,private _route:ActivatedRoute,private _router:Router, private _contactService: ContactService, private fb: FormBuilder) { 
  }

  get nombreNoValido() {
    return this.contactForm.get("nombre").invalid && this.contactForm.get("nombre").touched;
  }
  get emailNoValido() {
    return this.contactForm.get("email").invalid && this.contactForm.get("email").touched;
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
