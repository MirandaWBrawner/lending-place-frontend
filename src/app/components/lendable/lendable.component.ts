import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Lendable } from '../../common/Lendable';
import { ActivatedRoute } from '@angular/router';
import { LendableService } from 'src/app/services/lendable.service';
import { Language } from '../../common/Language';
import { formatNumber } from '@angular/common';
import { ReserveRequest } from 'src/app/common/ReserveRequest';
import { ReserveResponse } from 'src/app/common/ReserveResponse';
import { Category } from 'src/app/common/Category';

@Component({
  selector: 'app-lendable',
  templateUrl: './lendable.component.html',
  styleUrls: ['./lendable.component.sass']
})
export class LendableComponent implements OnInit {

  language = 'zh';
  selectedCategory = -1;
  searchBarText = '';
  availableLanguages = [
    new Language('sw', ''),
    new Language('hi', 'हिन्दी'),
    new Language('ar', 'العربية'),
    new Language('zh', '中文'),
    new Language('es', 'Español'),
    new Language('fr', 'Français'),
    new Language('en', 'English')
  ];
  languageArray = ['sw', 'hi', 'ar', 'zh', 'es', 'fr', 'en'];
  rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ug', 'yi', 'tg', 'ps', 'dv'];
  categories: Category[] = [];
  displayedLendables: Lendable[] = [];
  cart: Lendable[] = [];
  viewingCart = false;
  confirmingRequest = false;
  reserveResponse: ReserveResponse | null = null;
  @Output() public updateNotifier: EventEmitter<string> = new EventEmitter();
  constructor(private currentPath: ActivatedRoute,
              private lendableService: LendableService) {}

  ngOnInit(): void {
    this.updateNotifier.emit('/browse');
    this.currentPath.paramMap.subscribe(() => {
      const theLanguage = this.currentPath.snapshot.paramMap.get('language');
      if (theLanguage !== null) {
        this.language = theLanguage;
      }
    });
    this.search(this.searchBarText);
    this.getCategories();
  }

  toLocalFormat(amount: number): string {
    try {
    const tryFormat = formatNumber(amount, this.language);
    if (tryFormat === undefined) {
      return `${amount}`;
    } else {
      return tryFormat;
    }
    } catch (exception) {
      return `${amount}`;
    }
  }

  nullUndefToZero(input: number | null | undefined): number {
    if (input === null || input === undefined) {
      return 0;
    } else {
      return input;
    }
  }


  textDirection(tempLanguage: string): string {
    if (this.rtlLanguages.includes(tempLanguage.substring(0, 2))) {
      return 'rtl';
    }
    return 'ltr';
  }

  getCategories(): void {
    this.lendableService.getCategoryList(this.language).subscribe(
      results => {
        this.categories = results;
      }
    );
  }

  displayCategory(): void {
    if (this.selectedCategory === -1) {
      this.search('');
    } else {
      this.lendableService.getLendablesInCategory(this.language, this.selectedCategory)
      .subscribe(results => {
        this.displayedLendables = results;
      });
    }
  }

  selectCategory(categoryId: number): void {
    this.selectedCategory = categoryId;
    this.displayCategory();
  }

  getStyleClassForCategory(categoryId: number): string {
    if (categoryId === this.selectedCategory) {
      return 'selectedCategory';
    } else {
      return 'categoryNotSelected';
    }
  }

  search(searchBarText: string): void {
    this.lendableService.search(searchBarText, this.language).subscribe(
      results => {
        this.displayedLendables = results;
        for (const lendable of this.displayedLendables) {
          if (lendable.imagePath === null || lendable.imagePath === '') {
            lendable.imagePath = 'defaultPicture.png';
          }
        }
      }
    );
  }

  lendableName(item: Lendable | Category, theLanguage: string): string {
    switch (theLanguage.substring(0, 2)) {
      case 'en': return item.english;
      case 'hi': return item.hindi;
      case 'sw': return item.swahili;
      case 'ar': return item.arabic;
      case 'zh': return item.mandarin;
      case 'es': return item.spanish;
      case 'fr': return item.french;
      default: return '?';
  }
  }
  addToCart(item: Lendable): void {
    this.cart.push(item);
  }
  removeFromCart(itemToRemove: Lendable): void {
    const newCart: Lendable[] = [];
    let stillLooking = true;
    for (const currentItem of this.cart) {
      if (stillLooking && currentItem.id === itemToRemove.id) {
        stillLooking = false;
      } else {
        newCart.push(currentItem);
      }
    }
    this.cart = newCart;
  }
  viewCart(): void {
    this.viewingCart = !(this.viewingCart);
  }
  toggleConfirm(): void {
    this.confirmingRequest = !(this.confirmingRequest);
  }
  placeOrder(requesterName?: string): void {
    let theName = '';
    if (requesterName !== undefined && requesterName !== null) {
      theName = requesterName;
    }
    const reserveForm: ReserveRequest = ReserveRequest.build(
      theName, this.cart);
    this.lendableService.reserve(reserveForm).subscribe(
      response => this.reserveResponse = response
    );
  }
  translationFromArray(array: string[]): string {
    if (array.length < this.languageArray.length) {
      return '?';
    }
    for (let index = 0; index < this.availableLanguages.length;
      index++) {
        if (this.availableLanguages[index].abbr === this.language) {
          return array[index];
        }
      }
    return '?';
  }
  localizeAndInflect(template: string, count: number, nounClass?: string): string {
    const theNounClass = nounClass === undefined || nounClass === null ? 'F' : nounClass;
    if (count === 1) {
      let result = this.localize(`${template} Singular ${theNounClass}`);
      if (result === '?') {
        result = this.localize(`${template} Singular`);
      }
      return result;
    } else {
      let result = this.localize(`${template} Plural ${theNounClass}`);
      if (result === '?') {
        result = this.localize(`${template} Plural`);
      }
      return result;
    }
  }
  availableText(item: Lendable): string {
    return this.localizeAndInflect('Available to Borrow', item.numberAvailable);
  }
  localize(template: string): string {
    switch (template) {
      case 'Browse the Lending Place': {
        if (this.viewingCart) {
          return this.translationFromArray([
            'Mkokoteni',
            'अपनी टोकरी',
            'عربة التسوق',
            '你的购物车',
            'Su carrito',
            'Votre panier',
            'Your Cart'
          ]);
        } else {
          return this.translationFromArray([
            'Kuvinjari',
            'खोजिए',
            'تصفح',
            '浏览',
            'Navegue en biblioteca',
            'Naviguer sur la médiathèque',
            'Browse the Library'
          ]);
        }
      }
      case 'Search':
        return this.translationFromArray([
          'Tafuta',
          'खोजिए',
          'بَحْث',
          '搜索',
          'Busque',
          'Chercher',
          'Search'
        ]);
      case 'Available to Borrow Singular F':
        return this.translationFromArray([
          'Kupatikana',
          'हाज़िर',
          'متوفرة',
          '可买到的',
          'Disponible',
          'Disponible',
          'Available'
        ]);
        case 'Available to Borrow Singular M':
          return this.translationFromArray([
            'Kupatikana',
            'हाज़िर',
            'متوفر',
            '可买到的',
            'Disponible',
            'Disponible',
            'Available'
          ]);
        case 'Available to Borrow Plural':
          return this.translationFromArray([
            'Kupatikana',
            'हाज़िर',
            'متوفرات',
            '可买到的',
            'Disponibles',
            'Disponibles',
            'Available'
          ]);
        case 'Everything':
          return this.translationFromArray([
            'Kila kitu',
            'प्रत्येक',
            'كل شيء',
            '每事',
            'Todo',
            'Tout',
            'Everything'
          ]);
      default: return '?';
    }
  }
}
