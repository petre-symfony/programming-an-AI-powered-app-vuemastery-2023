import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import TextView from "@/views/TextView.vue"
import AudioView from "@/views/AudioView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/text',
      name: 'text',
      component: TextView
    },
    {
      path: '/audio',
      name: 'audio',
      component: AudioView
    }
  ]
})

export default router
