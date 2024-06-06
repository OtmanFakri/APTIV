import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSoinComponent } from './detail-soin.component';

describe('DetailSoinComponent', () => {
  let component: DetailSoinComponent;
  let fixture: ComponentFixture<DetailSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
