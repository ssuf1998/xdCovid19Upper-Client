import Vue from 'vue'
import Router from "./plugins/router"
import Api from "./plugins/api"
import VueCookies from 'vue-cookies'
import BootstrapVuePlugins from "./plugins/bootstrap";

import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$api = Api

Object.keys(BootstrapVuePlugins).forEach(k => Vue.use(BootstrapVuePlugins[k]))
Vue.use(VueCookies)

new Vue({
    router: Router,
    render: h => h(App),
}).$mount('#app')
