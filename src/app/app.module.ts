import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


// PrimeNG Library
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SplitterModule } from 'primeng/splitter';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';

// Connection
import { HttpClientModule } from '@angular/common/http';

// Component
import { CarInfoComponent } from './views/car/car-info/car-info.component';
import { ButtonBarComponent } from './views/share/button-bar/button-bar.component';
import { FacilityInfoComponent } from './views/facility/facility-info/facility-info.component';
import { FacilityListComponent } from './views/facility/facility-list/facility-list.component';
import { FacilityDetailComponent } from './views/facility/facility-detail/facility-detail.component';
import { AppComponent } from './app.component';
import { DetailUserComponent } from './views/user/detail-user/detail-user.component';
import { ListUserComponent } from './views/user/list-user/list-user.component';

@NgModule({
  // Component
  declarations: [
    AppComponent,
    DetailUserComponent,
    CarInfoComponent,
    ButtonBarComponent,
    FacilityInfoComponent,
    FacilityListComponent,
    FacilityDetailComponent,
    ListUserComponent
  ],
  // Module
  imports: [
    HttpClientModule,
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
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    SliderModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
