<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.style.windows.DesktopHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%

Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
User user =  ucapSession.getUser();
App app =  ucapSession.getApp();


String path = request.getContextPath();
request.setAttribute("path",path); 

//获取路径指定文件夹
String curpath=application.getRealPath(request.getRequestURI());
String dir=new java.io.File(curpath).getParent();
String desktopDir = dir.replace(path.replace("/","\\") + "\\lw-admin\\win7","\\core\\js\\win7style\\assets\\images\\desktop\\sys");
String webAppDir = dir.replace(path.replace("/","\\") + "\\lw-admin\\win7", "");
//获取系统桌面图片列表
DesktopHelper desktopHelper = new DesktopHelper();
List<String> sysPisList = desktopHelper.getFolderAllPic(desktopDir,webAppDir);


//获取当前登录用户桌面图片列表

String userDesktopDir = dir.replace(path.replace("/","\\") + "\\lw-admin\\win7","\\core\\js\\win7style\\assets\\images\\desktop\\user\\"+user.getUnid());
List<String> userPisList = desktopHelper.getFolderAllPic(userDesktopDir,webAppDir);
%>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>换肤</title>
<link href="${path}/core/js/win7style/deskpicset/css/index.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
</head>
<body>
<div id="ContentMain">
	<!--Top start-->
	<!--Top End-->
	<!--Middle Start-->
	<div class="CM_Middle">
		<div class="CM_MiddleC">
			<div class="CM_MiddleT"><h3>系统换肤</h3></div>
			<div class="CM_MiddleC_Sub">
				<!--系统默认 Start---->
				<div class="CM_MiddleC_Sub01">
					<div class="CM_MiddleC_Sub01T">
						<span><img src="${path}/core/js/win7style/deskpicset/images/icons05.gif" /></span>
						<h3>系统默认</h3>
						<div class="CM_T_rightbtn">
							<% 
							if("1000D01F".equals(user.getUnid())){
								out.println("<a href='#' onclick='uploadPic();'>上传更多背景</a>");
							}
							%>
							
						</div>
					</div>
					<div class="CM_MiddleC_Sub01C">
						<ul>
							<%
							for(String sysPic: sysPisList){
								out.println("<li>");
								out.println("<a href='#' title='单击图片替换桌面' onClick=setPic('"+path+""+sysPic+"')>");
								out.println("<span><img height='60' width='90' src='"+path+"\\"+sysPic+"' /></span>");
								out.println("</a>");
								out.println("</li>");
							}
							%>
						</ul>
					</div>
				</div>
				<!--系统默认 End---->
				<div class="clear1"></div>
				<!--自定义 Start---->
				<div class="CM_MiddleC_Sub01">
					<div class="CM_MiddleC_Sub01T">
						<span><img src="${path}/core/js/win7style/deskpicset/images/icons05.gif" /></span>
						<h3>用户自定义</h3>
						<div class="CM_T_rightbtn">
							<a href="#" onclick="uploadPic();">上传更多背景</a>
						</div>
					</div>
					<div class="CM_MiddleC_Sub01C">
						<ul>
						<%
						for(String sysPic: userPisList){
							out.println("<li>");
							out.println("<a title='单击图片替换桌面' href='#' onClick=setPic('"+path+""+sysPic+"')>");
							out.println("<span><img height='60' width='90' src='"+path+"\\"+sysPic+"'/></span>");
							out.println("</a>");
							out.println("</li>");
						}
						%>
															
						</ul>
					</div>
				</div>
				<!--自定义 End---->				
			</div>
			<div class="clear1"></div>
			<!--按钮 Start-->
			<div class="bc_btnDiv">
				<div class="bc_btnDivC">
					<a href="#" onclick="doClose();"  class="btn_gb02">关闭</a>
				</div>
			</div>	
			
			<!--按钮 End-->
		
		</div>
	</div>
	<!--Middle End-->
</div>
<script>
	$(function(){
		var objT=$(".CM_MiddleC_Sub01T span");
		$(".CM_MiddleC_Sub01T span").click(function(){
			var objC=$(this).parent().siblings();
			if(objC.is(":visible")){
				$(this).children("img").attr("src","${path}/core/js/win7style/deskpicset/images/icons06.gif");
				objC.css("display","none");
			}else
			{
				$(this).children("img").attr("src","${path}/core/js/win7style/deskpicset/images/icons05.gif");
				objC.css("display","block");
			}
		
		})
	
	});

</script>
</body>
</html>






<script type="text/javascript">
function setPic(picptha){
	top.setDesktopPic(picptha);
	//修改当前用户默认图片
	$.ajax({
		type: 'post',
		cache:true,
		url:"userdesktop.action?fn=setUserDesktopPic&userid=<%=user.getUnid()%>&curpicpath="+picptha+"&app_unid=<%=app.getUnid()%>",
		dataType:'text',
		async:true,//同步执行
		error:function(){
			alert('加载出错！！');
		},
		success:function(respons){
			top.lwin.alert("信息提示","操作成功","info",1500);
		}
	});	
}

function uploadPic(){
	top.lwin.showModalDialog('lw-admin/win7/desktopupload.jsp','图片上传',500,300);
}

function doClose(){
	top.lwin.close(true);
}
</script>