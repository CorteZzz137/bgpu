<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { t, locale } from '$lib/helpers/i18n';

	let russian = $locale == 'en' ? false : true;

	$: if (russian) locale.set('ru');
	else locale.set('en');
</script>

<header>
	<div class="h-16 bg-slate-800 w-full">
		<div class="max-w-7xl mx-auto h-full flex items-center gap-4 relative">
			<!-- <button
				on:click={() => {
					menu = !menu;
				}}
				class="bg-gray-300 hover:bg-gray-200 text-gray-800 flex items-center shadow border border-gray-500/30 px-3 hover:shadow-xl transition-all rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd" />
				</svg>
			</button> -->
			<button
				on:click={() => goto('/')}
				class="hover:bg-slate-600/50 text-gray-200 gap-2 px-4 py-1 flex items-center transition-all rounded-md"
			>
				<div class="p-2.5 rounded-full overflow-hidden bg-slate-300">
					<img src="/logo.svg" alt="logo" class="h-full w-8 translate-x-0.5" />
				</div>
				<span class="text-xl">{$t('header.homeButton')}</span>
			</button>
			<button
				on:click={() => {
					russian = !russian;
				}}
				title={$t('header.langTitle')}
				class="bg-slate-300 py-1 hover:bg-slate-200 text-gray-800 gap-2 flex items-center shadow border border-slate-500/30 px-3 transition-all rounded-md"
			>
				{$t('header.lang')}
			</button>
			{#if $session.userName != undefined}
				<a
					href="/profile/{$session.userName}"
					class="flex ml-auto bg-slate-300 hover:bg-slate-200 px-3 py-1 transition-all rounded-md shadow items-center gap-3"
				>
					{$session.name}
					<img src="/avatar.png" alt="avatar" class="rounded-full shadow" />
				</a>
				<a
					href="/logout"
					class="bg-slate-300 p-2 rounded-full shadow text-gray-700 hover:bg-slate-200 transition-colors"
					title={$t('header.logout.title')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
				</a>
			{:else}
				<a
					href="/login"
					class="bg-slate-300 ml-auto p-2 rounded-full shadow text-gray-700 hover:bg-slate-200 transition-colors"
					title={$t('header.login.title')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
						/>
					</svg>
				</a>
			{/if}
		</div>
	</div>
</header>

<style lang="postcss">
</style>
