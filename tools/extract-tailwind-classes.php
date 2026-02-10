<?php
/**
 * Extract Tailwind classes from post_content and write a generated HTML file
 * Usage:
 *  - If WP-CLI is available: `wp eval-file tools/extract-tailwind-classes.php`
 *  - Otherwise: `php tools/extract-tailwind-classes.php` (the script will try to locate wp-load.php)
 */

// Try to locate WP bootstrap (wp-load.php) by walking up directories
$found = false;
$cwd = __DIR__;
for ($i = 0; $i < 8; $i++) {
    $candidate = $cwd . str_repeat('/..', $i) . '/wp-load.php';
    $candidate = realpath($candidate);
    if ($candidate && file_exists($candidate)) {
        require_once $candidate;
        $found = true;
        break;
    }
}

global $wpdb;
if ( ! isset( $wpdb ) ) {
    fwrite( STDERR, "Error: Could not find WP bootstrap (wp-load.php).\n" );
    fwrite( STDERR, "If you have WP-CLI installed run: wp eval-file tools/extract-tailwind-classes.php\n" );
    fwrite( STDERR, "Or run this script from a path inside a WordPress install where wp-load.php is reachable.\n" );
    exit(1);
}

$rows = $wpdb->get_col( "SELECT post_content FROM {$wpdb->posts} WHERE post_status IN ('publish','draft','private')" );
$classes = [];

foreach ( $rows as $html ) {
    if ( ! $html ) continue;
    if ( preg_match_all("/class\s*=\s*['\"]([^'\"]+)['\"]/i", $html, $m ) ) {
        foreach ( $m[1] as $clsString ) {
            $parts = preg_split('/\s+/', trim($clsString));
            foreach ( $parts as $p ) {
                if ( $p !== '' ) $classes[ $p ] = true;
            }
        }
    }
}

// Optional: include additional patterns or known dynamic classes
$extra = array(
    // 'wp-block-image',
);
foreach ( $extra as $e ) {
    $classes[ $e ] = true;
}

$unique = array_keys( $classes );
// Create a safe HTML file that contains all classes in a single element
$content = "<!-- generated for tailwind -->\n<div class=\"" . implode( ' ', $unique ) . "\"></div>\n";

$target_dir = __DIR__ . '/../src/tailwind';
if ( ! is_dir( $target_dir ) ) {
    wp_mkdir_p( $target_dir );
}
$target = $target_dir . '/generated.html';
file_put_contents( $target, $content );

fwrite( STDOUT, "Wrote " . count( $unique ) . " classes to $target\n" );
return 0;
