// 封装各个API接口
import { get, post,put } from './http'

/**
 *  @param '/'代表config中index.js中配置的代理
 *  @param 'p'代表携带的参数
 */
export const loginAPI = p => post('/user/login', p);             //登录接口
export const registerAPI = p => post('/user/register', p);       //注册接口
export const logoutAPI = p => post('/user/logout', p);           //登出接口

export const getUserInfoAPI = p => get('/user/info', p);         //获取用户自己的信息
export const getUserAllAPI = p => get('/user/all', p);           //获取全部用户的信息
export const tokenAPI = p => get('/user/parse_token', p);        //解析token

export const modifyUserInfoAPI = p => put('/user/info', p);      //修改用户的信息