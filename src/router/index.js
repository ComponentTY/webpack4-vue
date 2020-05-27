import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: () => import(/* webpackChunkName: "Index" */ '@/Index'),
        children: [
            {
                path: '/',
                component: () => import(/* webpackChunkName: "Home" */ '@/Home')
            },
            {
                path: '/about',
                component: () => import(/* webpackChunkName: "About" */ '@/About')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: [...routes]
})

export default router