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
  //getJoinid
  getJoinid(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/joinproducts`, body)
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
  //getCategorybyid
  getCategorybyid(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/joinproductsbyid/${id}`)
  }
  //deleteCategory
  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletec/${id}`)
  }
  //deleteproduct
  deleteproduct(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`)
  }
  //addCategory
  addCategory(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories/add`, body)
  }
  //addProduct
  addProduct(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/add`, body)
  }
  //updatep
  updatep(body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateproducts`, body)
  }
  //updatecat
  updatecat(body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatecategories`, body)
  }

}
