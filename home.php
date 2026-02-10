<?php
/* Blog posts index */
get_header();
?>

<main id="site-content">
    <?php if ( have_posts() ) : ?>
        <?php while ( have_posts() ) : the_post(); ?>
            <?php get_template_part( 'template-parts/content', get_post_type() ); ?>
        <?php endwhile; ?>
        <?php the_posts_pagination(); ?>
    <?php else : ?>
        <p><?php esc_html_e( 'No posts found.', 'ignite-theme' ); ?></p>
    <?php endif; ?>
</main>

<?php
get_footer();
