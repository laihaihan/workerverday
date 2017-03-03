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
    功能：文件下载
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
				script.append("alert('文件不存在！');");
				script.append("history.go(-1);");
				script.append("</script>");
				out.println(script.toString());
				return;
	 	}
	 	
		//目前文件实体没有保存到数据库中，而是直接保存到服务器上，所以这边可通过文件路径直接读取
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
		
		// 后面两句必须加上去,否则tomcat在把jsp编译成servlet之后,会加上释放jsp引用对象的代码,会调用response.getWriter(),
		// 因为这个方法是和response.getOutputStream()相冲突的！所以会出现以上这个异常。 
		// 注：这两句不能放在finally语句块中，否则当文件不存在时，会导致无法输出提示信息
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