import type {
  CharacterInventoryTable,
  CharacterActionsTable,
  CharacterInfoTable,
  GamesTable,
  UsersTable,
} from "@/types/Database";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get the `maps` bucket URL.
 * The `.replace` method is used to remove the URL - if there is - trailing slash.
 */
export const storedMapsUrl = (map_name: "teyvat") =>
  supabaseUrl.replace(/\/$/, "") + `/storage/v1/object/public/maps/${map_name}`;

/**
 * Helper typed function to get full nested data
 * of a `character_inventory` item matching its ID.
 */
export const getFromInventoryCharacter = async (id: number) => {
  const getData = () =>
    supabase
      .from("character_inventory")
      .select(
        `
      id, xp, health, created_at, owner,
      base_character(
        id, region, description,
        name, element,
        base_health,
        action_1(*),
        action_2(*),
        action_3(*),
        action_4(*)
      )
    `
      )
      .match({ id })
      .single();

  type Response = Awaited<ReturnType<typeof getData>>;
  type ResponseSuccess = Omit<CharacterInventoryTable, "base_character"> & {
    base_character: Omit<
      CharacterInfoTable,
      "action_1" | "action_2" | "action_3" | "action_4"
    > & {
      action_1: CharacterActionsTable;
      action_2: CharacterActionsTable;
      action_3: CharacterActionsTable;
      action_4: CharacterActionsTable;
    };
  };

  const response = (await getData()) as {
    error: Response["error"];
    data: ResponseSuccess;
  };

  return response;
};

export const getCharacterInfo = async (id: number) => {
  const getData = () =>
    supabase
      .from("character_info")
      .select(
        `
          *,
          action_1(*),
          action_2(*),
          action_3(*),
          action_4(*)
        `
      )
      .match({ id })
      .single();

  type Response = Awaited<ReturnType<typeof getData>>;
  type ResponseSuccess = Omit<
    CharacterInfoTable,
    "action_1" | "action_2" | "action_3" | "action_4"
  > & {
    action_1: CharacterActionsTable;
    action_2: CharacterActionsTable;
    action_3: CharacterActionsTable;
    action_4: CharacterActionsTable;
  };

  const response = (await getData()) as {
    error: Response["error"];
    data: ResponseSuccess;
  };

  return response;
};

/** Helper typed function to get a game from `games` table. */
export const getGame = async (id: number) => {
  const getData = () => supabase.from("games").select().match({ id }).single();

  type Response = Awaited<ReturnType<typeof getData>>;
  type ResponseSuccess = GamesTable;

  const response = (await getData()) as {
    error: Response["error"];
    data: ResponseSuccess;
  };

  return response;
};

// export const getAvailableGames = async () => {
//   const getData = () =>
//     supabase
//       .from("games")
//       .select()
//       .match({ available: true, hidden: false })
//       .select(
//         `
//           id,
//           region,
//           player1(
//             username,
//             selected_character(
//               health,
//               base_character(
//                 name,
//                 element
//               )
//             )
//           )
//         `
//       );

//   type Response = Awaited<ReturnType<typeof getData>>;
//   type ResponseSuccess = (Omit<GamesTable, "player1"> & {
//     player1: Omit<UsersTable, "selected_character"> & {
//       selected_character: Omit<CharacterInventoryTable, "base_character"> & {
//         base_character: {
//           name: string;
//           element: string;
//         };
//       };
//     };
//   })[];

//   const response = (await getData()) as {
//     error: Response["error"];
//     data: ResponseSuccess;
//   };

//   return response;
// };

export const getFullUser = async (uid: string, matchWithUsername = false) => {
  const getData = () =>
    supabase
      .from("users")
      .select(
        `
          *,
          selected_character(
            *,
            base_character(
              *
            )
          )
        `
      )
      .match(matchWithUsername ? { username: uid } : { id: uid })
      .single();

  type Response = Awaited<ReturnType<typeof getData>>;
  type ResponseSuccess = Omit<UsersTable, "selected_character"> & {
    selected_character: Omit<CharacterInventoryTable, "base_character"> & {
      base_character: CharacterInfoTable;
    };
  };

  const response = (await getData()) as {
    error: Response["error"];
    data: ResponseSuccess;
  };

  return response;
};
