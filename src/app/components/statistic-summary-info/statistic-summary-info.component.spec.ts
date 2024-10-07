import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticSummaryInfoComponent } from './statistic-summary-info.component';

describe('StatisticSummaryInfoComponent', () => {
  let component: StatisticSummaryInfoComponent;
  let fixture: ComponentFixture<StatisticSummaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticSummaryInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticSummaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
