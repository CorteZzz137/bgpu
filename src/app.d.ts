/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		userId?: string;
		name?: string;
		userName?: string;
		email?: string;
		role?: 0 | 1 | 2;
	}

	// interface Platform {}

	interface Session {
		name?: string;
		userName?: string;
		email?: string;
		role?: 0 | 1 | 2;
	}

	// interface Stuff {}
}
