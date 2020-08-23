import service from "./request"

const check = () => {
    return service({
        url: "/check",
        method: "get",
    })
}

const isNewUser = (sid) => {
    return service({
        url: "/isnewuser",
        method: "post",
        data: {
            sid
        }
    })
}

const signUp = (sid, pw, invitation_code) => {
    return service({
        url: "/signup",
        method: "post",
        data: {
            sid,
            pw,
            code: invitation_code
        }
    })
}

const logIn = (sid, pw) => {
    return service({
        url: "/login",
        method: "post",
        data: {
            sid,
            pw,
        }
    })
}

const getUserInfo = (sid, pw) => {
    return service({
        url: "/getuserinfo",
        method: "post",
        data: {
            sid,
            pw,
        }
    })
}

const delUser = (sid, pw) => {
    return service({
        url: "/deluser",
        method: "post",
        data: {
            sid,
            pw,
        }
    })
}

const updateUserInfo = (sid, pw, new_user_info) => {
    return service({
        url: "/updateuserinfo",
        method: "post",
        data: {
            sid,
            pw,
            new_user_info
        }
    })
}

const getCaptcha = (cid) => {
    return service({
        url: "/captcha",
        method: "get",
        params: {
            cid,
        }
    })
}

const checkCaptcha = (cid, captcha) => {
    return service({
        url: "/checkcaptcha",
        method: "get",
        params: {
            cid,
            "v": captcha,
        }
    })
}

export default {
    check,
    isNewUser,
    signUp,
    logIn,
    getUserInfo,
    delUser,
    updateUserInfo,
    getCaptcha,
    checkCaptcha
}