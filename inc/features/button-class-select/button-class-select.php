<?php
/**
 * Button Class Select - Theme feature
 * Ubicado en inc/features para seguir la arquitectura "scream"
 */

defined( 'ABSPATH' ) || exit;

function nt_button_class_select_enqueue() {
    $dir = get_template_directory();
    $uri = get_template_directory_uri();
    $script_path = '/inc/features/button-class-select/index.js';

    wp_register_script(
        'nt-button-class-select',
        $uri . $script_path,
        array( 'wp-hooks', 'wp-element', 'wp-components', 'wp-blocks', 'wp-editor' ),
        filemtime( $dir . $script_path )
    );

    wp_enqueue_script( 'nt-button-class-select' );
}
add_action( 'enqueue_block_editor_assets', 'nt_button_class_select_enqueue' );
