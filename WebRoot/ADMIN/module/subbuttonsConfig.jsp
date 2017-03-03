<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@include file="../include/platformresources.jsp"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucap.admin.module.FormWrapper"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%
/**
 * 模块管理首页
 * @author 
 * @since 
 */
    //获取业务模块标识
	String moduleUnid=request.getParameter("moduleUnid");
    String appUnid = request.getParameter("appUnid");
  	List<Form> formList = FormWrapper.getFormByModuleUnid(moduleUnid);
  	String firstFormUnid = "";
  	if(null==formList){
  		formList = new ArrayList<Form>();
  	}else if(!formList.isEmpty()){
  		firstFormUnid = formList.get(0).getUnid();
  	}
%>
<html>
  <head>
    <title>按钮配置</title>
    <script type="text/javascript">
        function formListDblClk(obj){
        	var formUnid = obj.value;
        	Ext.getDom("subbuttonsIfr").src="<%=systemPath %>/ADMIN/module/subbuttons.jsp?formUnid="+formUnid+"&moduleUnid=<%=moduleUnid%>&appUnid=<%=appUnid%>";
        }
   </script>
  </head>
  <body style="overflow:hidden">
     <table style="width:100%;height:310px">
	   	<tr>
		   	<td style="width:200px">
		   		<div id="viewDiv" style="width:200px;overflow:hidden;height:100%">
		   		<select name="formList" size="20" style="width:100%;height:100%" id="formList" onDblClick="formListDblClk(this);">
		   		<%
		   		   for(Form form:formList){
		   		%>
		   		    <option value="<%=form.getUnid()%>"><%=form.getNameCn()%></option>
		   		<%}%>
    			</select>
		   		</div>
		   	</td>
		   	<td style="width:100%;height:100%">
		   		 <iframe frameborder=0 scrolling="yes" name="subbuttonsIfr" id="subbuttonsIfr" style="width:100%;height:100%;overflow:hidden;" src="<%=systemPath %>/ADMIN/module/subbuttons.jsp?formUnid=<%=firstFormUnid%>&appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>"></iframe>
		   	</td>
	   	</tr>
   	</table>
  </body>
</html>
