import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';

// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { ThemeModeService } from './core/parts/theme-mode-switcher/theme-mode.service';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService,
    private cd:ChangeDetectorRef
  ) {
    window['app'] = this
    // register translations
    this.translationService.loadTranslations(
      enLang,
      esLang,
    );
  }

  ngOnInit() {
    this.modeService.init();
  }
}