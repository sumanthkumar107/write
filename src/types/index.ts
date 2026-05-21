export type SupportedLanguage = 
  | 'EN' // English
  | 'HI' // Hindi
  | 'KN' // Kannada
  | 'TA' // Tamil
  | 'TE' // Telugu
  | 'ML' // Malayalam
  | 'BN' // Bengali
  | 'GU' // Gujarati
  | 'MR'; // Marathi

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; name: string }[] = [
  { code: 'EN', name: 'English' },
  { code: 'HI', name: 'Hindi' },
  { code: 'KN', name: 'Kannada' },
  { code: 'TA', name: 'Tamil' },
  { code: 'TE', name: 'Telugu' },
  { code: 'ML', name: 'Malayalam' },
  { code: 'BN', name: 'Bengali' },
  { code: 'GU', name: 'Gujarati' },
  { code: 'MR', name: 'Marathi' },
];

export const MAX_THOUGHT_LENGTH = 300;
export const INITIAL_PAGE_SIZE = 20;

export interface Thought {
  id: string;
  user_id: string | null;
  content: string;
  language: SupportedLanguage;
  likes_count: number;
  created_at: string;
  updated_at: string;
  // Joined fields
  has_liked?: boolean;
}

export interface ThoughtWithUser extends Thought {
  users?: {
    id: string;
    display_name: string | null;
  };
}