<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/helpers/i18n';

	export let courseCode: string;

	let titleRu: string;
	let titleEn: string;
	let decriptionRu: string;
	let decriptionEn: string;

	const createTask = async () => {
		const res = await fetch('/course/createTask.json', {
			method: 'POST',
			body: JSON.stringify({
				titleEn,
				titleRu,
				decriptionRu,
				decriptionEn,
				courseCode,
			}),
		});

		if (res.ok) {
			location.reload();
		}
	};
</script>

<div class="flex flex-col w-full gap-4 items-center">
	<div class="flex flex-col gap-2 items-end">
		<span class="flex gap-2">
			{$t('course.addTaskButton.title')} (ru) -
			<div class="shadow max-w-min">
				<input type="text" bind:value={titleRu} />
			</div>
		</span>
		<span class="flex gap-2">
			{$t('course.addTaskButton.decription')} (ru) -
			<div class="shadow max-w-min">
				<input type="text" bind:value={decriptionRu} />
			</div>
		</span>
	</div>
	<div class="flex flex-col gap-2 items-end">
		<span class="flex gap-2">
			{$t('course.addTaskButton.title')} (en) -
			<div class="shadow max-w-min">
				<input type="text" bind:value={titleEn} />
			</div>
		</span>
		<span class="flex gap-2">
			{$t('course.addTaskButton.decription')} (en) -
			<div class="shadow max-w-min">
				<input type="text" bind:value={decriptionEn} />
			</div>
		</span>
	</div>

	<button on:click={createTask}>
		{$t('course.addTaskButton.createButton')}
	</button>
</div>
