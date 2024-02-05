// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { AngularFireModule } from '@angular/fire/compat';
import { CameraComponent } from './camera/camera.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseService } from './app.service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
        CameraComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    WebcamModule,
        AngularFireAuthModule,
HttpClientModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})

export class AppModule { }

