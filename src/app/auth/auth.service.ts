import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const API_PATH = `${environment.API_PATH}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(details : Object):Observable<any>{
    return this.http.post(`${API_PATH}/auth/local/register`, details)
  }

  login(details : Object): Observable<any>{
    return this.http.post(`${API_PATH}/auth/local`, details)
  }
}
