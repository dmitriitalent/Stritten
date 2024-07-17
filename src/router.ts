import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/Pages/HomePage.vue';
import CreateEventPage from '@/Pages/CreateEventPage.vue';
import LoginPage from '@/Pages/LoginPage.vue';
import ProfilePage from '@/Pages/ProfilePage.vue';
import RegistrationPage from '@/Pages/RegistrationPage.vue';
import EventsPage from '@/Pages/EventsPage.vue';
import EventPage from '@/Pages/EventPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/create', component: CreateEventPage },
  { path: '/login', component: LoginPage },
  { path: '/profile', component: ProfilePage },
  { path: '/profile/:Id', component: ProfilePage },
  { path: '/registration', component: RegistrationPage },
  { path: '/events', component: EventsPage },
  { path: '/event/:Id', component: EventPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;