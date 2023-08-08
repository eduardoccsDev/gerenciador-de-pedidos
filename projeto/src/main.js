import { createApp } from 'vue';
import './style.css'
import App from './App.vue';
import router from './routes';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKIMPmlo8yysSPMUav_-tS91A2E_iHG90",
  authDomain: "gerenciador-de-pedidos-2059c.firebaseapp.com",
  databaseURL: "https://gerenciador-de-pedidos-2059c-default-rtdb.firebaseio.com",
  projectId: "gerenciador-de-pedidos-2059c",
  storageBucket: "gerenciador-de-pedidos-2059c.appspot.com",
  messagingSenderId: "1011833973524",
  appId: "1:1011833973524:web:6c1e279f94f138e50cf001",
  measurementId: "G-8134RGYX9H"
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router).mount('#app');
