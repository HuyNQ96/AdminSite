import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, PrimeNGConfig, SelectItem, SelectItemGroup } from 'primeng/api';
import { UserModel } from 'src/app/models/user.model';
import { CustomerCategoryService } from 'src/app/services/CustomerService/customer-category.service';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { UserService } from 'src/app/services/UserService/user.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  index: number = 0;
  rows = 0;
  first = 0;
  public lstUser: UserModel[] = [];

  lstCustCat: any[] = [];
  selectedCustCat: any;

  lstDepartment: any[] = [];
  selectedDepartment: any;

  // Search Form
  customerNameSearch: string = '';
  customerNumberSearch: string = '';
  customerIdNumberSearch: string = '';
  customerCIFSearch: string = '';
  departmentSearch: string = '';
  customerCatSearch: string = '';

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private customerCategoryService: CustomerCategoryService,
    private primengConfig: PrimeNGConfig
  ) {
    // Dropdown CustCat
    this.customerCategoryService.getListCustCat().subscribe(data => {
      this.lstCustCat = data;
    });

    // Dropdown Department
    this.departmentService.getListDepartment().subscribe(data => {
      this.lstDepartment = data;
    });
  }

  ngOnInit() {
    this.userService.getListUser().subscribe(data => {
      console.log('lstUser: ', data);
      this.lstUser = data;
    });
  }
}
