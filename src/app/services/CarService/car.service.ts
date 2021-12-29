import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { REST_TEST_API } from 'src/app/constants/api.constants';
import { CarModel } from 'src/app/models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public carInfo$ = new BehaviorSubject<CarModel>({} as CarModel);

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

  public getCarDetail(applicationCode: string): Observable<CarModel> {
    const url = this.REST_API_SERVICE + '/car_detail';
    let params = new HttpParams();
    params = params.append('applicationCode', applicationCode);
    this.httpOptions.params = params;
    return this.httpClient.get<CarModel>(url, this.httpOptions);
  }
}