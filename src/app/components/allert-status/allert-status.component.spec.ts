import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllertStatusComponent } from './allert-status.component';

describe('AllertStatusComponent', () => {
  let component: AllertStatusComponent;
  let fixture: ComponentFixture<AllertStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllertStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllertStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
