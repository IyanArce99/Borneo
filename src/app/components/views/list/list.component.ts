import { Component, OnInit, ViewChild,  TemplateRef } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {PropiedadService} from '../../../services/propiedad.service';
import {Owned} from '../../../models/owned';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [PropiedadService]
})
export class ListComponent implements OnInit {

  public propiedades:Array<Owned>;
  public propiedadesFiltradas:Array<Owned>=[];
  public selected: FormControl = new FormControl(null);
  public opc: any;
  public comunidad;
  public page:number=1;
  public mostrarTextoEntero=false;
  public arrayBooleanos:Array<Boolean>= [];
  public arrayComprobador:Array<number>=[];
  public contador:number=0;
  public contadorComprobador=0;
  public comunidad_autonoma:string;

  public lat:number;
  public lng:number;
  public zoom:number;
  public mapTypeId:string;
  public markers: any[];

  constructor(private toastr: ToastrService, private _route:ActivatedRoute,private _router:Router, 
    private _propiedadService: PropiedadService, private modal: NgbModal) {
      this.lat= 40.4167;
      this.lng = -3.70325;
      this.zoom =  15;
      this.markers = [];
      this.mapTypeId = 'roadmap';
  }

  Opciones(opc1) {
    this.opc=opc1;
  }

  search() {
    this.contador=0;
    this.contadorComprobador=0;
    this.propiedadesFiltradas=[];
    this.arrayComprobador=[];

    var access = <HTMLInputElement> document.getElementById("check-a");
    var reuniones = <HTMLInputElement> document.getElementById("check-b");
    var recepcion = <HTMLInputElement> document.getElementById("check-c");
    var eventos = <HTMLInputElement> document.getElementById("check-d");
    var terraza = <HTMLInputElement> document.getElementById("check-e");
    var relax = <HTMLInputElement> document.getElementById("check-f");
    var seguridad = <HTMLInputElement> document.getElementById("check-g");
    var limpieza = <HTMLInputElement> document.getElementById("check-h");
    var certificado = <HTMLInputElement> document.getElementById("check-i");
    var paqueteria = <HTMLInputElement> document.getElementById("check-j");
    var parking = <HTMLInputElement> document.getElementById("check-k");
    var wifi = <HTMLInputElement> document.getElementById("check-l");
    var coworking = <HTMLInputElement> document.getElementById("check-m");

    this.arrayBooleanos[0]=access.checked;
    this.arrayBooleanos[1]=reuniones.checked;
    this.arrayBooleanos[2]=recepcion.checked;
    this.arrayBooleanos[3]=eventos.checked;
    this.arrayBooleanos[4]=terraza.checked;
    this.arrayBooleanos[5]=relax.checked;
    this.arrayBooleanos[6]=seguridad.checked;
    this.arrayBooleanos[7]=limpieza.checked;
    this.arrayBooleanos[8]=certificado.checked;
    this.arrayBooleanos[9]=paqueteria.checked;
    this.arrayBooleanos[10]=parking.checked;
    this.arrayBooleanos[11]=wifi.checked;
    this.arrayBooleanos[12]=coworking.checked;

    for(var i=0; i<12; i++){
      if(this.arrayBooleanos[i]==true){
        this.arrayComprobador[this.contadorComprobador]=i;
        this.contadorComprobador++;
      }
    }
    this.contadorComprobador=0;

    this.propiedades.forEach(element =>{
      if(this.arrayComprobador.length==0){
        if(this.opc!="null"){
          if(element.ciudad==this.opc){
            this.propiedadesFiltradas=this.propiedades.filter(x=>x.ciudad == element.ciudad);
            this.contador++;
          }
        }else{
          this.propiedadesFiltradas=this.propiedades;
          this.contador++;
        }
      }
      else{
        for(var j=0; j<this.arrayComprobador.length; j++){
          if(this.arrayComprobador[j]==0){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.access){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==1){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.salas_reuniones){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==2){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.reception){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==3){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.eventos_network){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==4){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.terraza){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==5){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.cafe_relax){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==6){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.seguridad){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==7){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.limpieza){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==8){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.cer_energetica){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==9){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.paqueteria){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==10){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.parking){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==11){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.wifi){
              this.contadorComprobador++;
            }
          }if(this.arrayComprobador[j]==12){
            if(this.arrayBooleanos[this.arrayComprobador[j]].toString()==element.coworking){
              this.contadorComprobador++;
            }
          }
        }

        if(this.contadorComprobador==(this.arrayComprobador.length)){
          if(this.opc!="null"){
            if(element.ciudad==this.opc){
              this.propiedadesFiltradas[this.contador]=element;
              this.contador++;
            }
          }else{
            this.propiedadesFiltradas[this.contador]=element;
            this.contador++;
          }
        }
        this.contadorComprobador=0;
      }
    });

    this.markers.push({
      position: {
        lat: 40.4381311,
        lng: -3.8196233
      },
      label: {
        color: "black",
        text: "Madrid"
      }
    });
 
    this.markers.push({
      position: {
        lat: 48.8615515,
        lng: 2.3112233
      },
      label: {
        color: "black",
        text: "Paris"
      }
    });
  }

  getOwned(){
    this._propiedadService.getOwned().subscribe(
        result => {
            this.propiedades = result;
            this.comunidad_autonoma=this._route.snapshot.params['comunidad_autonoma'];
            this.propiedades.forEach(element =>{
              if(element.comunidad_autonoma==this.comunidad_autonoma){
                this.propiedadesFiltradas=this.propiedades.filter(x=>x.comunidad_autonoma == element.comunidad_autonoma);
              }
            });
        },
        error => {
            console.log(<any>error);
        }
    );

    this.markers.push({
      position: {
        lat: 40.4381311,
        lng: -3.8196233
      },
      label: {
        color: "black",
        text: "Madrid"
      }
    });
 
    this.markers.push({
      position: {
        lat: 48.8615515,
        lng: 2.3112233
      },
      label: {
        color: "black",
        text: "Paris"
      }
    });
  }

  ngOnInit(): void {
    this.selected.valueChanges.subscribe(changes => {
      this.Opciones(changes);
    });
    this.getOwned();
    this.opc="null";
  }

  localizacionPorCalle(){
    
  }
}