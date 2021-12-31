import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacilityModel, FacilityTypeModel } from 'src/app/models/facility.model';
import { REST_TEST_API } from 'src/app/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
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

  public getListFacilityByAppId(appId:number): Observable<FacilityModel[]> {
    const url = this.REST_API_SERVICE + '/fac_by_app';
    let params = new HttpParams();
    params = params.append('applicationId', appId);
    this.httpOptions.params = params;
    return this.httpClient.get<FacilityModel[]>(url, this.httpOptions);
  }

  public getDetailFacility(Id: number = 0): Observable<FacilityModel> {
    const url = this.REST_API_SERVICE + '/fac_detail';
    let params = new HttpParams();
    params = params.append('facId', Id);
    this.httpOptions.params = params;
    return this.httpClient.get<FacilityModel>(url, this.httpOptions);
  }

  public getAllFacilityType(): Observable<FacilityTypeModel[]> {
    const url = this.REST_API_SERVICE + '/get_fac_type';
    return this.httpClient.get<FacilityTypeModel[]>(url, this.httpOptions);
  }

}