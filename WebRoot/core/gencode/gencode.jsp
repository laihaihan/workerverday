<%@ page language="java" pageEncoding="utf-8"%>
<%@	page import="com.linewell.core.gencode.GenCodeManagerOracle"%>
<%@	page import="com.linewell.core.util.ProxoolUtil"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="java.sql.SQLException"%>
<%@include file="/core/params.jsp" %>

<HTML>
<head>
	${import_jquery}
	${import_easyui}
	${import_theme}
</head>
<body>
	<div id="form_content">
		<form id="jspForm" name=jspForm method="post" action="${path}/GenCode.action" >
		<input type="hidden" name="fn" value="gencode">
		<table width="100%" class="form_table" align="center">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>连接池：</th>
				<td align="left" colspan="3">
					<select id="jndiName" name="jndiName" style="font-size:12px;">
					    <%--<OPTION value="core" sysAlias='core'>--核心平台--</OPTION>--%>
						<%
							Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
											String appUnid = null != ucapSession ? ucapSession.getApp().getUnid() : "";
											Object[][] rs = getUcapApp();
											for(int i = 1 ; i <rs.length ; i ++){
												boolean isJndiExists = ProxoolUtil.checkJndi(rs[i][0].toString());
												String text = rs[i][1] + (isJndiExists ? "" : "(未配置连接池)"); 
												String style = isJndiExists ? "" : "style='color:#ff0000'";
												String selected = appUnid.equals(rs[i][0]) ? "selected" : "";
												out.print("<option value='"+rs[i][0]+"' "+style+" "+selected+" sysAlias='"+rs[i][2]+"'>--"+text+"--</option>");
											}
						%>
				    </select>
				</td>
			</tr>
			<tr>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>表名：</th>
				<td align="left">
					<input name="sp_table" type="text" id="sp_table" readonly value="" size="58">
					<input type="button" class="btnOnlyChannel" id="btntablename">
				</td>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>主键：</th>
				<td align="left">
					<select id="keyword" name="keyword" style="font-size:12px;" onclick="onClickKeyWork();">
						<option value="">--请选择主键--</option>
				    </select>
				</td> 
			</tr>
			<tr>
				<th height="26" align="right" nowrap>模块名称：</th>
				<td align="left">
					<input type="text" name="moduleName" id="moduleName" value="" size="58"/>
				</td> 
				<th height="26" align="right" nowrap>所属显示模块(二级模块)：</th>
				<td align="left">
					<input type="text" name="parentModuleName" id="parentModuleName" value="" size="50"/>&nbsp;
					<input type="hidden" name="parentModuleID" id="parentModuleID" value=""/>&nbsp;
					<input type="button" class="btnOnlyChannel"  id="btnmodulename">
				</td>
			</tr>
			<tr>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>JAVA类名：</th>
				<td align="left">
					<input type="text" id="className" name="className" size="58" style="font-size:12px " value="">
				</td>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>JAVA包路径：</th>
				<td align="left">
					<input type="text" id="jarPath" name="jarPath" size="50" style="font-size:12px " value="com.linewell">
				</td>
			</tr>
			<tr>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>JAVA源码包：</th>
				<td colspan="1" align="left">
					<select name="sourcename" id="sourcename">
					    <%--<OPTION value="core">core</OPTION>--%>
						<%
							String appAlias = null != ucapSession ? ucapSession.getApp().getNameEn() : "";
							for(int i = 1 ; i <rs.length ; i ++){
								if(null == rs[i][2] || null == rs[i][2].toString().trim()) continue;
								String selected = appAlias.equals(rs[i][2]) ? "selected" : "";
								out.print("<option value='"+rs[i][2]+"' "+selected+">"+rs[i][2]+"</option>");
							}
						%>
					</select>
				</td>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>JAVA模板：</th>
				<td colspan="1" align="left">
					<input type='checkbox' name='javaTemplate' value='Bean.vm' CHECKED>Bean.vm&nbsp;
					<input type='checkbox' name='javaTemplate' value='Action.vm' CHECKED>Action.vm&nbsp;
					<input type='checkbox' name='javaTemplate' value='Manager.vm' CHECKED>Manager.vm&nbsp;&nbsp;
				</td>
			</tr>
			<tr>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>JSP相对路径：</th>
				<td align="left">
					<input type="text" id="jspPath" name="jspPath" size="58" style="font-size:12px " value="dwmanager/jsp/projinfo/"/>
				</td>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>Jsp模板：</th>
				<td align="left">
					<input type='checkbox' name='jspTemplate' value='Edit.vm' CHECKED>Edit.vm&nbsp;&nbsp;
				</td>
			</tr>
			<tr>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>创建者：</th>
				<td align="left">
					<input type="text" id="creater" name="creater" size="58" style="font-size:12px " value="zjianhui"/>
				</td>
				<th height="26" align="right" nowrap><font color="#ff0000">*</font>创建者EMAIL：</th>
				<td align="left">
					<input type="text" id="createrEmail" name="createrEmail" size="50" style="font-size:12px " value="zjianhui@linewell.com"/>
				</td>
			</tr>
			<tr>
				<th> 生成视图模块相关数据：</th>
				<td align="left" colspan="3">
					<input type="radio" name="gendata" id="gendata" value="Y" >是&nbsp;&nbsp;
					<input type="radio" name="gendata" id="gendata" value="N" checked>否 
				</td>
			</tr>
			<tr>
				<td colspan="4" align="center" style="height:50px">
					<a id='genbtn' class="easyui-linkbutton stepover" iconCls="icon-save">生成配置</a>
				</td>
			</tr>
		</table>
		</form>
	</div>
	<script type="text/javascript">
	$(function(){
		//事件绑定部分
		$('#btntablename').bind('click',function(){
			var jndiName = $("#jndiName").val();
			if(jndiName==""){
				top.$.messager.alert("信息提示","请选择系统连接池","info");
				return ;
			}
			var isJndiExists = $("#jndiName option:selected").text().indexOf("未配置连接池") < 0;
			if(!isJndiExists){
				top.$.messager.alert("信息提示","当前系统未配置连接池，请在proxool.xml文件中进行配置！","info");
				return;
			}
			var selectTable = $("#sp_table").val();
			top.lwin.open("GenCode.action?jndiName="+jndiName+"&selectTable="+selectTable+"&fn=showAllTable","选择表",520,450);
		});
		
		$('#btnmodulename').bind('click',function(){
			var jndiName = $("#jndiName").val();
			top.lwin.open("/core/gencode/moduleTree.jsp?belongToApp="+jndiName,"选择所属模块",300,450);
		});
		
		$("#jndiName").bind('change',function(){
			var sysAlias = $("#jndiName option:selected").attr("sysAlias");
			$("#sourcename option[value='"+sysAlias+"']").attr("selected",true);
		});
		
		$('#genbtn').bind('click',function(){
			onConfirm();
		});
	});
	
	/**
	 * 点击选择主键时
	*/
	function onClickKeyWork(){
		var sp_table = $("#sp_table").val();
		if(sp_table==""){
			top.$.messager.alert("信息提示","请选择表名","info");
			return;
		}
	}
	
    //表单验证
	function checkform() {
		if($("#sp_table").val() == ''){
			top.$.messager.alert("信息提示","请选择表名","info");
			return false;
		}
		if($("#keyword").val() == ''){
			top.$.messager.alert("信息提示","请选择主键","info");
			return false;
		}
		if($('input:radio[name="gendata"]:checked').val() == "Y"){
			if($("#moduleName").val() == ''){
				top.$.messager.alert("信息提示","您选择了生成模块视图数据，请填写模块名称。","info");
				return false;
			}
			if($("#parentModuleName").val() == ''){
				top.$.messager.alert("信息提示","您选择了生成模块视图数据，请选择所属显示模块(二级模块)。","info");
				return false;
			}
		}
		
		return true;
	}
    
    //表单提交
	function onConfirm(){
		if(checkform()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.alert("信息提示","操作失败","error");
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('操作提示','<br/><br/>代码生成成功。<br/>1、代码生成成功，请配置struts。<br/>2、若有生成视图模块数据则需要重启动tomcat以便生效。','info');
					}else{
						top.lwin.alert("信息提示","操作失败","error");
					}
					top.lwin.close(true);
				}
			});
        }
     }
	</script>
</body>
</html>
<%!
public  Object[][] getUcapApp(){
	String sql = "select t.app_unid,t.app_name,t.app_name_en from ucap_app t where t.app_unid<>'475C4D7E257F5EAF7CCDF46AE0FE35BD'";
	Object[][] rs = new Object[0][0];
	try {
		rs = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,sql,new Object[0]);
	} catch (SQLException e) {
		e.printStackTrace();
	}
	return rs;
}
%>