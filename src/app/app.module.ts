import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { UserProfileModule } from './user-profile/user-profile.module';
import { GeolocationModule } from './geolocation/geolocation.module';
import { CommonsModule } from './commons/commons.module';
import { IonicModule } from '@ionic/angular';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpResponseBuilder } from './shared/response/httpResponse.model';
import { AuthResponseModel } from './shared/response/authResponse.model';
import { FormNormalizePipe } from './shared/pipes/form-normalize.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CommonsModule,
    UserProfileModule,
    GeolocationModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    IonicModule.forRoot(),
    LayoutModule
  ],
  providers: [
    HttpResponseBuilder,
    AuthResponseModel
  ],
  bootstrap: [AppComponent],
  exports: [
    AppComponent
  ]
})
export class AppModule { }
