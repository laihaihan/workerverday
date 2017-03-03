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
		out.print("�û���������������������룡");
		return;
	}
	
	if(StringUtils.isEmpty(user.getMobile())){
		out.print("�û������ֻ�����Ϊ�գ��޷����з��Ͷ��ţ�");
		return;
	}
	
	//��ȡ�������֤��
	UNIDGenerate ug = new UNIDGenerate();
	String verify = ug.getUnid().substring(13, 19).toLowerCase();
	Map map = new HashMap();
	map.put("request",request);
	
	DateTime dt = new DateTime();
	
	System.out.println("verify:"+verify);
	
	try{
		
		//������֤��
		ISms sms = SmsFactory.produce();
		sms.init(map);
		boolean result = sms.send(user.getMobile(),"��֤�룺"+verify,dt.getNowTime(),String.valueOf(Math.round(Math.random())));
	
		sms.release();
		
		if(true){
			session.setAttribute("rand",verify);
			session.setAttribute("verifyProduceTime",dt.getNowTime());
			out.print("��֤���ѷ��͵������ֻ��ϣ�����������ϵ���֤�룡");
		}else{
			out.print("��֤�뷢��ʧ�ܣ�");
		}
		
	}catch(Exception e){
		out.print("��֤�뷢��ʧ�ܣ�");
	}
	
%>
