# AngularVideoInterface
# Tutorial:

<ul>
<li>
  <b>
<h1>Set up your development environment</h1> by installing required libraries and frameworks for my webcam application. This includes firebase storage, as we are using the FEAN stack, node and express for server concurrency and spinup, and Angular.js for the app components. 
  </b>
</li>
<li>
 <h2>After installing all necessary files, we begin on our app's internal structure</h2> . First, <code>cd src</code>  and run <code> vim app.module.ts</code> to modify our default-named app.module.ts, a file to contain the metadata for our root module, configs for module components & pipes, and which serves dependency injection. For example, the bootstrap property is used in the @NgModule decorator within the file to specify the root component that Angular should bootstrap when the application starts. "Bootstrapping" refers to the process of launching and initializing the main component of the application. As such, we will also connect our firebase configuration here using <code> AngularFireModule.initializeApp(config) </code>
<img width="872" alt="Screenshot 2024-02-04 at 2 32 05 PM" src="https://github.com/austinhutchen/AngularVideoInterface/assets/93489691/091939de-4706-4aa3-a904-0ea90dbbf3c1">


</li>


<li>
  <h2> Building app.component.ts, our app's Webcam Handler </h2>

<p>Next we consider our local app.component.ts, where we will build a 'URItoBlob' component that will take in a webcam "frame" (instance of a video data stream URI), break it down to raw binary, and pass it off properly formatted with MIME type to firebase.  </code> On completion, this component will allow us to send the necessary data directly to our server.
</p>
</li>

<img width="728" alt="Screenshot 2024-02-03 at 9 52 37 AM" src="https://github.com/austinhutchen/AngularVideoInterface/assets/93489691/e28fb76e-18c4-4a32-b113-2ded06b5adfd">

   

</p>
<li>
  <h2> OVERVIEW 1 / MIME and BLOB type extraction for efficient database storage explained </h2>
    Our goal in this component was to handle the webcam, by storing instances of our video stream ("frames/images") in a class and deconstructing it into its bitwise representation with proper type (MIME) information to store in our firebase.
<code>
const mimeType = dataURI.split(',')[0].split(':')[1].split(';')[0];
dataURI.split(',')[0] </code> <br/>
This splits the Data URI at the comma (,), and split(',')[0] takes the first part before the comma.
For example, for the Data URI data:image/png;base64,..., this would result in "data:image/png".
<br/> <code> .split(':')[1]  </code> <br/>
This further splits the result at the colon (:) and takes the second part after the colon.
For the example above, this would result in "image/png".
<br/> <code> .split(';')[0]: </code> <br/>
This final split is performed at the semicolon (;) and takes the first part before the semicolon.
In the example, the result is the final MIME type "image/png", and we return it in a closure with the array bit buffer with our stored data. <br/>
</li>
<li>
<h2> Integrating Angular changes into html via app.component.html </h2>
  <p> Here, we edit our html with a webcam capture button, and form our first usable interface. </p>
  <img width="670" alt="Screenshot 2024-02-02 at 3 29 02 PM" src="https://github.com/austinhutchen/AngularVideoInterface/assets/93489691/930a1f50-3671-45b0-a7de-0c297fc3d564">

  </li>


  











<footer>
<h2>RETURN & Overview FULL </h2>
<i>So we return an array of data from uriToBlob.ts (Uint8Array in this case), and the second parameter { type: MIME } specifies the MIME type of the Blob being stored.</i>
Now we can work with the exported component. 


   </footer>  
</ul>


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

