import { Component, Input, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-main-info',
  templateUrl: './customer-main-info.component.html',
  styleUrls: ['./customer-main-info.component.scss']
})
export class CustomerMainInfoComponent implements OnInit {
  activeState: boolean[] = [true, true, true];
  @Input() customerViewModel: CustomerModel = {} as CustomerModel;
  constructor() { }

  ngOnInit(): void {
  }

}
