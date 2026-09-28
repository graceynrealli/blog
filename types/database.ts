// Generated from the Supabase schema (public). Regenerate after migrations:
//   npx supabase gen types typescript --project-id <ref> --schema public > types/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type PostLevel = "beginner" | "intermediate" | "advanced";
type PostStatus = "draft" | "review" | "published" | "archived";
type TagStatus = "pending" | "approved";
type UserRole = "reader" | "author" | "editor" | "admin";

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      categories: {
        Row: {
          color: string | null;
          created_at: string;
          description: string | null;
          icon: string | null;
          id: number;
          name: string;
          parent_id: number | null;
          position: number;
          slug: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          description?: string | null;
          icon?: string | null;
          id?: never;
          name: string;
          parent_id?: number | null;
          position?: number;
          slug: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          description?: string | null;
          icon?: string | null;
          id?: never;
          name?: string;
          parent_id?: number | null;
          position?: number;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      post_authors: {
        Row: { position: number; post_id: string; profile_id: string };
        Insert: { position?: number; post_id: string; profile_id: string };
        Update: { position?: number; post_id?: string; profile_id?: string };
        Relationships: [
          {
            foreignKeyName: "post_authors_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_authors_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      post_tags: {
        Row: { post_id: string; tag_id: number };
        Insert: { post_id: string; tag_id: number };
        Update: { post_id?: string; tag_id?: number };
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          category_id: number;
          content_html: string | null;
          content_md: string;
          cover_url: string | null;
          created_at: string;
          created_by: string;
          excerpt: string | null;
          id: string;
          level: PostLevel;
          published_at: string | null;
          reading_minutes: number;
          review_note: string | null;
          search: unknown;
          seo_description: string | null;
          seo_title: string | null;
          series_id: number | null;
          series_position: number | null;
          slug: string;
          status: PostStatus;
          title: string;
          toc: Json;
          updated_at: string;
        };
        Insert: {
          category_id: number;
          content_html?: string | null;
          content_md?: string;
          cover_url?: string | null;
          created_at?: string;
          created_by?: string;
          excerpt?: string | null;
          id?: string;
          level?: PostLevel;
          published_at?: string | null;
          reading_minutes?: number;
          review_note?: string | null;
          search?: unknown;
          seo_description?: string | null;
          seo_title?: string | null;
          series_id?: number | null;
          series_position?: number | null;
          slug: string;
          status?: PostStatus;
          title: string;
          toc?: Json;
          updated_at?: string;
        };
        Update: {
          category_id?: number;
          content_html?: string | null;
          content_md?: string;
          cover_url?: string | null;
          created_at?: string;
          created_by?: string;
          excerpt?: string | null;
          id?: string;
          level?: PostLevel;
          published_at?: string | null;
          reading_minutes?: number;
          review_note?: string | null;
          search?: unknown;
          seo_description?: string | null;
          seo_title?: string | null;
          series_id?: number | null;
          series_position?: number | null;
          slug?: string;
          status?: PostStatus;
          title?: string;
          toc?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_series_id_fkey";
            columns: ["series_id"];
            isOneToOne: false;
            referencedRelation: "series";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          display_name: string;
          github_username: string | null;
          id: string;
          role: UserRole;
          specialty: string | null;
          updated_at: string;
          username: string;
          website_url: string | null;
          x_username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name: string;
          github_username?: string | null;
          id: string;
          role?: UserRole;
          specialty?: string | null;
          updated_at?: string;
          username: string;
          website_url?: string | null;
          x_username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string;
          github_username?: string | null;
          id?: string;
          role?: UserRole;
          specialty?: string | null;
          updated_at?: string;
          username?: string;
          website_url?: string | null;
          x_username?: string | null;
        };
        Relationships: [];
      };
      series: {
        Row: {
          cover_url: string | null;
          created_at: string;
          description: string | null;
          id: number;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          cover_url?: string | null;
          created_at?: string;
          description?: string | null;
          id?: never;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          cover_url?: string | null;
          created_at?: string;
          description?: string | null;
          id?: never;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: number;
          name: string;
          slug: string;
          status: TagStatus;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: never;
          name: string;
          slug: string;
          status?: TagStatus;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: never;
          name?: string;
          slug?: string;
          status?: TagStatus;
        };
        Relationships: [
          {
            foreignKeyName: "tags_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      immutable_unaccent: { Args: { "": string }; Returns: string };
      set_user_role: { Args: { p_role: UserRole; p_user_id: string }; Returns: undefined };
    };
    Enums: {
      post_level: PostLevel;
      post_status: PostStatus;
      tag_status: TagStatus;
      user_role: UserRole;
    };
    CompositeTypes: { [_ in never]: never };
  };
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Update"];
export type Enums<T extends keyof PublicSchema["Enums"]> = PublicSchema["Enums"][T];
