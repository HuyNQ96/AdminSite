import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DetailUserComponent } from './views/user/detail-user/detail-user.component';

// PrimeNG Library
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SplitterModule } from 'primeng/splitter';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { TableModule, ColumnFilter } from 'primeng/table';

// Connection
import { HttpClientModule } from '@angular/common/http';
import { CarInfoComponent } from './views/car/car-info/car-info.component';
import { ButtonBarComponent } from './views/share/button-bar/button-bar.component';
import { FacilityInfoComponent } from './views/facility/facility-info/facility-info.component';
import { FacilityListComponent } from './views/facility/facility-list/facility-list.component';
import { FacilityDetailComponent } from './views/facility/facility-detail/facility-detail.component';

@NgModule({
  // Component
  declarations: [
    AppComponent,
    DetailUserComponent,
    CarInfoComponent,
    ButtonBarComponent,
    FacilityInfoComponent,
    FacilityListComponent,
    FacilityDetailComponent
  ],
  // Module
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    SplitterModule,
    PanelMenuModule,
    AccordionModule,
    BrowserAnimationsModule,
    TabViewModule,
    TableModule,
    ColumnFilter,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
