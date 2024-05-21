import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCatgoryComponent } from './overview-catgory.component';

describe('OverviewCatgoryComponent', () => {
  let component: OverviewCatgoryComponent;
  let fixture: ComponentFixture<OverviewCatgoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewCatgoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewCatgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
