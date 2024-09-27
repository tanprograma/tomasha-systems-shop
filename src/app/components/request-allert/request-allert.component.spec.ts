import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAllertComponent } from './request-allert.component';

describe('RequestAllertComponent', () => {
  let component: RequestAllertComponent;
  let fixture: ComponentFixture<RequestAllertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAllertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAllertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
