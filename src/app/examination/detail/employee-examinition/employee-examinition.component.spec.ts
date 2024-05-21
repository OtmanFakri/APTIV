import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExaminitionComponent } from './employee-examinition.component';

describe('EmployeeExaminitionComponent', () => {
  let component: EmployeeExaminitionComponent;
  let fixture: ComponentFixture<EmployeeExaminitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeExaminitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeExaminitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
