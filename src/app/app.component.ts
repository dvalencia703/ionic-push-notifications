import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { globalData } from '../static/utilities';

@Component({
  templateUrl: 'app.html'
})
export class NotificationsSample {
  rootPage:any = "HomePage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, notification: NotificationsProvider) {
    platform.ready().then(() => {

      globalData.isAndroid = platform.is("android");
      globalData.isWeb = !platform.is("cordova");

      if (!globalData.isWeb) {
        statusBar.styleDefault();
        if (globalData.isAndroid) {
          statusBar.overlaysWebView(false);
          statusBar.backgroundColorByHexString('#000000');
        }

        notification.initialize();

      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

