import axios from 'axios';

import { Loading, Message } from 'element-ui';

import router from './router'



/*loading遮罩层开启关闭函数*/
let loading;
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "加载中",
        background: "rgba(0,0,0,0.7)"
    });
}
function closeLoading() {
    loading.close()
}

//中间件方式处理axios 
//拦截器
//请求拦截
axios.interceptors.request.use(
    (config) => {
        startLoading();
        if (localStorage.eleToken) {
            //要将返回的token 存入到localstorage
            config.headers.Authorization = localStorage.eleToken; 
        }
        return config
    },
    (err) => {
        return Promise.reject(err);
    }
)

//响应拦截
axios.interceptors.response.use(
    (response) => {
        closeLoading();
        return response;
    },
    (err) => {
        const { status } = err.response;
        // 后端对非法请求会返回 401 Unauthorized.
        if (status == 401) {
            Message.error("token失效，请重新登录");
            localStorage.removeItem("eleToken");
            router.push ('/login')
        }
        closeLoading();
        Message.error(err.response.data)
        return Promise.reject(err);
    }
)


export default axios;