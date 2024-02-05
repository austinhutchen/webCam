# AngularVideoInterface
# Tutorial:

<ul>
<li>
  <b>
<h1>Set up your development environment</h1> Install required libraries and frameworks for my webcam application. This includes firebase storage, as we are using the FEAN stack, node and express for server concurrency and spinup, and Angular.js for the app components. You can do this by running <code> npm install</code> in project root.
  </b>
</li>
<h2>

  Input your firebase credentials into /environments/environment.ts, and then run <code>firebase init </code>. Then, run <code>firebase deploy </code>, followed by <code>ng serve --ssl </code>. the --ssl flag is needed for webcam capture compatbility across all browsers.


</h2>
 <h3>
    Also be sure to add a user under your firebase realtime database settings, and then add your displayed user id into request object (found in app.component.ts, within the "istenForAuthStateChanges" method) upon successful video capture.
 </h3>
# WebcamApp

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
5. Testing and Documentation:
   - Conduct comprehensive testing to ensure functionality across different devices and browsers.
   - Document the feature's implementation process, including setup instructions and any dependencies.

Deliverables

- A fully functional video recording feature integrated into the existing Angular application.
- Source code for all implemented features, including frontend and backend modifications.
- A README.md file with detailed instructions on setting up the feature, including any necessary configuration steps for Firebase Storage and the Realtime Database.

Additional Notes

- Optimize the video for web playback without significantly compromising quality.
- The user interface should be intuitive, guiding the user through each step of the process.


To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
=======

