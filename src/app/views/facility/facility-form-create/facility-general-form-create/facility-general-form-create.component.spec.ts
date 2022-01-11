import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityGeneralFormCreateComponent } from './facility-general-form-create.component';

describe('FacilityGeneralFormCreateComponent', () => {
  let component: FacilityGeneralFormCreateComponent;
  let fixture: ComponentFixture<FacilityGeneralFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityGeneralFormCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityGeneralFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
