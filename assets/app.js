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

    $('.details-page-slider').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: false,
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

$(document).ready(function() {
    const images = $('.lightbox-image-container img');
    const viewMore = $('.view-more');
    const gridModal = $('#gridModal');
    const singleImageModal = $('#singleImageModal');
    const modalImageGrid = $('.modal-image-grid');
    const singleModalImage = $('#singleModalImage');
    const prevButton = $('#prevButton');
    const nextButton = $('#nextButton');
    const imageCounter = $('#imageCounter');
    let currentIndex = 0;

    if (images.length > 3) {
        viewMore.show();
    }

    viewMore.click(function() {
        updateGridModal();
        gridModal.modal('show');
    });

    images.click(function() {
        currentIndex = $(this).data('index');
        updateGridModal();
        gridModal.modal('show');
    });

    function updateGridModal() {
        modalImageGrid.empty();
        images.each(function() {
            const img = $(this).clone().removeClass('d-none').attr('data-index', $(this).data('index'));
            modalImageGrid.append(img);
        });
        modalImageGrid.find('img').click(function() {
            currentIndex = $(this).data('index');
            updateSingleModalImage();
            singleImageModal.modal('show');
        });
    }

    function updateSingleModalImage() {
        const imgSrc = images.eq(currentIndex).attr('src');
        singleModalImage.attr('src', imgSrc);

        // Preload image to prevent flickering
        const img = new Image();
        img.src = imgSrc;
        img.onload = function() {
            singleModalImage.attr('src', imgSrc);
            updateImageCounter();
        };
    }

    function updateImageCounter() {
        imageCounter.text(`${currentIndex + 1}/${images.length}`);
    }

    prevButton.click(function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSingleModalImage();
    });

    nextButton.click(function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSingleModalImage();
    });
});