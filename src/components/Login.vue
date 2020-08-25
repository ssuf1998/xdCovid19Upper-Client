<template>
    <div class="app-page d-flex flex-column align-items-center"
         id="login_page"
    >
        <b-img :src="require('@/assets/logo.png')"
               width="64px"
               height="64px"
               class="my-4"
        ></b-img>
        <p class="page-title"
           id="login_title"
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

        <b-btn id="login_btn"
               class="btn-block"
               variant="primary"
               @click="do_login"
               :disabled="!is_login_input_valid || login_loading"
               v-text="login_loading ? '请稍等……' : '登记'"
        >
        </b-btn>


        <b-modal id="invitation_code_dialog"
                 centered
                 :ok-title="signup_loading ? '……' : '确定'"
                 cancel-title="取消"
                 title="请输入邀请码"
                 @ok="do_sign_up"
                 :ok-disabled="!is_invitation_input_valid || signup_loading"
                 :no-close-on-backdrop="signup_loading"
                 :no-close-on-esc="signup_loading"
                 @hidden="hidden_invitation_dialog_clear"
        >
            <div class="my-2">
                <b-form-input v-model="invitation_code_val"
                              placeholder="6位邀请码"
                              id="invitation_code_input"
                              @click="invitation_code_err_show=false"
                              maxlength="6"
                              autocomplete="off"
                >
                </b-form-input>

                <br>

                <div class="d-flex align-items-center">
                    <b-form-input v-model="captcha_val"
                                  placeholder="点验证码可刷新"
                                  id="captcha_input"
                                  @click="captcha_err_show=false"
                                  @input="captcha_err_show=false"
                                  maxlength="4"
                                  autocomplete="off"
                    >
                    </b-form-input>

                    <b-img :src="captcha_b64img"
                           id="captcha_box"
                           @click="do_captcha_b64img"
                           class="ml-3"
                    >
                    </b-img>
                </div>

                <b-tooltip :show="invitation_code_err_show"
                           target="invitation_code_input"
                           triggers=""
                           placement="top"
                >
                    {{ this.invitation_code_err_msg[this.invitation_code_err_code] }}
                </b-tooltip>

                <b-tooltip :show="captcha_err_show"
                           target="captcha_input"
                           triggers=""
                           placement="top"
                >
                    验证码错误。
                </b-tooltip>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "Login",
    data: function () {
        return {
            "sid_val": "",
            "pw_val": "",
            "invitation_code_val": this.outer_code,
            "invitation_code_err_show": false,
            "invitation_code_err_code": 0,
            "invitation_code_err_msg": [
                "该邀请码已过期。",
                "该邀请码无效！"
            ],
            "signup_loading": false,
            "captcha_val": "",
            "captcha_b64img": "",
            "captcha_b64img_loading": false,
            "captcha_err_show": false,
            "login_loading": false,
        }
    },
    props: {
        "outer_code": {
            type: String,
            default: ""
        }
    },
    methods: {
        "do_captcha_b64img"() {
            if (!this.captcha_b64img_loading) {
                this.captcha_val = ""
                this.captcha_b64img_loading = true
                this.$api.getCaptcha(this.sid_val).then(r => {
                    if (r.data.code === 0) {
                        this.captcha_b64img = r.data.img
                    }
                }).finally(() => {
                    this.captcha_b64img_loading = false
                })
            }
        },
        "do_login"() {
            this.login_loading = true
            this.$api.isNewUser(this.sid_val).then(r => {
                if (r.data.code === 0) {
                    if (r.data.bool === true) {
                        this.login_loading = false
                        this.$bvModal.show("invitation_code_dialog")
                        this.do_captcha_b64img()
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

            this.$api.checkCaptcha(this.sid_val, this.captcha_val).then(r => {
                if (r.data.code === 1) {
                    this.captcha_err_show = true
                    this.do_captcha_b64img()
                    document.getElementById("captcha_input").focus()
                } else if (r.data.code === 0) {
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
                    })
                }
            }).finally(() => {
                this.signup_loading = false
            })

        },
        "hidden_invitation_dialog_clear"() {
            this.invitation_code_val = this.outer_code
            this.captcha_val = ""
            this.invitation_code_err_show = false
            this.captcha_err_show = false
        }
    },
    mounted() {
        if (this.$cookies.isKey("logged")) {
            this.$router.replace({name: "user"})
        }
    },
    computed: {
        "is_login_input_valid"() {
            return this.sid_val.length === 11 &&
                /^[0-9]+$/.test(this.sid_val) &&
                this.pw_val.length !== 0
        },
        "is_invitation_input_valid"() {
            return this.invitation_code_val.length === 6 &&
                this.captcha_val.length === 4
        },

    }
}
</script>

<style lang="scss" scoped>
#login_page {

    #login_btn {
        margin-top: 2.5rem;
    }

    .input-group {
        margin: 1rem;
    }

    .btn {
        margin: 1rem;
    }

    #login_title {
        text-align: center;
        font-size: large;
        font-weight: bold;
        color: gray;
        letter-spacing: 3px;
    }
}

#captcha_box {
    width: 8rem;
}
</style>
