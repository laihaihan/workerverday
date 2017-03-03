/**
 * 更改用户的密码
 * @author xhuatang@linewell.com
 * @date 2011-04-26
 */

/**
 * 更改用户的密码方法
 */
var changePassword = function()
{
	
	/**
	 * 更改密码交互	
	 * @return 
	 */
	var changePasswordAction = function()
	{
		//登录信息配置
		var requestConfig = {
			url : "umcAction.action", //处理的Action对象					
			params : {               //传递的参数
				type:"changePassword"
			},
			/**
			 * 回调信息
			 * @param options  参数
			 * @param success  访问页面是否成功
			 * @param response 输出的对象
			 */
			callback : function(options, success, response) {
				var msg = "";				
				if (success) {
					//获取服务器端返回的信息并转换为Json格式
					var json = Ext.util.JSON.decode(response.responseText);
					//是否成功更改密码
					if(json.result){
						msg = "成功更改密码！";
					}else{
						msg = json.msg;
					}
				} else {
					msg = "连接服务器出错，请联系管理员";
				}
				
				alert(msg);
			}
		};
		//登录的Ajax请求
		Ext.Ajax.request(requestConfig);
	};	
	
	changePasswordAction();
};