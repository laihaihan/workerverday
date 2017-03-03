<%@page import="com.linewell.ucap.session.Session"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<table width="1000" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td align="center" valign="top"><img src="${portalPath}images/top.jpg" width="1000" height="103" border="0" usemap="#Map" /></td>
	  </tr>
	</table>
	<map name="Map" id="Map">
		<area shape="rect" coords="515,27,568,97" href="javascript:void(0);" onclick="openOfficeApp('was');" alt="行政审批"/>
		<area shape="rect" coords="579,27,633,96" href="javascript:void(0);" onclick="openOfficeApp('ess');" alt="电子监察"/>
		<area shape="rect" coords="642,26,709,96" href="javascript:void(0);" onclick="openOfficeApp('oa');" alt="内部办公"/>
		<area shape="rect" coords="713,25,774,97" href="javascript:void(0);" onclick="openOfficeApp('cms');" alt="内容管理" />
		<area shape="rect" coords="780,25,843,96" href="javascript:void(0);" onclick="openOfficeApp('xxgk');" alt="信息公开" />
		<area shape="rect" coords="849,25,911,96" href="javascript:void(0);" onclick="openOfficeApp('zyzx');" alt="资源中心" />
		<area shape="rect" coords="920,25,986,96" href="javascript:void(0);" onclick="openOfficeApp('tyyh');" alt="统一用户" />
	</map>
	<%-- 标题位置  S --%>
	<table width="1000" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td height="30" align="center" background="${portalPath}images/Inv_bg_1.jpg">
	    <table width="97%" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <td width="25"><img src="${portalPath}images/Inc_1.gif" width="17" height="17" /></td>
	        <td align="left" valign="bottom">
	        <% 
	        Session user_session = (Session) request.getSession().getAttribute(
	    			Session.SESSION_NAME);
	        String user_unid = "";
	        if(user_session!=null){
	        	user_unid = user_session.getUser().getUnid();
	        	out.println("<span class='red_12'>当前用户："+user_session.getUser().getName()+"</span>");
	        }
	        %>
	        <input type="hidden" value="<%=user_unid %>" name="user_unid" id="user_unid"/><%-- 判断用户是否已登录 --%>
	        &nbsp;&nbsp;2007年10月25日 15:05:30  星期四
	        </td>
	      </tr>
	    </table></td>
	  </tr>
	</table>
	<%-- 标题位置 E --%>