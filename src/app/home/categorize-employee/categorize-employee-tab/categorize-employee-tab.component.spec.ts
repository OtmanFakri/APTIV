import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorizeEmployeeTabComponent } from './categorize-employee-tab.component';

describe('CategorizeEmployeeTabComponent', () => {
  let component: CategorizeEmployeeTabComponent;
  let fixture: ComponentFixture<CategorizeEmployeeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorizeEmployeeTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorizeEmployeeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
