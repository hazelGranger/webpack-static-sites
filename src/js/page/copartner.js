//引入css,less
require("../../css/lib/reset.css");
require("../../css/common/global.less");
require("../../css/common/grid.less");
require("../../css/common/header.less");
require("../../css/common/footer.less");
require("../../css/page/copartner.less");


//引入 js
require("../../js/components/header.js");
require("../../js/components/cookie.js");
require("../../js/components/heroimg.js");
var Dialog =  require('../components/dialog/index.js');

$(document).ready(function(){
	// 增加事件

	$('.contact-us').click(function() {

		require.ensure(['../../view/partial/contact_form.html'],function(require){
			var contact_form = require('../../view/partial/contact_form.html');
			new Dialog(contact_form);
		})
	});


	$('.tab-header .item').on('click',function(e){
		var index = $(e.target).attr('tabindex');
		var tabContents = $(this).closest('.tab').find('.tab-body .tab-contents');
		$('.tab-header .item').removeClass('active');
		$(e.target).addClass('active');
		tabContents.hide();
		tabContents.eq(index).show();
		if (index == 2) {
			$('section.courses').show();
			$('section.testV').show();
		}else{
			$('section.courses').hide();
			$('section.testV').hide();
		}
	});


});