<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.util.UNIDGenerate"%>
<%@page import="com.linewell.ucap.admin.module.ModuleWrapper"%>
<%
/**
 * 业务模块基本信息配置
 * @author 
 * @since 
 */
   //业务模块标识
   String moduleUnid = request.getParameter("moduleUnid");
   String appUnid = request.getParameter("appUnid");
   String funid = "";
   if(StringUtils.isEmpty(moduleUnid)){
	   funid = ModuleWrapper.getModuleFunid(appUnid);
   }
   UNIDGenerate ug = new UNIDGenerate();
   String unid = ug.getUnid();
%>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	<title>模块基本信息</title>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">	
	<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
	<script language="javascript" src="../js/pageStep.js"></script>
	<script language="javascript" src="../js/gb2py.js"></script>
	<%@include file="../include/platformresources.jsp"%>
	<link href="style/stytle.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
<script type="text/javascript">
    var isNew = "";
	Ext.onReady(function(){
	    var moduleUnid = "<%=moduleUnid%>";
	    if(null==moduleUnid || ""==moduleUnid){
	        isNew = "true";
	    	var funid="<%=funid%>";
			var belongToAppId="<%=appUnid%>";
			var unid = "<%=unid%>";
			//分级管理新建模块时的所属系统UNID modify by zh 2010-6-9
			Ext.getDom("type").value="01";
			Ext.getDom("sourceType").value="02";
			Ext.getDom("funid").value=funid ;
			Ext.getDom("unid").value=unid ;
			Ext.getDom("belongApp").value=belongToAppId ;
			Ext.getDom("edit").value="1";
	    }else{
	    	var url = ucapSession.baseAction+"?";
			url += "type=managerAction&act=getModule&unid="+moduleUnid+"&rand="+Math.random();
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", url, false);
			conn.send(null);
			var jsonObject = Ext.decode(conn.responseText);
			var exResult=ucapCommonFun.dealException(jsonObject);
			if(!exResult)return;
			if(!jsonObject.isFlow || jsonObject.isFlow!="1")jsonObject.isFlow="0";
			var field=["unid","funid","edit","type","belongApp"
			,"sourceType","name","nameEn","isFlow","sort","picture"];
			var value = [jsonObject.unid,jsonObject.funid,jsonObject.edit,jsonObject.type,
			jsonObject.belongApp,jsonObject.sourceType,jsonObject.name,jsonObject.nameEn,jsonObject.isFlow,jsonObject.sort,jsonObject.picture];
			var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
			ucapCommonFun.bindForm(jsonValue,false,"",1);
			titleModuleIconChange(Ext.getDom("picture"));
	    }

	});
	
(function($){
/**
 * 页面加载完成
 */
$(function(){
	//是否要流程
    $("input[name='isFlow']").click(function(){
        var winParent = window.parent;
        if($(this).val() === "1"){
	        if(winParent){
	           winParent.parentEvent.showFlowNav(true);
	        }
	    }else{
	       if(winParent){
               winParent.parentEvent.showFlowNav(false);
            }
	    }
    });
    
    //中文输入的操作,获取拼音首字母    
    $("#name").blur(function(){
    
        //获取中文字符串
        var gbStr = $("#name").val();
        
        //获取拼音首字母
        var pyStr = getSpell(gbStr, true).toLowerCase();
        
        //设置英文字符串
        $("#nameEn").val(pyStr);
    });
    
});
})(jQuery);
	
	/*
	 * 供确认时调用
	 */
	function postModule(){
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"managerAction","act":"saveModule","isNew":isNew,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;				
					
					
					if(unid && ""!=unid){
						ucapManagerTree.refreshNode(true);
					}else{
						ucapManagerTree.refreshNode();
					}
				} else {
					topWin.Ext.Msg.alert("提示","视图基本信息自定义不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
	
	function titleModuleIconChange(obj){
	
		var icon ="";
		if (obj.value!=""){
			icon =ucapSession.appPath+"ADMIN/style/"+obj.value;			
		} else {
			//避免没选择图片时IMAGE的展示问题
			icon=ucapSession.appPath+"ADMIN/style/images/module/businessModelingBtn_0.png";
		}
		Ext.getDom("titleIconImg").src = icon;
	}
	//定义上一步的链接
pageStep.preUrl = "";

//定义下一步的链接
pageStep.nextUrl = "formList.jsp?appUnid=<%=appUnid%>";

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
    //系统提交验证信息
    if(Validator.Validate("", 1)){
		//保存
		postModule();
		this.nextUrl="formList.jsp?appUnid=<%=appUnid%>"+"&moduleUnid="+jQuery("#unid").val();
		this.nextUrl+="&isFlow="+jQuery("input[name='isFlow'][checked=true]").val();
	    this.canGoNext = true;
	}
}

/**
 * 处理上一步的逻辑
 */
pageStep.preAction = function(){
   this.canGoPre = true;
      
}
</script>
	<div id="dialogHtml">
	  <span style="display:none">
         <input type="text" class="inputbox" id="unid" name="unid"/>
         <input type="text" class="inputbox" id="funid" name="funid"/>
         <input type="text" class="inputbox" id="edit" name="edit" />
         <input type="text" class="inputbox" id="type" name="type" />
         <input type="text" class="inputbox" id="belongApp" name="belongApp" />
         <input type="text" class="inputbox" id="sourceType" name="sourceType" sourceType="01" />
      </span>
      <table class="tableSet3" align="center" border="0">
        <col width="30%"/>
        <col width="70%"/>
 	    <tr>
		   <th>
                <span class="red">*</span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:
           </th>
		   <td><input type="text" class="inputbox" id="name" name="name"  length="100"  nameCn="模块名称"  nameEn="name" valiateType="Notnull" /></td>
	    </tr>
	     <tr>
		   <th>
                <span class="red">*</span>英文名称:
           </th>
		   <td><input type="text" class="inputbox" id="nameEn" name="nameEn"  length="100"   nameCn="模块英文名称"  nameEn="nameEn" valiateType="English" /></td>
	    </tr>
	    <tr>
		   <th>
                <span class="red">*</span>是否流程:
           </th>
		   <td>
		   <input type="radio" id="isFlow" name="isFlow" value="1" checked>是</input>
		   <input type="radio" id="isFlow" name="isFlow" value="0"> 否</input> 
		   &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
		   <span style="color: red">提示：选择是，其下数据表单与流程绑定；选择否，其下数据表单不绑定流程。</span>
		   </td>
	    </tr>
	    <tr>
           <th>图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标:</th>
		    <td>
		     <select name="picture" id="picture" onchange="titleModuleIconChange(this)" class="iconSelect">
    	      <option value="">无</option>
       		  <%
       	        for(int i=1;i<11;i++){%>
                  <option value="<%="images/module/businessModelingBtn_"+i+".png"%>"><%=i%></option>
        	 <% }%>
    		</select>  
     		<img id="titleIconImg" src="<%=systemPath%>ADMIN/style/images/module/businessModelingBtn_0.png" class="iconShow"/> 
	    </tr>
      </table>
    </div>
  </body>
</html>
