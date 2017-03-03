/**
 * 系统模块初始化菜单
 * @author yqi@line.com
 * @2013-03-14
 * @version 2.0
*/
var menu = {
	
	/**
	 *初始化菜单
	*/
	init:function(menuStyle,iconStyle){
		//1.获取平台模块权限JSON数据
		$.ajax({
			type: 'post',
			cache:false,
			//url:globalSession.ucapBaseAction,
			url:'menu.action',
			dataType:'text',
			data:{
				type:"menu",
				act:"getAllMenu",
				menuType:"1"
			},
			error:function(){
				top.location.href=appPath+"/login.jsp";
			},
			success:function(response){
				if(response.length==0){
					alert('对不起!您的用户未分配权限,请您联系管理人员');
					return;
				}				
				var data = "{root:"+response+"}";							
				var dataObj=eval("("+data+")");
				
				//2.组装模块Tab插入 div#menu
//				var mainMenu = "<div class=\"nav\"><ul>";	
//				$.each(dataObj.root,function(index,item){
//					//模块点击引用ref
//					var ref = item.content;
//					if( ref!=undefined ){
//						ref = "ref=\""+ref+"\"";
//					}else{
//						ref = "";
//					}	
//					
//					if(index==0){
//						mainMenu+="<li class=\"navSelect\"><a onfocus=\"this.blur()\" href=\"javascript:void(0)\"" +ref+ " type=\""+item.type+"\">"+item.text+"</a> </li>";
//					}else{
//						mainMenu+="<li ><a onfocus=\"this.blur()\" href=\"javascript:void(0)\"" +ref+ " type=\""+item.type+"\">"+item.text+"</a> </li>";
//					}
//					mainMenu+="<li class=\"navMid\"><img src=\""+globalSession.appPath+"core/themes/default2.0/images/nav_mid.gif\" /></li>";
//				});
//				mainMenu += "</ul></div>";	
				
				var mainMenu = "<div class=\"navBox\">";
				mainMenu += "<div class=\"menu_vleft\"><img src=\""+globalSession.appPath+"core/themes/default2.0/images/arrow_menu_left.gif\" /></div>";
				mainMenu += "<div class=\"nav\"><ul class=\"menu_scrol\">";
				
				$.each(dataObj.root,function(index,item){
					//模块点击引用ref
					var ref = item.content;
					if( ref!=undefined ){
						ref = "ref=\""+ref+"\"";
					}else{
						ref = "";
					}	
					if(index==0){
						mainMenu+="<li class=\"navSelect\"><a onfocus=\"this.blur()\" href=\"javascript:void(0)\"" +ref+ " type=\""+item.type+"\">"+item.text+"</a> </li>";
					}else{
						mainMenu+="<li ><a onfocus=\"this.blur()\" href=\"javascript:void(0)\"" +ref+ " type=\""+item.type+"\">"+item.text+"</a> </li>";
					}
					mainMenu+="<li class=\"navMid\"><img src=\""+globalSession.appPath+"core/themes/default2.0/images/nav_mid.gif\" /></li>";
				});
				mainMenu += "</ul></div>";	
				mainMenu += "<div class=\"menu_vright\"><img src=\""+globalSession.appPath+"core/themes/default2.0/images/arrow_menu_right.gif\" /></div>";
				mainMenu += "</div>";
				
				mainMenu += "<div class=\"search\"><input name=\"keyword\" type=\"text\" value=\"请输入关键字搜索\" size=\"14\" /> "
							+ "<select name=\"select\"> "
							+ "<option value=\"-请选择-\">-请选择-</option> "
							+ "</select> "
							+ "<a href=\"#\"><img src=\""+globalSession.appPath+"core/themes/default2.0/images/btn_search.gif\" width=\"58\" height=\"24\" border=\"0\" align=\"absmiddle\" /></a>"
							+ "</div> ";
				
				$('#menu').append(mainMenu);
				
				//3.组装欢迎栏插入 div#menu
				var subMenu = "";
				var tip = menu.moduleMessageTip();
				$.each(dataObj.root,function(index,item){
					if(index==0){
						subMenu += "<div  class=\"subMenu\">"+tip+"  </div>";
					}else{
						subMenu+="<div  class=\"subMenu1\">&nbsp;&nbsp; </div>";
					}
				});
				$('#menu').append(subMenu);
				
				//4.为模块Tab添加click事件
				$('.nav ul li a').click(function(){		
					
					$('.nav ul li').attr('class','');
					$('.nav ul li img').parent().attr('class','navMid');
					$(this).parent().attr('class','navSelect');
					//替换颜色 
					$('.nav ul li a').css("color","#FFFFFF");
					$(this).css("color","#0F3E4D");
				
					if($.trim($(this).text())=='平台配置'){
						location.href=globalSession.appPath+"sys/jsp/index.jsp";
					}
					//展开模块菜单
					menu.showMenuModule($(this).text(),$(this).attr("ref"),$(this).attr("type"),menuStyle,iconStyle);
				});
				
				
				/*****为左右滑动添加事件 【开始】*******/
				var index = 0;  
				var i = 6;  //定义每个面板显示4个菜单
				var len = $(".nav .menu_scrol li").length/2;  //获得LI元素的个数
				var page = 1;
				var maxpage = Math.ceil(len/i);
				var scrollWidth = $(".nav").width();
				var divbox = "<div id='div1' >已经到最后一个面板了</div>";
				$("#menu").append(divbox);
				//5.为向右模块Tab滑动添加click事件
				$(".menu_vright").click(function(e){
					if(!$(".nav .menu_scrol").is(":animated")){
						if(page == maxpage ){
							$(".nav .menu_scrol").stop();
							//增加提示框样式
							$("#div1").css({
								"top": (e.pageY + 20) +"px",
								"left": (e.pageX + 20) +"px",
								"opacity": "0.9"
							}).stop(true,false).fadeIn(500).fadeOut(6000);
						}else{
							$(".nav .menu_scrol").animate({left : "-=" + scrollWidth +"px"},1000);
							page++;
						}
					}
				});
				
				//5.为向左模块Tab滑动添加click事件
				$(".menu_vleft").click(function(e){
					if(!$(".nav .menu_scrol").is(":animated")){
						if(page == 1){
							$(".nav .menu_scrol").stop();
						}else{
							$(".nav .menu_scrol").animate({left : "+=" + scrollWidth +"px"},1000);
							page--;
						}
					}
				});
				/*****为左右滑动添加事件 【结束】*******/
				
				
				//从平台模块链接打开
				if(mainMenuIndex!=undefined){
					menu.showMenuModuleFromIndex(mainMenuIndex);
				}					
			}
		});
	},
	
	/**
	 * 展开模块菜单
	 * @param moduleName 模块名称
	 * @param moduleUnid 模块unid
	 * @param type 默认 树形展示,其它预留等扩展
	 *
	*/
	showMenuModule:function(moduleName,moduleUnid,type,menuStyle,iconStyle){
		$('#div_iframe').hide();
		$('.layout-panel-west,.layout-panel-center').show();
		
		if( type=='03' ){
			$('.layout-panel-west,.layout-panel-center').hide();
			$('#center_iframe').attr('src',moduleUnid);
			$('#div_iframe').show();
			
		}else{
			
			//2.Ajax获取远程Ztree数据	
			menuStyle = (menuStyle == undefined || menuStyle == "") ? "1" : menuStyle;//菜单样式：1.树形菜单  2.抽屉菜单
			iconStyle = (iconStyle == undefined || iconStyle == "") ? "1" : iconStyle;//菜单图标样式：1.大图标  2.小图标
			
			menuStyle = '2';
			if(menuStyle == "1"){//树形菜单
				var setting = {
					async: {
						enable: true,
						url:"module.action?act=getModuleMenu&moduleUnid="+moduleUnid,
						autoParam:["id"]
					},
					callback: {
						onClick: menu.zTreeOnClick,
						onAsyncSuccess:function(){
				    		$(".root_close,.roots_close").click();
				    	}
					}
				};
				$.fn.zTree.init($("#westTree"), setting);
			}else{//抽屉菜单
				$.ajax({
					type:'post',
					url:globalSession.appPath+"/lw-admin/home2.0/left_menu.jsp?moduleUnid="+moduleUnid+"&iconStyle="+iconStyle
						+"&moduleName="+encodeURIComponent(encodeURIComponent(moduleName)),
					async:false,
					error:function(){
						$("#west").html("<p>加载数据出错...</p>");
					},
					success:function(html){
						$("#west").html(html);
					}
				});
			}
		}
	},
	
	/**
	 *传入index展开模块菜单
	 *
	*/
	showMenuModuleFromIndex:function(index){
		$('.nav ul a').eq(index).click();
	},
	/**
	 * 从树型菜单打开功能标签
	 * @param event
	 * @param treeId
	 * @param treeNode
	 * 
	*/
	zTreeOnClick:function(event, treeId, treeNode) {
		//alert(treeNode.id+","+treeNode.tId + ", " + treeNode.icon);
		var title = treeNode.name;
		var iconCls = treeNode.icon;
		var link = globalSession.appPath+treeNode.link;
		if(link.indexOf("?")>-1){
			link = link+"&_rand="+Math.random()+"&modId="+treeNode.id;
		}else{
			link = link+"?_rand="+Math.random()+"&modId="+treeNode.id;
		}
	
		if(treeNode.isParent!=true){
			tabs.openTab(title,iconCls,link);
		}
	},
	
	//加载模块消息提醒
	moduleMessageTip : function(){
		var result = "";
		$.ajax({
			url : "ApasMessageTip.action?fn=getConfig",
			type:'post',
			async:false,//同步执行
			dataType:'json',
			error:function(){
				$("#errorMsg").text("服务器异常。请记录时间，联系管理员！");
			},
			success:function(response){
				result =  "<div style=\"float:left;\">"+response.appname+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>";
				result += "<div style=\"float:right;\">";
				if(response.result){
					var json = response.json;
					var count = 0;
					for(var i=0;i<json.length;i++){
						var picture = 'bulb_gray.gif';
						count =  json[i].countnum;
						if(count>0){
							picture = 'bulb_y.gif';
						}
						result += "<IMG id=ob_left"+i+" src=\""+appPath+"/hzwas/images/"+picture+"\" width=\"12\"  height=\"16\" align=\"middle\">";//height=\"10\" align=\"middle\"
						result += "<a style='height:20px;' href=\"javascript:openTab('"+json[i].module_leafname+"','"+json[i].view_unid+"','','"+json[i].module_title+"');\">"
						+ json[i].name + "("+count+")</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					}
				}else{
					$("#errorMsg").text("服务器异常。请记录时间，联系管理员！");
				}
				result += "<div>";
			}	
		});
		
		return result;
	}


	
	
}