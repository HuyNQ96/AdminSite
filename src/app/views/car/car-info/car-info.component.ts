import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/CarService/car.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent implements OnInit {

  applicationCode: any;
  customerId: number = 0;

  carViewModel = {} as CarModel;

  isActive: boolean = false;

  activeMainTab: string = 'MainTab';
  constructor(private route: ActivatedRoute, private carService: CarService) {
  }

  ngOnInit() {
    // Action cho LeftMenu
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
      });
    });
    this.OnChangeMainTab('MainTab');
    // Lấy thông tin CAR

    this.route.paramMap.subscribe(params => {
      this.applicationCode = params.get('applicationCode');
      console.log('applicationCode: ', this.applicationCode);
    });
    // Lấy thông tin CAR  
    this.carService.getCarDetail(this.applicationCode).subscribe((data: CarModel) => {
      this.carViewModel = data;
      this.customerId = data.CUSTOMER_ID;
      this.carService.carInfo$.next(data);
      console.log('Customer ID: ', this.carViewModel.CUSTOMER_ID);
      console.log('Car ID: ', this.carViewModel.ID);
    });

  }
  OnclickShowMenu(){
    this.isActive = !this.isActive;
  }

  public OnChangeMainTab(tabName: string = '') {
    $("#MainMenuLeft li a").click(function () {
      $(this).parent().addClass('active').siblings().removeClass('active');
    });
    this.activeMainTab = tabName;
  }
}
