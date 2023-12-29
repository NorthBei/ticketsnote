import VueRouter from 'vue-router';

import Edit from '@/pages/Edit.vue';
import Home from '@/pages/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/edit', component: Edit }
];

const router = new VueRouter({
  routes
});

export default router;
