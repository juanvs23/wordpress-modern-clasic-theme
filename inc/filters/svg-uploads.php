<?php
/**
 * Allow SVG uploads (no sanitization)
 * NOTE: SVG files are allowed without sanitization by explicit request.
 * Only use when uploads are trusted (e.g., internal designers).
 */

defined( 'ABSPATH' ) || exit;

/**
 * Add SVG mime types to allowed uploads.
 */
function nt_allow_svg_uploads( $mimes ) {
    $mimes['svg']  = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    return $mimes;
}
add_filter( 'upload_mimes', 'nt_allow_svg_uploads' );

/**
 * Ensure WordPress file type checks treat .svg/.svgz as images.
 * This helps avoid WP rejecting the file after upload.
 */
function nt_fix_svg_filetype( $data, $file, $filename, $mimes ) {
    $ext = pathinfo( $filename, PATHINFO_EXTENSION );
    if ( ! $ext ) {
        return $data;
    }
    $ext = strtolower( $ext );
    if ( in_array( $ext, array( 'svg', 'svgz' ), true ) ) {
        $data['ext']  = $ext;
        $data['type'] = 'image/svg+xml';
    }
    return $data;
}
add_filter( 'wp_check_filetype_and_ext', 'nt_fix_svg_filetype', 10, 4 );
