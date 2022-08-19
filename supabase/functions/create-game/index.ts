import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabase } from "../_shared/supabaseClient.ts";
import { corsHeaders } from "../_shared/cors.ts";

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { player1, player2, region } = await req.json();
    const selected_region = region || "mondstadt";

    /** Used when one of the players is a bot. */
    let region_characters: {
      id: number;
      region: string;
      base_health: number;
    }[] = [];

    /** When there's a bot, get available characters for the region. */
    if (!player1 || !player2) {
      const { data: characters, error } = await supabase
        .from("character_info")
        .select()
        .match({ region: selected_region })
        .select();

      if (error) {
        return new Response(JSON.stringify({ success: false, error }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        });
      }

      // Store them for later use.
      region_characters = characters;
    }

    /** Filled when we fetch the users. */
    let player1_card, player2_card;
    let player1_hp, player2_hp;

    // Check and fetch data for `player1`.
    if (player1) {
      const { data, error } = await supabase
        .from("users")
        .select(`id, selected_character(id, health)`)
        .match({ id: player1 })
        .single();

      if (!data || error) {
        return new Response(JSON.stringify({ success: false, error }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        });
      }

      const character = data.selected_character as {
        id: number;
        health: number;
      };

      player1_card = character.id;
      player1_hp = character.health;
    } else {
      const random_index = Math.floor(Math.random() * region_characters.length);
      /** When the user is a bot, give a random `character_info` ID. */
      player1_card = region_characters[random_index].id;
      player1_hp = region_characters[random_index].base_health;
    }

    // Check and fetch data for `player2`.
    if (player2) {
      const { data, error } = await supabase
        .from("users")
        .select(`id, selected_character(id, health)`)
        .match({ id: player2 })
        .single();

      if (!data || error) {
        return new Response(JSON.stringify({ success: false, error }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        });
      }

      const character = data.selected_character as {
        id: number;
        health: number;
      };

      player2_card = character.id;
      player2_hp = character.health;
    } else {
      const random_index = Math.floor(Math.random() * region_characters.length);
      /** When the user is a bot, give a random `character_info` ID. */
      player2_card = region_characters[random_index].id;
      player2_hp = region_characters[random_index].base_health;
    }

    const rewards = {
      user_xp: randomBetween(50, 150),
      card_xp: randomBetween(20, 80),
      primos: randomBetween(10, 100),
    };

    const { data: game, error } = await supabase
      .from("games")
      .insert([
        {
          player1,
          player1_card,
          player1_hp,
          player2,
          player2_card,
          player2_hp,
          rewards,
        },
      ])
      .select();

    if (error) {
      return new Response(JSON.stringify({ success: false, error }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, data: game }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
});
