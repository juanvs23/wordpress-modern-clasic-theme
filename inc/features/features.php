<?php
/**
 * Loader de `inc/features` - incluye módulos de funcionalidad (post types, shortcodes, etc.)
 */

$dir = get_template_directory() . '/inc/features';
// NO AUTOLOAD: añade módulos manualmente con require_once y __DIR__
// Ejemplo:
// if ( file_exists( __DIR__ . '/services/posttype.php' ) ) {
//     require_once __DIR__ . '/services/posttype.php';
// }

