import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { DropdownModel } from 'src/app/models/common.model';
import { FacilityModel } from 'src/app/models/facility.model';
import { FacilityService } from 'src/app/services/FacilityService/facility.service';

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

  constructor(public messageService: MessageService, 
    private facilityService: FacilityService,
    private primengConfig: PrimeNGConfig) {
    
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
  }

  save(severity: string) {
    this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }

  OnchangeIndexTab(newIndex: number = 0) {
    this.index = newIndex;
  }
}
