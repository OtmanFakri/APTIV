import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSoinComponent } from './update-soin.component';

describe('UpdateSoinComponent', () => {
  let component: UpdateSoinComponent;
  let fixture: ComponentFixture<UpdateSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
