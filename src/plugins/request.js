import axios from "axios";

const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 7500
});


// service.interceptors.request.use(
//     config => {
//         if (["/xcu/v1/check"].indexOf(config.url) === -1) {
//             if (config.method === 'post') {
//                 if (config.data) {
//                     config.data["app_key"] = "HZPKklTv9M5FrRsM6ymacKGk5thWIWbi"
//                 } else {
//                     config["data"] = {
//                         "app_key": "HZPKklTv9M5FrRsM6ymacKGk5thWIWbi"
//                     }
//                 }
//             } else if (config.method === 'get') {
//                 if (config.params) {
//                     config.params["app_key"] = "HZPKklTv9M5FrRsM6ymacKGk5thWIWbi"
//                 } else {
//                     config["params"] = {
//                         "app_key": "HZPKklTv9M5FrRsM6ymacKGk5thWIWbi"
//                     }
//                 }
//             }
//         }
//
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )


export default service;