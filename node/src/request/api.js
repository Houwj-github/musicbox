// 封装各个API接口
import { get, post, put, del } from './http'

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



export const getMyComposed = p => get('/compose/page', p);      // 获取自己创作的全部歌曲
export const editMyComposed = p => put('/compose', p);      // 获取自己创作的全部歌曲
export const delMyComposed = p => del('/compose', p);      // 获取自己创作的全部歌曲

export const getHistory = p => get('/menu/history', p);      // 获取历史记录
export const delHistory = p => del('/menu/history', p);      // 删除历史记录

