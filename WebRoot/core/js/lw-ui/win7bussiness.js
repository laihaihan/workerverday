
	//系统操作封装的js

	//设置用户信息
	function setUserInfo(){
		top.lwin.showModalDialog('core/user/user_info.jsp','个人信息',500,300);
	}
	
	//设置用户密码
	function setUserPassword(){
		top.lwin.showModalDialog('core/user/user_password.jsp','修改密码',500,300);
	}
	
	//设置用户意见
	function setUserOpinion(){
		top.lwin.showModalDialog('core/user/user_option.jsp','常用意见',550,350);
	}
	
	//设置用户过滤事项
	function setUserService(){
		top.lwin.showModalDialog('was/jsp/service/user_service.jsp','过滤事项',700,500);
	}
	
	//设置用户叫号机屏显号
	function setCallWinInfo(){
		top.lwin.showModalDialog('was/jsp/advanceinfo/userinfo/advanceuserinfo_edit.jsp','绑定叫号机屏显号',700,400);
	}
	
	//系统选择
	function chooseSys(){
		top.lwin.showWin('syschoose.jsp?userName="+$("#userName").val()+"&password="+$("#password").val()','系统切换',450,250);
	}
	
	
	//样式选择
	function chooseStyle(){
		top.lwin.showWin('stylechoose.jsp?userName="+$("#userName").val()+"&password="+$("#password").val()','切换',450,250);
	}
	
	//桌面设置
	function chooseDeskTop(){
		top.lwin.showModalDialog('lw-admin/win7/desktopchoose.jsp','设置桌面',870,570);
	}
	
	function setDefaulShortcuts(){
		top.lwin.showModalDialog('core/view/cfg/view.action?fn=grid&viewId=DB78A6ECF9DB6355E8AC98CCC4FDBEFE','系统默认快捷方式设置',870,470);
		
	}
	
	function delDesktopShortcut(){
		$.ajax({
			url : appPath +　"/usershortcut.action",
			type:'post',
			dataType:'text',
			data:{
				"fn" : "delShortcuts",
				"shortcutid" : curContextmenuId,
				"app_unid" : app_unid,
				"userid" : userid
			},
			success:function(response){
				alert('操作成功');
				top.window.location.reload();
			},
			error:function(){
				popup.errorService();
			}
		});
		
	}
	
	function autoOrderShortcut(){
		$.ajax({
			url : appPath +　"/usershortcut.action",
			type:'post',
			dataType:'text',
			data:{
				"fn" : "autoOrderShortcut",
				"app_unid" : app_unid,
				"userid" : userid
			},
			success:function(response){
				top.window.location.reload();
			},
			error:function(){
				popup.errorService();
			}
		});
		
	}
	
	//发送到桌面快捷方式
	function sendDesktopShortcut(){
		$.ajax({
			url : appPath +　"/usershortcut.action",
			type:'post',
			dataType:'text',
			data:{
				"fn" : "addShortcuts",
				"shortcutid" : curContextmenuId,
				"app_unid" : app_unid,
				"userid" : userid
			},
			success:function(response){
				top.window.location.reload();
				alert('操作成功');
			},
			error:function(){
				popup.errorService();
			}
		});
	}
	
	function logout(){
		$.ajax({
			url : appPath +　"/BaseAction.action",
			type:'post',
			dataType:'text',
			data:{
				"type" : "loginWriteOff"
			},
			success:function(response){
				location.href=　appPath+"/hzlogin.jsp";
			},
			error:function(){
				popup.errorService();
			}		
		});
	}