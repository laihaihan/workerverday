<%@ page contentType="text/html;charset=GBK"%>
<%@ page import="com.linewell.core.file.AppFile"%>
<%@ page import="com.linewell.core.file.AppFileManager"%>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@ page import="java.io.File"%>
<%@ page import="java.io.InputStream"%>
<%@ page import="java.io.OutputStream"%>
<%@ page import="java.io.FileInputStream"%>
<%@ page import="java.io.BufferedOutputStream"%>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="java.sql.Blob"%>
<%@page import="com.linewell.core.attr.cfg.UcapAttrConfigBusiness"%>
<%@page import="com.linewell.core.attr.cfg.UcapAttrConfigManager"%>
<%@page import="com.linewell.core.attr.cfg.UcapAttrConfig"%>
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
	
	InputStream is = null;
	OutputStream os = null;
	try{
		String unid = request.getParameter("unid");
		UcapAttrConfigManager ucapAttrConfigManager = new UcapAttrConfigManager();
		UcapAttrConfig ucapAttrConfig = ucapAttrConfigManager.doFindBeanByKey(unid);

		String filename = ucapAttrConfig.getAttr_cfg_file_name();
		
		Blob file_data = ucapAttrConfig.getAttr_cfg_contents();
	 	if(null != file_data && file_data.length() > 0){
	 		is = ucapAttrConfig.getAttr_cfg_contents().getBinaryStream();
	 	}else{
				StringBuffer script = new StringBuffer();
				script.append("<script language='javascript'>");
				script.append("alert('�ļ������ڣ�');");
				script.append("history.go(-1);");
				script.append("</script>");
				out.println(script.toString());
				return;
	 	}
	 	
		//Ŀǰ�ļ�ʵ��û�б��浽���ݿ��У�����ֱ�ӱ��浽�������ϣ�������߿�ͨ���ļ�·��ֱ�Ӷ�ȡ
		response.addHeader("Content-Disposition","attachment; filename="+URLEncoder.encode(filename,"UTF8"));
		response.setContentType("application/msword");
		response.setHeader("Pragma", "public");
		response.setHeader("Cache-Control", "max-age=0");
		
		int bytesRead;
		byte[] buffer = new byte[4096];
		os = new BufferedOutputStream(response.getOutputStream());
		while((bytesRead = is.read(buffer, 0, buffer.length)) != -1) {
		  	os.write(buffer, 0, bytesRead);	
		}
		response.flushBuffer();
		os.close();
		is.close();
		
		// ��������������ȥ,����tomcat�ڰ�jsp�����servlet֮��,������ͷ�jsp���ö���Ĵ���,�����response.getWriter(),
		// ��Ϊ��������Ǻ�response.getOutputStream()���ͻ�ģ����Ի������������쳣�� 
		// ע�������䲻�ܷ���finally�����У������ļ�������ʱ���ᵼ���޷������ʾ��Ϣ
		out.clear();
		out = pageContext.pushBody();
	}catch(Exception e){
		e.printStackTrace();
	}finally{
		try{
			if(os != null){
				os.close();
				os = null;
			}
			if(is != null){
				is.close();
				is = null;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
%>