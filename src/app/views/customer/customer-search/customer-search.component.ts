import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerCategoryModel, CustomerModel } from 'src/app/models/customer.model';
import { DepartmentModel } from 'src/app/models/department.model';
import { CustomerCategoryService } from 'src/app/services/CustomerService/customer-category.service';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
  @Output() onClickAddCustomerEvent = new EventEmitter<any>();


  index: number = 0;
  rows = 0;
  first = 0;

  lstCustomer: CustomerModel[] = [];

  resultCount: number = 0;

  lstCustCat: CustomerCategoryModel[] = [];
  selectedCustCat: any;

  lstDepartment: any[] = [];
  lstDepartmentModel: DepartmentModel[] = [];

  selectedDepartment: any;

  // Search Form
  customerNameSearch: string = '';
  customerNumberSearch: string = '';
  customerIdNumberSearch: string = '';
  customerCIFSearch: string = '';
  departmentSearch: number = 0;
  customerCatSearch: number = 0;

  constructor(
    private departmentService: DepartmentService,
    private customerCategoryService: CustomerCategoryService,
    private customerService: CustomerService
  ) {

  }
  onClickAddCustomer(customerId:number) {
    this.onClickAddCustomerEvent.emit({ customerId });
  }

  ngOnInit() {
    // Dropdown CustCat
    this.customerCategoryService.getListCustCat().subscribe((data: CustomerCategoryModel[]) => {
      data.forEach(element => {
        element.CUST_CAT_FULL_NAME = element.CUST_CAT_CODE + ' - ' + element.CUST_CAT_NAME;
      });
      this.lstCustCat = data;
      console.log('lstCustCat: ', this.lstCustCat);
    });

    // Dropdown Department
    this.departmentService.getListDepartment().subscribe((data: DepartmentModel[]) => {
      data.forEach(element => {
        element.DEPT_FULL_NAME = element.DEPT_ID + ' - ' + element.DEPT_NAME;
      });
      this.lstDepartment = data;
    });
  }
  OnclickSearchCustomer() {
    // Nếu không có giá trị nào thì không cho search
    if (!this.selectedDepartment && !this.selectedCustCat
      && this.customerNameSearch === '' && this.customerNumberSearch === '' && this.customerIdNumberSearch === '' && this.customerCIFSearch === '')
      return;
    if (this.selectedDepartment)
      this.departmentSearch = this.selectedDepartment.ID;
    if (this.selectedCustCat)
      this.customerCatSearch = this.selectedCustCat.ID;
    console.log('customerNameSearch: ', this.customerNameSearch);
    console.log('customerNumberSearch: ', this.customerNumberSearch);
    console.log('customerIdNumberSearch: ', this.customerIdNumberSearch);
    console.log('customerCIFSearch: ', this.customerCIFSearch);
    console.log('departmentSearch: ', this.departmentSearch);
    console.log('customerCatSearch: ', this.customerCatSearch);

    this.customerService.getListCustomerByCondition(this.customerCatSearch, this.departmentSearch, this.customerNameSearch, this.customerNameSearch, this.customerCIFSearch, this.customerIdNumberSearch).subscribe((data: CustomerModel[]) => {
      this.lstCustomer = data;
      this.resultCount = this.lstCustomer.length;
    });
  }
  OnclickClearFormSearchCustomer() {
    this.customerNameSearch = '';
    this.customerNumberSearch = '';
    this.customerIdNumberSearch = '';
    this.customerCIFSearch = '';
    this.selectedDepartment = null;
    this.selectedCustCat = null;
    console.log('customerNameSearch: ', this.customerNameSearch);
    console.log('customerNumberSearch: ', this.customerNumberSearch);
    console.log('customerIdNumberSearch: ', this.customerIdNumberSearch);
    console.log('customerCIFSearch: ', this.customerCIFSearch);
    console.log('departmentSearch: ', this.departmentSearch);
    console.log('customerCatSearch: ', this.customerCatSearch);
  }
}
