/**
 * 系统模块初始化菜单
 * @author cyingquan@qq.com
 * @2011-01-06
 * @version 1.0
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
				var mainMenu = "<div class=\"mainMenu\">";			
				$.each(dataObj.root,function(index,item){
					//模块点击引用ref
					var ref = item.content;
					if( ref!=undefined ){
						ref = "ref=\""+ref+"\"";
					}else{
						ref = "";
					}	
					
					if(index==0){
						mainMenu+="<div class=\"menuText2\" "+ref+" type=\""+item.type+"\"> "+item.text+" </div>";
					}else{
						mainMenu+="<div class=\"menuText1\" "+ref+" type=\""+item.type+"\"> "+item.text+" </div>";
					}
				});
				mainMenu += "</div>";					
				$('#menu').append(mainMenu);
				
				//3.组装欢迎栏插入 div#menu
				var subMenu = "";
				$.each(dataObj.root,function(index,item){
					if(index==0){
						subMenu += "<div  class=\"subMenu\">"+""+"  </div>";
					}else{
						subMenu+="<div  class=\"subMenu1\">&nbsp;&nbsp; </div>";
					}
				});
				$('#menu').append(subMenu);
				
				//4.为模块Tab添加click事件
				$('.mainMenu div').click(function(){
					$('.mainMenu div').attr('class','menuText1');
					$(this).attr('class','menuText2');
				
					if($.trim($(this).text())=='平台配置'){
						location.href=globalSession.appPath+"sys/jsp/index.jsp";
					}
					//展开模块菜单
					menu.showMenuModule($(this).text(),$(this).attr("ref"),$(this).attr("type"),menuStyle,iconStyle);
				});
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
			//1.设置左边菜单panel标题
			$("#west").panel("setTitle","&nbsp;"+moduleName);
			
			
			//2.Ajax获取远程Ztree数据	
			menuStyle = (menuStyle == undefined || menuStyle == "") ? "1" : menuStyle;//菜单样式：1.树形菜单  2.抽屉菜单
			iconStyle = (iconStyle == undefined || iconStyle == "") ? "1" : iconStyle;//菜单图标样式：1.大图标  2.小图标
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
					url:globalSession.appPath+"/lw-admin/home/left_menu.jsp?moduleUnid="+moduleUnid+"&iconStyle="+iconStyle,
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
		$('.mainMenu div').eq(index).click();
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
	}
	
}