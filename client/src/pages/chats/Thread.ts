import LibDbSession from '../../lib/LibDbSession';
import LibConfig from '../../lib/LibConfig';
import LibAuth from '../../lib/LibAuth';
import HttpCommon from '../../lib/HttpCommon';

//
const Thread = {
  /**
  * getItems
  * @param chatPostId: number
  *
  * @return
  */   
  getItems : async function (chatPostId: number): Promise<any>
  {
   try{
     const item = {
       chatPostId: chatPostId,
     }      
     const json = await HttpCommon.server_post(item, "/threads/get_list");
console.log(json);
     return json.data;
   } catch (e) {
     console.error(e);
     throw new Error('Error, getItems');
   }
  },
  /**
  * create
  * @param chatPostId: number
  *
  * @return
  */   
  create : async function (
    chatPostId: number, body: string | undefined, chatId: number, userId: number
   ): Promise<void>
   {
    try{
      const item = {
        title: '',
        body: body,
        userId: userId,
        chatId: chatId,
        chatPostId: chatPostId,
      }
      const json = await HttpCommon.server_post(item, "/threads/create");
      console.log(json);
    } catch (e) {
      console.error(e);
      throw new Error('Error, create');
    }
   },  
  /**
  *
  * @param id: number
  *
  * @return
  */
  delete: async function (id: number): Promise<any>
   {
    try{
      let ret = false;
      const item = {
        id: id
      }
      const json = await HttpCommon.server_post(item, "/threads/delete");
      console.log(json);
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error, delete');
    }
   },   
}
export default Thread;
