import { createRouter, createWebHistory } from 'vue-router'
import ElementTreeView from '../views/ElementTreeView.vue'

const routes = [
    {
        path: '/',
        name: 'ElementTreeView',
        component: ElementTreeView
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
