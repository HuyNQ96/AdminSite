import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { DropdownModel } from 'src/app/models/common.model';
import { FacilityModel } from 'src/app/models/facility.model';
import { FacilityService } from 'src/app/services/FacilityService/facility.service';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss'],
  providers: [ConfirmationService]
})

export class FacilityListComponent implements OnInit {
  @Input() lstFacility = [] as FacilityModel[];
  facActive: FacilityModel = {} as FacilityModel;

  items: MenuItem[] = [];

  displayModalDetail: boolean = false;
  displayModalGeneral: boolean = false;

  revolvingOptions: DropdownModel[] = [];
  currencys: DropdownModel[] = [];
  units: DropdownModel[] = [];

  createFac = {} as FacilityModel;

  constructor(public messageService: MessageService,
    private facilityService: FacilityService,
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
        this.lstFacility = this.lstFacility.filter(item => item.ID !== this.facActive.ID);
        console.log('this.lstFacility', this.lstFacility);
        console.log('this.createFac', this.facActive);
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
      this.lstFacility.push(this.createFac);
      this.displayModalGeneral = false;
      this.displayModalDetail = false;
    }
    else {
      this.displayModalGeneral = false;
      this.displayModalDetail = false;
    }
  }
}