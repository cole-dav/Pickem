import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://aohggynmsqurtpszrgin.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvaGdneW5tc3F1cnRwc3pyZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MDMyMzUsImV4cCI6MjAwOTA3OTIzNX0.wj2GWnQ6vsoph6Vs17GgLuBuuMt2tctCN9r1kIUCST4";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getUserID() {
  return supabase;
}

export async function fetchRivals(userId) {
  const { data, error } = await supabase
    .from('pre_rivals')
    .select('*')
    // .or(`player_a.eq.${userId},player_b.eq.${userId}`);
    .eq("player_a", userId);

  if (error) {
    console.error('Error fetching rivals:', error);
    return [];
  }

  return data;
}


export async function getOwnedPlayers(ownerId) {
  let { data: bankData, error: bankError } = await supabase
    .from("bank")
    .select("sourcePlayer")
    .eq("owner", ownerId);
  if (bankError) {
    console.error(bankError);
    return;
  }
  const sourcePlayerIds = bankData.map((item) => item.sourcePlayer);
  let { data: playerData, error: playerError } = await supabase
    .from("NFLplayers")
    .select("*")
    .in("PID", sourcePlayerIds);

  if (playerError) {
    console.error(playerError);
    return;
  }

  return playerData;
}
export async function getUsers() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("uid, display_name");

    if (error) {
      console.error("Error fetching users:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}


export async function fetchRandomPicks() {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  try {
    const { data, error } = await supabase
      .from("bet_pool")
      .select("id, home_team, away_team")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching picks:", error.message);
      return []; // Return an empty array or handle the error as needed
    } else {
      const shuffledPicks = shuffleArray(data || []);
      const randomPicks = shuffledPicks.slice(0, 3); // Select the first 3 picks
      return randomPicks; // Return the shuffled and sliced picks array
    }
  } catch (error) {
    console.error("Error:", error.message);
    return []; // Return an empty array or handle the error as needed
  }
}


console.log("supabase client initialized client:", supabase);
export default supabase;
