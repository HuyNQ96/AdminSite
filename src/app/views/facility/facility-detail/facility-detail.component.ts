import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html',
  styleUrls: ['./facility-detail.component.scss']
})
export class FacilityDetailComponent implements OnInit {
  activeState: boolean[] = [true, true, true];

  constructor() { }

  ngOnInit(): void {
  }
}
