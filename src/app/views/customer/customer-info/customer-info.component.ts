import { Component, Input, OnInit } from '@angular/core';
import { CarModel } from 'src/app/models/car.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { CarService } from 'src/app/services/CarService/car.service';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  activeState: boolean[] = [true, false, false];
  index: number = 0;

  carViewModel: CarModel = {} as CarModel;

  customerViewModel: CustomerModel = {} as CustomerModel;

  constructor(
    private customerService: CustomerService,
    private carService: CarService
  ) {

  }
  ngOnInit() {
    this.carService.carInfo$.subscribe(data => {
      this.carViewModel = data;
    });

    // Lấy thông tin khách hàng
    this.customerService.getCustomerDetail(this.carViewModel.CUSTOMER_ID).subscribe((data: CustomerModel) => {
      this.customerViewModel = data;
      console.log('this.carViewModel.CUSTOMER_ID ',this.carViewModel.CUSTOMER_ID);
    });
  }
  OnchangeIndexTab(newIndex: number = 0) {
    this.index = newIndex;
  }
}