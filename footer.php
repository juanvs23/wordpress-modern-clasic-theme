    <footer class="site-footer bg-soft">
        <div class="ignite-container py-50">
            <?php if ( is_active_sidebar( 'media-section-1' ) || is_active_sidebar( 'media-section-2' ) || is_active_sidebar( 'media-section-3' ) || is_active_sidebar( 'media-section-4' ) || is_active_sidebar( 'media-section-5' ) ) : ?>
                <div class="footer-media-section grid grid-cols-1 md:grid-cols-5 gap-24 mb-50">
                    <?php for ( $m = 1; $m <= 5; $m++ ) : ?>
                        <div class="media-col">
                            <?php if ( is_active_sidebar( 'media-section-' . $m ) ) : ?>
                                <?php dynamic_sidebar( 'media-section-' . $m ); ?>
                            <?php endif; ?>
                        </div>
                    <?php endfor; ?>
                </div>
            <?php endif; ?>

            <?php if ( is_active_sidebar( 'footer-1' ) || is_active_sidebar( 'footer-2' ) || is_active_sidebar( 'footer-3' ) || is_active_sidebar( 'footer-4' ) || is_active_sidebar( 'footer-5' ) ) : ?>
                <div class="footer-widgets grid grid-cols-1 md:grid-cols-5 gap-24 mb-44">
                    <?php for ( $f = 1; $f <= 5; $f++ ) : ?>
                        <div class="footer-col">
                            <?php if ( is_active_sidebar( 'footer-' . $f ) ) : ?>
                                <?php dynamic_sidebar( 'footer-' . $f ); ?>
                            <?php endif; ?>
                        </div>
                    <?php endfor; ?>
                </div>
            <?php endif; ?>

            <div class="footer-bottom bg-white radius-8 py-16 px-24">
                <div class="flex items-center justify-between">
                    <div class="footer-bottom-left">
                        <?php if ( is_active_sidebar( 'footer-bottom-copyright' ) ) : ?>
                            <?php dynamic_sidebar( 'footer-bottom-copyright' ); ?>
                        <?php else : ?>
                            <p class="mb-0">&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>.</p>
                        <?php endif; ?>
                    </div>

                    <div class="footer-bottom-right text-soft">
                        <?php
                        // Placeholder for possible social links or small print — can be populated via widget.
                        if ( is_active_sidebar( 'footer-bottom-right' ) ) {
                            dynamic_sidebar( 'footer-bottom-right' );
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
