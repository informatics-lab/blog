$(document).ready(function () {
    /* vp_h will hold the height of the browser window */
    var vp_h = $(window).height();
    /* b_g will hold the height of the html body */
    var b_g = $('body').height();
    /* If the body height is lower than window */
    if (b_g < vp_h) {
        /* Set the footer css -> position: absolute; */
        $('footer').addClass("sticky");
    }
});
