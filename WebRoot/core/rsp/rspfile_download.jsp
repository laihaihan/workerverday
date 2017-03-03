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
	
	try{
		String from= request.getParameter("from");
		String action  =request.getParameter("action");
		String unid = request.getParameter("unid");
		AppFile appFile = new AppFileManager(ucapSession.getApp().getUnid()).doFindBeanByBelongto(unid);
		appFile = null == appFile ? new AppFile() : appFile;
		String filename = appFile.getFile_name();
		String filepath = request.getRealPath("") + appFile.getFile_path();
		filepath = filepath.replaceAll("\\\\", "/"); // 反斜杠("\")属于转义符号，在传参之前必须先转化成正斜杠("/")
		File file = new File(filepath);
		if(null == file || false == file.exists()){
			StringBuffer script=new StringBuffer();
			script.append("<script language='javascript'>");
			script.append("$.messager.alert('提示信息','文件不存在！');");
			script.append("window.close();");
			script.append("</script>");
			out.println(script.toString());
			return;
		}
		//如果是查看共享库的数据，记录调用日志
		if("rsp".equals(from)){
			String ipAddr =IpUtil.getIpAddr(request);
			User user =ucapSession.getUser();
			new RspLogManager().saveLog(user,unid,action,filename,RspConstant.LOG_TYPE_1,ipAddr);
		}
		//目前文件实体没有保存到数据库中，而是直接保存到服务器上，所以这边可通过文件路径直接读取
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
		// 后面两句必须加上去,否则tomcat在把jsp编译成servlet之后,会加上释放jsp引用对象的代码,会调用response.getWriter(),
		// 因为这个方法是和response.getOutputStream()相冲突的！所以会出现以上这个异常。 
		// add by lpeitu@linewell.com 2009-10-26
		out.clear();
		out = pageContext.pushBody();
	}
%>