import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PropiedadService } from '../../../../services/propiedad.service';
import { Owned } from '../../../../models/owned';
import { GLOBAL } from '../../../../services/global';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Imagenes } from 'src/app/models/images';
import { Console } from 'node:console';

@Component({
  selector: 'app-administrar-propiedades',
  templateUrl: './administrar-propiedades.component.html',
  styleUrls: ['./administrar-propiedades.component.scss'],
  providers: [PropiedadService]
})
export class AdministrarPropiedadesComponent {
  public propiedad: Owned;
  public propiedades: Array<Owned>;
  public filesToUpload: any = [];
  public img: Imagenes;
  public idPropiedades;
  //public previsualizacion:string;

  propertyForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZñÑ]{3,50}$")]),
    descripcion: new FormControl(''),
    personas: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{1,50}$")]),
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
    tarifa: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{1,50}$")]),
    tipo_propiedad: new FormControl(''),
    direccion: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZñÑ]{3,70}$")]),
    ciudad: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZñÑ]{3,50}$")]),
    comunidad_autonoma: new FormControl(''),
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{9}$")]),
  });

  constructor(private _route: ActivatedRoute, private _router: Router, private _propiedadService: PropiedadService,
    private fb: FormBuilder, private sanitizer: DomSanitizer) {
  }

  get nombreNoValido() {
    return this.propertyForm.get("nombre").invalid && this.propertyForm.get("nombre").touched;
  }
  get personasNoValido() {
    return this.propertyForm.get("personas").invalid && this.propertyForm.get("personas").touched;
  }
  get tarifaNoValido() {
    return this.propertyForm.get("tarifa").invalid && this.propertyForm.get("tarifa").touched;
  }
  get direccionNoValido() {
    return this.propertyForm.get("tipo_propiedad").invalid && this.propertyForm.get("tipo_propiedad").touched;
  }
  get ciudadNoValido() {
    return this.propertyForm.get("ciudad").invalid && this.propertyForm.get("ciudad").touched;
  }
  get telefonoNoValido() {
    return this.propertyForm.get("telefono").invalid && this.propertyForm.get("telefono").touched;
  }

  fileChangeEvent(fileInput: any) {
    /*const archivo= fileInput.target.files[0];
    this.extraerBase64(archivo).then((imagen:any) =>{
      this.previsualizacion = imagen.base;
    });*/

    //evento para capturar la imagen
    for (let i = 0; i < fileInput.target.files.length; i++) {
      this.filesToUpload.push(fileInput.target.files[i]);
    }
  }

  onSubmit() {
    if (this.filesToUpload.length > 0) {
      this._propiedadService.makeFileRequest(this.filesToUpload).subscribe(
        result => {
          this.filesToUpload = result;
          this.guardarProducto();
        }, error => {
          console.log(error);
        }
      )
    } else {
      this.guardarProducto();
    }
  }

  guardarProducto() {
    //al no existir un boolean false/true en mysql hay que pasar cada uno de ellos a string "false" "true"
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

    //subscribe para añadir la propiedad
    this._propiedadService.addPropiedad(this.propertyForm.value).subscribe(
      result => {
        this.propiedad = this.propertyForm.value;
        //si no hay imágenes vamos hacia la pestaña de la lista
        if (this.filesToUpload.length == 0) {
          this._router.navigate(['dashboard/listPropertys']);
        } else {
          //llamamos a un get de todas las propiedades
          this.getProductos();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getProductos() {
    //llamamos a todas las propiedades
    this._propiedadService.getOwned().subscribe(
      result => {
        this.propiedades = result;
        //creamos un contador para recorrerlas
        let contador = 0;
        //recorremos las propiedades en busca del último id (ya que este es el que necesitamos para enlazar con las imágenes)
        this.propiedades.forEach(element => {
          contador++;
          //si es el último id y las imágenes no están vacías pasamos a una variable ese id y lo agregamos a img de tipo imágenes
          if (this.propiedades.length == contador && this.filesToUpload != null) {
            this.idPropiedades = element.id;

            /*
            this.img=new Imagenes(null,this.filesToUpload,this.idPropiedades);
            this.guardarImagen();*/

            for (let i; i < this.filesToUpload.length; i++) {
              this.img = new Imagenes(null, this.filesToUpload[i], this.idPropiedades);
              this.guardarImagen();
            }

            //this._router.navigate(['dashboard/listPropertys']);
          }
        });
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  guardarImagen() {
    //Subscribe que añade la imagen a la tabla de imágenes con el id de la propiedad
    this._propiedadService.addimagenes(this.img).subscribe(
      result => {
        console.log(result);
        //this._router.navigate(['dashboard/listPropertys']);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  /*extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })*/
}
