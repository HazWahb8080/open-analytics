import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kogolctpaouctfshpokk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZ29sY3RwYW91Y3Rmc2hwb2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNzA4ODEsImV4cCI6MjAyOTc0Njg4MX0.08hZ2-sKPKviVvGplX8Z5LdwPu8-JuP7h_sFyxOF38g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
