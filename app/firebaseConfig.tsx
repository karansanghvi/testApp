import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAnYkCf2A1CdKNd8nFEGARN4Mt6bEMediQ",
  authDomain: "shivtester-3fb2a.firebaseapp.com",
  projectId: "shivtester-3fb2a",
  storageBucket: "shivtester-3fb2a.appspot.com",
  messagingSenderId: "320972384451",
  appId: "1:320972384451:web:0fdf7e17dcf117d5921a76"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
    // Analytics initialization is successful
  } else {
    // Analytics is not supported in this environment
    console.warn('Firebase Analytics is not supported in this environment.');
  }
}).catch((error) => {
  console.error('Error checking Firebase Analytics support:', error);
});

export { db };
