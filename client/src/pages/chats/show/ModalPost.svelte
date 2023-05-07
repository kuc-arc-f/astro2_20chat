<svelte:head>
	<title>Test</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibDbSession from '../../../lib/LibDbSession';
import LibAuth from '../../../lib/LibAuth';
import LibConfig from '../../../lib/LibConfig';
import LibCommon from '../../../lib/LibCommon';
import LibThread from '../../../lib/LibThread';
import ChatPost from '../ChatPost';
import Thread from '../Thread';
//
export let userId: number = 0, post_id: number, post_body: string = "", 
postUserName: string = "", dateStr: string = "", postUserId: number,
chatId: number = 0, threadItems:any[] = [],
parentGetList: any;
//
console.log("#ModalPost.post");
console.log("post_id=", post_id);
/**
* loadProc
* @param
*
* @return
*/   
const loadProc = async function () {
  try {
console.log("#loadProc.id=", post_id);
    const user_id= await LibAuth.getUser();
//console.log(user_id);
    userId = Number(user_id);
    const posts = await LibDbSession.get(LibConfig.SESSION_KEY_CHAT_POST);
    let result = posts.filter(post => post.id === post_id);
    if(result.length > 0) {
      const item = result[0];
      post_body = item.body;
      postUserName = item.user_name;
      postUserId = item.userId;
console.log(item);
console.log("postUserId=", postUserId);
      chatId = item.chatId;
      dateStr = LibCommon.converDatetimeString(item.createdAt);
      //Thread
      await getThread();
    }
  } catch (e) {
    console.error(e);
  }  
}
loadProc();
 /**
  * getThread :
  * @param
  *
  * @return Promise<void>
  */
const getThread = async function () : Promise<void>
{
  try {
    threadItems = await Thread.getItems(post_id);
console.log(threadItems);    
  } catch (e) {
    console.error(e);
    alert("Error, getThread");
  }
}
/**
* createReply :
* @param
*
* @return Promise<void>
*/
const createReply = async function () : Promise<void>
{
  try {
    const body = document.querySelector<HTMLInputElement>('#modal_reply_body');
    const bodyString = body?.value; 
    await Thread.create(post_id, bodyString, chatId, postUserId);
    await getThread();
    //@ts-ignore
    body.value = "";
  } catch (e) {
    console.error(e);
    alert("Error, createReply");
  }
}
/**
* childDeleteItem :
* @param
*
* @return Promise<void>
*/
const childDeleteItem = async function () : Promise<void>
{
  try {
    ////console.log("user.id=", userId);
console.log(post_id);
    await ChatPost.delete(post_id);
    //close
    const btn = document.getElementById("modal_close_button");
    btn?.click();
    await parentGetList(post_id);
  } catch (e) {
    console.error(e);
    alert("Error, childDeleteItem");
  }
}

</script>
<!-- CSS -->
<style>
</style>

<!-- ModalPost -->
<div class="chat_show_modal_body">
    <!-- Modal_body -->
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{postUserName} </h5>
        <span class="text-secondary mx-2">{dateStr}</span>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <p>{@html LibCommon.replaceBrString(post_body)}
        </p>
        <hr />
        ID: {post_id}
        <!-- replay_box -->
        <hr class="my-1" />
        <div class="row">
          <div class="col-sm-9"><textarea class="form-control" id="modal_reply_body" rows={3} />
          </div>
          <div class="col-sm-3">
            <button class="mt-2 btn btn-primary" on:click={() => createReply()} >
              Reply</button>
          </div>
        </div>  
        <!--
        -->
        <!-- thread --> 
        {#each threadItems as item}
        <div>
          <div class="thread_user_name">
            <span class="fs-5">{item.user_name}: </span>{item.createdAt}
          </div>
          
          <p>{@html LibCommon.replaceBrString(item.body)}</p>
          <hr class="my-1" />
        </div>
        {/each}     
    </div>
    <div class="modal-footer">
        {#if (postUserId === userId)}
          <button type="button" class="btn btn-outline-danger" id="modal_post_btn_delete"
          on:click={() => childDeleteItem()}
          >Delete</button>            
        {/if}      
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_close_button"
        >Close</button>
    </div>
    <!-- Modal_body_end -->
</div>

<!-- 
{item.body}
-->