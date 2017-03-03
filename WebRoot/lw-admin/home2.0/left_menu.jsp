<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.ucap.module.UiModule"%>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@ page import="net.sf.json.JSONArray"%>
<%@ page import="java.net.URLDecoder"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!--  
	@功能说明：左侧菜单（抽屉菜单）
	@author：yqi
	@date：2013-03-17
-->
<% 
	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String path = request.getContextPath();
	String moduleUnid = request.getParameter("moduleUnid");
	String iconStyle = request.getParameter("iconStyle");
	String moduleName = request.getParameter("moduleName");
	moduleName=URLDecoder.decode(moduleName, "utf-8");
	String moduleJson = new UiModule().getModuleJson(moduleUnid, path, ucapSession);
	JSONArray modules = JSONArray.fromObject(moduleJson);
	System.out.println(modules.size());
	request.setAttribute("path",path);
	request.setAttribute("modules",modules);
	
	String bluePath = path+"/core/themes/default2.0";
	request.setAttribute("bluePath", bluePath);	
	
	
%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		
		<script lauguage='javascript'>
			$(function(){
				//动态设置菜单区域的宽度
				if($("#west").height() < $("#menu_table").height()){
					$("#west").width("197");
				}
				
				//初始化菜单
				
				//多减去一个.listLeftMenuTitle的高度
				var sp_height = $(".listLeftBox").height()-"<%=(modules.size()+1)*32%>";
				
				//菜单标题绑定事件
				$(".listLeftMenu ").bind('click',function(){
					//只显示当前菜单项(除第一个以外的其他菜单项必须设置为：display:none)
					if($(this).next().css("display") == "none"){
						$(this).siblings(".listLeftShow").hide();
						$(this).next().show();
						
						$(this).siblings(".listLeftMenuSelect").attr("class","listLeftMenu");
						$(this).attr("class","listLeftMenuSelect");
						
						$(".content_sp:visible").height(sp_height);//动态设置当前显示模块显示区域的高度
					}
				});

				//第一项默认展开
				$(".listLeftMenu:eq(0)").attr("class","listLeftMenuSelect");
				$(".listLeftShow:eq(0)").show();
				$(".content_sp:visible").height(sp_height);//动态设置当前显示模块显示区域的高度
				
				//菜单模块绑定事件
				$(".listLeftShow ul li ").bind("mouseover mouseout",function(){
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
		<div class="listLeftMenuTitle"><img src="${bluePath}/images/icon_11.gif" align="absmiddle" />&nbsp;<%=moduleName%>
			<span class="arrowhead">
				<a href="#"><img src="${bluePath}/images/arrowhead_left.png" border="0" /></a>
			</span>
		</div>
		<div id="menu_table" width="100%" height="100%" cellpadding="0" cellspacing="0">
			<s:iterator value="#request.modules" id="title" >
				<s:if test="#title.children != null && #title.children.size() > 0">
					<div class="listLeftMenu">
						<img src="${bluePath}/images/icon_12.gif" align="absmiddle" />&nbsp;${title.name}
					</div>
					<div class="listLeftShow" style="display:none">
						<ul>
							<span class="content_sp" style="width:190px;overflow-y:auto;padding:5px;">
								<s:iterator value="#title.children" id="content" status='st'>
									<li>
										<div onclick="openModuleTab('${content.name}','${content.icon}','${path}/${content.link}','${content.id}')">
											<img src="${bluePath}/images/icon_a${st.index+1 > 10 ? st.index-10+1:st.index+1}.gif" /><br/>${content.name}
											<!-- 由于部分菜单文字过长 会导致float:left下的浮动元素 高度不一， 导致页面排列不均，特在【偶数】对象加入下面清除浮动的代码
												  主要起作用的是：height:0px;
											-->
											<s:if test="#st.even">
												<div style="clear:both;height:0px;"></div>
											</s:if>
										</div>
									</li>
								</s:iterator>
							</span>
						</ul>
					</div>
				</s:if>
				<s:else>
					<div class="listLeftMenu">
						<img src="${bluePath}/images/icon_12.gif" align="absmiddle" />&nbsp;${title.name}
					</div>
					<div class="listLeftShow" style="display:none">
						<ul>
							<span class="content_sp" style="width:190px;overflow-y:auto;padding:5px;">
								<li>
									<div onclick="openModuleTab('${title.name}','${title.icon}','${path}/${title.link}','${title.id}')">
										<img src="${bluePath}/images/icon_a1.gif" /><br/>${title.name}
									</div>
								</li>
							</span>
						</ul>
					</div>
					
				</s:else>
			</s:iterator>
		</div>
	</body>
</html>