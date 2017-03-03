<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucap.platform.cache.form.Item"%>
<%@page import="com.linewell.ucapx.redevelop.codetool.util.GeneratorUtil"%>
<%@page import="java.util.Map"%>
<%@page import="com.linewell.ucap.frame.util.GlobalUtils"%>
<%@page import="com.linewell.ucapx.common.WebAppUtils"%>
<%@page import="com.linewell.ucapx.form.CommonFormApi"%>

<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.io.File"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>



<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta content="history" name="save" />
<title>第三步、（Bean&lt;-&gt;表）映射关系配置 - 代码生成工具</title>
<%@include file="include/common.jsp"%> 

<%
    String packageName = request.getParameter("package");
    String webRoot = request.getParameter("webRoot");
    String sourceFolder = request.getParameter("sourceFolder");
    String moduleName = request.getParameter("moduleName");
    String redirect = request.getParameter("redirect");
    //应用的UNID
    String appUnid = request.getParameter("appUnid");
    if(StringUtils.isNotEmpty(webRoot)){
    	webRoot = webRoot.replace("\\","/").replace(File.separator,"/");
    }
    if(StringUtils.isNotEmpty(sourceFolder)){
    	sourceFolder=sourceFolder.replace("\\","/").replace(File.separator,"/");
    }
    //查询模块下的所有表单
    String[]ids = formIds.split(",");
    String firstFormId = ids[0];
    CommonFormApi cfa = new CommonFormApi();
    List<Form> formList = new ArrayList<Form>();
    for(int i=0;i<ids.length;i++){
    	Form form = cfa.getForm(ids[i]);
    	formList.add(form);
    }
%>


	<script type="text/javascript">
		
		var currentFormId="<%=firstFormId%>";
		var itemMaps=null;
		var curentTab=1;
		
		/**
		 * 切换页签
		 */
	    function change(formId,i){
	    	if(formId==currentFormId)return;
	    	if(!validateItemsMap())return;
	    	if(currentFormId!=""){
	    		setItemMaps();
	    	}
	        Ext.getDom("itemMapFrame").src = "itemMap.jsp?formId="+formId;
	        currentFormId = formId;
	        if(i)
	        {
	        	if(curentTab==i)return;
	        	document.getElementById("tab_"+i).className="info_tab_item current";
	        	document.getElementById("tab_"+curentTab).className="info_tab_item";
	        	curentTab=i;
	        }
	    }
	    
	    function setItemMaps(){
	    	var index = -1;
	    	var ifmDoc =window.frames["itemMapFrame"].document;
	    	var tmpTableName = ifmDoc.getElementById("tableName").value;
	    	var tmpFormId = ifmDoc.getElementById("formId").value;
	    	var itemMap={
				tableName:"",
				className:"",
				formId:"",      //表单标识
				columnNames:"",//多个列名以逗号“,”分隔
				propertyNames:""//多个属性名以逗号“,”分隔
			}
		
	    	if(null==itemMaps){
	    		itemMaps = new Array();
	    	}else{
	    		for(var i=0;i<itemMaps.length;i++){
	    			if(itemMaps[i].formId==tmpFormId){
	    				index = i;
	    				break;
	    			}
	    		}
	    	}
	    	itemMap.tableName = tmpTableName;
	    	itemMap.formId = tmpFormId;
	    	itemMap.className = ifmDoc.getElementById("className").value;
	    	var columnName = ifmDoc.getElementsByName("columnName");
	    	var propertyName = ifmDoc.getElementsByName("propertyName");
	    	for(var i=0;i<columnName.length;i++){
	    		if(i==0){
	    			itemMap.columnNames = columnName[i].value;
	    		}else{
	    			itemMap.columnNames +=","+columnName[i].value;
	    		}
	    	}
	    	for(var i=0;i<propertyName.length;i++){
	    		if(i==0){
	    			itemMap.propertyNames = propertyName[i].value;
	    		}else{
	    			itemMap.propertyNames +=","+propertyName[i].value;
	    		}
	    	}
	    	if(index<0){
	    		itemMaps[itemMaps.length] = itemMap;
	    	}else{
	    		itemMaps[index] = itemMap;
	    	}
	    }
	    
	    //点击确定执行的脚本
	    function confirm(){
	    	setItemMaps();
	    	var package = Ext.getDom("package").value;
	    	var webRoot = Ext.getDom("webRoot").value;
	    	var sourceFolder = Ext.getDom("sourceFolder").value;
	    	var formIds = Ext.getDom("formIds").value;
	    	//将原来的src名称改为package，mdy by llp 2011-08-01
	    	var result = "{moduleId:'<%=moduleId%>',moduleName:'<%=moduleName%>',sourceFolder:'"+sourceFolder+"',formIds:'"+formIds;
	    	result+="',package:'"+package+"',webRoot:'"+webRoot+"',itemMaps:["
	    	if(null!=itemMaps){
	    		for(var i=0;i<itemMaps.length;i++){
	    			var itemMap="{tableName:'"+itemMaps[i].tableName+"',";
	    			itemMap+="className:'"+itemMaps[i].className+"',";
	    			itemMap+="formUnid:'"+itemMaps[i].formId+"',";
	    			itemMap+="columnNames:'"+itemMaps[i].columnNames+"',";
	    			itemMap+="propertyNames:'"+itemMaps[i].propertyNames+"'}";
	    			
	    			if(i==0){
	    				result+=itemMap;
	    			}else{
	    				result+=","+itemMap;
	    			}
	    		}
	    	}
	    	
	    	result+="]}"
	    	
	    	return result;
	    }
	   
	    //生成之前先进行验证 
	    function validate(){
	    	var src = Ext.getDom("package").value;
	    	var webRoot = Ext.getDom("webRoot").value;
	    	var sourceFolder = Ext.getDom("sourceFolder").value;
	    	
	    	if(src.trim()==""){
	    		alert("请输入src路径地址！");
	    		Ext.getDom("package").focus();
	    		return false;
	    	}
	    	
	    	if(webRoot.trim()==""){
	    		alert("请输入webroot路径下的模块地址！");
	    		Ext.getDom("webRoot").focus();
	    		return false;
	    	}
	    	if(sourceFolder.trim()==""){
	    		alert("请输入src路径地址！");
	    		Ext.getDom("sourceFolder").focus();
	    		return false;
	    	}
	    	return validateItemsMap();
	    }
	    
	    //字段列表配置的属性名进行验证
	    function validateItemsMap(){
	        var result = true;
	    	var ifmDoc =window.frames["itemMapFrame"].document;
	    	var className = ifmDoc.getElementById("className").value;
	    	
	    	if(className.trim()==""){
	    		alert("类名称不用为空！");
	    		ifmDoc.getElementById("className").focus();
	    		return false;
	    	}
	    	var columnNameCn = ifmDoc.getElementsByName("columnNameCn");
	    	var propertyName = ifmDoc.getElementsByName("propertyName");
	    	//非空判断
	    	for(var i=0;i<propertyName.length;i++){
	    		if(propertyName[i].value.trim()==""){
	    			alert("字段\‘"+columnNameCn[i].value+"\’的对应属性名不能为空!");
	    			propertyName[i].focus();
	    			return false;
	    		}
	    	}
	    	//重名判断
	    	for(var i=0;i<propertyName.length;i++){
	    	   for(var j=i+1;j<propertyName.length;j++){
	    	   	  if(propertyName[i].value.trim()==propertyName[j].value.trim()){
	    	   	  	  alert("字段\‘"+columnNameCn[i].value+"\’的对应属性名与字段\‘"+columnNameCn[j].value+"\’重名，请修改其中一个属性名！");
	    	   	  	  propertyName[i].focus();
	    		      return false;
	    	   	  }
	    	   }
	    	}
	    	return result;
	    }
	    
	//生成模块代码
	function generate(){
		if(!validate()){
			return;
		}
		var data=confirm();

		var requestConfig = {
				url:formRelation.baseAction,
				params : {					
					type :"generate",
					action:"genCode"
				},
				jsonData:data,
				callback : function(options, success, response) {
					if (success) {
						var json = response.responseText;
						if(json ==""){
							alert("模块代码生成成功！");
							window.close();
						}else{
							alert("后台逻辑处理出现错误！");
						}
					} else {
						alert("后台逻辑处理出现错误！");
					}
					
				}
			}
			Ext.Ajax.request(requestConfig);
	}
	
	/**
     * 上一步
     */
	function backStep(){
		document.getElementById("generateForm").submit();
	}
	</script>
<script language="javascript" src="js/jquery-tabscroll.js"></script>
<script language="javascript">
jQuery(function(){
(function($){
    //调用可扩展的tabScroll
    $(".info_tab").tabScroll();
    
})(jQuery);//把jQuery作为参数传递进去执行，保证可以用$
});
</script>
</head>
<body>

<!--底区域-->
<div class="area_bg_bottom"></div>

<!--主区域 begin-->
<div class="area_main_public">
	<!--标题-->
	<div class="area_title"><img src="style/images/title_3.gif" alt="" /></div>

	<!--下一步-->
	<a class="button_next_invalid" ></a>
	<!--上一步-->
	<a class="button_pre" href="javascript:void(0)" onclick="backStep();"></a>
	
	<form action="step2.jsp" name="generateForm" id="generateForm" method="post">
	   <input name="package" id="package" type="hidden" value="<%=packageName%>"/>
	   <input name="webRoot" id="webRoot" type="hidden" value="<%=webRoot%>"/>
	   <input name="sourceFolder" id="sourceFolder" type="hidden" value="<%=sourceFolder%>"/>
	   <input name="moduleId" id="moduleId" type="hidden" value="<%=WebAppUtils.convertNull(moduleId)%>"/>
	   <input name="appUnid" id="appUnid" type="hidden" value="<%=WebAppUtils.convertNull(appUnid)%>"/>
	   <input name="formIds" id="formIds" type="hidden" value="<%=WebAppUtils.convertNull(formIds)%>"/>
	   <input name="redirect" id="redirect" type="hidden" value="<%=WebAppUtils.convertNull(redirect)%>"/>
	</form>
	
	<!--内容区域 begin-->
	<div class="area_info">		
		<!--页签 begin-->
		    	<!--页签 begin-->		
		<div class="info_tab">
		   <div class="info_tab_list" id="info_tab_list">
			    <ul>
					<%
					 //for(int j = 0; j < 5; j++)
					 {
						for(int i=0;i<formList.size();i++){
							Form form = formList.get(i);
							String className = "";
							if(i==0)
							{
								className = "current";
							}
							%>
							<li class="<%=className%>" id="tab_<%=i+1%>" formId="<%=form.getUnid() %>"
							 onclick="javascript:change('<%=form.getUnid() %>',<%=i+1 %>)"><%=form.getNameCn() %></li>
							<%
						}
					 }
					%>
				</ul>
		    </div>
		    <div class="info_tab_buttons">	
		        <!-- 左按钮 -->
                <div class="info_tab_button left" id="tabBtnLeft">
                </div>
                <!-- 右按钮 --> 
                <div class="info_tab_button right" id="tabBtnRight">
                </div>		
				<!-- 下拉按钮 --> 
	            <div class="info_tab_button down" id="tabBtnDown" style="display:none;">
	            </div>
	        </div>
		</div>
		<!--页签 end-->
		
		<!--视图 begin-->
		<!-- div class="info_view" -->
		<iframe frameborder=0 scrolling="no"  name="itemMapFrame" id="itemMapFrame"  style="width:100%;height:350px"  src="itemMap.jsp?formId=<%=firstFormId %>"></iframe>
		<!-- /div> -->
		<!--视图 end-->
	</div>		
	<!--内容区域 end-->
	
	<!--按钮区域 begin-->
	<!--生成代码-->
	<input class="button_generate" name="generate" type="button" value="" onclick="generate();"/>
	
	<!--取消生成-->
	<input class="button_cancel" name="cancel" type="button" value="" onclick="window.close();"/>
	<!--按钮区域 end-->
</div>
<!--主区域 end-->
</body>
</html> 