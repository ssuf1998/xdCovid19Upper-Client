<template>
    <div class="app-page d-flex flex-column align-items-center"
         id="user_page"
         v-if="!user_info_loading"
    >

        <p class="text-center font-size-large font-weight-bold text-gray page-title">
            欢迎，用户 {{ logged["sid"] }} ！
        </p>

        <div class="d-flex justify-content-around align-items-center mb-2 up-status"
             v-for="(v, k) in up_status_data"
             :key="`up-status-${k}`"
        >
            <span>{{ v['icon'] }}</span>
            <span>{{ v['text'] }}</span>

            <b-badge :variant="up_badge_data[user_info['is_up'][k]][0]"
                     v-if="user_info['is_up'][k]!==2
                     || (!user_info['is_pw_wrong']
                     && !user_info['is_pause'])"
            >
                {{ up_badge_data[user_info['is_up'][k]][1] }}
            </b-badge>

            <b-badge variant="info"
                     v-if="user_info['is_pause'] && user_info['is_up'][k]===2 && !user_info['is_pw_wrong']"
            >
                暂停填报
            </b-badge>

            <b-badge variant="danger"
                     v-if="user_info['is_pw_wrong'] && user_info['is_up'][k]===2"
            >
                账户异常
            </b-badge>
        </div>

        <br>

        <p class="text-center font-size-small text-gray">
            后端最近成功运行时间：{{ new Date(last_timestamp).toLocaleString("chinese", {hour12: false}) }}。
            <br>
            客户端信息更新于：{{ new Date().toLocaleString("chinese", {hour12: false}) }}，
            <b-link @click="refresh">刷新页面</b-link>
            可更新。
        </p>

        <b-btn class="btn-block"
               id="reset_pos_btn"
               variant="primary"
               @click="do_reset_pos"
               :disabled="get_pos_loading"
               v-text="get_pos_loading ? '请稍等……' : '重设定位'"
        >
        </b-btn>

        <b-btn class="btn-block"
               id="exit_btn"
               variant="outline-secondary"
               @click="do_exit"
        >
            退出
        </b-btn>

        <div id="extra_func_box" class="d-flex align-items-center">
            <b-link v-b-modal:del_user_dialog
                    href="#">
                注销账号
            </b-link>

            <b-link v-b-modal:pause_dialog
                    v-if="!user_info['is_pause']"
                    href="#"
            >
                暂停填报
            </b-link>

            <b-link v-if="user_info['is_pause']"
                    @click="do_change_pause(false)"
                    href="#"
                    :disabled="change_pause_loading"
            >
                恢复填报
            </b-link>

            <b-link v-b-modal:change_pw_dialog
                    href="#">
                修改密码
            </b-link>

            <b-icon icon="question-circle-fill"
                    variant="secondary"
                    class="icon-btn"
                    v-b-modal:question_dialog
            >
                ?
            </b-icon>

        </div>

        <b-modal id="del_user_dialog"
                 centered
                 :ok-title="del_user_loading? '……' : '确定'"
                 cancel-title="取消"
                 title="确定注销账号？"
                 @ok="do_del_user"
                 :ok-disabled="del_user_loading"
                 :no-close-on-backdrop="del_user_loading"
                 :no-close-on-esc="del_user_loading"
                 scrollable
        >
            <p class="my-2">
                注销账户后，服务器上将不再保存您的学号及密码，且将停止该账户的自动填报，是否确定？
            </p>
        </b-modal>

        <b-modal id="pause_dialog"
                 centered
                 :ok-title="change_pause_loading? '……' : '确定'"
                 cancel-title="取消"
                 title="确定暂停填报？"
                 @ok="do_change_pause(true)"
                 :ok-disabled="change_pause_loading"
                 :no-close-on-backdrop="change_pause_loading"
                 :no-close-on-esc="change_pause_loading"
                 scrollable
        >
            <p class="my-2">
                暂停后，仍可恢复，您的学号及密码仍会保存在服务器上，是否确定？
            </p>
        </b-modal>

        <b-modal id="change_pw_dialog"
                 centered
                 :ok-title="change_pw_loading? '……' : '确定'"
                 cancel-title="取消"
                 title="修改密码"
                 @ok="do_change_pw"
                 :ok-disabled="!change_pw_all_valid || change_pw_loading"
                 :no-close-on-backdrop="change_pw_loading"
                 :no-close-on-esc="change_pw_loading"
                 @hidden="change_pw_data=['', ''];
                 old_pw_not_same_show=false;"
                 scrollable
        >
            <div class="my-2">
                <b-form-input v-model="change_pw_data[0]"
                              type="password"
                              placeholder="原密码"
                              id="old_pw_input"
                              @click="old_pw_not_same_show=false"
                              autocomplete="off"
                >
                </b-form-input>
                <br>
                <b-form-input v-model="change_pw_data[1]"
                              type="password"
                              placeholder="新密码"
                              id="new_pw_input"
                >
                </b-form-input>

                <b-tooltip :show="old_pw_not_same_show"
                           target="old_pw_input"
                           triggers=""
                           placement="top"
                >
                    与当前密码不一致，请核对。
                </b-tooltip>
            </div>
        </b-modal>


        <b-modal id="question_dialog"
                 centered
                 ok-title="好的"
                 ok-only
                 title="有疑问？"
                 scrollable
        >
            <Question></Question>
        </b-modal>

    </div>
</template>

<script>
import Question from "@/components/Question";

export default {
    name: "User",
    components: {
        Question
    },
    data: function () {
        return {
            "user_info": {},
            "last_timestamp": 0,
            "user_info_loading": true,
            "up_status_data": {
                "morning": {
                    "icon": "☀️",
                    "text": "晨检",
                },
                "afternoon": {
                    "icon": "☕",
                    "text": "午检",
                },
                "evening": {
                    "icon": "🌙",
                    "text": "晚检",
                },
            },
            "up_badge_data": [
                ["secondary", "状态未知"],
                ["success", "填报成功"],
                ["warning", "暂未填报"],
                ["info", "正在填报"],
            ],
            "get_pos_loading": false,
            "change_pw_data": ["", ""],
            "old_pw_not_same_show": false,

            "change_pw_loading": false,
            "change_pause_loading": false,
            "del_user_loading": false,
        }
    },
    mounted() {
        if (!this.logged) {
            this.$router.replace({name: "home"})
        } else {
            this.$api.getUserInfo().then(r => {
                if (r.data.code === 0) {
                    this.user_info = r.data.user_info
                    this.last_timestamp = parseInt(r.data.last_ts) * 1000
                    this.user_info_loading = false
                } else {
                    this.$cookies.remove("logged")
                    this.$router.replace({name: "home"})
                }
            })
        }
    },
    methods: {
        "do_exit"() {
            this.$cookies.remove("logged")
            this.$router.replace({name: "home"})
        },
        "do_reset_pos"() {
            this.get_pos_loading = true
            window.navigator.geolocation.getCurrentPosition(success => {
                let lat = success.coords.latitude.toFixed(6)
                let long = success.coords.longitude.toFixed(6)

                this.$api.updateUserInfo(
                    {
                        "coords": {
                            "latitude": lat,
                            "longitude": long
                        }
                    }).then(r => {
                    if (r.data.code === 0) {
                        this.$bvToast.toast(
                            `新位置的纬度为${lat}, 经度为${long}。`,
                            {
                                title: "重设定位成功",
                                variant: "success",
                                autoHideDelay: 3000,
                            })
                    } else {
                        this.$bvToast.toast(
                            "未知错误！",
                            {
                                title: "错误",
                                variant: "danger",
                                autoHideDelay: 3000,
                            })
                    }
                }).catch(err => {
                    this.$bvToast.toast(
                        err.message,
                        {
                            title: "错误",
                            variant: "danger",
                            autoHideDelay: 3000,
                        })
                }).finally(() => {
                    this.get_pos_loading = false
                })

            }, () => {
                this.$bvToast.toast(
                    "发生了错误！请尝试使用其他浏览器，或者重试。",
                    {
                        title: "重设定位失败",
                        variant: "danger",
                        autoHideDelay: 3000,
                    })

                this.get_pos_loading = false
            }, {
                timeout: 10000
            })
        },
        "do_change_pw"(e) {
            e.preventDefault()
            if (this.change_pw_data[0] !== this.logged.pw) {
                this.old_pw_not_same_show = true
            } else {
                this.change_pw_loading = true

                this.$api.updateUserInfo(
                    {
                        "pw": this.change_pw_data[1]
                    }).then(r => {
                    if (r.data.code === 0) {
                        this.$set(this.logged, "pw", this.change_pw_data[1])
                        this.$cookies.set("logged", this.logged)

                        this.$bvModal.hide("change_pw_dialog")
                        this.$bvToast.toast(
                            "修改密码成功！",
                            {
                                title: "修改密码",
                                variant: "success",
                                autoHideDelay: 3000,
                            })
                    } else {
                        this.$bvToast.toast(
                            "未知错误！",
                            {
                                title: "错误",
                                variant: "danger",
                                autoHideDelay: 3000,
                            })
                    }
                }).catch(err => {
                    this.$bvToast.toast(
                        err.message,
                        {
                            title: "错误",
                            variant: "danger",
                            autoHideDelay: 3000,
                        })
                }).finally(() => {
                    this.change_pw_loading = false
                })
            }
        },
        "do_change_pause"(bool) {
            this.change_pause_loading = true

            this.$api.updateUserInfo(
                {
                    "is_pause": bool
                }).then(r => {
                if (r.data.code === 0) {
                    this.user_info["is_pause"] = bool

                    this.$bvToast.toast(
                        "操作成功！",
                        {
                            title: bool ? "暂停填报" : "恢复填报",
                            variant: "success",
                            autoHideDelay: 3000,
                        })
                } else {
                    this.$bvToast.toast(
                        "未知错误！",
                        {
                            title: "错误",
                            variant: "danger",
                            autoHideDelay: 3000,
                        })
                }
            }).catch(err => {
                this.$bvToast.toast(
                    err.message,
                    {
                        title: "错误",
                        variant: "danger",
                        autoHideDelay: 3000,
                    })
            }).finally(() => {
                this.change_pause_loading = false
            })
        },
        "do_del_user"() {
            this.del_user_loading = true
            this.$api.delUser().then(r => {
                if (r.data.code === 0) {
                    this.$cookies.remove("logged")
                    this.$router.replace({name: "home"})
                } else {
                    this.$bvToast.toast(
                        "未知错误！",
                        {
                            title: "错误",
                            variant: "danger",
                            autoHideDelay: 3000,
                        })
                }
            }).catch(err => {
                this.$bvToast.toast(
                    err.message,
                    {
                        title: "错误",
                        variant: "danger",
                        autoHideDelay: 3000,
                    })
            }).finally(() => {
                this.del_user_loading = false
            })
        },
        "refresh"() {
            location.reload()
        }
    },
    computed: {
        "logged"() {
            return this.$cookies.get("logged")
        },
        "change_pw_all_valid"() {
            return this.change_pw_data[0].length !== 0 && this.change_pw_data[1].length !== 0
        }
    }
}
</script>

<style lang="scss">
#user_page {
    .up-status {
        width: 60%;
    }

    #reset_pos_btn {
        margin-top: 2rem;
    }

    #exit_btn {
        margin-top: 2rem;
    }

    #extra_func_box {
        margin-top: 2rem;

        a {
            margin-right: 0.75rem;
            font-size: small;
        }
    }
}
</style>