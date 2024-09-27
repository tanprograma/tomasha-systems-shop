import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'allert-status',
  standalone: true,
  imports: [],
  templateUrl: './allert-status.component.html',
  styleUrl: './allert-status.component.scss',
})
export class AllertStatusComponent {
  @Input() message?: string;
  @Output() onSubmit = new EventEmitter<boolean>();
  submit() {
    this.onSubmit.emit(true);
  }
}
