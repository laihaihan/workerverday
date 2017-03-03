<%@ page language="java" pageEncoding="utf-8"%>
<%@ page import="com.linewell.core.gencode.GenCodeManagerOracle"%>
<%@	page import="com.linewell.core.util.ProxoolUtil"%>
<!-- 网闸同步配置 -->
<%
	request.setAttribute("path",request.getContextPath());
%>
<HTML>
<head>
	<%@include file="/core/params.jsp" %>
	${import_jquery}
	${import_validation}
	${import_easyui}
	${import_theme}
</head>
<body>
	<form id="jspForm" name="jspForm" method="post" action="${path}/NetBrakeSync.action" >
		<input type="hidden" name="fn" value="gen">
		<div align="center"><font color="red">每次要重新生成配置时，要把之前生成的临时表，触发器，储存过程手动删除干净</font></div>
		<div>
			<table width="98%" class="form_table_ext" align="center">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<tr>
					<th style="height:30px" colspan="4" align="center" style="color:red">导出的相关设置</th>
				</tr>
				<tr>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>连接池：
					</th>
					<td align="left" colspan="3">
						<select id="jndiName" name="jndiName" style="font-size:12px;">
							<%
								Object[][] rs = GenCodeManagerOracle.getUcapApp();
												for(int i = 1 ; i <rs.length ; i ++){boolean isJndiExists = ProxoolUtil.checkJndi(rs[i][0].toString());
													String text = rs[i][1] + (isJndiExists ? "" : "(未配置连接池)"); 
													String style = isJndiExists ? "" : "style='color:#ff0000'";
													String selected = isJndiExists ? "selected" : "";
													out.print("<option value='"+rs[i][0]+"' "+style+" "+selected+">--"+text+"--</option>");
												}
							%>
						    <OPTION value="proxool">--平台设计管理系统（正式，由平台管理员或设计管理员专用--</OPTION>
					    </select>
					</td>
				</tr>
				<tr>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>需要同步的表：
					</th>
					<td align="left" colspan="3">
						<input name="sp_table" type="text" id="sp_table" readonly value="" size="58" title="请选择需要同步的表">
						<input type="button" class="btnOnlyChannel" id="btntablename">
					</td>
				</tr>
				<tr style="display:none">
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>生成文件绝对路径：
					</th>
					<td align="left" colspan="3">
						<input type="text" id="jspPath" name="jspPath" size="58" value=""/><span>&nbsp;&nbsp;例如：E:\</span>
					</td>
				</tr>
				<tr>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>是否要自动执行：
					</th>
					<td align="left" colspan="3">
						<input type="radio" id="isRun" name="isRun" value="true" checked/>是
						<input type="radio" id="isRun" name="isRun" value="false"/>否(选择否需要手工创建临时表和触发器)
					</td>
				</tr>
				<tr>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>表空间：
					</th>
					<td align="left"  colspan="3">
						<input type="text" name="eTablespace" id="eTablespace" style="width:30%">
					</td>
				</tr>
				<tr>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>服务名：
					</th>
					<td align="left"  colspan="3">
						<input type="text" name="eOrcl" id="eOrcl" style="width:30%">
						<span>&nbsp;&nbsp;例如：数据库连接为 http://127.0.0.1:1521:orcl，则该值=orcl</span>
					</td>
				</tr>
				<tr>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>数据库用户名：
					</th>
					<td align="left" >
						<input type="text" name="eUsername" id="eUsername" style="width:75%">
					</td>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>数据库密码：
					</th>
					<td align="left" >
						<input type="text" name="ePassword" id="ePassword" style="width:60%">
					</td>
				</tr>
			</table>
		</div>
		<div>
			<table width="98%" class="form_table_ext" align="center" style="margin-top:30px">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<tr>
					<th style="height:30px" colspan="4" align="center" style="color:red">导入的相关设置</th>
				</tr>
				<tr>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>表空间：
					</th>
					<td align="left"  colspan="3">
						<input type="text" name="iTablespace" id="iTablespace" style="width:30%" >
					</td>
				</tr>
				<tr>
				<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>服务名：
					</th>
					<td align="left"  colspan="3">
						<input type="text" name="iOrcl" id="iOrcl" style="width:30%">
						<span>&nbsp;&nbsp;例如：数据库连接为 http://127.0.0.1:1521:orcl_27，则该值=orcl_27</span>
					</td>
				</tr>
				<tr>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>数据库用户名：
					</th>
					<td align="left" >
						<input type="text" name="iUsername" id="iUsername" style="width:75%" >
					</td>
					<th height="26" align="right" nowrap>
						<font color="#ff0000">*</font>数据库密码：
					</th>
					<td align="left" >
						<input type="text" name="iPassword" id="iPassword" style="width:60%">
					</td>
				</tr>
			</table>
		</div>
		<center style="margin-top:30px">
			<a id='genbtn' class="easyui-linkbutton stepover" iconCls="icon-save">生成配置</a>
		</center>
	</form>
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
				top.lwin.open("NetBrakeSync.action?jndiName="+jndiName+"&selectTable="+selectTable+"&fn=showAllTable","选择表",520,450);
			});
			
			$('#genbtn').bind('click',function(){
				onConfirm();
			});
		});
		
	     //提交选择
	     function checkform() {
			if($("#sp_table").val() == ''){
				top.$.messager.alert("信息提示","请选择表名","info");
				return false;
			}
			
			return true;
	     }
	     
	     function onConfirm(){
	     	if(checkform() && validate.validate()){
	           $("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.lwin.alert("信息提示","操作失败","error");
					},
					success:function(data){
						if(data.result){
							top.lwin.alert('操作提示','配置成功，请确认检查数据库中临时表、触发器、存储过程是否生成成功','info');
						}else{
							top.lwin.alert("信息提示","操作失败","error");
						}
						top.lwin.close(true);
					}
				});
	        }
	    }
	     
	    //表单验证
		var validate = new Validation('jspForm', { 
	    	immediate: true,
		    validators: {
		      	eUsername:'required',
		      	ePassword:'required',
		      	eOrcl:'required',
		      	eTablespace:'required',
		      	iUsername:'required',
		      	iPassword:'required',
		      	iOrcl:'required',
		      	iTablespace:'required'
		    },
		    messages:{
		    	eUsername:'请填写[数据库用户名]',
		    	ePassword:'请填写[数据库密码]',
		    	eOrcl:'请填写[orcl]',
		    	eTablespace:'请填写[表空间]',
		    	iUsername:'请填写[数据库用户名]',
		    	iPassword:'请填写[数据库密码]',
		    	iOrcl:'请填写[orcl]',
		    	iTablespace:'请填写[表空间]'
		    }
	  	});	
	</script>
</body>
</html>