import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'allert-loading',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './allert-loading.component.html',
  styleUrl: './allert-loading.component.scss',
})
export class AllertLoadingComponent {
  @Input() message?: string;
  loadingIcon = faSpinner;
}
