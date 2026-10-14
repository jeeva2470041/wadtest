
import { createRouter, createWebHistory } from 'vue-router'

import home from '../components/home.vue'
import aboutview from '../components/aboutview.vue'
import contactview from '../components/contactview.vue'

const routes = [
  { path: '/', component: home },
  { path: '/about', component: aboutview },
  { path: '/contact', component: contactview }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
