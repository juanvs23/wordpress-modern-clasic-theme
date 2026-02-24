<?php
/**
 * Theme setups: soporte de título, thumbnails, registro de menús y sidebars
 * Ubicado en `inc/setups` para centralizar las configuraciones del tema
 */

if ( ! function_exists( 'NEW_THEME_setup' ) ) {
    function NEW_THEME_setup() {
        // Soportes básicos
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        // Soporte para logo personalizado (Custom Logo)
        add_theme_support( 'custom-logo', array(
            'height'      => 80,
            'width'       => 240,
            'flex-height' => true,
            'flex-width'  => true,
            'header-text' => array( 'site-title', 'site-description' ),
        ) );

        // Menús
        if ( function_exists( 'register_nav_menus' ) ) {
            register_nav_menus( array(
                        'primary' => __( 'Primary Menu', 'ignite-theme' ),
                    ) );
        }
    }
}
        add_action( 'after_setup_theme', 'NEW_THEME_setup' );

// Ejemplo de registro de widgets (si se requiere, puede ajustarse)
function NEW_THEME_register_sidebars() {
    // Footer: 6 columnas/widgets
    for ( $i = 1; $i <= 6; $i++ ) {
        register_sidebar( array(
            'name'          => sprintf( __( 'Footer %d', 'ignite-theme' ), $i ),
            'id'            => 'footer-' . $i,
            'description'   => sprintf( __( 'Footer column %d', 'ignite-theme' ), $i ),
            'before_widget' => '<div id="%1$s" class="widget %2$s footer-widget-area">',
            'after_widget'  => '</div>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        ) );
    }

    // Sección media: 5 áreas para menús e información de la empresa
    for ( $j = 1; $j <= 5; $j++ ) {
        register_sidebar( array(
            'name'          => sprintf( __( 'Media Section %d', 'ignite-theme' ), $j ),
            'id'            => 'media-section-' . $j,
            'description'   => sprintf( __( 'Media section area %d — menus / company info', 'ignite-theme' ), $j ),
            'before_widget' => '<div id="%1$s" class="widget %2$s media-widget">',
            'after_widget'  => '</div>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        ) );
    }

    // Footer inferior: copyright / bottom bar
    register_sidebar( array(
        'name'          => __( 'Footer Bottom - Copyright', 'ignite-theme' ),
        'id'            => 'footer-bottom-copyright',
        'description'   => __( 'Área inferior del footer donde se colocará el copyright de la empresa.', 'ignite-theme' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s footer-bottom">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'NEW_THEME_register_sidebars' );


