import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMainInfoComponent } from './customer-main-info.component';

describe('CustomerMainInfoComponent', () => {
  let component: CustomerMainInfoComponent;
  let fixture: ComponentFixture<CustomerMainInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMainInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
