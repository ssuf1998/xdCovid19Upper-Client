import service from "./request";
import Vue from "vue";

const check = () => {
    return service({
        url: "/check",
        method: "get",
    });
};

const isNewUser = (sid) => {
    return service({
        url: "/isnewuser",
        method: "post",
        data: {
            sid
        }
    });
};

const signUp = (sid, pw, invitation_code) => {
    return service({
        url: "/signup",
        method: "post",
        data: {
            sid,
            pw,
            code: invitation_code
        }
    });
};

const logIn = (sid, pw) => {
    return service({
        url: "/login",
        method: "post",
        data: {
            sid,
            pw,
        }
    });
};

const getUserInfo = () => {
    return service({
        url: "/getuserinfo",
        method: "post",
        data: {
            "sid": Vue.prototype.$cookies.get("logged")["sid"],
            "pw": Vue.prototype.$cookies.get("logged")["pw"],
        }
    });
};

const delUser = () => {
    return service({
        url: "/deluser",
        method: "post",
        data: {
            "sid": Vue.prototype.$cookies.get("logged")["sid"],
            "pw": Vue.prototype.$cookies.get("logged")["pw"],
        }
    });
};

const updateUserInfo = (new_user_info) => {
    return service({
        url: "/updateuserinfo",
        method: "post",
        data: {
            "sid": Vue.prototype.$cookies.get("logged")["sid"],
            "pw": Vue.prototype.$cookies.get("logged")["pw"],
            new_user_info
        }
    });
};

const getBaseSysInfo = () => {
    return service({
        url: "/getbasesysinfo",
        method: "get",
    });
};

const getVersions = () => {
    return service({
        url: "/getversions",
        method: "get",
    });
};


const getQA = () => {
    return service({
        url: "/getqa",
        method: "get",
    });
};

const getCaptcha = (cid) => {
    return service({
        url: "/captcha",
        method: "get",
        params: {
            cid,
        }
    });
};

const checkCaptcha = (cid, captcha) => {
    return service({
        url: "/checkcaptcha",
        method: "get",
        params: {
            cid,
            "v": captcha,
        }
    });
};

export default {
    check,
    isNewUser,
    signUp,
    logIn,
    getUserInfo,
    delUser,
    updateUserInfo,
    getBaseSysInfo,
    getVersions,
    getQA,
    getCaptcha,
    checkCaptcha
};