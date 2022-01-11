import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetailFormCreateComponent } from './facility-detail-form-create.component';

describe('FacilityDetailFormCreateComponent', () => {
  let component: FacilityDetailFormCreateComponent;
  let fixture: ComponentFixture<FacilityDetailFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityDetailFormCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityDetailFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
