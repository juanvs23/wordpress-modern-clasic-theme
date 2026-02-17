<?php
/**
 * Loader de filtros en `inc/filters`.
 * Aquí se deben incluir (require_once) todos los módulos de la carpeta filters.
 */

defined( 'ABSPATH' ) || exit;

// Cargar svg-uploads si existe
if ( file_exists( __DIR__ . '/svg-uploads.php' ) ) {
    require_once __DIR__ . '/svg-uploads.php';
}

// Añadir aquí futuras inclusiones de filtros de la carpeta.

