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

function nt_button_class_select_render_button( $block_content, $block ) {
    if ( empty( $block['attrs'] ) || ! is_array( $block['attrs'] ) ) {
        return $block_content;
    }

    $attrs      = $block['attrs'];
    $variant    = isset( $attrs['ntVariant'] ) ? (string) $attrs['ntVariant'] : 'variant-1';
    $before_url = isset( $attrs['ntImageBeforeURL'] ) ? esc_url( (string) $attrs['ntImageBeforeURL'] ) : '';
    $after_url  = isset( $attrs['ntImageAfterURL'] ) ? esc_url( (string) $attrs['ntImageAfterURL'] ) : '';
    $extra      = isset( $attrs['classType'] ) ? sanitize_html_class( (string) $attrs['classType'] ) : '';

    if ( '' === $before_url && '' === $after_url && '' === $extra ) {
        return $block_content;
    }

    if ( false === strpos( $block_content, 'wp-block-button__link' ) ) {
        return $block_content;
    }

    $before_html = '';
    $after_html  = '';

    if ( in_array( $variant, array( 'variant-2', 'variant-4' ), true ) && '' !== $before_url ) {
        $before_html = '<img src="' . esc_url( $before_url ) . '" alt="" class="nt-btn-image nt-image-before" />';
    }

    if ( in_array( $variant, array( 'variant-3', 'variant-4' ), true ) && '' !== $after_url ) {
        $after_html = '<img src="' . esc_url( $after_url ) . '" alt="" class="nt-btn-image nt-image-after" />';
    }

    if ( '' === $extra && '' === $before_html && '' === $after_html ) {
        return $block_content;
    }

    $updated = preg_replace_callback(
        '/<(a|button)([^>]*)class="([^"]*wp-block-button__link[^"]*)"([^>]*)>(.*?)<\/\1>/is',
        function( $matches ) use ( $before_html, $after_html, $extra ) {
            $tag       = $matches[1];
            $before    = $matches[2];
            $class_str = $matches[3];
            $after     = $matches[4];
            $inner     = $matches[5];

            if ( '' !== $extra && false === strpos( ' ' . $class_str . ' ', ' ' . $extra . ' ' ) ) {
                $class_str .= ' ' . $extra;
            }

            if ( ( '' !== $before_html || '' !== $after_html ) && false !== strpos( $inner, 'nt-btn-image' ) ) {
                return '<' . $tag . $before . 'class="' . trim( $class_str ) . '"' . $after . '>' . $inner . '</' . $tag . '>';
            }

            return '<' . $tag . $before . 'class="' . trim( $class_str ) . '"' . $after . '>' . $before_html . $inner . $after_html . '</' . $tag . '>';
        },
        $block_content,
        1
    );

    return is_string( $updated ) ? $updated : $block_content;
}
add_filter( 'render_block_core/button', 'nt_button_class_select_render_button', 10, 2 );
