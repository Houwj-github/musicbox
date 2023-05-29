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

//个人中心
import MyCenter from '@/views/MyCenter.vue'

//歌单具体信息
import MyMenuCenter from '@/views/MyMenu.vue'
import CollectMenuCenter from '@/views/CollectMenu.vue'
import CollectAlbumCenter from '@/views/CollectAlbum.vue'

//歌曲界面
import Song from '@/views/Song.vue'

//社交界面
import Fan from "@/views/Fan.vue";
import Chat from "@/views/Chat.vue";
import Follower from "@/views/Follower.vue";

//论坛
import Post from '@/views/post/Post.vue'
import PostCenter from '@/views/post/PostCenter.vue'
import CreatePost from '@/views/post/CreatePost.vue'
import MyPost from '@/views/post/MyPost.vue'
import MyComment from '@/views/post/MyComment.vue'


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
              path: 'fan',
              component: Fan
            },
            {
              path: 'follower',
              component: Follower
            },
            {
              path: 'chat',
              component: Chat
            },
            {
              path: 'mycenter', 
              component: MyCenter,
              // redirect:'/main/mycenter'
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
              ]
            },
            {
              path:'search',
              component:Search,
            },
            {
              path:'collectalbum',
              component:CollectAlbumCenter,
            },
            {
              path:'mymenu',
              component:MyMenuCenter,
            },
            {
              path:'collectmenu',
              component:CollectMenuCenter,
            } ,
            {
              path:'song',
              component:Song,
            },
            {
              path:'post',
              component:Post,
            },
            {
              path:'postcenter',
              component:PostCenter,
            },
            {
              path:'createpost',
              component:CreatePost,
            },
            {
              path:'mypost',
              component:MyPost,
            },
            {
              path:'mycomment',
              component:MyComment,
            }
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

