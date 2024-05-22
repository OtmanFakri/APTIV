import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGendreComponent } from './table-gendre.component';

describe('TableGendreComponent', () => {
  let component: TableGendreComponent;
  let fixture: ComponentFixture<TableGendreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableGendreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableGendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
