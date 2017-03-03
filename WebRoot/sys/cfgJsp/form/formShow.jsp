<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<html>
  <head>
    <title>显示表单配置</title>
  </head>
  <%
	  	String viewId=request.getParameter("viewId");
	  	if(""==viewId || null==viewId)
	  	{
	  		viewId="2DC1CBF1FB807F0827F7B3856B7D2824";//显示表单的视图unid
	  	}
  		String sSystemPath = request.getContextPath()+"/";
  		String unid=request.getParameter("unid");
  		
	  	//按钮所属的模块
		String belongToModuleId = request.getParameter("belongToModuleId");
		if(null==belongToModuleId || belongToModuleId.trim().equals(""))
		{
			belongToModuleId="";
		}
		//按钮所属系统
		String belongToAppId = request.getParameter("belongToAppId");
		if(null==belongToAppId || belongToAppId.trim().equals(""))
		{
			Session us_sn = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
			 if(null!=us_sn && null!=us_sn.getApp())
			 {
				belongToAppId=us_sn.getApp().getUnid(); 	
			 }
		}
		//获取所属表单的标识，以便在设置版本时进行使用，表单标识
		String formId = request.getParameter("formId");
		if(null==formId || formId.trim().equals(""))
		{
			formId=unid;
		}
   %>
    <script type="text/javascript">
		Ext.onReady(function(){
			//加载视图
			initFormJspView('<%=viewId%>',"viewDiv","unid=<%=unid%>&belongToAppId=<%=belongToAppId%>");
		});
		
		//window.frames["formShowIfr"].document;
		//记录单击事件
		function formShowClick(u)
		{
			Ext.getDom("formShowIfr").src="<%=sSystemPath %>sys/cfgJsp/form/formShowItem.jsp?unid="+u+"&belongToModuleId=<%=belongToModuleId%>&belongToAppId=<%=belongToAppId%>&formId=<%=formId%>&belongToFormId=<%=unid%>";
		}
		
		//显示表单新建函数
		function creatformShow()
		{
			Ext.getDom("formShowIfr").src="<%=sSystemPath %>sys/cfgJsp/form/formShowItem.jsp?unid=&belongToModuleId=<%=belongToModuleId%>&belongToAppId=<%=belongToAppId%>&formId=<%=formId%>&belongToFormId=<%=unid%>";
		}
		
		//清除表单数据
		function clearFormData()
		{
			var document=window.frames["formShowIfr"].document;
		}
	</script>
  <body style="overflow:hidden">
     <table style="width:100%;height:100%">
	   	<tr>
		   	<td style="width:250px">
		   		<div id="viewDiv" style="width:250px;overflow:hidden;height:100%">
		   		</div>
		   	</td>
		   	<td style="width:100%;height:100%">
		   		 <iframe frameborder=0 scrolling="yes"  name="formShowIfr" id="formShowIfr"  style="width:100%;height:100%;overflow:hidden;"  src="<%=sSystemPath %>sys/cfgJsp/form/formShowItem.jsp?unid=&belongToModuleId=<%=belongToModuleId%>&belongToAppId=<%=belongToAppId%>&formId=<%=formId%>&belongToFormId=<%=unid%>"></iframe>
		   	</td>
	   	</tr>
   	</table>
  </body>
</html>
