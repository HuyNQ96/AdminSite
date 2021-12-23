import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_TEST_API } from 'src/app/constants/api.constants';
import { DepartmentModel } from 'src/app/models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
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

  public getListDepartment(): Observable<DepartmentModel[]> {
    const url = this.REST_API_SERVICE + '/get_all_department';
    return this.httpClient.get<DepartmentModel[]>(url, this.httpOptions);
  }
}
