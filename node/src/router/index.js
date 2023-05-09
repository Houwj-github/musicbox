//路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import MyMusic from '../views/MyMusic.vue'
import App from '../App.vue'
import CreativeCenter from '../views/CreativeCenter.vue'
import Search from'../views/Search.vue'

// 我的音乐
import AllMusic from '../views/mymusic/AllMusic.vue'
import HistoricalRecord from'../views/mymusic/HistoricalRecord.vue'
import CollectedAlbums from '../views/mymusic/CollectedAlbums.vue'
import CreatedPlayLists from '../views/mymusic/CreatedPlayLists.vue'
import FavoritePlayLists from '../views/mymusic/FavoritePlayLists.vue'

// 创作中心
import CreateAlbum from '../views/creativecenter/CreateAlbum.vue'
import MyCreation from '../views/creativecenter/MyCreation.vue'
import UploadSong from '../views/creativecenter/UploadSong.vue'
import EnterCreator from '../views/creativecenter/EnterCreator.vue'

//个人中心
import MyCenter from '@/views/MyCenter.vue'



Vue.use(VueRouter)

//1. 创建路由组件
//2. 将路由和组件进行映射
//3. 创建router实例

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
    //主路由
    { 
        path:'/',
        component: App,
        children:[
            //子路由
        { 
          path: 'main', 
          component: Main,
          children:[
            {
              path: 'home', 
              component: Home
            },
            {
              path: 'mycenter', 
              component: MyCenter
            },
            {
              path: 'mymusic', 
              component: MyMusic,
              children:[
                {
                  path:'allmusic',
                  component: AllMusic,
                },
                {
                  path:'historicalrecord',
                  component: HistoricalRecord
                },
                {
                  path:'collectedalbums',
                  component: CollectedAlbums,
                },
                {
                  path:'favoriteplaylists',
                  component: FavoritePlayLists
                },
                {
                  path:'createdplaylists',
                  component: CreatedPlayLists,
                },
              ]
            },
            {
              path: 'creativecenter', 
              component: CreativeCenter,
              children:[ 
                {
                  path:'createalbum',
                  component: CreateAlbum,
                },
                {
                  path:'mycreation',
                  component: MyCreation,
                },
                {
                  path:'uploadsong',
                  component: UploadSong,
                },
                {
                  path:'entercreator',
                  component: EnterCreator,
                },
              ]
            },
            {
              path:'search',
              component:Search,
            },
          ]

        },
      ]
    },
    {
      path: '/login', component: Login
    },
  ]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })

//暴露路由
export default router

