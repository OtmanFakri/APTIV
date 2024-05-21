import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewDepComponent } from './overview-dep.component';

describe('OverviewDepComponent', () => {
  let component: OverviewDepComponent;
  let fixture: ComponentFixture<OverviewDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewDepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
