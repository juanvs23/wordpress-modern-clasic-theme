<?php
/**
 * Feature: Group AOS
 *
 * Adds server-side support for `aos` attribute on `core/group` blocks
 * and ensures a small safety loader. The editor UI and attribute
 * registration are implemented in the editor script (enqueued from
 * `inc/scripts/enqueue-group-aos.php`).
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
if(file_exists(__DIR__ . '/enqueue-group-aos.php')){
    require_once __DIR__ . '/enqueue-group-aos.php';
}

// Lightweight marker hook to ensure the feature is loaded on theme setup if needed.
add_action( 'after_setup_theme', function() {
    // Intentionally empty: editor script is enqueued from inc/scripts.
} );

// Ensure server-rendered output includes the data-aos attribute when present
add_filter( 'render_block', function( $block_content, $block ) {
    if ( ! isset( $block['blockName'] ) || 'core/group' !== $block['blockName'] ) {
        return $block_content;
    }

    $attrs = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : array();

    $data = array();

    if ( ! empty( $attrs['aos'] ) ) {
        $data[] = 'data-aos="' . esc_attr( $attrs['aos'] ) . '"';
    }
    if ( isset( $attrs['aos_offset'] ) ) {
        $data[] = 'data-aos-offset="' . intval( $attrs['aos_offset'] ) . '"';
    }
    if ( isset( $attrs['aos_delay'] ) ) {
        $data[] = 'data-aos-delay="' . intval( $attrs['aos_delay'] ) . '"';
    }
    if ( isset( $attrs['aos_duration'] ) ) {
        $data[] = 'data-aos-duration="' . intval( $attrs['aos_duration'] ) . '"';
    }
    if ( ! empty( $attrs['aos_easing'] ) ) {
        $data[] = 'data-aos-easing="' . esc_attr( $attrs['aos_easing'] ) . '"';
    }
    if ( isset( $attrs['aos_once'] ) ) {
        $data[] = 'data-aos-once="' . ( $attrs['aos_once'] ? 'true' : 'false' ) . '"';
    }
    if ( isset( $attrs['aos_mirror'] ) ) {
        $data[] = 'data-aos-mirror="' . ( $attrs['aos_mirror'] ? 'true' : 'false' ) . '"';
    }
    if ( ! empty( $attrs['aos_anchor_placement'] ) ) {
        $data[] = 'data-aos-anchor-placement="' . esc_attr( $attrs['aos_anchor_placement'] ) . '"';
    }

    if ( empty( $data ) ) {
        return $block_content;
    }

    $inject = ' ' . implode( ' ', $data );

    // Inject attributes into the first opening tag
    $block_content = preg_replace_callback( '/<([a-zA-Z0-9_-]+)([^>]*)>/', function( $m ) use ( $inject ) {
        return '<' . $m[1] . $m[2] . $inject . '>';
    }, $block_content, 1 );

    return $block_content;
}, 10, 2 );


// Enqueue must be handled from `inc/scripts` loader per PROJECT_CONTEXT.md

