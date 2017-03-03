<%@ page contentType="text/html;charset=GBK"%>
<%@ page import="com.linewell.core.file.AppFile"%>
<%@ page import="com.linewell.core.file.AppFileManager"%>
<%@ page import="java.io.File"%>
<%@ page import="java.io.InputStream"%>
<%@ page import="java.io.OutputStream"%>
<%@ page import="java.io.FileInputStream"%>
<%@ page import="java.io.BufferedOutputStream"%>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="com.linewell.core.rsp.log.*"%>
<%@ page import="com.linewell.core.rsp.*"%>
<%@ page import="com.linewell.core.util.*"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.ucap.session.Session"%>
<!--
    ���ܣ��ļ�����
    @author:qcongyong
    @date:2011-08-08
-->
<%	
	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	if(null == ucapSession || null == ucapSession.getApp()){
		response.sendRedirect(request.getContextPath() + "/login.jsp");
		return;
	}
	
	try{
		String from= request.getParameter("from");
		String action  =request.getParameter("action");
		String unid = request.getParameter("unid");
		AppFile appFile = new AppFileManager(ucapSession.getApp().getUnid()).doFindBeanByBelongto(unid);
		appFile = null == appFile ? new AppFile() : appFile;
		String filename = appFile.getFile_name();
		String filepath = request.getRealPath("") + appFile.getFile_path();
		filepath = filepath.replaceAll("\\\\", "/"); // ��б��("\")����ת����ţ��ڴ���֮ǰ������ת������б��("/")
		File file = new File(filepath);
		if(null == file || false == file.exists()){
			StringBuffer script=new StringBuffer();
			script.append("<script language='javascript'>");
			script.append("$.messager.alert('��ʾ��Ϣ','�ļ������ڣ�');");
			script.append("window.close();");
			script.append("</script>");
			out.println(script.toString());
			return;
		}
		//����ǲ鿴���������ݣ���¼������־
		if("rsp".equals(from)){
			String ipAddr =IpUtil.getIpAddr(request);
			User user =ucapSession.getUser();
			new RspLogManager().saveLog(user,unid,action,filename,RspConstant.LOG_TYPE_1,ipAddr);
		}
		//Ŀǰ�ļ�ʵ��û�б��浽���ݿ��У�����ֱ�ӱ��浽�������ϣ�������߿�ͨ���ļ�·��ֱ�Ӷ�ȡ
		response.addHeader("Content-Disposition","attachment; filename="+URLEncoder.encode(filename,"UTF8"));
		response.setContentType("application/msword");
		response.setHeader("Pragma", "public");
		response.setHeader("Cache-Control", "max-age=0");
		
		int bytesRead;
		byte[] buffer = new byte[4096];
		InputStream is = new FileInputStream(file);
		OutputStream bos = new BufferedOutputStream(response.getOutputStream());
		while((bytesRead = is.read(buffer, 0, buffer.length))!=-1) {
		  	bos.write(buffer, 0, bytesRead);	
		}
		response.flushBuffer();
		bos.close();
		is.close();
	}catch(Exception e){
		e.printStackTrace();
	}finally{
		// ��������������ȥ,����tomcat�ڰ�jsp�����servlet֮��,������ͷ�jsp���ö���Ĵ���,�����response.getWriter(),
		// ��Ϊ��������Ǻ�response.getOutputStream()���ͻ�ģ����Ի������������쳣�� 
		// add by lpeitu@linewell.com 2009-10-26
		out.clear();
		out = pageContext.pushBody();
	}
%>