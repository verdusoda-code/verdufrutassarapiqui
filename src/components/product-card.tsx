import { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/domain/catalog'
import { MAX_QUANTITY, formatMoney, formatQuantity } from '@/domain/order'
import { imageUrl } from '@/lib/images'
import { QuantityInput } from '@/components/quantity-input'

interface ProductCardProps {
  product: Product
  currentQuantity: number
  onAdd: (product: Product, quantity: number) => void
}

export function ProductCard({ product, currentQuantity, onAdd }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const addProduct = () => {
    if (currentQuantity + quantity > MAX_QUANTITY) {
      toast.error(`El máximo por producto es ${formatQuantity(MAX_QUANTITY)} ${product.unit}. Ajusta la cantidad en el carrito.`)
      return
    }
    onAdd(product, quantity)
    setAdded(true)
    toast.success(`${product.name} agregado al pedido`, { description: `${formatQuantity(quantity)} ${product.unit} · Puedes ajustar las cantidades en el carrito.` })
  }

  return (
    <article className="product-card">
      <div className="product-image"><img src={imageUrl(product.image, 480)} srcSet={`${imageUrl(product.image, 320)} 320w, ${imageUrl(product.image, 640)} 640w`} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 25vw" alt={product.name} loading="lazy" width="480" height="360" /><span className={`category-label category-${product.category === 'Frutas' ? 'fruit' : product.category === 'Verduras' ? 'vegetable' : 'root'}`}>{product.category}</span></div>
      <div className="product-content">
        <div className="product-title"><h3>{product.name}</h3><span>{product.code}</span></div>
        <div className="product-price">{formatMoney(product.price)} <span>/ {product.unit}</span></div>
        <div className="product-quantity"><span>Cantidad <small>({product.unit})</small></span><QuantityInput value={quantity} unit={product.unit} productName={product.name} onChange={(next) => { setQuantity(next); setAdded(false) }} /></div>
        <button className={`add-button ${added ? 'is-added' : ''}`} onClick={addProduct}>{added ? <Check size={16} /> : <Plus size={16} />}{added ? 'Agregar más al pedido' : 'Agregar al pedido'}</button>
      </div>
    </article>
  )
}
