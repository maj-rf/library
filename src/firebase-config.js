const config = {
  apiKey: 'AIzaSyC77O7SINn_FxVPrP-4JU1nbmaDDzhPx6M',
  authDomain: 'library-app-d9728.firebaseapp.com',
  projectId: 'library-app-d9728',
  storageBucket: 'library-app-d9728.appspot.com',
  messagingSenderId: '218281287270',
  appId: '1:218281287270:web:d4e7e3fde55028e53f17a7',
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
