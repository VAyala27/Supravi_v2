$(document).ready(function () {
    $('.sub-menu li').on('click', function () {
        $('.sub-menu li.active').removeClass('active');
        $(this).addClass('active');

        var listItem = $(this).attr('data-id');
        console.log(listItem);

        $(".clothing-container .category-row.active").fadeOut(500, showNext);

        function showNext() {
            $(this).removeClass("active");
            $("#" + listItem).fadeIn(600, function () {
                $(this).addClass("active");
            })
        }
    })
});