import { Component, Input } from '@angular/core';
import { StatisticsSummary } from '../../interfaces/statistics-summary';
import { PropCardComponent } from '../prop-card/prop-card.component';

@Component({
  selector: 'statistics-summary',
  standalone: true,
  imports: [PropCardComponent],
  templateUrl: './statistics-summary.component.html',
  styleUrl: './statistics-summary.component.scss',
})
export class StatisticsSummaryComponent {
  @Input() data!: StatisticsSummary[];
  maximize(data: number) {
    return Math.ceil(data);
  }
  minimize(data: number) {
    return Math.floor(data);
  }
}
