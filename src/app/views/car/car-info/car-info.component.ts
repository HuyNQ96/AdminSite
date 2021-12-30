import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CarModel } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/CarService/car.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
  providers: [MessageService]
})
export class CarInfoComponent implements OnInit {

  applicationCode: any;
  customerId: number = 0;

  carViewModel = {} as CarModel;

  isActive: boolean = false;

  activeMainTab: string = 'MainTab';
  constructor(private route: ActivatedRoute, 
    private carService: CarService,
    public messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm khách hàng thành công vào hồ sơ!' });

    this.OnChangeMainTab('MainTab');
    // Lấy thông tin CAR

    this.route.paramMap.subscribe(params => {
      this.applicationCode = params.get('applicationCode');
      console.log('applicationCode: ', this.applicationCode);
    });
    // Lấy thông tin CAR  
    this.carService.getCarDetail(this.applicationCode).subscribe((data: CarModel) => {
      this.carViewModel = data;
      this.customerId = data.CUSTOMER_ID;
      this.carService.carInfo$.next(data);
      console.log('Customer ID: ', this.carViewModel.CUSTOMER_ID);
      console.log('Car ID: ', this.carViewModel.ID);
    });

  }
  onClickSaveApp(){
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm khách hàng thành công vào hồ sơ!' });
  }
  OnclickShowMenu(){
    this.isActive = !this.isActive;
  }

  public OnChangeMainTab(tabName: string = '') {
    this.activeMainTab = tabName;
  }
}
