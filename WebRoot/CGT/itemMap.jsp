<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="com.linewell.ucap.resource.ResourceCache"%>
<%@page import="com.linewell.ucap.resource.ResourceContext"%>
<%@page import="com.linewell.ucap.resource.ResourceType"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucap.platform.cache.form.Item"%>
<%@page import="com.linewell.ucapx.redevelop.codetool.util.GeneratorUtil"%>
<%@page import="com.linewell.ucap.frame.util.GlobalUtils"%>

<%@include file="include/common.jsp"%> 

<%
    String formId = request.getParameter("formId");
	ResourceCache cache = ResourceContext.newInstance().getResourceCache(ResourceType.RESOURCE_TYPE_FORM);
	Form form = (Form)cache.getResource(formId);
	String className = GeneratorUtil.getClassNameByTableName(form.getNameEn().toLowerCase());
	
	//字段类型配置的字典为：4400C105917A425F001A005922006704
	Map<String,String> map = GlobalUtils.getDict().getValues("4400C105917A425F001A005922006704");
%>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <title>字段映射关系</title>
	<script type="text/javascript">
        //加载时进行设置
	    window.onload=function(){
	        if(null!=document.getElementById("className")){
	        	if(null!=window.parent.itemMaps){
	        		var ifmDoc =document;
	        		for(var j=0;j<window.parent.itemMaps.length;j++){
	        			var tmpItemMap = window.parent.itemMaps[j];
	        			if(tmpItemMap.formId=="<%=formId%>"){
	        				ifmDoc.getElementById("className").value=tmpItemMap.className;
	        				var propertyName = ifmDoc.getElementsByName("propertyName");
	        				var pv = tmpItemMap.propertyNames;
	        				var pvs = pv.split(",");
	        				for(var k=0;k<propertyName.length;k++){
	    						propertyName[k].value=pvs[k];
	    					}
	        				break;
	        			}
	        		}
	        	}
	        }
		}

		String.prototype.trim=function(){var A=/^\s+|\s+$/g;return function(){return this.replace(A,"")}}();
		function replace(){
			var prefixValue = document.getElementById("prefixName").value;
			prefixValue = prefixValue.trim();
			if(prefixValue!=""){
				var propertyName = document.getElementsByName("propertyName");
				for(var i=0;i<propertyName.length;i++){
					var pv = propertyName[i].value;
					if(pv.indexOf(prefixValue)==0){
						pv = pv.substr(prefixValue.length);
						
						pv = pv.substring(0,1).toLowerCase()+pv.substr(1);
						
						propertyName[i].value = pv;
					}
				}
			}
		}
	</script>
<script language="javascript">
jQuery(function(){
(function($){
    //调用可扩展的tabScroll
    $("#prefixName").keypress(function(event) {        
       if(13 === event.keyCode){
            $("#btnReplace").click();
       }
    });
    
    
})(jQuery);//把jQuery作为参数传递进去执行，保证可以用$
});
</script>
  </head>
  <body>
    	 <!--表单信息 begin-->	
		<div class="info_from">
			<input type="hidden" id="tableName" name="tableName" value="<%=form.getNameEn().toLowerCase()%>"/><input type="hidden" id="formId" name="formId" value="<%=form.getUnid()%>"/>
			<span class="info_from_title"><font color="red">*类名:</font></span>
			<span><input name="className" id="className"  type="text"  value="<%=className%>" size="15"/>(<%=form.getNameEn()%>)&nbsp;</span>
			<span class="info_from_title">
			&nbsp;&nbsp;&nbsp;<font color="red">去除属性名前缀：</font>
			<input  title="如deptName,去除前缀dept则为name" name="prefixName" id="prefixName"  type="text"  value="" size="5"/>	
			</span>
			<span><input title="如deptName,去除前缀dept则为name" type="button" name="btnReplace" id="btnReplace" value="去除" onclick="replace()"/>
			</span>
			
		</div>
		<!--表单信息 end-->
    <div class="info_view" >
	<table border="0" cellspacing="1" cellpadding="0"  class="info_view_table">
				<!-- 标题行 -->
				<tr class="info_view_table_tr title">
					<td>中文名</td>
					<td>类型</td>
					<td>列名称</td>
					<td><font color="red">*</font>属性名</td>
				</tr>				
				 <%
				 for(int i=0;i<form.getItems().size();i++){
        	 		 Item item = form.getItems().get(i);
        	 		 if(i%2==0)
        	 		 {
        	 		 	%><tr class="info_view_table_tr"><%
        	 		 }
        	 		 else
        	 		 {
        	 		 	%><tr class="info_view_table_tr double"><%
        	 		 }
         		 %>
	             	<td><%=item.getNameCn()%><input type="hidden" name="columnNameCn" value="<%=item.getNameCn()%>"/></td>
	             	<td><%=map.get(item.getType())%></td>
	             	<td><%=item.getNameEn()%><input type="hidden" name="columnName" value="<%=item.getNameEn().toLowerCase()%>"/></td>
	            	<td><input type="text" name="propertyName" value="<%=GeneratorUtil.getPropertyNameByItemName(item.getNameEn().toLowerCase())%>"/></td>
          		</tr>
          	<%}%>
		</table>
 </div>
  </body>
</html>
