import { Component, Input } from '@angular/core';
import { Log } from '../../interfaces/log';

@Component({
  selector: 'log',
  standalone: true,
  imports: [],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent {
  @Input() log!: Log;
  getDate() {
    return new Date(this.log.createdAt as string).toUTCString();
  }
}
