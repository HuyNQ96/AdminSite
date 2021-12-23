import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html',
  styleUrls: ['./facility-detail.component.scss']
})
export class FacilityDetailComponent implements OnInit {
  @Input() facilityIdString: string = '';
  activeState: boolean[] = [true, true, true];
  public facilityId = 0;
  constructor() { }

  ngOnInit(): void {
    this.facilityId = parseInt(this.facilityIdString);
    console.log('facilityId', this.facilityId);
  }
}
