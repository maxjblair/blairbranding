//import $ from 'jquery' //-> not necessary - pulling jQuery from CDN

var tagline = (function () {
    "use strict";
    var module = {
        container: $('.bb-tagline'),
        active: null,
        next: null,

        // Initialize tagline module
        init: function () {
            "use strict";
            //module.timer = $('.bb-tagline').attr('data-duration') * 1000;
            module.timer = module.container.attr('data-duration') * 1000;
            module.setMessageContainerLength();
            module.setActive();
            setInterval(module.animate, module.timer);
        },

        // Remove style for the active message container and wait a bit so it can animate.
        animate: function () {
            "use strict";
            module.active.removeAttr('style').removeClass('active');
            setTimeout(module.findNext, 500);
        },

        // Find the next tagline message
        findNext: function () {
            "use strict";
            module.next = module.active.next();
            if (0 === module.next.length) {
                module.next = module.container.find('.bb-tagline__message-container:first-child');
            }
            module.active = module.next;
            module.setActive();
        },

        setMessageContainerLength: function () {
            var ghosts = module.container.find('.bb-tagline__message-ghost'),
                width,
                longest = 0;

            ghosts.each(function () {
                width = $(this).outerWidth();
                if (width > longest) {
                    longest = width;
                }
                module.container.find('.bb-tagline__messages').css({ width: longest + 'px' });
            });
        },

        setActive: function () {
            var ghost; // Get the width of the offscreen message because we can't animate width: auto.
            if (!module.active) {
                module.active = module.container.find('.bb-tagline__message-container:first-child');
            }
            ghost = module.active.find('.bb-tagline__message-ghost');
            module.active.addClass('active').css({ width: ghost.outerWidth() + 'px' });
        }
    };
    return module;
}());

$(document).ready(() => {
    tagline.init();
});


$(window).resize(() => {
    "use strict";

    setTimeout(function () {
        tagline.setMessageContainerLength();
    }, 300);
});