import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Injector, Type, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { SelectComponent } from 'src/app/core/layout/components/select/select.component';
import { BasePage } from '@app/core/layout/base/base.page';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html'
})
export class TokenComponent extends BasePage implements OnInit, OnDestroy {

  @ViewChild('modal', { static: true }) modal!: IonModal;
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    token: 'auth-token-8f3ae836da744329a6f93bf20594b5cc',
    zone: '',
  };
  model: any = {
    token: '',
    zone: '',
  };

  selectedZonesText = '0 items'
  selectedZones:any[] = [];

  zones:any[]=[{
      id:1,
      name:"zona 1"
    },{
      id:2,
      name:"zona 2"
    },{
      id:3,
      name:"zona 3"
    }
  ];


  private formatData(data: string[]) {
    if (data.length === 1) {
      const item = this.zones.find((item) => item.name === data[0]);
      return item.name;
    }

    return `${data.length} items`;
  }

  zoneSelectionChanged(items:any) {
    this.ngZone.run(()=>{
      this.selectedZones = items;
      const names = this.selectedZones.map(e=>e.name)
      console.log("names:",names)
      this.selectedZonesText = this.formatData(names);
      console.log("selectedZonesText:",this.selectedZonesText)

      // this.modal.dismiss();
    })
  
  }

  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    super();
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  
     
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      token: [
        this.defaultAuth.token,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
    });
  }

  validateToken() {
    this.hasError = false;
    console.log(this.f  )
    const loginSubscr = this.authService
      .loginByToken(this.f.token.value)
      // .pipe(first())
      .subscribe((user: UserModel | undefined) => {
       
        if (user) {
          this.router.navigate(['/wizard/location'])
        } else {
          this.hasError = true;
        }
      });

    this.unsubscribe.push(loginSubscr);
  }

  loginByToken() {
    this.hasError = false;
    console.log(this.f  )
    const loginSubscr = this.authService
      .loginByToken(this.f.token.value)
      // .pipe(first())
      .subscribe((user: UserModel | undefined) => {
        console.log("u::",user)
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });

    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  async open(){
    const items = await this.presentModal(SelectComponent,{
      items:this.zones
    })
    console.log("items::",items)
    this.zoneSelectionChanged(items)
  }
}
