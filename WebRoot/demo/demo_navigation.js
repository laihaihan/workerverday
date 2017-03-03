/**
 * 导航相关js
 */
var demoNavigation = {
	load:function(){
		this.init();
	},
	init:function(){
		var navActionParams = {type:"nav",act:"getNav","random":ucapCommonFun.getRandomString()};
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:navActionParams,
			callback:function(options,success,response){
				if(success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult){
						return;
					}
					if(response.responseText==""){
						$("demo_div").innerHTML = "系统没有配置导航";
						return;
					}
					$("demo_div").innerHTML = response.responseText;	//显示导航栏json
					
					//解析导航栏json
					var nav = exjson.navigation;
					var cuts = exjson.uiShortcuts;
					var navigation ="";	//保存导航栏HTML
					if(nav.messagePosition=="01"){
						navigation ="&nbsp;&nbsp;"+nav.message;
					}				
					for(var i=0;i<cuts.length;i++){
						var cutHtml = demoNavigation.getCutHtml(cuts[i]);
						if("undefined"==typeof(cutHtml) || cutHtml=="")continue;
						navigation +="&nbsp;&nbsp;"+cutHtml;						
					}
					Ext.getDom("demo_portal_div").innerHTML = navigation;
					
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		
	},
	
	/**
	 * 获取单个快捷方式的内容
	 * @param {} cutobj
	 * @param flag 有值，默认图标和文字都提示
	 * @return {}
	 */
	getCutHtml:function(cutobj,flag){
		if (typeof flag =="undefined") flag="";
		var type = parseInt(cutobj.type,10);
		var clk="";
		if (type==1){
			//是模块
			clk = ucapClk.getClk(cutobj.content,1,1);
		} else if (type==2){	
			//说明是视图
			clk = ucapClk.getClk(cutobj.content,2,1);
		} else if (type==3){
			//说明是JS脚本 
			if (cutobj.content.indexOf("ucapCommonFun.buttonFun.setMainPage")>-1){
				//说明是设置为首页代码
				clk = ucapCommonFun.buttonFun.setMainPage();	
			}else if (cutobj.content.indexOf("ucapCommonFun.buttonFun.changeUserStatus")>-1){
				//说明是改变用户身份的代码，要判断当前用户是否有，如果只是个人，则隐藏此按钮
				if (ucapSession.userJson.appAdmin || ucapSession.userJson.adminDeptUnids!=""){
					//说明是系统管理员或是部门管理员
					var titleinfo="";
					if(ucapSession.userJson.userStatus==3){
						titleinfo="当前用户身份是普通用户";
					} else if (ucapSession.userJson.userStatus==2){
						titleinfo="当前用户身份是部门管理员";
					} else {
						titleinfo="当前用户身份是应用系统管理员";
					}
					cutobj.tip +="  " + titleinfo;
					clk = ' onclick="'+cutobj.content+'"';
				} else{
					return "";
				}
			}else {
				clk = ' onclick="'+cutobj.content+'"';
			}
		} else if (type==4){
			//说明是URL
			clk = ucapClk.getClk(cutobj.content,3,3);
		}
		var navImg="";
		if (clk!=""){
			navImg ='<a href="javascript:void(0)" title="'+cutobj.tip+'" '+clk+' >';
			navImg +='<img src="'+ucapSession.appPath+cutobj.picturePath+'" align="absmiddle" />';
			if (flag!=""){
				//说明显示图标文字
				navImg += "&nbsp;"+cutobj.name;
			} else {
				if (cutobj.displayType=="01"){
					//说明显示图标
				} else if (cutobj.displayType=="02"){
					//说明只显示文字
					navImg += cutobj.name;
				} else if (cutobj.displayType=="03"){
					//说明显示图标文字
					navImg += "&nbsp;"+cutobj.name;
				}
			}
			navImg+='</a>';//modify by jc
		};
		return navImg;
	}
};