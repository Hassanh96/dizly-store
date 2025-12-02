import { createClient } from '@supabase/supabase-js';

// استخدام علامة التعجب (!) لإخبار البرنامج أننا واثقون من وجود المفاتيح
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);