<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="com.linewell.ucap.util.UcapRequest"%>
<%@page import="com.linewell.ucap.action.ViewAction"%>
<%@page import="com.linewell.ucap.action.base.IUcapAction"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.linewell.ucap.platform.authorized.view.ViewManager" %>
<%@page import="com.linewell.ucap.db.JDBCTool" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="com.linewell.ucap.util.UcapRequest"  %>
<%@page import="com.linewell.ucap.platform.authorized.view.View"%>
<%@page import="com.linewell.ucap.jdbc.core.JdbcTemplate" %>
<%@page import="com.linewell.ucap.db.JDBCTool" %>
<%@page import="com.linewell.ucap.platform.authorized.view.CategoryItem" %>
<%@include file="/sys/jsp/session.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="text/javascript" src="style/xtree.js"></script>
		<script type="text/javascript" src="style/xmlextras.js"></script>
		<script type="text/javascript" src="style/xloadtree.js"></script>
		<link type="text/css" rel="stylesheet" href="style/xtree.css" />
		<style type="text/css">
body {
	background: white;
	color: black;
}
</style>
	</head>
	<body>
		<div id="viewTCategoryTree">
		
		</div>
		<script type="text/javascript">
	/// XP Look
	webFXTreeConfig.rootIcon		= "style/images/xp/folder.png";
	webFXTreeConfig.openRootIcon	= "style/images/xp/openfolder.png";
	webFXTreeConfig.folderIcon		= "style/images/xp/folder.png";
	webFXTreeConfig.openFolderIcon	= "style/images/xp/openfolder.png";
	webFXTreeConfig.fileIcon		= "style/images/xp/file.png";
	webFXTreeConfig.lMinusIcon		= "style/images/xp/Lminus.png";
	webFXTreeConfig.lPlusIcon		= "style/images/xp/Lplus.png";
	webFXTreeConfig.tMinusIcon		= "style/images/xp/Tminus.png";
	webFXTreeConfig.tPlusIcon		= "style/images/xp/Tplus.png";
	webFXTreeConfig.iIcon			= "style/images/xp/I.png";
	webFXTreeConfig.lIcon			= "style/images/xp/L.png";
	webFXTreeConfig.tIcon			= "style/images/xp/T.png";
	webFXTreeConfig.tIcon			= "style/images/xp/T.png";
	webFXTreeConfig.blankIcon			= "style/images/blank.png";
	
<% 
	String viewId = request.getParameter("viewId");
	String isTab =request.getParameter("isTab");
	if(isTab == null || "".equals(isTab)){
		isTab="";
	}
	String moduleUnid =request.getParameter("moduleUnid");
	if(moduleUnid == null || "".equals(moduleUnid)){
		moduleUnid="";
	}
	String purl =request.getParameter("purl");
	if(purl == null || "".equals(purl)){
		purl="";
	}
%>
	
	
	function loadCategoryTree(viewId,categoryItemType,rootText,purl){
		var rootJson = null;
		if("undefined"!=typeof(categoryItemType) && (categoryItemType=="04" || categoryItemType=="05"||categoryItemType=="06")){
			//获取根节点对象
			var rurl =ucapSession.baseAction;
			rurl+="?action=getDeptTree&type=treeSelect&unid=&rand="+Math.random();
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", rurl, false);
			conn.send(null);
			var exjson = Ext.util.JSON.decode(conn.responseText);	
			var exResult=ucapCommonFun.dealException(exjson);
			if(!exResult)return;
			if("undefined"!=typeof(conn.responseText) && conn.responseText!=""){
				rootJson = Ext.util.JSON.decode(conn.responseText)[0];
				deptId = rootJson.id;
				url+="&deptUnid="+deptId;
			}else{
				rootJson = {id:viewId,text:rootText};	
			}
			//树形根节点加载完毕
		}else{
			rootJson = {id:viewId,text:rootText};
		}
		var tree = new WebFXTree(rootText,action="javascript:reloadDataView('')");
		
		var url =""
		if("undefined"!=typeof(categoryItemType) && (categoryItemType=="04" || categoryItemType=="05"||categoryItemType=="06") && rootJson.id != viewId){
			url =ucapSession.baseAction + "?action=getCategory&deptUnid="+rootJson.id+"&type=getView&node="+rootJson.id+"&viewId="+viewId+"&rand="+Math.random();
		}else{
			url = ucapSession.baseAction+"?type=getView&action=getCategory&viewId="+viewId+"&rand="+Math.random();
			
			var ourl = Ext.urlDecode(purl);
			delete ourl["type"];
			url += "&"+Ext.urlEncode(ourl);
		}
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		
		var exjson = Ext.util.JSON.decode(conn.responseText);	
		var exResult=ucapCommonFun.dealException(exjson);
		if(!exResult)return;
		var connStr="";
		
		
		if(null!=exjson && exjson.length>0){
			var textTem="&nbsp;";
			for(var i=0;i<exjson.length;i++){
				if(exjson[i]==null)
					continue;
				connStr="~!@DB@!~"+exjson[i].name+"~!@E@!~~!@0~!@5~!@CL@!~"+exjson[i].value+"~!@E@!~";	
				
				if(exjson[i].text!=""){
					textTem =exjson[i].text ;
				}else{
					textTem="&nbsp;";
				}
				if(exjson[i].leaf){
					tree.add(new WebFXTreeItem(textTem,action="javascript:reloadDataView('"+connStr+"')"));
				}else{
					tree.add(new WebFXLoadTreeItem(textTem,"<%=sSystemPath%>sys/view/categoryXml.jsp?viewId="+viewId+"&node="+exjson[i].id+"&itemName="+exjson[i].name+"&conn="+connStr,action="javascript:reloadDataView('"+connStr+"')"));
				}
			}
		}
		
		document.getElementById("viewTCategoryTree").innerHTML =tree;
	}
	
	function reloadDataView(categorycon){
		window.parent.document.getElementById("tbViewBase").innerHTML ="";
		window.parent.document.getElementById("tbViewBase").innerHTML = "<iframe marginwidth=\"0\" marginheight=\"0\" frameborder=\"0\" id=\"viewBase\"  name=\"viewBase\"  scrolling=\"no\"  src=\"<%=sSystemPath %>sys/jsp/viewJsp.jsp?viewId=<%=viewId%>&categorycon="+categorycon+"&isoldref=1&isTab=<%=isTab%>&moduleUnid=<%=moduleUnid%>&purl=<%=purl%>\"  height=\"100%\" width=\"100%\"></iframe>";
	
	}
<%
	String rqJson ="{\"rand\":\""+ Math.random() +"\",\"type\":\"getView\",\"viewId\":\""+viewId+"\"}";
	String setQueryString ="viewId="+viewId+"&type=getView&rand="+ Math.random() +"";
	UcapRequest ur= new UcapRequest();
	ur = UcapRequestWebManager.requestToUcap(request);
	ur.setQueryString(setQueryString);
	ur.setParameterJson(rqJson);
	//end
	//请求视图基本数据
	// 以下为跟具体视图对象相关的操作的数据获取
	JdbcTemplate jt = JDBCTool.getPlatformDBTool();
		jt.open();
	Session session1 = (Session) ur.getSession();
	View view = null;
	ViewManager vm = new ViewManager(jt);
	try {
		view = vm.doFindByPunidAndSession(viewId, session1,ur);
	} catch (Exception e) {
		e.printStackTrace();			
	} finally {
		jt.close();
		jt = null;
	}
	if(null!=view.getCategoryItems() && view.getCategoryItems().size()>0){
		CategoryItem  c= view.getCategoryItems().get(0);
		out.println("loadCategoryTree(\""+viewId+"\",\""+c.getItemType()+"\",\""+c.getItemCn()+"\",\""+purl+"\")");
		out.println("window.parent.window.document.getElementById(\"tdCategoryTree\").width =180 ;");
	}else{
		out.println("window.parent.window.document.getElementById(\"tdCategoryTree\").width =1;");
	}
%>

</script>
	</body>
</html>
