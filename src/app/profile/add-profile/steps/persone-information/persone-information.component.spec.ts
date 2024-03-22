import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneInformationComponent } from './persone-information.component';

describe('PersoneInformationComponent', () => {
  let component: PersoneInformationComponent;
  let fixture: ComponentFixture<PersoneInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersoneInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersoneInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
