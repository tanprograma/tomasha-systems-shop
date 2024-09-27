import { Component, inject, OnInit } from '@angular/core';

import { RequestFormComponent } from '../../components/request-form/request-form.component';

@Component({
  selector: 'create-request',
  standalone: true,
  imports: [RequestFormComponent],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.scss',
})
export class CreateRequestComponent {}
