<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.util.DateTime"%>
<%@page import="com.linewell.core.ucap.module.*"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="net.sf.json.*"%>
<%@page import="org.apache.commons.lang.*"%>
<%@page import="com.linewell.core.db.*"%>
<%@page import="java.sql.*"%>
<%@page import="com.linewell.core.sequence.CoreSequence"%>
<%@page import="com.linewell.core.sequence.CoreSequenceManager"%>
<%@page import="com.linewell.core.doctype.Doctype"%>
<%@page import="com.linewell.core.doctype.DoctypeManager"%>
<%@page import="com.linewell.core.sequence.CoreCoreSequence"%>
<%@page import="com.linewell.core.sequence.CoreCoreSequenceManager"%>
<%!@SuppressWarnings("unchecked")
	public String getFlowComboTree(String jndi,String belongToApp) {
		JSONArray jarray = new JSONArray();
		String sql = "SELECT DISTINCT flow_sort FROM ucap_config_flow WHERE flow_belong_to_app='" + belongToApp + "'";
		try {
			Object[][] rs = JDBCTool.doSQLQuery(jndi, sql, new Object[0]);
			for(int i = 1;i < rs.length;i++) {
				String flowSort = (String)rs[i][0];
				JSONObject js = new JSONObject();
				js.put("text", flowSort);
				String subSql = "SELECT flow_unid,flow_name FROM ucap_config_flow WHERE flow_belong_to_app='" + belongToApp + "' AND flow_sort='" + flowSort + "'";
				Object[][] subRs = JDBCTool.doSQLQuery(jndi, subSql, new Object[0]);
				JSONArray childrens = new JSONArray();
				for(int j = 1;j < subRs.length;j++) {
					String id = (String)subRs[j][0];
					String text = (String)subRs[j][1];
					JSONObject subJs = new JSONObject();
					subJs.put("id", id);
					subJs.put("text", text);
					childrens.add(subJs);
				}
				js.put("children", childrens);
				jarray.add(js);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return jarray.toString();
	}
	public  String getModuleLeafComboTree(String nameExp,String belongToApp) {
		JSONArray jarray = new JSONArray();
		String sqlModule = "select module_unid,t.module_display_name,t.module_childrens from ucap_module t where t.module_belong_to_app='"+belongToApp+"'";
		try {
			Object[][] rs = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sqlModule, new Object[0]);
			for(int i = 1;i < rs.length;i++) {
				String childrens = (String)rs[i][2];
				String[] childIds = StringUtils.split(childrens,",");
				for(String key : childIds) {
					jarray.addAll(filterModuleLeaf(key, nameExp));
				}
			}
		} catch (SQLException e) {
		}
		return jarray.toString();
	}
	private JSONArray  filterModuleLeaf(String key,String name) {
		JSONArray jarray = new JSONArray();
		ModuleLeaf  leaf = new ModuleLeafManager().doFindBeanByKey(key);
		if(null != leaf) {
			if(StringUtils.contains(leaf.getLeaf_name(),"")) {
				JSONObject js = new JSONObject();
				js.put("id", leaf.getLeaf_unid());
				js.put("text", leaf.getLeaf_name());
				jarray.add(js);
			}
			if(StringUtils.isNotEmpty(leaf.getLeaf_childrens())) {
				String[] leafUnids = leaf.getLeaf_childrens().split(",");
				for(String unid : leafUnids){
					jarray.addAll(this.filterModuleLeaf(unid, name));
				}
			}
		}
		return jarray;
	}%>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	DateTime dt = new DateTime();
	
	Doctype doctype = new DoctypeManager().doFindBeanByKey(unid);
	//Sequence sequence = new SequenceManager().doFindBeanByKey(unid);
	CoreSequence sequence = new CoreSequenceManager().doFindBeanByKey(unid);
	//DwSequence dwSequence = new DwSequenceManager().doFindBeanByKey(unid);
	CoreCoreSequence dwSequence = new CoreCoreSequenceManager().doFindBeanByKey(unid);
	if (null == doctype) {
		fn = "add";
		doctype = new Doctype();
		doctype.setUnid(new UNIDGenerate().getUnid());
		doctype.setOpertime(dt.getNowTime());
		
		//sequence = new Sequence();
		sequence = new CoreSequence();
		//dwSequence = new DwSequence();
		dwSequence = new CoreCoreSequence();
	} else {
		
	}
	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	App app = ucapSession.getApp();
	String appId = app.getUnid();
	//模块选择树
	String moduleJson = getModuleLeafComboTree("新建",app.getUnid());
	//流程选择
	String flowJson = getFlowComboTree(appId,appId);
	
	request.setAttribute("doctype", doctype);
	request.setAttribute("sequence",sequence);
	request.setAttribute("dwSequence",dwSequence);
	request.setAttribute("path", request.getContextPath());
	request.setAttribute("dt",dt);
	request.setAttribute("moduleJson",moduleJson);
	request.setAttribute("flowJson",flowJson);
%>

<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/core/js/easyui/themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/core/js/easyui/themes/icon.css"/>
	<script type="text/javascript" src="${path}/core/js/json2.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
	 <table width="100%">  
		<tr>
			<td valign="top" height="100%">
				<div class="easyui-tabs" id="tt" fit="true" style="width:100px;height:510px;">
				    <div title="基本信息" style="padding:5px;background: #DEECFD;">
				    	<%@ include file="doctype_edit_baseinfo.jsp"%>
					</div>	
					<div title="模板管理" style="padding:5px;background: #DEECFD;">
				    	<%@ include file="doctype_edit_template.jsp"%>
					</div>	
			    </div> 	
			</td>
		</tr>
	  </table>
	</div>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		
		//流水号是否可重复
		check("sequenceForm","canrepeat","${sequence.canrepeat}");
		//流水号自动调整编号
		check("sequenceForm","autoadjust","${sequence.autoadjust}");
		//流水号启用重新编号
		check("sequenceForm","refreshsequence","${sequence.refreshsequence}");
		
		//文件字是否可重复
		check("dwsequenceForm","canrepeat","${sequence.canrepeat}");
		//文件字自动调整编号
		check("dwsequenceForm","autoadjust","${sequence.autoadjust}");
		//文件字启用重新编号
		check("dwsequenceForm","refreshsequence","${sequence.refreshsequence}");
	});
	$.parser.onComplete = function(){
		//$("#tt").css("visibility","visible");
	}
	function check(formId,name,value) {
		$("#" + formId).find("input[name='" + name + "'][value='" + value + "']").attr("checked","true");
		$("#" + formId).find("input[name='" + name + "'][value!='" + value + "']").removeAttr("checked");
	}
	//保存表单信息
	function doSave(){
		if(validate.validate() && validateSequence.validate() && validateDwsequence.validate()){
			$("#jspForm").ajaxSubmit({
				method : "post",
				dataType:'json',
				data : {
					sequence : JSON.stringify($("#sequenceForm").serializeSingleForm()),
					dwSequence : JSON.stringify($("#dwsequenceForm").serializeSingleForm()),
					attrs : JSON.stringify($("#uploadForm").serializeMultiForm())
				},
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
						location.href="?unid=" + data.unid;
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
					//top.lwin.close(true);
				}
			});
		}
	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close(true);
	}

	//表单验证
	var validate = new Validation('jspForm', {
    	immediate: true,
	    validators: {
	      	name : 'required'
	    },
	    messages:{
	    	name:'请填写[文件类型名称]'
	    }
  	});	
  	var validateSequence = new Validation('sequenceForm', { 
    	immediate: true,
	    validators: {
	      	initnumber : ['integer','required'],
	      	numbercount: ['integer','required']
	    },
	    messages:{
	    	initnumber : ['必须是数字','请填写[初始值]'],
	    	numbercount: ['必须是数字','请填写[位数]']
	    }
  	});	
  	var validateDwsequence = new Validation('dwsequenceForm', { 
    	immediate: true,
	    validators: {
	      	initnumber : ['integer','required'],
	      	numbercount: ['integer','required']
	    },
	    messages:{
	    	initnumber : ['必须是数字','请填写[初始值]'],
	    	numbercount: ['必须是数字','请填写[位数]']
	    }
  	});	
  	jQuery(function(){
      	//模块选择框
      	$('#module').combotree('loadData', ${moduleJson});
	    $('#module').combotree({
	        onSelect:function(node){
	          $('#moduleid').attr("value",node.id);
			  $('#module').attr("value",node.text);
			  $('#moduleName').attr("value",node.text);
	        }
	    });
	    $("#module").combotree('setValue','${doctype.module}');
      	//流程选择框
      	$('#flow').combotree('loadData', ${flowJson});
	    $('#flow').combotree({
	        onSelect:function(node){
	          $('#flowid').attr("value",node.id);
			  $('#flow').attr("value",node.text);
			  $('#flowName').attr("value",node.text);
	        }
	    });
	    $("#flow").combotree('setValue','${doctype.flow}');
	})
	function doSelect(type,hideId,disId) {
		//文件字选择
		if(type == 0) {
			var url = "${path}/core/doctype/docword_select.jsp";		
		}
		var returnValue  =window.showModalDialog(url,0, "dialogHeight=480px;dialogWidth=500px;center=y;resizable=1;status=0;scroll=1;");
		if(null!=returnValue){
			var result =returnValue.split(";");
			jQuery("#" + hideId).val(result[0]);
        	jQuery("#" + disId).val(result[1]);
        }
	}
</script> 
</body>
</html>