import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_TEST_API } from 'src/app/constants/api.constants';
import { CustomerModel } from 'src/app/models/customer.model';

@Injectable({
    providedIn: 'root'
  })
export class CustomerService {
    private REST_API_SERVICE = REST_TEST_API;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'mode': 'no-cors',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent'
        }),
        params: new HttpParams({})
    };

    constructor(private httpClient: HttpClient) { }

    public getListCustomer(): Observable<CustomerModel[]> {
        const url = this.REST_API_SERVICE + '/get_customer';
        return this.httpClient.get<CustomerModel[]>(url, this.httpOptions);
    }

    public getListCustomerByCondition(custCatId: number, deptId: number, customerNumber: string, customerName: string, customerCIF: string, customerIdentity: string): Observable<CustomerModel[]> {
        const url = this.REST_API_SERVICE + '/get_customer';
        let params = new HttpParams();
        params = params.append('custCatId', custCatId);
        params = params.append('deptId', deptId);
        params = params.append('customerNumber', customerNumber);
        params = params.append('customerName', customerName);
        params = params.append('customerCIF', customerCIF);
        params = params.append('customerIdentity', customerIdentity);
        this.httpOptions.params = params;
        return this.httpClient.get<CustomerModel[]>(url, this.httpOptions);
    }
}