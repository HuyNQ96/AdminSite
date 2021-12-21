import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  public lstUser: UserModel[] = [];
  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getListUser().subscribe(data => {
      console.log('lstUser: ', data);
      this.lstUser = data;
      console.log('lstUser merge: ', this.lstUser);
    });
  }
  
}
