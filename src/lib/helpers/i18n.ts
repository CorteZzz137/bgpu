import { derived } from 'svelte/store';
import { writable } from 'svelte-local-storage-store';
import { translations as translationsPages } from './translations';

export const locale = writable('locale', 'ru');

export function translate(locale: string, key: string, translations: any = translationsPages) {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	// We could improve this by using Typescript and/or fallback values.
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	const text = translations[locale][key];

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	// Replace any passed in variables in the translation string.

	return text;
}

export function tdb(locale: string, key: string, translations: any) {
	const text = translations[key][locale];
	return text;
}

export const t = derived(locale, ($locale) => (key: string) => translate($locale, key));
