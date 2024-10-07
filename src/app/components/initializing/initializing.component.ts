import { Component, Input } from '@angular/core';
import { AllertLoadingComponent } from '../allert-loading/allert-loading.component';

@Component({
  selector: 'initializing',
  standalone: true,
  imports: [AllertLoadingComponent],
  templateUrl: './initializing.component.html',
  styleUrl: './initializing.component.scss',
})
export class InitializingComponent {
  @Input() loading!: boolean;

  @Input() message?: string;
}
