import { createClient } from "@supabase/supabase-js";
import "dotenv/config"

if(process.env.NODE_ENV=="development"){
  
}
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
