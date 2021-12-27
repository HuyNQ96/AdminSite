import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/CarService/car.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent implements OnInit {
  contractDate: any;
  applicationCode: any;

  carInfo: any;

  constructor(private route: ActivatedRoute, private carService: CarService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.applicationCode = params.get('applicationCode');
      console.log('applicationCode: ', this.applicationCode);
    });

    // Lấy thông tin CAR
    this.carService.getCarDetail(this.applicationCode).subscribe((data: CarModel) => {
      this.carInfo = data;
      console.log('Car Info: ', this.carInfo);
    });
  }

}
