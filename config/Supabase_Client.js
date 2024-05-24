import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gspoqrnqmrsbmnzklgzl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcG9xcm5xbXJzYm1uemtsZ3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1ODIzNjcsImV4cCI6MjAzMjE1ODM2N30.K35Eq8dSG74zg4ItH3g-_1Q8J39LQcCITesjc3988gs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
