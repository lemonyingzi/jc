import { Message, Loading } from 'element-ui';

import router from '@/router'


const Qs = require('qs');
// 配置API接口地址
var root = process.env.API_ROOT//'/mod'
// 引用axios
var axios = require('axios')

var state = ""

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.1)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}

let needLoadingRequestCount = 0

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

axios.interceptors.request.use(
    config => {
        // var token = ''
        // if(typeof Cookies.get('user') === 'undefined'){
        //     //此时为空
        // }else {
        //     token = JSON.parse(Cookies.get('user')).token
        // }//注意使用的时候需要引入cookie方法，推荐js-cookie
        // config.data = JSON.stringify(config.data);
        // config.headers = {
        //     'Content-Type':'application/json'
        // }
        // if(token != ''){
        //   config.headers.token = token;
        // }
        showFullScreenLoading()
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);
axios.interceptors.response.use(
    response => {
        //当返回信息为未登录或者登录失效的时候重定向为登录页面
        if(response.data.state == '2'){
            router.push({
                path: 'Login',
                name:'登录'
                // querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
            })
        }
        tryHideFullScreenLoading()
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

// 自定义判断元素类型JS
function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
 
/*
  接口处理函数
  主要是，不同的接口的成功标识和失败提示是不一致的。
*/
function apiAxios (method, url, params, success, failure) {
    if (params) {
        params = filterNull(params)
    }
    params = Qs.stringify(params)
    axios({
        method: method,
        url: url+'.ashx',
        dataType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root,
        withCredentials: false
    })
    .then(function (res) {
    if (Number(res.data.state) === 0) {
        if (success) {
            success(res.data)
        }
    } else {
        if (failure) {
            failure(res.data)
        } else {
            if(res.data.state === "3"){
                Message.warning({
                    message: res.data.errorInfo
                });
            }
        }
    }
    })
    .catch(function (err) {
        let res = err.response
        // if (err) {
        //     window.alert('错误: ' + res.status)
        // }
    })
}
 
// 返回在vue模板中的调用接口
export default {
    get: function (url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return apiAxios('POST', url, params, success, failure)
    },
    put: function (url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    }
}