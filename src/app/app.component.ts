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

  public OnChangeMainTab(tabName:string = '') {
    $("#MainMenuLeft li a").click(function () {
      $(this).parent().addClass('active').siblings().removeClass('active');
    });
    this.activeMainTab = tabName;
  }
}
