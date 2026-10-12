import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ClipboardList, Info, MessageCircle, ShoppingBasket, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { QuantityInput } from '@/components/quantity-input'
import { createOrderMessage, formatMoney, formatQuantity, lineSubtotal } from '@/domain/order'
import type { CustomerDetails } from '@/domain/order'
import type { Cart } from '@/hooks/use-cart'
import { imageUrl } from '@/lib/images'

interface OrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cart: Cart
}

const emptyCustomer: CustomerDetails = { businessName: '', contactName: '', whatsapp: '', address: '', notes: '' }

export function OrderDialog({ open, onOpenChange, cart }: OrderDialogProps) {
  const [step, setStep] = useState<'cart' | 'details' | 'complete'>('cart')
  const [customer, setCustomer] = useState<CustomerDetails>(emptyCustomer)
  const [phoneError, setPhoneError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [message, setMessage] = useState('')

  const changeOpen = (nextOpen: boolean) => {
    if (!nextOpen) setStep('cart')
    onOpenChange(nextOpen)
  }

  const submitDemo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const digits = customer.whatsapp.replace(/\D/g, '')
    if (!/^[+()\d\s-]+$/.test(customer.whatsapp) || digits.length < 8 || digits.length > 15) {
      setPhoneError('Indica un número de WhatsApp válido de 8 a 15 dígitos, con código de país si corresponde.')
      return
    }
    if (customer.address.trim().length < 5) {
      setAddressError('Agrega una dirección con al menos 5 caracteres.')
      return
    }
    if (!cart.lines.length) { setStep('cart'); return }
    setPhoneError('')
    setAddressError('')
    setMessage(createOrderMessage(customer, cart.lines))
    setStep('complete')
  }

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent className={`order-dialog ${step === 'details' ? 'order-dialog-wide' : ''}`}>
        <div className="order-heading">
          <span className="section-eyebrow">TU PEDIDO MAYORISTA</span>
          <DialogTitle>{step === 'cart' ? 'Tu carrito de pedido' : step === 'details' ? 'Un paso más, y listo.' : 'Tu pedido de prueba está listo'}</DialogTitle>
          <DialogDescription>{step === 'cart' ? 'Todo lo que tu negocio necesita, en un solo pedido.' : step === 'details' ? 'Revisa tus productos y cuéntanos los datos de tu negocio.' : 'Esta es una demostración. No se ha enviado ningún mensaje ni registrado un pedido.'}</DialogDescription>
        </div>
        {step === 'cart' && (cart.lines.length ? <>
          <div className="cart-lines">{cart.lines.map((line) => <div className="cart-line" key={line.product.id}>
            <img src={imageUrl(line.product.image, 180)} alt={line.product.name} width="80" height="80" />
            <div className="cart-line-info"><h3>{line.product.name}</h3><p>{line.product.code} · {formatMoney(line.product.price)} / {line.product.unit}</p><div className="cart-line-quantity"><QuantityInput value={line.quantity} unit={line.product.unit} productName={line.product.name} onChange={(quantity) => cart.update(line.product.id, quantity)} /><span>{line.product.unit}</span></div></div>
            <div className="cart-line-end"><button className="icon-button remove-button" aria-label={`Eliminar ${line.product.name}`} onClick={() => cart.remove(line.product.id)}><Trash2 size={17} /></button><strong>{formatMoney(lineSubtotal(line))}</strong></div>
          </div>)}</div>
          <div className="order-total"><span>Total del pedido</span><strong>{formatMoney(cart.total)}</strong></div>
          <p className="small-note"><Info size={14} /> Precios de demostración. Sin pagos en línea.</p>
          <button className="primary-button full-width" onClick={() => setStep('details')}>Continuar pedido <ArrowRight size={18} /></button>
          <button className="text-button" onClick={() => changeOpen(false)}>Seguir eligiendo productos</button>
        </> : <div className="empty-cart"><ShoppingBasket size={44} strokeWidth={1.3} /><h3>Tu próximo pedido empieza aquí</h3><p>Agrega frutas, verduras y tubérculos del catálogo para preparar tu pedido.</p><button className="primary-button" onClick={() => { changeOpen(false); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }) }}>Explorar el catálogo <ArrowRight size={17} /></button></div>)}

        {step === 'details' && <>
          <button className="text-button back-button" onClick={() => setStep('cart')}><ArrowLeft size={16} /> Volver al carrito</button>
          <form onSubmit={submitDemo} className="checkout-layout">
            <div className="customer-form">
              <h3>Datos de tu negocio</h3><p className="form-help">Los campos con * son obligatorios.</p>
              <label>Nombre del negocio *<input autoComplete="organization" required maxLength={150} value={customer.businessName} onChange={(event) => setCustomer({ ...customer, businessName: event.target.value })} placeholder="Nombre de tu negocio o institución" pattern=".*\S.*" /></label>
              <label>Persona encargada *<input autoComplete="name" required maxLength={120} value={customer.contactName} onChange={(event) => setCustomer({ ...customer, contactName: event.target.value })} placeholder="Nombre y apellidos" pattern=".*\S.*" /></label>
              <label>Número de WhatsApp *<input autoComplete="tel" type="tel" inputMode="tel" required maxLength={25} aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? 'phone-error' : undefined} value={customer.whatsapp} onChange={(event) => { setCustomer({ ...customer, whatsapp: event.target.value }); setPhoneError('') }} placeholder="Ej. +506 8888 8888" />{phoneError && <span id="phone-error" className="field-error" role="alert">{phoneError}</span>}</label>
              <label>Dirección *<textarea autoComplete="street-address" required minLength={5} maxLength={600} aria-invalid={Boolean(addressError)} aria-describedby={addressError ? 'address-error' : undefined} value={customer.address} onChange={(event) => { setCustomer({ ...customer, address: event.target.value }); setAddressError('') }} placeholder="Provincia, cantón, distrito y señas exactas" rows={3} />{addressError && <span id="address-error" className="field-error" role="alert">{addressError}</span>}</label>
              <label>Notas adicionales <span className="optional">(opcional)</span><textarea maxLength={1000} value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} placeholder="Indicaciones o necesidades especiales de tu pedido" rows={2} /></label>
            </div>
            <aside className="checkout-summary"><h3><ClipboardList size={19} /> Resumen del pedido</h3>{cart.lines.map((line) => <div className="summary-line" key={line.product.id}><div><strong>{line.product.name}</strong><small>{line.product.code} · {formatQuantity(line.quantity)} {line.product.unit}</small></div><span>{formatMoney(lineSubtotal(line))}</span></div>)}<div className="order-total"><span>Total</span><strong>{formatMoney(cart.total)}</strong></div><div className="demo-notice"><Info size={17} /><p><strong>Estás en una demostración</strong>El botón muestra cómo quedará tu pedido. No abre WhatsApp ni envía tus datos.</p></div><button type="submit" className="primary-button full-width whatsapp-button"><MessageCircle size={19} /> Enviar pedido por WhatsApp</button><span className="demo-caption">Vista previa · Sin envío real</span></aside>
          </form>
        </>}

        {step === 'complete' && <div className="demo-complete"><div className="complete-icon"><CheckCircle2 size={40} /></div><p>Así se verá el mensaje de tu negocio cuando habilitemos los pedidos por WhatsApp.</p><pre className="message-preview">{message}</pre><div className="privacy-note"><Check size={15} /> No se guardaron ni enviaron tus datos.</div><button className="primary-button full-width" onClick={() => { changeOpen(false); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }) }}>Volver al catálogo <ArrowRight size={17} /></button><button className="text-button" onClick={() => setStep('details')}>Editar datos del pedido</button></div>}
      </DialogContent>
    </Dialog>
  )
}
