import { TestBed } from '@angular/core/testing';

import { ConterVisiteService } from './conter-visite.service';

describe('ConterVisiteService', () => {
  let service: ConterVisiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConterVisiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
