import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {initializeApp} from "firebase/app";
import {getMessaging} from "firebase/messaging";
import {environment} from "./app/configuration/environment";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

const app = initializeApp(environment.firebaseConfig);
const messaging = getMessaging(app);
