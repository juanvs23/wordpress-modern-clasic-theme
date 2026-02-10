<?php
/**
 * Enqueue front-end assets (CSS & JS) - centralizado en `inc/scripts`
 */

if ( ! function_exists( 'ignite_enqueue_assets' ) ) {
    function ignite_enqueue_assets() {
        $css_file = get_template_directory() . '/assets/css/style.css';
        $css_uri  = get_template_directory_uri() . '/assets/css/style.css';

        if ( file_exists( $css_file ) ) {
            wp_enqueue_style( 'ignite-style', $css_uri, array(), filemtime( $css_file ) );
        } else {
            wp_enqueue_style( 'ignite-style', $css_uri, array(), '1.0.0' );
        }

        // Ejemplo de encolado de scripts / librerías (ajustar según assets disponibles)
        $js_uri = get_template_directory_uri() . '/assets/js';

        // Encolar librería externa incluida en assets/libs si existe
        if ( file_exists( get_template_directory() . '/assets/libs/slick/slick.min.js' ) ) {
            wp_enqueue_script( 'slick', $js_uri . '/libs/slick/slick.min.js', array( 'jquery' ), '1.8.1', true );
        }

        // Script principal del tema
        if ( file_exists( get_template_directory() . '/assets/js/main.js' ) ) {
            wp_enqueue_script( 'ignite-main', $js_uri . '/main.js', array( 'jquery' ), filemtime( get_template_directory() . '/assets/js/main.js' ), true );
        }
    }
}
add_action( 'wp_enqueue_scripts', 'ignite_enqueue_assets' ,99999);
