// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 1024},
    height: {ideal: 576}
  };
  public captures: Array<any> = [];
  private userId: string = 'user-uid'; // Replace with actual UID after authentication

  constructor(
    private storage: AngularFireStorage,
    private database: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    // Additional setup if needed
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImageCapture(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    // Handle camera switch if needed
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public uploadToFirebase(videoDataURL: string): void {
    const videoBlob = this.dataURItoBlob(videoDataURL);
    const filePath = `webcam-videos/${this.userId}/${new Date().getTime()}.webm`;
    const ref = this.storage.ref(filePath);

    this.storage.upload(filePath, videoBlob).then(() => {
      ref.getDownloadURL().subscribe((downloadUrl) => {
        this.database.list(`users/${this.userId}/videos`).push({ downloadUrl });
      });
    });
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }
}

