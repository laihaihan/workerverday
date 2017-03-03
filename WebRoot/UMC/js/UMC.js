/**
 * 用户管理中心的脚本处理
 * 
 * @author yjy
 * @time 2011-4-21
 */
var ucapUmc = {
	nowAnchor : "",// 现在访问的锚点
	rightDivId : "ucapView",
	postViewId : "84196ABF9F65739D200C96F9FFFB4E9E",// 职位视图unid
	roleViewId : "",// 角色视图unid
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
	 * 打开用户页面
	 */
	openUserPage : function() {
		this.otherViewHeight = 57;
		var url = ucapSession.appPath + "UMC/dept/deptTree.jsp?"
				+ Math.random();
		var el = Ext.get(this.rightDivId);
		var mgr = el.getUpdater();
		mgr.update({
					url : url,
					scripts : true
				});
    this.nowAnchor = "userpage";
		this.setSelectedLink();
	},
	/**
	 * 打开职位视图
	 */
	openPostView : function() {
		this.otherViewHeight = 31;
		initView(this.postViewId, this.rightDivId);
    this.nowAnchor = "postview";
		this.setSelectedLink();
	},
	/**
	 * 打开角色授权页面
	 * 
	 * @param {}
	 *            obj
	 */
	openRoleAuthDeptPage : function(obj) {
		var url = ucapSession.appPath + "UMC/role/roleTree.jsp?"
				+ Math.random();
		var el = Ext.get(this.rightDivId);
		var mgr = el.getUpdater();
		mgr.update({
					url : url,
					scripts : true
				});
    this.nowAnchor = "roleauthdept";
		this.setSelectedLink();
	}
}
