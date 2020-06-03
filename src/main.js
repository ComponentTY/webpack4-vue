import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import svgIcon from './icons'
import commons from './Common'
Vue.use(commons)
Vue.use(svgIcon)
new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app')
