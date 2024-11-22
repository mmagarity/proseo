import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYyMjY2NDAwMCwiZXhwIjoxOTM4MDI0MDAwLCJhdWQiOiIiLCJzdWIiOiIiLCJyb2xlIjoiYW5vbiJ9.ZDdoJ8uCuzQaJ3s9NhNmG4CJV8bK1k-0hKVVFvJKnVc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);