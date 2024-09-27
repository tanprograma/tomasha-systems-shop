import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFilterComponent } from './purchase-filter.component';

describe('PurchaseFilterComponent', () => {
  let component: PurchaseFilterComponent;
  let fixture: ComponentFixture<PurchaseFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
