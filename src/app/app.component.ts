import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

  }
  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
      });
    });
    this.OnChangeMainTab();
  }
  
  public OnChangeMainTab() {
    $("#MainMenuLeft li a").click(function () {
      $(this).parent().addClass('active').siblings().removeClass('active');
    });
  }
}
