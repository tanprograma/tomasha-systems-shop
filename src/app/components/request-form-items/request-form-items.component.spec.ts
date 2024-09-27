import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormItemsComponent } from './request-form-items.component';

describe('RequestFormItemsComponent', () => {
  let component: RequestFormItemsComponent;
  let fixture: ComponentFixture<RequestFormItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestFormItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestFormItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
