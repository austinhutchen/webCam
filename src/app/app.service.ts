import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {
    initializeApp(firebaseConfig);
  }
}

