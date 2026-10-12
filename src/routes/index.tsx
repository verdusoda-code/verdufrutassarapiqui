import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowDown, ArrowRight, ArrowUpRight, Boxes, Check, ChevronRight, ClipboardList, HeartHandshake, Leaf, MapPin, Menu, MessageCircle, Search, ShieldCheck, ShoppingBasket, SlidersHorizontal, Sprout, Truck, UserRound, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ProductCard } from '@/components/product-card'
import { OrderDialog } from '@/components/order-dialog'
import { demoCatalogRepository } from '@/data/demo-catalog'
import { categories, normalizeSearch } from '@/domain/catalog'
import type { ProductCategory } from '@/domain/catalog'
import { useCart } from '@/hooks/use-cart'
import { formatMoney } from '@/domain/order'
import { imageUrl } from '@/lib/images'

export const Route = createFileRoute('/')({
  loader: () => demoCatalogRepository.listActiveProducts(),
  component: Home,
})
const navigation = [{ label: 'Inicio', href: '#inicio' }, { label: 'Catálogo', href: '#catalogo' }, { label: 'Cómo funciona', href: '#como-funciona' }, { label: 'Contacto', href: '#contacto' }]

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#inicio" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="Verdufrutas Sarapiquí, inicio"><span className="brand-symbol"><Sprout strokeWidth={1.7} size={31} /></span><span className="brand-type">Verdufrutas<span>SARAPIQUÍ</span></span></a>
}

function Home() {
  const products = Route.useLoaderData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'Todos'>('Todos')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const cart = useCart()
  const filteredProducts = useMemo(() => products.filter((product) => (category === 'Todos' || product.category === category) && normalizeSearch(product.name).includes(normalizeSearch(search))), [search, category, products])

  return <>
    <a href="#catalogo" className="skip-link">Saltar al catálogo</a>
    <div className="announcement"><Leaf size={13} /><span>Frescura que impulsa tu negocio.</span><span className="announcement-divider">|</span><span>Venta mayorista en Costa Rica</span></div>
    <header className="site-header"><div className="header-inner container"><Brand /><nav className="desktop-nav" aria-label="Navegación principal">{navigation.map((item) => <a key={item.href} href={item.href} className={item.href === '#inicio' ? 'nav-home' : ''}>{item.label}</a>)}</nav><div className="header-actions"><button className="login-button" onClick={() => setAccountOpen(true)}><UserRound size={17} /><span>Iniciar sesión</span></button><button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingBasket size={18} /><span>Carrito</span><span className="cart-count" aria-label={`${cart.count} productos en el carrito`}>{cart.count}</span></button><button className="menu-button icon-button" aria-label={mobileMenu ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobileMenu} aria-controls="mobile-navigation" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={23} /> : <Menu size={23} />}</button></div></div>{mobileMenu && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMobileMenu(false)}>{item.label}<ChevronRight size={16} /></a>)}<button onClick={() => { setMobileMenu(false); setAccountOpen(true) }}><UserRound size={17} /> Iniciar sesión</button></nav>}</header>

    <main>
      <section id="inicio" className="hero"><img className="hero-image" src={imageUrl('/img/harvest.webp', 1920)} srcSet={`${imageUrl('/img/harvest.webp', 960)} 960w, ${imageUrl('/img/harvest.webp', 1920)} 1920w`} sizes="100vw" alt="Cosecha fresca de frutas y verduras en cajas de madera" fetchPriority="high" width="1920" height="1080" /><div className="hero-shade" /><div className="container hero-content"><div className="hero-text"><div className="hero-eyebrow"><span /> DEL CAMPO A TU NEGOCIO</div><h1>Frutas y verduras<br />para <em>tu negocio.</em></h1><p>Realiza tus pedidos de forma fácil, rápida y organizada.<br className="desktop-break" /> La frescura de siempre, con la facilidad que necesitas.</p><a className="hero-button" href="#catalogo">Ver catálogo <ArrowUpRight size={20} /></a><div className="hero-proof"><span><Check size={15} /> Calidad y frescura</span><span><Check size={15} /> Pedidos a tu medida</span></div></div><div className="hero-location"><MapPin size={17} /><span>De Sarapiquí,<br /><strong>para tu negocio.</strong></span></div></div><a href="#catalogo" className="hero-scroll" aria-label="Ir al catálogo"><ArrowDown size={19} /></a></section>

      <section className="benefits" aria-label="Nuestra propuesta"><div className="container benefits-grid"><div className="benefit"><span className="benefit-icon"><Leaf size={26} strokeWidth={1.5} /></span><div><h2>Frescura en cada pedido</h2><p>Productos seleccionados con cuidado.</p></div></div><div className="benefit"><span className="benefit-icon"><Boxes size={26} strokeWidth={1.5} /></span><div><h2>Pensado para tu negocio</h2><p>Abastecimiento mayorista a tu medida.</p></div></div><div className="benefit"><span className="benefit-icon"><HeartHandshake size={27} strokeWidth={1.5} /></span><div><h2>Un trato cercano y confiable</h2><p>Somos el aliado de tu día a día.</p></div></div></div></section>

      <section id="catalogo" className="catalog-section container"><div className="section-heading"><div><span className="section-eyebrow">FRESCOS, SELECCIONADOS Y LISTOS PARA TI</span><h2>Catálogo de productos<span>.</span></h2><p>Lo que necesitas para abastecer tu negocio, en un solo lugar.</p></div><div className="catalog-wholesale"><Boxes size={17} /> Venta mayorista</div></div>
        <div className="catalog-toolbar"><div className="category-filters" aria-label="Filtrar por categoría">{(['Todos', ...categories] as const).map((item) => <button key={item} className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === 'Todos' && <SlidersHorizontal size={15} />}{item === 'Todos' ? 'Todos los productos' : item}</button>)}</div><div className="search-input"><Search size={18} /><label htmlFor="product-search" className="sr-only">Buscar productos por nombre</label><input id="product-search" type="search" placeholder="Buscar productos..." value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button onClick={() => setSearch('')} aria-label="Limpiar búsqueda"><X size={15} /></button>}</div></div>
        <div className="catalog-meta"><span aria-live="polite">{filteredProducts.length} {filteredProducts.length === 1 ? 'producto disponible' : 'productos disponibles'}</span><span>Precios por kilogramo o unidad</span></div>
        {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} currentQuantity={cart.lines.find((line) => line.product.id === product.id)?.quantity ?? 0} onAdd={cart.add} />)}</div> : <div className="catalog-empty"><Search size={35} strokeWidth={1.5} /><h3>No encontramos ese producto</h3><p>Prueba con otro nombre o explora todas las categorías.</p><button className="primary-button" onClick={() => { setSearch(''); setCategory('Todos') }}>Ver todos los productos <ArrowRight size={16} /></button></div>}
        <div className="catalog-note"><ShieldCheck size={18} /><p>Este es un catálogo de demostración. Los precios y productos son de referencia.</p><span>Sin pagos en línea.</span></div>
      </section>

      <section id="como-funciona" className="how-section">
        <div className="container">
          <div className="how-heading">
            <span className="section-eyebrow">MENOS COMPLICACIONES, MÁS FRESCURA</span>
            <h2>Tu pedido, así de fácil.</h2>
            <p>Nosotros nos encargamos de lo fresco. Tú, de tu negocio.</p>
          </div>
          <div className="steps-grid">
            <article className="step">
              <div className="step-top">
                <span className="step-icon"><ShoppingBasket size={29} strokeWidth={1.5} /></span>
                <span className="step-number">01</span>
              </div>
              <h3>Elige tus productos</h3>
              <p>Explora el catálogo y encuentra las frutas y verduras que tu negocio necesita.</p>
            </article>
            <article className="step">
              <div className="step-top">
                <span className="step-icon"><ClipboardList size={29} strokeWidth={1.5} /></span>
                <span className="step-number">02</span>
              </div>
              <h3>Indica las cantidades</h3>
              <p>Agrega las cantidades que necesitas. Revisa y ajusta tu pedido fácilmente.</p>
            </article>
            <article className="step">
              <div className="step-top">
                <span className="step-icon"><MessageCircle size={29} strokeWidth={1.5} /></span>
                <span className="step-number">03</span>
              </div>
              <h3>Nos encargamos del resto</h3>
              <p>Envía tu pedido y coordinamos contigo los detalles. Cercano, fácil y sin complicaciones.</p>
              <span className="coming-soon-label">Envío por WhatsApp próximamente</span>
            </article>
          </div>
        </div>
      </section>

      <section id="contacto" className="contact-section container"><div className="contact-card"><div className="contact-decoration"><Sprout size={105} strokeWidth={0.8} /></div><div className="contact-copy"><span className="section-eyebrow">CRECEMOS JUNTO A TU NEGOCIO</span><h2>Un buen negocio empieza<br />con productos frescos.</h2><p>Para tiendas, abastecedores, escuelas, colegios y organizaciones.<br />En Verdufrutas Sarapiquí, hablamos el idioma de tu negocio.</p><span className="contact-location"><MapPin size={16} /> Sarapiquí, Costa Rica</span></div><div className="contact-action"><a className="primary-button" href="#catalogo">Preparar mi pedido <ArrowUpRight size={19} /></a><span><Truck size={16} /> Abastecimiento para negocios</span></div></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-top"><div><Brand footer /><p>Frescura, confianza y un aliado para tu negocio.</p></div><nav aria-label="Navegación del pie de página">{navigation.slice(1).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><span className="footer-origin"><MapPin size={15} /> Hecho para Costa Rica</span></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Verdufrutas Sarapiquí. Todos los derechos reservados.</span><span>Naturalmente, de confianza.<Leaf size={13} /></span></div></footer>

    {cart.count > 0 && <button className="mobile-cart-bar" onClick={() => setCartOpen(true)}><span><ShoppingBasket size={19} /> Ver mi pedido <small>{cart.count}</small></span><strong>{formatMoney(cart.total)}<ArrowRight size={17} /></strong></button>}
    <OrderDialog open={cartOpen} onOpenChange={setCartOpen} cart={cart} />
    <Dialog open={accountOpen} onOpenChange={setAccountOpen}><DialogContent className="account-dialog"><span className="account-icon"><UserRound size={32} /></span><span className="section-eyebrow">UNA EXPERIENCIA PENSADA PARA TU NEGOCIO</span><DialogTitle>Tu cuenta, próximamente.</DialogTitle><DialogDescription>Más adelante podrás acceder de forma segura a la cuenta de tu negocio, consultar tu historial y organizar tus pedidos frecuentes.</DialogDescription><div className="account-note"><ShieldCheck size={18} /><span>El registro y el inicio de sesión todavía no están habilitados. Por ahora puedes explorar el catálogo y preparar un pedido de demostración sin una cuenta.</span></div><button className="primary-button full-width" onClick={() => { setAccountOpen(false); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }) }}>Explorar el catálogo <ArrowRight size={17} /></button></DialogContent></Dialog>
  </>
}
