 /**
 * This demo was prepared for you by Petr Tichy - Ihatetomatoes.net
 * Want to see more similar demos and tutorials?
 * Help by spreading the word about Ihatetomatoes blog.
 * Facebook - https://www.facebook.com/ihatetomatoesblog
 * Twitter - https://twitter.com/ihatetomatoes
 * Google+ - https://plus.google.com/u/0/109859280204979591787/about
 * Article URL: http://ihatetomatoes.net/simple-parallax-scrolling-tutorial/
 */

//Init Skrollr

var s=skrollr.init();

//Refresh Skrollr after resizing sections
s.refresh($('.homeSlide'));

/*$(document).ready(function(){
    $("button").click(function(){
        $("p").toggle();
    });
    
     $("button").click(function(){
        $("#minion").toggle();
    });
    
    //$("#minion").toggle();
      //  $("#audio").toggle();
    
});*/




(function($) {
    
  var allPanels = $('.accordion > dd').hide();
    
  $('.accordion > dt > a').click(function() {
    allPanels.slideUp();
    $(this).parent().next().slideDown();
    return false;
  });

})(jQuery);

$("#change_image").on("click", function () {
    $(this).css("section#slide-1.homeSlide", "url(../img/background2.jpg)");
});


 $("#bio_button").click(function(){
     
        
        $("#bio").toggle('fast');
        
    });

$("#minion_button").click(function(){
        $("#minion").toggle('fast');
    });

$("#voice_button").click(function(){
        $("#voice").toggle('fast');
    });

$("#song_button").click(function(){
        $("#song").toggle('fast');
    });



( function( $ ) {
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$body = $('body');
	
    //FadeIn all sections   
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
		      adjustWindow();
		      
		      // Fade in sections
			  $body.removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
	
	function adjustWindow(){
		
		// Init Skrollr
		
		
		// Get window size
	    winH = $window.height();
	    
	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    // Resize our slides
	    $slide.height(winH);
	    
	    // Refresh Skrollr after resizing our sections
	    
	    
	}
		
} )( jQuery );