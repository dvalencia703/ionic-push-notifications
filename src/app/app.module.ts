import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Firebase } from '@ionic-native/firebase';

import { NotificationsSample } from './app.component';
import { globalData } from '../static/utilities';

const firebaseConfig = globalData.firebaseConfig;
import { ProvidersModule } from './../providers/providers.modules';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    NotificationsSample
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(NotificationsSample),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    ProvidersModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    NotificationsSample
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    Firebase
  ]
})
export class AppModule {}
