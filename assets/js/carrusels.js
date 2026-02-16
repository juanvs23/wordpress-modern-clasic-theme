(function($){
    $(document).ready(function(){
        const carousleWrappers = $('.testimonials-carousels-wrapper')
        const postCarousleWrappers = $('.latest-post-carousels-wrapper')
        const singleCarruselWrappers = $('.single-carousel-wrapper')
        if(carousleWrappers.length){
            carousleWrappers.each(function(){
                const testimonialList = $(this).find('.testimonial-list');
                const testimonialCarousel = testimonialList.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    adaptiveHeight: true,
                });
                $(this).find('.testimonial-prev').on('click', function(){
                    testimonialList.slick('slickPrev');
                })
                $(this).find('.testimonial-next').on('click', function(){
                    testimonialList.slick('slickNext');
                })
            })
        }
        if(postCarousleWrappers.length){
            postCarousleWrappers.each(function(){
                const postList = $(this).find('.latest-post-list');
                const postCarousel = postList.slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    infinite: false,
                    autoplay: false,
                    autoplaySpeed: 5000,
                    adaptiveHeight: true,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 640,
                            settings: {
                                slidesToShow: 1,
                            }
                        }
                    ]
                });

                $(this).find('.latest-post-prev').on('click', function(){
                    postList.slick('slickPrev');
                })
                $(this).find('.latest-post-next').on('click', function(){
                    postList.slick('slickNext');
                })
                /// cuando el carrusel esta inicializado, revisar la altura de cada slide y colocar a todos los slides la altura maxima de todos los slides
                let maxHeight = 0;
                postList.find('.slick-slide').each(function(){
                    const slideHeight = $(this).outerHeight();
                    if(slideHeight > maxHeight){
                        maxHeight = slideHeight;
                    }
                });
                postList.find('.slick-slide').each(function(){
                    $(this).css('height', maxHeight + 'px');
                });
            });
                 
        }

        if(singleCarruselWrappers.length){
            singleCarruselWrappers.each(function(){
                let slides = 1;
                let withArrows = true;
                let withDots = true;
                let infinite = true; 
                let autoplay = true;   
                const singleList = $(this).find('.wp_carousel_single');
                if (singleList.length && singleList.hasClass('two-slide')) {
                    slides = 2;
                }
                 if (singleList.length && singleList.hasClass('three-slide')) {
                    slides = 3;
                }
                  if (singleList.length && singleList.hasClass('four-slide')) {
                    slides = 4;
                }
                if (singleList.length && singleList.hasClass('no-arrows')) {
                    withArrows = false;
                }
                if (singleList.length && singleList.hasClass('no-dots')) {
                    withDots = false;
                }
                if (singleList.length && singleList.hasClass('no-infinite')) {
                    infinite = false;
                }
                if (singleList.length && singleList.hasClass('no-autoplay')) {
                    autoplay = false;
                }


                singleList.slick({
                    slidesToShow: slides,
                    slidesToScroll: 1,
                    firsMobileItem: true,
                    dots: withDots,
                    arrows: withArrows,
                    prevArrow:`<button class="ignite-slick-button single-carousel-prev absolute top-p50 left-0 bg-white radius-full shadow-base ">
                   <svg xmlns="http://www.w3.org/2000/svg" width="13" height="21" viewBox="0 0 13 21" fill="none">
                        <path d="M4.94705e-07 10.5L10.982 21L13 19.0738L4.03026 10.5L13 1.92891L10.982 -8.82087e-08L4.94705e-07 10.5Z" fill="#0F382B"></path>
                    </svg>
                </button>`,
                    nextArrow:`<button class="ignite-slick-button single-carousel-next absolute top-p50 right-0 bg-white radius-full shadow-base ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="21" viewBox="0 0 13 21" fill="none">
                        <path d="M13 10.5L2.01798 2.40642e-08L2.27453e-07 1.92618L8.96974 10.5L2.3002e-08 19.0711L2.01798 21L13 10.5Z" fill="#0F382B"></path>
                    </svg>
                     
                </button>`,   
                    infinite: infinite,
                    autoplay: autoplay,
                    autoplaySpeed: 5000,
                    adaptiveHeight: false,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 640,
                            settings: {
                                slidesToShow: 1,
                            }
                        }
                    ]
                });
                   let maxHeight = 0;
                singleList.find('.slick-slide').each(function(){
                    const slideHeight = $(this).outerHeight();
                    if(slideHeight > maxHeight){
                        maxHeight = slideHeight;
                    }
                });
                singleList.find('.slick-slide').each(function(){
                    $(this).css('min-height', maxHeight + 'px');
                });
            });
        }
        // Thumbnail synced carousels
        const thumbCarousels = $('.ignite-carousel-thumbnail');
        if (thumbCarousels.length) {
            thumbCarousels.each(function(){
                const $wrap = $(this);
                const $main = $wrap.find('.carousel-main');
                const $thumbs = $wrap.find('.carousel-thumbs');

                if ($main.length && $thumbs.length) {
                    $main.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        asNavFor: $thumbs,
                        adaptiveHeight: true,
                        
                    });

                    $thumbs.slick({
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        asNavFor: $main,
                        focusOnSelect: true,
                        arrows: false,
                        infinite: false,
                        responsive: [
                            { breakpoint: 1024, settings: { slidesToShow: 4 } },
                            { breakpoint: 640, settings: { slidesToShow: 2 } }
                        ]
                    });
                }
            });
               // After initializing slick carousels, refresh AOS to recalculate positions
                    if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
                        AOS.refresh();
                    }
        }
    });
})(jQuery)