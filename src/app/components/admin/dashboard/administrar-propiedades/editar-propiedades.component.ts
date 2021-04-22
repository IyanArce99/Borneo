import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PropiedadService} from '../../../../services/propiedad.service';
import {Owned} from '../../../../models/owned';
import { GLOBAL } from '../../../../services/global';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-propiedades',
  templateUrl: './administrar-propiedades.component.html',
  styleUrls: ['./administrar-propiedades.component.scss'],
  providers: [PropiedadService]
})
export class EditarPropiedadesComponent {
    public propiedad: Owned;
    public data:any;

    propertyForm = new FormGroup({
        nombre: new FormControl(''),
        descripcion: new FormControl(''),
        personas: new FormControl(''),    
        access: new FormControl(''),
        salas_reuniones: new FormControl(''),
        reception: new FormControl(''),
        eventos_network: new FormControl(''),
        terraza: new FormControl(''),
        cafe_relax: new FormControl(''),
        seguridad: new FormControl(''),
        limpieza: new FormControl(''),
        tarifa: new FormControl(''),
        tipo_propiedad: new FormControl(''),
        imagen: new FormControl(''),
        direccion: new FormControl(''),
        ciudad: new FormControl(''),
        comunidad_autonoma: new FormControl(''),
    });

    ngOnInit(){
        this.recogerDato();
    }

    recogerDato(){
        this._route.params.forEach((params: Params) => {
            let id= params['id'];

            this._propiedadService.getPropiedad(id).subscribe(
                response => {
                    this.data=response;
                    this.propiedad=this.data;
                }, error =>{
                    console.log(<any>error);
                }
            );
        });
    }

    constructor(private _route:ActivatedRoute,private _router:Router, private _propiedadService: PropiedadService, private fb: FormBuilder) { 
    }

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let id= params['id'];
                this._propiedadService.editPropiedad(id,this.propertyForm.value).subscribe(
                    result => {
                        this._router.navigate(['/dashboard/listPropertys']);
                    },
                    error => {
                        console.log(<any>error);
                    }
                );
        });
    }
}
