import { MAX_THOUGHT_LENGTH, SUPPORTED_LANGUAGES, SUPPORTED_LANGUAGES as LANGS } from '@/types';

export const APP_NAME = 'Thoughts';
export const PAGINATION_SIZE = 20;

export { MAX_THOUGHT_LENGTH, LANGS, SUPPORTED_LANGUAGES };

export const VALID_LANGUAGE_CODES = LANGS.map(l => l.code);