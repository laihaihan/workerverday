<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.core.util.CompressUtil"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.linewell.core.view.View"%>
<%@page import="com.linewell.core.db.JdbcSession"%>
<%@page import="com.linewell.core.db.JdbcFactory"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.view.column.Column"%>
<%@page import="com.linewell.core.view.query.Query"%>
<%@page import="com.linewell.core.button.SubButton"%>
<%@page import="com.linewell.core.button.Button"%>
<%@page import="com.linewell.core.dict.ApasDict"%>
<%@page import="com.linewell.core.dict.ApasDictManager"%>
<%@page import="com.linewell.core.ucap.menu.UcapMenuLeaf"%>
<%@page import="com.linewell.core.ucap.menu.UcapMenuLeafBusiness"%>
<%@page import="com.linewell.ucap.platform.authorized.module.Module"%>
<%@page import="com.linewell.core.ucap.module.ModuleManager"%>
<%@page import="com.linewell.core.ucap.module.CoreModule"%>
<%@page import="com.linewell.core.ucap.module.ModuleLeaf"%>
<%@page import="com.linewell.core.ucap.module.ModuleLeafManager"%>
<%@include file="/core/params.jsp" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String datePath = request.getParameter("datePath");
	if(StringUtils.isNotEmpty(datePath)){
		// 1.解压
		String folder = StringUtils.substringAfterLast(datePath,"/");
		folder = StringUtils.substringBeforeLast(folder,".zip");
		String filePath = request.getRealPath("/")+datePath;
		String outPut = request.getRealPath("/lw-admin/update")+File.separator+folder;
		CompressUtil.unZip(filePath,outPut);
		
		// 2.读取
		FileReader fr = new FileReader(outPut+"\\data.txt");
		BufferedReader br = new BufferedReader(fr);
		String json = br.readLine();
		fr.close();
		
		JdbcSession jdbc = JdbcFactory.getSession(GlobalParameter.APP_CORE);
		
		if(StringUtils.isNotEmpty(json)){
			JSONObject obj = JSONObject.fromObject(json);
			//插入MENU
			JSONArray menuArray = obj.getJSONArray("MENU");
			for (int i = 0; i < menuArray.size(); i++) {
				UcapMenuLeaf  ucapMenuLeaf = (UcapMenuLeaf)JSONObject.toBean(menuArray.getJSONObject(i),UcapMenuLeaf.class);
				UcapMenuLeafBusiness  ucapMenuLeafBusiness = new UcapMenuLeafBusiness();
				ucapMenuLeafBusiness.doDeleteByCondition(" LEAF_UNID = '"+ucapMenuLeaf.getLeaf_unid()+"'",new Object[0]);
				ucapMenuLeafBusiness.doSave(ucapMenuLeaf);
			}

			//插入Module
			JSONArray moduleArray = obj.getJSONArray("MODULE");
			for (int i = 0; i < menuArray.size(); i++) {
				CoreModule module = (CoreModule)JSONObject.toBean(moduleArray.getJSONObject(i),CoreModule.class);
				ModuleManager moduleManager = new ModuleManager();
				moduleManager.doDeleteByCondition(" MODULE_UNID ='"+module.getModule_unid()+"'");
				moduleManager.doSave(module);
			}

			//插入Module_leaf
			JSONArray moduleLeafArray = obj.getJSONArray("MODULELEAF");
			for (int i = 0; i < menuArray.size(); i++) {
				ModuleLeaf moduleLeaf = (ModuleLeaf)JSONObject.toBean(moduleLeafArray.getJSONObject(i),ModuleLeaf.class);
				ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
				moduleLeafManager.doDel(moduleLeaf.getLeaf_unid());
				moduleLeafManager.doSave(moduleLeaf);
			}
			
			//插入VIEW
			JSONArray viewArray = obj.getJSONArray("VIEW");
			for (int i = 0; i < viewArray.size(); i++) {
				View view = (View)JSONObject.toBean(viewArray.getJSONObject(i),View.class);
				String sql = "delete core_view where view_unid='"+view.getUnid()+"'";
				jdbc.update(sql);
				jdbc.saveEntity(view);
			}
			
			//插入column
			JSONArray columnArray = obj.getJSONArray("COLUMN");
			for (int i = 0; i < columnArray.size(); i++) {
				Column column = (Column)JSONObject.toBean(columnArray.getJSONObject(i),Column.class);
				String sql = "delete core_view_column where column_unid='"+column.getUnid()+"'";
				jdbc.update(sql);
				jdbc.saveEntity(column);
			}
			
			JSONArray queryArray = obj.getJSONArray("QUERY");
			for (int i = 0; i < queryArray.size(); i++) {	
				Query query = (Query)JSONObject.toBean(queryArray.getJSONObject(i),Query.class);
				String sql = "delete core_view_query where query_unid='"+query.getUnid()+"'";
				jdbc.update(sql);
				jdbc.saveEntity(query);
			}
			
			JSONArray subBtnArray = obj.getJSONArray("SUB_BTN");
			for (int i = 0; i < subBtnArray.size(); i++) {	
				SubButton subButton = (SubButton)JSONObject.toBean(subBtnArray.getJSONObject(i),SubButton.class);
				String sql = "delete core_sub_button where sub_unid='"+subButton.getSubUnid()+"'";
				jdbc.update(sql);
				jdbc.saveEntity(subButton);
			}
			
			JSONArray btnArray = obj.getJSONArray("BTN");
			for (int i = 0; i < btnArray.size(); i++) {	
				Button button = (Button)JSONObject.toBean(btnArray.getJSONObject(i),Button.class);
				String sql = "delete core_button where button_unid='"+button.getButton_unid()+"'";
				jdbc.update(sql);
				jdbc.saveEntity(button);
			}
			
			if( obj.get("DICT")!=null ){
				JSONArray dictArray = obj.getJSONArray("DICT");
				ApasDictManager dm = new ApasDictManager();
				for (int i = 0; i < dictArray.size(); i++) {	
					ApasDict apasDict = (ApasDict)JSONObject.toBean(dictArray.getJSONObject(i),ApasDict.class);
					dm.doDeleteByCondition("unid='"+apasDict.getUnid()+"'");
					dm.doSave(apasDict);
				}
			}
		}				
		return;
	}
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">
	<link type="text/css" rel="stylesheet" href="${corejs}/validation/style.css" />
	<script type="text/javascript" src="${corejs}/jquery.js"></script>
	<script type="text/javascript" src="${corejs}/jquery.form.js"></script>
	<script type="text/javascript" src="${corejs}/validation/validation-min.js"></script>
	<script type="text/javascript" src="${corejs}/gb2py.js"></script>
</head>
<body>
	<div id="form_content">
		<div id="form_toolbar">
			<button class="form_btn" id="btnClose" onclick="top.lwin.close('refreshView')"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
		</div>
		<div>					
			
			<table width="98%" align="center" class="form_table_ext">
			<col width="25%" align="center">
			<col width="75%">
			<tr>
				<th>上传数据包:</th>
				<td>
					<input id="uploadify" class="uploadify" type="file" name="file" style="display: none;"/>
				</td>
			</tr>			
			</table>
			<br>
			<div id="msg" style="padding-left: 10px;">
			
			</div>
		</div>
	</div>
	
	<link type="text/css" rel="stylesheet" href="${corejs}/uploadify/uploadify.css"/>
	<script type="text/javascript" src="${corejs}/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${corejs}/uploadify/jquery.uploadify.min.js" charset="gbk"></script> 
	<script type="text/javascript">
	$(function(){
		$("#uploadify").uploadify(uploadifyConfig);
	});
	
	function doClose(){
		top.lwin.close();
	}
	
	var uploadifyConfig = {   
       	'uploader'       : '${corejs}/uploadify/uploadify.swf',   
       	'script'         : 'AppFile.action?fn=upload',   
       	'buttonImg'	     : '${corejs}/uploadify/theme/default/fill-090.png',
       	'cancelImg'      : '${corejs}/uploadify/cancel.png',   
       	'height'         : 16,
	  	'width'          : 16,
       	'auto'           : true,   
       	'multi'          : true,   
       	'sizeLimit'      : 2048000, 
       	'fileDataName'   :'file',
       	'fileDesc'        : '支持格式：zip',
	    'fileExt'         : '*.zip;',
       	onComplete:function(event, ID, fileObj, response, data){
        	var json = $.parseJSON(response);
        	if(json.success){
        		var appFile = json.appFile;
        		$('#msg').append('上传成功,正在导入...');
        		$.ajax({
        			url:'data_imp.jsp?fn=imp',
        			data:{
        				datePath:appFile.file_path
        			},
        			success:function(result){
        				$('#msg').append('<br>导入成功');
        			}
        		});
        	}
       	},
       	onError:function(event,ID,fileObj,errorObj){
     		if(errorObj.type=='File Size'){
     			alert("文件过大");
     		}
       	}
   	};
</script>
</body>
</html>