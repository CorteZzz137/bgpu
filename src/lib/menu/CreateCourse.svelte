<script lang="ts">
	import { t } from '$lib/helpers/i18n';

	import { getContext } from 'svelte';
	import Popup from './Popup.svelte';
	const { open } = getContext('simple-modal');
	const showSurprise = () => open(Popup);
</script>

<button
	on:click={showSurprise}
	class="py-2 border-b border-slate-500/40 pl-5 pr-4 hover:bg-slate-200 transition-all flex items-center gap-4"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
	</svg>
	{$t('menu.createCourse')}
</button>
