import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityFormCreateComponent } from './facility-form-create.component';

describe('FacilityFormCreateComponent', () => {
  let component: FacilityFormCreateComponent;
  let fixture: ComponentFixture<FacilityFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityFormCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
