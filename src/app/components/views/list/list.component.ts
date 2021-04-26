import { Component, OnInit, ViewChild,  TemplateRef } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {PropiedadService} from '../../../services/propiedad.service';
import {Owned} from '../../../models/owned';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl } from "@angular/forms";
import { element } from 'protractor';
import { access } from 'node:fs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [PropiedadService]
})
export class ListComponent implements OnInit {

  public propiedades:Array<Owned>;
  public propiedadesFiltradas:Array<Owned>;
  public selected: FormControl = new FormControl(null);
  public opc: any;
  public comunidad;
  public page:number=1;
  public mostrarTextoEntero=false;
  public arrayBooleanos:Array<Boolean>= [];
  public arrayComprobador:Array<number>=[];
  public contador:number=0;
  public contar:string;
  public contadorComprobador=0;

  constructor(private toastr: ToastrService, private _route:ActivatedRoute,private _router:Router, 
    private _propiedadService: PropiedadService, private modal: NgbModal) {
  }

  Opciones(opc1) {
    this.contador=0;
    this.contadorComprobador=0;
    this.opc=opc1;
    this.search();
  }

  search() {
    var access = <HTMLInputElement> document.getElementById("check-a");
    var reuniones = <HTMLInputElement> document.getElementById("check-b");
    var recepcion = <HTMLInputElement> document.getElementById("check-c");
    var eventos = <HTMLInputElement> document.getElementById("check-d");
    var terraza = <HTMLInputElement> document.getElementById("check-e");
    var relax = <HTMLInputElement> document.getElementById("check-f");
    var seguridad = <HTMLInputElement> document.getElementById("check-g");
    var limpieza = <HTMLInputElement> document.getElementById("check-h");

    this.arrayBooleanos[0]=access.checked;
    this.arrayBooleanos[1]=reuniones.checked;
    this.arrayBooleanos[2]=recepcion.checked;
    this.arrayBooleanos[3]=eventos.checked;
    this.arrayBooleanos[4]=terraza.checked;
    this.arrayBooleanos[5]=relax.checked;
    this.arrayBooleanos[6]=seguridad.checked;
    this.arrayBooleanos[7]=limpieza.checked;

    for(var i=0; i<8; i++){
      if(this.arrayBooleanos[i]==true){
        this.arrayComprobador[this.contadorComprobador]=i;
        this.contadorComprobador++;
      }
    }
    this.contadorComprobador=0;

    this.propiedades.forEach(element =>{
      if(this.arrayComprobador.length==0 && element.comunidad_autonoma==this.opc){
        this.propiedadesFiltradas=this.propiedades.filter(x=>x.comunidad_autonoma == element.comunidad_autonoma);
        this.contador++;
      }
      /*else{
        for(var j=0; j<this.arrayComprobador.length; j++){
          if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element[this.arrayComprobador[j]+4]){
            this.contadorComprobador++;
          }else{
            break;
          }
        }
        if(this.contadorComprobador==(this.arrayComprobador.length-1)){
          if(element.comunidad_autonoma==this.opc){
            this.propiedadesFiltradas=this.propiedades.filter(x=>x.comunidad_autonoma == element.comunidad_autonoma);
            this.contador++;
          }
        }
      }*/
    });


    this.contar=(this.contador/2).toPrecision(1);
  }

  getOwned(){
    this._propiedadService.getOwned().subscribe(
        result => {
            this.propiedades = result;
        },
        error => {
            console.log(<any>error);
        }
    );
  }

  ngOnInit(): void {
    this.selected.valueChanges.subscribe(changes => {
      this.Opciones(changes);
    });
    this.getOwned();
  }

}
