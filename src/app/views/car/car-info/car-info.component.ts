import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent implements OnInit {
  applicationId: string = '';
  temp: any;
  sub: any;
  sub1: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      if (params.get('applicationId') !== null)
        this.temp = params.get('applicationId');
      this.applicationId = this.temp !== null ? this.temp : '';
      console.log('route1111: ', this.temp);
    });

    this.route.params.forEach(param =>{
      this.sub1 = param['applicationId'];
      console.log('sub1: ', this.sub1);
    });

    console.log('applicationId: ', this.applicationId);
    this.sub = this.route.params.subscribe(params => {
      this.applicationId = params['applicationId'];
      console.log('route: ', this.route.params);
      console.log('applicationId: ', this.applicationId);
      console.log('applicationId: ', params['applicationId']);
    });
  }

}
