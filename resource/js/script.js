$(window).on('load', function () {
    // Loading ...
    $('body').removeClass('.preload');
    $('#loader').delay(400).fadeOut('fast');
});

$(document).ready(function () {
    // ================= Way point - nav sticky and scroll-top ================
    $('.services-section').waypoint(function (dicrection) {
        if (dicrection === 'down') {
            $('nav').addClass('nav-sticky');
            $('.scroll-top').css({
                'visibility': 'visible',
                'opacity': '1'
            });
        } else {
            $('nav').removeClass('nav-sticky');
            $('.scroll-top').css({
                'visibility': 'hidden',
                'opacity': '0'
            });
        }
    }, {
        offset: '0px'
    });

    // =========================== search button ==============================
    // open
    $('.search-button').on('click', function () {
        $('.search-form').css({
            'opacity': '1',
            'visibility': 'visible'
        });
    });
    // close
    $('.close-search').on('click', function () {
        $('.search-form').css({
            'opacity': '0',
            'visibility': 'hidden'
        });
    });

    // ============================ shop cart button =========================
    // open
    $('.bag-button').on('mouseenter', function () {
        $('.shop-cart').css({
            'opacity': '1',
            'visibility': 'visible'
        });
    });
    // close
    $('.bag-button').on('click', function () {
        $('.shop-cart').css({
            'opacity': '0',
            'visibility': 'hidden'
        });
    });
    $('.shop-cart').on('mouseleave', function () {
        $('.shop-cart').css({
            'opacity': '0',
            'visibility': 'hidden'
        });
    });

    // ======================== menu popup slide ============================
    $('.slide-icon').on('click', function () {
        $('.menu-popup').css('width', '450px');
    });
    $('.close-menu-icon').on('click', function () {
        $('.menu-popup').css('width', '0');
    });

    // ======================= mobile navigation icon =======================
    let windows = $(window);
    if (windows.width() < 1200) {
        $('.main-nav').attr('id', 'main-nav-mobile');
    }
    windows.resize(function () {
        let width = windows.width();
        if (width < 1200) {
            $('.main-nav').attr('id', 'main-nav-mobile');
        } else {
            $('.main-nav').attr('id', '');
        }
    });

    // ====================== dropdown navigation ============================
    var addDropdownIcon = function () {
        $('.menu-item-has-child').each(function () {
            let currentItem = $(this).find('.nav-link');
            let currentText = currentItem.text();
            currentItem.html(currentText + '<span class="icon-dropdown"><i class="fal fa-caret-down"></i></span>')
        });
    }
    if ($('.main-nav').attr('id') === 'main-nav-mobile') {
        addDropdownIcon();
    }
    windows.resize(function () {
        if (windows.width() <= 1200) {
            addDropdownIcon();
        } else {
            $('.icon-dropdown').css('display', 'none');
        }
    });

    // ======================= slide header ==================================
    //add id for slide and slide-dot
    $('.slide-item').each(function (index) {
        $(this).attr('id', index + 1);
    });
    $('.slide-dot li').each(function (index) {
        $(this).attr('id', index + 1);
    })

    // slide / slides
    var addIndexForPrevSlide = function () {
        let totalSlides = $('.slide-item').length;
        let currentIndex = $('.slide-item.active').attr('id');
        let Index = 1;
        if (parseInt(currentIndex) == 1) {
            Index = totalSlides;
        } else {
            Index = parseInt(currentIndex) - 1;
        }
        $('#prev-slide').text(Index + '/' + totalSlides);
    }

    var addIndexForNextSlide = function () {
        let totalSlides = $('.slide-item').length;
        let currentIndex = $('.slide-item.active').attr('id');
        let Index = 1;
        if (parseInt(currentIndex) == 3) {
            Index = 1;
        } else {
            Index = parseInt(currentIndex) + 1;
        }
        $('#next-slide').text(Index + '/' + totalSlides);
    }

    addIndexForPrevSlide();
    addIndexForNextSlide();

    // add animation for slide text
    var addAnimatedForSlideText = function () {
        let activeSlide = $('.slide-item.active .slide-text');
        activeSlide.find('h3').addClass('animated fadeInUp');
        activeSlide.find('h1').addClass('animated fadeInDown');
        activeSlide.find('p').addClass('animated fadeInUp');
        activeSlide.find('button').addClass('animated fadeInRight');
    }
    var removeAnimatedForSlideText = function () {
        let activeSlide = $('.slide-item.active .slide-text');
        activeSlide.find('h3').removeClass('animated fadeInUp');
        activeSlide.find('h1').removeClass('animated fadeInDown');
        activeSlide.find('p').removeClass('animated fadeInUp');
        activeSlide.find('button').removeClass('animated fadeInRight');
    }

    addAnimatedForSlideText();

    // next and prev button
    var toNextSlide = function () {
        let activeSlide = $('.slide-item.active');
        let nextSlide = activeSlide.next();
        let activeSlideDot = $('.slide-dot li.active');
        let nextSlideDot = activeSlideDot.next();

        if (nextSlide.length !== 0) {
            removeAnimatedForSlideText();
            activeSlide.addClass('fadeOut').one('webkitAnimationEnd', function () {
                $('.fadeOut').removeClass('fadeOut').removeClass('active');
            });

            nextSlide.addClass('fadeIn active').one('webkitAnimationEnd', function () {
                addAnimatedForSlideText();
                $('.fadeIn').removeClass('fadeIn');
                addIndexForPrevSlide();
                addIndexForNextSlide();
            });

            activeSlideDot.removeClass('active');
            nextSlideDot.addClass('active');
        } else {
            removeAnimatedForSlideText();
            activeSlide.addClass('fadeOut').one('webkitAnimationEnd', function () {
                $('.fadeOut').removeClass('fadeOut').removeClass('active');
            });
            $('.slide-item:first-child').addClass('fadeIn active').one('webkitAnimationEnd', function () {
                addAnimatedForSlideText();
                $('.fadeIn').removeClass('fadeIn');
                addIndexForPrevSlide();
                addIndexForNextSlide();
            });
            activeSlideDot.removeClass('active');
            $('.slide-dot li:first-child').addClass('active');
        }
    }
    var toPrevSlide = function () {
        let activeSlide = $('.slide-item.active');
        let prevSlide = activeSlide.prev();
        let activeSlideDot = $('.slide-dot li.active');
        let prevSlideDot = activeSlideDot.prev();
        if (prevSlide.length !== 0) {
            removeAnimatedForSlideText();
            activeSlide.addClass('fadeOut').one('webkitAnimationEnd', function () {
                $('.fadeOut').removeClass('fadeOut').removeClass('active');
            });
            prevSlide.addClass('fadeIn active').one('webkitAnimationEnd', function () {
                addAnimatedForSlideText();
                $('.fadeIn').removeClass('fadeIn');
                addIndexForPrevSlide();
                addIndexForNextSlide();
            });
            activeSlideDot.removeClass('active');
            prevSlideDot.addClass('active');
        } else {
            removeAnimatedForSlideText();
            activeSlide.addClass('fadeOut').one('webkitAnimationEnd', function () {
                $('.fadeOut').removeClass('fadeOut').removeClass('active');
            });
            $('.slide-item:last-child').addClass('fadeIn active').one('webkitAnimationEnd', function () {
                addAnimatedForSlideText();
                $('.fadeIn').removeClass('fadeIn');
                addIndexForPrevSlide();
                addIndexForNextSlide();
            });
            activeSlideDot.removeClass('active');
            $('.slide-dot li:last-child').addClass('active');
        }
    }
    var autoTurnSlide = function () {
        let idInterval = setInterval(() => {
            let rand = Math.random();
            if (rand < 0.5)
                toNextSlide();
            else
                toPrevSlide();
        }, 6000);
        windows.resize(function () {
            if (windows.width() >= 768)
                clearInterval(idInterval);
        });
    }

    $('#next-slide').on('click', function () {
        toNextSlide();
    });

    $('#prev-slide').on('click', function () {
        toPrevSlide();
    });

    autoTurnSlide();
    // Move slide with slide dot
    $('.slide-dot li').on('click', function () {
        $('.slide-dot li.active').removeClass('active');
        $(this).addClass('active');
        let id = $(this).attr('id');
        let activeSlide = $('.slide-item.active');
        let nextSlide = null;
        $('.slide-item').each(function () {
            if ($(this).attr('id') === id)
                nextSlide = $(this);
        });

        removeAnimatedForSlideText();
        activeSlide.addClass('fadeOut').one('webkitAnimationEnd', function () {
            $('.fadeOut').removeClass('fadeOut').removeClass('active');
        });

        nextSlide.addClass('fadeIn active').one('webkitAnimationEnd', function () {
            addAnimatedForSlideText();
            $('.fadeIn').removeClass('fadeIn');
            addIndexForPrevSlide();
            addIndexForNextSlide();
        });
    });

    // ============================== Scroll Top =================================
    $('a').on('click', function (event) {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
        event.preventDefault();
    });

    // =============================== Slick =====================================
    $('.slick-slide-cite').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slick-slide-figure-img, .slick-slide-figure-info',
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 1500
    });

    $('.slick-slide-figure-img').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: 0,
        asNavFor: '.slick-slide-cite, .slick-slide-figure-info',
        focusOnSelect: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.slick-slide-figure-info').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slick-slide-cite, .slick-slide-figure-img',
        focusOnSelect: true
    });

    // ============================ Date Picker =================================
    $('#datepicker').datetimepicker();

    var resizeDatepickder = function () {
        let inputWidth = $('#datepicker').outerWidth();
        let calendarWidth = $('.xdsoft_datepicker').outerWidth(true);
        let timeWidth = $('.xdsoft_timepicker').outerWidth(true);
        if (inputWidth < 310) {
            inputWidth = 310;
        }
        windows.resize(function () {
            inputWidth = $('#datepicker').outerWidth();
            calendarWidth = $('.xdsoft_datepicker').outerWidth(true);
            timeWidth = $('.xdsoft_timepicker').outerWidth(true);
        });
        let margin = (inputWidth - calendarWidth - timeWidth) / 2;
        let widthToString = 'width: ' + inputWidth.toString() + 'px !important';
        let marginToString = 'margin-left: ' + margin.toString() + 'px !important';
        $('.xdsoft_datetimepicker').css('cssText', widthToString);
        $('.xdsoft_datepicker').css('cssText', marginToString);
    }

    resizeDatepickder();
    windows.resize(function () {
        resizeDatepickder();
    });

    // ========================= Form Input - Service ==========================
    // dropdown
    let dropdownIcon = $('.dropdown-icon i');

    var flipUp = function () {
        $('.option-menu').animate({
            'opacity': '0',
            'height': '0'
        }, 500);
        dropdownIcon.removeClass('rotate').addClass('down');
    }
    var flipDown = function () {
        $('.option-menu').animate({
            'opacity': '1',
            'height': '156px'
        }, 500);
        dropdownIcon.removeClass('down').addClass('rotate');
    }

    dropdownIcon.on('click', function () {
        if (dropdownIcon.hasClass('down') === true) {
            flipDown();
        } else {
            flipUp();
        }
    });

    // select services
    let option = $('.option-menu .option');
    option.on('click', function () {
        $('.current-option').text($(this).text());
        $('.current-option').attr('data-value', $(this).attr('data-value'));
        if($('.current-option').attr('data-value') != '0')
            $('.current-option').css('color', '#000');  
        else
        $('.current-option').css('color', '#888');  
        flipUp();
    });

    // Form Validation
    let input = $('.form-input input');

    var isEmpty = function (item) {
        if (!item)
            return true;
        return false;
    }
    var isEmail = function (email) {
        let regex = /^([a-zA-Z0-9_])+\@(([a-zA-Z]{3,})+\.com)$/i;
        return regex.test(email);
    }
    var isPhoneNumber = function(phoneNumber){
        let regex = /^\d{10,11}$/
        return regex.test(phoneNumber);
    }
    var checkTypeOfServices = function(tOS){
        if(tOS.attr('data-value') == '0')
            return false;
        return true;
    }

    var onError = function (selector) {
        selector.next().css('display', 'block');
        selector.addClass('apply-shake').one('webkitAnimationEnd', function () {
            selector.removeClass('apply-shake')
        });
    }
    var onNoError = function (selector) {
        selector.next().css('display', 'none');
        selector.removeClass('apply-shake');
    }

    var validateForm = function () {
        // check empty
        input.each(function () {
            if (isEmpty($(this).val()))
                onError($(this));
            else 
                onNoError($(this));
        });
        // check email
        if(isEmail($('#email').val()))
            onNoError($('#email'));
        else
            onError($('#email'));
        // check phone number
        if(isPhoneNumber($('#phone-number').val()))
            onNoError($('#phone-number'));
        else
            onError($('#phone-number'));
        // check type of services
        if(checkTypeOfServices($('.current-option')))
            onNoError($('.current-option'));
        else
            onError($('.current-option'));
    }

    $('.submit-btn').click(function () {
        validateForm();
    });
});