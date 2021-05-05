import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Maintenance from '../views/Maintenance.vue'
import Turbine from '../views/Turbine.vue'


const routes:any[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        alias: '/home'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: Maintenance
    },
    {
        path: '/turbine/:id',
        name: 'Turbine',
        component: Turbine
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router