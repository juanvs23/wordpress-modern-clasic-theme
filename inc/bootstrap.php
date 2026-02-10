<?php
/**
 * Bootstrap del tema (inc) - carga las características organizadas por dominio
 */

// Load folder-level bootstraps. Each folder has a loader file named like the folder
$loaders = [
    '/inc/scripts/scripts.php',
    '/inc/filters/filters.php',
    '/inc/features/features.php',
    '/inc/functions/functions.php',
    '/inc/extras/extras.php',
    '/inc/setups/setups.php',
    '/inc/hooks/hooks.php',
];

foreach ( $loaders as $loader ) {
    $path = get_template_directory() . $loader;
    if ( file_exists( $path ) ) {
        require_once $path;
    }
}
