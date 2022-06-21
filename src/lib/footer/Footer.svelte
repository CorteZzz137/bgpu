<script>
	import { t } from '$lib/helpers/i18n';
</script>

<footer class="flex flex-col">
	<p>{$t('footer.email')}: <a href="mailto:zelladaykerr@mail.ru" class="text-blue-800 underline">zelladaykerr@mail.ru</a></p>
	<p>{$t('footer.phone')}: <a href="tel:+79053546748" class="text-blue-800 underline">+7(905)354-67-48</a></p>
</footer>

<style lang="postcss">
	footer {
		@apply flex flex-col justify-center items-center p-10;
	}
</style>
