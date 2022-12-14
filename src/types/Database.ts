export type AvailableRegions = "mondstadt" | "liyue" | "inazuma";

export interface CharacterInfoTable {
  id: number;
  name: string;
  description: string;

  region: AvailableRegions;
  element: string;

  /** Default health for this character. */
  base_health: number;

  // Actions' ID from `character_actions` table.
  action_1: number;
  action_2: number;
  action_3: number;
  action_4: number;

  buyable: boolean;
  price: number;
}

export interface CharacterInventoryTable {
  id: number;
  base_character: number;
  health: number;
  xp: number;
  owner: string;
  created_at: string;
}

export interface ArticlesTable {
  id: number;
  /** timestampz */
  created_at: string;
  title: string;
  description?: string;
  author: string;
  content: unknown /** @todo Add interface. */;
}

export interface CharacterActionsTable {
  id: number;
  name: string;
  description: string;

  enemy_min_damage: number;
  enemy_max_damage: number;
  enemy_hit_chance: number;

  self_min_damage: number;
  self_max_damage: number;
  self_hit_chance: number;
}

export interface GamesTable {
  id: number;
  region: AvailableRegions;

  player1: string | null;
  player2: string | null;

  player1_card: number;
  player2_card: number;

  player1_hp: number;
  player2_hp: number;

  /** `1` for `player1`, `2` for `player2`. */
  turn: 1 | 2;
  /** `null` for not finished. `3` for tie. */
  winner: 1 | 2 | 3 | null;
  action_index: number | null;
  created_at: string;

  available: boolean;
  private: boolean;

  rewards: {
    primos: number;
    card_xp: number;
    user_xp: number;

    /** Only when playing against a bot. */
    character_name?: string;
  };
}

export interface UsersTable {
  id: string;
  xp: number;
  primos: number;

  username?: string;
  selected_character?: number;
  starter_traveller?: "aether" | "lumine";

  is_developer: boolean;
  is_ui_designer: boolean;
  is_character_designer: boolean;
  is_artwork_designer: boolean;

  created_at: string;
}
