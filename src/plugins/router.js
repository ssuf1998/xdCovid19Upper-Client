import Vue from "vue"
import VueRouter from "vue-router"

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const router_ = new VueRouter({
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../components/Login"),
            meta: {
                title: "西电晨午晚检自动填报器"
            },
        },
        {
            path: "/user",
            name: "user",
            component: () => import("../components/User"),
            meta: {
                title: "西电晨午晚检自动填报器"
            },
        },
    ]
})

router_.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router_
