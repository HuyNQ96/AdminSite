import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, Message, MessageService, SelectItem } from 'primeng/api';
import { CarModel } from 'src/app/models/car.model';
import { DropdownModel } from 'src/app/models/common.model';
import { FacilityModel, FacilityTypeModel } from 'src/app/models/facility.model';
import { CarService } from 'src/app/services/CarService/car.service';
import { CustomValidationService } from 'src/app/services/CommonService/custom-validation.service';
import { FacilityService } from 'src/app/services/FacilityService/facility.service';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss'],
  providers: [ConfirmationService]
})

export class FacilityListComponent implements OnInit {
  // Form tạo mới Fac tổng hợp
  addGeneralFacilityForm: any;
  submittedGeneral = false;
  // Form tạo mới Fac chi tiết
  addDetailFacilityForm: any;
  submittedDetail = false;

  // Model dùng chung
  carViewModel: CarModel = {} as CarModel;

  // Fac đang được click chọn trên ds bảng
  facActive: FacilityModel = {} as FacilityModel;

  // Menu chọn Fac cha/con
  items: MenuItem[] = [];

  // Có hiển thị Popup của Tạo mới fac cha/con
  displayModalDetail: boolean = false;
  displayModalGeneral: boolean = false;

  // Các Dropdown lưu các giá trị trên các popup tạo mới
  revolvingOptions: DropdownModel[] = [];
  currencys: DropdownModel[] = [];
  units: DropdownModel[] = [];
  facTypes: FacilityTypeModel[] = [];

  // Lưu fac cha hiện tại
  parentFac = {} as FacilityModel[];

  // Lưu fac đang được tạo mới
  createFac = {} as FacilityModel;

  // Lưu danh sách Fac được tạo mới
  lstFacCreate: FacilityModel[] = [];

  constructor(public messageService: MessageService,
    private facilityService: FacilityService,
    private carService: CarService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private customValidator: CustomValidationService) {
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
      { label: 'Hạn mức tổng hợp', command: () => { this.showPopUpCreateGeneralFac(); } },
      { label: 'Hạn mức chi tiết', command: () => { this.showPopUpCreateDetailFac(); } }
    ];

    // Dropdown Department
    this.facilityService.getAllFacilityType().subscribe((data: FacilityTypeModel[]) => {
      this.facTypes = data;
    });
  }

  showPopUpCreateGeneralFac() {
    this.submittedGeneral = false;
    // Khởi tạo Form
    this.addGeneralFacilityForm = this.fb.group({
      FACILITY_CODE: ['FAC.09122021.00041433'],
      FACILITY_DESC: ['', [Validators.required]],
      FACILITY_TYPE: ['', [Validators.required]],
      REVOLVING: ['', [Validators.required]],
      SUBMIT_TENOR: ['', [Validators.required]],
      SUBMIT_TENOR_UNIT: ['', [Validators.required]],
      FACILITY_LIMIT: ['', [Validators.required], this.customValidator.numberValidator.bind(this.customValidator)],
      UNSECURE_LIMIT: ['', [Validators.nullValidator], this.customValidator.numberValidator.bind(this.customValidator)],
      CURRENCY_ID: ['', [Validators.required]],
    },
      {
        // validator: this.CustomCheckGeneralForm(), // Validate Business
      }
    );
    this.createFac.FACILITY_CODE = this.addGeneralFacilityForm.value['FACILITY_CODE'];
    this.addGeneralFacilityForm.get('FACILITY_CODE').disable();
    this.displayModalGeneral = true;
    this.displayModalDetail = false;
  }

  CustomValidateGeneralForm() {
    return (formGroup: FormGroup): null | undefined => {
      const facLimitChild = formGroup.controls['FACILITY_LIMIT'];
      const facLimitParent = 2000;

      if (!facLimitChild || !facLimitParent) {
        return null;
      }

      if (facLimitChild.value >= facLimitParent) {
        facLimitChild.setErrors({ validateFacLimit: true });
      } else {
        facLimitChild.setErrors(null);
      }
      return null;
    }
  }

  get addGeneralFacilityFormControl() {
    return this.addGeneralFacilityForm.controls;
  }

  showPopUpCreateDetailFac() {
    if (this.carViewModel.ListFacility) {
      if (this.carViewModel.ListFacility.filter(x => x.PARENT_ID === 0))
        this.parentFac = this.carViewModel.ListFacility.filter(x => x.PARENT_ID === 0);
      console.log('Parent: ', this.parentFac);
    }

    this.submittedDetail = false;
    // Khởi tạo Form
    this.addDetailFacilityForm = this.fb.group({
      FACILITY_CODE: ['FAC.09122021.00041433'],
      FACILITY_DESC: ['', [Validators.required]],
      FACILITY_TYPE: ['', [Validators.required]],
      REVOLVING: ['', [Validators.required]],
      SUBMIT_TENOR: ['', [Validators.required]],
      SUBMIT_TENOR_UNIT: ['', [Validators.required]],
      FACILITY_LIMIT: ['', [Validators.required], this.customValidator.numberValidator.bind(this.customValidator)],
      UNSECURE_LIMIT: ['', [Validators.nullValidator], this.customValidator.numberValidator.bind(this.customValidator)],
      CURRENCY_ID: ['', [Validators.required]],
      PARENT_ID: ['', [Validators.required]],
      SECURE_LIMIT: ['', [Validators.required]],
      DISBURSEMENT_PERIOD: ['', [Validators.required]],
      DISBURSEMENT_PERIOD_UNIT: ['', [Validators.required]],
      FIRST_DISBURSEMENT_UNIT: ['', [Validators.required]],
      FIRST_DISBURSEMENT: ['', [Validators.required]],
      SUBMIT_RATE: ['', [Validators.required]],
      TOTAL_DISBURSEMENT: ['', [Validators.required]],
      EFFECTIVE_DATE: ['', [Validators.required]],
      END_DATE: ['', [Validators.required]],
      DISBURSEMENT_END_DATE: ['', [Validators.required]],
      MAX_DISBURSEMENT: ['', [Validators.required]],
    },
      {
        // validator: this.CustomCheckGeneralForm(), // Validate Business
      }
    );
    this.createFac.FACILITY_CODE = this.addDetailFacilityForm.value['FACILITY_CODE'];
    this.addDetailFacilityForm.get('FACILITY_CODE').disable();


    this.displayModalDetail = true;
    this.displayModalGeneral = false;
  }

  get addDetailFacilityFormControl() {
    return this.addDetailFacilityForm.controls;
  }

  MappingGaneralFacility() {
    // this.createFac.FACILITY_CODE = this.addGeneralFacilityForm.value['FACILITY_CODE'];
    this.createFac.FACILITY_DESC = this.addGeneralFacilityForm.value['FACILITY_DESC'];
    this.createFac.FACILITY_TYPE = this.addGeneralFacilityForm.value['FACILITY_TYPE'];
    this.createFac.REVOLVING = this.addGeneralFacilityForm.value['REVOLVING'];
    this.createFac.SUBMIT_TENOR = this.addGeneralFacilityForm.value['SUBMIT_TENOR'];
    this.createFac.SUBMIT_TENOR_UNIT = this.addGeneralFacilityForm.value['SUBMIT_TENOR_UNIT'];
    this.createFac.FACILITY_LIMIT = this.addGeneralFacilityForm.value['FACILITY_LIMIT'];
    this.createFac.UNSECURE_LIMIT = this.addGeneralFacilityForm.value['UNSECURE_LIMIT'];
    this.createFac.CURRENCY_ID = this.addGeneralFacilityForm.value['CURRENCY_ID'];
  }

  MappingDetailFacility() {
    // this.createFac.FACILITY_CODE = this.addGeneralFacilityForm.value['FACILITY_CODE'];
    this.createFac.FACILITY_DESC = this.addGeneralFacilityForm.value['FACILITY_DESC'];
    this.createFac.FACILITY_TYPE = this.addGeneralFacilityForm.value['FACILITY_TYPE'];
    this.createFac.REVOLVING = this.addGeneralFacilityForm.value['REVOLVING'];
    this.createFac.SUBMIT_TENOR = this.addGeneralFacilityForm.value['SUBMIT_TENOR'];
    this.createFac.SUBMIT_TENOR_UNIT = this.addGeneralFacilityForm.value['SUBMIT_TENOR_UNIT'];
    this.createFac.FACILITY_LIMIT = this.addGeneralFacilityForm.value['FACILITY_LIMIT'];
    this.createFac.UNSECURE_LIMIT = this.addGeneralFacilityForm.value['UNSECURE_LIMIT'];
    this.createFac.CURRENCY_ID = this.addGeneralFacilityForm.value['CURRENCY_ID'];
  }

  // Hàm thực hiện thêm hạn mức (hoặc thoát)
  SubmitCreateFacilityForm(action: string, type: string) {
    // Action là thoát
    if (action === "Close") {
      this.displayModalGeneral = false;
      this.displayModalDetail = false;
    }

    // Nếu là Fac cha
    if (type === "General") {
      this.submittedGeneral = true;
      if (!this.addGeneralFacilityForm.valid) {
        this.messageService.add({ severity: 'warn', summary: 'Không thành công', detail: 'Vui lòng cập nhật đầy đủ thông tin!' });
        return;
      };
      this.MappingGaneralFacility();
    }
    // Nếu là Fac con
    else if (type === "Detail") {
      this.submittedDetail = true;
      if (!this.addDetailFacilityForm.valid) {
        this.messageService.add({ severity: 'warn', summary: 'Không thành công', detail: 'Vui lòng cập nhật đầy đủ thông tin!' });
        return;
      };
      this.MappingDetailFacility();
    }
    // Action là thêm fac
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
}