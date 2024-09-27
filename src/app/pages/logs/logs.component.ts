import { Component } from '@angular/core';
import { LogComponent } from '../../components/log/log.component';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [LogComponent],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent {
  logs = [
    { createdAt: '2/7/2023', message: 'created the app' },
    { createdAt: '3/8/2023', message: 'maintaining  the app' },
    { createdAt: '4/10/2023', message: 'deleted the app' },
  ];
}
