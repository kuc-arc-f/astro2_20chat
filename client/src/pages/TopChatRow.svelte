<script lang="ts">
import LibCookie from '../lib/LibCookie';
import LibConfig from '../lib/LibConfig';
import Chat from './chats/Chat';

let data: any, chatData: any = {id: 0, name: ""};
let dislplay_last_chat = false;
//
const initPage = async function(): Promise<any>
{
	try {
		const key = LibConfig.COOKIE_KEY_LAST_CHAT;
		const chatId = LibCookie.get_cookie(key);
		if(chatId !== null){
			chatData = await Chat.get(Number(chatId));
console.log(chatData);
			if(chatData.id) {
				console.log("#dislplay_last_chat");
				dislplay_last_chat = true;
			}
		}         
//console.log("chatId", chatId);
	} catch (e) {
		console.error(e);
	}
}
initPage();
</script>

<!-- MarkUp -->
<div>
	<h3>Recent Chat</h3>
	<hr />
	{#if dislplay_last_chat}
	<a class="nav-link active" aria-current="page" href={`/chats/show/${chatData.id}`}>
		<span class="task_title fs-5"><h3 class="py-1">{chatData.name}</h3>
		</span>
		<span>ID: {chatData.id}</span>
		<button class="btn btn-sm btn-outline-primary mx-2">Open
		</button>		
	</a>
	{/if}

</div>
