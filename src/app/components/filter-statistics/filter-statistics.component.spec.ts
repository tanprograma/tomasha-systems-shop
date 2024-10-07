import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStatisticsComponent } from './filter-statistics.component';

describe('FilterStatisticsComponent', () => {
  let component: FilterStatisticsComponent;
  let fixture: ComponentFixture<FilterStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
