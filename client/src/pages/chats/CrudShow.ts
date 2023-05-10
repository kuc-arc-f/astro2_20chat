import LibCrud from '../../lib/LibCrud';

const CrudShow = {
  /**
   * get:
   * @param key: any
   *
   * @return
   */      
  get: async function(id: number) : Promise<any>
  {
    try{
      const url = import.meta.env.PUBLIC_API_URL;
//console.log(url);
//console.log("id=",id);
      let item: any = {};
      const response = await fetch(url+ "/todos/show/" + String(id));
      const json = await response.json();
      item = json;
console.log(item);
      return item;      
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * delete:
   * @param key: any
   *
   * @return
   */   
  delete : async function(id: number) : Promise<any>
  {
    try{
      let ret = false;
      const url = import.meta.env.PUBLIC_API_URL;
      console.log("url=", url); 
      const item = {
        id: id
      }
console.log(item);
      const body = JSON.stringify(item);		
      const res = await fetch(url + '/todos/delete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      console.log(json);   
      if (res.status !== 200) {
        throw new Error(await res.text());
      } 
      ret = true;
      return ret;      
    } catch (e) {
      console.error(e);
    }
  },  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      //btn
      //const elm: any = document.querySelector('#item_id');
      //const id = elm?.value;
//console.log("id=", id);
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudShow.startProc();

export default CrudShow;
