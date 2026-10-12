import { useReducer } from 'react'
import type { Product } from '@/domain/catalog'
import { MAX_QUANTITY, isValidQuantity, orderTotal } from '@/domain/order'
import type { CartLine } from '@/domain/order'

type CartAction =
  | { type: 'add'; product: Product; quantity: number }
  | { type: 'update'; id: string; quantity: number }
  | { type: 'remove'; id: string }

function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  if (action.type === 'remove') return lines.filter((line) => line.product.id !== action.id)
  if (action.type === 'update') return lines.map((line) => line.product.id === action.id && isValidQuantity(action.quantity, line.product.unit) ? { ...line, quantity: action.quantity } : line)
  if (!isValidQuantity(action.quantity, action.product.unit)) return lines
  const existing = lines.find((line) => line.product.id === action.product.id)
  if (!existing) return [...lines, { product: action.product, quantity: action.quantity }]
  return lines.map((line) => line.product.id === action.product.id ? { ...line, quantity: Math.min(MAX_QUANTITY, Math.round((line.quantity + action.quantity) * 10) / 10) } : line)
}

export function useCart() {
  const [lines, dispatch] = useReducer(cartReducer, [])
  return {
    lines,
    total: orderTotal(lines),
    count: lines.length,
    add: (product: Product, quantity: number) => dispatch({ type: 'add', product, quantity }),
    update: (id: string, quantity: number) => dispatch({ type: 'update', id, quantity }),
    remove: (id: string) => dispatch({ type: 'remove', id }),
  }
}

export type Cart = ReturnType<typeof useCart>
