import LibDbSession from '../../lib/LibDbSession';
import LibConfig from '../../lib/LibConfig';
import LibAuth from '../../lib/LibAuth';
import HttpCommon from '../../lib/HttpCommon';

//
const ChatPost = {
  /**
  * addItem
  * @param
  *
  * @return
  */
  addItem: async function(id: number)
  {
    try {
      let ret = {};
      const user_id = await LibAuth.getUser()
      if(user_id === null) {
          console.error("addPost, user nothing");
          throw new Error('Error , user nothing');
      }
console.log(user_id);
      const elemBody = document.querySelector<HTMLInputElement>('#body');
      const item = {
        title: '',
        chatId: Number(id),
        body: elemBody?.value,
        userId : Number(user_id),
      }
console.log(item);
//return;
      const json = await HttpCommon.server_post(item, "/chat_posts/create");
      //@ts-ignore
      elemBody.value = "";
//console.log(json);
      ret = json.data;
      return ret;
    } catch (error) {
        console.error(error);
    }    
  },
  /**
   * getList:
   * @param key: any
   *
   * @return
   */ 
  getList: async function(chatId: number): Promise<any>
  {
    try {
        let items = [];
        const item = {
          chatId: chatId,
          userId : 0,
        }
        const json = await HttpCommon.server_post(item, "/chat_posts/get_list");
        items = json.data
//console.log(items);	      
        await LibDbSession.set(LibConfig.SESSION_KEY_CHAT_POST, items);
      return items;
    } catch (e) {
      console.error(e);
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
      const json = await HttpCommon.server_post(item, '/chat_posts/delete');
      console.log(json.ret);
    } catch (e) {
      console.log(e);
      throw new Error('error, delete');
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
      const res = await fetch(import.meta.env.PUBLIC_API_URL + '/chat_posts/get_last_time', {
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
}
export default ChatPost;
