/**
 * 获取触发事件DOM的jquery功能的扩展
 * 注意，调用该方法时，不能应用链接的方式调用，而只能通过DOM的事件调用
 * 如：不能使用<a href="javascript:fn1()">
 *     而要使用<a href="javascript:void(0);" onclick="fn1();">
 * @author xhuatang@linewell.com
 * @since 2011-07-20
 * @example 
 *   function fn1(){ 
 * 	   var $eventDom = jQuery.getEventDom$();
 *     alert($eventDom.html());
 *   }
 * 
 */
(function($){	
	function getSelf(){
		var evt = null;
		//如果是ie
		if(document.all)
		{
			evt = window.event;
		}else{
			//获取当前放大的调用方法
			var func = getSelf.caller;
			//循环获取，直至是通过事件调用为止，以此判断是DOM执行对象
			while(null !== func)
			{
				var arg0 = func.arguments[0];
				if(arg0){
					if((arg0.constructor === Event || arg0.constructor === MouseEvent)
						|| (typeof(arg0) === "object" && arg0.preventDefault && arg0.stopPropagation))
					{
						evt = arg0;
						break;
					}
				}
				func = func.caller;
			}
		}
		if(null === evt) return null;
		return jQuery(evt.srcElement || evt.target);
	}
	//扩展功能
	$.extend({
	    /**
		 * 获取触发事件DOM的jquery对象
		 */
		getEventDom$ : function()
		{
			return getSelf();
		}
	})
})(jQuery);