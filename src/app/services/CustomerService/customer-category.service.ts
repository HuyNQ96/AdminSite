import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_TEST_API } from 'src/app/constants/api.constants';
import { CustomerCategoryModel } from 'src/app/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerCategoryService {
  private REST_API_SERVICE = REST_TEST_API;
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

  public getListCustCat(): Observable<CustomerCategoryModel[]> {
    const url = this.REST_API_SERVICE + '/get_all_cust_cat';
    return this.httpClient.get<CustomerCategoryModel[]>(url, this.httpOptions);
  }
}
