import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private http = inject(HttpClient)

  constructor() { }    

  getRequest(route:string):Observable<any> {
    return this.http.get(route)
  }
  postRequest(route:string, data?:any):Observable<any> {
    return this.http.post(route, data)
  }
  updateRequest(route:string, data?:any):Observable<any> {
    return this.http.patch(route, data)
  }
  deleteRequest(route:string):Observable<any> {
    return this.http.delete(route)
  }
}
