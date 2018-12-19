import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { notification } from '../../providers/notifications/notifications';
import { cmd } from '../../static/cmd';
import { globalData } from '../../static/utilities';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  MODULE = "HomePage";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    notification.observerNotificationsAvailable.subscribe(
      response => {
        cmd.log(this.MODULE, "ionViewDidLoad - notification data", `${JSON.stringify(response)}`);
        globalData.queueNotifications.push(response);
      }
    );
  }

}
