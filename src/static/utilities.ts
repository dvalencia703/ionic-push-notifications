import { User } from "firebase";

import { rxResponseNotification } from './rxResponse';

export module globalData {

    export let queueNotifications: Array<rxResponseNotification> = [];

    export let isWeb: boolean = false;
    export let isAndroid: boolean = false;

    export let pushToken: any = "push_web";
    export let currentUser: User = null;
    export const environment = "sample-push-notification-703";

    /* In order to change the firebase project, only change this field */
    export let project = environment;

    export const firebaseProject = {

        "sample-push-notification-703": {
            apiKey: "AIzaSyDNTBmpcOq7MZoDryK5Hsop0CpE53lpJs8",
            authDomain: "sample-push-notification-703.firebaseapp.com",
            databaseURL: "https://sample-push-notification-703.firebaseio.com",
            projectId: "sample-push-notification-703",
            storageBucket: "sample-push-notification-703.appspot.com",
            messagingSenderId: "564722726122"
        }
    };

    export const firebaseConfig = firebaseProject[project];
}

