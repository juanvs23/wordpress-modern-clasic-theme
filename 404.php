<?php
get_header();
?>

<main id="site-content">
    <section class="error-404 not-found">
        <header class="page-header">
            <h1 class="page-title"><?php esc_html_e( '404 — Página no encontrada', 'ignite-theme' ); ?></h1>
        </header>

        <div class="page-content">
            <p><?php esc_html_e( 'Lo siento, la página que buscas no existe. Prueba la búsqueda:', 'ignite-theme' ); ?></p>
            <?php get_search_form(); ?>
        </div>
    </section>
</main>

<?php
get_footer();
