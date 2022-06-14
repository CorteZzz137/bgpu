<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/helpers/i18n';

	let titleRu: string;
	let titleEn: string;
</script>

<div class="flex flex-col items-center">
	<span class="flex gap-2">
		{$t('menu.createCourse.title.ru')} -
		<div class="shadow max-w-min">
			<input type="text" bind:value={titleRu} />
		</div>
	</span>
	<span class="flex gap-2">
		{$t('menu.createCourse.title.en')} -
		<div class="shadow max-w-min">
			<input type="text" bind:value={titleEn} />
		</div>
	</span>
	<button
		on:click={async () => {
			const res = await fetch('/course/create.json', {
				method: 'POST',
				body: JSON.stringify({
					titleRu,
					titleEn,
				}),
			});
			if (res.ok) {
				location.reload();
			}
		}}
	>
		{$t('menu.createCourse.createButton')}
	</button>
</div>
