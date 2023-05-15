import { Injectable, ɵɵresolveBody } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProductbyid(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000'
  //joindata
  getJoin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/joinproducts`)
  }
  //categoriesdata
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`)
  }
  //productsdata
  getProductss(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`)
  }
  //login
  getLogin(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, body)
  }
  //register
  adduser(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUsers`, body)
  }
  //joinproductsbyid
  // joinproductsbyid(id: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/joinproducts/:id`,id)
  //   }
  //getProductbyid
}
