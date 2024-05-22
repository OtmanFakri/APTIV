import { TestBed } from '@angular/core/testing';

import { DepartmentTableService } from './department-table.service';

describe('DepartmentTableService', () => {
  let service: DepartmentTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
