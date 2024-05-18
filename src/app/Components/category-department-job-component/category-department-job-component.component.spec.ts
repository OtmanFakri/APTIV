import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDepartmentJobComponentComponent } from './category-department-job-component.component';

describe('CategoryDepartmentJobComponentComponent', () => {
  let component: CategoryDepartmentJobComponentComponent;
  let fixture: ComponentFixture<CategoryDepartmentJobComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDepartmentJobComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryDepartmentJobComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
