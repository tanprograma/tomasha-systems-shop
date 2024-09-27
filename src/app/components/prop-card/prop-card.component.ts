import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'prop-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './prop-card.component.html',
  styleUrl: './prop-card.component.scss',
})
export class PropCardComponent {
  @Input() money?: boolean;
  @Input() symbol?: string;
  @Input() title!: string;
  @Input() content!: any;
}
