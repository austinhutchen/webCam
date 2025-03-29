import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
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
  public isUserAuthenticated: boolean = false;
  public snapshotDataURL: SafeResourceUrl = '';
  public recordedVideoURL: SafeResourceUrl = '';
  public recordedVideoBlob: Blob;

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('snapshotImage') snapshotImage: ElementRef<HTMLImageElement>;

  private userId: string = '';
  private mediaRecorder: MediaRecorder;
  private chunks: Blob[] = [];
  private authStateInitialized: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private database: AngularFireDatabase,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.listenForAuthStateChanges();
    this.setupMediaRecorder();
  }

  private listenForAuthStateChanges(): void {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        this.userId = "default";
        this.isUserAuthenticated = true;
      this.authStateInitialized = true;
    }, (error) => {
      console.error('Error during auth state change:', error);
      this.authStateInitialized = false;
    });
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.uploadToFirebase(webcamImage.imageAsDataUrl);
  }

  public triggerSnapshot(): void {
    this.webcamImage = null;
  }

  public startRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      console.error('MediaRecorder is already recording.');
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.chunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
    }).catch((error) => {
      console.error('Error starting recording:', error);
    });
  }

  public stopRecording(): void {
    if (!this.mediaRecorder || this.mediaRecorder.state !== 'recording') {
      console.error('MediaRecorder is not currently recording.');
      return;
    }

    this.mediaRecorder.stop();

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, { type: 'video/webm' });
      this.recordedVideoBlob = blob;
      this.recordedVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    };
  }

  public toggleWebcam(): void {
    this.isWebcamOn = !this.isWebcamOn;
    if (this.isWebcamOn) {
      this.setupMediaRecorder();
    } else {
      this.mediaRecorder = null;
    }
  }

 

  public confirmRecording(): void {
    if (!this.recordedVideoBlob) {
      console.error('No recorded video available to confirm.');
      return;
    }
    console.log('Recording confirmed');
    this.uploadToFirebase(this.recordedVideoBlob);
    this.recordedVideoBlob = null;
    this.recordedVideoURL = null;

  }

  public redoRecording(): void {
    if (!this.recordedVideoBlob) {
      console.error('No recorded video available to redo.');
      return;
    }

    console.log('Recording redoed');
    this.recordedVideoBlob = null;
    this.recordedVideoURL = null;
    this.startRecording();
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
        this.recordedVideoBlob = videoBlob;
        this.recordedVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(videoBlob));
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
