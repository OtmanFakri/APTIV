import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByGendreComponent } from './by-gendre.component';

describe('ByGendreComponent', () => {
  let component: ByGendreComponent;
  let fixture: ComponentFixture<ByGendreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByGendreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ByGendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
