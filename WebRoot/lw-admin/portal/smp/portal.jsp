<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.notice.info.NoticeInfoBusiness"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.notice.info.NoticeInfo"%>
<%@page import="com.linewell.smp.business.SmpServiceBusiness"%>
<%@page import="com.linewell.ucap.platform.cache.dept.DeptManager"%>
<%@include file="/core/params.jsp" %>
<%
//系统共公告
NoticeInfoBusiness  noticeInfoBusiness = new NoticeInfoBusiness();
List<NoticeInfo> noticeList = noticeInfoBusiness.getPublishInfo(8);

//部门事项信息
SmpServiceBusiness smpServiceBusiness = new SmpServiceBusiness();
String[][] deptS = smpServiceBusiness.getAllDept();

%>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
${import_jquery}
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>批事项管理系统</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">  //待办事宜切换标签
function selectTag(showContent,selfObj){  
	var tag = document.getElementById("mattersMenu").getElementsByTagName("li"); 
	var taglength = tag.length; 
	for(i=0; i<taglength; i++){
		tag[i].className = ""; 
	}
	selfObj.parentNode.className = "mattersMenuSelected"; 
	for(i=0; j=document.getElementById("mattersContent"+i); i++){ 
		j.style.display = "none"; 
	} 
	if(null != document.getElementById(showContent)){
		document.getElementById(showContent).style.display = "block"; 
		/**
		var selIndex = Number(showContent.replace("mattersContent",""))+1;
		var idsContainer = $(window.frames["question"+selIndex].document).find(".datagrid-pager");  //获取所有节点的dom数组  
		var len = idsContainer.length;               //数组长度
		for(var index = 0; index < len; index++){   
			var container = $(idsContainer[index]); //循环遍历每一个dom节点   
			container.hide();
		} 
		**/
	}

} 
</script>
</head>

<body>
	<br />
	<div class="matters">
		<div class="mattersTitle">
			<div class="mattersTitleArrow"></div>
			<div class="mattersTitleMain">我的待办事宜</div>			
			<div class="mattersTitleMore"><a href="#"></a></div>
		</div>
		<div class="mattersContentBox">
			<div id="mattersMenu">
				<ul>
                    <li class="mattersMenuSelected"><a href="javascript:void(0)" onmouseover="selectTag('mattersContent0',this)">事项新增审核</a></li>
                    <li><a href="javascript:void(0)" onmouseover="selectTag('mattersContent1',this)">事项变更审核</a></li>
                    <li><a href="javascript:void(0)" onmouseover="selectTag('mattersContent2',this)">事项拆分审核</a></li>
					<li><a href="javascript:void(0)" onmouseover="selectTag('mattersContent3',this)">事项取消审核</a></li>
					<li><a href="javascript:void(0)" onmouseover="selectTag('mattersContent4',this)">事项发布审核</a></li>
                 </ul>
			</div>
			<div class="mattersContent" id="mattersContent0" style="display:;">
				<ul>
					<iframe id="question1" src="view.action?fn=grid&viewId=CC74166329C70168DC8439D24D81117B" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="180"></iframe>
				</ul>
			</div>
			<div class="mattersContent" id="mattersContent1" style="display:none;">
				<ul>
				<iframe id="question2" src="view.action?fn=grid&viewId=1E91C0DE6E858D467E32017C7B97BAA8" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="180"></iframe>

				</ul>
			</div>
			<div class="mattersContent" id="mattersContent2" style="display:none;">
				<ul>
				<iframe id="question3" src="view.action?fn=grid&viewId=7FDD7BB3606D451B4FD90F33186C394F" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="180"></iframe>

				</ul>
			</div>
			<div class="mattersContent" id="mattersContent3" style="display:none;">
				<ul>
				<iframe id="question4" src="view.action?fn=grid&viewId=013B9A50C11D9020FB53031409EBC3EF" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="180"></iframe>
				</ul>
			</div>
			<div class="mattersContent" id="mattersContent4" style="display:none;">
				<ul>
				<iframe id="question5" src="view.action?fn=grid&viewId=53BF61132510E2E89CB7BCB4DDBB757E" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="180"></iframe>
				</ul>
			</div>
		</div>
	</div>
	<div class="announcement">
		<div class="mattersTitle">
			<div class="mattersTitleArrow"></div>
			<div class="mattersTitleMain">系统公告</div>			
			<div class="mattersTitleMore">
			<a href="javascript:openTab('公告管理','7BD8650916AF45DC4B372168E572BB55','65A03DDD75399DE87C3B211B8FC737B0','后台管理');">更多>></a>
			</div>
		</div>
		<div class="announcementContent">
			<ul>
				<%
				for(NoticeInfo noticeInfo: noticeList){
				%>
				<li>·<a href="javascript:" onclick=openNoticeInfo("<%=noticeInfo.getUnid()%>");><%=noticeInfo.getTitle() %></a></li>
				<%	
				}
				%>
			</ul>
		</div>
	</div>
	<div class="shortcuts">
		<div class="mattersTitle">
			<div class="mattersTitleArrow"></div>
			<div class="mattersTitleMain">快捷通道</div>			
			<div class="mattersTitleMore"></div>
		</div>
		<div class="shortcutsContent">
			<ul>
				<li><img src="images/icon_1.gif" style="cursor:hand" onclick="openTab('新增事项','1B6000BCCC6EAB48BA9342EFB866F08D','0F07B3F50B3EE8BAE8E487D77C8DFBC2','登记管理');"/><br/>新增事项</li>
				<li><img src="images/icon_2.gif" style="cursor:hand" onclick="openTab('事项变更申请','1976473807E88A6E84A794547FA248E0','B9A86167990419F985DF821546AD9CFD','变更管理');"/><br/>事项变更</li>
				<li><img src="images/icon_3.gif" style="cursor:hand" onclick="openTab('事项拆分','E09B5CC7A4F93FB207B1DC6C6861EB9D','EAE95E7A9F254CD8C63ADDDBF2FF3D72','拆分管理');"/><br/>事项拆分</li>
				<li><img src="images/icon_4.gif" style="cursor:hand" onclick="openTab('取消申请','81B7EF4ACE3818029E7A9111C6F50395','11F677EC88282D8E516FBEF23E48B5AE','取消管理');"/><br/>事项取消</li>
				<li><img src="images/icon_5.gif" style="cursor:hand" onclick="openTab('发布申请','CA9001F2E9C0D4DC5022436F9D571A9F','34369A6C4BDF615C390B4ACEDF5C0487','发布管理');"/><br/>事项发布</li>
				<li><img src="images/icon_6.gif" style="cursor:hand" onclick="openTab('公告管理','7BD8650916AF45DC4B372168E572BB55','65A03DDD75399DE87C3B211B8FC737B0','后台管理');"/><br/>发布公告</li>
				<li><img src="images/icon_7.gif" style="cursor:hand" onclick="openTab('事项综合查询','180FE721822A510C4A79DEBF685BBFD2','B654AAA0B4BED21F429A06FF42789C7E','登记管理');"/><br/>事项查询</li>
			</ul>
		</div>
	</div>
	<div class="departmentlist">
		<div class="departmentlistMenu">
			<div class="departmentlistArrow"></div>
			<div class="departmentlistTitle">部门列表<span class="statisticsTitle">统计：部门 <font style="color:red"><%=smpServiceBusiness.getAllDeptCount()%></font> 家 审批事项 <font style="color:red"><%=smpServiceBusiness.getAllServiceCount() %></font> 项</span></div>
			<div class="departmentlistRight"></div>
		</div>
		<div class="departmentlistContent">
			<ul>
			<% 
			for(int i = 1 ; i < deptS.length ; i ++){
				%>
				<li><a href="javascript:"><%=deptS[i][1]%></a><span class="redFont">(<%=smpServiceBusiness.getServiceCountByDeptUnid(deptS[i][0])%>)</span></li>
				<%
			}
			%>
			
			</ul>
			<div class="cl"></div>
		</div>		
	</div>
</body>
</html>
<script type="text/javascript">
<!--
	$(function(){
		/**
		var idsContainer = $(window.frames["question1"].document).find(".datagrid-pager");  //获取所有节点的dom数组  
		var len = idsContainer.length;               //数组长度
		for(var index = 0; index < len; index++){   
			var container = $(idsContainer[index]); //循环遍历每一个dom节点   
			container.hide();
		}
		**/	  
	});


	function openTab(title,viewid,modid,leafname,moduleId){
		//没有top.tabs对象，说明是使用平台的
		if(top.tabs==undefined){
			top.ucapCommonFun.indexOpen.directOpenMenu(moduleId,modid);
		}else{
			top.tabs.openTab(title,'','view.action?fn=grid&viewId='+viewid+'&_rand='+Math.random()+'&modId='+modid,leafname)	
		}
	}
	
	function openTabJsp(title,url,leafname){
		//没有top.tabs对象，说明是使用平台的
		if(top.tabs==undefined){
			top.ucapCommonFun.indexOpen.directOpenMenu("FB234F18209865B68476FDFF988C58F5","C2FB1655467681646632AD33502994B2");
		}else{
			top.tabs.openTab(title,'',url,leafname)
		}
	}
	
		
	function openTabJsp(title,url,leafname){
		//没有top.tabs对象，说明是使用平台的
		if(top.tabs==undefined){
			top.ucapCommonFun.indexOpen.directOpenMenu("FB234F18209865B68476FDFF988C58F5","C2FB1655467681646632AD33502994B2");
		}else{
			top.tabs.openTab(title,'',url,leafname)
		}
	}
	
	function openNoticeInfo(unid){
		top.popup.showModalDialog('/core/notice/notice_info_display.jsp?unid='+ unid,"公告信息",800,500);
	}

//-->
</script>
