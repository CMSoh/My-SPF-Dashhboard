import { createClient } from '@supabase/supabase-js';

// Accessing Vite environment variables
const envUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const envKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Clean up whitespace and fall back to the project configuration keys if they are undefined or empty strings
const supabaseUrl = (envUrl ? String(envUrl).trim() : '') || 'https://ghngwdvkxhxpxdqwdirv.supabase.co';
const supabaseAnonKey = (envKey ? String(envKey).trim() : '') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdobmd3ZHZreGh4cHhkcXdkaXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MjQ0NTEsImV4cCI6MjA5NTAwMDQ1MX0.6IKtBuDIkIOkauEA2T_KnDsatKatxdEVDEfB8SckS4M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
