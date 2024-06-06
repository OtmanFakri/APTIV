import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSoinComponent } from './create-soin.component';

describe('CreateSoinComponent', () => {
  let component: CreateSoinComponent;
  let fixture: ComponentFixture<CreateSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
