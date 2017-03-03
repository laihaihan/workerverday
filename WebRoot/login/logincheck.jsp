<%@ page contentType="text/xml;charset=GBK"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.platform.cache.login.*"%>
<%@page import="com.linewell.ucap.resource.ResourceCache"%>
<%@page import="com.linewell.ucap.resource.ResourceContext"%>
<%@page import="com.linewell.ucap.resource.ResourceType"%>
<%@page import="com.linewell.ucap.util.DateTime"%>
<%
String rand = (String)session.getAttribute("rand");
String input = request.getParameter("rand");

if(null!=input)input = input.toLowerCase();
if(null!=rand)rand = rand.toLowerCase();

Login login = null;
try {
	ResourceContext rc = ResourceContext.newInstance();
	ResourceCache cache;
	cache = rc.getResourceCache(ResourceType.RESOURCE_TYPE_LOGIN);
	login = (Login) cache.getResource("");
} catch (Exception e) {
	e.printStackTrace();
}

if(StringUtils.isEmpty(rand) || rand.equals("null")){
	out.print("请重新获取验证码进行输入！");
	return;
}

if (StringUtils.isNotEmpty(rand) && StringUtils.isNotEmpty(input) && rand.equals(input)) {
	if(login.getVerifyEffectMinute()>0 && null!=session.getAttribute("verifyProduceTime")){
		DateTime dt = new DateTime();
		dt.adjustMinute(-login.getVerifyEffectMinute());
		
		if(dt.getNowTime().compareTo((String)session.getAttribute("verifyProduceTime"))>0){
			out.print("此验证码已过期,请重新获取！");
			return;
		}
	}
	
	out.print("true");
}else{
	out.print("验证码输入错误！");
}
%>