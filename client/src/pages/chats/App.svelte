<script lang="ts">
import CrudIndex from "./CrudIndex";
let items = [];
//
const startProc= async function() {
	items = await CrudIndex.getList();
	console.log(items);
}
startProc();
//
const search = async function() {
	console.log("search");
	items = await CrudIndex.search();
	console.log(items);
}
</script>

<div class="">
	<h1>Chats</h1>
	<a href={`/chats/create`} class="btn btn-primary">Create</a>
	<hr class="my-1" />	
	<div class="col-md-12 pt-2">
		keyword :
		<span class="search_key_wrap">
			<input type="text" size="24" class="mx-2 " name="searchKey" id="searchKey"
			placeholder="Title search Key" />
		</span>
		<button class="btn btn-sm btn-outline-primary" id="search_btn"
		on:click={search} >Search
		</button>				
	</div>
	<hr class="my-1" />
	{#each items as item}
	<div>
		<h3>{item.name}</h3>
		<p>ID : {item.id}
			<a href={`/chats/show/${item.id}`}
			 class="mx-2 btn btn-sm btn-outline-primary">Show
			</a>
		</p>
		<hr />
	</div>
	{/each}	
</div>

<style>
</style>

<!--
<a href={`/gpt4/edit/${item.id}`} class="btn">[ Edit ]
</a>			
-->
