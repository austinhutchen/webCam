import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebcamInitError } from 'ngx-webcam';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  private userId: string;
  public captures: Array<any> = [];

  private mediaRecorder: MediaRecorder;
  private chunks: Blob[] = [];

  constructor(
    private storage: AngularFireStorage,
    private database: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.setupMediaRecorder();
    this.listenForAuthStateChanges();
  }

  private listenForAuthStateChanges(): void {
    const auth = getAuth();

    const authStatePromise = new Promise<User | null>((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      }, (error) => {
        reject(error);
      });
    });

    authStatePromise.then((user) => {
      if (user) {
        this.userId = user.uid;
      } else {
        // User is signed out
        this.userId = null;
      }
    }).catch((error) => {
      console.error('Error getting auth state:', error);
    });
  }

  public triggerSnapshot(): void {
    // Capture logic here if needed
  }

  public startRecording(): void {
    this.chunks = [];
    this.mediaRecorder.start();
  }

  public stopRecording(): void {
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
        const videoDataURL = URL.createObjectURL(videoBlob);
        this.captures.push(videoDataURL);
        this.uploadToFirebase(videoBlob);
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

