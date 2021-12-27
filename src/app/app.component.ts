import { Component } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeMainTab = "MainTab";

  customerId: number = 0;

  constructor() {
  }
  // Hàm check sự kiện thêm customer vào hồ sơ tại component Search Customer
  changeCustomerInfo(value: any) {
    console.log("CustomerId1111 = ", value.customerId);
    this.customerId = value.customerId;
  }

  // Hàm check sự kiện init customer khi mở màn hình
  initCustomerInfo(value: any) {
    console.log("CustomerId sau khi lấy danh sách = ", value.CustomerId);
    this.customerId = value.CustomerId;
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
