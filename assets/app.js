$(document).ready(function(){
    $('.slider').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    });

    // Get the modal and iframe
    var youtubeModal = $('#youtubeModal');
    var youtubeIframe = $('#youtubeIframe');

    // Add event listener to set the video URL dynamically
    youtubeModal.on('show.bs.modal', function(event) {
        // Get the button that triggered the modal
        var button = $(event.relatedTarget);
        // Extract the video URL from the data attribute
        var videoUrl = button.data('video-url');
        // Set the iframe src to the video URL with autoplay
        youtubeIframe.attr('src', videoUrl + '?autoplay=1');
    });

    // Add event listener to clear the video URL when the modal closes
    youtubeModal.on('hidden.bs.modal', function() {
        youtubeIframe.attr('src', '');
    });
});