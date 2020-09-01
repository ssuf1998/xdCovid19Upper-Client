<template>
    <div id="app" class="full-height">
        <b-overlay :show="check_loading"
                   blur="10px"
                   class="full-height"
        >
            <div class="d-flex flex-column justify-content-between full-height">
                <div v-if="!check_err_show">
                    <router-view>
                    </router-view>
                </div>

                <b-card-footer>
                    <div class="font-size-small text-gray">
                        <span>
                            仅学习目的，使用所造成的一切后果，由使用者承担。
                            <br>
                            陕ICP备19018084号-1
                        </span>

                        <b-icon icon="info-square-fill"
                                variant="secondary"
                                class="icon-btn float-right font-size-normal"
                                v-b-modal:about_me_dialog
                        >
                            关于
                        </b-icon>
                    </div>

                    <b-modal id="about_me_dialog"
                             centered
                             ok-title="好的"
                             ok-only
                             title="关于"
                             scrollable
                    >
                        <div class="my-2">
                            <p class="font-weight-bold font-size-large">
                                “在我厌烦了填晨午晚检后……”
                            </p>

                            <div class="d-flex my-3 flex-column">
                                <div class="d-flex">
                                    <span class="mr-2">
                                        GitHub仓库
                                    </span>
                                    <b-link class="mx-2"
                                            target="_blank"
                                            href="https://github.com/ssuf1998/xdCovid19Upper-Client"
                                    >
                                        前端
                                    </b-link>
                                    <b-link class="ml-2"
                                            target="_blank"
                                            href="https://github.com/ssuf1998/xdCovid19Upper-Server"
                                    >
                                        后端
                                    </b-link>
                                </div>
                                <span class="text-gray font-size-small">
                                    点个星，即是对我最大的鼓励！
                                    <br>
                                    {{ ver_str }}
                                </span>
                            </div>

                            <b-link href="mailto:ssuf1998@126.com">
                                联系作者
                            </b-link>
                        </div>

                    </b-modal>
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
                    <span v-text="`错误信息：${err_info['raw_err']}`"
                          v-if="err_info['raw_err']!==''"
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
            "msg": "发生了一个致命错误……暂时无法继续提供服务了。（可能在维护迭代中……）",
            "code": 0,
            "raw_err": ""
        }
    }),
    mounted() {
        this.$cookies.config("14d");
        this.$api.check().then(() => {
            this.check_loading = false;
        }).catch(err => {
            if (err.response) {
                this.$set(this.err_info, "msg", err.response.data.msg || "");
                this.$set(this.err_info, "code", err.response.data.code);
                this.$set(this.err_info, "raw_err", err.response.data.raw);
            } else {
                this.$set(this.err_info, "code", 999);
                this.$set(this.err_info, "raw_err", err.message);
            }
            this.check_err_show = true;
        });
    },
    methods: {
        "refresh"() {
            location.reload();
        },
    },
    computed: {
        "ver_str"() {
            return `client ${process.env.VUE_APP_CLIENT_VERSION} server ${process.env.VUE_APP_SERVER_VERSION}`;
        }
    }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "styles/addition";

@media screen and (min-width: 600px) {
    #app {
        width: 400px;
        background-color: white;
        box-shadow: 0 0 4rem rgba(0, 0, 0, 0.25);
    }
    body {
        display: flex;
        justify-content: center;
        background-color: #eee;
    }
}

body, html {
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

.icon-btn {
    pointer-events: auto;
    opacity: 0.6;
    cursor: pointer;
    outline: none;

    &:hover {
        opacity: 1;
    }
}

</style>
