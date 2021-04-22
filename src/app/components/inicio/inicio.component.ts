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

  constructor(private toastr: ToastrService, private _route:ActivatedRoute,private _router:Router, 
    private _propiedadService: PropiedadService, private modal: NgbModal) {
  }

  search(el:HTMLElement) {
    this.propiedades.forEach(element =>{
      if(element.comunidad_autonoma==this.opc){
        this.propiedadesFiltradas=this.propiedades.filter(x=>x.comunidad_autonoma == element.comunidad_autonoma);
        this._router.navigate(['/',element.comunidad_autonoma]);
      }
    });
    el.scrollIntoView();
  }

  Opciones(opc1) {
    this.opc=opc1;
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
