// supabase.js  (in the root of your Snack)

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fbrxumdueqqhjuulupnn.supabase.co";           // ← Paste your Project URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicnh1bWR1ZXFxaGp1dWx1cG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MDUzOTgsImV4cCI6MjA5MTE4MTM5OH0.CRnwzeiICIfG4jeVC5KSo8Q9oiLvKoRKA25s5Vjg9-U";          // ← Paste your anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

console.log("✅ New Supabase connected successfully");