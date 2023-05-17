import {createRouter, createWebHistory} from 'vue-router'
import {getTokenFromCookies} from "@/utils/getTokenFromCookies";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/register',
            name: 'register',
            meta: {
                layout: 'auth'
            },
            component: () => import('../views/Register.vue')
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                layout: 'auth'
            },
            beforeEnter : () => {
                const token = getTokenFromCookies();
                if (token) {
                    router.push('/dashboard').then();
                }
            },
            component: () => import('../views/Login.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            meta: {
                layout: 'default'
            },
            component: () => import('../views/Dashboard.vue')
        },


    ]
})

export default router
