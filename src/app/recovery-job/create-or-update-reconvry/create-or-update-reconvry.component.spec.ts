import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateReconvryComponent } from './create-or-update-reconvry.component';

describe('CreateOrUpdateReconvryComponent', () => {
  let component: CreateOrUpdateReconvryComponent;
  let fixture: ComponentFixture<CreateOrUpdateReconvryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateReconvryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrUpdateReconvryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
