<?php
/**
 * Ignite Theme - funciones y carga de módulos
 * @package Igni
 */

if ( ! defined( 'IGNITE_VERSION' ) ) {
    define( 'IGNITE_VERSION', '1.0.0' );
}

if ( ! defined( 'IGNITE_DIR' ) ) {
    define( 'IGNITE_DIR', get_template_directory() );
}

if ( ! defined( 'IGNITE_URI' ) ) {
    define( 'IGNITE_URI', get_template_directory_uri() );
}

if ( ! defined( 'IGNITE_ASSETS_URI' ) ) {
    define( 'IGNITE_ASSETS_URI', IGNITE_URI . '/assets' );
}

if ( ! defined( 'IGNITE_STYLE_URI' ) ) {
    define( 'IGNITE_STYLE_URI', IGNITE_ASSETS_URI . '/css/style.css' );
}

/* Cargar módulos */
// Bootstrap centralizado que carga features organizadas por dominio (ubicado en `inc`)
require_once IGNITE_DIR . '/inc/bootstrap.php';
