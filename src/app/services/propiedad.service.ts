import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders,  HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {GLOBAL} from './global';
import {Owned} from '../models/owned';

@Injectable()
export class PropiedadService{
    public url: string;

    constructor(public _http:HttpClient){
        this.url=GLOBAL.url;
    }

    getOwned(): Observable<any>{
        return this._http.get(this.url+'/owned/search');
    }

    deleteOwned(id){
        return this._http.get(this.url+'/owned/delete/'+id);
    }

    addPropiedad(propiedad:Owned):Observable<any> {
        return this._http.post(this.url+'/owned/add', propiedad);
    }

    editPropiedad(id, propiedad: Owned):Observable<any> {
        return this._http.post(this.url+'/owned/update/'+id, propiedad);
    }

    getPropiedad(id): Observable<any>{
        return this._http.get(this.url+'/owned/search/'+id);
    }
}
