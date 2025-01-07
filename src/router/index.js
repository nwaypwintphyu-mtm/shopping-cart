import { createRouter, createWebHistory } from 'vue-router';
import Home from '../layouts/Home.vue'; 
import About from '../layouts/About.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;