import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import TreeElement from '@/components/TreeElement';
import './assets/scss/main.scss';

const app = createApp(App);
app.component('TreeElement', TreeElement)

app.use(router).mount('#app');
