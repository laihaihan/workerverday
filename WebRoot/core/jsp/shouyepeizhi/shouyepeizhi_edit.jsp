<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.shouyepeizhi.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@page import="com.linewell.util.StringBase"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@page import="java.net.URLDecoder"%>
<%@include file="/core/params.jsp"%>
<%
    String fn = "update";
    String unid = request.getParameter("unid");
    String roleId = request.getParameter("roleId");
    String roleName = request.getParameter("roleName");
    if(!StringBase.nullOrEmpty(roleName)){
        roleName = URLDecoder.decode(roleName,"UTF-8");
    }
    String appUnid = request.getParameter("APP_UNID");
	if(StrUtil.isNull(appUnid)){
		appUnid = uSession.getApp().getUnid();
	}

    Shouyepeizhi shouyepeizhi = new ShouyepeizhiBusiness().doFindBeanByKey(unid);
    if (null == shouyepeizhi) {
        fn = "add";
        shouyepeizhi = new Shouyepeizhi();
        shouyepeizhi.setUnid(new UNIDGenerate().getUnid());
        shouyepeizhi.setBelong_to_roles(roleId);
        shouyepeizhi.setBelong_to_rolesname(roleName);
        shouyepeizhi.setBelong_to_apps(appUnid);
    }

    request.setAttribute("shouyepeizhi", shouyepeizhi);
    request.setAttribute("path", request.getContextPath());
%>

<html>
	<head>
		${import_theme} ${import_jquery} ${import_validation}
	</head>
	<body>
		<div id="form_content">
			<div id="form_toolbar">
				<button class="form_btn" id="btnSave">
					<img src="${path}/core/themes/default/images/admin/default_btn.gif">
					保存
				</button>
				<button class="form_btn" id="btnClose">
					<img src="${path}/core/themes/default/images/admin/default_btn.gif">
					关闭
				</button>
			</div>
			<div>
				<form id="jspForm" name="jspForm" method="post" action="${path}/shouyepeizhi.action">
					<input type="hidden" id="fn" name="fn" value="<%=fn%>">
					<input type="hidden" name="unid" id="unid" value="<%=shouyepeizhi.getUnid()%>">
					<input type="hidden" name="shouyepeizhi[]belong_to_apps" id="shouyepeizhi[]belong_to_apps" value="<%=shouyepeizhi.getBelong_to_apps()%>">
					<table width="98%" align="center" class="form_table">
						<col width="10%" align="right">
						<col width="35%" align="left">
						<tr>
							<th height="26" align=right>
								<font color='red'>*</font>标题：
							</th>
							<td align="left">
								<input style='width: 90%' type='text' name='shouyepeizhi[]title' id='shouyepeizhi[]title' value='${shouyepeizhi.title}' />
							</td>
						</tr>
						<tr>
							<th height="26" align=right>
								<font color='red'>*</font>来源类型：
							</th>
							<td align="left">
								<input type="radio" name="shouyepeizhi[]source_type" class="source_type" value="01" ${shouyepeizhi.source_type == '01' ? "checked" : ""}>URL&nbsp;&nbsp;
								<input type="radio" name="shouyepeizhi[]source_type" class="source_type" value="02" ${shouyepeizhi.source_type == '02' ? "checked" : ""}>视图
							</td>
						</tr>
						<tr>
							<th height="26" align=right>
								<font color='red'>*</font>来源内容：
							</th>
							<td align="left">
									<input style='width: 90%' type='text' name='shouyepeizhi[]source' id='shouyepeizhi[]source' value='${shouyepeizhi.source}' />
									<input style='width: 90%' type='hidden' name='shouyepeizhi[]view_column' id='shouyepeizhi[]view_column' value='${shouyepeizhi.view_column}' />
									<input style="display:none;" type="button" class="btnOnlyChannel"  id="btnsource"/>
							</td>
						</tr>
						<tr>
							<th height="26" align=right>
								<font color='red'>*</font>高度
							</th>
							<td align="left">
									<input type='text' name='shouyepeizhi[]height' id='shouyepeizhi[]height' value='${shouyepeizhi.height}' /><font color='red'>（像素）</font>
							</td>
						</tr>
						<tr>
							<th height="26" align=right>
								<font color='red'>*</font>记录数
							</th>
							<td align="left">
									<input type='text' name='shouyepeizhi[]recordnum' id='shouyepeizhi[]recordnum' value='${shouyepeizhi.recordnum}' />
							</td>
						</tr>
						<tr>
							<th height="26" align=right>
								<font color='red'>*</font>位置
							</th>
							<td align="left">
								<input type="radio" name="shouyepeizhi[]position"  value="left" ${"checked"}>左&nbsp;&nbsp;
								<input type="radio" name="shouyepeizhi[]position"  value="center" ${shouyepeizhi.position == 'center' ? "checked" : ""}>中&nbsp;&nbsp;
								<input type="radio" name="shouyepeizhi[]position"  value="right" ${shouyepeizhi.position == 'right' ? "checked" : ""}>右&nbsp;&nbsp; <font size="16px;" color="red">(目前只支持三列,布局为1：2：1)</font>
							</td>
						</tr>
						<tr>
							<th height="26" align=right>
								<font color='red'>*</font>角色：
							</th>
							<td align="left">
								<input type="hidden" style='width: 90%' name='shouyepeizhi[]belong_to_roles' id='belong_to_roles' value="${shouyepeizhi.belong_to_roles}"/>
								<textarea rows="2" style='width: 90%' name='shouyepeizhi[]belong_to_rolesname' id='belong_to_rolesname' readonly="readonly">${shouyepeizhi.belong_to_rolesname}</textarea>
							</td>
						</tr>
						<!--							
							<input type="hidden" style='width: 90%' name='shouyepeizhi[]belong_to_roles' id='belong_to_roles' value="${shouyepeizhi.belong_to_roles}"/>
							<textarea rows="2" style='width: 90%' name='shouyepeizhi[]belong_to_rolesname' id='belong_to_rolesname' readonly="readonly">${shouyepeizhi.belong_to_rolesname}</textarea>
							<input type="button" class="btnOnlyChannel"  id="btnrolesname">
						-->
						<!--    				
						<tr>
							<th height="26" align=right>
								<font color='red'>*</font>所属应用系统：
							</th>
							<td colspan='3'>
								<input style='width: 90%' type='text' name='shouyepeizhi[]belong_to_apps' id='shouyepeizhi[]belong_to_apps' value='${shouyepeizhi.belong_to_apps}' />
							</td>
						</tr>
						-->
					</table>

				</form>
			</div>
		</div>
		<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		$("#btnrolesname").bind("click",selTable);
		$("#btnsource").bind("click",openView);
		$(".source_type").bind('change',function(){
			showButton();
		});
		showButton();
	});
	//显示按钮
	function showButton(){
		var ckValue = $('input:radio[name="shouyepeizhi\\[\\]source_type"]:checked').val();
		if(ckValue == '02'){
			$('#btnsource').show();
		}else if(ckValue == '01'){
			$('#btnsource').hide();
		}
	}
	//角色选择框
	function selTable(){
		var jndiName = "<%=uSession.getApp().getUnid()%>";
		var selectRolesname = $("#belong_to_rolesname").val();
		top.lwin.open("shouyepeizhi.action?jndiName="+jndiName+"&selectRolesname="+encodeURIComponent(encodeURIComponent(selectRolesname))+"&fn=showAllRole","选择角色",520,450);
	}
	//视图选择框
	function selView(){
		var obj = new Object(); 
		window.showModalDialog('${path}/core/view/cfg/choose_view.jsp?_rand'+Math.random(),obj,'dialogWidth=800px;dialogHeight=495px');
		if(obj.unid){
			$('#shouyepeizhi\\[\\]source').val("view.action?fn=portlet&viewId="+obj.unid);
		}
	}
	//打开视图
	function openView(){
		var viewId = $('#shouyepeizhi\\[\\]source').val();
		viewId = viewId.substring(viewId.lastIndexOf("=")+1,viewId.length);//
		var columnList = $('#shouyepeizhi\\[\\]view_column').val();
		top.lwin.showModalDialog("core/jsp/shouyepeizhi/choose.jsp?viewId="+viewId+"&columns="+columnList,"选择视图",680,450);
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
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
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