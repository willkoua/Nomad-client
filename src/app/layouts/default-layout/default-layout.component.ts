import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  template: `
    <div id="container">
      <header>
        <app-header></app-header>
      </header>
      <div class="container-fluid">
        <router-outlet></router-outlet>
      </div>
      <footer>
        <app-footer></app-footer>
      </footer>
    </div>
  `,
  styles: []
})
export class DefaultLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
