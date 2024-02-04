// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseService } from './app.service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    WebcamModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})

export class AppModule { }

