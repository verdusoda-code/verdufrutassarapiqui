import { useEffect, useId, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import type { SaleUnit } from '@/domain/catalog'
import { MAX_QUANTITY, isValidQuantity } from '@/domain/order'

interface QuantityInputProps {
  value: number
  unit: SaleUnit
  productName: string
  onChange: (quantity: number) => void
}

export function QuantityInput({ value, unit, productName, onChange }: QuantityInputProps) {
  const [draft, setDraft] = useState(String(value))
  const inputId = useId()
  const minimum = unit === 'kg' ? 0.1 : 1
  useEffect(() => setDraft(String(value)), [value])

  const changeBy = (amount: number) => {
    const next = Math.min(MAX_QUANTITY, Math.max(minimum, Math.round((value + amount) * 10) / 10))
    onChange(next)
    setDraft(String(next))
  }

  return (
    <div className="quantity-input">
      <button type="button" onClick={() => changeBy(-1)} disabled={value <= minimum} aria-label={`Reducir cantidad de ${productName}`}><Minus size={14} /></button>
      <label className="sr-only" htmlFor={inputId}>Cantidad de {productName} en {unit}</label>
      <input id={inputId} type="number" min={minimum} max={MAX_QUANTITY} step={unit === 'kg' ? 0.1 : 1} inputMode={unit === 'kg' ? 'decimal' : 'numeric'} value={draft} onChange={(event) => {
        setDraft(event.target.value)
        const next = Number(event.target.value)
        if (event.target.value && isValidQuantity(next, unit)) onChange(next)
      }} onBlur={() => setDraft(String(value))} />
      <button type="button" onClick={() => changeBy(1)} disabled={value >= MAX_QUANTITY} aria-label={`Aumentar cantidad de ${productName}`}><Plus size={14} /></button>
    </div>
  )
}
