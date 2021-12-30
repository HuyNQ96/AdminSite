import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { CarModel } from 'src/app/models/car.model';
import { DropdownModel } from 'src/app/models/common.model';
import { FacilityModel } from 'src/app/models/facility.model';
import { CarService } from 'src/app/services/CarService/car.service';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss'],
  providers: [ConfirmationService]
})

export class FacilityListComponent implements OnInit {
  carViewModel: CarModel = {} as CarModel;

  facActive: FacilityModel = {} as FacilityModel;

  items: MenuItem[] = [];

  displayModalDetail: boolean = false;
  displayModalGeneral: boolean = false;

  revolvingOptions: DropdownModel[] = [];
  currencys: DropdownModel[] = [];
  units: DropdownModel[] = [];

  createFac = {} as FacilityModel;
  lstFacCreate: FacilityModel[] = [];

  constructor(public messageService: MessageService,
    private carService: CarService,
    private confirmationService: ConfirmationService) {
    this.revolvingOptions = [
      { name: "Quay vòng", code: "1" },
      { name: "Không quay vòng", code: "0" }
    ];

    this.units = [
      { name: "Ngày", code: "D" },
      { name: "Tháng", code: "M" },
      { name: "Năm", code: "Y" }
    ];

    this.currencys = [
      { name: "VND", code: "VND" },
      { name: "USD", code: "USD" },
      { name: "EUR", code: "EUR" }
    ];
  }

  ngOnInit() {
    this.carService.carInfo$.subscribe(data => {
      this.carViewModel = data;
    });

    this.items = [
      {
        label: 'Hạn mức tổng hợp', command: () => {
          this.showPopUpCreateGeneralFac();
        }
      },
      {
        label: 'Hạn mức chi tiết', command: () => {
          this.showPopUpCreateDetailFac();
        }
      }
    ];
  }

  confirmDeleteFacility() {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắc muốn xóa Facility này chứ?',
      header: 'Xóa Facility',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.carViewModel.ListFacility = this.carViewModel.ListFacility.filter(item => item.ID !== this.facActive.ID);
        console.log('this.lstFacility', this.carViewModel.ListFacility);
        console.log('this.createFac', this.facActive);
        this.carService.carInfo$.next(this.carViewModel);
        this.messageService.add({ severity: 'info', summary: 'Thành công', detail: 'Đã xóa Facility' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Hủy', detail: 'Hủy xóa Facility' });
      }
    });
  }

  showPopUpCreateGeneralFac() {
    this.createFac.FACILITY_CODE = "FAC.09122021.00041433";
    this.displayModalGeneral = true;
    this.displayModalDetail = false;
  }

  showPopUpCreateDetailFac() {
    this.createFac.FACILITY_CODE = "FAC.09122021.00041433";
    this.displayModalDetail = true;
    this.displayModalGeneral = false;
  }
  // Hàm thực hiện thêm hạn mức (hoặc thoát)
  SubmitCreateFacilityForm(action: string) {
    if (action === "Add") {
      console.log('Fac Create: ', this.createFac);
      let minId = 0;
      if (this.carViewModel.ListFacility) {
        let ids = this.carViewModel.ListFacility.map((item) => item.ID);
        minId = Math.min.apply(Math, ids);
        if (minId > 0)
          this.createFac.ID = -1;
        else
          this.createFac.ID = minId - 1;
        this.carViewModel.ListFacility.push(this.createFac);
      }
      else {
        minId = -1;
        this.lstFacCreate.push(this.createFac);
        this.carViewModel.ListFacility = this.lstFacCreate;
      }
      console.log('minId: ', minId);

      console.log('CAR Create: ', this.carViewModel);
      console.log('FAC Create: ', this.carViewModel.ListFacility);
      this.carService.carInfo$.next(this.carViewModel);

      this.displayModalGeneral = false;
      this.displayModalDetail = false;

      this.createFac = {} as FacilityModel;
    }
    else {
      this.displayModalGeneral = false;
      this.displayModalDetail = false;
    }
  }
}