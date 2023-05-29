/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import {Toast} from 'vant';
import store from '../store/index'
import router from '@/router';

// // 环境的切换
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = 'http://api.123dailu.com/';
// }

axios.defaults.baseURL = 'http://124.70.195.38:8000';

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// put请求头
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';


// 请求拦截器
axios.interceptors.request.use(    
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        if(localStorage.getItem('token') == null){
            return config  
        }
        else{
            axios.defaults.headers.common['token'] = localStorage.getItem('token')
            return config
        }
    },    
    error => {        
        return Promise.error(error);    
    })

// 响应拦截器
axios.interceptors.response.use(    
    response => {        
        if (response.status == 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },
    // 服务器状态码不是200的情况    
    error => {        
        if (error.response.status) {            
            switch (error.response.status) {                
                // 401: 未登录                               
                case 401:                   
                    router.replace({                        
                        path: '/main/home'
                    });
                      
                    break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
                case 403:                     
                    Toast.fail({                        
                            message: '登录过期，请重新登录',                        
                            duration: 1000,                        
                            forbidClick: true                    
                        });                    
                    // 清除token                    
                    localStorage.removeItem('token');  
                    sessionStorage.removeItem('token')                  
                    store.commit('logout', null);                    
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {                        
                        router.replace({                            
                            path: '/main/login',                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);                    
                    break; 
                // 404请求不存在                
                case 404:                    
                    Toast.fail({                        
                            message: '网络请求不存在',                        
                            duration: 1500,                        
                            forbidClick: true                    
                        });                    
                break;                
                // 其他错误，直接抛出错误提示                
                default:                    
                    Toast.fail({                        
                            message: error.response.data.message,                        
                            duration: 1500,                        
                            forbidClick: true                    
                        });            
            }            
            return Promise.reject(error.response);        
        }       
    }
);

// 暴露axios
export default axios;