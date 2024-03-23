import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAccidentsComponent } from './info-accidents.component';

describe('InfoAccidentsComponent', () => {
  let component: InfoAccidentsComponent;
  let fixture: ComponentFixture<InfoAccidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoAccidentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoAccidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
