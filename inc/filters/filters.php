<?php
/**
 * Filters loader in `inc/filters`.
 * All modules in the filters folder should be included here using `require_once`.
 */

defined( 'ABSPATH' ) || exit;

// Load svg-uploads if it exists
if ( file_exists( __DIR__ . '/svg-uploads.php' ) ) {
    require_once __DIR__ . '/svg-uploads.php';
}

// Add future filter inclusions from this folder here.

