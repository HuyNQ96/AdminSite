import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss']
})

export class FacilityListComponent implements OnInit {
  datasource: UserModel[] = [];

  totalRecords: number = 0;

  cols: any[] = [];

  loading: boolean = false;

  row = 0;
  first = 0;
  public lstUser: UserModel[] = [];
  selectAll: boolean = false;

  selectedUsers: UserModel[] = [];

  constructor(private userService: UserService, private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.userService.getListUser().subscribe(data => {
      console.log('lstUser: ', data);
      this.datasource = data;
      this.totalRecords = data.length;
    });

    console.log('data', this.datasource);
    console.log('length', this.totalRecords);
    this.loading = true;
    this.primengConfig.ripple = true;
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
        if (event !== null) {
          this.row = event.rows ? event.rows : 0;
          this.first = event.first ? event.first : 0;
          this.lstUser = this.datasource.slice(event.first, (this.first + this.row));
          this.loading = false;
        }
      }
    }, 1000);
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedUsers = value;
  }

  onSelectAllChange(event:any) {
    const checked = event.checked;

    if (checked) {
      this.userService.getListUser().subscribe(data => {
        console.log('lstUser: ', data);
        this.selectedUsers = data;
        this.selectAll = true;
      });

    }
    else {
      this.selectedUsers = [];
      this.selectAll = false;
    }
  }

}