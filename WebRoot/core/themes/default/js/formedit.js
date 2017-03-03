/**
* 说明：此脚本用于jsp记录编辑页面工具栏的固定
**/
jQuery(function(){
	doToolbarPosition();
});

/**
* 说明：工具栏固定
**/
function doToolbarPosition(){
	var windowObject = $(window);//编辑页面窗口对象
	var contentObject = $('#form_content');//编辑页面窗口显示内容对象
	var toolbarObject = $('#form_toolbar');//编辑页面工具栏对象
	var formObject = $('#jspForm');//编辑页面表单提交对象
	if((typeof(windowObject) != "undefined" && windowObject != null && windowObject.length > 0) && (
		typeof(contentObject) != "undefined" && contentObject != null && contentObject.length > 0) && (
		typeof(toolbarObject) != "undefined" && toolbarObject != null && toolbarObject.length > 0) && (
		typeof(formObject) != "undefined" && formObject != null && formObject.length > 0)){
		$('body').css({'overflow':'hidden'});
		var windowHeight = $(windowObject).height();//窗口高度
		var contentHeight = $(contentObject).height();//页面窗口显示内容高度
		var toolbarHeight = $(toolbarObject).height();//页面窗口工具栏高度
		if(windowHeight < contentHeight){
			$(formObject).css({'overflow': 'auto', 'height': windowHeight - toolbarHeight});
		}
	}
}