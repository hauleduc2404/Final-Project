import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/app.css"
// import 'element-plus/dist/index.js.css';
import { FontAwesomeIcon } from './plugins/font-awesome'


createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: 'small', zIndex: 9000 })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app');

const check = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
        throw new Error('No Push API Support!')
    }
}
const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission()
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification')
    }
}
const main = async () => {
    check()
    await requestNotificationPermission()
}
main();
