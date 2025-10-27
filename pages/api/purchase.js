import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })
  const { buyer, squares, cid, priceSol, txSignature } = req.body
  if (!buyer || !squares || !cid || !txSignature) {
    return res.status(400).json({ ok: false, error: 'Missing fields' })
  }
  try {
    const { data, error } = await supabase
      .from('purchases')
      .insert([{ buyer, squares, cid, priceSol, txSignature }])
    if (error) throw error
    return res.status(200).json({ ok: true, data })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
