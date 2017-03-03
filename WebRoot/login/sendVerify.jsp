<%@ page contentType="text/xml;charset=GBK"%>
<%@page import="java.util.*"%>
<%@page import="com.linewell.ucap.platform.cache.login.*"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.ucap.platform.cache.user.UserManager"%>
<%@page import="com.linewell.ucap.resource.ResourceCache"%>
<%@page import="com.linewell.ucap.resource.ResourceContext"%>
<%@page import="com.linewell.ucap.resource.ResourceType"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.encrypt.Encrypt"%>
<%@page import="com.linewell.ucap.encrypt.EncryptFactory"%>
<%@page import="com.linewell.ucap.util.UNIDGenerate"%>
<%@page import="com.linewell.ucap.util.DateTime"%>
<%@page import="com.linewell.ucap.im.sms.SmsFactory"%>
<%@page import="com.linewell.ucap.im.sms.ISms"%>
<%
	String userName = request.getParameter("userName");
	String password = request.getParameter("password");
	
	UserManager um = new UserManager();
	User user = um.doFindByName(userName,0);
	
	Login login = null;
	try {
		ResourceContext rc = ResourceContext.newInstance();
		ResourceCache cache;
		cache = rc.getResourceCache(ResourceType.RESOURCE_TYPE_LOGIN);
		login = (Login) cache.getResource("");
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	if(null==user && login.isCn()){
		user = um.doFindByName(userName,1);
	}
	
	Encrypt ent=EncryptFactory.getEncrypt("com.linewell.ucap.encrypt.MD5Encrypt");
	
	if(null==user || !user.getPassword().equals(ent.encrypt(password))){
		out.print("用户名或密码出错，请重新输入！");
		return;
	}
	
	if(StringUtils.isEmpty(user.getMobile())){
		out.print("用户配置手机号码为空，无法进行发送短信！");
		return;
	}
	
	//获取随机的验证码
	UNIDGenerate ug = new UNIDGenerate();
	String verify = ug.getUnid().substring(13, 19).toLowerCase();
	Map map = new HashMap();
	map.put("request",request);
	
	DateTime dt = new DateTime();
	
	System.out.println("verify:"+verify);
	
	try{
		
		//发送验证码
		ISms sms = SmsFactory.produce();
		sms.init(map);
		boolean result = sms.send(user.getMobile(),"验证码："+verify,dt.getNowTime(),String.valueOf(Math.round(Math.random())));
	
		sms.release();
		
		if(true){
			session.setAttribute("rand",verify);
			session.setAttribute("verifyProduceTime",dt.getNowTime());
			out.print("验证码已发送到您的手机上，请输入短信上的验证码！");
		}else{
			out.print("验证码发送失败！");
		}
		
	}catch(Exception e){
		out.print("验证码发送失败！");
	}
	
%>
