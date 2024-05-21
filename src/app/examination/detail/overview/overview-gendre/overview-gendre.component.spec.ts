import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewGendreComponent } from './overview-gendre.component';

describe('OverviewGendreComponent', () => {
  let component: OverviewGendreComponent;
  let fixture: ComponentFixture<OverviewGendreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewGendreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewGendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
