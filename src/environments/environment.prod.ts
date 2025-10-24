//vercel
declare const process: any;
export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: process.env['FIREBASE_API_KEY'] || 'AIzaSyAA1Wrnku_HeBa1cXhkmjjQ_EGpVtf0T_w',
    authDomain: process.env['FIREBASE_AUTH_DOMAIN'] || 'findly-v1app.firebaseapp.com',
    projectId: process.env['FIREBASE_PROJECT_ID'] || 'findly-v1app',
    storageBucket: process.env['FIREBASE_STORAGE_BUCKET'] || 'findly-v1app.firebasestorage.app',
    messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'] || '857355157435',
    appId: process.env['FIREBASE_APP_ID'] || '1:857355157435:web:d889ed63dc86d6719ace9e',
    measurementId: 'G-HL9375XYZG'
  }
};

