import { TestBed } from '@angular/core/testing';

import { PetfinderService } from './petfinder.service';

describe('PetfinderService', () => {
  let service: PetfinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetfinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
