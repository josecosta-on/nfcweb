import { ChangeDetectorRef, Component, Injector, Input, NgZone, Type, inject } from '@angular/core';
import { ServiceLocator } from 'src/app/app.module';
import { ActivatedRoute, ChildrenOutletContexts, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NavigationService } from '@app/services/navigation.service';
import { StorageService } from '@app/services/storage.service';
import { LoadingService } from '@app/services/loading.service';
import { ToastService } from '@app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '@app/services/events.service';
import { MessageService } from '@app/services/message.service';
import { DeviceService } from '@app/services/device.service';
import { UserService } from '@app/services/user.service';
import { BehaviorSubject, filter, interval, map, take, takeUntil } from 'rxjs';
import { ErrorService } from '@app/services/error.service';

@Component({
	selector: 'app-base',
	templateUrl: './base.page.html'
})
export class BasePage {
	slideState = 'out'

	@Input() pageMode: string = 'page';
	 options: any = {}
	protected storageService: StorageService;
	protected ngZone: NgZone;
	protected router: Router;
	protected alertController: AlertController;
	protected navigationService: NavigationService;
	protected modalController: ModalController;

	language: string = 'pt';
	loadingService: LoadingService;
	toastService: ToastService;
	translateService: TranslateService;
	eventsService: EventsService;
	messageService: MessageService;
	deviceService: DeviceService;
	userService: UserService;
	errorService: ErrorService;
	navService: NavigationService;


	private contexts: ChildrenOutletContexts
	activatedRoute: ActivatedRoute;
	$closeState = new BehaviorSubject(false);
	$close = this.$closeState.pipe(
		filter(value => !!value) 
	);
	// redirect: string = null;

	constructor() {
		const injector: Injector = ServiceLocator.injector;
		this.activatedRoute = inject(ActivatedRoute)
		this.contexts = injector.get<ChildrenOutletContexts>(ChildrenOutletContexts as Type<ChildrenOutletContexts>);
		// this.activatedRoute = injector.get<ActivatedRoute>(ActivatedRoute as Type<ActivatedRoute>);
		this.errorService = injector.get<ErrorService>(ErrorService as Type<ErrorService>);
		this.userService = injector.get<UserService>(UserService as Type<UserService>);
		this.messageService = injector.get<MessageService>(MessageService as Type<MessageService>);
		this.deviceService = injector.get<DeviceService>(DeviceService as Type<DeviceService>);
		this.loadingService = injector.get<LoadingService>(LoadingService as Type<LoadingService>);
		this.toastService = injector.get<ToastService>(ToastService as Type<ToastService>);
		this.storageService = injector.get<StorageService>(StorageService as Type<StorageService>);
		this.translateService = injector.get<TranslateService>(TranslateService as Type<TranslateService>);
		this.eventsService = injector.get<EventsService>(EventsService as Type<EventsService>);
		this.router = injector.get<Router>(Router as Type<Router>);
		this.alertController = injector.get<AlertController>(AlertController as Type<AlertController>);
		this.navigationService = injector.get<NavigationService>(NavigationService as Type<NavigationService>);
		this.modalController = injector.get<ModalController>(ModalController as Type<ModalController>);
		this.navService = injector.get<NavigationService>(NavigationService as Type<NavigationService>);
		this.ngZone = injector.get<NgZone>(NgZone as Type<NgZone>);

		// this.$close.subscribe(()=>{
		// 	alert("closing page")
		// })
	

	}

	initBase(){
		const animation =  this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']
		console.log("animation:",	)
		if(animation == "slideInAnimation"){
			this.slideIn()
		}
	}

	slideIn() {
		setTimeout(()=>{
		  this.slideState = 'in'
		  window['app'].cd.markForCheck()
		  window['app'].cd.detectChanges()
		},100)
	  }

	interval(ms:number){
		return interval(ms).pipe(
			takeUntil(this.$close)
		  ); // Emits after 5 second
	}

	completeAfter(ms:number,callback = ()=>{}){
		return interval(ms).pipe(take(1),map((x)=>{
			callback()
			return x
		})); // Emits after 1 second

	}

	translate(word: string) {
		return this.translateService.instant(word);
	}

	getLanguage() {
		this.language = this.translateService.defaultLang;
	}

	changeLanguage(lang: string) {
		this.language = lang;
		this.translateService.setDefaultLang(lang);
	}

	goTo(path: string, data?: any) {
		let navigationExtras: NavigationExtras|undefined;

		if (data) {
			navigationExtras = {
				queryParams: data
			};
		}
		this.router.navigate([path],navigationExtras);
	}

	openLink(link: string) {
		window.open(link, '_blank');
	}

	openMaps(lat: string, lng: string) {
		const link = 'https://maps.google.com/?q=' + lat + ',' + lng;
		window.open(link, '_blank');
	}

  checkDate(start, end) {
    const s = new Date(start);
    const e = new Date(end);

    if (s.getDate() === e.getDate()) {
      return true;
    }

    return s.getTime() === e.getTime();
  }

  async pop(){
	if(this.pageMode=='modal'){

		return this.dismiss();
	}
	this.$closeState.next(true)
	
	const pop = await this.navService.goBack();
	if(!pop){
		this.navService.navigateRoot()
	}
  }

  dismiss(data:any = null){
	this.$closeState.next(true)
	this.modalController.dismiss(data)
	
  }

  timeout(ms:number) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

  async presentModal(component,options:any={}) {
    const modal = await this.modalController.create({
        component,
        componentProps:{pageMode:'modal',options}
    });
    await modal.present();
	await this.timeout(200)
    const { data } = await modal.onDidDismiss();
    //todo something with your data 
    // console.log("val::",data)
    return data;
}
}
