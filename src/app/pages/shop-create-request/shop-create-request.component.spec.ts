import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCreateRequestComponent } from './shop-create-request.component';

describe('ShopCreateRequestComponent', () => {
  let component: ShopCreateRequestComponent;
  let fixture: ComponentFixture<ShopCreateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCreateRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
