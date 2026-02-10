<?php
/**
 * Dequeue/Remove front-end styles and scripts que no queremos cargar
 * Centralizado en `inc/scripts`
 */

if ( ! function_exists( 'ignite_dequeue_unwanted_assets' ) ) {
    function ignite_dequeue_unwanted_assets() {
        // Gutenberg/block CSS (front-end)
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'wp-block-library-theme' );
        wp_dequeue_style( 'wp-block-style' );
        wp_dequeue_style( 'classic-theme-styles' );
        wp_dequeue_style( 'global-styles' );
        // Remover estilos inline/por bloque (ej. imagenes en bloques)
        wp_dequeue_style( 'wp-block-image-inline-css' );
        wp_deregister_style( 'wp-block-image-inline-css' );

        // WooCommerce block styles
        wp_dequeue_style( 'wc-block-style' );

        // Ejemplo: remover jquery Migrate si lo deseas
        wp_deregister_script( 'jquery-migrate' );
    }
}
add_action( 'wp_enqueue_scripts', 'ignite_dequeue_unwanted_assets', 100 );

// También quitar estilos/scripts que cargue el editor de bloques (block editor)
if ( ! function_exists( 'ignite_dequeue_block_editor_assets' ) ) {
    function ignite_dequeue_block_editor_assets() {
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'wp-block-library-theme' );
        wp_dequeue_style( 'wp-block-style' );
        wp_dequeue_style( 'classic-theme-styles' );
        wp_dequeue_style( 'global-styles' );
        // Editor: remover handle de imagen inline si existe
        wp_dequeue_style( 'wp-block-image-inline-css' );
        wp_deregister_style( 'wp-block-image-inline-css' );
        wp_dequeue_script( 'wp-edit-blocks' );
    }
}
add_action( 'enqueue_block_editor_assets', 'ignite_dequeue_block_editor_assets', 100 );

/**
 * Helpers: algunos estilos de bloques se añaden como inline (extra['after'])
 * o se registran tarde. Forzamos la limpieza también en hooks de impresión
 * para cubrir casos donde los handles fueron añadidos después de wp_enqueue_scripts.
 */
if ( ! function_exists( 'ignite_force_remove_style' ) ) {
    function ignite_force_remove_style( $handle ) {
        // Dequeue / deregister si existe
        if ( wp_style_is( $handle, 'enqueued' ) ) {
            wp_dequeue_style( $handle );
        }
        if ( wp_style_is( $handle, 'registered' ) ) {
            wp_deregister_style( $handle );
        }

        // Eliminar cualquier CSS inline añadido con wp_add_inline_style (extra['after'])
        global $wp_styles;
        if ( isset( $wp_styles->registered[ $handle ] ) ) {
            if ( ! empty( $wp_styles->registered[ $handle ]->extra['after'] ) ) {
                $wp_styles->registered[ $handle ]->extra['after'] = array();
            }
        }
    }
}

// Ejecutar en un hook muy tardío para capturar estilos encolados por plugins/cores tardíos
add_action( 'wp_print_styles', function() {
    $handles = array(
        'wp-block-library',
        'wp-block-library-theme',
        'wp-block-style',
        'classic-theme-styles',
        'global-styles',
        'wp-block-image-inline-css',
        'wc-block-style',
    );
    foreach ( $handles as $h ) {
        ignite_force_remove_style( $h );
    }
}, 9999 );

// Para el editor de bloques en admin: ejecutar también en admin_print_styles
add_action( 'admin_print_styles', function() {
    $handles = array(
        'wp-block-library',
        'wp-block-library-theme',
        'wp-block-style',
        'classic-theme-styles',
        'global-styles',
        'wp-block-image-inline-css',
    );
    foreach ( $handles as $h ) {
        ignite_force_remove_style( $h );
    }
}, 9999 );
