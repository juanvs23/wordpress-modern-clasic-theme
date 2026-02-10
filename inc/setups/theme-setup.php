<?php
/**
 * Theme setups: soporte de título, thumbnails, registro de menús y sidebars
 * Ubicado en `inc/setups` para centralizar las configuraciones del tema
 */

if ( ! function_exists( 'ignite_setup' ) ) {
    function ignite_setup() {
        // Soportes básicos
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );

        // Menús
        if ( function_exists( 'register_nav_menus' ) ) {
            register_nav_menus( array(
                        'primary' => __( 'Primary Menu', 'ignite-theme' ),
                    ) );
        }
    }
}
        add_action( 'after_setup_theme', 'ignite_setup' );

// Ejemplo de registro de widgets (si se requiere, puede ajustarse)
function ignite_register_sidebars() {
    register_sidebar( array(
        'name'          => __( 'Footer Menu', 'ignite-theme' ),
        'id'            => 'nemo-footer-menu',
        'description'   => 'Área de widgets para el menú del footer',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name' => __( 'Footer Bottom Left', 'ignite-theme' ),
        'id'   => 'nemo-footer-bottom-left',
    ) );

    register_sidebar( array(
        'name' => __( 'Footer Bottom Right', 'ignite-theme' ),
        'id'   => 'nemo-footer-bottom-right',
    ) );
}
add_action( 'widgets_init', 'ignite_register_sidebars' );
