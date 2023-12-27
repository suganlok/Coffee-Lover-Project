$(window).on("load", function() {
    // Preload
    $("#preload").fadeOut(500);
});

jQuery(document).ready(function() {

    // Carousel special dishes
    $('.carousel-special-dishes').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        autoplay: true,
        smartSpeed: 2000,
        navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });

    // MagnificPopup video about us
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Tabs menu
    $('.wrapp-menu-item > .menu-item').not(':first-of-type').hide();
    $('.list-menu  li a').each(function(i) {
        $(this).attr('data-tab', 'tab' + i);
    });
    $('.wrapp-menu-item > .menu-item').each(function(i) {
        $(this).attr('data-tab', 'tab' + i);
    });

    $('.list-menu li:first-child a').addClass('active');

    $('.list-menu li a').on('click', function(e) {
        e.preventDefault();
        var datatab = $(this).data('tab');
        $('.list-menu li a').removeClass('active');
        $(this).addClass('active');
        $('.wrapp-menu-item > .menu-item').fadeOut();
        $('.wrapp-menu-item > .menu-item[data-tab=' + datatab + ']').fadeIn();
    });

    // MagnificPopup zoom gallery
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',

        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });

    // Scroll top button
    $('#scroll-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });
    $('#scroll-top').hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        }
    });

    // Scroll fixed menu
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 100) {
            $('#header').addClass('bg-fixed-menu')
        } else {
            $('#header').removeClass('bg-fixed-menu');
        }
    });

    // Scroll menu
    $(".menu").on("click", "a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1500);
    });
    $("#logo, .booking-scroll").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1500);
    });

    // Mobile menu
    $('#openmenu').click(function(e) {
        e.preventDefault();
        $('#nav').animate({
            'left': '0px'
        }, 800);
    });
    $('#closemenu').click(function(e) {
        e.preventDefault();
        $('#nav').animate({
            'left': '-320px'
        }, 800);
    });
    $(".menu li a, #logo, .booking-scroll").on("click", function() {
        $("#nav").animate({
            'left': '-320px'
        }, 500);
    });

    // ajax  send form 
    $("#send").click(function(e) {
        e.preventDefault();
        var name = $('input[name="name"]').val();
        var lastname = $('input[name="lastname"]').val();
        var phone = $('input[name="phone"]').val();
        var email = $('input[name="email"]').val();
        var dates = $('input[name="dates"]').val();
        var times = $('input[name="times"]').val();
        if (name == '' || lastname == '' || phone == '' || email == '' || dates == '' || times == '') {
            $('.result').fadeIn().html('<span class="error">All fields must be filled.</span>');
            $('input').focus(function() {
                $('.result').fadeOut();
            });
        } else {
            $.ajax({

                url: '../booking.php',
                type: 'POST',
                data: {
                    name: name,
                    lastname: lastname,
                    phone: phone,
                    email: email,
                    dates: dates,
                    times: times
                },
                dataType: 'html',
                success: function(data) {

                    if (data == 'send') {
                        $('.result').fadeIn().html('<span class="send">Thanks for booking. We will contact you shortly.</span>');

                        $('input[name="name"]').val('');
                        $('input[name="lastname"]').val('');
                        $('input[name="phone"]').val('');
                        $('input[name="email"]').val('');
                        $('input[name="dates"]').val('');
                        $('input[name="times"]').val('');
                    }
                }

            });
        }

    });


}); // end ready