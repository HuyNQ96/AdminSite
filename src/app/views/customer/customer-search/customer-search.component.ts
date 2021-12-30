import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarModel } from 'src/app/models/car.model';
import { CustomerCategoryModel, CustomerModel, CustomerSearchModel } from 'src/app/models/customer.model';
import { DepartmentModel } from 'src/app/models/department.model';
import { CarService } from 'src/app/services/CarService/car.service';
import { CustomerCategoryService } from 'src/app/services/CustomerService/customer-category.service';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss'],
  providers: [MessageService]
})
export class CustomerSearchComponent implements OnInit {
  index: number = 0;
  rows = 0;
  first = 0;

  lstCustomer: CustomerModel[] = [];

  carViewModel: CarModel = {} as CarModel;

  lstCustCat: CustomerCategoryModel[] = [];
  selectedCustCat: any;

  lstDepartment: any[] = [];
  lstDepartmentModel: DepartmentModel[] = [];

  selectedDepartment: any;

  // Search Form
  customerSearchModel: CustomerSearchModel = {} as CustomerSearchModel;

  constructor(
    private departmentService: DepartmentService,
    private customerCategoryService: CustomerCategoryService,
    private carService: CarService,
    private customerService: CustomerService,
    public messageService: MessageService
  ) {

  }

  ngOnInit() {
    // subscribe CarInfo Model
    this.carService.carInfo$.subscribe(data => {
      this.carViewModel = data;
    });
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
      && this.customerSearchModel.customerNameSearch === '' && this.customerSearchModel.customerNumberSearch === ''
      && this.customerSearchModel.customerIdNumberSearch === '' && this.customerSearchModel.customerCIFSearch === '')
      return;
    if (this.selectedDepartment)
      this.customerSearchModel.departmentSearch = this.selectedDepartment.ID;
    if (this.selectedCustCat)
      this.customerSearchModel.customerCatSearch = this.selectedCustCat.ID;

    this.customerService.getListCustomerByCondition(this.customerSearchModel.customerCatSearch,
      this.customerSearchModel.departmentSearch, this.customerSearchModel.customerNameSearch,
      this.customerSearchModel.customerNameSearch, this.customerSearchModel.customerCIFSearch,
      this.customerSearchModel.customerIdNumberSearch).subscribe((data: CustomerModel[]) => {
        this.lstCustomer = data;
      });
  }
  OnclickClearFormSearchCustomer() {
    this.customerSearchModel.customerNameSearch = '';
    this.customerSearchModel.customerNumberSearch = '';
    this.customerSearchModel.customerIdNumberSearch = '';
    this.customerSearchModel.customerCIFSearch = '';
    this.selectedDepartment = null;
    this.selectedCustCat = null;
  }
  // Thêm khách hàng => thay đổi lại carInfo$ nhằm load lại màn hình
  async onClickAddCustomer(customerId: number) {
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm khách hàng thành công vào hồ sơ!' });
    await this.delay(1000);
    this.carViewModel.CUSTOMER_ID = customerId;
    this.carService.carInfo$.next(this.carViewModel);
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
