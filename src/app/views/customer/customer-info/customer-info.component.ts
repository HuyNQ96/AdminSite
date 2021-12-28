import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  activeState: boolean[] = [true, false, false];
  index: number = 0;
  customerId: number = 0;
  constructor(
    private customerService: CustomerService
  ) {

  }
  ngOnInit() {
    // Lấy thông tin khác hàng
  }
  OnchangeIndexTab(newIndex: number = 0) {
    this.index = newIndex;
  }
}