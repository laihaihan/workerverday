<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.style.windows.DesktopHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%

Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
User user =  ucapSession.getUser();


String path = request.getContextPath();
request.setAttribute("path",path); 

//获取路径指定文件夹
String curpath=application.getRealPath(request.getRequestURI());
String dir=new java.io.File(curpath).getParent();
String desktopDir = dir.replace(path.replace("/","\\") + "\\lw-admin\\win7","\\core\\js\\win7style\\assets\\images\\desktop\\sys");
String webAppDir = dir.replace(path.replace("/","\\") + "\\lw-admin\\win7", "");
//获取系统桌面图片列表
DesktopHelper desktopHelper = new DesktopHelper();
List<String> sysPisList = desktopHelper.getFolderAllPic(desktopDir,webAppDir);

String filePath = "/core/js/win7style/assets/images/desktop/user/"+user.getUnid();
if("1000D01F".equals(user.getUnid())){
	filePath = "/core/js/win7style/assets/images/desktop/sys";
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<title>桌面设置</title>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>

</head>
<body>
	<div id="form_toolbar">
		<button class="form_btn" onclick="doClose();"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
	</div>
<div id="wrap" style="border:1px #000 solid;">
	<p>
		<form action="<%=request.getContextPath()%>/userdesktop.action" method="POST" id="jspForm" name="jspForm"">
			图片上传：<input id="uploadify" class="uploadify" type="file" name="file" />	
		</form>
	</p>
</div>

</body>
</html>


<script type="text/javascript">
jQuery(function(){
	 	$(".uploadify").uploadify({
          	'uploader'       : '${path}/core/js/uploadify/uploadify.swf',   
          	'script'         : '${path}/AppFile.action?filepath=<%=filePath%>',   
          	'buttonImg'	     : '${path}/core/js/uploadify/theme/default/fill-090.png',
          	'cancelImg'      : '${path}/core/js/uploadify/cancel.png',
     
          	'height'         : 16,
  		  	'width'          : 16,
          	'auto'           : true,
          	'multi'          : true,
          	'sizeLimit'      : 2048000, 
          	'fileDataName'   :'file',
          	//'fileDesc'       : '支持格式：doc,docx',
          	//'removeCompleted' : false,
          	'fileExt'         : '*.*;' ,
          	onComplete:function(event, ID, fileObj, response, data){
	          	var json = $.parseJSON(response);
	          	if(json.success){
       				alert("操作成功。");
	          	}
          	},
          	onError:function(event,ID,fileObj,errorObj){
	       		if(errorObj.type=='File Size'){
	       			alert("文件过大");
	       		}
          	}
      	});
	})
function doClose(){
	top.lwin.close("refreshPwin");
}	
</script>