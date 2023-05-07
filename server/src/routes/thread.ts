//
const router = {
  /**
  * create
  * @param
  *
  * @return
  */
  create: async function (req: any, res: any, env: any): Promise<Response>
  {
//console.log("/threads/create");
console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        INSERT INTO Thread ( title, body, chatId, chatPostId, userId)
        VALUES('${req.title}', '${req.body}', ${req.chatId},
         ${req.chatPostId}, ${req.userId});
        `;
console.log(sql);
        const resulte = await env.DB.prepare(sql).run();
//console.log(resulte);
        if(resulte.success !== true) {
          console.error("Error, /create");
          throw new Error('Error , create');
        }
        //id
        const sql_id = "SELECT last_insert_rowid() AS id;";
        const resultId = await env.DB.prepare(sql_id).all();
//console.log(resultId);
        if(resultId.results.length < 1) {
          console.error("Error, resultId.length < 1");
          throw new Error('Error , create, SELECT last_insert_rowid');
        }
        const item_id = resultId.results[0].id;
console.log("item_id=", item_id);
        req.id = item_id;
      }            
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  delete: async function (req: any, res: any, env: any): Promise<Response>
  {
console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        DELETE FROM Thread WHERE id = ${req.id}
        `;
console.log(sql);
        const resulte = await env.DB.prepare(sql).run();
//console.log(resulte);
        if(resulte.success !== true) {
          console.error("Error, delete");
          throw new Error('Error , delete');
        }      
      }
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },
  /**
  *
  * @param
  *
  * @return
  */ 
  update: async function (req: any, res: any, env: any): Promise<Response>
  {
  },
  /**
  *
  * @param
  *
  * @return
  */
  get: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log(req);
    let item = {};
    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        SELECT * FROM Thread
        WHERE id = ${req.id}
        `;        
        result = await env.DB.prepare(sql).all();
//console.log(result.results);
        if(result.results.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }
        item = result.results[0];
      }      
      return Response.json({ret: "OK", data: item});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  get_list: async function (req: any, res: any, env: any): Promise<Response>
  {
console.log(req);
    let resulte: any = [];
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      let result: any = {};  
      if (req) {
        const sql = `
        SELECT 
        "Thread".id as thread_id
        ,"Thread"."chatId"
        ,"Thread"."userId"
        ,"Thread".title
        ,"Thread".body
        ,"Thread"."createdAt"
        ,"Thread"."updatedAt"
        ,"User".name as user_name
        FROM Thread
        LEFT OUTER JOIN "User" ON
        ("User".id = "Thread"."userId")
        WHERE "Thread"."chatPostId" = ${req.chatPostId}
        ORDER BY Thread.id DESC
        `;  
        resulte = await env.DB.prepare(sql).all();
        //console.log(resulte);
        if(resulte.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }              
      }           
      return Response.json({ret: "OK", data: resulte.results});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },   
}
export default router;
