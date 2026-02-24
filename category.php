<?php
get_header();

$category_title       = single_cat_title( '', false );
$category_description = category_description();
?>

<main id="site-content" class="ignite-section bg-soft">
    <div class="container">
        <header class="archive-header text-center mb-44">
            <h1 class="h2 bold text-primary mb-16"><?php echo esc_html( $category_title ); ?></h1>
            <?php if ( $category_description ) : ?>
                <p class="text-soft mx-auto max-w-full md:mx-w-800"><?php echo wp_kses_post( $category_description ); ?></p>
            <?php endif; ?>
        </header>

        <?php if ( have_posts() ) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-44">
                <?php while ( have_posts() ) : the_post(); ?>
                    <article <?php post_class( 'archive-card bg-white radius-16 shadow-base overflow-hidden flex flex-col' ); ?>>
                        <?php if ( has_post_thumbnail() ) : ?>
                            <a class="block overflow-hidden" href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail( 'large', array( 'class' => 'w-full h-150 object-cover' ) ); ?>
                            </a>
                        <?php endif; ?>

                        <div class="flex flex-col gap-16 p-24">
                            <span class="text-soft"><?php echo esc_html( get_the_date() ); ?></span>
                            <h2 class="h3 bold mt-0 mb-0">
                                <a class="text-primary hover:text-secondary transition" href="<?php the_permalink(); ?>">
                                    <?php the_title(); ?>
                                </a>
                            </h2>
                            <p class="text-soft">
                                <?php
                                $excerpt = wp_strip_all_tags( get_the_excerpt() );
                                echo esc_html( wp_trim_words( $excerpt, 30 ) );
                                ?>
                            </p>
                            <a class="the-hills-button-primary w-fit" href="<?php the_permalink(); ?>">
                                <?php esc_html_e( 'Leer más', 'ignite-theme' ); ?>
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <div class="archive-pagination mt-50 text-center">
                <?php
                the_posts_pagination(
                    array(
                        'mid_size'  => 1,
                        'prev_text' => esc_html__( 'Anterior', 'ignite-theme' ),
                        'next_text' => esc_html__( 'Siguiente', 'ignite-theme' ),
                    )
                );
                ?>
            </div>
        <?php else : ?>
            <p class="text-center text-soft"><?php esc_html_e( 'No posts found in this category.', 'ignite-theme' ); ?></p>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
