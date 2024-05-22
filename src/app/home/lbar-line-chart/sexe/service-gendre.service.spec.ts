import { TestBed } from '@angular/core/testing';

import { ServiceGendreService } from './service-gendre.service';

describe('ServiceGendreService', () => {
  let service: ServiceGendreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceGendreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
