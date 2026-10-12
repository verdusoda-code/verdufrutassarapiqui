<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="announcement">Frescura que impulsa tu negocio</div>
<header class="site-header">
  <div class="container header-inner">
    <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="Ir a inicio" class="brand">
      <span class="brand-mark">V</span>
      <span class="brand-text">Verdufrutas<small>Sarapiquí</small></span>
    </a>

    <?php verdufrutas_sarapiqui_nav_menu(); ?>

    <div class="header-actions">
      <a href="#contacto" class="button secondary">Solicitar pedido</a>
    </div>
  </div>
</header>
