import { Component, OnInit } from '@angular/core';
import { slideAnimation } from '@app/animations';
import { BasePage } from '@app/core/layout/base/base.page';

@Component({
  selector: 'app-wz-done',
  templateUrl: './wz-done.component.html',
  animations:[slideAnimation]
})
export class WzDoneComponent extends BasePage implements OnInit {
  returnUrl: string;


  ngOnInit() {

    window['done'] = this
    this.returnUrl =
    this.activatedRoute.snapshot.queryParams['returnUrl'.toString()] || '/';

    this.initBase()
  }


  next(){
    this.router.navigate([this.returnUrl]);
  }
}
