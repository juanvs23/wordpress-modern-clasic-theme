<?php
/**
 * Loader for `inc/setups` - explicit requires for theme setups
 *
 * There is no autoloading; add `require_once __DIR__ . '/file.php'`
 * for each setup module you want to load manually.
 */

if ( file_exists( __DIR__ . '/theme-setup.php' ) ) {
    require_once __DIR__ . '/theme-setup.php';
}

