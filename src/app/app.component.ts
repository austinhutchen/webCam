// Import necessary modules and components
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public webcamImage: WebcamImage = null;
  public isWebcamOn: boolean = true;

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('snapshotImage') snapshotImage: ElementRef<HTMLImageElement>;

  private userId: string;
  public captures: Array<any> = [];
  public isUserAuthenticated: boolean = false;
  public snapshotDataURL: SafeResourceUrl = '';

  private mediaRecorder: MediaRecorder;
  private chunks: Blob[] = [];
  private authStateInitialized: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private database: AngularFireDatabase,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.setupMediaRecorder();
    this.listenForAuthStateChanges();
  }

  private listenForAuthStateChanges(): void {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User authenticated:', user);
        this.userId = user.uid;
        this.isUserAuthenticated = true;
      } else {
        console.log('User is signed out.');
        this.userId = null;
        this.isUserAuthenticated = false;
      }

      this.authStateInitialized = true;
    }, (error) => {
      console.error('Error during auth state change:', error);
      this.authStateInitialized = true;
    });
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

    // Upload the snapshot image to Firebase
    this.uploadToFirebase(webcamImage.imageAsDataUrl);
  }

  public triggerSnapshot(): void {
    // Triggers the snapshot capture in ngx-webcam
    this.webcamImage = null; // Clear previous image
  }

  public startRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      console.error('MediaRecorder is already recording.');
      return;
    }

    this.chunks = [];
    this.mediaRecorder.start();
  }

  public stopRecording(): void {
    if (!this.authStateInitialized) {
      console.warn('Authentication state is not yet initialized. Recording may still be in progress.');
      return;
    }

    if (!this.isUserAuthenticated) {
      console.error('User is not authenticated. Recording cannot be stopped.');
      return;
    }

    this.video.nativeElement.pause();
    this.mediaRecorder.stop();
  }

  public toggleWebcam(): void {
    this.isWebcamOn = !this.isWebcamOn;

    if (this.isWebcamOn) {
      this.setupMediaRecorder();
    } else {
      this.mediaRecorder = null;
    }
  }

  private setupMediaRecorder(): void {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const videoBlob = new Blob(this.chunks, { type: 'video/webm' });
        const videoObjectUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(videoBlob)
        );

        this.video.nativeElement.play();
        // Upload video to Firebase
        this.uploadToFirebase(videoBlob);
      };
    }).catch((error: WebcamInitError) => {
      console.error('Error initializing webcam:', error);
    });
  }

  private uploadToFirebase(dataUrlOrBlob: string | Blob): void {
    if (!this.userId) {
      console.error('User ID is null. Upload aborted.');
      return;
    }

    let filePath: string;
    if (typeof dataUrlOrBlob === 'string') {
      filePath = `webcam-snapshots/${this.userId}/${new Date().getTime()}.png`;
    } else {
      filePath = `webcam-videos/${this.userId}/${new Date().getTime()}.webm`;
    }

    const ref = this.storage.ref(filePath);

    const uploadTask = ref.put(dataUrlOrBlob);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe((downloadUrl) => {
          if (typeof dataUrlOrBlob === 'string') {
            this.database.list(`users/${this.userId}/snapshots`).push({ downloadUrl });
          } else {
            this.database.list(`users/${this.userId}/videos`).push({ downloadUrl });
          }
        });
      })
    ).subscribe();
  }
}

