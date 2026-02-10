<?php
get_header();
?>

<main id="site-content">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/content', get_post_type() );
            if ( comments_open() || get_comments_number() ) {
                comments_template();
            }
        endwhile;
    endif;
    ?>
</main>

<?php
get_footer();
