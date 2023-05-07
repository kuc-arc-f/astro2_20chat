import LibConfig from '../../lib/LibConfig';
//import Crud from './Crud';
import HttpCommon from '../../lib/HttpCommon';
//
const CrudCreate = {

  /**
   * addItem:
   * @param key: any
   *
   * @return
   */
  addItem : async function() : Promise<any>
  {
    try{
      let ret = false;
      let values = {
        "title": "test_create3",
        "body": "b1"
    }
//      let values = Crud.getInputValues();
//console.log(values);
      const json = await HttpCommon.server_post(values, '/test/create');
console.log(json);
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
      } 
      return ret;
    } catch (e) {
      console.error("Error, addItem");
      console.error(e);
      throw new Error('Error , addItem');
    }
  }, 
  /**
   *
   * @param
   *
   * @return
   */   
  createUser : async function() : Promise<any>
  {
    try{
      let ret = false;
      const url = import.meta.env.PUBLIC_API_URL;
//      item.path = path;
      let values = {
        "name": "a2",
        "email": "a2@example.com",
        "password": "1111",
        "api_key": import.meta.env.PUBLIC_API_KEY,
        path: "/users/create",
    }
    const body: any = JSON.stringify(values);      
console.log(values);
    const res = await fetch("/api/user/create", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},      
      body: body
    });
    if (res.status !== 200) {
      throw new Error(await res.text());
    }
    const json = await res.json()
    //console.log(json);   
console.log(json);
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
      } 
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , createUser');
    }
  },
  /**
   *
   * @param
   *
   * @return
   */   
  login : async function() : Promise<any>
  {
    try{
      let ret = false;
      const url = import.meta.env.PUBLIC_API_URL;
      let values = {
        "name": "a1",
        "email": "a1@example.com",
        "password": "1111",
        "api_key": import.meta.env.PUBLIC_API_KEY,
        path: "/users/get",
    }
    const body: any = JSON.stringify(values);      
console.log(values);
    const res = await fetch("/api/user/login", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},      
      body: body
    });
    if (res.status !== 200) {
      throw new Error(await res.text());
    }
    const json = await res.json()
    //console.log(json);   
console.log(json);
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
      } 
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , login');
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
      const button: any = document.querySelector('#btn_save');
      const btnLogin: any = document.querySelector('#btn_login');
      //btn_login
      button.addEventListener('click', async () => {
        const result = await this.createUser();
        console.log("result=", result);
        if(result === true) {
          alert("OK, add");
//          window.location.href = '/';
        }
      }); 
      btnLogin.addEventListener('click', async () => {
        const result = await this.login();
        console.log("result=", result);
        if(result === true) {
          alert("OK, Login");
//          window.location.href = '/';
        }else {
          alert("Error, login");
        }
      });       
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
CrudCreate.startProc();

export default CrudCreate;
