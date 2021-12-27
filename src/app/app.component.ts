import { Component } from '@angular/core';
import * as $ from 'jquery';
import { CarModel } from './models/car.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeMainTab = "MainTab";

  customerId: number = 0;

  carInfo: any; // CarModel

  constructor() {
  }
  // Hàm check sự kiện thêm customer vào hồ sơ tại component Search Customer
  changeCustomerInfo(value: any) {
    console.log("CustomerId = ", value.customerId);
    this.customerId = value.customerId;
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

  }

  public OnChangeMainTab(tabName: string = '') {
    $("#MainMenuLeft li a").click(function () {
      $(this).parent().addClass('active').siblings().removeClass('active');
    });
    this.activeMainTab = tabName;
  }
}
