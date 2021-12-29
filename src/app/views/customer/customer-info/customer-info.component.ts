import { Component, Input, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  activeState: boolean[] = [true, false, false];
  index: number = 0;
  @Input() customerId: number = 0;

  customerViewModel: CustomerModel = {} as CustomerModel;

  constructor(
    private customerService: CustomerService
  ) {

  }
  ngOnInit() {
    // Lấy thông tin khách hàng
    this.customerService.getCustomerDetail(this.customerId).subscribe((data: CustomerModel) => {
      this.customerViewModel = data;
      console.log(this.customerId);
    });
  }
  OnchangeIndexTab(newIndex: number = 0) {
    this.index = newIndex;
  }
}