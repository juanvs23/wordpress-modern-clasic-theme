<?php
get_header();
?>

<main id="site-content">
    <header class="archive-header">
        <h1 class="archive-title"><?php the_archive_title(); ?></h1>
        <?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
    </header>

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
