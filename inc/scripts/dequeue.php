<?php
/**
 * Dequeue/Remove front-end styles and scripts que no queremos cargar
 * Centralizado en `inc/scripts`
 */

if ( ! function_exists( 'nuevo_dequeue_unwanted_assets' ) ) {
    function nuevo_dequeue_unwanted_assets() {
        // Gutenberg/block CSS (front-end)
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'wp-block-library-theme' );
        wp_dequeue_style( 'wp-block-style' );
        wp_dequeue_style( 'classic-theme-styles' );
        wp_dequeue_style( 'global-styles' );

        // WooCommerce block styles
        wp_dequeue_style( 'wc-block-style' );

        // Ejemplo: remover jquery Migrate si lo deseas
        wp_deregister_script( 'jquery-migrate' );
    }
}
add_action( 'wp_enqueue_scripts', 'nuevo_dequeue_unwanted_assets', 100 );

// También quitar estilos/scripts que cargue el editor de bloques (block editor)
if ( ! function_exists( 'nuevo_dequeue_block_editor_assets' ) ) {
    function nuevo_dequeue_block_editor_assets() {
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'wp-block-library-theme' );
        wp_dequeue_style( 'wp-block-style' );
        wp_dequeue_style( 'classic-theme-styles' );
        wp_dequeue_style( 'global-styles' );
        wp_dequeue_script( 'wp-edit-blocks' );
    }
}
add_action( 'enqueue_block_editor_assets', 'nuevo_dequeue_block_editor_assets', 100 );
