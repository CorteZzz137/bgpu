<script lang="ts">
	import { t } from '$lib/helpers/i18n';

	import { getContext } from 'svelte';
	import Popup from './Popup.svelte';
	const { open } = getContext('simple-modal');
	const showSurprise = () => open(Popup, { courseCode });

	export let courseCode: string;
</script>

<button on:click={showSurprise} class="py-2 pr-4 pl-2 bg-slate-300 rounded shadow hover:bg-slate-200 transition-colors flex gap-1">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
	</svg>
	{$t('course.addTaskButton')}
</button>
