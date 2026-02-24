<?php
/**
 * Loader for `inc/scripts` - explicitly require asset files
 *
 * NOTE: Dynamic autoloading is not used to keep manual control
 * over which files are loaded. Add `require_once` entries here using `__DIR__`.
 */

// Explicit enqueue/dequeue includes
if ( file_exists( __DIR__ . '/enqueue.php' ) ) {
    require_once __DIR__ . '/enqueue.php';
}

if ( file_exists( __DIR__ . '/dequeue.php' ) ) {
    require_once __DIR__ . '/dequeue.php';
}

