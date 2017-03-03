<%--
/**
 * 内网系统顶部页
 * @author cyingquan@qq.com
 * @2011-01-06
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div region="north" border="false" style="width: 100%; height: 132px; overflow: hidden; position: relative;">
	<div id="topBar" class="topBar">
		<!-- logo -->
		<div class="logo" id="logo">
			<img src="${path}/${sysCfg.logo_img}" width="450" height="100">
		</div>

		<!-- 自定义操作按钮 -->
		<div class="topBarBox" id="topBarBox">
			<div style="" id="navigation_top">
				<div class="topBarTool" id="topBarTool">
					<div class="topBarToolLeft" id="topBarToolLeft"></div>
					<div class="topBarToolBox" id="topBarToolBox"> 
						 &nbsp;&nbsp;当前用户：${sessionScope.session.user.displayName}&nbsp;&nbsp;
						<s:if test="#request.buttonList.size()>0">
							<s:iterator value="#request.buttonList" id="button">
			        			<s:if test="#button.button_name == '首页'">
			        				<a title="${button.button_display_name}" href="${path}/lw-admin/index.jsp">
			        					<s:if test="#button.button_display_img == 1">
											<img align="absmiddle" src="${path}${button.button_img_path}"> 
			        					</s:if>
			        					<s:else>
			        						${button.button_name}
			        					</s:else>
									</a>&nbsp;&nbsp;
			        			</s:if>
			        			<s:elseif test="#button.button_name == '分级管理中心'">
			        				<s:if test="%{#session.session.user.displayName=='sysadmin' || #session.session.user.displayName=='admin'}">
										<a href="${path}/sys/system/index.jsp" target="_blank" title="${button.button_display_name}" href="javascript:void(0)">
											<s:if test="#button.button_display_img == 1">
												<img align="absmiddle" src="${path}${button.button_img_path}"> 
				        					</s:if>
				        					<s:else>
				        						${button.button_name}
				        					</s:else> 
										</a>&nbsp;
									</s:if>
			        			</s:elseif> 
			        			<s:elseif test="#button.button_name == '辅助开发平台'">
			        				<s:if test="%{#session.session.user.displayName=='sysadmin' || #session.session.user.displayName=='admin'}">
										<a href="${path}/core/system/sys_manager.jsp" target="_blank" title="${button.button_display_name}" href="javascript:void(0)">
											<s:if test="#button.button_display_img == 1">
												<img align="absmiddle" src="${path}${button.button_img_path}"> 
				        					</s:if>
				        					<s:else>
				        						${button.button_name}
				        					</s:else> 
										</a>&nbsp;
									</s:if>
			        			</s:elseif> 
			        			<s:elseif test="#button.button_name == '门户配置'">
			        				<a href="${path}/portalDesigner/portalDesigner.jsp" target="_blank" title="${button.button_display_name}" href="javascript:void(0)">
										<s:if test="#button.button_display_img == 1">
											<img align="absmiddle" src="${path}${button.button_img_path}"> 
			        					</s:if>
			        					<s:else>
			        						${button.button_name}
			        					</s:else> 
									</a>&nbsp;&nbsp;
			        			</s:elseif>
			        			<s:else>
			        				<a title="${button.button_display_name}" onclick="${button.button_function}()" href="javascript:void(0)">
										<s:if test="#button.button_display_img == 1">
											<img align="absmiddle" src="${path}${button.button_img_path}"> 
			        					</s:if>
			        					<s:else>
			        						${button.button_name}
			        					</s:else> 
									</a>&nbsp;&nbsp;
			        			</s:else>
			        		</s:iterator>
		        		</s:if>
		        		<a onclick="logout()" title="注销" href="javascript:void(0)">
							<img align="absmiddle" src="${path}/uistyle/images/icon/icon_95.gif"> 
						</a>&nbsp;&nbsp;
		        		<!-- 			
						<a title="首页" href="${path}/lw-admin/index.jsp">
							<img align="absmiddle" src="${path}/uistyle/images/icon/icon_94.gif"> 
						</a>&nbsp;&nbsp;
						<a title="个人中心" onclick="editPersonalCenter()" href="javascript:void(0)">
							<img align="absmiddle" src="${path}/core/themes/default/images/admin/user.png"> 
						</a>&nbsp;&nbsp;
						<a title="系统切换" onclick="chooseSys()" href="javascript:void(0)">
							<img align="absmiddle" src="${path}/uistyle/images/icon/icon_101.gif"> 
						</a>&nbsp;&nbsp;
						<a title="样式切换" onclick="chooseStyle()" href="javascript:void(0)">
							<img align="absmiddle" src="${path}/uistyle/images/icon/icon_32.gif"> 
						</a>&nbsp;&nbsp;
						<a onclick="logout()" title="注销" href="javascript:void(0)">
							<img align="absmiddle" src="${path}/uistyle/images/icon/icon_95.gif"> 
						</a>&nbsp;&nbsp;
						<s:if test="%{#session.session.user.displayName=='sysadmin' || #session.session.user.displayName=='admin'}">
							<a href="${path}/sys/system/index.jsp" target="_blank" title="分级管理中心" href="javascript:void(0)">
								<img align="absmiddle" src="${path}/uistyle/images/icon/icon_49.gif"> 
							</a>&nbsp;
						</s:if>				
						<a href="${path}/portalDesigner/portalDesigner.jsp" target="_blank" title="门户配置" href="javascript:void(0)">
							<img align="absmiddle" src="${path}/uistyle/images/icon/icon_7.gif"> 
						</a>&nbsp;&nbsp;
						 -->
					</div>
					<div class="topBarToolRight" id="topBarToolRight"></div>
				</div>
			</div>
		</div>
		<!-- /自定义操作按钮 -->

		<!-- 模块TAB -->
		<div id="menu">

		</div>
		<!-- /模块TAB -->

	</div>
	<div class="topLine">
	<!--<img alt="收缩" src="${path}/core/themes/default/images/admin/arrowhead_top_1.gif" id="top">-->
	</div>
</div>

<!-- 是否从平台模块链接打开 -->
<s:if test='#parameters.mainMenuIndex!=null'>
	<script type="text/javascript">var mainMenuIndex=${param.mainMenuIndex};</script> 
</s:if>
<s:else>
	<script type="text/javascript">var mainMenuIndex=0;</script>
</s:else>
<script type="text/javascript">
//用户登出,暂写这
function logout(){
	$.ajax({
		url : "${path}/BaseAction.action",
		type:'post',
		dataType:'text',
		data:{
			"type" : "loginWriteOff"
		},
		success:function(response){
			location.href="${path}/login.jsp";
		},
		error:function(){
			popup.errorService();
		}		
	});
}
//个人中心
function editPersonalCenter(){
	top.lwin.showWin('core/user/user_center.jsp','个人中心',350,250);
}
function chooseSys(){
	top.lwin.showWin('syschoose.jsp?userName="+$("#userName").val()+"&password="+$("#password").val()','系统切换',450,250);
}

function egovcoremanager(){
	top.lwin.showWin('sysmanagerchoose.jsp?userName="+$("#userName").val()+"&password="+$("#password").val()','切换',450,250);
}
//样式选择
function chooseStyle(){
	top.lwin.showWin('stylechoose.jsp?userName="+$("#userName").val()+"&password="+$("#password").val()','切换',450,250);
}
	/**
	 * 获取单个快捷方式的内容
	 * @param {} cutobj
	 * @param flag 有值，默认图标和文字都提示
	 * @return {}
	 */
	function getCutHtml(cutobj,flag){
		if (typeof flag =="undefined") flag="";
		var type = parseInt(cutobj.type,10);
		var clk="";
		if (type==1){
			//是模块
			clk = getClk(cutobj.content,1,1);
		} else if (type==2){	
			//说明是视图
			clk = getClk(cutobj.content,2,1);
		} else if (type==3){
			//说明是JS脚本 
			if (cutobj.content.indexOf("ucapCommonFun.buttonFun.setMainPage")>-1){
				//说明是设置为首页代码
				clk = setHome(this);	
			//}else if (cutobj.content.indexOf("ucapCommonFun.buttonFun.changeUserStatus")>-1){
				//说明是改变用户身份的代码，要判断当前用户是否有，如果只是个人，则隐藏此按钮
				//if (ucapSession.userJson.appAdmin || ucapSession.userJson.adminDeptUnids!=""){
					//说明是系统管理员或是部门管理员
					//var titleinfo="";
					//if(ucapSession.userJson.userStatus==3){
					//	titleinfo="当前用户身份是普通用户";
					//} else if (ucapSession.userJson.userStatus==2){
					//	titleinfo="当前用户身份是部门管理员";
					//} else {
					//	titleinfo="当前用户身份是应用系统管理员";
					//}
					//cutobj.tip +="  " + titleinfo;
					//clk = ' onclick="'+cutobj.content+'"';
				//} else{
				//	return "";
				//}
			} else {
				clk = ' onclick="'+cutobj.content+'"';
			}
		} else if (type==4){
			//说明是URL
			clk = getClk(cutobj.content,3,3);
		}
		var navImg="";
		if (clk!=""){
			
			//mdy by wyongjian@linewell.com 2012-08-21
			//IE6使用a href="javascript:void(0)"后导致window.location失效，改为a href="###"
			//解决BUG1237-IE6:分级管理中心的导航栏内容显示不出来
			navImg ='<a href="###" title="'+cutobj.tip+'" '+clk+' >';
			navImgPic ='<img src="${path}/'+cutobj.picturePath+'" align="absmiddle" />';
			if (flag!=""){
				//说明显示图标文字
				navImg += navImgPic + "&nbsp;"+cutobj.name;
			} else {
				if (cutobj.displayType=="01"){
					//说明显示图标
					navImg += navImgPic;
				} else if (cutobj.displayType=="02"){
					//说明只显示文字
					navImg += cutobj.name;
				} else if (cutobj.displayType=="03"){
					//说明显示图标文字
					navImg += navImgPic + "&nbsp;"+cutobj.name;
				}
			}
			navImg+='</a>';//modify by jc
		}
		return navImg;
}
function getClk(id,type,openType,otherclk){
		if(typeof openType=="undefined" || openType=="") openType = 1;
		if (type=="") type =9;
		if (typeof(type)=="String") type = parseInt(type);
		if (typeof(openType)=="String") openType = parseInt(openType);
		if (typeof(otherclk)=="undefined") otherclk="";
		return " onclick=\""+otherclk+"; " +
				"ucapCommonFun.indexOpen.open('"+id+"',"+type+",'"+openType+"',1)\" ";
	}
	
	//兼容ie与火狐 ，设置主页
		function setHome(obj){
        	try{
                obj.style.behavior='url(#default#homepage)';
                obj.setHomePage(window.location);
        	} catch(e){
                if(window.netscape) {
                        try {
                            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                        } catch (e) {
                            alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',window.location);
                 }
        	}
		}
</script>