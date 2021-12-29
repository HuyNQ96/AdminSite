import { Component, Input, OnInit } from '@angular/core';
import { CarModel } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/CarService/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {
  
  carViewModel: CarModel = {} as CarModel;

  contractDate: any;
  constructor(
    private carService: CarService) { }

  ngOnInit(): void {
    this.carService.carInfo$.subscribe(data => {
      this.carViewModel = data;
    });
  }

}
