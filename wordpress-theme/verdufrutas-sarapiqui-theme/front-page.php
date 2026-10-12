<?php
get_header();
?>

<section class="hero">
  <div class="hero-media" aria-hidden="true"></div>
  <div class="container hero-inner">
    <div>
      <span class="eyebrow">Frescura que impulsa tu negocio</span>
      <h1>Frutas y verduras para <strong>tu negocio</strong></h1>
      <p>Encuentra productos frescos para tu negocio, restaurante o institución en Costa Rica. Pedidos claros, servicio cercano y calidad constante.</p>
      <div class="hero-actions">
        <a class="button" href="#catalogo">Ver catálogo</a>
        <a class="button secondary" href="#contacto">Solicitar pedido</a>
      </div>
    </div>
    <div class="hero-location">
      <span>📍</span>
      <div>
        <strong>Verdufrutas Sarapiquí</strong><br>
        <small>Producción y entrega local</small>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <span class="eyebrow">Nuestra propuesta</span>
      <h2>Lo que más valoramos</h2>
    </div>
    <div class="benefits-wrap">
      <article class="benefit-box">
        <div class="icon">🌱</div>
        <div>
          <h3>Productos frescos</h3>
          <p>Selección cuidadosa y entregas con calidad constante.</p>
        </div>
      </article>
      <article class="benefit-box">
        <div class="icon">🤝</div>
        <div>
          <h3>Atención cercana</h3>
          <p>Te ayudamos a elegir lo que mejor se adapta a tu negocio.</p>
        </div>
      </article>
      <article class="benefit-box">
        <div class="icon">📦</div>
        <div>
          <h3>Pedidos sin complicaciones</h3>
          <p>Un proceso simple para que puedas enfocarte en vender.</p>
        </div>
      </article>
    </div>
  </div>
</section>

<section id="catalogo" class="section">
  <div class="container">
    <div class="section-heading">
      <span class="eyebrow">Catálogo</span>
      <h2>Productos destacados</h2>
      <p>Una selección inicial para mostrar artículos del negocio y preparar la base del blog y del catálogo en WordPress.</p>
    </div>

    <div class="catalog-grid">
      <?php
      $productos = [
        ['name' => 'Tomate', 'meta' => 'Hortaliza', 'price' => '₡1.250'],
        ['name' => 'Pepino', 'meta' => 'Fresco', 'price' => '₡1.050'],
        ['name' => 'Zanahoria', 'meta' => 'Raíz', 'price' => '₡1.100'],
        ['name' => 'Mango', 'meta' => 'Fruta', 'price' => '₡1.480'],
      ];

      foreach ($productos as $producto) :
      ?>
        <article class="product-card">
          <div class="thumb">🥬</div>
          <div class="content">
            <h3><?php echo esc_html($producto['name']); ?></h3>
            <div class="product-meta"><?php echo esc_html($producto['meta']); ?></div>
            <div class="product-price"><?php echo esc_html($producto['price']); ?> <span>/ kg</span></div>
            <div class="product-actions">
              <div class="qty-box">
                <button aria-label="Restar cantidad">−</button>
                <span>1</span>
                <button aria-label="Sumar cantidad">+</button>
              </div>
              <a href="#contacto" class="button secondary">Pedir</a>
            </div>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section id="como-funciona" class="section" style="background:#f2f5ee;">
  <div class="container">
    <div class="section-heading" style="text-align:center;">
      <span class="eyebrow">Cómo funciona</span>
      <h2>Tu pedido, así de fácil</h2>
    </div>
    <div class="steps-grid">
      <article class="step-card">
        <div class="step-number">01</div>
        <h3>Elige tus productos</h3>
        <p>Explora el catálogo y selecciona la fruta o verdura que tu negocio necesita.</p>
      </article>
      <article class="step-card">
        <div class="step-number">02</div>
        <h3>Indica cantidades</h3>
        <p>Revisa áreas, kilos o cantidades para ordenar tu pedido sin complicaciones.</p>
      </article>
      <article class="step-card">
        <div class="step-number">03</div>
        <h3>Confirma y cotiza</h3>
        <p>Envía tu solicitud y nosotros te respondemos con el siguiente paso.</p>
      </article>
    </div>
  </div>
</section>

<section id="contacto" class="section">
  <div class="container">
    <div class="contact-box">
      <div>
        <span class="eyebrow">Contacto</span>
        <h3>Listo para abastecer tu negocio</h3>
        <p>Escríbenos por WhatsApp o correo para solicitar tu pedido, cotizar una compra y recibir asesoría especializada.</p>
      </div>
      <div>
        <a href="https://wa.me/50600000000" class="button" target="_blank" rel="noopener noreferrer">Solicitar por WhatsApp</a>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
