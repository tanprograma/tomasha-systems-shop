import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropCardComponent } from './prop-card.component';

describe('PropCardComponent', () => {
  let component: PropCardComponent;
  let fixture: ComponentFixture<PropCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
