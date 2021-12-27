import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarInfoComponent } from './views/car/car-info/car-info.component';

const routes: Routes = [
  { path: 'carinfo/:applicationCode', component: CarInfoComponent },
  { path: '', component: CarInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }