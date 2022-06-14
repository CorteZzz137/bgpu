<script lang="ts">
	import { session } from '$app/stores';
	import type { course } from '$lib/mongoose/models/courses';
	import { roles } from '$lib/mongoose/models/users';
	import Modal from 'svelte-simple-modal';
	import { slide } from 'svelte/transition';
	import CreateCourse from './CreateCourse.svelte';
	import { t, tdb, locale } from '$lib/helpers/i18n';

	let coursesBool = true;
	export let courses: course[];
</script>

<div class="flex flex-col w-80 bg-slate-400/30 rounded-lg overflow-auto p-1 gap-1 shadow-lg min-h-[50vh]">
	{#if $session.userName != undefined}
		<a
			href="/profile/{$session.userName}"
			class="py-2 text-lg shadow hover:shadow-md rounded-md px-4 hover:bg-slate-200 transition-all text-left flex gap-2 items-center"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			{$t('menu.personalProfile')}
		</a>
	{/if}
	<button
		on:click={() => {
			coursesBool = !coursesBool;
		}}
		class="py-2 text-lg rounded-md shadow hover:shadow-md px-4 hover:bg-slate-200 transition-all text-left flex gap-2 items-center"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			class="w-5 h-5"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66l-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19a2.04 2.04 0 0 0-1.92 0z"
			/></svg
		>
		{$t('menu.allCourses')}
	</button>
	{#if coursesBool}
		<div class="flex flex-col" transition:slide|local>
			{#each courses as course}
				<a
					href="/course/{course.courseCode}"
					class="py-1 border-b border-slate-500/40 pl-6 pr-4 hover:bg-slate-200 transition-all flex items-center gap-4"
				>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66l-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19a2.04 2.04 0 0 0-1.92 0z"
							/>
						</svg>
					</div>
					<span>{tdb($locale, 'title', course)}</span>
				</a>
			{/each}
			{#if $session.userName && $session.role != roles.STUDENT}
				<Modal>
					<CreateCourse />
				</Modal>
			{/if}
		</div>
	{/if}
</div>
