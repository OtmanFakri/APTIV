import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorizeEmployeeComponent } from './categorize-employee.component';

describe('CategorizeEmployeeComponent', () => {
  let component: CategorizeEmployeeComponent;
  let fixture: ComponentFixture<CategorizeEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorizeEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorizeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
