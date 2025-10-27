import React from 'react'

export default function Grid({ rows = 100, cols = 100, selected = [], onToggle, purchases = [] }) {
  const total = rows * cols
  const cells = Array.from({ length: total }, (_, i) => i)

  const overlays = purchases.map(p => {
    if (!p.squares || p.squares.length === 0) return null
    const xs = p.squares.map(idx => idx % cols)
    const ys = p.squares.map(idx => Math.floor(idx / cols))
    const minX = Math.min(...xs), maxX = Math.max(...xs)
    const minY = Math.min(...ys), maxY = Math.max(...ys)
    return {
      cid: p.cid,
      x: minX,
      y: minY,
      w: maxX - minX + 1,
      h: maxY - minY + 1
    }
  }).filter(Boolean)

  const cellSize = 12
  const gridWidth = cols * (cellSize + 4)

  return (
    <div style={{ position: 'relative', width: gridWidth }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: 4,
        background: '#fafafa',
        border: '1px solid #ddd',
        padding: 8,
      }}>
        {cells.map(i => (
          <div
            key={i}
            onClick={() => onToggle && onToggle(i)}
            style={{
              width: cellSize, height: cellSize, background: selected.includes(i) ? '#2b7' : '#eee',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
            title={`Casilla ${i}`}
          />
        ))}
      </div>

      {overlays.map((o, idx) => {
        const left = o.x * (cellSize + 4) + 8
        const top = o.y * (cellSize + 4) + 8
        const width = o.w * (cellSize + 4) - 4
        const height = o.h * (cellSize + 4) - 4
        const src = `https://ipfs.io/ipfs/${o.cid}`
        return (
          <div key={idx} style={{
            position: 'absolute',
            left,
            top,
            width,
            height,
            pointerEvents: 'none',
            border: '2px solid rgba(0,0,0,0.06)'
          }}>
            <img src={src} alt="ad" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )
      })}
    </div>
  )
}
