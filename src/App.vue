<template>
    <div id="app" class="full-height">
        <b-overlay :show="check_loading"
                   blur="10px"
                   class="full-height"
        >
            <div class="d-flex flex-column justify-content-between full-height">
                <div>
                    <router-view>
                    </router-view>
                </div>

                <b-card-footer>
                    <div class="font-size-x-small text-gray">
                        <span>
                            仅学习目的，使用所造成的一切后果，由使用者承担相应责任。
                        </span>
                        <div class="d-flex justify-content-between align-items-end">
                            西电晨午晚检自动填报器
                            {{ init_ver_str }}
                            <br>
                            陕ICP备19018084号-1
                            <b-link href="mailto:ssuf1998@126.com"
                            >
                                联系作者
                            </b-link>
                        </div>
                    </div>
                </b-card-footer>
            </div>

            <template v-slot:overlay v-if="check_err_show">
                <div class="d-flex flex-column">
                    <span v-text="err_info['msg']">
                    </span>
                    <span v-text="`错误代码：${err_info['code']}`"
                          class="text-gray font-size-small"
                    >
                    </span>
                    <span v-text="`错误信息：${err_info['err_msg']}`"
                          class="text-gray font-size-small"
                    >
                    </span>

                    <div class="d-flex my-4 flex-wrap">
                        <b-link href="mailto:ssuf1998@126.com"
                                class="mx-1"
                        >
                            联系作者
                        </b-link>
                        <b-link class="mx-1"
                                @click="refresh"
                        >
                            刷新试试？
                        </b-link>
                        <b-link href="https://xxcapp.xidian.edu.cn/site/ncov/xidiandailyup"
                                target="_blank"
                                class="mx-1"
                        >
                            手动填报
                        </b-link>
                    </div>

                </div>
            </template>

        </b-overlay>

    </div>
</template>

<script>
export default {
    name: "App",
    data: () => ({
        "check_loading": true,
        "check_err_show": false,
        "err_info": {
            "msg": "发生了一个致命错误……暂时无法继续提供服务了。",
            "code": 0,
            "err_msg": ""
        }
    }),
    mounted() {
        this.$cookies.config('14d')
        this.$api.check().then(r => {
            if (r.data.code !== 0) {
                this.$set(this.err_info, "code", r.data.code)
                this.$set(this.err_info, "err_msg", r.data.msg)
                this.check_err_show = true
            } else {
                this.check_loading = false
            }
        }).catch(err => {
            this.$set(this.err_info, "code", 2)
            this.$set(this.err_info, "err_msg", err.message)
            this.check_err_show = true
        })
    },
    methods: {
        "refresh"() {
            location.reload()
        },
    },
    computed: {
        "init_ver_str"() {
            return `client ${process.env.VUE_APP_CLIENT_VERSION} server ${process.env.VUE_APP_SERVER_VERSION}`
        }
    }
}
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "styles/addition";

body, html {
    height: 100%;
}

.full-height {
    height: 100%;
}

.app-page {
    padding: 2rem 4rem;
}

.page-title {
    margin-bottom: 3rem;
}

.b-toast {
    .toast {
        outline: none;
    }

    button {
        outline: none;
    }

}
</style>
