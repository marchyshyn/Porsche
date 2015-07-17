(function($) {

	var methods = {
		init: function() {
			var options = $.extend({
				showTime: 3000,
				slideAnimate: 700
			}, options);

			var el = this,
			resize = 100,
			lengthSlides = $(this).find('.slider-item').length,
			widthSlides = lengthSlides * resize + '%',
			currentSlide = 1;
			$(this).find('.sliderItemWrapper').width(widthSlides);

			var nextSlide = function() {
				if ( currentSlide == lengthSlides )
					currentSlide = 0;
				$(el).find('.sliderItemWrapper').animate({
					'left': -currentSlide * resize + '%'
				}, options.slideAnimate);
				currentSlide++;
			};

			var prevSlide = function() {
				currentSlide--;
				if ( currentSlide == 0 )
					currentSlide = lengthSlides;
				$(el).find('.sliderItemWrapper').animate({
					'left': -(currentSlide -1) * resize + '%'
				}, options.slideAnimate);
			};

			var inter = setInterval(nextSlide, options.showTime);
			$(el).hover(function() {
				clearInterval(inter);
			}, function() {
				inter = setInterval(nextSlide, options.showTime);
			});
			$(el).find('.slider_left').click(prevSlide);
			$(el).find('.slider_right').click(nextSlide);

		}
	};

	$.fn.slide = function(method) {
		return this.each(function() {
			if ( methods[method] ) {
				return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof method === 'object' || ! method ) {
				return methods.init.apply( this, arguments );
			} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.slide' );
			}    
		});
	};
})(jQuery);