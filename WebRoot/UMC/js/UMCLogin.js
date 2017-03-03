/**
 * 用户管理中心用户登录页面
 * @author xhuatang@linewell.com
 * @date 2011-04-21
 */

/**
 * 用户管理中心登录方法
 */
var UMCLogin = function()
{
	/**
	 * 显示登录提示信息
	 * @param msg 提示信息
	 * @return 无
	 */
	var showLoginMess = function(msg)
	{
		Ext.getDom("login_message").innerHTML = msg;
	};
	
	/**
	 * 用户登录交互
	 * @param user  用户名
	 * @param pass  密码
	 * @return 
	 */
	var loginAction = function(user, pass)
	{
		//登录信息配置
		var requestConfig = {
			url : UMCSession.UMCAction, //处理的Action对象					
			params : {               //传递的参数
				type:"umcLogin",
				username : user,
				password : pass
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
					//是否为管理员
					if(json.isManager){
						top.location.href = "main.jsp";
					}else{
						msg = json.errorMsg;
					}
				} else {
					msg = "连接服务器出错，请联系管理员";
				}
				
				Ext.getDom("username").disabled = false;
				Ext.getDom("password").disabled = false;
				showLoginMess(msg);
			}
		};
		//登录的Ajax请求
		Ext.Ajax.request(requestConfig);
	};
	
	/**
	 * 用户登录表单提交
	 */
	var loginFormSubmit = function(){
		var userDom = Ext.getDom("username");
		var passDom = Ext.getDom("password");
		var user = userDom.value;
		var pass = passDom.value;
		//2012-09-25 mdf by chuiting@linewell.com
		//BUG1226建议：平台的五个登录页面对登录错误提示信息进行统一
		//判断用户名或者密码为空
		/*if(!user && !pass)
		{
			showLoginMess("请输入您的账户和密码");
			userDom.focus();
			return;
		}
		else */if(!user)
		{
			//showLoginMess("请输入您的账户");
			showLoginMess("用户名不能为空！");
			userDom.focus();
			return;
		}
		else if(!pass)
		{
			//showLoginMess("请输入您的密码");
			showLoginMess("密码不能为空！");
			passDom.focus();
			return;
		}
		//end 2012-09-25 mdf by chuiting@linewell.com
		userDom.disabled = true;
		passDom.disabled = true;
		showLoginMess("<img src='style/images/loading.gif' height='12' width='80' />");
		loginAction(user, pass);
	};
	
	loginFormSubmit();
};