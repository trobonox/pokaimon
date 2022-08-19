export interface CharacterInfoTable {
  id: number;
  name: string;
  description: string;

  region: string;
  element: string;

  /** Default health for this character. */
  base_health: number;

  // Actions' ID from `character_actions` table.
  action_1: number;
  action_2: number;
  action_3: number;
  action_4: number;
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
  description?: string;

  enemy_min_damage: number;
  enemy_max_damage: number;
  enemy_hit_chance: number;

  self_min_damage: number;
  self_max_damage: number;
  self_hit_chance: number;
}

export interface GamesTable {
  id: number;
  region: string;

  player1: string | null;
  player2: string | null;

  player1_card: number;
  player2_card: number;

  turn: 1 | 2;
  created_at: string;
}

export interface UsersTable {
  selected_character: number | null;
  primos: number;
  xp: number;
  id: string;
  username: string | null;
  starter_traveller: string | null;
}
