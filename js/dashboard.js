$(document).ready(function () {
    //jquery for toggle sub menus
    $(".sub-btn").click(function () {
        // Close all other open sub-menus
        $(".sub-menu").not($(this).next(".sub-menu")).slideUp();
        $(".sub-item-dropdown").not($(this).find(".sub-item-dropdown")).removeClass("rotate");
    
        // Toggle the current sub-menu
        $(this).next(".sub-menu").slideToggle();
        $(this).find(".sub-item-dropdown").toggleClass("rotate");
    });


    //jquery for expand and collapse the sidebar
    $(".menu-btn").click(function () {
        $(".side-bar").addClass("active");
        $(".close-btn").css("display", "block");
        $(".menu-btn").css("display", "none");
    });


    $(".close-btn").click(function () {
        $(".side-bar").removeClass("active");
        $(".close-btn").css("display", "none");
        $(".menu-btn").css("display", "block");
    });

    $(".menu .item a").click(function(){
        $(".item a").removeClass("active");
        $(this).addClass('active');
    });

    // Show side bar navigation on tablet view
    $(window).resize(function(){
        if($(window).width()>991){
            $('.side-bar').addClass('active');
            $(".close-btn").css("display", "none");
            $(".menu-btn").css("display", "none");
        }else {
            $('.side-bar').removeClass('active');
            $(".menu-btn").css("display", "block");
        }
    });

    if($(window).width() > 991){
        $('.side-bar').addClass('active');
    } else {
        $('.side-bar').removeClass('active');
    }
});
