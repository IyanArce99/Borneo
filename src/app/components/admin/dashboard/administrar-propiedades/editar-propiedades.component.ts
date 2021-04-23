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
                    this.propiedad=response;
                    
                    for(let i in this.propiedad){
                        this.propertyForm.get('nombre').setValue(this.propiedad[i].nombre);
                        this.propertyForm.get('descripcion').setValue(this.propiedad[i].descripcion);
                        this.propertyForm.get('personas').setValue(this.propiedad[i].personas);
                        this.propertyForm.get('access').setValue(this.propiedad[i].access);
                        this.propertyForm.get('salas_reuniones').setValue(this.propiedad[i].salas_reuniones);
                        this.propertyForm.get('reception').setValue(this.propiedad[i].reception);
                        this.propertyForm.get('eventos_network').setValue(this.propiedad[i].eventos_network);
                        this.propertyForm.get('terraza').setValue(this.propiedad[i].terraza);
                        this.propertyForm.get('cafe_relax').setValue(this.propiedad[i].cafe_relax);
                        this.propertyForm.get('seguridad').setValue(this.propiedad[i].seguridad);
                        this.propertyForm.get('limpieza').setValue(this.propiedad[i].limpieza);
                        this.propertyForm.get('tarifa').setValue(this.propiedad[i].tarifa);
                        this.propertyForm.get('tipo_propiedad').setValue(this.propiedad[i].tipo_propiedad);
                        this.propertyForm.get('direccion').setValue(this.propiedad[i].direccion);
                        this.propertyForm.get('ciudad').setValue(this.propiedad[i].ciudad);
                        this.propertyForm.get('comunidad_autonoma').setValue(this.propiedad[i].comunidad_autonoma);
                    }
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
                        console.log(this.propertyForm.value);
                        this._router.navigate(['/dashboard/listPropertys']);
                    },
                    error => {
                        console.log(<any>error);
                    }
                );
        });
    }
}
