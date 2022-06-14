<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/course/getCourses.json');

		if (res.ok) {
			return {
				status: 200,
				props: {
					courses: await res.json(),
				},
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load courses`),
		};
	};
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import type { course } from '$lib/mongoose/models/courses';
	import { locale, t, tdb } from '$lib/helpers/i18n';

	export let courses: course[];
</script>

<svelte:head>
	<title>{$session.name} - {$t('profile')}</title>
</svelte:head>

<div class="w-full flex flex-col gap-4">
	<div class="p-8 bg-slate-400/30 rounded-lg shadow-lg flex items-center gap-8">
		<img src="/avatarBig.png" alt="avatar" class="rounded-full shadow" />
		<span>
			<h2 class="text-3xl">{$session.name}</h2>
			<a href="mailto:{$session.email}" class="underline hover:text-blue-600">{$session.email}</a>
		</span>
	</div>
	<div class="p-8 bg-slate-400/30 rounded-lg flex flex-col justify-center gap-4 shadow-lg">
		<span class="text-xl">{$t('profile.courses')}</span>
		<div class="px-2 flex flex-col">
			{#each courses as course}
				<a href="/course/{course.courseCode}" class="underline hover:text-blue-600 w-min whitespace-nowrap">
					{tdb($locale, 'title', course)}
				</a>
			{/each}
		</div>
	</div>
</div>
