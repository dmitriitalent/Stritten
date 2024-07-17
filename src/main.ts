import { createApp } from "vue";
import { createPinia } from 'pinia'
import RootComponent from "./RootComponent.vue";
import UI from "./UI";
import router from "./router";
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const pinia = createPinia()
const APP = createApp(RootComponent);

UI.forEach(elem => {
    APP.component(elem.name, elem.comp);
});


// Use plugin with optional defaults
APP.use(VCalendar, {})

APP.use(router);
APP.use(pinia);
APP.mount("#app");






