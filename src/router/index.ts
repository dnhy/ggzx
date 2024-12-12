import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoute } from '@/router/routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
});

export default router;
