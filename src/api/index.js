const Qs = require('qs');
// 配置API接口地址
// var root = 'https://cnodejs.org/api/v1'
var root = process.env.API_ROOT//'/mod'
// 引用axios
var axios = require('axios')
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
            // window.location.href = "../"
            if(res.data.state === "3"){
                window.alert('错误: ' + JSON.stringify(res.data))
            }else if(res.data.state === "2"){
                window.location.href = "../#/login"
            }else{
                window.alert('错误: ' + JSON.stringify(res.data))
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