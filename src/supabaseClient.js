import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ysljynzljuzldslnyowu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbGp5bnpsanV6bGRzbG55b3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMTY5MDcsImV4cCI6MjA4OTc5MjkwN30.JFnHPvWi7d_QT33wXMpx8_j9vJ4MNAp0dzHrvIICWyQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)