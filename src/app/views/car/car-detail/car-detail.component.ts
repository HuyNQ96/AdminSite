import { Component, Input, OnInit } from '@angular/core';
import { CarModel } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {
  @Input() carViewModel: CarModel = {} as CarModel;
  contractDate: any;
  constructor() { }

  ngOnInit(): void {
  }

}
