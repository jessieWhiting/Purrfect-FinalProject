import { TestBed } from '@angular/core/testing';

import { CutelistService } from './cutelist.service';

describe('CutelistService', () => {
  let service: CutelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
