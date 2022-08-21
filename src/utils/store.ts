import { reactive } from "vue";

import type { Session } from "@supabase/gotrue-js";
import type {
  UsersTable,
  CharacterInventoryTable,
  CharacterInfoTable,
} from "@/types/Database";

interface GlobalStore {
  user_session: Session["user"] | null;
  user_data: UsersTable | null;
  user_inventory:
    | (Omit<CharacterInventoryTable, "base_character"> & {
        base_character: CharacterInfoTable;
      })[]
    | null;
}

export const store = reactive<GlobalStore>({
  user_session: null,
  user_data: null,
  user_inventory: null,
});
