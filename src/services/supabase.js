import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lybazkvgpdhrzytplqcu.supabase.co'
// eslint-disable-next-line no-undef
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5YmF6a3ZncGRocnp5dHBscWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzNjczNzEsImV4cCI6MjAxNzk0MzM3MX0.tvTgB0p-aoIvc4vTAcn7_8UH2nFl5MxSHHIjCt3gyCc'
// eslint-disable-next-line no-unused-vars
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
