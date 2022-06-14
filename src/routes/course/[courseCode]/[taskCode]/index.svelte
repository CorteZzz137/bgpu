<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const { courseCode, taskCode } = params;

		const res = await fetch(`/course/${courseCode}/${taskCode}.json`);

		if (res.ok) {
			return {
				status: 200,
				props: {
					task: await res.json(),
					courseCode,
					taskCode,
				},
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load courseName: ${courseCode}`),
		};
	};
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import type { task } from '$lib/mongoose/models/task';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { roles } from '$lib/mongoose/models/users';
	import { locale, t, tdb } from '$lib/helpers/i18n';

	let text: string;
	let url: string;
	let edit: boolean = false;
	export let task: task;
	export let taskCode: string;
	export let courseCode: string;

	onMount(() => {
		// ownAnswer = task.answers.find((element) => {
		// 	return element.userName === $session.userName;
		// });
	});

	async function taskUrl() {
		const res = await fetch(`/course/${courseCode}/${taskCode}/taskUrl.json`, {
			method: 'POST',
			body: JSON.stringify({
				url,
				text,
			}),
		});
		if (res.ok) {
			location.reload();
		}
	}

	async function answerUrl() {
		const res = await fetch(`/course/${courseCode}/${taskCode}/answerUrl.json`, {
			method: 'POST',
			body: JSON.stringify({
				userName: $session.userName,
				url,
				text,
			}),
		});
		if (res.ok) {
			location.reload();
		}
	}

	function pressEnter(e: KeyboardEvent) {
		if (e.key == 'Enter') {
			answerUrl();
		}
	}
</script>

<div class="w-full flex flex-col gap-4">
	{#if task}
		<div class="p-8 bg-slate-400/30 rounded-lg shadow-lg flex items-center gap-8 justify-between">
			<div>
				<span>
					<h2 class="text-3xl">{tdb($locale, 'title', task)}</h2>
				</span>
				<span>{tdb($locale, 'decription', task)}</span>
			</div>
			{#if $session.userName === task.creater}
				<button
					class="py-2 px-2 bg-slate-300 rounded shadow hover:bg-slate-200 transition-colors flex gap-1"
					on:click={() => {
						edit = !edit;
					}}>{!edit ? $t('task.editButtonNotActive') : $t('task.editButtonActive')}</button
				>
			{/if}
		</div>
		<div class="p-8 bg-slate-400/30 rounded-lg shadow-lg flex flex-col gap-4">
			<span>{$t('task.taskFile')}</span>
			<div class="flex items-center gap-8">
				{#if task.taskFile && (!edit || $session.userName !== task.creater)}
					<a href={task.taskFile.url} target="_blank" class="text-blue-700 underline flex items-center gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							aria-hidden="true"
							role="img"
							class="w-4 h-4"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
							/></svg
						>{task.taskFile.name}
					</a>
				{:else if $session.userName === task.creater && (edit || !task.taskFile)}
					<div class="flex flex-col gap-2 items-end">
						<div class="flex gap-2">
							<span class="">{$t('task.addTaskFileTitle')} - </span>
							<input type="text" bind:value={text} />
						</div>
						<div class="flex gap-2">
							<span class="">{$t('task.addTaskFileUrl')} - </span>
							<input type="url" bind:value={url} />
						</div>
					</div>
					<button class="py-2 px-2 bg-slate-300 rounded shadow hover:bg-slate-200 transition-colors flex gap-1" on:click={taskUrl}
						>{$t('task.addTaskButton')}</button
					>
				{/if}
			</div>
		</div>
		<div class="p-8 bg-slate-400/30 rounded-lg shadow-lg flex flex-col gap-4">
			{#if $session.userName === task.creater || $session.role === roles.ADMIN}
				<div class="flex flex-col">{$t('task.answers')}</div>
				<div class="flex flex-col">
					{#if task.answers.length > 0}
						{#each task.answers as answer}
							<span class="flex gap-4">
								<a href="/profile/{answer.userName}" class="text-blue-700 underline">
									{answer.userName}
								</a>
								-
								<a href={answer.url} target="_blank" class="text-blue-700 underline flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										aria-hidden="true"
										role="img"
										class="w-4 h-4"
										preserveAspectRatio="xMidYMid meet"
										viewBox="0 0 24 24"
									>
										<path
											fill="currentColor"
											d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
										/>
									</svg>
									{answer.name}
								</a>
							</span>
						{/each}
					{:else}
						<span class="pl-4 text-sm">{$t('task.noAnswers')}</span>
					{/if}
				</div>
			{:else}
				<div class="flex justify-between">
					{#if task.answers[0] != undefined && !edit}
						<div class="w-full flex justify-between">
							<span class="flex gap-4">
								<a href={task.answers[0].url} target="_blank" class="text-blue-700 underline flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										aria-hidden="true"
										role="img"
										class="w-4 h-4"
										preserveAspectRatio="xMidYMid meet"
										viewBox="0 0 24 24"
									>
										<path
											fill="currentColor"
											d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
										/>
									</svg>
									{task.answers[0].name}
								</a>
							</span>
						</div>
					{:else}
						<div class="flex gap-2 items-center">
							<div class="flex flex-col gap-2 items-end">
								<div class="flex gap-2">
									<span class="">{$t('task.addTaskFileTitle')} - </span>
									<input on:keydown={pressEnter} type="text" bind:value={text} />
								</div>
								<div class="flex gap-2">
									<span class="">{$t('task.addTaskFileUrl')} - </span>
									<input on:keydown={pressEnter} type="url" bind:value={url} />
								</div>
							</div>
							<button
								class="py-2 px-2 bg-slate-300 rounded shadow hover:bg-slate-200 transition-colors flex gap-1 h-min"
								on:click={answerUrl}>{$t('task.addTaskButton')}</button
							>
						</div>
					{/if}

					<button
						class="py-2 px-2 bg-slate-300 rounded shadow hover:bg-slate-200 transition-colors flex gap-1 h-min items-center"
						on:click={() => {
							edit = !edit;
						}}>{!edit ? $t('task.editButtonNotActive') : $t('task.editButtonActive')}</button
					>
				</div>
			{/if}
		</div>
	{/if}
</div>
