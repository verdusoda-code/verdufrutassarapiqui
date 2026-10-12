export type ProductCategory = 'Frutas' | 'Verduras' | 'Tubérculos'
export type SaleUnit = 'kg' | 'unidad'

export interface Product {
  id: string
  code: string
  name: string
  category: ProductCategory
  price: number
  unit: SaleUnit
  image: string
  active: boolean
}

export interface CatalogRepository {
  listActiveProducts(): Promise<readonly Product[]>
}

export const categories: readonly ProductCategory[] = ['Frutas', 'Verduras', 'Tubérculos']

export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-CR').trim()
}
