<%@ page language="java" pageEncoding="UTF-8"%>
<form id="sqlForm" name="sqlForm" action="view.action" method="post">
		<input type="hidden" name="fn" value="saveSql">
		<table cellspacing="0" cellpadding="5" border="1" align="center" class="form_table">
		<col width="15%" align="right">
		<col width="85%">
		<tr>
			<th>连接池</th>
			<td>
				<span id="sqltime">
					<input type="text" id="jndi" name="webservice_jndi" value="${empty view.jndi?jndi : view.jndi}" style="width:80%"/>
				</span>
			</td>
		</tr>
		<tr>
			<th>SQL类型：</th>
			<td>
				<!-- 
			<label><input type="radio" value="1" name="viewCustom" ${empty appView.viewCustom?'checked="checked"':'' } ${appView.viewCustom==1?'checked="checked"':''} />配置</label>
			<label><input type="radio" value="2" name="viewCustom" ${appView.viewCustom==2?'checked="checked"':''}/>自定义</label>
			 -->					
			<label><input type="radio" value="2" name="viewCustom" checked="checked"/>自定义</label>
			
		</td>
	</tr>
	<tr>
		<th>SQL默认参数：</th>
		<td>
			系统UNID:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{APP_UNID}"%></span>&nbsp;
			部门UNID:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{DEPT_UNID}"%></span>&nbsp;
			部门名称:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{DEPT_NAME}"%></span><br>
			用户UNID:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{USER_UNID}"%></span>&nbsp;
			用户名称:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{USER_NAME}"%></span>&nbsp;
			用户显示名称:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{USER_DISPLAY_NAME}"%></span><br>
			开始时间:<span style="color:red;" onclick="copyText(this)" title="复制"><%="${BEGINTIME}"%></span>&nbsp;
			结束时间:<span style="color:red;" onclick="copyText(this)" title="复制"><%="${ENDTIME}"%></span>
		</td>
	</tr>
	<tr>
		<th><span class="null">*</span>SQL语句：</th>
		<td>
			<textarea rows="10" style="width:100%" id="sql" name="sql">${view.sql}</textarea>
			<input id ="validateSqlButton" type="button" class="btnChannel" value="验证" onclick="validateSql();" />
		</td>
	</tr>
	<tr>
		<th>参数实现类：</th>
		<td><input type="text" size="60" name="paramsClass" value="${view.paramsClass}"></td>
	</tr>
	</table>
</form>
			
<div style="text-align:center;padding:20px;">
	<a ref="基本信息" href="#"  class="easyui-linkbutton step" iconCls="icon-add">上一步</a>
	<a ref="显示配置" href="#"  class="easyui-linkbutton step" iconCls="icon-add">下一步</a>
</div>
<script type="text/javascript">
	
	//验证sql
	function validateSql(){
		$.ajax({
			url:'view.action',
			type:'post',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				fn:'validateSql',
				jndi:$('#jndi').val(),
				sql:$('#sql').val()
			},
			error:function(){
				top.lwin.errorService();
			},
			success:function(reslut){
				if(reslut.success){
					top.lwin.alert('信息提示','验证成功,使用时间'+reslut.time+'毫秒','info',1500);
				}else{
					top.lwin.alert('信息提示','SQL语句有误','error',1500);
				}
			}
		});
	}
</script>