import type { Product, SaleUnit } from '@/domain/catalog'

export interface CartLine {
  product: Product
  quantity: number
}

export interface CustomerDetails {
  businessName: string
  contactName: string
  whatsapp: string
  address: string
  notes: string
}

export type OrderStatus = 'Pendiente' | 'Confirmado' | 'Preparando' | 'Listo' | 'Entregado' | 'Cancelado'

export const MAX_QUANTITY = 10000

export function isValidQuantity(quantity: number, unit: SaleUnit) {
  return Number.isFinite(quantity) && quantity >= (unit === 'kg' ? 0.1 : 1) && quantity <= MAX_QUANTITY && (unit === 'kg' ? Math.abs(quantity * 10 - Math.round(quantity * 10)) < 0.000001 : Number.isInteger(quantity))
}

export function lineSubtotal(line: CartLine) {
  return Math.round(line.product.price * line.quantity * 100) / 100
}

export function orderTotal(lines: readonly CartLine[]) {
  return Math.round(lines.reduce((total, line) => total + lineSubtotal(line), 0) * 100) / 100
}

const currencyFormatter = new Intl.NumberFormat('es-CR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })

export function formatMoney(amount: number) {
  return `₡${currencyFormatter.format(amount)}`
}

export function formatQuantity(quantity: number) {
  return new Intl.NumberFormat('es-CR', { maximumFractionDigits: 1 }).format(quantity)
}

export function createOrderMessage(customer: CustomerDetails, lines: readonly CartLine[]) {
  return [
    'PEDIDO · VERDUFRUTAS SARAPIQUÍ',
    `Negocio: ${customer.businessName.trim()}`,
    `Encargado/a: ${customer.contactName.trim()}`,
    `WhatsApp: ${customer.whatsapp.trim()}`,
    `Dirección: ${customer.address.trim()}`,
    '',
    ...lines.map((line) => `${line.product.name} (${line.product.code}) · ${formatQuantity(line.quantity)} ${line.product.unit} · ${formatMoney(lineSubtotal(line))}`),
    '',
    `Total de referencia: ${formatMoney(orderTotal(lines))}`,
    ...(customer.notes.trim() ? [`Notas: ${customer.notes.trim()}`] : []),
  ].join('\n')
}
