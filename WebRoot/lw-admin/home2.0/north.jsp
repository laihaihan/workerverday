<%--
/**
 * 内网系统顶部页
 * @author yqi@linewell.com
 * @2013-03-13
 * @version 2.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<body><!-- 除去消息区113px; -->
<div class="main" region="north" border="false" style="width: 100%; height: 142px; overflow: hidden; position: relative;">
	<div class="header">
		<!-- /自定义操作按钮开始 -->
		<div id="topBar" region="north" border="false" class="topBox">
			<!-- logo -->
			<!--<div class="logo" id="logo">
				<img src="${path}/${sysCfg.logo_img}" width="390" height="71">
			</div>-->
			<div class="logo"></div>
			<div class="logoMid"></div>
			<div class="userInfo">
				<div class="userInfoPhoto"><img src="${bluePath}/images/photo.gif" width="51" height="56" /></div>
				<div class="userInfoContent">您好，<strong>${sessionScope.session.user.displayName}</strong> 最后登录时间：2013-01-28 16:35:28<br>
				    <img src="${bluePath}/images/icon_1.gif" width="16" height="16" align="absmiddle" />
					    <a title="个人中心" onclick="editPersonalCenter()" href="javascript:void(0)">个人中心</a>&nbsp;
				    <img src="${bluePath}/images/icon_2.gif" width="16" height="15" align="absmiddle" />
				    	<a title="系统切换" onclick="chooseSys()" href="javascript:void(0)">系统切换</a>&nbsp;
				    <img src="${bluePath}/images/icon_3.gif" width="14" height="15" align="absmiddle" />
				    	<a title="首页" href="${path}/lw-admin/newindex.jsp">首页</a>&nbsp;
				    <img src="${bluePath}/images/icon_4.gif" width="14" height="14" align="absmiddle" />
						<a onclick="logout()" title="注销" href="javascript:void(0)">注销</a>
				</div>
			</div>
			<div class="rightTool">
				<s:if test="%{#session.session.user.displayName=='sysadmin' || #session.session.user.displayName=='admin'}">
		    		<img src="${bluePath}/images/icon_5.gif" width="15" height="15" align="absmiddle" />
						<a href="${path}/sys/system/index.jsp" target="_blank" title="分级管理中心" href="javascript:void(0)">
							分级管理中心
						</a>&nbsp;
		    	</s:if>
	    		<s:if test="%{#session.session.app.unid=='3E2592D5DD95DA5C339C0935F7E9DAA8'}">
		    		<img src="${bluePath}/images/icon_6.gif" width="15" height="15" align="absmiddle" />
					<a onclick="egovcoremanager();" href="#" title="切换后台管理" href="javascript:void(0)">
						切换后台管理
					</a>&nbsp;
				</s:if>
				<img src="${bluePath}/images/icon_6.gif" width="15" height="15" align="absmiddle" />
					<a href="${path}/portalDesigner/portalDesigner.jsp" target="_blank" title="门户配置" href="javascript:void(0)">
						门户配置
					</a>&nbsp;&nbsp;
			</div>
		</div>
		<!-- /自定义操作按钮结束 -->
		
		<!-- 模块TAB -->
		<!---->
		<div id="menu" class="navBox">

		</div>
		<!-- /模块TAB -->
		
		
		<!--<div class="navBox">
			<div class="nav">
				<ul>
					<li class="navSelect"><a href="#">首 页</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">审批业务</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#" class="navSelect">应用管理</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">统计监察</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">语音服务</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">共享库</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">共享库</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">共享库</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">共享库</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">共享库</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">共享库</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
					<li><a href="#">共享库</a></li>
					<li class="navMid"><img src="${bluePath}/images/nav_mid.gif" /></li>
				</ul>
			</div>
			<div class="search"><input name="keyword" type="text" value="请输入关键字搜索" size="15" />
			  <select name="select">
			    <option value="-请选择-">-请选择-</option>
		      </select>
		      <a href="#"><img src="images/btn_search.gif" width="58" height="24" border="0" align="absmiddle" /></a></div>
		</div>-->
	</div>
	
</div>
</body>

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
			location.href="${path}/newlogin.jsp";
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