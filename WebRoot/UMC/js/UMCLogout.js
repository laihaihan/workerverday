/**
 * 用户管理中心登出
 * @author xhuatang@linewell.com
 * @date 2011-04-26
 */

/**
 * 用户管理中心登出方法
 */
var UMCLogout = function()
{
	
	/**
	 * 用户登出的交互
	 * @return 
	 */
	var logoutAction = function()
	{
		//登录信息配置
		var requestConfig = {
			url : "umcAction.action", //处理的Action对象					
			params : {               //传递的参数
				type:"umcLogout"
			},
			/**
			 * 回调信息
			 * @param options  参数
			 * @param success  访问页面是否成功
			 * @param response 输出的对象
			 */
			callback : function(options, success, response) {
				top.location.href = "login.jsp";
			}
		};
		//登录的Ajax请求
		Ext.Ajax.request(requestConfig);
	};	
	
	logoutAction();
};