import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PropiedadService } from '../../../../services/propiedad.service';
import { Owned } from '../../../../models/owned';
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
    access: new FormControl(false),
    salas_reuniones: new FormControl(false),
    reception: new FormControl(false),
    eventos_network: new FormControl(false),
    terraza: new FormControl(false),
    cafe_relax: new FormControl(false),
    seguridad: new FormControl(false),
    limpieza: new FormControl(false),
    cer_energetica: new FormControl(false),
    paqueteria: new FormControl(false),
    parking: new FormControl(false),
    wifi: new FormControl(false),
    coworking: new FormControl(false),
    tarifa: new FormControl(''),
    tipo_propiedad: new FormControl(''),
    imagen: new FormControl(''),
    direccion: new FormControl(''),
    ciudad: new FormControl(''),
    comunidad_autonoma: new FormControl(''),
    telefono: new FormControl(''),
  });

  constructor(private _route: ActivatedRoute, private _router: Router, private _propiedadService: PropiedadService, private fb: FormBuilder) {
  }

  onSubmit() {
    if (this.propertyForm.get('access').value == true) {
      this.propertyForm.get('access').setValue("true");
    } else {
      this.propertyForm.get('access').setValue("false");
    }

    if (this.propertyForm.get('salas_reuniones').value == true) {
      this.propertyForm.get('salas_reuniones').setValue("true");
    } else {
      this.propertyForm.get('salas_reuniones').setValue("false");
    }

    if (this.propertyForm.get('reception').value == true) {
      this.propertyForm.get('reception').setValue("true");
    } else {
      this.propertyForm.get('reception').setValue("false");
    }

    if (this.propertyForm.get('eventos_network').value == true) {
      this.propertyForm.get('eventos_network').setValue("true");
    } else {
      this.propertyForm.get('eventos_network').setValue("false");
    }

    if (this.propertyForm.get('terraza').value == true) {
      this.propertyForm.get('terraza').setValue("true");
    } else {
      this.propertyForm.get('terraza').setValue("false");
    }

    if (this.propertyForm.get('cafe_relax').value == true) {
      this.propertyForm.get('cafe_relax').setValue("true");
    } else {
      this.propertyForm.get('cafe_relax').setValue("false");
    }

    if (this.propertyForm.get('seguridad').value == true) {
      this.propertyForm.get('seguridad').setValue("true");
    } else {
      this.propertyForm.get('seguridad').setValue("false");
    }

    if (this.propertyForm.get('limpieza').value == true) {
      this.propertyForm.get('limpieza').setValue("true");
    } else {
      this.propertyForm.get('limpieza').setValue("false");
    }
    if (this.propertyForm.get('cer_energetica').value == true) {
      this.propertyForm.get('cer_energetica').setValue("true");
    } else {
      this.propertyForm.get('cer_energetica').setValue("false");
    }
    if (this.propertyForm.get('paqueteria').value == true) {
      this.propertyForm.get('paqueteria').setValue("true");
    } else {
      this.propertyForm.get('paqueteria').setValue("false");
    }
    if (this.propertyForm.get('parking').value == true) {
      this.propertyForm.get('parking').setValue("true");
    } else {
      this.propertyForm.get('parking').setValue("false");
    }
    if (this.propertyForm.get('wifi').value == true) {
      this.propertyForm.get('wifi').setValue("true");
    } else {
      this.propertyForm.get('wifi').setValue("false");
    }
    if (this.propertyForm.get('coworking').value == true) {
      this.propertyForm.get('coworking').setValue("true");
    } else {
      this.propertyForm.get('coworking').setValue("false");
    }
    this._propiedadService.addPropiedad(this.propertyForm.value).subscribe(
      result => {
        this.propiedad = this.propertyForm.value;
        console.log(this.propiedad);
        this._router.navigate(['dashboard/listPropertys']);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
