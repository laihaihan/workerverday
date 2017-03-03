/**
 * win7样式系统加载
 * @author zjianhui@linewell.com
 * @2012-12-11
 * @version 1.0
*/


$(function(){
	//桌面右键菜单
	$('#mm').menu();
	//管理员可以设置桌面默认图标
	if("1000D01F"==userid){
		$('#defaulshortcuts').css("display","");
	}
	
	//开始菜单模块右键菜单
	$('#shortcut').menu();  
	
	//桌面快捷方式右键事件
	$('#desktopShortcut').menu(); 
	
	
	//消息提醒 
	//setMsgTip();
	//定时刷新
	//window.setTimeout("setMsgTip();", 500000);

	
	
	//消息提醒栏展开闭合
	$(".win_moduleT").toggle(function(){
		var $self = $(this);
		$self.siblings().slideToggle(300,function(){
			$self.children("i").addClass("icons08")
		
		});
	},function(){
		var $self = $(this);
		$self.siblings().slideToggle(300,function(){
			$self.children("i").removeClass("icons08");
		});
	});	


	
	//$('.deskwindow').draggable().resizable();

	$('.easyui-draggable').draggable({
	   onStopDrag:function(source){
	   		
	   		if(event.button!=2){//因为右键有绑定菜单，右键拖拉停止事件不做处理
           		$.ajax({
					url : appPath +　"/usershortcut.action",
					type:'post',
					dataType:'text',
					data:{
						"fn" : "modifyShortcuts",
						"shortcutid" : curContextmenuId,
						"app_unid" : app_unid,
						"userid" : userid,
						"evX" : $(this).offset().left,
						"evY" : $(this).offset().top
					},
					success:function(response){
						
					},
					error:function(){
						popup.errorService();
					}
				});
         	} 
	   		
		
	   }
	}); 
	
	//设置全屏
	//if(window.screenTop>0){
	//	var WshShell = new ActiveXObject("WScript.Shell");
	//	WshShell.SendKeys("{F11}");
	//}
	
	//设置任务栏时间
	get_time('timetable');
	window.setTimeout("get_time('timetable');", 40000);	
		//菜单动态加载
		//1.获取平台模块权限JSON数据
	
		$.ajax({
			type: 'post',
			cache:false,
			url:globalSession.ucapBaseAction,
			dataType:'text',
			data:{
				type:"menu",
				act:"getAllMenu",
				menuType:"1"
			},
			error:function(){
				top.location.href=appPath+"/hzlogin.jsp";
			},
			success:function(response){
				if(response.length==0){
					alert('对不起!您的用户未分配权限,请您联系管理人员');
					return;
				}				
				var data = "{root:"+response+"}";							
				var dataObj=eval("("+data+")");
				
				$("#first_menu").html("");
				$("#second-panel-menu-id").html("");					
				$.each(dataObj.root,function(index,item){
					if(item.type!=3){
						$("#first_menu").html($("#first_menu").html()+"<li><a href='#'><img src='"+appPath+"/core/js/win7style/startmenu/images/workflow.png' align='absMiddle'>"+item.text+"</a></li>");
						//加载菜单模块
						$.ajax({
							type: 'post',
							cache:true,
							url:"module.action?act=getModuleMenu&moduleUnid="+item.content,
							dataType:'text',
							async:false,//同步执行
							error:function(){
								alert('加载子模块出错！！');
							},
							success:function(responsemodule){
								var datamodule = "{root:"+responsemodule+"}";							
								var dataObjModule=eval("("+datamodule+")");
								$("#second-panel-menu-id").html($("#second-panel-menu-id").html()+"<div id='"+item.content+"' class='jscroll-c' style='display:block;'><ul id='ul_"+item.content+"'>");	

								$.each(dataObjModule.root,function(index,itemModule){
									$("#ul_"+item.content).html($("#ul_"+item.content).html()+"<li id='"+itemModule.id+"'><a href='#' class='smexpand'><span>"+itemModule.name+"</span></a>")
									//第三级模块菜单
									var childrenHtml = "<ul style='display:none;'>";
									$.each(itemModule.children,function(index,itemChildren){
										childrenHtml = childrenHtml + "<li><a class='startIcon' onmouseout=bingRightKey() id='startmenu_"+itemChildren.id+"'  oncontextmenu = startMenuRightKey('"+itemChildren.id+"')  href='#bottonTmp_"+itemChildren.id+"' onclick=winShow('"+appPath+"/"+itemChildren.link+"','"+itemChildren.name+"','"+itemChildren.icon+"','bottonTmp_"+itemChildren.id+"');><span>"+itemChildren.name+"</span></a></li>";	
									});
									childrenHtml = childrenHtml + "</ul></li>";
								
									$("#"+itemModule.id).html($("#"+itemModule.id).html()+childrenHtml);
								});
								//$("#"+item.content).html($("#"+item.content).html()+"</ul>");
								//alert($("#second-panel-menu-id").html());
							}
						});	
					}
				});		
				
					
				//一级菜单展出二级事件设置
				$("#first_menu li").each(function(index){
					$(this).click(function(){
						$(this).children().addClass("active").parent().siblings("li").children().removeClass("active");
						$(".jscroll-c:eq("+ index +")").css("display","block").siblings(".jscroll-c").css("display","none");
					});
				});
				
				//二级菜单展出三级
				$(".jscroll-c .smexpand").click(function(){
					$(this).toggleClass("active");
					$(this).siblings("ul").toggle();		
				})
			}
		});
		
});


//function setMsgTip(){
	//加载消息提醒
	//var tip = moduleMessageTip();
	//$('#msgtip').html(tip);
//}

//重新绑定桌面右键菜单
function bingRightKey(){
	$(document).bind('contextmenu',function(){
		var ev = window.event;
		$('#mm').menu('show',{
			left:ev.clientX,
			top:ev.clientY
		});
		return false;
	});
}

//开始菜单的隐藏和显示
function startMenuRightKey(id){
	//移除桌面右键菜单
	$(document).unbind('contextmenu');
	
	//屏蔽桌面右键事件
	$(document).bind('contextmenu',function(){
		return false;
	});
	
	curContextmenuId = id;
	var ev = window.event; 
	$('#shortcut').menu('show',{
		left:ev.clientX,
		top:ev.clientY
	});
	return false;
}


//开始菜单的隐藏和显示
function startMenu(){
	if($("#start_menu_panel").css("display")=="none"){
		$("#start_menu_panel").css("display","");
	}else{
		$("#start_menu_panel").css("display","none");
	}
}
//如果开启则关闭
function hiddenStartMenu(){
	if($("#start_menu_panel").css("display")!="none"){
		$("#start_menu_panel").css("display","none");
	}
}

//动态创建的窗口不缓存，关闭即清楚缓存页面
function removeWin(objId){
	$("#"+objId).remove();
	$("#window_"+objId).remove();
}

//设置桌面背景
function setDesktopPic(picPath){
	$('#wallpaper').attr('src',picPath);

}

//动态添加样式
function winShow(winUrl,title,imgPath,objId){
	//动态添加任务栏
	var bottomHtml = "<li id='"+objId+"'><a href='#window_"+objId+"'><img src="+imgPath+"  width=20 height=20/>"+title+"</a></li>";
	$("#dock").html($("#dock").html() + bottomHtml);
	
	//动态添加展示窗口
	var formHtml = "<div id='window_"+objId+"' class='abs deskwindow'><div class='abs window_inner'><div class='window_top'>";
	formHtml = formHtml + "<span class='float_left'><img src='"+imgPath+"'  width=20 height=20/>"+title + "</span>";
	formHtml = formHtml + "<span class='float_right'><a href='#' class='window_min'></a><a href='#' class='window_resize'></a>";
	formHtml = formHtml + "<a href='#"+objId+"' class='window_close'  onclick=removeWin('"+objId+"')></a></span> </div>";
	formHtml = formHtml + "<div class='abs window_content'><table height='100%' width='100%'><tr><td height='100%'>";
	formHtml = formHtml + "<iframe width='100%' height='100%' style='border: 0px;' frameborder='0'  src='"+winUrl+"'></iframe>";
	formHtml = formHtml + "</td> </tr></table></div></div><span class='abs ui-resizable-handle ui-resizable-se'></span></div>";

	$("#desktop").html($("#desktop").html() + formHtml);
	
	//隐藏开始菜单
	hiddenStartMenu();
}
	
function openMisgContent(id){
	$("#startmenu_"+id).click(); 
}
	