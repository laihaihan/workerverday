// 定义linewell的工具
lw.extendNs("linewell.utils");

/**
 * 定义南威工具类库
 * 
 * @author xhuatang@linewell.com
 * @since 2011-07-28
 */
(function($, lw) {
	lw.utils = (function() {
		return {
			/**
			 * 获取GUID
			 */
			getGuid : function() {
				var s4 = function() {
					return (((1 + Math.random()) * 0x10000) | 0).toString(16)
							.substring(1);
				};
				return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4()
						+ "-" + s4() + s4() + s4());
			},// end getGuid function

			/**
			 * 调试输出
			 * 
			 * @param str
			 *            输出内容
			 */
			debug : function(str) {
				if (typeof(JS_DEBUG) !== "undefined" && JS_DEBUG) {
					if ($("body").find($("#debugDiv")).size() === 0) {
						var $debugDiv = $("<div/>").attr("id", "debugDiv");
						$debugDiv.css({
									"border" : "1px solid #ccc",
									"margin" : "5px",
									"padding" : "5px",
									"word-break" : "break-all",
									"font-size" : "12px",
									"background-color" : "#EFEFEF"
								});
						$debugDiv.text(str);
						$debugDiv.prependTo($("body"));
					} else {
						$("#debugDiv").text(str);
						$("#debugDiv").slideDown();
					}
				}
			}// end debug function

		};// end return
	})()// end lw.utils
})(jQuery, linewell);