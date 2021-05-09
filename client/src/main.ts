import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'

//process.env.PORT || 4000
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
};

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.mount('#app');