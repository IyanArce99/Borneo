import { Component, OnInit, ViewChild,  TemplateRef } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {PropiedadService} from '../../services/propiedad.service';
import {Owned} from '../../models/owned';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl } from "@angular/forms";
import { element } from 'protractor';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [PropiedadService]
})
export class InicioComponent implements OnInit {
  public propiedades:Array<Owned>;
  public propiedadesFiltradas:Array<Owned>;
  public selected: FormControl = new FormControl(null);
  public opc: any;
  public comunidad;
  public page:number=1;
  public mostrarTextoEntero=false;
  public TextoLimpio;
  //public arrayTextoLimpio:Array<string>;

  constructor(private toastr: ToastrService, private _route:ActivatedRoute,private _router:Router, 
    private _propiedadService: PropiedadService, private modal: NgbModal) {
  }

  search(el:HTMLElement) {
    this.propiedades.forEach(element =>{
      if(element.comunidad_autonoma==this.opc){
        this.propiedadesFiltradas=this.propiedades.filter(x=>x.comunidad_autonoma == element.comunidad_autonoma);
        //element.descripcion.replace(/<[^>]*>/g, "").split(" ").splice(0, 20).join(" ");
        this._router.navigate(['/',element.comunidad_autonoma]);
      }
    });
    el.scrollIntoView();
  }

  Opciones(opc1) {
    this.opc=opc1;
  }

  recarga(){
    this.comunidad=this._route.snapshot.params['comunidad_autonoma'];
    this.propiedades.forEach(element =>{
      if(element.comunidad_autonoma==this.comunidad){
        //element.descripcion.replace(/<[^>]*>/g, "").split(" ").splice(0, 20).join(" ");
        this.propiedadesFiltradas=this.propiedades.filter(x=>x.comunidad_autonoma == element.comunidad_autonoma);
        this._router.navigate(['/',element.comunidad_autonoma]);
      }
    });
  }

  getOwned(){
    this._propiedadService.getOwned().subscribe(
        result => {
            this.propiedades = result;
            if(this._router.url!='/'){
              this.recarga();
            }
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
