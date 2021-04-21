import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PropiedadService} from '../../../../services/propiedad.service';
import {Owned} from '../../../../models/owned';
import { GLOBAL } from '../../../../services/global';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-administrar-propiedades',
  templateUrl: './administrar-propiedades.component.html',
  styleUrls: ['./administrar-propiedades.component.scss'],
  providers: [PropiedadService]
})
export class AdministrarPropiedadesComponent {
  public propiedad: Owned;

  propertyForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    personas: new FormControl(''),    
    access: new FormControl('true'),
    salas_reuniones: new FormControl('true'),
    reception: new FormControl('true'),
    eventos_network: new FormControl('true'),
    terraza: new FormControl('true'),
    cafe_relax: new FormControl('true'),
    seguridad: new FormControl('true'),
    limpieza: new FormControl('true'),
    tarifa: new FormControl(''),
    tipo_propiedad: new FormControl(''),
    imagen: new FormControl(''),
    direccion: new FormControl(''),
    ciudad: new FormControl(''),
    comunidad_autonoma: new FormControl(''),
  });

  constructor(private _route:ActivatedRoute,private _router:Router, private _propiedadService: PropiedadService, private fb: FormBuilder) { 
    // this.propiedad= new Owned(0,'','',0,false,false,false,false,false,false,false,false,0,'','','','','');
  }

  onSubmit(){
    console.log(this.propertyForm.value);
    
    this._propiedadService.addPropiedad(this.propertyForm.value).subscribe(
      result => {
        let json=JSON.stringify(result);
        console.log(json);
        
        this._router.navigate(['dashboard/listPropertys']);
      },
      error => {
          console.log(<any>error);
      }
    );
  }

}
