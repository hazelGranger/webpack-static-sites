
$(document).ready(function(){
	// 增加事件

	var bgSetting = {
		'width': 1300,
		'height': 690,
		'rate': 690/1300
	}

	var indexbgResize = function(){
		var windowWidth = $(document).width();
		if (windowWidth > bgSetting.width) {
			$('.hero-image').css('height',windowWidth * bgSetting.rate + 'px');
			$('.hero-contents').css('height',windowWidth * bgSetting.rate -100 + 'px');
		}else if (windowWidth >767){
			$('.hero-image').css('height', bgSetting.height + 'px');
			$('.hero-contents').css('height', bgSetting.height -100 + 'px');
		}else{
			$('.hero-image').removeAttr('style');
			$('.hero-contents').removeAttr('style');
		}
	}

	indexbgResize();

	$(window).resize(indexbgResize);


});