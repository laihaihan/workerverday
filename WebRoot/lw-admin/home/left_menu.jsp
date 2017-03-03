<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.ucap.module.UiModule"%>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@ page import="net.sf.json.JSONArray"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!--  
	@功能说明：左侧菜单（抽屉菜单）
	@author：qcongyong
	@date：2012-12-21
-->
<% 
	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String path = request.getContextPath();
	String moduleUnid = request.getParameter("moduleUnid");
	String iconStyle = request.getParameter("iconStyle");
	String moduleJson = new UiModule().getModuleJson(moduleUnid, path, ucapSession);
	JSONArray modules = JSONArray.fromObject(moduleJson);
	
	request.setAttribute("path",path);
	request.setAttribute("modules",modules);
%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>无标题文档</title>
		<style type="text/css">
			.menu_title td{
				cursor:hand;
				height:25px;
				background:url(${path}/core/themes/default/images/admin/left_menu_bg.gif) repeat-x center top;
				color:'#eff';
				padding-top:'5px';
				font-size:'15px';
				font-weight:'bolder';
			}
			.menu_content div{
				cursor:hand;
				padding-top:'5px';
			}
			.menu_visited{
				color:'blue';
				font-weight:'bolder';
				font-size:'13px';
				border:1px solid #B1CCFD;
			}
		</style>
		<script lauguage='javascript'>
			$(function(){
				//动态设置菜单区域的宽度
				if($("#west").height() < $("#menu_table").height()){
					$("#menu_table").width(170);
				}
				
				//初始化菜单
				var sp_height = $("#menu_table").height()-"<%=modules.size()*26%>";
				$(".menu_content:eq(0)").show();//第一项默认展开
				$(".content_sp:visible").height(sp_height);//动态设置当前显示模块显示区域的高度
				if($(".menu_title").length > 0){//设置菜单的导航图片
					$(".menu_title:eq(0)").find("img").attr("src","${path}/core/js/easyui/themes/default/images/layout_button_down.gif");
				}
				
				//菜单标题绑定事件
				$(".menu_title").bind('click',function(){
					//只显示当前菜单项(除第一个以外的其他菜单项必须设置为：display:none)
					if($(this).next().css("display") == "none"){
						$(this).siblings(".menu_content").hide();
						$(this).siblings(".menu_title").find("img").attr("src","${path}/core/js/easyui/themes/default/images/layout_button_up.gif");
						$(this).next().show();
						$(this).find("img").attr("src","${path}/core/js/easyui/themes/default/images/layout_button_down.gif");
						$(".content_sp:visible").height(sp_height);//动态设置当前显示模块显示区域的高度
					}
				});
				
				//菜单模块绑定事件
				$(".menu_content div").bind("mouseover mouseout",function(){
					$(this).toggleClass("menu_visited");
				});
			});
			
			//打开模块链接页面
			function openModuleTab(title,icon,url,modId){
				url += (url.indexOf("?") > -1 ? "&" : "?") + "modId=" + modId;
				tabs.openTab(title,icon,url);
			}
		</script>
	</head>
	<body>
		<table id="menu_table" width="190" height="100%" align="center" cellpadding="0" cellspacing="0">
			<s:iterator value="#request.modules" id="title">
				<s:if test="#title.children != null && #title.children.size() > 0">
					<tr class="menu_title">
						<td align="right">
							${title.name}<img src="${path}/core/js/easyui/themes/default/images/layout_button_up.gif" style="margin-left:30px;margin-right:20px"/>
						</td>
					</tr>
					<tr class="menu_content" valign="top" style="display:none">
						<td align='<%="1".equals(iconStyle) ? "left" : "center" %>'>
							<span class="content_sp" style="width:190px;overflow-y:auto;padding:5px;">
								<s:iterator value="#title.children" id="content">
									<div onclick="openModuleTab('${content.name}','${content.icon}','${path}/${content.link}','${content.id}')">
										<%if("1".equals(iconStyle)){//小图标 %>
											<img style="margin-left:30px" src="${content.icon}" width="20" height="20"/>&nbsp;${content.name}
										<%}else{//大图标 %>
											<center>
												<img src="${content.big_icon}" width="50" height="50"/><br>${content.name}<br><br>
											</center>
										<%} %>
									</div>
								</s:iterator>
							</span>
						</td>
					</tr>
				</s:if>
				<s:else>
					<tr class="menu_content" valign="top">
						<td style="padding:5px" height=20>
							<div onclick="openModuleTab('${title.name}','${title.icon}','${path}/${title.link}','${title.id}')">
								<%if("1".equals(iconStyle)){//小图标 %>
									<img style="margin-left:30px" src="${title.icon}" width="20" height="20"/>&nbsp;${title.name}
								<%}else{//大图标 %>
									<center>
										<img src="${title.big_icon}" width="50" height="50"/><br>${title.name}<br><br>
									</center>
								<%} %>
							</div>
						</td>
					</tr>
				</s:else>
			</s:iterator>
			<tr><td></td></tr><!-- 增加一个空行，保证在表格高度为100%且模块数量较少的情况下，每个模块的行高不会被撑开，导致样式难看 -->
		</table>
	</body>
</html>