import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopReceivePurchaseComponent } from './shop-receive-purchase.component';

describe('ShopReceivePurchaseComponent', () => {
  let component: ShopReceivePurchaseComponent;
  let fixture: ComponentFixture<ShopReceivePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopReceivePurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopReceivePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
