import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'lendingplace';
  language = 'en';
  viewing = '/browse';
  getPathName(basePath: string): string {
    return `${basePath}/${this.language}`;
  }
}

