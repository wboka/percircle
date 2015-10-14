/**
 *  @author 		Wayne T Boka
 *  @lastmodified 	201510141130
 *  @version		0.1.0
 *  @description	Plugin for percent circle graphs
 *  @website		http://wboka.github.io/percircle
 */

(function ($) {
	var percircleContent = '<div class="slice"><div class="bar"></div><div class="fill"></div></div>';
	
	// Define available methods
    var methods = {
        init: function () {
            return this.each(function () {
            	var percentage = $( this ).data( "percircle" );
                if( percentage > 50 ){
                    $( this ).addClass( 'exceed' );
                }

                var barColor = $( this ).data( "barColor" );
                if( typeof barColor === "undefined" || !(new RGBColor(barColor).ok) ){
                    barColor = "black";
                } else {
                    barColor = new RGBColor(barColor).toRGB();
                }

                var bgColor = $( this ).data( "bgColor" );
                if( typeof bgColor === "undefined" || !(new RGBColor(bgColor).ok) ){
                    bgColor = "grey";
                } else {
                    bgColor = new RGBColor(bgColor).toRGB();
                }

                methods['render']( this, percentage, barColor, bgColor );
            });
        },
        render: function ( node, percentage, barColor, bgColor ) {
        	var rotationDegrees = 3.6 * percentage;

        	$( node ).css('background-color', bgColor);

            $( node ).append('<span class="percircle-amount">' + percentage + "%</span>" + percircleContent);

            $( node ).add($( 'span', $( node ) ) ).css('color', barColor);

            $( node ).find( '.bar' ).css({
                '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
                '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
                '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
                '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
                'transform'         : 'rotate(' + rotationDegrees + 'deg)'
            });
        },
		destroy: function() {
			return this.each(function() {
				$( 'div.slice', $( this )).remove();
			});
		}
    };

    $.fn.percircle = function (method) {
		// Check if the desired method exists
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        
        return methods['init'].apply(this, Array.prototype.slice.call(arguments, 1));
    };
})(jQuery);
