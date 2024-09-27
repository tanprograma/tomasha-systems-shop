import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropCardActionComponent } from './prop-card-action.component';

describe('PropCardActionComponent', () => {
  let component: PropCardActionComponent;
  let fixture: ComponentFixture<PropCardActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropCardActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropCardActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
