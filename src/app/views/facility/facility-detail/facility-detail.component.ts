import { Component, Input, OnInit } from '@angular/core';
import { CarModel } from 'src/app/models/car.model';
import { FacilityModel } from 'src/app/models/facility.model';
import { CarService } from 'src/app/services/CarService/car.service';
import { FacilityService } from 'src/app/services/FacilityService/facility.service';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html',
  styleUrls: ['./facility-detail.component.scss']
})
export class FacilityDetailComponent implements OnInit {
  @Input() facilityId: number = 0;
  activeState: boolean[] = [true, true, true];

  currentFacility: FacilityModel = {} as FacilityModel;

  carViewModel: CarModel = {} as CarModel;

  constructor(private facilityService: FacilityService, private carService: CarService) { }

  ngOnInit(): void {
    this.carService.carInfo$.subscribe(data => {
      this.carViewModel = data;
    });
    // Trong trường hợp Fac đã được lưu thì lấy thông tin dưới DB
    if (this.facilityId > 0) {
      this.facilityService.getDetailFacility(this.facilityId).subscribe((data: FacilityModel) => {
        this.currentFacility = data;
        this.carService.carInfo$.next(this.carViewModel);
      });
    }

    // Trong trường hợp Fac chưa được lưu thì lấy thông tin trong Temp
    else {
      let lstFac = this.carViewModel.ListFacility.filter(x => x.ID === this.facilityId);
      if (lstFac) {
        this.currentFacility = lstFac[0];
      }
    }
  }
}
