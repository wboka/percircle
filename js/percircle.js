jQuery(document).ready(function () {

    //Identify by data attribute
    var dataPercircles = jQuery( "div[data-percircle]" );

    jQuery.each( dataPercircles, function(){
        var percentage = jQuery( this ).data( "percircle" );
        if( percentage > 50 ){
            jQuery( this ).addClass( 'exceed' );
        }
        var barColor = jQuery( this ).data( "barColor" );

        if( typeof barColor === "undefined" || !(new RGBColor(barColor).ok) ){
            barColor = "black";
        } else {
            barColor = new RGBColor(barColor).toRGB();
        }
        var bgColor = jQuery( this ).data( "bgColor" );

        if( typeof bgColor === "undefined" || !(new RGBColor(bgColor).ok) ){
            bgColor = "grey";
        } else {
            bgColor = new RGBColor(bgColor).toRGB();
        }
        render( this, percentage, barColor, bgColor )
    });

    function render( node, percentage, barColor, bgColor ){
        var rotationMultiplier = 3.6;
        var rotationDegrees = rotationMultiplier * percentage;
        var percircleContent = '<div class="slice"><div class="bar"></div><div class="fill"></div></div>';

        jQuery( node ).css('background-color', bgColor);

        jQuery( node ).append('<span class="percircle-amount">' + percentage + "%</span>" + percircleContent);

        jQuery ( node ).add(jQuery( 'span', jQuery( node ) ) ).css('color', barColor);

        jQuery( node ).find( '.bar' ).css({
            '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
            '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
            '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
            '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
            'transform'         : 'rotate(' + rotationDegrees + 'deg)'
        });

        jQuery( node ).find( '.bar, .fill' ).css({
            'background-color'    : barColor,
            'border-color'         : barColor,
            'color'                : barColor
        });
    }
});
