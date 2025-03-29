export interface Prompt {
  id: number;
  title: string;
  description: string;
  prompt: string;
  ai_type: string;
  specific_tool: string | null;
  tags: string[];
  user_id: string;
  upvotes: number;
  copy_count: number;
  is_top_pick: boolean;
  created_at: string;
  is_favorited: boolean;
  slug: string;
}

export interface Profile {
  id: string;
  display_name: string;
  updated_at: string;
}

export interface Favorite {
  id: number;
  user_id: string;
  prompt_id: number;
  created_at: string;
}
