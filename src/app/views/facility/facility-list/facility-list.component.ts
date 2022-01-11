import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CarModel } from 'src/app/models/car.model';
import { FacilityModel } from 'src/app/models/facility.model';
import { CarService } from 'src/app/services/CarService/car.service';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss'],
  providers: [ConfirmationService]
})

export class FacilityListComponent implements OnInit {
  // Model dùng chung
  carViewModel: CarModel = {} as CarModel;

  // Fac đang được click chọn trên ds bảng
  facActive: FacilityModel = {} as FacilityModel;

  // Fac được edit
  facEdit: FacilityModel | null = {} as FacilityModel;

  // Menu chọn Fac cha/con
  items: MenuItem[] = [];

  // Có hiển thị Popup của Tạo mới fac cha/con
  displayModalDetail: boolean = false;
  displayModalGeneral: boolean = false;

  constructor(public messageService: MessageService,
    private carService: CarService,
    private confirmationService: ConfirmationService) {

  }

  ngOnInit() {
    this.carService.carInfo$.subscribe(data => {
      this.carViewModel = data;
    });

    this.items = [
      { label: 'Hạn mức tổng hợp', command: () => { this.showPopUpCreateGeneralFac(); } },
      { label: 'Hạn mức chi tiết', command: () => { this.showPopUpCreateDetailFac(); } }
    ];
  }

  showPopUpCreateGeneralFac(isCreate = true) {
    if (isCreate)
      this.facEdit = null;
    this.displayModalGeneral = true;
    this.displayModalDetail = false;
  }

  showPopUpCreateDetailFac(isCreate = true) {
    if (isCreate)
      this.facEdit = null;
    this.displayModalGeneral = false;
    this.displayModalDetail = true;
  }

  // Hàm xóa Fac
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

  // Hàm xóa Fac
  onClickEditFacility() {
    this.facEdit = this.carViewModel.ListFacility.filter(item => item.ID === this.facActive.ID)[0];
    console.log('Fac Edit: ', this.facEdit);
    if (this.facEdit) {
      // Nếu không có cha hoặc ID cha == 0
      if ((!this.facEdit.PARENT_ID || this.facEdit.PARENT_ID === 0))
        this.showPopUpCreateGeneralFac(false);
      else
        this.showPopUpCreateDetailFac(false);
    }
  }

  UpdatePopup(value: any) {
    this.displayModalGeneral = value;
    this.displayModalDetail = value;
  }
}