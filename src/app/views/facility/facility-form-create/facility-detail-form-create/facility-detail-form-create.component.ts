import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItemGroup, TreeNode } from 'primeng/api';
import { CarModel } from 'src/app/models/car.model';
import { CurrencyModel, DropdownModel, TimeUnitModel } from 'src/app/models/common.model';
import { FacilityModel, FacilityTypeModel } from 'src/app/models/facility.model';
import { ProductModel } from 'src/app/models/product.model';
import { CarService } from 'src/app/services/CarService/car.service';
import { CustomConvertService } from 'src/app/services/CommonService/custom-convert.service';
import { CustomValidationService } from 'src/app/services/CommonService/custom-validation.service';
import { FacilityService } from 'src/app/services/FacilityService/facility.service';
import { ProductService } from 'src/app/services/ProductService/product.service';

@Component({
  selector: 'app-facility-detail-form-create',
  templateUrl: './facility-detail-form-create.component.html',
  styleUrls: ['./facility-detail-form-create.component.scss']
})
export class FacilityDetailFormCreateComponent implements OnInit {
  @Output() closePopup = new EventEmitter();
  @Input() facEdit: any; //FacilityModel | null = {} as FacilityModel;

  facTemp: any;

  // Form tạo mới Fac chi tiết
  addDetailFacilityForm: any;
  submittedDetail = false;

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
  
  facTypes: TreeNode[] = [];

  lstProduct: TreeNode[] = [];

  // Lưu danh sách Fac được tạo mới
  lstFacCreate: FacilityModel[] = [];

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private customConvert: CustomConvertService,
    private carService: CarService,
    private facilityService: FacilityService,
    private productService: ProductService,
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

    // Dropdown FAC TYPE
    this.facilityService.getAllFacilityType().subscribe((data: FacilityTypeModel[]) => {
      data.forEach((item: FacilityTypeModel) => {
        if (item.PARENT_ID === 0)
          this.facTypes.push(this.customConvert.generateTreeStructure(item, data, "ID", "PARENT_ID", "FACILITY_TYPE", "DESCRIPTION"));
      });
    });

    // Dropdown Product
    this.productService.getAllProduct().subscribe((data: ProductModel[]) => {
      data.forEach((item: ProductModel) => {
        if (!item.PARENT_ID)
          this.lstProduct.push(this.customConvert.generateTreeStructure(item, data, "ID", "PARENT_ID", "PRODUCT_CODE", "PRODUCT_NAME"));
      });
    });

    this.showPopUpCreateDetailFac();


  }

  
  showPopUpCreateDetailFac() {
    if (this.carViewModel.ListFacility) {
      if (this.carViewModel.ListFacility.filter(x => x.PARENT_ID === 0))
        this.parentFac = this.carViewModel.ListFacility.filter(x => x.PARENT_ID === 0);
    }

    this.submittedDetail = false;
    // Khởi tạo Form
    this.addDetailFacilityForm = this.fb.group({
      FACILITY_CODE: [this.facEdit ? this.facEdit.FACILITY_CODE : 'FAC.09122021.00041433'],
      FACILITY_DESC: [this.facEdit ? this.facEdit.FACILITY_DESC : '', [Validators.required]],
      FACILITY_TYPE: [this.facEdit ? this.facEdit.FACILITY_TYPE : '', [Validators.required]],
      REVOLVING: [this.facEdit ? this.facEdit.REVOLVING : '', [Validators.required]],
      SUBMIT_TENOR: [this.facEdit ? this.facEdit.SUBMIT_TENOR : '', [Validators.required]],
      SUBMIT_TENOR_UNIT: [this.facEdit ? this.facEdit.SUBMIT_TENOR_UNIT : '', [Validators.required]],
      FACILITY_LIMIT: [this.facEdit ? this.facEdit.FACILITY_LIMIT : '', [Validators.required], this.customValidator.numberValidator.bind(this.customValidator)],
      UNSECURE_LIMIT: [this.facEdit ? this.facEdit.UNSECURE_LIMIT : '', [Validators.nullValidator], this.customValidator.numberValidator.bind(this.customValidator)],
      CURRENCY_ID: [this.facEdit ? this.facEdit.CURRENCY_ID : '', [Validators.required]],
      PARENT_ID: [this.facEdit ? this.facEdit.PARENT_ID : '', [Validators.required]],
      SECURE_LIMIT: [this.facEdit ? this.facEdit.SECURE_LIMIT : '', [Validators.required]],
      DISBURSEMENT_PERIOD: [this.facEdit ? this.facEdit.DISBURSEMENT_PERIOD : '', [Validators.required]],
      DISBURSEMENT_PERIOD_UNIT: [this.facEdit ? this.facEdit.DISBURSEMENT_PERIOD_UNIT : '', [Validators.required]],
      FIRST_DISBURSEMENT_UNIT: [this.facEdit ? this.facEdit.FIRST_DISBURSEMENT_UNIT : '', [Validators.required]],
      FIRST_DISBURSEMENT: [this.facEdit ? this.facEdit.FIRST_DISBURSEMENT : '', [Validators.required]],
      SUBMIT_RATE: [this.facEdit ? this.facEdit.SUBMIT_RATE : '', [Validators.required]],
      TOTAL_DISBURSEMENT: [this.facEdit ? this.facEdit.TOTAL_DISBURSEMENT : '', [Validators.required]],
      EFFECTIVE_DATE: [this.facEdit ? this.facEdit.EFFECTIVE_DATE : '', [Validators.required]],
      END_DATE: [this.facEdit ? this.facEdit.END_DATE : '', [Validators.required]],
      DISBURSEMENT_END_DATE: [this.facEdit ? this.facEdit.DISBURSEMENT_END_DATE : '', [Validators.required]],
      MAX_DISBURSEMENT: [this.facEdit ? this.facEdit.MAX_DISBURSEMENT : '', [Validators.required]],
      PRODUCT_ID: [this.facEdit ? this.facEdit.PRODUCT_ID : '', [Validators.required]],
    },
      {
        // validator: this.CustomCheckGeneralForm(), // Validate Business
      }
    );
    this.createFac.FACILITY_CODE = this.addDetailFacilityForm.value['FACILITY_CODE'];
    this.addDetailFacilityForm.get('FACILITY_CODE').disable();
  }

  get addDetailFacilityFormControl() {
    return this.addDetailFacilityForm.controls;
  }

  MappingDetailFacility(facUpdate: any) {
    facUpdate.FACILITY_DESC = this.addDetailFacilityForm.value['FACILITY_DESC'];
    facUpdate.FACILITY_TYPE = this.addDetailFacilityForm.value['FACILITY_TYPE'];
    facUpdate.REVOLVING = this.addDetailFacilityForm.value['REVOLVING'];
    facUpdate.SUBMIT_TENOR = this.addDetailFacilityForm.value['SUBMIT_TENOR'];
    facUpdate.SUBMIT_TENOR_UNIT = this.addDetailFacilityForm.value['SUBMIT_TENOR_UNIT'];
    facUpdate.FACILITY_LIMIT = this.addDetailFacilityForm.value['FACILITY_LIMIT'];
    facUpdate.UNSECURE_LIMIT = this.addDetailFacilityForm.value['UNSECURE_LIMIT'];
    facUpdate.CURRENCY_ID = this.addDetailFacilityForm.value['CURRENCY_ID'];
    facUpdate.PARENT_ID = this.addDetailFacilityForm.value['PARENT_ID'];
    facUpdate.SECURE_LIMIT = this.addDetailFacilityForm.value['SECURE_LIMIT'];
    facUpdate.DISBURSEMENT_PERIOD = this.addDetailFacilityForm.value['DISBURSEMENT_PERIOD'];
    facUpdate.DISBURSEMENT_PERIOD_UNIT = this.addDetailFacilityForm.value['DISBURSEMENT_PERIOD_UNIT'];
    facUpdate.FIRST_DISBURSEMENT_UNIT = this.addDetailFacilityForm.value['FIRST_DISBURSEMENT_UNIT'];
    facUpdate.FIRST_DISBURSEMENT = this.addDetailFacilityForm.value['FIRST_DISBURSEMENT'];
    facUpdate.SUBMIT_RATE = this.addDetailFacilityForm.value['SUBMIT_RATE'];
    facUpdate.TOTAL_DISBURSEMENT = this.addDetailFacilityForm.value['TOTAL_DISBURSEMENT'];
    facUpdate.EFFECTIVE_DATE = this.addDetailFacilityForm.value['EFFECTIVE_DATE'];
    facUpdate.END_DATE = this.addDetailFacilityForm.value['END_DATE'];
    facUpdate.DISBURSEMENT_END_DATE = this.addDetailFacilityForm.value['DISBURSEMENT_END_DATE'];
    facUpdate.MAX_DISBURSEMENT = this.addDetailFacilityForm.value['MAX_DISBURSEMENT'];
  }
  // Hàm thực hiện thêm hạn mức (hoặc thoát)
  SubmitCreateFacilityForm(action: string, type: string) {
    console.log("PRODUCT_ID: ", this.addDetailFacilityForm.value['PRODUCT_ID'].data);
    // Action là thoát
    if (action === "Close") {
      this.closePopup.emit(false);
    }

    // Nếu là Fac con
    if (type === "Detail") {
      this.submittedDetail = true;
      if (!this.addDetailFacilityForm.valid) {
        this.messageService.add({ severity: 'warn', summary: 'Không thành công', detail: 'Vui lòng cập nhật đầy đủ thông tin!' });
        return;
      };
      this.MappingDetailFacility(this.createFac);
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
    }
    else if (action === "Edit") {
      if (this.facEdit) {
        this.facTemp = this.carViewModel.ListFacility.filter(item => item.ID === this.facEdit.ID)[0];

        this.carViewModel.ListFacility = this.carViewModel.ListFacility.filter(item => item.ID !== this.facEdit.ID);
        this.MappingDetailFacility(this.facTemp);
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
