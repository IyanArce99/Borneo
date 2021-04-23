import { Component, OnInit } from '@angular/core';
import { Owned } from '../../../models/owned';
import { PropiedadService } from '../../../services/propiedad.service';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  providers: [PropiedadService]
})


export class SingleComponent implements OnInit {
  public propiedad: Owned;
  public data: any;
  public id;

  constructor(private _route: ActivatedRoute, private _router: Router, private _propiedadService: PropiedadService) {
  
  }

  recogerDato() {
    this._propiedadService.getPropiedad(this.id).subscribe(
      response => {
        this.propiedad = response;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  ngOnInit() {
    this.id=this._route.snapshot.params['id'];
    this.recogerDato();
  }

}
