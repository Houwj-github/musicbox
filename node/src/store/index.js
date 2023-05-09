import Vuex from 'vuex';
import Vue from 'vue';
 
 
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token: null,
    },
    mutations: 
    {
        // 登录成功将, token保存在localStorage和sessionStorage中
        login: (state, token) =>
         {

            localStorage.token = token;
            sessionStorage.token = token;
            state.token = token;
        },

        // 退出登录将token清空
        logout: (state) => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            state.token = null
        },
    }
})
 