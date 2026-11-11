define([
    'jquery',
], function($) {
    return function(config, element) {
        if (document.querySelector(".nav-trigger.hideAll")) {
            $(document).ready(function() {
                document.querySelector(".nav-trigger").classList.remove("hideAll");
            });
        }

        $('.main-menu__inner-list').prepend('<span class="close icon-jeeves-chev-l"></span>');

        $(config.navIcon).on('click', function() {
            $(this).toggleClass('active');
            $(config.mainNav).toggleClass('menu-open');
            if ($('.main-menu__mobile.nav-trigger .icon-jeeves-bar').css('display') == 'none' && $(config.mainNav).hasClass('menu-open')) {
                if ($(window).width() < 768) {
                    $('.main-menu__mobile.nav-trigger .icon-jeeves-bar').css('display', 'flex');
                }
            }

            // Stop scrolling
            $('body').toggleClass('menu-open');

            if ($('body').hasClass('menu-open')) {
                if ($(window).width() < 768) {
                    $('html').css('overflow-y', 'initial')
                } else {
                    $('html').css('overflow-y', 'scroll')
                }
            } else {
                $('html').css('overflow-y', 'initial')
            }

            // Reset to Default
            $('.main-menu__inner-list').removeClass('submenu-open');
            $('.main-menu__item--parent').removeClass('parent-active');
            $('.main-menu__item--parent').find('ul').removeClass('submenu-open');
            $('.main-menu__item--parent').find('.icon-jeeves-chevron*').removeClass('.chevron-open');

            if ($('.main-menu__item--parent').find('ul').hasClass('submenu-open')) {
                $('.main-menu__item--parent').find('ul').toggleClass('submenu-open');
            }
        });

        $('.main-menu__item--parent').on('click', function() {
            let submenu = $(this).find('.main-menu__link').attr('data-menu');
            if ($(window).width() < 768) {
                $('.main-menu__mobile.nav-trigger .icon-jeeves-bar').toggle();
            }

            if (!$(this).hasClass('parent-active')) {
                $(this).addClass('parent-active');
                $(this).find('.icon-jeeves-chevron*').addClass('.chevron-open');

                $('.main-menu__inner-list').removeClass('submenu-open');
                $('.main-menu__inner-list[data-menu=' + submenu + ']').addClass('submenu-open');

            } else {
                $('.main-menu__item--parent').removeClass('parent-active');
                $('.main-menu__item--parent .icon-jeeves-chevron*').removeClass('.chevron-open');
                $('.main-menu__inner-list').removeClass('submenu-open');
            }
        });

        $('.main-menu__inner-list .close').on('click', function() {
            $('.main-menu__item').removeClass('parent-active');
            $(this).parent().toggleClass('submenu-open');
            if ($(window).width() < 768) {
                $('.main-menu__mobile.nav-trigger .icon-jeeves-bar').toggle();
            }
        });

        $('.main-menu__mobile.nav-trigger .icon-jeeves-bar').on('click', function() {
            if ($(window).width() < 768 && $('body').hasClass('menu-open') && !$('.main-menu__item--parent').find('ul').hasClass('submenu-open')) {
                $('.main-menu__mobile.nav-trigger .icon-jeeves-bar').css('display', 'none')
            }
        })
    };
});