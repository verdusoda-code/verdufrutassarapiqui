import type { CatalogRepository, Product } from '@/domain/catalog'

const products: readonly Product[] = [
  { id: 'tomate', code: 'FR-001', name: 'Tomate', category: 'Verduras', price: 850, unit: 'kg', image: '/img/tomate.webp', active: true },
  { id: 'papa', code: 'FR-002', name: 'Papa', category: 'Tubérculos', price: 900, unit: 'kg', image: '/img/papa.webp', active: true },
  { id: 'yuca', code: 'FR-003', name: 'Yuca', category: 'Tubérculos', price: 700, unit: 'kg', image: '/img/yuca.webp', active: true },
  { id: 'zanahoria', code: 'FR-004', name: 'Zanahoria', category: 'Verduras', price: 750, unit: 'kg', image: '/img/zanahoria.webp', active: true },
  { id: 'pina', code: 'FR-005', name: 'Piña', category: 'Frutas', price: 1200, unit: 'unidad', image: '/img/pina.webp', active: true },
  { id: 'banano', code: 'FR-006', name: 'Banano', category: 'Frutas', price: 650, unit: 'kg', image: '/img/banano.webp', active: true },
  { id: 'papaya', code: 'FR-007', name: 'Papaya', category: 'Frutas', price: 1000, unit: 'kg', image: '/img/papaya.webp', active: true },
  { id: 'cebolla', code: 'FR-008', name: 'Cebolla', category: 'Verduras', price: 1100, unit: 'kg', image: '/img/cebolla.webp', active: true },
]

export const demoCatalogRepository: CatalogRepository = {
  listActiveProducts: async () => products.filter((product) => product.active),
}
