//加载模块css
require('./css/dialog.less');
//加载模板
var html = require('./tmpl/dialog.html');

module.exports = function(param) {

	var $dialog = $(html).clone();

	//传入内容
	$dialog.find('.content').html(param);

	//关闭对话框
	$dialog.find('.close').on('click', function() {
		$('body').removeClass('modal-open');
		$dialog.fadeOut(function() {
			$(this).remove();
		});
	});

	//加载渲染对话框
	$('body').append($dialog).addClass('modal-open');
	$dialog.fadeIn();
}