import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const API_PATH = `${environment.API_PATH}`;

@Injectable({
  providedIn: 'root'
})
export class PagesService {


  constructor( private http: HttpClient) { }

  products_using_name(name:string):Observable<any>{
    return this.http.get(`${API_PATH}/catergories?filters[name][$eq]=${name}&populate=%2A`)
  }

  catergories_using_contains(name:string):Observable<any>{
    return this.http.get(`${API_PATH}/catergories?filters[name][$contains]=${name}&populate=%2A`)
  }

  products_using_contains(name:string):Observable<any>{
    return this.http.get(`${API_PATH}/products?filters[description][$contains]=${name}&populate=%2A`)
  }

  all_products():Observable<any>{
    return this.http.get(`${API_PATH}/products?populate=%2A`)
  }

}
