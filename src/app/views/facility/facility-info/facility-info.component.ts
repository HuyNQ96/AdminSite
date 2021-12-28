import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { FacilityModel } from 'src/app/models/facility.model';
import { FacilityService } from 'src/app/services/FacilityService/facility.service';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss'],
  providers: [MessageService]
})
export class FacilityInfoComponent implements OnInit {
  @Input() applicationId: number = 0;

  lstFacility = [] as FacilityModel[];

  activeState: boolean[] = [true, false, false];
  index: number = 0;

  items: MenuItem[] = [];

  displayModalDetail: boolean = false;
  displayModalGeneral: boolean = false;

  stateOptions: any[];
  value1: string = "off";

  cities: City[] = [];
  selectedCity1: any;

  constructor(public messageService: MessageService,
    private facilityService: FacilityService,
    private primengConfig: PrimeNGConfig) {
    this.stateOptions = [
      { label: "Quay vòng", value: "1" },
      { label: "Không quay vòng", value: "0" }
    ];

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    if (this.applicationId > 0) {
      this.facilityService.getListFacilityByAppId(this.applicationId).subscribe((data: FacilityModel[]) => {

        console.log("data: ", data);
        this.lstFacility = data;
        console.log("lstFacility: ", this.lstFacility);
      });
    }

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
  showPopUpCreateGeneralFac() {
    this.displayModalGeneral = true;
    this.displayModalDetail = false;
  }

  showPopUpCreateDetailFac() {
    this.displayModalDetail = true;
    this.displayModalGeneral = false;
  }

  save(severity: string) {
    this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }

  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
  }
  OnchangeIndexTab(newIndex: number = 0) {
    this.index = newIndex;
  }
}
