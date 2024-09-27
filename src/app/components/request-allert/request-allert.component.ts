import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllertStatusComponent } from '../allert-status/allert-status.component';
import { AllertLoadingComponent } from '../allert-loading/allert-loading.component';

@Component({
  selector: 'request-allert',
  standalone: true,
  imports: [AllertStatusComponent, AllertLoadingComponent],
  templateUrl: './request-allert.component.html',
  styleUrl: './request-allert.component.scss',
})
export class RequestAllertComponent {
  @Input() loading!: boolean;
  @Input() status?: boolean;
  @Input() message?: string;
  @Output() onSubmit = new EventEmitter<boolean>();
  submit(event: boolean) {
    this.onSubmit.emit(event);
  }
}
