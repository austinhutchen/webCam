import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebcamInitError } from 'ngx-webcam';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('snapshotImage') snapshotImage: ElementRef<HTMLImageElement>; // Add this line

  private userId: string;
  public captures: Array<any> = [];
  public isUserAuthenticated: boolean = false;
  public snapshotDataURL: string = ''; // Add this line

  private mediaRecorder: MediaRecorder;
  private chunks: Blob[] = [];

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
    }, (error) => {
      console.error('Error during auth state change:', error);
    });
  }

  public triggerSnapshot(): void {
    if (!this.mediaRecorder) {
      console.error('MediaRecorder is not initialized.');
      return;
    }

    this.video.nativeElement.pause();

    const context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Set the snapshotDataURL property
    this.snapshotDataURL = this.canvas.nativeElement.toDataURL('image/png');

    // Clear the canvas
    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.video.nativeElement.play();
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
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('User is not authenticated. Recording cannot be stopped.');
      return;
    }
  this.video.nativeElement.pause();

    this.mediaRecorder.stop();
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
      };
    }).catch((error: WebcamInitError) => {
      console.error('Error initializing webcam:', error);
    });
  }

  private uploadToFirebase(videoBlob: Blob): void {
    if (!this.userId) {
      console.error('User ID is null. Upload aborted.');
      return;
    }

    const filePath = `webcam-videos/${this.userId}/${new Date().getTime()}.webm`;
    const ref = this.storage.ref(filePath);

    this.storage.upload(filePath, videoBlob).then(() => {
      ref.getDownloadURL().subscribe((downloadUrl) => {
        this.database.list(`users/${this.userId}/videos`).push({ downloadUrl });
      });
    }).catch((error) => {
      console.error('Error uploading to Firebase:', error);
    });
  }
}

