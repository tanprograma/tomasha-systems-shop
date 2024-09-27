import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopIssueRequestComponent } from './shop-issue-request.component';

describe('ShopIssueRequestComponent', () => {
  let component: ShopIssueRequestComponent;
  let fixture: ComponentFixture<ShopIssueRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopIssueRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopIssueRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
