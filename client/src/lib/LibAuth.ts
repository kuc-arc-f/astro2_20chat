import LibCookie from './LibCookie';
import LibConfig from './LibConfig';
//
const LibAuth = {
  /**
   * validLogin:
   * @param key: any
   *
   * @return
   */ 
  validLogin: async function(): Promise<any>
  {
    try {
      let ret = false;
      const user = await LibCookie.get_cookie(LibConfig.COOKIE_KEY_AUTH);
console.log(user);
      if(user === null) {
        return ret;
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * getUser:
   * @param
   *
   * @return
   */  
  getUser: async function(): Promise<any>
  {
    try {
      let ret = null;
      const user = await LibCookie.get_cookie(LibConfig.COOKIE_KEY_AUTH);
console.log(user);
      if(user === null) {
        return ret;
      }
      return user;
    } catch (e) {
      console.error(e);
    }
  },
}
export default LibAuth;
