# AngularVideoInterface

# LIVE DEMO : https://firecam.vercel.app/


![AngularWebcamVideoCapture · 12 52am · 02-05](https://github.com/austinhutchen/angularCamFirebase/assets/93489691/179a7516-99f2-4c81-8223-cf43d6e1d949)

# USAGE:
Press the camera icon for a displayed snapshot of the cam, when video is paused. Press the arrow icon underneath to switch through available webcam media devices. Use "start recording" to begin live webcam recording.  Press "stop" to save the blob, and "review" to review the playback before it is sent off to firebase servers, with "confirm" -> "upload recorded video". You can also press "redo" to reset the video blob pointer to null and start another stream.
# Tutorial:

<ul>
<li>
  <b>
<h1>Set up your development environment</h1> Install required libraries and frameworks for my webcam application. This includes firebase storage, as we are using the FEAN stack, node and express for server concurrency and spinup, and Angular.js for the app components. You can do this by running <code> npm install</code> in project root.
  </b>
</li>
  <li>
<h2>

 Search for the "usage" tab of your project's location found using firebase console, and then input the credentials there using text editor of choice into a NEW FILE in /environments using <code> touch /environments/environment.ts </code>, and then run <code>firebase init </code>. Choose realtime database and storage options, and ensure you have a google storage bucket set on your project through your cloud console.Then, run <code>firebase deploy </code>, followed by <code>ng serve --ssl </code>. the --ssl flag is needed for webcam capture compatbility across all browsers.


</h2>
 <h3>
 Also be sure to add a user under your firebase realtime database settings, and then add your displayed string user id into your request object (found in app.component.ts, within the "listenForAuthStateChanges" method, under this.userId) upon successful video capture. (THE REQUEST TO UPLOAD WILL OTHERWISE NOT WORK)
 </h3>
 <img width="590" alt="Screenshot 2024-02-05 at 12 07 51 AM" src="https://github.com/austinhutchen/angularCamFirebase/assets/93489691/157cf9b8-e0e4-43c7-a955-fe86652642e6">

 </li>
 <li>
<h3>
   FIREBASE STORED BLOB RESULTS:
</h3>
 <img width="1169" alt="Screenshot 2024-02-05 at 1 01 49 AM" src="https://github.com/austinhutchen/angularCamFirebase/assets/93489691/e2801b32-2a79-49bb-9ae1-faf64290b7ec">
  <img width="575" alt="Screenshot 2024-02-05 at 1 02 54 AM" src="https://github.com/austinhutchen/angularCamFirebase/assets/93489691/4f287a95-50ef-42db-b908-0f2d3797f527">


<img width="1441" alt="Screenshot 2024-02-04 at 12 51 13 PM" src="https://github.com/austinhutchen/angularCamFirebase/assets/93489691/8e697de3-f632-4ed4-ba46-96d632bf50ea">


</li>
# ADDITIONAL ANGULAR INFO:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
=======

