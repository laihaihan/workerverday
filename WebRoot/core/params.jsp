<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@ page import="java.io.File"%>
<%
	//路径
	String path = request.getContextPath();	
	String corejs = path+"/core/js";
	request.setAttribute("path", path);	
	request.setAttribute("corejs", corejs);
	
	
	//jQuery
	StringBuffer jquery = new StringBuffer();
	jquery.append("<script type=\"text/javascript\" src=\""+corejs+"/jquery.js\"></script>\n");
	jquery.append("<script type=\"text/javascript\" src=\""+corejs+"/jquery.form.js\"></script>\n");
	//add by lijx 审计管理....start.....
	jquery.append("<script type=\"text/javascript\" src=\""+corejs+"/json2.js\"></script>\n");
	jquery.append("<script type=\"text/javascript\" src=\""+corejs+"/lw-ui/auditFormPage.js\"></script>\n");
	//add by lijx 审计管理....end..... 
	request.setAttribute("import_jquery", jquery);
	
	//easyUi
	StringBuffer easyUi = new StringBuffer();
	easyUi.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/easyui/themes/default/easyui.css\">\n");
	easyUi.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/easyui/themes/icon.css\">\n"); 
	easyUi.append("<script type=\"text/javascript\" src=\""+corejs+"/easyui/jquery.easyui.min.js\"></script>\n"); 
	easyUi.append("<script type=\"text/javascript\" src=\""+corejs+"/easyui/locale/easyui-lang-zh_CN.js\"></script>\n");	
	request.setAttribute("import_easyui",easyUi);

	//poshytip
	StringBuffer poshytip = new StringBuffer();
	poshytip.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/poshytip-1.1/src/tip-yellow/tip-yellow.css\">\n");
	poshytip.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/poshytip-1.1/src/tip-violet/tip-violet.css\">\n"); 
	poshytip.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/poshytip-1.1/src/tip-darkgray/tip-darkgray.css\">\n");
	poshytip.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/poshytip-1.1/src/tip-skyblue/tip-skyblue.css\">\n"); 
	poshytip.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/poshytip-1.1/src/tip-yellowsimple/tip-yellowsimple.css\">\n");
	poshytip.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/poshytip-1.1/src/tip-twitter/tip-twitter.css\">\n"); 
	poshytip.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/poshytip-1.1/src/tip-green/tip-green.css\">\n");  
	poshytip.append("<script type=\"text/javascript\" src=\""+corejs+"/poshytip-1.1/src/jquery.poshytip.js\"></script>\n"); 
	poshytip.append("<script type=\"text/javascript\" src=\""+corejs+"/validate/TextValidation.js\"></script>\n"); 		
	request.setAttribute("import_poshytip",poshytip);
	
	//zTree
	StringBuffer ztree = new StringBuffer();
	ztree.append("<link rel=\"stylesheet\" href=\""+corejs+"/ztree/zTreeStyle/zTreeStyle.css\" type=\"text/css\">\n");
	ztree.append("<script type=\"text/javascript\" src=\""+corejs+"/ztree/jquery.ztree.min.js\"></script>");
	request.setAttribute("import_ztree",ztree);
	
	//autocomplete
	StringBuffer autocomplete = new StringBuffer();
	autocomplete.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+corejs+"/autocomplete/jquery.autocomplete.css\" >\n");
	autocomplete.append("<script type=\"text/javascript\" src=\""+corejs+"/autocomplete/jquery.autocomplete.min.js\"></script>");
	request.setAttribute("import_autocomplete",autocomplete);
	
	//validation
	StringBuffer validation = new StringBuffer();
	validation.append("<link type=\"text/css\" rel=\"stylesheet\" href=\""+corejs+"/validation/style.css\" />\n");
	validation.append("<script type=\"text/javascript\" src=\""+corejs+"/validation/validation-min.js\"></script>");
	request.setAttribute("import_validation",validation);
	
	//uploadify
	StringBuffer uploadify = new StringBuffer();
	uploadify.append("<link type=\"text/css\" rel=\"stylesheet\" href=\""+corejs+"/uploadify/uploadify.css\" />\n");
	uploadify.append("<script type=\"text/javascript\" src=\""+corejs+"/uploadify/swfobject.js\"></script>\n");
	uploadify.append("<script type=\"text/javascript\" src=\""+corejs+"/uploadify/jquery.uploadify.min.js\" charset=\"gbk\"></script>");
	request.setAttribute("import_uploadify",uploadify);

	//当前系统是否具有自己的主题风格
	String cssPath = "/core/themes/default/css/";
	Session uSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String uappUnid = "";
	if(null != uSession && null != uSession.getApp()){
		String sysAlias = uSession.getApp().getNameEn();
		cssPath = "/" + sysAlias + "/themes/css/";
		File file = new File(request.getRealPath(cssPath));
		boolean hasSysTheme = file.exists() && file.isDirectory();
		hasSysTheme = hasSysTheme && file.listFiles() != null && file.listFiles().length > 0;
		cssPath = hasSysTheme ? cssPath : "/core/themes/default/css/";
		uappUnid =  uSession.getApp().getUnid();
	}
	
	//主题
	StringBuffer theme = new StringBuffer();
	theme.append("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + path + cssPath + "form.css\" />\n");
	theme.append("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + path + cssPath + "edit.css\" />");
	request.setAttribute("import_theme",theme);
	
	//qui界面框架
	StringBuffer qui = new StringBuffer();
	qui.append("<script type=\"text/javascript\" src=\""+corejs+"/qui/libs/js/framework.js\"></script>\n");
	qui.append("<link type=\"text/css\" rel=\"stylesheet\" href=\""+corejs+"/qui/libs/css/import_basic.css\"/>\n");
	qui.append("<link type=\"text/css\" rel=\"stylesheet\" id=\"skin\" prePath=\""+corejs+"/qui/\"/>\n");
	qui.append("<link type=\"text/css\" rel=\"stylesheet\" id=\"customSkin\"/>");
	request.setAttribute("import_qui",qui);
	
	//记录编辑页面工具栏固定
	StringBuffer toolBar = new StringBuffer();
	toolBar.append("<script type=\"text/javascript\" src=\""+path+"/core/themes/default/js/formedit.js\"></script>\n");
	request.setAttribute("import_toolbarPosition",toolBar);
	
	response.setHeader("Cache-Control","no-cache");
	response.setHeader("Pragma","no-cache");
	response.setDateHeader("Expires",0);
%>