<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <header class="site-header">
        <div class="container flex items-center justify-between py-16">
            <div class="site-branding flex items-center gap-16">
                <?php if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) : ?>
                    <div class="site-logo">
                        <?php the_custom_logo(); ?>
                    </div>
                <?php else : ?>
                    <div class="site-title-wrap">
                        <a class="site-title h3 bold text-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>
                        <p class="site-description text-soft"><?php bloginfo( 'description' ); ?></p>
                    </div>
                <?php endif; ?>
            </div>
            <div class="site-actions">
                <?php if ( has_nav_menu( 'primary' ) ) : ?>
                    <nav class="primary-navigation" role="navigation" aria-label="Primary Menu">
                        <?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'menu_class' => 'primary-menu flex gap-8' ) ); ?>
                    </nav>
                <?php endif; ?>
            </div>
        </div>
    </header>
