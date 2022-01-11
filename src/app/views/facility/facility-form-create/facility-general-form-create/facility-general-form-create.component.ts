import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CarModel } from 'src/app/models/car.model';
import { CurrencyModel, DropdownModel, TimeUnitModel } from 'src/app/models/common.model';
import { FacilityModel, FacilityTypeModel } from 'src/app/models/facility.model';
import { CarService } from 'src/app/services/CarService/car.service';
import { CustomValidationService } from 'src/app/services/CommonService/custom-validation.service';
import { FacilityService } from 'src/app/services/FacilityService/facility.service';

@Component({
  selector: 'app-facility-general-form-create',
  templateUrl: './facility-general-form-create.component.html',
  styleUrls: ['./facility-general-form-create.component.scss']
})
export class FacilityGeneralFormCreateComponent implements OnInit {
  @Output() closePopup = new EventEmitter();
  @Input() facEdit: any;

  facTemp: any;

  // Form tạo mới Fac tổng hợp
  addGeneralFacilityForm: any;
  submittedGeneral = false;

  // Model dùng chung
  carViewModel: CarModel = {} as CarModel;

  // Lưu fac cha hiện tại
  parentFac = {} as FacilityModel[];

  // Lưu fac đang được tạo mới
  createFac = {} as FacilityModel;

  // Các Dropdown lưu các giá trị trên các popup tạo mới
  revolvingOptions: DropdownModel[] = [];
  lstCurrency: CurrencyModel[] = [];
  lstTimeUnit: TimeUnitModel[] = [];
  facTypes: FacilityTypeModel[] = [];

  // Lưu danh sách Fac được tạo mới
  lstFacCreate: FacilityModel[] = [];

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private carService: CarService,
    private facilityService: FacilityService,
    public messageService: MessageService,
  ) {
    this.revolvingOptions = [
      { name: "Quay vòng", code: "1" },
      { name: "Không quay vòng", code: "0" }
    ];

    this.lstCurrency = [
      { ID: 3, CCY_CODE: "VND", CCY_NAME: "VIETNAM DONG" },
      { ID: 4, CCY_CODE: "USD", CCY_NAME: "UNITED STATES" },
      { ID: 18, CCY_CODE: "EUR", CCY_NAME: "Euro/Cents" }
    ];

    this.lstTimeUnit = [
      { TIME_UNIT_CODE: "D", TIME_UNIT_NAME: "Ngày" },
      { TIME_UNIT_CODE: "M", TIME_UNIT_NAME: "Tháng" },
      { TIME_UNIT_CODE: "Y", TIME_UNIT_NAME: "Năm" }
    ];
  }

  ngOnInit() {
    this.carService.carInfo$.subscribe(data => {
      this.carViewModel = data;
    });

    // Dropdown Department
    this.facilityService.getAllFacilityType().subscribe((data: FacilityTypeModel[]) => {
      this.facTypes = data;
    });

    this.showPopUpCreateGeneralFac();

  }
  showPopUpCreateGeneralFac() {
    this.submittedGeneral = false;
    // Khởi tạo Form
    this.addGeneralFacilityForm = this.fb.group({
      FACILITY_CODE: [this.facEdit ? this.facEdit.FACILITY_CODE : 'FAC.09122021.00041433'],
      FACILITY_DESC: [this.facEdit ? this.facEdit.FACILITY_DESC : '', [Validators.required]],
      FACILITY_TYPE: [this.facEdit ? this.facEdit.FACILITY_TYPE : '', [Validators.required]],
      REVOLVING: [this.facEdit ? this.facEdit.REVOLVING : '', [Validators.required]],
      SUBMIT_TENOR: [this.facEdit ? this.facEdit.SUBMIT_TENOR : '', [Validators.required]],
      SUBMIT_TENOR_UNIT: [this.facEdit ? this.facEdit.SUBMIT_TENOR_UNIT : '', [Validators.required]],
      FACILITY_LIMIT: [this.facEdit ? this.facEdit.FACILITY_LIMIT : '', [Validators.required], this.customValidator.numberValidator.bind(this.customValidator)],
      UNSECURE_LIMIT: [this.facEdit ? this.facEdit.UNSECURE_LIMIT : '', [Validators.nullValidator], this.customValidator.numberValidator.bind(this.customValidator)],
      CURRENCY_ID: [this.facEdit ? this.facEdit.CURRENCY_ID : '', [Validators.required]],
    },
      {
        // validator: this.CustomCheckGeneralForm(), // Validate Business
      }
    );
    this.createFac.FACILITY_CODE = this.addGeneralFacilityForm.value['FACILITY_CODE'];
    this.addGeneralFacilityForm.get('FACILITY_CODE').disable();
  }

  get addGeneralFacilityFormControl() {
    return this.addGeneralFacilityForm.controls;
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

  MappingGaneralFacility(facUpdate: FacilityModel) {
    // this.createFac.FACILITY_CODE = this.addGeneralFacilityForm.value['FACILITY_CODE'];
    facUpdate.FACILITY_DESC = this.addGeneralFacilityForm.value['FACILITY_DESC'];
    facUpdate.FACILITY_TYPE = this.addGeneralFacilityForm.value['FACILITY_TYPE'];
    facUpdate.REVOLVING = this.addGeneralFacilityForm.value['REVOLVING'];
    facUpdate.SUBMIT_TENOR = this.addGeneralFacilityForm.value['SUBMIT_TENOR'];
    facUpdate.SUBMIT_TENOR_UNIT = this.addGeneralFacilityForm.value['SUBMIT_TENOR_UNIT'];
    facUpdate.FACILITY_LIMIT = this.addGeneralFacilityForm.value['FACILITY_LIMIT'];
    facUpdate.UNSECURE_LIMIT = this.addGeneralFacilityForm.value['UNSECURE_LIMIT'];
    facUpdate.CURRENCY_ID = this.addGeneralFacilityForm.value['CURRENCY_ID'];
  }
  // Hàm thực hiện thêm hạn mức (hoặc thoát)
  SubmitCreateFacilityForm(action: string, type: string) {
    // Action là thoát
    if (action === "Close") {
      this.closePopup.emit(false);
    }

    // Nếu là Fac cha
    if (type === "General") {
      this.submittedGeneral = true;
      if (!this.addGeneralFacilityForm.valid) {
        this.messageService.add({ severity: 'warn', summary: 'Không thành công', detail: 'Vui lòng cập nhật đầy đủ thông tin!' });
        return;
      };
      this.MappingGaneralFacility(this.createFac);
    }

    if (this.facEdit)
      action = "Edit";

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

      this.closePopup.emit(false);

      this.createFac = {} as FacilityModel;
    }
    else if (action === "Edit") {
      if (this.facEdit) {
        this.facTemp = this.carViewModel.ListFacility.filter(item => item.ID === this.facEdit.ID)[0];

        this.carViewModel.ListFacility = this.carViewModel.ListFacility.filter(item => item.ID !== this.facEdit.ID);
        this.MappingGaneralFacility(this.facTemp);
        this.carViewModel.ListFacility.push(this.facTemp);
        this.carService.carInfo$.next(this.carViewModel);
      }
      this.closePopup.emit(false);
    }
    else {
      this.closePopup.emit(false);
    }
  }
}
