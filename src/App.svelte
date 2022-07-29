<script lang="ts">
	import {stopTyping} from "./Events/stopTyping";
	import Stats from "./Stats/Stats.svelte";
	import Bootstrap from "./Bootstrap.svelte";

	let contract = '';

	async function loadStats() {
		contract = this.value;
	}
</script>

<Bootstrap />

<main class="container mt-4">
	<h1>NFT Stats</h1>
	<ul class="list-unstyled">
		<li>BAYC: 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D</li>
		<li>MAYC: 0x60e4d786628fea6478f785a6d7e704777c86a7c6</li>
		<li>GFC: 0x3702f4c46785bbd947d59a2516ac1ea30f2babf2</li>
	</ul>
	<input
			id="contract-input"
			class="form-control"
			use:stopTyping
			on:stopTyping={loadStats}
			placeholder="Load by contract"
			type="text"
	/>
	{#if contract !== ''}
	{#key contract}
		<Stats contract="{contract}" />
	{/key}
	{/if}
</main>

<footer class="container mt-auto">
	<p>Created by<a href="https://what-the-commit.com" target="_blank"><img class="ms-2" height="45" src="https://what-the-commit.com/wp-content/uploads/2022/06/robot_light_grey.png" alt="What The Commit" /></a></p>
	<p>Powered by<a href="https://alchemy.com" target="_blank"><img class="ms-2" height="45" src="images/alchemy-mark-white.png" alt="Alchemy" /></a></p>
	<p>Realized with<a href="https://svelte.dev" target="_blank"><img class="ms-2" height="45" src="images/svelte-white.png" alt="Svelte" /></a></p>
</footer>