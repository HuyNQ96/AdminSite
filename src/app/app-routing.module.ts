import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarInfoComponent } from './views/car/car-info/car-info.component';
import { FacilityInfoComponent } from './views/facility/facility-info/facility-info.component';
import { FacilityListComponent } from './views/facility/facility-list/facility-list.component';

const routes: Routes = [
  { path: 'carinfo', component: CarInfoComponent },
  { path: 'facinfo', component: FacilityInfoComponent },
  { path: '', component: CarInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
