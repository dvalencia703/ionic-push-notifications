import { LocalNotifications } from '@ionic-native/local-notifications';
import { Injectable } from '@angular/core';
import { globalData } from '../../static/utilities';
import { Firebase } from '@ionic-native/firebase';
import { cmd } from '../../static/cmd';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Rx';
import { rxResponseNotification } from '../../static/rxResponse';

export module notification {
  export let observer: Observer<rxResponseNotification>;

  export let observerNotificationsAvailable: Observable<rxResponseNotification> = new Observable(observer => {
    notification.observer = observer;
  });
}

@Injectable()
export class NotificationsProvider {

  private MODULE = "NotificationsProvider";

  constructor(private firebase: Firebase,
    private localNotifications: LocalNotifications) {

  }

  public initialize() {

    if (!globalData.isWeb) {

      this.localNotifications.hasPermission()
        .catch(error => cmd.logError(this.MODULE, "initialize requestPermission", error))
        .then(hasPermission => {
          if (!hasPermission) {
            this.localNotifications.requestPermission()
              .catch(error => cmd.logError(this.MODULE, "initialize requestPermission", error))
              .then(data => {
                cmd.log(this.MODULE, "initialize requestPermission", `${JSON.stringify(data)}`);
              });
          }
        });

      globalData.isAndroid ? this.initializeFireBaseAndroid() : this.initializeFireBaseIos();
    } else {
      cmd.log(this.MODULE, "initialize", "Push notifications are not enabled since this is not a real device")
    }
  }

  private initializeFireBaseAndroid(): Promise<any> {
    return this.firebase.getToken()
      .catch(error => cmd.logError(this.MODULE, "initializeFireBaseAndroid", error))
      .then(token => {
        cmd.log(this.MODULE, "initializeFireBaseAndroid", `Android The push token is ${token}`)
        globalData.pushToken = token;
        this.manageDataNotification();
      });
  }

  private initializeFireBaseIos(): Promise<any> {
    return this.firebase.grantPermission()
      .catch(error => cmd.logError(this.MODULE, "initializeFireBaseIos - grantPermission", error))
      .then(() => {
        this.firebase.getToken()
          .catch(error => cmd.logError(this.MODULE, "initializeFireBaseIos - getToken", error))
          .then(token => {
            if (token) {
              cmd.log(this.MODULE, "initializeFireBaseIos - getToken", `iOS The push token is ${token}`)
              globalData.pushToken = token;
              this.manageDataNotification();
            } else {
              let subscription = this.firebase.onTokenRefresh().subscribe(token => {
                cmd.log(this.MODULE, "initializeFireBaseIos - onTokenRefresh", `iOS The push token is ${token}`)
                globalData.pushToken = token;
                this.manageDataNotification();
                subscription.unsubscribe();
              }, error => {
                cmd.logError(this.MODULE, "initializeFireBaseIos - getToken", error);
                this.initializeFireBaseIos();
              });
            }
          });
      })
  }

  idSecuencial: number = 0;

  manageDataNotification() {

    this.localNotifications.on("click").subscribe(dataLocal => {
      cmd.log(this.MODULE, "manageDataNotification - localNotifications.on(\"click\")", `data notification LOCAL HOME: ${JSON.stringify(dataLocal)}`)
      this.performAction(dataLocal.data);
    });

    this.firebase.onNotificationOpen().subscribe(
      data => {

        cmd.log(this.MODULE, "manageDataNotification - onNotificationOpen()", `data notification LOCAL HOME: ${JSON.stringify(data)}`);

        if (data.tap) {
          this.performAction(data);
        } else {
          this.localNotifications.schedule({
            id: this.idSecuencial,
            title: data.title,
            text: data.body,
            sound: globalData.isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
            data: data,
            foreground: true
          });

          this.idSecuencial++;
        }
      },
      error => {
        cmd.logError(this.MODULE, "manageDataNotification - onNotificationOpen()", error)
      }
    );
  }

  performAction(data: any) {
    let response: rxResponseNotification = new rxResponseNotification();
    response.error = null;
    response.message = null;
    response.data = data;
    notification.observer.next(response);
  }

}
