import { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import { connectWallet, sendPayment } from '../lib/solana'
import { NFTStorage, File } from 'nft.storage'

const NFT_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY
const RECEIVER = process.env.RECEIVER_PUBLIC_KEY || process.env.NEXT_PUBLIC_RECEIVER_PUBLIC_KEY
const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'devnet'
const PRICE_PER_SQUARE = parseFloat(process.env.NEXT_PUBLIC_PRICE_PER_SQUARE || '0.01')

export default function Home() {
  const [wallet, setWallet] = useState(null)
  const [selected, setSelected] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [publicPurchases, setPublicPurchases] = useState([])

  useEffect(() => {
    fetch('/api/public-purchases')
      .then(r => r.json())
      .then(d => setPublicPurchases(d.data || []))
      .catch(() => setPublicPurchases([]))
  }, [])

  async function onConnect() {
    try {
      const w = await connectWallet()
      setWallet(w)
      setMessage(`Conectado: ${w.publicKey.toBase58()}`)
    } catch (err) {
      setMessage('Error conectando wallet: ' + (err.message || err))
    }
  }

  function toggleSquare(i) {
    setSelected(prev => {
      if (prev.includes(i)) return prev.filter(x => x !== i)
      return [...prev, i]
    })
  }

  async function onPurchase() {
    if (!wallet) { setMessage('Conecta la wallet'); return }
    if (!file) { setMessage('Selecciona una imagen'); return }
    if (selected.length === 0) { setMessage('Selecciona al menos una casilla'); return }

    setLoading(true)
    setMessage('Subiendo imagen a nft.storage...')
    try {
      const client = new NFTStorage({ token: NFT_KEY })
      const cid = await client.storeBlob(new File([file], file.name))
      setMessage('Imagen subida. Creando transacción...')

      const totalSol = PRICE_PER_SQUARE * selected.length

      const txSig = await sendPayment(wallet, RECEIVER, totalSol, NETWORK)

      const res = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyer: wallet.publicKey.toBase58(),
          squares: selected,
          cid,
          priceSol: totalSol,
          txSignature: txSig
        })
      })
      const data = await res.json()
      if (data.ok) {
        setMessage('Compra registrada. ¡Gracias!')
        setSelected([])
        setFile(null)
        setPublicPurchases(prev => [...prev, { buyer: wallet.publicKey.toBase58(), squares: selected, cid }])
      } else {
        setMessage('Error guardando metadata: ' + (data.error || ''))
      }
    } catch (err) {
      console.error(err)
      setMessage('Error: ' + (err.message || err))
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Million Grid — Compra casillas con Solana</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={onConnect}>Conectar Phantom</button>
        <span style={{ marginLeft: 12 }}>{message}</span>
      </div>

      <div style={{ marginBottom: 12 }}>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Casillas seleccionadas:</strong> {selected.length} — Precio por casilla: {PRICE_PER_SQUARE} SOL
      </div>

      <Grid rows={100} cols={100} selected={selected} onToggle={toggleSquare} purchases={publicPurchases} />

      <div style={{ marginTop: 12 }}>
        <button onClick={onPurchase} disabled={loading}>Comprar ({selected.length} casillas) — Total { (PRICE_PER_SQUARE * selected.length).toFixed(4) } SOL</button>
      </div>

      <div style={{ marginTop: 12 }}>{loading ? 'Procesando...' : ''}</div>
    </div>
  )
}
