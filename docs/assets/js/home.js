// WIKI-PARALEGAL-STATIC/docs/assets/js/home.js
$(document).ready(function() {
    // Inicialización del selector activo
    var tabsVerticalInner = $('#accordian');
    var activeItemVerticalInner = tabsVerticalInner.find('.active');
    var activeWidthVerticalHeight = activeItemVerticalInner.innerHeight();
    var activeWidthVerticalWidth = activeItemVerticalInner.innerWidth();
    var itemPosVerticalTop = activeItemVerticalInner.position();
    var itemPosVerticalLeft = activeItemVerticalInner.position();

    $(".selector-active").css({
        "top": itemPosVerticalTop.top + "px",
        "left": itemPosVerticalLeft.left + "px",
        "height": activeWidthVerticalHeight + "px",
        "width": activeWidthVerticalWidth + "px"
    });

    // Manejador de clics para los elementos del menú
    $("#accordian").on("click", "li", function(e) {
        $('#accordian ul li').removeClass("active");
        $(this).addClass('active');

        var activeWidthVerticalHeight = $(this).innerHeight();
        var activeWidthVerticalWidth = $(this).innerWidth();
        var itemPosVerticalTop = $(this).position();
        var itemPosVerticalLeft = $(this).position();

        $(".selector-active").css({
            "top": itemPosVerticalTop.top + "px",
            "left": itemPosVerticalLeft.left + "px",
            "height": activeWidthVerticalHeight + "px",
            "width": activeWidthVerticalWidth + "px"
        });
    });

    // Agregar clase active basada en la página actual
    var path = window.location.pathname.split("/").pop();
    if (path == '') {
        path = 'home.html';
    }
    var target = $('#accordian ul li a[href="' + path + '"]');
    target.parent().addClass('active');
});