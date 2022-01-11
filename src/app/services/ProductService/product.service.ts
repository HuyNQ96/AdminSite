import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { REST_USER_API } from 'src/app/constants/api.constants';
import { ProductModel } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private REST_API_SERVICE = REST_USER_API;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'mode': 'no-cors',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getAllProduct(): Observable<ProductModel[]> {
    const url = this.REST_API_SERVICE + '/get_all_product';
    return this.httpClient.get<ProductModel[]>(url, this.httpOptions);
  }
}
