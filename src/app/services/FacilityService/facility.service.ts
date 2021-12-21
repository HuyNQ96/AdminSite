import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacilityModel } from '../models/facility.model';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private REST_API_SERVICE = "http://localhost:44206/facility";
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

  public getListFacility(): Observable<FacilityModel[]> {
    const url = this.REST_API_SERVICE;
    return this.httpClient.get<FacilityModel[]>(url, this.httpOptions);
  }

  public getDetailFacility(Id: number = 0): Observable<FacilityModel> {
    const url = this.REST_API_SERVICE;
    return this.httpClient.get<FacilityModel>(url, this.httpOptions);
  }

}