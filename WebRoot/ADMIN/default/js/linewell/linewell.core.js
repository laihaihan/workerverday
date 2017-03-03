/**
 * 定义南威javascript脚本类库
 * @author xhuatang@linewell.com
 * @since 2011-07-27
 */
(function(window, undefined){
var linewell = (function(){
  var linewell = {};
  /**
   * 扩展命名空间，形式如:linewell.form
   * @param ns 命名空间名称
   */
  linewell.extendNs = function(ns){
	if(typeof(ns) !== "string") return;
	ns = ns.split(".");
	var o, ni;
	for(var i = 0,len = ns.length; i < len ,ni = ns[i]; i++){
		try{
			o = o ? (o[ni] = o[ni] || {}) : (eval(ni + "=" + ni + "||{}"))
		}catch(e){
			o = eval( ni + "={}" )
		}
	}
  }
  return linewell;
})();
window.lw = window.linewell = linewell;
})(window);