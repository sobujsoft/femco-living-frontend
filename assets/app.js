$(document).ready(function(){
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
    });

    $('.hero-carousel').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
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

// Title type effect
$(document).ready(function () {
    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle the scroll event
    function handleScroll() {
        $('.section-title').each(function () {
            if (isElementInViewport(this) && !$(this).hasClass('visible')) {
                $(this).addClass('visible');

                // Get the text content of the title
                const text = $(this).text();
                $(this).text(''); // Clear the text

                // Initialize Typed.js for the write effect
                new Typed(this, {
                    strings: [text],
                    typeSpeed: 50, // Typing speed in milliseconds
                    showCursor: false, // Hide the cursor
                    onComplete: function () {
                        // Optional: Add any callback after the animation completes
                    }
                });
            }
        });
    }

    // Attach the scroll event listener
    $(window).on('scroll', handleScroll);

    // Trigger the scroll event on page load
    handleScroll();
});

// ********** Section fade animation ********** //
$(document).ready(function () {
    function revealOnScroll() {
        $(".fade-section").each(function () {
            let sectionPos = $(this).offset().top;
            let windowHeight = $(window).height();
            let scrollTop = $(window).scrollTop();

            if (sectionPos < scrollTop + windowHeight - 100) {
                $(this).css("opacity", "1");

                if ($(this).hasClass("fadeInLeft")) {
                    $(this).addClass("animate__animated animate__fadeInLeft");
                } else if ($(this).hasClass("fadeInRight")) {
                    $(this).addClass("animate__animated animate__fadeInRight");
                } else {
                    $(this).addClass("animate__animated animate__fadeInUp");
                }
            }
        });

        // .fade-section .fadeInLeft
        // .fade-section .fadeInRight
        // .fade-section .fadeInUp
    }

    $(window).on("scroll", revealOnScroll);
    revealOnScroll();
});

// ********* Phone Number QR Code ************ //
$("#showPhoneNumber").click(function () {
    var offcanvas = new bootstrap.Offcanvas(document.getElementById('openNumberQR'));
    offcanvas.show();
});