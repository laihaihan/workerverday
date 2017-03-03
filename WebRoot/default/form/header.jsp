<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.cache.style.Style"%>
<%@page import="com.linewell.ucap.platform.cache.style.StyleManager"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session" %>
<%@page import="com.linewell.ucapx.common.WebAppUtils" %>
<%
{
	//WEB应用的路径
	String _systemPath = request.getContextPath() + "/";
	Session _ucapSession = WebAppUtils.getSession(request);
	//个人样式
	Style _style = _ucapSession.getStyle();
	if(null == _style){
	  StyleManager sm = new StyleManager();
	  _style = sm.doFindAll().get(0);
	  _ucapSession.setStyle(_style);
	  sm=null;
	}
	String _sUserStylePath = _systemPath +  _style.getPath() + "/";
	_ucapSession =null;
	_style = null;	
%>
<link rel="stylesheet" type="text/css" href="<%=_sUserStylePath%>css/ucap.css"/>
<link rel="stylesheet" type="text/css" href="<%=_sUserStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=_sUserStylePath%>css/ext-patch.css" />
<link rel="stylesheet" type="text/css" href="<%=_systemPath%>js/ucap/calendar/skin/WdatePicker.css" />
<script type="text/javascript" src="<%=_systemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=_systemPath%>js/ext/ext-all.js"></script>
<script type="text/javascript"  src="<%=_systemPath%>js/ext/ext-lang-zh_CN.js"></script>
<script language="javascript" src="<%=_systemPath%>js/ucap/select/listSelect.js"></script>
<script language="javascript" src="<%=_systemPath%>default/form/js/commonSelect.js"></script>
<script type="text/javascript" src="<%=_systemPath%>js/ucap/calendar/WdatePicker.js" ></SCRIPT>

<script language="javascript" src="<%= _systemPath%>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%= _systemPath %>default/js/jquery.json-2.2.min.js"></script>
<script language="javascript" src="<%= _systemPath %>default/js/linewell/linewell.core.js"></script>
<script language="javascript" src="<%= _systemPath %>default/js/linewell/linewell.utils.js"></script>
<script language="javascript" src="<%= _systemPath %>default/form/js/linewell.form.js"></script>
<script language="javascript" src="<%= _systemPath %>default/form/js/linewell.form.validate.js"></script>

<script language="javascript" src="<%= _systemPath %>default/js/common.js"></script>
<script language="javascript" src="<%= _systemPath %>default/js/extCommon.js"></script>
<%
}
%>