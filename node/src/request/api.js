// 封装各个API接口
import { get, post,put,postJson,del,deleteQuery,postFormData,getPath,postPath ,getSong} from './http'

// postJson表示post请求Json类型

/**
 *  @param '/'代表config中index.js中配置的代理
 *  @param 'p'代表携带的参数
 */
// user-controller
export const loginAPI = p => post('/user/login', p);                     //登录接口
export const registerAPI = p => post('/user/register', p);               //注册接口
export const logoutAPI = p => post('/user/logout', p);                    //登出接口
export const upgradeCreator = p => post('/user/upgrade/creator', p);      //升级为创作者
export const upgradeVip = p => post('/user/upgrade/vip', p);               //升级为VIP

export const getUserInfoAPI = p => get('/user/info', p);         //获取用户自己的信息
export const getUserAllAPI = p => get('/user/all', p);           //获取全部用户的信息
export const tokenAPI = p => get('/user/parse_token', p);        //解析token

export const modifyUserInfoAPI = p => put('/user/info', p);            //修改用户的信息
export const upgradeVipAPI= p => post('/user/upgrade/vip', p);         //升级成为VIP接口
export const upgradeCreatorAPI= p => post('/user/upgrade/creator', p);    //升级成为创作者接口

// 创建的歌单API
export const menuMyAPI =(url)  => get(url);                                  //按id获取自己创建的歌单(包括专辑)的信息 (含歌曲) 
export const menuMyPageAPI =p  => get('/menu/my/page/song_menu',p);             //分页获取自己创建的歌单
export const insertMenuAPI =(p)  => postJson('/menu/my',p);                         //新增歌单，数据类型为json

export const modifyMenuAPI =(p)  => put('/menu/my',p);                          //修改歌单
export const delMyMenu = p => del('/menu/my/',p);                               // 删除创建的歌单

// 收藏的歌单API
export const delCollectMenu = p => del('/menu/collect',p);                      // 删除收藏的的歌单
export const menuCollectPageAPI =p  => get('/menu/collect/page/song_menu',p);     //分页获取自己收藏的歌单 
export const collectMenuAPI = url => post(url);                                     // 收藏歌单/专辑

// 收藏的专辑API
export const menuCollectPageAlbumAPI =p  => get('/menu/collect/page/album',p);       //分页获取自己收藏的专辑
export const menuCollectAPI = url  => get(url);                                      //按id获取自己收藏的歌单的信息

// 公开歌单/专辑API
export const menuPublicPageAPI =p  => get('/menu/public/page/song_menu',p);         //分页获取公开的歌单 
export const menuPublicPageAlbumAPI =p  => get('/menu/public/page/album',p);         //分页获取公开的歌单 

// 歌曲API
export const songPageAPI =p  => get('/song/page',p);                                     //分页获取公开的歌曲
export const menuMySongAPI =(p)  => post('/menu/my/song',p);                         //新增歌单，数据类型为json
export const songPlayLoggedAPI = url  => get(url);                                    

export const getMyMenuAPI =url => get(url);                                             //获取创建的歌单的信息
export const getCollectMenuAPI =url => get(url);                                        //获取收藏的歌单的信息
export const getCollectAlbumAPI =url => get(url);                                       //获取收藏的歌单的信息
export const getPublicMenuAPI =url => get(url);                                       //获取公开的歌单/专辑的信息


export const delSongInMenuAPI=p=>deleteQuery('/menu/my/song',p);                                //删除指定歌单中的歌曲


export const getUploadSongAPI=p=>get('/compose/page',p);        //获取上传的歌曲
export const editUploadSongInfoAPI=p=>put('/compose',p);        //修改上传的歌曲信息
export const delUploadSongAPI=p=>del('/compose',p);             //删除上传的歌曲

export const getSongInfoAPI=url=>get(url);                      //获取歌曲信息
export const getSongCommentAPI=(url,p)=>get(url,p);             //获取歌曲评论
export const setSongCommentAPI=(url,p)=>post(url,p);            //发表评论
export const editSongCommentAPI=p=>put('/song/comment',p);      //修改评论
export const delSongCommentAPI=p=>del('/song/comment',p);       //删除评论  

export const playSongloggedAPI=url=>getSong(url);                   //登录状态下播放指定歌曲

// 播放量API
export const ToplistSongCollectAPI=p=>get('/menu/toplist/top_collect',p);          //收藏量最多的歌
export const ToplistSongPlayAPI=p=>get('/menu/toplist/top_play',p);                //播放量量最多的歌单
export const ToplistMenuAPI=p=>get('/menu/toplist/top_menu',p);                   //收藏量最多的歌单
export const ToplistAlbumAPI=p=>get('/menu/toplist/top_album',p);                   //收藏量最多的歌单


// 上传歌曲，封面
export const menuMyCoverAPI=p=>postFormData('/menu/my/cover',p);                   //上传歌单封面
export const userAvaterAPI=p=>postFormData('/user/avatar',p);                   //上传歌单封面

export const getMyComposed = p => get('/compose/page', p);      // 获取自己创作的全部歌曲
export const editMyComposed = p => put('/compose', p);      // 获取自己创作的全部歌曲
export const delMyComposed = p => del('/compose', p);      // 获取自己创作的全部歌曲
export const editUploadSongStatusAPI=p=>deleteQuery('/composeisibility',p);           //设置歌曲可见度（状态）


export const getHistory = p => get('/menu/history', p);      // 获取历史记录
export const delHistory = p => del('/menu/history', p);      // 删除历史记录

//社交
export const getFans = p => get('/social/fan', p);      // 删除历史记录
export const getUserInfoById = (p, pathVariable)=> getPath('/user/visit', p, pathVariable)   // 按id获取用户信息
export const followById = (p, pathVariable) => postPath('/social/follow', p, pathVariable);      // 关注用户
export const getChatByUser = (p, pathVariable) => getPath('/social/message', p, pathVariable);      // 关注用户
export const delOneChatMessage = p => del('/social/message', p);      // 删除一条聊天记录
export const postOneChatMessage = p => postJson('/social/message', p);      // 发送一条聊天记录

//我的创作
export const menuMyPageAlbumAPI =p  => get('/menu/my/page/album',p);             //分页获取自己创建的专辑
export const composeAlbum =(p)  => postJson('/compose/album',p);                         //创建专辑，数据类型为json
export const modifyComposeAlbum =(p)  => put('/compose/album',p);                         //修改专辑信息
export const composeAlbumDel = p => del('/compose/album/',p);                               // 删除创建的歌单


//论坛API
export const getPostAPI=p=>get('/post/topic',p);                //获取帖子
export const getPostCenterAPI=url=>get(url);                    //获取帖子内容
export const setPostCommentAPI=p=>postJson('/post/reply',p);    //发表评论
export const delPostReplyAPI=p=>del('/post/reply',p);           //删除评论
export const setMyPostAPI=p=>postJson('/post/topic',p);         //发表帖子
export const getMyPostAPI=p=>get('/post/my/topic',p);           //获得自己发表过的帖子
export const delMyPostAPI=p=>del('/post/topic/',p);             //删除自己发表的帖子
export const getMyCommentAPI=p=>get('/post/my/reply',p);        //获取自己的评论
export const getPostByReplyAPI=url=>get(url);                   //通过评论获得主帖
export const getOtherUserInfoAPI=url=>get(url);                 //通过Id获取用户信息











