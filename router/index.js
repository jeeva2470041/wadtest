import { createRouter, createWebHistory } from 'vue-router'
import App from './app.vue'
import VueBasics from './VueBasics.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  {
    path: '/students',
    name: 'Students',
    component: App
  },
  {
    path: '/basics',
    name: 'VueBasics',
    component: VueBasics
  },
  {
    path: '/about',
    name: 'About',
    component: {
      template: `
        <div style="max-width: 600px; margin: 40px auto; padding: 20px; background: white; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px #00000010;">
          <h2>About Student App</h2>
          <p>This is a Vue 3 application integrated with Vue Router, Pinia, and Spring Boot REST API.</p>
          <div style="margin-top: 15px; display: flex; justify-content: center; gap: 15px;">
            <router-link to="/" style="color: #2563eb; text-decoration: none; font-weight: bold;">← Back to Home</router-link>
            <router-link to="/basics" style="color: #10b981; text-decoration: none; font-weight: bold;">Explore Vue Basics →</router-link>
          </div>
        </div>
      `
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { routes }
export default router
