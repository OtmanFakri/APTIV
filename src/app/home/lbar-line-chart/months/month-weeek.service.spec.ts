import { TestBed } from '@angular/core/testing';

import { MonthWeeekService } from './month-weeek.service';

describe('MonthWeeekService', () => {
  let service: MonthWeeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthWeeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
