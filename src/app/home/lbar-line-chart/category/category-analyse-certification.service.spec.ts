import { TestBed } from '@angular/core/testing';

import { CategoryAnalyseCertificationService } from './category-analyse-certification.service';

describe('CategoryAnalyseCertificationService', () => {
  let service: CategoryAnalyseCertificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAnalyseCertificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
