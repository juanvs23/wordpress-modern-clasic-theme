<?php
/**
 * Ignite Theme - funciones y carga de módulos
 * @package Igni
 */

if ( ! defined( 'NEW_THEME_VERSION' ) ) {
    define( 'NEW_THEME_VERSION', '1.0.0' );
}

if ( ! defined( 'NEW_THEME_DIR' ) ) {
    define( 'NEW_THEME_DIR', get_template_directory() );
}

if ( ! defined( 'NEW_THEME_URI' ) ) {
    define( 'NEW_THEME_URI', get_template_directory_uri() );
}

if ( ! defined( 'NEW_THEME_ASSETS_URI' ) ) {
    define( 'NEW_THEME_ASSETS_URI', NEW_THEME_URI . '/assets' );
}

if ( ! defined( 'NEW_THEME_STYLE_URI' ) ) {
    define( 'NEW_THEME_STYLE_URI', NEW_THEME_ASSETS_URI . '/css/style.css' );
}

/* Cargar módulos */
// Bootstrap centralizado que carga features organizadas por dominio (ubicado en `inc`)
require_once NEW_THEME_DIR . '/inc/bootstrap.php';
