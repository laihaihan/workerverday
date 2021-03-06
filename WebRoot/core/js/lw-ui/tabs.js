$(function(){
	tabs.init();
});
var tabs = {
	top:0,
	left:0,
	width:0,
	height:0,
	zindex:0,
	isMax:true,
	/**
	 *初始化标签栏
	*/
	init:function(){
		//1.初始化标签右边按钮
		jQuery("#tabs").tabs({
			tools:[{
				iconCls:'tab-delete',
				handler: function(){
					//位置
					var offset = jQuery(this).offset();
					var top = offset.top+30;
					var left = offset.left-120;	
												
					jQuery('#recycleTabs').menu('show', {
			            left: left,
			            top: top
			        });
				}
			},{
				iconCls:'tab-cog',
				handler: function(){
					var offset = jQuery(this).offset();
					var top = offset.top+30;
					var left = offset.left-190;		
							
					jQuery("#setTabs").css("top",top);
					jQuery("#setTabs").css("left",left);
					jQuery("#setTabs").toggle("fast");
				}
			}],
			//关闭标签加入 已关闭标签例表
			onBeforeClose:function(title){
				var tab = jQuery("#tabs").tabs("getTab",title);
				var iconCls = tab.find("iframe").attr("iconCls")
				var link = tab.find("iframe").attr("link")
				
				tabs.appendRecycleTabs(title,iconCls,link);
			},
			onSelect:function(){
				try{
					var tab = top.jQuery("#tabs").tabs("getSelected");
					var iframe = tab.find("iframe");
					var datagrid = iframe.contents().find(".datagrid-body");
					
					if(datagrid.length==2){
						if(datagrid.eq(0).height()<=20){
							iframe.attr('src',iframe.attr('src'));
						}else{
							tabs.refreshTabGrid();
						}
					}
					
				}catch(e){}
			}
		});
		
		//2.初始化绑定事件
		tabs.bindEvent();
		
		//3.初始化右键菜单
		tabs.initContextMenu();
		
		//4.记录标签属性,用于窗口最大化切换
		tabs.top = jQuery("#center").parent().css("top");
		tabs.left = jQuery("#center").parent().css("left");
		tabs.width = jQuery("#center").parent().width();
		tabs.height = jQuery("#center").height();
	},
	/**
	 *绑定事件
	*/
	bindEvent:function(){
		//绑定 清除已关闭按钮 事件,用于清空已关闭标签例表
		jQuery("#recycleTabs-remove").bind("click",function(){
			jQuery("#recycleTabs div:gt(3)").remove();
		});
		
		//绑定标签栏 双击 事件,用于全屏展示标签栏
		jQuery("#tabs ul[class='tabs']").bind("dblclick",function(){
			var clientWidth = document.body.clientWidth;
			var clientHeight = document.body.clientHeight;
			
			if(tabs.isMax){
				//动画最大化窗口
				jQuery("#center").parent().css("z-index",99);
				
				jQuery("#center").parent().animate({
					top:0,
					left:0,
					width:clientWidth
				},"normal");
				
				jQuery("#center").width(clientWidth);
				jQuery("#center").height(clientHeight);		
				
				tabs.isMax = false;			
			}else{
				//动画还原窗口		
				jQuery("#center").parent().animate({
					top:tabs.top,
					left:tabs.left,
					width:tabs.width
				},"normal",null,function(){
					jQuery("#center").parent().css("z-index",0);
				});				
				
				jQuery("#center").width(tabs.width);
				jQuery("#center").height(tabs.height);
				
				tabs.isMax = true;	
			}
			jQuery('#tabs').tabs("resize");
		});
	},
	/**
	 * 打开功能标签
	 * @param title 标题
	 * @param icon 图标地址
	 * @param link 链接地址
	*/
	openTab:function(title,iconCls,link,menuName){
		try{
			$('#div_iframe').hide();
			$('.layout-panel-west,.layout-panel-center').show();
			
			jQuery("#recycleTabs").hide();
			
			if(menuName){
				jQuery('#menu').find('div:contains('+menuName+')').click();
			}
			
			var content = "";
			if(link.indexOf('.jsp')>-1 || link.indexOf('.action')>-1){
				//add by lijx 2013/09/23 用于审计管理.........start...........
				link += (link.indexOf("?")>-1?"&":"?")+"dwAuditViewTitle="+encodeURIComponent(encodeURIComponent(title));
				//.............end.........................................
				content = "<iframe title='"+title+"' iconCls='"+iconCls+"' link='"+link+"' scrolling='auto' frameborder='0'  src='"+link+"' style='width:100%;height:100%;' style='padding:1px' marginheight='0' marginwidth='0'></iframe>";
			}else{
				alert('未设置模块');
				return ;
			}
			
			if(iconCls==''){
				iconCls = appPath+'/core/js/easyui/themes/icons/application.png';
			}
			
			//标签是否已打开
			if(!jQuery('#tabs').tabs('exists',title)){
			
				//新增TAB
				jQuery('#tabs').tabs('add',{
				    title:title,
				    content:content,
				    closable:true,
				    iconCls:' '
				});
				
				//渲染图标
				jQuery('.tabs-icon:last').attr("style","background:url('"+iconCls+"') no-repeat;");
				
				//标签数大于设置数关闭最早打开的标签
				var tabNum = jQuery.cookie('setTabNum');
				if(tabNum==null){
					//当标签数大于5个时提示设置标签数
					if(jQuery('#tabs').find('.tabs li').length>5){
						var tabSet = jQuery(".tab-cog");
						var offset = tabSet.offset();
						var top = offset.top+30;
						var left = offset.left-190;	
						
						jQuery("#setTabs").css("top",top);
						jQuery("#setTabs").css("left",left);
						jQuery("#setTabs").show("fast");
					}
				}else{
					if(tabNum=="fit"){
						var tabWidth = jQuery('#tabs').width();
						var liWidth = (jQuery('#tabs').find('.tabs li').length)*110;
					
						if(liWidth>tabWidth){
							jQuery('#tabs').find('.tabs li').eq(1).find('.tabs-close').click();
						}
					}else{
						if(jQuery('#tabs').find('.tabs li').length>tabNum){
							jQuery('#tabs').find('.tabs li').eq(1).find('.tabs-close').click();
						}
					}					
				}
				
				
				//为新建标签绑定事件
				tabs.bindNewTabEvent(title,iconCls,link);
				
			}else{
				jQuery('#tabs').tabs('select',title);
				//刷新例表
				tabs.refreshTabGrid();
			}
		}catch(e){
			//top.ucapCommonFun.indexOpen(); 平台方法
			return false;
		}
	},
	/**
	 * 为新建的标签绑定单击、双击、右键菜单事件
	*/
	bindNewTabEvent:function(title,iconCls,link){
		
		//为标签添加双击事件
		jQuery('#tabs').find('.tabs li:last').bind('dblclick',function(){
       		jQuery('#tabs').tabs('close',title);	
		});
		
		//为标签添加右键菜单
		tabs.bindContextMenu();
	},
	/**
	 * 为新增标签绑定右键菜单事件
	*/
	bindContextMenu:function(){
		var currIndex = jQuery("#tabs li").length-1;
		
		jQuery('#tabs').find('.tabs li:last').bind('contextmenu',function(e){
			jQuery('#tabMenu').menu('show', {
	            left: e.pageX,
	            top: e.pageY
	        });	     
	        var currTitle = jQuery(this).find(".tabs-title:last").text();
	        jQuery('#tabMenu').data("currtab",currTitle);	
	        jQuery('#tabMenu').data("currIndex",currIndex);	
	        return false;
		});	
		
		delete currIndex; 
	},
	/**
	 * 加入已关闭的标签例表
	 * @param title 标题
	 * @param icon 图标地址
	 * @param link 链接地址
	*/
	appendRecycleTabs:function(title,iconCls,link){
		var obj = jQuery('#recycleTabs').menu('findItem',title);
		if(obj!=null){
			//obj.remove();
		}else{
			jQuery('#recycleTabs').menu('appendItem', {
	            text:title,
	            href:"javascript:tabs.openTab(\""+title+"\",\""+iconCls+"\",\""+link+"\")",
	            iconCls:" "
	        });
	        //渲染图标
	    	jQuery('#recycleTabs .menu-icon:last').attr("style","background:url('"+iconCls+"') no-repeat;");
		}
		/*
		var existTab = jQuery("#recycleTabs table tr td").filter(function(){
			return jQuery.trim(jQuery(this).text())==title;
		});
		if(existTab.text()==title){
			existTab.parent().remove();
		}
		jQuery("#recycleTabs table tr:eq(1)").after("<tr><td><img src='"+iconCls+"'/></td><td><a href='javascript:' onclick='tabs.openTab(\""+title+"\",\""+iconCls+"\",\""+link+"\")'>"+title+"</a></td></tr>");
		*/
	},
	/**
	 * 初始化右键菜单
	*/
	initContextMenu:function(){
		//关闭当前
	    jQuery('#tabMenu-close').click(function(){
	        var currTitle = jQuery('#tabMenu').data("currtab");
	        jQuery('#tabs').tabs('close',currTitle);
	    })
	    
	    //全部关闭
	    jQuery('#tabMenu-closeall').click(function(){
	    	jQuery("#tabs a[class='tabs-close']").click();
	    });
	    
	    //关闭除当前之外的TAB
	    jQuery('#tabMenu-closeother').click(function(){
	        var currIndex = jQuery('#tabMenu').data("currIndex");
	        jQuery("#tabs li").eq(currIndex).siblings().find("a[class='tabs-close']").click();
	    });
	    
	    //关闭左侧标签
	    jQuery('#tabMenu-closeleft').click(function(){
	    	var currIndex = jQuery('#tabMenu').data("currIndex");
	    	jQuery("#tabs li").eq(currIndex).prevAll().find("a[class='tabs-close']").click();
	    });
	    
	    //关闭右侧标签
	    jQuery('#tabMenu-closeright').click(function(){
	    	var currIndex = jQuery('#tabMenu').data("currIndex");
	    	jQuery("#tabs li").eq(currIndex).nextAll().find("a[class='tabs-close']").click();
	    });
	},
	/*
	 * 刷新标签grid例表数据+树形
	*/
	refreshTabGrid:function(){
		//弹出框视图刷新
		try{
			if(top.lwin.curDocument().length>0){
				var iframe = top.lwin.curDocument().find('iframe');
				if(iframe.length>0){
					for(var i=0;i<iframe.length;i++){
						try{
							iframe.eq(i)[0].contentWindow.gReload();
						}catch(e){}
					}
				}
			}
		}catch(e){}
		
		try{
			var tab = top.jQuery("#tabs").tabs("getSelected");
			var iframe = tab.find("iframe");
			
			//tab底下自定义页面嵌入视图刷新
			try{
				if(iframe.contents().find('iframe').length>0){
					var iframes = iframe.contents().find('iframe');
					for(var i=0;i<iframes.length;i++){
						try{
							iframes.eq(i)[0].contentWindow.gReload();
						}catch(e){}
					}
				}
			}catch(e){}
			
			iframe.contents().find(".pagination-load").click();
			//iframe[0].contentWindow.refreshTree();
			
		}catch(e){
			try{
				var id = viewTabs.tabs.getActiveTab().getId();
				var iframe = jQuery('#'+id).find('iframe');
				iframe.contents().find(".pagination-load").click();
				iframe[0].contentWindow.refreshTree();
			}catch(e){
				try{
					var iframe = jQuery('#ucapView').find('iframe');
					iframe.contents().find(".pagination-load").click();
					iframe[0].contentWindow.refreshTree();
				}catch(e){}
			}
		}
	},
	/**
	 * 获取选中标签
	*/
	getSelected:function(){
		var tab = top.jQuery("#tabs").tabs("getSelected");
		return tab;
	},
	/**
	 * 获取选中索引
	*/
	getTabIndex:function(){
		var tab = top.tabs.getSelected();
		var index = top.jQuery("#tabs").tabs('getTabIndex',tab);
		return index;
	},
	/**
	 * 关闭当前选中的标签
	*/
	close:function(){
		var index = top.tabs.getTabIndex();
		top.jQuery("#tabs").tabs('close',index);
	}
};