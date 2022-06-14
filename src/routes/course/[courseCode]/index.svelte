<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const { courseCode } = params;

		const resCourse = await fetch(`/course/${courseCode}.json`);
		const resTasks = await fetch(`/course/getTasks.json?courseCode=${courseCode}`);

		if (resTasks.ok && resCourse.ok) {
			return {
				status: 200,
				props: {
					course: await resCourse.json(),
					tasks: await resTasks.json(),
				},
			};
		}

		return {
			status: resTasks.status,
			error: new Error(`Could not load courseName: ${courseCode}`),
		};
	};
</script>

<script lang="ts">
	import type { course } from '$lib/mongoose/models/courses';
	import { session } from '$app/stores';
	import Modal from 'svelte-simple-modal';
	import CreateTask from '$lib/CreateTask/CreateTask.svelte';
	import type { task } from '$lib/mongoose/models/task';
	import { locale, t, tdb } from '$lib/helpers/i18n';

	export let course: course;
	export let tasks: task[];
</script>

<svelte:head>
	<title>{tdb($locale, 'title', course)}</title>
</svelte:head>

<div class="w-full flex flex-col gap-4">
	{#if course}
		<div class="p-8 bg-slate-400/30 rounded-lg shadow-lg flex items-center gap-8 justify-between">
			<span>
				<h2 class="text-3xl">{tdb($locale, 'title', course)}</h2>
				<h2 class="text-md">
					{$t('course.teacher')} -
					<a class="underline hover:text-blue-600" href="/profile/{course.creater}">{course.creater}</a>
				</h2>
			</span>
			{#if $session.userName === course.creater}
				<Modal>
					<CreateTask courseCode={course.courseCode} />
				</Modal>
			{/if}
		</div>
		<div class="p-8 bg-slate-400/30 rounded-lg shadow-lg flex items-center gap-8">
			<div class="flex flex-col">
				<span class="pb-4 text-xl">{$t('course.tasks')}</span>
				{#if tasks.length == 0}
					<span>{$t('course.noTasks')}</span>
				{:else}
					{#each tasks as task}
						<a href="/course/{course.courseCode}/{task.taskCode}" class="underline hover:text-blue-600">
							{tdb($locale, 'title', task)}
						</a>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</div>
