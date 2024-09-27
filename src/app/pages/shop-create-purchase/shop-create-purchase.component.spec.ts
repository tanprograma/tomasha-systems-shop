import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCreatePurchaseComponent } from './shop-create-purchase.component';

describe('ShopCreatePurchaseComponent', () => {
  let component: ShopCreatePurchaseComponent;
  let fixture: ComponentFixture<ShopCreatePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCreatePurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCreatePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
