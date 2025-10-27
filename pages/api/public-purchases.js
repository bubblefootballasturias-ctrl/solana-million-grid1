import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // opcional para lectura

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('id,buyer,squares,cid,priceSol,txSignature,inserted_at')
      .order('inserted_at', { ascending: true })
    if (error) throw error
    return res.status(200).json({ ok: true, data })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
