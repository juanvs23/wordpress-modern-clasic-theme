<?php
/**
 * Enqueue block editor script for Group AOS feature
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'enqueue_block_editor_assets', function() {
    $handle = 'nuevo-theme-group-aos-editor';
    $path   = '/inc/features/group-aos/index.js';
    $file   = get_template_directory() . $path;

    if ( ! file_exists( $file ) ) {
        return;
    }

    $ver = filemtime( $file );

    wp_register_script(
        $handle,
        get_template_directory_uri() . $path,
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-hooks', 'wp-i18n' ),
        $ver,
        true
    );

    wp_enqueue_script( $handle );
} );
