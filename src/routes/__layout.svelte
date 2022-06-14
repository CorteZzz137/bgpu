<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/course/getCourses.json');

		if (res.ok) {
			return {
				status: 200,
				props: {
					courses: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load courses`)
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/footer/Footer.svelte';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import type { course } from '$lib/mongoose/models/courses';
	import Menu from '$lib/menu/Menu.svelte';

	export let courses: course[];
</script>

{#if $page.url.pathname === '/login' || $page.url.pathname === '/register'}
	<main>
		<slot />
	</main>
{:else}
	<Header />
	<main>
		<Menu {courses} />
		<slot />
	</main>
	<Footer />
{/if}

<style lang="postcss">
	main {
		@apply flex flex-[1] flex-row w-full max-w-7xl mx-auto box-border py-4 gap-4;
	}
</style>
