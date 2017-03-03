/**
 * 获取锚点的名称
 * @param {} linkStr  链接对象
 * @return {String}   锚点的名称
 */
function getAnchor(linkStr) {
  if(!linkStr) linkStr = document.location.href;
  var args;
  linkStr += "";
  args = linkStr.split("#");
  if(!args[1]){
    return "";
  }
  return args[1];
}

/**
 * 视图的脚本处理
 * 
 * @author yjy
 * @time 2011-8-15
 */
var ucapUmc = {
	nowAnchor : "",// 现在访问的锚点
	rightDivId : "ucapView",
	otherViewHeight : 0,
	/**
	 * 通过类名获取对象
	 * 
	 * @param {String}
	 *            className 需要获取的类名
	 * @param {Dom}
	 *            parentElement 父节点列表
	 * @return {Dom[]} 返回Dom数组对象
	 */
	getElementsByClassName : function(className, tagName) {
		var elems = (document.body).getElementsByTagName(tagName);
		var result = [];
		if (elems) {
			for (i = 0; i < elems.length; i++) {
				var j = elems[i];
				if ((" " + j.className + " ").indexOf(" " + className + " ") != -1) {        
					result.push(j);
				}
			}
		}
		return result;
	},
	/**
	 * 选中的链接
	 */
	setSelectedLink : function() {
		var linkClassName = "list_text";
		var selectedClassName = "list_text_selected";
		var elements = this.getElementsByClassName("pagelink", "a");    
		for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
			var href = element.href;      
      if(getAnchor(href) === this.nowAnchor){
        element.parentNode.className = selectedClassName;
      }else{
        element.parentNode.className = linkClassName;
      }      
		}
	},
	/**
	 * 打开视图
	 */
	openView : function(viewId) {
		this.otherViewHeight = 31;
		initView(viewId, this.rightDivId);
		this.setSelectedLink();
	}
}
