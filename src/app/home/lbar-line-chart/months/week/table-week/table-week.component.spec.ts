import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWeekComponent } from './table-week.component';

describe('TableWeekComponent', () => {
  let component: TableWeekComponent;
  let fixture: ComponentFixture<TableWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableWeekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
