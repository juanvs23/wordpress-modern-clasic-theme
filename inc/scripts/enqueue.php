<?php
/**
 * Enqueue front-end assets (CSS & JS) - centralizado en `inc/scripts`
 */

if ( ! function_exists( 'ignite_enqueue_assets' ) ) {
    function ignite_enqueue_assets() {
         $handle = 'ignite_';
        $assets_url = trailingslashit(IGNITE_ASSETS_URI);

        //fonts
        wp_enqueue_style( $handle . 'fonts', $assets_url . 'css/fonts.css', array(),IGNITE_VERSION );
        //general
        wp_enqueue_style( $handle . 'child-style', $assets_url . 'css/general.css', array(  $handle . 'fonts' ),IGNITE_VERSION );
        //layout
        wp_enqueue_style($handle . 'layout-style', $assets_url . 'css/layout.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //radius
        wp_enqueue_style($handle . 'radius-style', $assets_url . 'css/radius.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //margins
        wp_enqueue_style($handle . 'margins-style', $assets_url . 'css/margins.css', array( $handle . 'child-style' ),IGNITE_VERSION ); 
        //paddiings (typo in filename kept as-is)
        wp_enqueue_style($handle . 'paddiings-style', $assets_url . 'css/paddiings.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //colors
        wp_enqueue_style( $handle .'colors', $assets_url . 'css/colors.css', array( $handle . 'child-style' ), IGNITE_VERSION);
        //borders
        wp_enqueue_style($handle . 'borders-style', $assets_url . 'css/borders.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //buttons
        wp_enqueue_style($handle . 'buttons-style', $assets_url . 'css/buttons.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //carusels
        wp_enqueue_style($handle . 'carusels-style', $assets_url . 'css/carousels.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //font-sizes
        wp_enqueue_style($handle . 'font-sizes-style', $assets_url . 'css/font-sizes.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //utilities
        wp_enqueue_style($handle . 'utilities', $assets_url . 'css/utilities.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //style
        wp_enqueue_style($handle . 'style', $assets_url . 'css/style.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //gaps
        wp_enqueue_style($handle . 'gaps-style', $assets_url . 'css/gaps.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //positions
        wp_enqueue_style($handle . 'positions-style', $assets_url . 'css/positions.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        //heights
        wp_enqueue_style($handle . 'heights-style', $assets_url . 'css/heights.css', array( $handle . 'child-style' ),IGNITE_VERSION );
        // menu
        wp_enqueue_style( $handle . 'menu-style', $assets_url . 'css/menu.css', array( $handle . 'child-style' ),IGNITE_VERSION );

        /*libs*/
        //swiper
        wp_enqueue_style( $handle . 'slick-style', $assets_url . 'libs/slick/slick.min.css', array(),IGNITE_VERSION );
        wp_enqueue_script( $handle . 'slick-script', $assets_url . 'libs/slick/slick.min.js', array( 'jquery' ),IGNITE_VERSION, [
            'defer' => true,
            'in_footer' => true,
        ] );
        wp_enqueue_style($handle.'-carousel', $assets_url . '/css/carousels.css', array( $handle . 'slick-style' ),IGNITE_VERSION );
        wp_enqueue_script( $handle.'-carrusels', $assets_url . '/js/carrusels.js',  [$handle . 'slick-script'], IGNITE_VERSION, [
            'defer' => true,
            'in_footer' => true,
        ] );
        //aos
        wp_enqueue_style( $handle . 'aos-style', $assets_url . 'libs/aos/aos.css', array(),IGNITE_VERSION );
        wp_enqueue_script( $handle . 'aos-script', $assets_url . 'libs/aos/aos.js', array( 'jquery' ),IGNITE_VERSION, [
            'defer' => true,
            'in_footer' => true,
        ] );
        //baguettebox
        wp_enqueue_style( $handle . 'baguettebox-style', $assets_url . 'libs/baguettebox/baguetteBox.min.css', array(),IGNITE_VERSION );
        wp_enqueue_script( $handle . 'baguettebox-script', $assets_url . 'libs/baguettebox/baguetteBox.min.js', array( 'jquery' ),IGNITE_VERSION, [
            'defer' => true,
            'in_footer' => true,
        ] );
        //accordeons
        wp_enqueue_script( $handle . 'accordeons-script', $assets_url . 'js/accordeon.js', array( 'jquery' ),IGNITE_VERSION, [
            'defer' => true,
            'in_footer' => true,
        ] );
         //accordeons
        wp_enqueue_script( $handle . 'menu-script', $assets_url . 'js/menu.js', array( 'jquery' ),IGNITE_VERSION, [
            'defer' => true,
            'in_footer' => true,
        ] );




        // Tailwind purged (heuristic output)
        wp_enqueue_script( $handle . 'child-script', $assets_url . 'js/script.js', array( 'jquery', $handle . 'aos-script', $handle . 'baguettebox-script'),IGNITE_VERSION,  [
            'defer' => true,
            'in_footer' => true,
        ]  );
    }
}
add_action( 'wp_enqueue_scripts', 'ignite_enqueue_assets' ,99999);
