import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSalesInfoComponent } from './shop-sales-info.component';

describe('ShopSalesInfoComponent', () => {
  let component: ShopSalesInfoComponent;
  let fixture: ComponentFixture<ShopSalesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopSalesInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSalesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
