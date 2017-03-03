/**
 * CRM登陆提交
 * @author yjianyou@linewell.com xhuatang@linewell.com
 * @since 2011-07-01
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
	
	if (!username) {
		$msg.text("请输入用户名！");
		$("#username").focus();
		return false;
	}
	if (!password) {
		$msg.text("请输入密码！");
		$("#password").focus();
		return false;		
	}
	//应用系统
	var appUnid = $("#appList").val();
	if (!appUnid || appUnid==""){
		$msg.text("请选择应用系统！");
		$("#appList").focus();
		return false;
	}
	// 与Action的交互
	jQuery.ajax({
				type : "POST",
				url : actionUrl,
				data : "type=CrmLogin&act=Login" + "&appUnid="+appUnid + "&username=" + username
						+ "&password=" + password,
				async : true,
				// 提交成功处理
				success : function(json) {
					// 如果返回的是错误信息
					if (json && json.exceptionMsg) {
						$msg.text(json.exceptionMsg);
						return ;
					}

					$.cookie('login.username', username, cookieOptions);
					$.cookie('login.appList', $appList.val(), cookieOptions);
					// 是否要记住密码
					if ($("#rememberPass").attr("checked")) {
						$.cookie('login.password', password, cookieOptions);						
					}else{
						$.cookie('login.password', "", cookieOptions);
					}
					//登录首页
					window.location = appPath + "crm/index.jsp";
					
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