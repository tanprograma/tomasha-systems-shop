import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPurchasesComponent } from './shop-purchases.component';

describe('ShopPurchasesComponent', () => {
  let component: ShopPurchasesComponent;
  let fixture: ComponentFixture<ShopPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopPurchasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
