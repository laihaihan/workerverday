<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucap.admin.module.FormWrapper"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%
/**
 * 表单设计器
 * @author 
 * @since 
 */
//获取业务模块标识
String moduleUnid = request.getParameter("moduleUnid");
String appUnid = request.getParameter("appUnid");
//如果是不存在系统与模块传值，直接默认为出错，退出不做处理
if(StringUtils.isEmpty(moduleUnid) 
        || StringUtils.isEmpty(appUnid)){
    return;
}

//是否有流程
String isFlow = request.getParameter("isFlow");
if(StringUtils.isEmpty(isFlow)){
	isFlow = "";
}

List<Form> formList = FormWrapper.getFormByModuleUnid(moduleUnid);
String firstFormUnid = "";
if(null==formList){
	formList = new ArrayList<Form>();
}else if(!formList.isEmpty()){
	firstFormUnid = formList.get(0).getUnid();
}

//获取需要创建HTML的表单unid集
List<Form> createFormList = FormWrapper.getCreateFormList(formList,appUnid);
  	
%>
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>显示表单配置</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <link href="style/stytle.css" rel="stylesheet" type="text/css" />
    <script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
    <script language="javascript" src="../js/pageStep.js"></script>
    <%@include file="../include/platformresources.jsp"%>
    <script type="text/javascript">
    //加载jquery
	(function($){
		//页面加载之前执行
		create();
		
		/**
		*创建所有的表单HTML文件
		*/
		function create(){
		  <%
       		for(Form form:createFormList){
       			String formUnid = form.getUnid();
	       %>
	       			createHtml("<%=formUnid%>");
	       <%
	       		}
	       %>
		}
       	
       	/**
		*创建表单HTML文件
		*@param  unid 要创建的表单unid
		*/
		function createHtml(unid){
		    //定义action的链接地址
		    var actionUrl = appPath + "BaseAction.action?type=CreateHtmlAction&unid="+unid+"&belongToAppId=<%=appUnid%>";
			// 提交到后台
		    $.ajax({
		       type : "post",
		       url : actionUrl,
		       async : false,
		       success : function(data, textStatus) {        
		       },	
		       error : function() {                                           
		           alert("加载数据失败！");
		       },
		       statusCode : {// 处理错误状态
		           404 : function() {
		               alert("加载数据失败！");
		           }
		       }
		   });// end ajax
		}//页面加载之前执行 end
		
		//页面加载完成后执行
		$(function(){
			$("#formList").dblclick(function(){
				var formUnid = $(this).find("option:selected").val();
	        	Ext.getDom("formShowIfr").src="<%=systemPath %>formDesigner/FormDesigner.jsp?unid="+formUnid+"&type=03&formId=5364AE70753E46850068000044001738";
			});
			function formListDblClk(obj){
	        	var formUnid = obj.value;
	        	Ext.getDom("formShowIfr").src="<%=systemPath %>formDesigner/FormDesigner.jsp?unid="+formUnid+"&type=03&formId=5364AE70753E46850068000044001738";
	        }
			
	    	//定义上一步的链接
			pageStep.preUrl = "configBuildFrame.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&isFlow=<%=isFlow%>";
	
			//定义下一步的链接
			pageStep.nextUrl = "viewList.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&isFlow=<%=isFlow%>";
	
			/**
	 		 * 处理下一步的逻辑
	         */
	        pageStep.nextAction = function(){
	           jQuery("#formShowIfr").hide();
	           this.canGoNext = true;
	        }
	
	       /**
	        * 处理上一步的逻辑
	        */
	       pageStep.preAction = function(){
	          jQuery("#formShowIfr").hide();
	          this.canGoPre = true;   
	       }
		})//页面加载完成后执行 end
	})(jQuery);//加载jquery end
    </script>
  </head>
  <body style="overflow:hidden">
  	<div id="viewDiv" class="showCfgLeftBox">
		 <select name="formList" size="20" style="width:100%;height:100%" id="formList" >
		 <%
          for(int i=0;i<formList.size();i++){
        	  Form form = formList.get(i);
        	  if(0==i){
       %>
           <option value="<%=form.getUnid()%>" selected="selected"><%=form.getNameCn()%></option>
       <%}else{%>
       		<option value="<%=form.getUnid()%>"><%=form.getNameCn()%></option>
       <%}}%>
    	</select>
    </div>
	<div class="showCfgRightBox">
	<%
		if(StringUtils.isNotEmpty(firstFormUnid)){
	%>
	<iframe frameborder=0 scrolling="yes" name="formShowIfr" id="formShowIfr" style="width:100%;height:100%;overflow:hidden;" src="<%=systemPath %>formDesigner/FormDesigner.jsp?unid=<%=firstFormUnid%>&type=03&formId=5364AE70753E46850068000044001738"></iframe>
	<%
		}
	%>
	</div>
     
  </body>
</html>
