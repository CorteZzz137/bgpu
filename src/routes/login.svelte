<script lang="ts">
	import { goto } from '$app/navigation';

	import type { roles } from '$lib/mongoose/models/users';

	let userNameOrEmail: string;
	let passwordLogin: string;

	let name: string;
	let userName: string;
	let passwordRegister: string;
	let passwordConfirm: string;
	let email: string;
	let role: roles;

	async function register() {
		const res = await fetch('/register.json', {
			method: 'POST',
			body: JSON.stringify({
				name,
				userName,
				password: passwordRegister,
				passwordConfirm,
				email,
				role
			})
		});

		if (res.ok) {
			location.replace('/');
		}
	}

	async function login() {
		const res = await fetch('/login.json', {
			method: 'POST',
			body: JSON.stringify({
				userNameOrEmail,
				password: passwordLogin
			})
		});

		if (res.ok) {
			location.replace('/');
		}
	}
</script>

<div
	class="flex gap-8 w-1/3 justify-center h-[60vh] items-center bg-slate-200 rounded-3xl p-10 shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
>
	<form class="flex flex-col w-full gap-2 h-full">
		<span class="text-xl w-full text-center">Регистрация</span>
		<label for="name">Имя пользователя</label>
		<input id="name" type="text" bind:value={name} />
		<label for="userName">Имя аккаунта</label>
		<input id="userName" type="text" bind:value={userName} />
		<label for="email">Почта</label>
		<input id="email" type="text" bind:value={email} />
		<label for="roles">Роль</label>
		<select name="roles" id="roles" bind:value={role}>
			<option value="0">Студент</option>
			<option value="1">Преподаватель</option>
			<option value="2">Администратор</option>
		</select>
		<label for="password">Пароль</label>
		<input id="password" type="password" bind:value={passwordRegister} />
		<label for="passwordConfirm">Подтверждение пароля</label>
		<input id="passwordConfirm" type="password" bind:value={passwordConfirm} />
		<button
			class="py-2 px-2 bg-slate-300 rounded shadow hover:bg-slate-200 transition-colors flex gap-1 h-min justify-center"
			type="button"
			on:click|preventDefault={register}>Зарегестрироваться</button
		>
	</form>
	<div class="h-full border-l border-slate-800/30" />
	<form class="flex flex-col w-full gap-2 h-full">
		<span class="text-xl w-full text-center">Авторизация</span>
		<label for="userNameOrEmail">Имя пользователя или Почта</label>
		<input id="userNameOrEmail" type="text" bind:value={userNameOrEmail} />
		<label for="passwordLogin">Пароль</label>
		<input id="passwordLogin" type="password" bind:value={passwordLogin} />
		<button
			class="py-2 px-2 bg-slate-300 rounded shadow hover:bg-slate-200 transition-colors flex gap-1 h-min justify-center"
			type="button"
			on:click|preventDefault={login}>Авторизироваться</button
		>
	</form>
</div>

<!-- <form class="flex flex-col w-32 gap-2">
	<input type="text" bind:value={userNameOrEmail} />
	<input type="password" bind:value={password} />
	<button type="button" on:click|preventDefault={test}>login</button>
</form> -->
