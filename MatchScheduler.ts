import { ref, update, serverTimestamp } from "firebase/database";
import {db} from './firebaseConfig'
import "dotenv/config";

console.log("Key Value:", process.env.TBA_API_KEY ? "Found it! THIEN persists" : "Still missing... on THIEN's soul im not getting a 401 next run");

const EVENT_KEY = "2025ohmv";
const TBA_URL = `https://www.thebluealliance.com/api/v3/event/${EVENT_KEY}/matches/simple`;
const TBA_API_KEY = process.env.TBA_API_KEY!;

interface TBAMatchSimple {
  key: string;
  comp_level: "qm" | "qf" | "sf" | "f";
  match_number: number;
  set_number: number;
  alliances: {
    red: { team_keys: string[] };
    blue: { team_keys: string[] };
  };
  time: number | null;
  predicted_time: number | null;
  actual_time: number | null;
}

async function importBlueAllianceMatches() {
  const response = await fetch(TBA_URL, {
    headers: {
      "X-TBA-Auth-Key": TBA_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`TBA request failed, THIEN is getting slimed out: ${response.status}`);
  }

  const matches: TBAMatchSimple[] = await response.json();

  const updates: Record<string, unknown> = {};

  for (const match of matches) {
    const matchNumber = match.match_number;
    const matchLevel = match.comp_level;
    updates[`${EVENT_KEY}/schedule/${matchNumber}`] = {
      red: match.alliances.red.team_keys.map(t =>
        Number(t.replace("frc", ""))
      ),
      blue: match.alliances.blue.team_keys.map(t =>
        Number(t.replace("frc", ""))
      ),
      complvl: match.comp_level
    };
  }

  await update(ref(db), updates);
  console.log(`Imported ${matches.length} matches, THIEN lives another day`);
}

importBlueAllianceMatches().catch(console.error);
