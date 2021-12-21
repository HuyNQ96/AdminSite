import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss']
})
export class FacilityInfoComponent implements OnInit {
  activeState: boolean[] = [true, false, false];
  index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  
  OnchangeIndexTab(newIndex :number = 0){
    this.index = newIndex;
  }
}
