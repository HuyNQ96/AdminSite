import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { CarModel } from 'src/app/models/car.model';
import { DropdownModel } from 'src/app/models/common.model';
import { FacilityModel } from 'src/app/models/facility.model';
import { CarService } from 'src/app/services/CarService/car.service';
import { FacilityService } from 'src/app/services/FacilityService/facility.service';

@Component({
  selector: 'app-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss'],
  providers: [MessageService]
})
export class FacilityInfoComponent implements OnInit {
  carViewModel: CarModel = {} as CarModel;

  activeState: boolean[] = [true, false, false];
  index: number = 0;

  constructor(public messageService: MessageService,
    private facilityService: FacilityService,
    private carService: CarService,
    private primengConfig: PrimeNGConfig) {

  }

  ngOnInit() {
    this.carService.carInfo$.subscribe(data => {
      this.carViewModel = data;
    });

    this.primengConfig.ripple = true;

    if (this.carViewModel.ID > 0 && !this.carViewModel.ListFacility) {
      this.facilityService.getListFacilityByAppId(this.carViewModel.ID).subscribe((data: FacilityModel[]) => {
        console.log("data: ", data);
        this.carViewModel.ListFacility = data;
        this.carService.carInfo$.next(this.carViewModel);
        console.log("lstFacility: ", this.carViewModel.ListFacility);
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
