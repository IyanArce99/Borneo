import { Component, OnInit, ViewChild,  TemplateRef } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../../services/contact.service';
import { Contact } from '../../../../models/contact';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>
  public contactos: Array<Contact>;
  public idModal;

  constructor(private toastr: ToastrService, private _route: ActivatedRoute, private _router: Router,
    private _contactoService: ContactService, private modal: NgbModal) { }

  abrirModal(id) {
    this.modal.open(this.modalContent, { size: 'lg' });
    this.idModal = id;
  }

  acceptDelete(id) {
    this._contactoService.deleteContact(id).subscribe(
      response => {
        this.getContact();
      },
      error => {
        console.log(<any>error);
      }
    )
    this.toastr.success('Mensaje eliminado', '', { "positionClass": "toast-bottom-right" });
    this.modal.dismissAll();
  }

  getContact() {
    this._contactoService.getContact().subscribe(
      result => {
        this.contactos = result;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  ngOnInit() {
    this.getContact();
  }

}
