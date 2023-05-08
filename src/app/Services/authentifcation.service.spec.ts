import { TestBed } from '@angular/core/testing';

import { AuthentifcationService } from './authentifcation.service';

describe('AuthentifcationService', () => {
  let service: AuthentifcationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentifcationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
