import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSellBackdateComponent } from './shop-sell-backdate.component';

describe('ShopSellBackdateComponent', () => {
  let component: ShopSellBackdateComponent;
  let fixture: ComponentFixture<ShopSellBackdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopSellBackdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSellBackdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
