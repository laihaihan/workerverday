<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<html>
  <head>
    <title>显示表单配置</title>
    <%@include file="/sys/jsp/session.jsp"%>
 <style type="text/css">
	.pageCss{
		font-weight:bold;
	}
body   
{
		overflow:auto;
} 

	
</style>
</head>
  <%
  		String unid=request.getParameter("unid");
  		
  		//是否新建的标志  1：新建 0：修改
  		String isNew="1";
  		if(StringUtils.isNotEmpty(unid))
  		{
  			isNew="0";
  		}
  		else
  		{
  			unid="";
  		}
  		 //按钮所属的模块
		String belongToModuleId = request.getParameter("belongToModuleId");
		if(null==belongToModuleId || belongToModuleId.trim().equals(""))belongToModuleId="";
		//按钮所属系统
		String belongToAppId = request.getParameter("belongToAppId");
		if(null==belongToAppId || belongToAppId.trim().equals(""))belongToAppId=ucapSession.getApp().getUnid();
		//获取所属表单的标识，以便在设置版本时进行使用，表单标识
		String formId = request.getParameter("formId");
		String belongToFormId=request.getParameter("belongToFormId");
  %>
  <script type="text/javascript">
  	var saved = false;
	Ext.onReady(function(){
		//加载页面
		initFormShow();
		
		//初始化表单设计器
		var formDesignParam="?sourceType=showForm&showFormId=<%=unid%>&unid=<%=belongToFormId%>&belongToAppId=<%=belongToAppId%>";
		Ext.getDom("formDesignIfr").src="<%=sSystemPath %>formDesigner/FormDesigner.jsp"+formDesignParam;
		//初始化选择表文本框的值
		$("formUnid").value="<%=belongToFormId%>";
		$("formUnid_Cn_").value = ucapCommonFun.getDisplayNames("222",$("formUnid").value,"20") || "";
		//初始化数据
		<%
			if(StringUtils.isNotEmpty(unid))
			{
				%>
					initFormShowData();
				<%
			}else{
				%>
				$("moduleUnid").value="<%=belongToModuleId%>";
				$("belongToApp").value="<%=belongToAppId%>";
			<%
			}
		%>
	});
	
	//初始化显示表单
	function initFormShow()
	{
		//加载按钮页面
		var el = Ext.get("formShowButton");
		var mgr = el.getUpdater();
		mgr.update({
	        url: "<%=sSystemPath%>sys/cfgJsp/subbutton/subbutton.jsp?btntype=05&unid=<%=unid%>&belongToModuleId=<%=belongToModuleId%>&belongToAppId=<%=belongToAppId%>&formId=<%=formId%>&personalconfig=1",
	        params:"",
	        scripts:true
		});
	}
	
	//初始化数据第一条记录的数据
	function initFormShowData()
	{
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"formShow","act":"getItem","unid":"<%=unid%>","tmp":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);
					
					var field=["sname","formUnid","htmlUrl","publicType","formJss","formCsss","moduleUnid","belongToApp"];
					var value=[json.name,json.formUnid,json.htmlUrl,json.publicType,json.formJss,json.formCsss,json.moduleUnid,json.belongToApp];
					var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
					ucapCommonFun.bindForm(jsonValue,false,"",1);
					$("formUnid_Cn_").value = ucapCommonFun.getDisplayNames("222",$("formUnid").value,"20");
					if("01"==json.publicType){$('publicType1').checked=true;}else if("02"==json.publicType){$('publicType2').checked=true;}else{$('publicType3').checked=true;}
				} else {
				 	alert("获取显示表单基本信息失败，请刷新页面重新获取！");
				}
			}
		} 
		Ext.Ajax.request(requestConfig);
	}
	
	//页签的显示隐藏
	function displayPage(i)
	{
		if(<%=isNew%>==1 && !saved)
		{
			alert("请先保存显示表单信息");
			return;
		}
		var obj1 =document.getElementById("page_1");
		var obj2=document.getElementById("page_2");
		var li1=document.getElementById("li1");
		var li2=document.getElementById("li2");
		var saveBtn=document.getElementById("btnSave1");
		if(1==i)
		{
			obj1.style.display="";
			obj2.style.display="none";
			saveBtn.style.display="";
			li1.className ="pageCss";
			li2.className ="";
		}
		else
		{
			obj1.style.display="none";
			obj2.style.display="";
			saveBtn.style.display="none";
			li1.className ="";
			li2.className ="pageCss";
		}
	}
	
	//显示表单的保存
	function saveFormShow()
	{	
		if(""==$('sname').value || ""==$('formUnid').value)
		{
			Ext.Msg.alert("系统提示","表单名称不能为空！");
			return;
		}
		//表单数据的保存
		var radionValue="";
		if($("publicType1").checked)
		{
			radionValue= "01";
		}
		else if($("publicType2").checked)
		{
			radionValue= "02";
		}
		else
		{
			radionValue="03";
		}
		var json={};
		json["unid"]="<%=unid%>" || "";
		json["name"]=$('sname').value || "";
		json["formUnid"]=$('formUnid').value|| "";
		json["publicType"]=radionValue || "01";
		json["htmlUrl"]=$('htmlUrl').value || "";
		json["formCss"]=$('formCsss').value || "";
		json["formJsp"]="";
		json["formJss"]=$('formJss').value || "";
		json["belongToApp"]=$('belongToApp').value || "";
		json["moduleUnid"]=$('moduleUnid').value || "";
		json["nameSpell"]="";
		json["relsourceApp"]="";
		json["relsourceModule"]="";
		json["relsourceUnid"]="";
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"formShow","act":"save","unid":"<%=unid%>","isNew":"<%=isNew%>","tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);
					var result=response.responseText;
					if(""!=result)
					{
						//子按钮的保存
						viewConfigFun.subButtonConfigConfirm(result,'1','<%=formId%>','saveCallBack("'+result+'");');
						//Ext.Msg.alert("系统提示","保存成功！");
					}
					else
					{
						Ext.Msg.alert("系统提示","保存失败！");
					}
					saved = true;
				} else {
				 	Ext.Msg.alert("系统提示","保存失败！");
				}
			}
		} 
		Ext.Ajax.request(requestConfig);
	}
	//保存成功后的回调函数
	function saveCallBack(unid)
	{
	    //刷新右边列表
	    window.parent.view.refresh();
	    //刷新页面
		window.location.href="<%=sSystemPath %>sys/cfgJsp/form/formShowItem.jsp?unid="+unid+"&belongToModuleId=<%=belongToModuleId%>&belongToAppId=<%=belongToAppId%>&formId=<%=formId%>&belongToFormId=<%=belongToFormId%>";
	}
</script>

  <body >
   		<div  id=showMenu>
		<UL style="POSITION: relative; WHITE-SPACE: nowrap; TOP: 0px; LEFT: 1px" id=showMenuUL>
		<LI style="CURSOR: hand"    onclick="displayPage(1);"><SPAN  id="li1" class="pageCss">基本信息</SPAN></LI>
		<LI style="CURSOR: hand"  onclick="displayPage(2);"><SPAN id="li2">表单设计器</SPAN></LI>
		</UL>
		<div align="right"><input type="button" id="btnSave1" class="btnChannel"  value="保存" onClick="saveFormShow();"/></div>
		</div>
   		<div id="page_1" >
   			<table style="width:100%;overflow:hidden;" >
   				<tr>
   					<td style="">
   						<div id="formShow" style="width:100%;height:100%">
   						
								<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet3">
									<COL width="20%">
									<COL width="30%">
									<COL width="20%">
									<COL width="30%">
								  <tr>
									    <th><span class="red">*</span>显示表单名称：</th>
									    <td><input name="sname" id="sname" type="text" class="inputbox" /></td>
									     <th>公共类型：</th>
									    <td>
									    <input name="publicType" type="radio" id="publicType1" value="01"  checked/>
										模块
										  <input name="publicType" type="radio" id="publicType2" value="02" />
										系统
										 <input name="publicType" type="radio" id="publicType3" value="03" />
										平台
									    </td>									    
								  </tr>
								  <tr style="display:none">
									    <th>HTML页面路径：</th>
									    <td><input name="htmlUrl"  id="htmlUrl"type="text" class="inputbox" /></td>
									    <th><span class="red">*</span>选择表：</th>
									    <td>
									    <input name="formUnid"  id="formUnid" type="text"  style="display:none;"/>
									    <input name="formUnid_Cn_"  id="formUnid_Cn_" type="text" class="inputred" readOnly/>
									    <input id="_btn" type="button" value="选" onclick="selectDataSD('222','1','formUnid');" />
									    </td>
								  </tr>
								  <tr>
									    <th>引入外部的js文件：</th>
									    <td colspan="3" ><input name="formJss"  id="formJss" type="text" class="inputbox" /></td>
								  </tr>
								  <tr>
									    <th>引入外部css文件：</th>
									    <td colspan="3" ><input name="formCsss" id="formCsss" type="text" class="inputbox" />
									    <input type="text" id="moduleUnid" name="moduleUnid" class="inputbox"  style="display:none;"/>
									    <input type="text" id="belongToApp" name="belongToApp" class="inputbox" style="display:none;"/>
									    </td>
								  </tr>
								</table>
   						</div>
   					</td>
   				</tr>
   				<tr>
   					<td>
   						<div id="formShowButton" style="width:100%;height:100%">
   							 
   						</div>
   					</td>
   				</tr>
   			</table>
   		</div>
   		<div id="page_2" style="display:none;width:100%;height:100%" >
   			<iframe frameborder=0 scrolling="no"  name="formDesignIfr" id="formDesignIfr"  style="width:100%;height:100%"  src=""></iframe>
   		</div>
  </body>
</html>
