<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.ucap.module.ModuleLeafManager"%>
<%@page import="com.linewell.core.ucap.module.ModuleLeaf"%>
<%@page import="com.linewell.core.flow.config.FlowConfig"%>
<%@page import="com.linewell.core.flow.config.FlowConfigBusiness"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.util.ListUtil"%>
<%@include file="/core/params.jsp" %>
<% 
	String fn = "add";
	String appunid = request.getParameter("appunid");
	String leafunid = request.getParameter("leafunid");
	ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
	ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(leafunid);
	
	FlowConfigBusiness business = new FlowConfigBusiness();
	List<FlowConfig> flowConfigList = business.getFLowListByModuleUnid(leafunid, appunid);
	FlowConfig flowConfig = null;
	if(!ListUtil.isNull(flowConfigList)){
		fn = "update";
		flowConfig = flowConfigList.get(0);
	} else {
		flowConfig = new FlowConfig();
		flowConfig.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("path", request.getContextPath());
	request.setAttribute("moduleLeaf", moduleLeaf);
	request.setAttribute("flowConfig", flowConfig);
%>

<html>
<head>
	<link rel="stylesheet" type="text/css" href="${corejs}/jquery-easyui-1.3.3/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/jquery-easyui-1.3.3/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/jquery-easyui-1.3.3/demo.css">
	<!-- <link rel="stylesheet" href="${corejs}/ztree/zTreeStyle/zTreeStyle.css" type="text/css"> -->
	
	<script type="text/javascript" src="${corejs}/jquery-easyui-1.3.3/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
	<!-- <script type="text/javascript" src="${corejs}/ztree/jquery.ztree.min.js"></script> -->
	${import_theme}
	${import_jquery}
	${import_validation}
</head>
<body>	
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnReset"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 重置 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/moduleFlowConfig.action">
		<input type="hidden" name="fn" id="fn" value="<%=fn%>">
		<input type="hidden" name="moduleLeaf[]leaf_unid" id="leaf_unid" value='${moduleLeaf.leaf_unid}'>
		<input type="hidden" id="unid" name="flowConfig[]unid" value='${flowConfig.unid}'>
		<input type="hidden" id="punid" name="flowConfig[]punid" value='${moduleLeaf.leaf_unid}'>
		<input type="hidden" id="appunid" name="flowConfig[]appunid" value="<%=appunid%>">
		<input type="hidden" id="state" name="flowConfig[]state" value="1">
		<table width="98%" align="center" class="form_table">
		<tr>
		   <th width=100px align=right>URL&nbsp;</th>
		   <td colspan='3'>
		   <input type="hidden" id="view_unid" name="view_unid">
		   <input style='width:100%' type='text' name='moduleLeaf[]leaf_contents' id='leaf_contents' value='${moduleLeaf.leaf_contents}' readonly="readonly"/>
		   </td>
		   <td width=100px align="left">
		   <a href="javascript:selURL();" class="easyui-linkbutton">选择视图</a>
		</tr>
		<tr>
		  <th width=100px align=right>流&nbsp;程&nbsp;</th>
		   <td colspan='3'>
		   <input type="hidden" id="flowid" name="flowConfig[]flowid" value='${flowConfig.flowid}'>
		   <input style='width:100%' type='text' name='flowConfig[]name' id='name' value='${flowConfig.name}' readonly="readonly"/>
		   </td>
		   <td width=100px align=left>
		   <a href="javascript:selFlow();" class="easyui-linkbutton">选择流程</a>
		</tr>	
		</table>						
		</form>
	</div>

<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnReset").bind("click",doReset);
	});
	
	//选择视图
	function selURL(){
		//top.lwin.viewRecordWindow('B369E053C83ABB44A118725975D2DEAE', '1', 'view_unid', 'VIEW_UNID');
		var obj = new Object(); 
		window.showModalDialog('${path}/core/view/cfg/choose_view.jsp?_rand'+Math.random()+'&APP_UNID=' + $('#appunid').val(),obj,'dialogWidth=800px;dialogHeight=495px');
		if(obj.unid){
			$('#view_unid').val(obj.unid);
			$('#leaf_contents').val('view.action?fn=grid&viewId=' + obj.unid);
		}
	}
	
	//选择流程
	function selFlow(){
		top.lwin.open('core/view/cfg/choose_flow.jsp?appUnid=' + $('#appunid').val() + '&flowUnid=' + $('#flowid').val(), '选择流程', 800, 400, 'icon-search');
	}
	
	//保存表单信息
	function doSave(){
		if(validate.validate()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
					top.lwin.close(true);
				}
			});
		}
	}
	
	//重置表单信息
	function doReset(){
		($('#jspForm')[0]).reset();
	}
	
	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	    },
	    messages:{
	    }
  	});	

</script> 
</body>
</html>