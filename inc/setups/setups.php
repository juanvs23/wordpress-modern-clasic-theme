<?php
/**
 * Loader de `inc/setups` - require explícito de configuraciones del tema
 *
 * No se hace autoload; añadir aquí `require_once __DIR__ . '/archivo.php'`
 * para cada módulo de setup que quieras cargar manualmente.
 */

if ( file_exists( __DIR__ . '/theme-setup.php' ) ) {
    require_once __DIR__ . '/theme-setup.php';
}

