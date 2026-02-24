<?php
get_header();
?>

<main id="site-content">
    <section class="error-404 not-found">
        <header class="page-header">
            <h1 class="page-title"><?php esc_html_e( '404 — Page not found', 'ignite-theme' ); ?></h1>
        </header>

        <div class="page-content">
            <p><?php esc_html_e( 'Sorry, the page you are looking for does not exist. Try searching:', 'ignite-theme' ); ?></p>
            <?php get_search_form(); ?>
        </div>
    </section>
</main>

<?php
get_footer();
