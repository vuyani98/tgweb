import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from 'src/environments/environment';
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
    return this.http.get(`${API_PATH}/catergories/?name=${name}`)
  }

  catergories_using_contains(name:string):Observable<any>{
    return this.http.get(`${API_PATH}/catergories?name_contains=${name}`)
  }

  products_using_contains(name:string):Observable<any>{
    return this.http.get(`${API_PATH}/products?description_contains=${name}`)
  }

  all_products():Observable<any>{
    return this.http.get(`${API_PATH}/products`)
  }

}
