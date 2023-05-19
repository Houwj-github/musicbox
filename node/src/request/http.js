// 封装http
import QS from 'qs';
import request from './request'


/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        request.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export const post = (url, params) => {
        return request({
        method:'post',
        url: url,  
        params: params,
        
        // 去掉 在 request.js 中默认添加的 TOKEN，因为此接口不需要 TOKEN

        headers:{
            isToken: false
        },
    })
}
/** 
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const put = (url, params) => {
    return request({
        method:'put',
        url: url,  
        data: JSON.stringify(params),
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        },
    })
}

/**
 * delete，仅传入路径变量
 * @param {String} url [请求的url地址]
 * @param {int / null} pathVariable [路径变量]
 */
export const del = (url, pathVariable) => {
    if (pathVariable === null)
        return request({
            method:'delete',
            url: url
        })
    return request({
        method:'delete',
        url: url + '/' + pathVariable
    })
}


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} pathVariable [路径变量]
 */
export function getPath(url, params, pathVariable){
    return new Promise((resolve, reject) =>{
        request.get(url + '/' + pathVariable.toString(), {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} pathVariable [路径变量]
 */
export function postPath(url, params, pathVariable){
    return request({
        method:'post',
        url: url + '/' + pathVariable.toString(),
        params: params
    })
}

/**
 * post方法，对应post请求 JSON
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const postJson = (url, params) => {
    return request({
        method:'post',
        url: url,
        data: JSON.stringify(params),
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        },
    })
}