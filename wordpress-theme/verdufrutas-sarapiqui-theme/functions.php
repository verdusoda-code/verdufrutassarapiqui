<?php
/**
 * WordPress theme functions.
 */

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus([
        'primary' => __('Menú principal', 'verdufrutas-sarapiqui'),
    ]);
});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('verdufrutas-sarapiqui-style', get_stylesheet_uri(), [], wp_get_theme()->get('Version'));
});

function verdufrutas_sarapiqui_site_brand() {
    if (has_custom_logo()) {
        the_custom_logo();
        return;
    }

    echo '<div class="brand" aria-label="Verdufrutas Sarapiquí">';
    echo '<span class="brand-mark">V</span>';
    echo '<span class="brand-text">Verdufrutas<small>Sarapiquí</small></span>';
    echo '</div>';
}

function verdufrutas_sarapiqui_excerpt() {
    $excerpt = get_the_excerpt();
    if (empty($excerpt)) {
        $excerpt = wp_trim_words(get_the_content(), 24, '...');
    }

    return $excerpt;
}

function verdufrutas_sarapiqui_nav_menu() {
    if (has_nav_menu('primary')) {
        wp_nav_menu([
            'theme_location' => 'primary',
            'container' => 'nav',
            'container_class' => 'main-nav',
            'fallback_cb' => false,
        ]);
        return;
    }

    echo '<nav class="main-nav" aria-label="Menú principal">';
    echo '<a href="' . esc_url(home_url('/')) . '">Inicio</a>';
    echo '<a href="' . esc_url(home_url('/#catalogo')) . '">Catálogo</a>';
    echo '<a href="' . esc_url(home_url('/#como-funciona')) . '">Cómo funciona</a>';
    echo '<a href="' . esc_url(home_url('/#contacto')) . '">Contacto</a>';
    echo '</nav>';
}
