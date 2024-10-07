import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDispensedComponent } from './all-dispensed.component';

describe('AllDispensedComponent', () => {
  let component: AllDispensedComponent;
  let fixture: ComponentFixture<AllDispensedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDispensedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDispensedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
