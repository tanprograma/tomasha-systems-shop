import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInventoriesComponent } from './shop-inventories.component';

describe('ShopInventoriesComponent', () => {
  let component: ShopInventoriesComponent;
  let fixture: ComponentFixture<ShopInventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopInventoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopInventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
