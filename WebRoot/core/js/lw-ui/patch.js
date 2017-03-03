/**
 * UI 补丁
 * @author cyingquan@qq.com
 * @2011-03-29
 * @version 1.0
*/
jQuery(function(){

	/**
	 * 修复IE div+iframe 间歇性,文本框无法获得焦点
	*/
	jQuery(':text').eq(0).focus();
	if(jQuery(':text').length==0){
		jQuery('textarea').eq(0).focus();
	}
	var clientHeight = document.body.clientHeight-35;
	jQuery('#form_toolbar').next().attr('style','overflow-y:scroll;height:'+clientHeight);
});