import moment from 'moment'
import LibStorage from './LibStorage';
import LibConfig from './LibConfig'
// 初期値
const initParam =  {
  ACTIVE_UPDATE_SEC: 30,
  STATE_ACTIVE: 1,      
  STATE_NON_ACTIVE: 2,      
  STATE_DISPLAY_ACTIVE: "Active",      
  STATE_DISPLAY_NONE : "noneActive",      
};
const chatParams = {
  INIT_TIME : new Date(),
  STAT : initParam.STATE_ACTIVE,
  STAT_DISPLAY : initParam.STATE_DISPLAY_ACTIVE,
  REMAIN_TIME : 0,
}
//
const LibChatPost = {
  /**
  * get_params :
  * @param
  *
  * @return
  */
  get_params: function() : any
  {
    return {
      ACTIVE_UPDATE_SEC: 30,      
      STATE_ACTIVE: 1,      
      STATE_NON_ACTIVE: 2,      
      STATE_DISPLAY_ACTIVE: "Active",      
      STATE_DISPLAY_NONE : "noneActive",      
    }
  },
  /**
  * postUpdate : 投稿の更新判定
  * @param
  *
  * @return ret: true(update)
  */      
 /*
  postUpdate: function(): boolean
  {
    let ret = false;
    const sec = this.get_remain_time(chatParams.INIT_TIME, new Date() );
    chatParams.REMAIN_TIME = this.get_next_time(sec);
    const valid = this.valid_update(sec, chatParams.STAT);
console.log(chatParams.STAT, sec, valid , chatParams.REMAIN_TIME );
    if(valid) {
      chatParams.INIT_TIME = new Date();
      ret = true;
    }
    return ret;
  },
 */
  /**
  * resetInitTime
  * @param
  *
  * @return
  */ 
  resetInitTime: function(): void
  {
    chatParams.INIT_TIME = new Date();
  },  
  /**
  * get_remain_time : 初期化からの経過時間
  * @param
  *
  * @return ret: true(update)
  */     
  get_remain_time(init_time: any, now_time: any)
  {
    const bef = moment(init_time)
    const now = moment(now_time)
    let duration = moment.duration(now.diff(bef), 'milliseconds'); 
    //差分をミリ秒で取得し、ミリ秒→durationへ変換
    let min = duration.minutes()
//    let time = duration.minutes() + ":" + duration.seconds();
    let time = (min * 60) + duration.seconds();
//console.log(time)
    return time
  },
  /**
  * get_next_time :　更新までの残り時間
  * @param
  *
  * @return number
  */ 
  get_next_time(sec: number)
  {
    var ret = 0
    const cfg = initParam;
    const max = cfg.ACTIVE_UPDATE_SEC
    ret = max - sec
    return ret
  },
  /**
  * valid_update : 更新するか判定
  * @param
  *
  * @return ret: true(update)
  */    
  valid_update(sec: number, stat: number): boolean
  {
    var ret = false;
    const cfg = initParam;
    var max = cfg.ACTIVE_UPDATE_SEC
    if(stat == cfg.STATE_ACTIVE){
      if(sec >= max){
        ret = true
      }
    }
//console.log(cfg)
    return ret
  },
  /**
  * get_chat_items
  * @param
  *
  * @return ret: true(update)
  */  
  get_chat_items: function(items: any[], chat_id: number)
  {
    try{
      let ret: any[] = []
      items.forEach(function(item){
        if(item.chat_id == chat_id){
          ret.push(item)
        }
      });      
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_chat_items');
    }
  },  
  /**
  * convert_users
  * @param
  *
  * @return ret: true(update)
  */   
  convert_users: function(items: any[] , users: any[])
  {
    try{
      let ret: any[] = []
      items.forEach(function(item: any){
        users.forEach(function(user){
          if(item.user_id == user.id){
            item.user = user
//console.log(item );
            ret.push(item)
          }
        })
      });      
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, convert_users');
    }
  },
  /**
  * delete
  * @param
  *
  * @return ret: true(update)
  */     
  delete : async function (id: number): Promise<void>
  {
    try {
      const item = {
        id: id,
      }
//console.log(item)      
      const res = await fetch(import.meta.env.PUBLIC_API_URL + '/chat_posts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(item),
      });
      if (res.status != 200) {
        throw new Error(await res.text());
      }
      const json = await res.json();
      console.log(json.ret);
    } catch (e) {
      console.log(e);
      throw new Error('error, delete');
    }
  },
  /**
  * getPostItem
  * @param
  *
  * @return
  */    
  getPostItem : async function (id: number): Promise<any>
  {
    try {
      let ret = {};
      const res = await fetch(LibConfig.API_URL + '/chat_posts/show/' + id, {
        method: 'GET',
      });
      if (res.status != 200) {
        throw new Error(await res.text());
      }
      const json = await res.json();
      if(json.ret === LibConfig.OK_CODE) {
//console.log(json.data);
          ret = json.data;
      }
      return ret;
    } catch (e) {
      console.log(e);
      throw new Error('error, getPostItem');
    }
  },  
  /**
  * getLastTime
  * @param chatId: number
  *
  * @return Promise
  */      
  getLastTime : async function (chatId: number, userId: number): Promise<any>
  {
    try {
      let ret = {};
      const item = {
        chatId: chatId,
        userId: userId,
      }
//console.log(item)      
       const res = await fetch(LibConfig.API_URL + '/chat_posts/get_last_time', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json',},
         body: JSON.stringify(item),
       });
       if (res.status != 200) {
         throw new Error(await res.text());
       }
       const json = await res.json();
       if(json.ret === LibConfig.OK_CODE) {
//console.log(json.data);
        ret = json.data;
      }
      return ret;       
    } catch (e) {
      console.log(e);
      throw new Error('error, getLastTime');
    }
   },
  /**
  * getShowItem
  * @param items: array
  * @param id: number
  *
  * @return object
  */     
   getShowItem : function (items: any, id: number): any
   {
    let ret = {};
    items.forEach(function (item: any){
//      console.log(item.id, id);
      if (item.id === id) {
        ret = item;
      }
    });    
    return ret;
   },
  /**
  * search
  * @param chatId number
  * @param searchKey string
  *
  * @return
  */   
   search : async function (chatId: number, searchKey: string | undefined): Promise<any>
   {
    try{
      const item = {
        chatId : chatId, seachKey: searchKey, 
      };
//console.log(item);
      const res = await fetch(LibConfig.API_URL + '/chat_posts/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      const json = await res.json();
      if(json.ret !== LibConfig.OK_CODE ) {
        throw new Error('Error , search');
      }
//console.log(json.data);
      return json.data;
    } catch (e) {
      console.error(e);
      throw new Error('Error, search');
    }
   },

}
export default LibChatPost;
