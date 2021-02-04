import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from 'src/app/common/Language';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.sass']
})
export class LanguageListComponent implements OnInit {

  availableLanguages = [
    new Language('sw', 'Kiswahili'),
    new Language('hi', 'हिन्दी'),
    new Language('ar', 'العربية'),
    new Language('zh', '中文'),
    new Language('es', 'Español'),
    new Language('fr', 'Français'),
    new Language('en', 'English')
  ];
  constructor(private router: Router,
              private currentPath: ActivatedRoute) {}
  ngOnInit(): void {
  }

  /* Thank you to Ervin Llojku and Terry Lam on Stack Overflow for
  explaining how to navigate using relativeTo.
  https://stackoverflow.com/questions/38212529/relative-links-partial-routes-with-routerlink */
  changeLanguage(language: Language): void {
    this.router.navigate([language.abbr], {relativeTo: this.currentPath});
  }
}
