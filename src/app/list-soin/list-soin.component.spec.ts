import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoinComponent } from './list-soin.component';

describe('ListSoinComponent', () => {
  let component: ListSoinComponent;
  let fixture: ComponentFixture<ListSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
