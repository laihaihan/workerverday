<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.linewell.core.db.JDBCTool" %>
<%@ page import="com.linewell.core.system.GlobalParameter" %>
<%@ page import="com.linewell.core.doctype.*"%>
<%@ page import="java.util.*" %>
<%
	String roleId = request.getParameter("roleId");//角色id
	request.setAttribute("path", request.getContextPath());
	
%>
<html>
<head>
	<title>流程管理</title>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/core/js/easyui/themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/core/js/easyui/themes/icon.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/core/js/validation/style.css" />
	<link rel="stylesheet" type="text/css" href="${path}/core/js/autocomplete/jquery.autocomplete.css" />
	<link rel="stylesheet" type="text/css" href="${path}/core/js/ztree/zTreeStyle/zTreeStyle.css">
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/json2.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/autocomplete/jquery.autocomplete.min.js"></script>
	<script type="text/javascript" src="${path}/js/ucap/calendar/WdatePicker.js"></script>
	<script type="text/javascript" src="${path}/core/js/lw-ui/tip.js"></script>
	<script type="text/javascript" src="${path}/core/js/lw-ui/load.js"></script>
	<style>
	    .tb01{ border-collapse:collapse; border:solid 1px #bdcbe6; background:#FFF}
		.tb01 td{ border:solid 1px #e5eaf4; height:26px;}
		.tb01 th{  text-align:center;background:url(../images/th_bg01.jpg) repeat-x top; font-weight:normal; height:26px; line-height:26px; border-bottom-style:none; border-right:#e5eaf4 1px solid;font-size:13px; }
		.tb01 p{ padding:2px 5px;font-size:13px; }
		.tb01 .num01{ margin:0 auto; text-align:left; width:20px; padding:0; padding-left:8px}
		.tb01 .tb_l{ border-left-color:#bdcbe6; height:26px;font-size:13px;}
		.tb01 .tb_b{ border-bottom-color:#bdcbe6;}
		.tb01 .tb_r{ border-right-color:#bdcbe6;height:26px;font-size:13px;}
	</style>
	<script type="text/javascript">
	    //全选/取消
		function checkChange(obj){
			var boxes = document.getElementsByName("checkbox_list");
		  	for(var i = 0; i < boxes.length; i++){
		  		if(obj.checked){
		  			boxes[i].checked=true;
		  		}else{
		  			boxes[i].checked=false;
		  		}
			}
		}
	</script>
</head>
<body>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="form_table_ext">
     <thead>
	     <tr align="center" onMouseOver="this.bgColor='#dfe8f6'" onMouseOut="this.bgColor=''">
			<th width="38" class="tb_l"><input type="checkbox" name="checkbox_all" id="checkbox_all" onclick="checkChange(this);" style="cursor: pointer"/></th>
			<th align="center" width="90%"><p>文件类型</p></th>
		 </tr>
     </thead>

    <% 
      String sql = "select bp_subjectid,bp_objectid from "+GlobalParameter.UCAP+".ucap_bussiness_permission where bp_subjectid = '"+roleId+"'";
      String[][] result = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,sql);
      
      List docTypeList = new DoctypeManager().doFindListByCondition(" 2=2 order by combinedocwords",new Object[0]);
      for(int i=0;i<docTypeList.size();i++){
    	  String checked = "";
    	  Doctype docType = (Doctype)docTypeList.get(i);
    	  if(null!=result && result.length > 1){
    		  for(int j=1;j<result.length;j++){
    			  if(docType.getUnid().equals(result[j][1]))checked = "checked";
    		  }
    	  }
    %>
	<tr align="left" onMouseOver="this.bgColor='#dfe8f6'" onMouseOut="this.bgColor=''" style="cursor:pointer">
		<td align="center" class="tb_1"><input type="checkbox" name="checkbox_list" id="checkbox_<%=docType.getUnid()%>" value="<%=docType.getUnid()%>" <%=checked %>/></td>
		<td class="tb_r" align="left"><p><%=docType.getName()%></p></td>
	</tr>
	<%}%>
</table>	
<center style="margin-top:10px">
	  <a href="#" class="easyui-linkbutton" id=btnSave>保存</a>
      <a href="#" class="easyui-linkbutton" id=btnClose>关闭</a>
</center>
<!-- <table style="position:absolute;bottom:0;border:solid 1px;width:100%">
   <tr valign="bottom">
	<td align="center">
   	  <a href="#" class="easyui-linkbutton" id=btnSave>保存</a>
      <a href="#" class="easyui-linkbutton" id=btnClose>关闭</a>
      </td>
   </tr>
</table> -->
  <script type="text/javascript">
	    $(function(){
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
		});
		
		function doSave(){
		    var docTypeId="";
			var boxes = document.getElementsByName("checkbox_list");
		 	for(var i = 0; i < boxes.length; i++) {
				if (boxes[i].checked) {
					if(""==docTypeId){
					   docTypeId=boxes[i].id.replace("checkbox_","");	
					}
					else{
					   docTypeId+=","+boxes[i].id.replace("checkbox_","");
					}
				}
			}
            $.ajax({
				type : 'post',
				dataType:'json',
				url : 'ucaprole.action',
				data : {
					"fn":'selectDocType',
					"roleId" : '<%=roleId%>',
					"docTypeId" : docTypeId
				},
				success : function(data) {
					top.lwin.alert('操作提示','操作成功','info',1000);
					location.reload();
				}
			});
		}
		
		function doClose(){
	        top.lwin.close(true);	
		}
    </script>
</body>
</html>