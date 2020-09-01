import Vue from "vue";
import Router from "./plugins/router";
import Api from "./plugins/api";
import VueCookies from "vue-cookies";
import BootstrapVuePlugins from "./plugins/bootstrap";
import Emoji from "node-emoji";

import App from "./App.vue";

Vue.config.productionTip = false;
Vue.prototype.$api = Api;
Vue.prototype.$emoji = Emoji;

Object.keys(BootstrapVuePlugins).forEach(k => Vue.use(BootstrapVuePlugins[k]));
Vue.use(VueCookies);

new Vue({
    router: Router,
    render: h => h(App),
}).$mount("#app");
