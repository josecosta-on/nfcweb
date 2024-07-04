import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './modules/auth';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { environment } from 'src/environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockApiService } from './_mock';
import { StorageService } from './services/storage.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { HeaderInterceptorService } from './interceptor/header.interceptor';

export class ServiceLocator {
	static injector: Injector;
}

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    ClipboardModule,
    environment.firebase ? AngularFireModule.initializeApp(environment.firebase): [],
	  AngularFireMessagingModule,
    environment.mock
    ? HttpClientInMemoryWebApiModule.forRoot(MockApiService, {
      passThruUnknownUrl: true,
      dataEncapsulation: false,
    })
    : [],
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(), 
    TranslateModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
		ServiceLocator.injector = this.injector;
	}
}
