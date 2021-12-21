import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REST_USER_API } from 'src/app/constants/api.constants';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  public getListUser(): Observable<UserModel[]> {
    const url = this.REST_API_SERVICE + '/getall';
    return this.httpClient.get<UserModel[]>(url, this.httpOptions);
  }

  public getDetailUser(Id: number = 0): Observable<UserModel> {
    const url = this.REST_API_SERVICE + '/getbyid' + Id;
    return this.httpClient.get<UserModel>(url, this.httpOptions);
  }

}