<template>
    <div class="app-page d-flex flex-column align-items-center"
         id="LoginPage"
    >
        <b-img :src="require('@/assets/logo.png')"
               width="64px"
               height="64px"
               class="my-4"
        ></b-img>
        <p class="page-title"
           id="loginTitle"
        >
            西电晨午晚检<br>自动填报器
        </p>
        <b-input-group>
            <b-input-group-prepend>
                <b-input-group-text>
                    <b-icon-person></b-icon-person>
                </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="sid_val"
                          placeholder="学号"
                          maxlength="11"
            >
            </b-form-input>
        </b-input-group>

        <b-input-group>
            <b-input-group-prepend>
                <b-input-group-text>
                    <b-icon-key></b-icon-key>
                </b-input-group-text>
            </b-input-group-prepend>

            <b-form-input v-model="pw_val"
                          type="password"
                          placeholder="密码"
            >
            </b-form-input>
        </b-input-group>

        <b-btn id="loginBtn"
               class="btn-block"
               variant="primary"
               @click="do_login"
               :disabled="!is_valid_input || login_loading"
               v-text="login_loading ? '请稍等……' : '进入'"
        >
        </b-btn>

        <b-modal id="invitation_code_dialog"
                 centered
                 :ok-title="signup_loading ? '……' : '确定'"
                 cancel-title="取消"
                 title="请输入邀请码"
                 @ok="do_sign_up"
                 :ok-disabled="signup_loading"
                 :no-close-on-backdrop="signup_loading"
                 :no-close-on-esc="signup_loading"
        >
            <div class="my-2">
                <b-form-input v-model="invitation_code_val"
                              placeholder="6位邀请码"
                              id="invitation_code_input"
                              @click="invitation_code_err_show=false"
                              maxlength="6"
                >
                </b-form-input>

                <b-tooltip :show="invitation_code_err_show"
                           target="invitation_code_input"
                           triggers=""
                           placement="top"
                >
                    {{ this.invitation_code_err_msg[this.invitation_code_err_code] }}
                </b-tooltip>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        "sid_val": "",
        "pw_val": "",
        "invitation_code_val": "",
        "invitation_code_err_show": false,
        "invitation_code_err_code": 0,
        "invitation_code_err_msg": [
            "该邀请码已过期。",
            "该邀请码无效！"
        ],
        "login_loading": false,
        "signup_loading": false,

    }),
    methods: {
        "do_login"() {
            this.login_loading = true
            this.$api.isNewUser(this.sid_val).then(r => {
                if (r.data.code === 0) {
                    if (r.data.bool === true) {
                        this.login_loading = false
                        this.$bvModal.show("invitation_code_dialog")
                    } else {
                        this.$api.logIn(this.sid_val, this.pw_val).then(r => {

                            if (r.data.code === 0) {
                                this.$cookies.set("logged",
                                    {
                                        "sid": this.sid_val,
                                        "pw": this.pw_val
                                    })

                                this.$router.replace({name: "user"})

                            } else if (r.data.code === 1) {
                                this.$bvToast.toast(
                                    "密码错误，请核对后重试！",
                                    {
                                        title: "错误",
                                        variant: "danger",
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
                            this.login_loading = false
                        })
                    }
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
                this.login_loading = false
            })
        },
        "do_sign_up"(e) {
            e.preventDefault()
            this.signup_loading = false

            this.$api.signUp(this.sid_val, this.pw_val,
                this.invitation_code_val).then(r => {
                if (r.data.code === 0) {
                    if (r.data.valid !== 0) {
                        this.invitation_code_err_show = true
                        this.invitation_code_err_code = r.data.valid - 1
                    } else {
                        this.$bvModal.hide("invitation_code_dialog")

                        this.$cookies.set("logged",
                            {
                                "sid": this.sid_val,
                                "pw": this.pw_val
                            }, "14d")

                        this.$router.replace({name: "user"})
                    }
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

                this.$bvModal.hide("invitation_code_dialog")
            }).finally(() => {
                this.signup_loading = false
            })
        }
    },
    mounted() {
        if (this.$cookies.isKey("logged")) {
            this.$router.replace({name: "user"})
        }
    },
    computed: {
        "is_valid_input"() {
            return this.sid_val.length === 11 &&
                /^[0-9]+$/.test(this.sid_val) &&
                this.pw_val.length !== 0
        }
    }
}
</script>

<style lang="scss" scoped>
#LoginPage {

    #loginBtn {
        margin-top: 2.5rem;
    }

    .input-group {
        margin: 1rem;
    }

    .btn {
        margin: 1rem;
    }

    #loginTitle {
        text-align: center;
        font-size: large;
        font-weight: bold;
        color: gray;
        letter-spacing: 3px;
    }
}
</style>
