import { TestBed } from '@angular/core/testing';

import { PetFinderService } from './petfinder.service';

describe('PetfinderService', () => {
  let service: PetFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});