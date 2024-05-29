import { TestBed } from '@angular/core/testing';

import { CategorizeEmployeeService } from './categorize-employee/categorize-employee.service';

describe('CategorizeEmployeeService', () => {
  let service: CategorizeEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorizeEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
