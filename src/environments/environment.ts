// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//local hardcoded
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAA1Wrnku_HeBa1cXhkmjjQ_EGpVtf0T_w",
    authDomain: "findlyapp.vercel.app",
    projectId: "findly-v1app",
    storageBucket: "findly-v1app.firebasestorage.app",
    messagingSenderId: "857355157435",
    appId: "1:857355157435:web:d889ed63dc86d6719ace9e",
    measurementId: "G-HL9375XYZG"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
