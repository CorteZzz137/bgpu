<script lang="ts">
	import { t } from '$lib/helpers/i18n';
</script>

<svelte:head>
	<title>{$t('home.title')}</title>
</svelte:head>

<div class="w-full flex flex-col gap-4">
	<div class="p-8 bg-slate-400/30 rounded-lg shadow-lg">
		<h2 class="text-3xl">{$t('home.title')}</h2>
	</div>
	<div class="p-8 bg-slate-400/30 rounded-lg flex flex-col justify-center gap-4 shadow-lg">
		<img class="rounded-md" src="/bgpu-photo.jpg" alt="" />
		<span class="text-2xl">{$t('home.announcements')}</span>
		<div class="rounded-md flex flex-col p-5 bg-slate-500/20">{$t('home.noNews')}</div>
	</div>
</div>
