//import moment from 'moment'
import LibConfig from '../../lib/LibConfig'
import HttpCommon from '../../lib/HttpCommon';

//
const LibChat = {
  /**
  * get :
  * @param
  *
  * @return Promise<any>
  */      
  get: async function(id: number): Promise<any>
  {
    try{
      let ret = {};
      let item: any = {
        "id": id
      };
      const json = await HttpCommon.server_post(item, "/chats/get");
//console.log(json);
      if(json.ret === LibConfig.OK_CODE) {
        ret = json.data;
        //        console.log(json.data);
      }
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , get');
    }    
  },  
}
export default LibChat;
