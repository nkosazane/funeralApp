import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpoNr49A_3JXK5Yezi_Z4xF3Xr2yOmji0",
  authDomain: "funeralapp-3b540.firebaseapp.com",
  databaseURL: "https://funeralapp-3b540.firebaseio.com",
  projectId: "funeralapp-3b540",
  storageBucket: "funeralapp-3b540.appspot.com",
  messagingSenderId: "152238972262",
  appId: "1:152238972262:web:c792a7a6d8777a6744bca7",
  measurementId: "G-787L7H3709"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireAuthModule,
     ReactiveFormsModule,
     FormsModule,
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFireAuthModule,
     AngularFirestoreModule,
  
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
