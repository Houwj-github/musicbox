import Vuex from 'vuex';
import Vue from 'vue';
 
 
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        songLists:
            {
                id: '1654005738013499393',
                songName: "吉他曲",
                coverPicture:'http://124.70.195.38:8000/cover/f1c06a67-8eed-4679-a99a-cdffc085cbed.jpg',
            },
        isplay:false,
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
        setToken(state,token)
        {
            state.token=token
        },

        // 退出登录将token清空
        logout: (state) => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            state.token = null
            console.log(sessionStorage.getItem('token')+'1')
        },

        //播放音乐
        playSong:(state,songList) =>{
            const spliceLength2 = songList.coverPicture.lastIndexOf("/");
            songList.coverPicture="http://124.70.195.38:8000/cover/"+songList.coverPicture.slice(spliceLength2 + 1);
            console.log(songList)
            if(songList)
            {
                state.songLists=songList;
            }
        },

        //反转播放状态
        pauseSong:(state)=>{
            state.isplay=!state.isplay;
        }
    }
})
 