<?php
get_header();
?>

<main id="site-content">
    <header class="search-header">
        <h1 class="search-title"><?php printf( esc_html__( 'Search Results for: %s', 'ignite-theme' ), get_search_query() ); ?></h1>
    </header>

    <?php if ( have_posts() ) : ?>
        <?php while ( have_posts() ) : the_post(); ?>
            <?php get_template_part( 'template-parts/content', get_post_type() ); ?>
        <?php endwhile; ?>
        <?php the_posts_pagination(); ?>
    <?php else : ?>
        <p><?php esc_html_e( 'No results found.', 'ignite-theme' ); ?></p>
    <?php endif; ?>
</main>

<?php
get_footer();
