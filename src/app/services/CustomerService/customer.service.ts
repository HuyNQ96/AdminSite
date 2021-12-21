import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/custom.model';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) { }
    getCustomersLarge() {
        return this.http.get<any>('assets/customers-large.json');
    }
}
