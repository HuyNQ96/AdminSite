import { Component, Input, OnInit } from '@angular/core';
import { FacilityModel } from 'src/app/models/facility.model';
import { FacilityService } from 'src/app/services/FacilityService/facility.service';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss']
})

export class FacilityListComponent implements OnInit {
  @Input() lstFacility = [] as FacilityModel[];

  constructor(private facilityService: FacilityService) { }

  ngOnInit() {

  }
}