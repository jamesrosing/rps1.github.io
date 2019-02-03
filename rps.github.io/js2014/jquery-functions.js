$(document).ready(function() {

	/* home slider initialization */
	$('#slider').on( 'cycle-post-initialize', function(event, optionHash) {
		$('#mobileSliderText').html($('.sliderItemInText').eq(optionHash['currSlide']).html());
	});
	$('#slider').cycle({
		slides:'> .sliderItem',
		fx: 'fade',
		pager: '.sliderPagination',
		timeout: 5000
	});
	
	$('#slider').on( 'cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
		$('#mobileSliderText').html($('.sliderItemInText', incomingSlideEl).html());
	});
			
	/* /home slider initialization */
	
	/* top products slider */
	// updated 16. Sep 14
	var coun = 8;
	var ccoun = 8;
		var sliderLength1 = $('.sliderTopHolder .sliderProduct').length;

	cycle_init1();
	cycle_initcolorslider();
	var win_resize = false;
	$(window).resize(function() {
		clearTimeout(this.id);
		this.id = setTimeout(doneResizing, 500);
		$('.subNavigationBottom').removeClass('subNavigationBottomMobile')
	});
	
	
	function doneResizing() {
		var oldOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		var currHeight = $(window).height(),
			currWidth = $(window).width();
		document.body.style.overflow = oldOverflow;

		var prevUndefined = (typeof this.prevHeight === 'undefined' || typeof this.prevWidth === 'undefined');

		if (prevUndefined || this.prevHeight !== currHeight || this.prevWidth !== currWidth) {
			this.prevHeight = currHeight;
			this.prevWidth = currWidth;

			cycle_init1();
			cycle_initcolorslider();
		}
	}
	



function cycle_init1(num) {	
		if(num){
			coun = num.find('.topSlider').eq(0).width() / num.find('.sliderProduct').eq(0).outerWidth(true); 
			var sliderLength = num.find('.sliderProduct').length;
		} else {
			coun = $('.sliderTopHolder .topSlider').width() / $('.sliderTopHolder .sliderProduct').outerWidth(true); 
			
		}
		coun = Math.floor(coun);

// updated 29 Oct
		if(coun > sliderLength && num) {
			coun = sliderLength;
		} else if (coun > sliderLength1 && !num) {
			coun = sliderLength1;	
		}
		// /updated 29 Oct


		if(num){
			num.find('.sliderTop').cycle('destroy');
			num.find('.sliderTop').cycle({
				slides:'> .sliderProduct',
				fx: 'carousel',
				allowWrap: false,
				carouselVisible: coun,
				paused: true
			});
		} else {
			$('.sliderTopHolder .sliderTop').cycle('destroy');
			$('.sliderTopHolder .sliderTop').cycle({
				slides:'> .sliderProduct',
				fx: 'carousel',
				allowWrap: false,
				carouselVisible: coun,
				paused: true
			});
		}
		// update disabled arrow
		$('.sliderTop').on( 'cycle-update-view', function( e, opts, slideOpts, currSlide ) {
			if ( opts.allowWrap )
				return;
		
			var cls = opts.disabledClass;
			var next = $(this).parent().parent().find('.rightArrow');
			var prev = $(this).parent().parent().find('.leftArrow');
			var prevBoundry = opts._prevBoundry || 0;
			var nextBoundry = (opts._nextBoundry !== undefined)?opts._nextBoundry:opts.slideCount - 1;
		
			if ( opts.currSlide == nextBoundry )
				next.addClass( cls ).prop( 'disabled', true );
			else
				next.removeClass( cls ).prop( 'disabled', false );
		
			if ( opts.currSlide === prevBoundry )
				prev.addClass( cls ).prop( 'disabled', true );
			else
				prev.removeClass( cls ).prop( 'disabled', false );
		});
		// /update disabled arrow


// updated 29 Oct
//		if(num){
//			cycle_init1();	
//		}


	}



	$('.leftArrow').click(function(e){
		e.preventDefault();
		for (i = 1; i <= coun; i++) { 
			$(this).parent().find('.sliderTop').cycle('prev');
		}
	});
	$('.rightArrow').click(function(e){
		e.preventDefault();
		for (i = 1; i <= coun; i++) { 
			$(this).parent().find('.sliderTop').cycle('next');
		}
	});
	
	$('.subNavigationTopBlock a').click(function(e){
		$('#nav .sliderTopIn .leftArrow, #nav .sliderTopIn .rightArrow').addClass('disabled');						
		$('.subNavigationTopBlock a').removeClass('active');
		$("#nav .slInnerTop").html(' ');
		if($(this).attr("data-load")) {
			e.preventDefault();
			//loadMedia($(this).attr("data-load"), $(this));
			$('.subNavigationBottom').addClass('subNavigationBottomOpened subNavigationBottomMobile')
			// update 16 Feb
			$('#nav .sliderTop').cycle('destroy');
			// /update 16 Feb
			$("#nav .slInnerTop").html(' ');
			$(this).parent().parent().parent().parent().parent().find(".slInnerTop").load($(this).attr("data-load"), function(response, status, xhr) {
				if( status == "success" ) {
					cycle_init1($(this).parent().parent().parent().parent().parent().parent());
				}
			});
			$(this).addClass('active');
		}
	});
	
	$('li[name = "parent"]').mouseleave(function(){
		
		if($(window).width() > 680) {
		
			$("#nav .slInnerTop").html(' ');
			$('.subNavigationTopBlock a').removeClass('active');
		}

		$('.subNavigationBottom').removeClass('subNavigationBottomOpened');
	});
			
	/* /top products slider */
	
	function cycle_initcolorslider() {
		ccoun = ($('.productSectionIn').width()-40) / $('.colorItem').outerWidth(true); 
		ccoun = Math.floor(ccoun);
		if(ccoun > $('.colorItem').length) {
			ccoun = $('.colorItem').length;	
		}
		var destroyCarousel1 = function() { // create a function
			$('.colorItemGallery').cycle('destroy');
		}
		destroyCarousel1();
		$('.colorItemGallery').cycle({
			slides:'> .colorItem',
			fx: 'carousel',
			allowWrap: false,
			carouselVisible: ccoun,
			paused: true
		});
		// update disabled arrow
		$('.colorItemGallery').on( 'cycle-update-view', function( e, opts, slideOpts, currSlide ) {
			if ( opts.allowWrap )
				return;
		
			var cls = opts.disabledClass;
			var next = $('.colorArrowR');
			var prev = $('.colorArrowL');
			var prevBoundry = opts._prevBoundry || 0;
			var nextBoundry = (opts._nextBoundry !== undefined)?opts._nextBoundry:opts.slideCount - 1;
		
			if ( opts.currSlide == nextBoundry )
				next.addClass( cls ).prop( 'disabled', true );
			else
				next.removeClass( cls ).prop( 'disabled', false );
		
			if ( opts.currSlide === prevBoundry )
				prev.addClass( cls ).prop( 'disabled', true );
			else
				prev.removeClass( cls ).prop( 'disabled', false );
		});
		// /update disabled arrow
	}
	$('.colorArrowL').click(function(e){
		e.preventDefault();
		for (i = 1; i <= ccoun; i++) { 
			$('.colorItemGallery').cycle('prev');
			
		}
	});
	$('.colorArrowR').click(function(e){
		e.preventDefault();
		for (i = 1; i <= ccoun; i++) { 
			$('.colorItemGallery').cycle('next');
		}
	});
	// /updated 16. Sep 14
	
	// updated 23 Oct 
	$('#libertySlider').cycle({
		slides:'> .libertyImg',
		fx: 'fade',
		pager: '.libertyPagination',
		timeout: 5000,
		paused: true
	});
	// /updated 23 Oct 
	
	$('select.formSelect').customSelect();
	$('select.filterSelect').customSelect();

	$(window).resize(function() {
		$('select.formSelect').trigger('render');
		$('select.filterSelect').trigger('render');
	});	
	$( ".datepicker" ).datepicker();
	
	/* navigation jquery */
	
	/* dropdown delay */
	/* /if there is problem with mobile devices tap functionality need to be commented */
	$("#nav li").hoverIntent({
		over: makeTall,
		out: makeShort,
		timeout: 300
	});
	
	function makeTall(){
		$(".subNavigation", this).css('left', 0);
	}
	function makeShort(){
		$(".subNavigation", this).css('left', '-999em');
	}
	/* /dropdown delay */
	
	$('#nav').touchMenuHover({
		'childTag': 'div',
		'closeElement': '#nav'
	});
	
	/* /navigation jquery */
	
	$( ".colorItem" ).click(function() {
		
		ind2 = $(this).attr("id");
		if(ind2 == 'coloritem'){
		}else{
		ind = $(this).attr("name");	
		$(".colorBox").hide();
		$(".colorBox").eq(ind).show();
		}
	});


	/*
	$( ".colorItem" ).hover(function() {
		ind = $(this).attr("name");	
		$(".colorBox").hide();
		$(".colorBox").eq(ind).show();
	});
	*/
	
	$( ".galeryTypes a" ).click(function(e) {
		e.preventDefault();
		$(".galeryTypes a").removeClass('active');
		$(this).addClass('active');

	/*	
		$(".galleryItem").hide();

		ind = $(this).attr("name");	
		for ( var i = 0; i < ind; i++ ) {
			$(".galleryItem").eq(i).show();
		}
	*/	

	});
	
	$( "#galleryAll" ).click(function(e) {
		$(".galleryItem").show();
	});
	
	$( ".productSectionImg" ).click(function(e) {
		$(this).parent().parent().toggleClass('productSectionOpened');
	});
	
	$('[placeholder]').focus(function() {
	var input = $(this);
	if (input.val() == input.attr('placeholder')) {
	input.val('');
	input.removeClass('placeholder');
	}
	}).blur(function() {
	var input = $(this);
	if (input.val() == '' || input.val() == input.attr('placeholder')) {
	input.addClass('placeholder');
	input.val(input.attr('placeholder'));
	}
	}).blur().parents('form').submit(function() {
	$(this).find('[placeholder]').each(function() {
	var input = $(this);
	if (input.val() == input.attr('placeholder')) {
	input.val('');
	}
	})
	});
	


// update configurator
	
	// /part for opening attribute box
	
	// part for opening image + text when click on option
	$( ".optionSpan" ).click(function(e) {
		if($(this).hasClass('optionSpanOpened')) {
			$(this).removeClass('optionSpanOpened')
			$(this).nextAll(".attributeBoxInfoRight:first").css('display', 'none');
		} else {
			// if you need some action before more info opened call here function you need
			$(this).addClass('optionSpanOpened')
			$(this).nextAll(".attributeBoxInfoRight:first").css('display', 'block');	
		}
	});
	// /part for opening image + text when click on option
	
	// opening attributebox function
	function openAttributeBox(obj) {
		//$(".attributeBox").removeClass('attributeBoxOpened');
		//$(".attributeBoxInfo").removeClass('attributeBoxInfoOpened');
		$(".attributeBox").eq(obj).addClass('attributeBoxOpened');
		$(".attributeBox").eq(obj).nextAll(".attributeBoxInfo:first").addClass('attributeBoxInfoOpened');
		$('.formSelect').trigger('render');	
	}
	// /opening attributebox function
	
	// for example opening third box. numbers are starting from zero (0)
	//openAttributeBox(2);
	
	// /update configurator


	
//	$('.downloadSection h3').click(function() {
//		$(this).parent().toggleClass('downloadSectionOpened');
//		equalheight('.equalHeight .downloadThumbHolder');
//	});
});

function goToPayment() {
	$('#checkoutShipping').addClass('checkoutBlockClosed checkoutBlockEdit');
	$('#checkoutPayment').removeClass('checkoutBlockClosed');
	return false;
}

function setEdit(obj) {
	$(obj).removeClass('checkoutBlockEdit checkoutBlockClosed');	
}