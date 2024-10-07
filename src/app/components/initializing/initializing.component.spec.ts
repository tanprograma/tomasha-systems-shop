import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializingComponent } from './initializing.component';

describe('InitializingComponent', () => {
  let component: InitializingComponent;
  let fixture: ComponentFixture<InitializingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitializingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitializingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
