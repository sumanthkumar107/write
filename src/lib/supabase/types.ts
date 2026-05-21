export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      thoughts: {
        Row: {
          id: string;
          user_id: string | null;
          content: string;
          language: string;
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          content: string;
          language?: string;
          likes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          content?: string;
          language?: string;
          likes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string | null;
          thought_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          thought_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          thought_id?: string;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          anonymous_id: string | null;
          display_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          anonymous_id?: string | null;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          anonymous_id?: string | null;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}