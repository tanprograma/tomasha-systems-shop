import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleFormItemsComponent } from './sale-form-items.component';

describe('SaleFormItemsComponent', () => {
  let component: SaleFormItemsComponent;
  let fixture: ComponentFixture<SaleFormItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleFormItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleFormItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
