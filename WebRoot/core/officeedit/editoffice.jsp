<%@ page contentType="text/html;charset=utf-8" %>
<%@ page language="java" import="java.io.*,java.sql.*,oracle.jdbc.*" %>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="com.linewell.core.file.AppFile"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@page import="com.linewell.core.attr.cfg.UcapAttrConfigManager"%>
<%@page import="com.linewell.core.attr.cfg.UcapAttrConfig"%>
<%@include file="/core/params.jsp" %>
<%

	if(null != request.getAttribute("alert")&&"true".equals(request.getAttribute("alert"))){
		out.print("<SCRIPT>");
		out.print("alert('操作成功');");
		out.print("</SCRIPT>");
	}


	boolean isNewFile =true;//是否是新增文件
	String fileName="";//文件名
	String filetype="word";
	String fileUrl="";
	
	//相关参数
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String appUnid = ucapsession.getApp().getUnid();
	String belongTo = request.getParameter("unid");
	String fileunid = request.getParameter("fileunid");
	
	
	//获取附件
	AppFile appFile = new AppFileManager(appUnid).doFindBeanByKey(fileunid);
	if(null != appFile){
		isNewFile = false;
	}

	//如果是新附件
	if(isNewFile){
		String attrcfgunid = request.getParameter("attrcfgunid");
		UcapAttrConfigManager ucapAttrConfigManager = new UcapAttrConfigManager();
		UcapAttrConfig ucapAttrConfig = ucapAttrConfigManager.doFindBeanByKey(attrcfgunid);
		fileName=ucapAttrConfig.getAttr_cfg_file_name();
		//数据库取得模板
		fileUrl =request.getContextPath()+ "/core/file/ucapattrcfg_download.jsp?unid="+attrcfgunid;
	}else{//打开已经存在的附件
		fileUrl =request.getContextPath()+ "/core/file/file_download.jsp?unid="+fileunid;
	}
	
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html  xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>ntko office文档控件示例-ms office文档编辑</title>
		<meta content="IE=7" http-equiv="X-UA-Compatible" /> 
		<!--设置缓存-->
		<meta http-equiv="cache-control" content="no-cache,must-revalidate">
		<meta http-equiv="pragram" content="no-cache">
		<meta http-equiv="expires" content="0">
    <SCRIPT LANGUAGE="JavaScript" src="OfficeContorlFunctions.js"></SCRIPT>
    
	${import_theme}
	${import_jquery}
	${import_validation}
    </head>
<body  onload='intializePage("<%=fileUrl%>")' onbeforeunload ="onPageClose()">
    <form id="form1" action="uploadOffice.action" enctype="multipart/form-data" style="padding:0px;margin:0px;">
    <input type="hidden" value="<%=belongTo%>" name="belongTo"/>
    <input type="hidden" value="<%=fileunid%>" name="fileunid"/>
    <input name="filename" id="filename" type="hidden" value="<%=fileName%>" />
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave" onclick="saveFileToUrl();"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 保存文档 </button>
		<button class="form_btn" id="btnSave" onclick="addHandSecSign();"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 手写批注 </button>
		<button class="form_btn" id="btnClose" onclick="javascript:top.lwin.close();"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
	</div>
   

        <div id="editmain_middle" class="editmain_middle">
            
            <div id="editmain_right" class="editmain_right">
 
                <div id="officecontrol">
                <script language="javascript" type="text/javascript" src="officecontrol/ntkoofficecontrol.js"></script>
                <div id=statusBar style="height:20px;width:100%;background-color:#c0c0c0;font-size:12px;"></div>
								<script language="JScript" for=NTKO_OCX event="OnDocumentClosed()">
									setFileOpenedOrClosed(false);
								</script>
								<script language="JScript" for=TANGER_OCX event="OnDocumentOpened(TANGER_OCX_str,TANGER_OCX_obj);">
									OFFICE_CONTROL_OBJ.activeDocument.saved=true;//saved属性用来判断文档是否被修改过,文档打开的时候设置成ture,当文档被修改,自动被设置为false,该属性由office提供.
									//获取文档控件中打开的文档的文档类型
									switch (OFFICE_CONTROL_OBJ.doctype)
									{
										case 1:
											fileType = "Word.Document";
											fileTypeSimple = "wrod";
											break;
										case 2:
											fileType = "Excel.Sheet";
											fileTypeSimple="excel";
											break;
										case 3:
											fileType = "PowerPoint.Show";
											fileTypeSimple = "ppt";
											break;
										case 4:
											fileType = "Visio.Drawing";
											break;
										case 5:
											fileType = "MSProject.Project";
											break;
										case 6:
											fileType = "WPS Doc";
											fileTypeSimple="wps";
											break;
										case 7:
											fileType = "Kingsoft Sheet";
											fileTypeSimple="et";
											break;
										default :
											fileType = "unkownfiletype";
											fileTypeSimple="unkownfiletype";
									}
									setFileOpenedOrClosed(true);
								</script>
									<script language="JScript" for=TANGER_OCX event="BeforeOriginalMenuCommand(TANGER_OCX_str,TANGER_OCX_obj)">
									alert("BeforeOriginalMenuCommand事件被触发");
								</script>
								<script language="JScript" for=TANGER_OCX event="OnFileCommand(TANGER_OCX_str,TANGER_OCX_obj)">
									if (TANGER_OCX_str == 3) 
									{
										alert("不能保存！");
										CancelLastCommand = true;
									}
								</script>
								<script language="JScript" for=TANGER_OCX event="AfterPublishAsPDFToURL(result,code)">
									result=trim(result);
									alert(result);
									//document.all("statusBar").innerHTML="服务器返回信息:"+result;
									if(result=="文档保存成功。")
									{window.close();}
								</script>
								<script language="JScript" for=TANGER_OCX event="OnCustomMenuCmd2(menuPos,submenuPos,subsubmenuPos,menuCaption,menuID)">
								alert("第" + menuPos +","+ submenuPos +","+ subsubmenuPos +"个菜单项,menuID="+menuID+",菜单标题为\""+menuCaption+"\"的命令被执行.");
								</script>

                </div>
            </div>
        </div>
        
    </div>
    </form>
</body>
</html>
