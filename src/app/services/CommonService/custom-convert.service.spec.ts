import { TestBed } from '@angular/core/testing';

import { CustomConvertService } from './custom-convert.service';

describe('CustomConvertService', () => {
  let service: CustomConvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
