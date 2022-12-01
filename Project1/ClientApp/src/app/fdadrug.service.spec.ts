import { TestBed } from '@angular/core/testing';

import { FDADrugService } from './fdadrug.service';

describe('FDADrugService', () => {
  let service: FDADrugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FDADrugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
