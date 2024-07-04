import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from './core/layout.service';
import { LayoutInitService } from './core/layout-init.service';
import { ILayout, LayoutType } from './core/configs/config';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  constructor(
    private menu: MenuController,
    private initService: LayoutInitService,
    public layout: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // define layout type and load layout
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentLayoutType = this.layout.currentLayoutTypeSubject.value;

      }
    });
  }

  ngOnInit() {
    const subscr = this.layout.layoutConfigSubject
      .asObservable()
      .subscribe((config) => {
        this.updateProps(config);
      });
    this.unsubscribe.push(subscr);
  }

  async navigate(item){
    this.router.navigate([item.url]);

      await this.menu.close();
    
  }

  updateProps(config: ILayout) {
   
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
