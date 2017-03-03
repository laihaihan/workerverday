/**
 * 登陆提交
 * @author yjianyou@linewell.com xhuatang@linewell.com
 * @since 2011-08-15
 */
function loginSubmit() {
	var $username = $("#username");
	var $password = $("#password");
	var $appList = $("#appList");
	var $loginBtn = $("#loginBtn");
	// 消息显示对象
	var $msg = $("#resultMsg");
	// 用户名
	var username = $username.val();
	// 密码
	var password = $password.val();
	
	//2012-09-25 mdf by chuiting@linewell.com
	//BUG1226建议：平台的五个登录页面对登录错误提示信息进行统一
	if (!username) {
		//$msg.text("请输入用户名！");
		$msg.text("用户名不能为空！");
		$("#username").focus();
		return false;
	}
	if (!password) {
		//$msg.text("请输入密码！");
		$msg.text("密码不能为空！");
		$("#password").focus();
		return false;		
	}
	//end 2012-09-25 mdf by chuiting@linewell.com
	
	//2012-07-17  add by wyongjian@linewell.com  
	//解决BUG1212-ADMIN：登录页面用户登录会被SQL注入的问题
	//用户名先过滤掉非法字符串
	if(!isValidUserName(username)) {
		$msg.text("用户名输入错误！");
		$("#username").focus();
		return false;
	}
		
	// 与Action的交互
	jQuery.ajax({
				type : "POST",
				url : actionUrl,
				data : "type=ucapLogin&act=adminLogin" + "&username=" + username
						+ "&password=" + password,
				async : true,
				// 提交成功处理
				success : function(json) {
					// 如果返回的是错误信息
					if (json && json.exceptionMsg) {
						$msg.text(json.exceptionMsg);
						return ;
					}
					//登录首页
					window.location = appPath + "ADMIN/index.jsp";
					
				},
				// 处理错误状态
				statusCode : {
					404 : function() {
						alert('page not found');
					}
				}
			});
	// 保证不需要用表单提交
	return false;
}

//2012-07-17  add by wyongjian@linewell.com  
//解决BUG1212-ADMIN：登录页面用户登录会被SQL注入的问题
/**
 * 判断字符串中是否包含非法字符
 * @param {} v
 */
function isValidUserName(v)
{
	var result=true;
	//非法字符数组，以竖线分隔,暂时只判断单引号和双引号
	var danger="'|\"";
	var dangers=danger.split("|");
	for(var i=0;i<dangers.length;i++)
	{
		if(v.indexOf(dangers[i])>-1)
		{
			result=false;
			break;
		}
	}
	return result;
}