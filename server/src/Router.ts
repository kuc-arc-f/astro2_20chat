import testRouter from './routes/test';
import todoRouter from './routes/todo';
import userRouter from './routes/user';
import chatRouter from './routes/chat';
import chatPostRouter from './routes/chat_post';
import threadRouter from './routes/thread';
//
const Router = {
  /**
  * route
  * @param
  *
  * @return
  */  
  route: async function (pathname: string, req: any, res: any, env: any): Promise<Response>
  {
    let response;
    /* test */
    if (pathname === "/test2") {
      response = await testRouter.test2(req, res, env);
    }
    if (pathname === "/test3") {
      response = await testRouter.test3(req, res, env);
    }
    if (pathname === "/test/create") {
      response = await testRouter.create(req, res, env);  
    }
    if (pathname === "/test/get") {
      response = await testRouter.get(req, res, env);  
    }
    if (pathname === "/test/get_list") {
      response = await testRouter.get_list(req, res, env);  
    }
    if (pathname === "/test/delete") {
      response = await testRouter.delete(req, res, env);  
    }
    if (pathname === "/test/update") {
      response = await testRouter.update(req, res, env);  
    }
    //todo
    if (pathname === "/todos/create") {
      response = await todoRouter.create(req, res, env);  
    }
    if (pathname === "/todos/delete") {
      response = await todoRouter.delete(req, res, env);  
    }
    if (pathname === "/todos/update") {
      response = await todoRouter.update(req, res, env);  
    }
    if (pathname === "/todos/get") {
      response = await todoRouter.get(req, res, env);  
    }
    if (pathname === "/todos/get_list") {
      response = await todoRouter.get_list(req, res, env);  
    }
    //user
    if (pathname === "/users/create") {
      response = await userRouter.create(req, res, env);  
    }
    if (pathname === "/users/get") {
      response = await userRouter.get(req, res, env);  
    }
    //chats
    if (pathname === "/chats/create") {
      response = await chatRouter.create(req, res, env);  
    }
    if (pathname === "/chats/get_list") {
      response = await chatRouter.get_list(req, res, env);  
    }
    if (pathname === "/chats/get") {
      response = await chatRouter.get(req, res, env);  
    }
    if (pathname === "/chats/update") {
      response = await chatRouter.update(req, res, env);  
    }
    if (pathname === "/chats/delete") {
      response = await chatRouter.delete(req, res, env);  
    }
    if (pathname === "/chat_posts/create") {
      response = await chatPostRouter.create(req, res, env);  
    }
    if (pathname === "/chat_posts/get") {
      response = await chatPostRouter.get(req, res, env);  
    }   
    if (pathname === "/chat_posts/get_list") {
      response = await chatPostRouter.get_list(req, res, env);  
    }        
    if (pathname === "/chat_posts/delete") {
      response = await chatPostRouter.delete(req, res, env);  
    }        
    if (pathname === "/chat_posts/get_last_time") {
      response = await chatPostRouter.get_last_time(req, res, env);  
    }  
    if (pathname === "/chat_posts/search") {
      response = await chatPostRouter.search(req, res, env);  
    }        
    //threads
    if (pathname === "/threads/create") {
      response = await threadRouter.create(req, res, env);  
    }
    if (pathname === "/threads/get_list") {
      response = await threadRouter.get_list(req, res, env);  
    }
    if (pathname === "/threads/get") {
      response = await threadRouter.get(req, res, env);  
    }
    if (pathname === "/threads/delete") {
      response = await threadRouter.delete(req, res, env);  
    }
    //@ts-ignore
    return response;
  },
}
export default Router;
