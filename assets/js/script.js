(function($){
    $(function(){
        console.log('The Hills child theme loaded');
    });
})(jQuery);
document.addEventListener('DOMContentLoaded', function () {
    const termItems = document.querySelectorAll('.term-list-items');
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(function(card) {
       
        const button = card.querySelector('.button-section button');
        if(button){
            
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-targetid');
                console.log(targetId);
                const modal = document.getElementById(targetId);
                if(modal) {
                    modal.classList.add('active');
                    const closeButton = modal.querySelector('.modal-close');
                    closeButton.addEventListener('click', function() {
                        modal.classList.remove('active');
                    });
                }
            })
        }
    })
    // Initialize Swiper carousels

    AOS.init();



    termItems.forEach(function(termItem) {
        const termlistitems = termItem.querySelectorAll('.term-list-item');
        const readminTriger = termItem.querySelector('.term-accordeom-title');

        readminTriger.addEventListener('click', function() {
            const openText = this.getAttribute('data-open');
            const closeText = this.getAttribute('data-close');
            const limit = parseInt(this.getAttribute('data-limit'), 10);
            termItem.classList.toggle('expanded');

            if (termItem.classList.contains('expanded')) {
                this.textContent = closeText;
                termlistitems.forEach(function(item) {
                    item.classList.remove('hidden-term');
                });
            } else {
                this.textContent = openText;
                termlistitems.forEach(function(item, index) {
                    if(index > limit - 1){ 
                        item.classList.add('hidden-term');
                    }
                });
            }
        })
    })
});

window.addEventListener('load', function() {
    baguetteBox.run('.the-hills-gallery-photoswipe-home',{
      animation: 'fadeIn',
      noScrollbars: true,
      buttons: true,
    });
    // BaguetteBox may change DOM layout; refresh AOS after lightbox init
    if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
        AOS.refresh();
    }
    if(document.readyState === 'complete') {
        AOS.refresh();
    }
    document.querySelectorAll('.wp-block-group').forEach(function(link) {
       
            setTimeout(function() {
                console.log('object');
                AOS.refresh();
            }, 100);
      
    });
});

