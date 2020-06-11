$(document).ready(function () {
	$(".carousel__inner").slick({
		speed: 1200,
		// adaptiveHeight: true,
		prevArrow:
			'<button type="button" class="slick-prev"><img src="../img/icons/arrow-prev.svg"></button>',
		nextArrow:
			'<button type="button" class="slick-next"><img src="../img/icons/arrow-next.svg"></button>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});

	$("ul.catalog__tabs").on(
		"click",
		"li:not(.catalog__tab_active)",
		function () {
			$(this)
				.addClass("catalog__tab_active")
				.siblings()
				.removeClass("catalog__tab_active")
				.closest("div.container")
				.find("div.catalog__content")
				.removeClass("catalog__content_active")
				.eq($(this).index())
				.addClass("catalog__content_active");
		}
	);

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on("click", function (e) {
				e.preventDefault();
				$(".catalog-item__content")
					.eq(i)
					.toggleClass("catalog-item__content_active");
				$(".catalog-item__list")
					.eq(i)
					.toggleClass("catalog-item__list_active");
			});
		});
	}

	toggleSlide(".catalog-item__more");
	toggleSlide(".catalog-item__back");


	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('[data-modal=order]').on('click', function () {
		$('.overlay, #order').fadeIn('slow');
	});
	$('.modal__close').on('click', function () {
		$('.overlay, #order, #consultation, #thanks').fadeOut('slow');
	});
});
