import { Component, inject, OnInit, AfterViewInit } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  document = inject(DOCUMENT);

  // route=inject(ActivatedRoute)
  title = 'HARDWARE';
  ngOnInit(): void {
    // this.setAPI_URL();
  }
}
