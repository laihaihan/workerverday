<%--
/**
 * 视图配置向导页
 * @author cyingquan@qq.com
 * @2012-01-16
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.core.view.View"%>
<%@page import="com.linewell.core.view.ViewManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.view.column.Column"%>
<%@page import="com.linewell.core.view.button.ButtonManager"%>
<%@page import="com.linewell.core.view.query.QueryManager"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.core.db.JdbcTool"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<%
	String viewId = request.getParameter("viewId");
	String title = request.getParameter("title");
	//新辅助开发平台中不用应用系统UNID
	String APP_UNID = request.getParameter("APP_UNID");

	ViewManager viewManager = new ViewManager();
	ButtonManager btnManager = new ButtonManager();
	
	View view = viewManager.getView(viewId);
	
	request.setAttribute("view",view);
	request.setAttribute("idColumn",viewManager.getIdColumn(viewId));
	request.setAttribute("columnList",viewManager.getColumnList(viewId));
	request.setAttribute("queryList",QueryManager.getInstance().doFindByViewId(viewId));
	request.setAttribute("btnList",btnManager.getBtnList());
	request.setAttribute("subBtnList",btnManager.getSubBtnList(viewId));
	
	List<Column> columnList = viewManager.getColumnList(viewId);
	
	//获取proxool系统账户
	String[][] appArray = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,"select t.app_unid,t.app_name,t.app_name_en from ucap_app t");
	
	Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
	App app = ucapSession.getApp();
	if(StrUtil.isNull(APP_UNID)){
		APP_UNID = app.getUnid();
	}
	request.setAttribute("jndi",APP_UNID);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
	<title>视图配置</title>
	
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
	${import_jquery}
	${import_easyui}
	${import_autocomplete}	
	${import_validation}
	${import_theme}	
	<script type="text/javascript" src="${corejs}/lw-ui/load.js"></script>
	<script type="text/javascript" src="${corejs}/gb2py.js"></script>
	<script type="text/javascript" src="${corejs}/json2.js"></script>
	<STYLE type="text/css">
		th {
				text-align: center;
			}
	</STYLE>
</head>

<body bgcolor="#ECF2FE">

	<div id="tabs" class="easyui-tabs" fit="true" border="true" style="heigth:500px">
	
		<div title="基本信息" style="overflow: hidden;">
		
			<form id="baseForm" name="baseForm" action="view.action" method="post">
			<table cellspacing="0" cellpadding="0" border="0" align="center" class="form_table">
			<tbody>
			<tr>					
				<td valign="top" style="padding-left: 0px;">						
					
					<input type="hidden" name="fn" value="saveBase">				
					<input type="hidden" name="unid" id="unid" value="${view.unid}">				
					<table cellspacing="0" cellpadding="0" border="0" style="border: 1px solid rgb(255, 255, 255); width: 100%;" class="form_table">
					<col width="17%" align="right" style="background: #fafafa" >
					<col width="33%" align="left">
					<col width="15%" align="right" style="background: #fafafa">
					<col width="35%" align="left">
					<tbody>
					<tr>
						<th>
							<span class="null">*</span>视图名称
						</th>
						<td>
							<input type="text" id="name" name="name" value="${view.name}" style="width:80%" class="required"/>
						</td>
						<th>
							<span class="null">*</span>视图别名
						</th>
						<td>
							<input type="text" id="alias" name="alias" value="${view.alias}" style="width:80%" class="required"/>
						</td>
					</tr>
					<tr>
						<th>
							连接池
						</th>
						<td colspan="3">
							<input type="text" id="jndi" name="jndi" value="${empty view.jndi?jndi : view.jndi}" style="width:80%"/>
						</td>													
					</tr>	
					<tr id="tr_dataClass" style="display:${view.sourceType==3?'':'none'}">
						<th>数据来源类</th>
						<td colspan="3"><input type="text" id="dataClass" name="dataClass" value="${view.dataClass}" style="width:80%"/></td>
					</tr>				
					<tr>												
						<th>
							视图类型
						</th>
						<td>
							<label><input type="radio" value="0" name="type" ${empty view.type?'checked="checked"':''} ${view.type eq '0'?'checked="checked"':''}/>普通列表型</label>
							<label><input type="radio" value="1" name="type" ${view.type eq '1'?'checked="checked"':''}/>树形+列表</label>								
						</td>
						<th  style="display: none;">
							视图展示方式
						</th>
						<td  style="display: none;">
							<label><input type="radio" value="0" name="showType" ${empty view.showType?'checked="checked"':''} ${view.showType eq '0'?'checked="checked"':''}/>Grid</label>
							<!-- <label><input type="radio" value="1" name="showType" ${view.showType eq '1'?'checked="checked"':''}/>TreeGrid</label> -->
							<!--<label><input type="radio" value="1" name="showType" disabled="disabled"/>Table</label>
							 <label><input type="radio" value="2" name="showType" disabled="disabled"/>XSL</label> -->
						</td>
						<th>打开记录页面方式</th>
						<td>
							<label><input type="radio" value="0" name="clickType" ${empty view.clickType?'checked="checked"':''} ${view.clickType eq '0'?'checked="checked"':''}/>单击</label>
							<label><input type="radio" value="1" name="clickType" ${view.clickType eq '1'?'checked="checked"':''}/>双击</label>								
						</td>
					</tr>
					<tr id="treeUrl" style="display:${view.type eq '1'?'block':'none'}">
						<th>树形实现类</th>
						<td colspan="3"><input type="text" id="treeClass" name="treeClass" size="40" value="${view.treeClass}"></td>
					</tr>						
					<tr>
						<th>
							打开表单URL
						</th>
						<td colspan="3">
							<input type="hidden" value="1" id="openType" name="openType">
							<!--<select id="openType" name="openType">				
								<option value="1" ${view.openType==1?'selected="selected"':''} title="eg:/admin/view/cfg/view_cfg.jsp?viewId=系统自动加上记录idField值">表单URL地址</option>	-->	
								<!--<option value="2" ${view.openType==2?'selected="selected"':''}>关联表单</option>
								<option value="3" ${view.openType==3?'selected="selected"':''}>JS方法</option>-->
							<!--</select>-->
							<input type="text" name="openContent" value="${view.openContent}" style="width:92%">&nbsp;<input type="button" value="" style="display:none" class="btnOnlyChannel" onclick="openTable()">
						</td>
					</tr>
					<tr>
						<th>弹出页面宽度</th>
						<td>
							<input type="text" name="width" value="${empty view.width?'680':view.width}" style="width:80%">
						</td>
						<th>弹出页面高度</th>
						<td>
							<input type="text" name="height" value="${empty view.height?'420':view.height}" style="width:80%">
						</td>
					</tr>
					</tbody>						
					</table>											
				</td>
			</tr>
			</tbody>
			</table>
			</form>
			
			<div style="text-align:center;padding:20px;">
				<s:if test="#request.view.unid.length()==32">
					<a href="javascript:copyView('${view.unid}')"  class="easyui-linkbutton" iconCls="icon-add">复制视图</a>
				</s:if>					
				<a ref="SQL语句" href="javascript:"  class="easyui-linkbutton step" iconCls="icon-add">下一步</a>
				<a href="javascript:"  class="easyui-linkbutton stepover" iconCls="icon-save">保存关闭</a>
			</div>
			
		</div>
		
		<div title="SQL语句" style="overflow: hidden;">
			<form id="sqlForm" name="sqlForm" action="view.action" method="post">
			<input type="hidden" name="fn" value="saveSql">
			<input type="hidden" name="isChange" id="isChange">
			<table cellspacing="0" cellpadding="5" border="1" align="center" class="form_table">
			<col width="15%" align="right">
			<col width="85%">
			<tr  style="display: none;">
				<th>执行时间</th>
				<td>
					<span id="sqltime"></span>
				</td>
			</tr>
			<tr  style="display: none;">
				<th>SQL类型</th>
				<td>
					<!-- 
					<label><input type="radio" value="1" name="viewCustom" ${empty appView.viewCustom?'checked="checked"':'' } ${appView.viewCustom==1?'checked="checked"':''} />配置</label>
					<label><input type="radio" value="2" name="viewCustom" ${appView.viewCustom==2?'checked="checked"':''}/>自定义</label>
					 -->					
					<label><input type="radio" value="2" name="viewCustom" checked="checked"/>自定义</label>
					<input onclick="validateSql()" type="button" class="btnChannel" value="验证">
				</td>
			</tr>
			<tr>
				<th>SQL默认参数</th>
				<td>
					系统UNID:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{APP_UNID}"%></span>&nbsp;
					部门UNID:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{DEPT_UNID}"%></span>&nbsp;
					部门名称:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{DEPT_NAME}"%></span><br>
					用户UNID:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{USER_UNID}"%></span>&nbsp;
					用户名称:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{USER_NAME}"%></span>&nbsp;
					用户显示名称:<span style="color:red;" onclick="copyText(this)" title="复制"><%="#{USER_DISPLAY_NAME}"%></span><br>
					开始时间:<span style="color:red;" onclick="copyText(this)" title="复制"><%="${BEGINTIME}"%></span>&nbsp;
					结束时间:<span style="color:red;" onclick="copyText(this)" title="复制"><%="${ENDTIME}"%></span>
					</br>
					--------------------------------------------------------------------------------------------------
					</br>
					应用数据库账户
					<%
						for(int i=1;i<appArray.length;i++){
							String appName = "#{DATA_"+appArray[i][2].toUpperCase()+"}";
					%>
					<span style="color:red;" onclick="copyText(this)" title="<%=appArray[i][1] %> 数据库账户"><%=appName%></span>&nbsp;|
					<%		
						}
					%>
				</td>
			</tr>
			<tr>
				<th>
					<span class="null">*</span>SQL语句<br><br>
					<a href="javascript:void(0);" class="easyui-linkbutton step" iconCls="icon-search" id="openSqlLog" name="openSqlLog">SQL历史记录</a>
				</th>
				<td>
					<textarea rows="8" style="width:100%" id="sql" name="sql">${view.sqlcontent}</textarea>
					<input type="hidden" name="oldSql" id="oldSql" value="${view.sqlcontent}">
				</td>
			</tr>
			<tr>
				<th><span class="null">*</span>SQL语句复杂度</th>
				<td>
					<label><input type="radio" name="sqlType" value="0" ${empty view.sqlType?'checked="checked"':''} ${view.sqlType eq '0'?'checked="checked"':''}>简单（非自定义搜索条件，通过“显示配置”页签的“搜索条件”区域进行选择）</label>
					<label><input type="radio" name="sqlType" value="1"  ${view.sqlType eq '1'?'checked="checked"':''}>复杂（自定义搜索条件，如：UNID LIKE '%\${UNID}%' 格式）</label>
				</td>
			</tr>
			<tr>
				<th>参数实现类</th>
				<td><input type="text" size="60" name="paramsClass" value="${view.paramsClass}"></td>
			</tr>
			</table>
			</form>
			
			<div style="text-align:center;padding:20px;">
				<a ref="基本信息" href="#"  class="easyui-linkbutton step" iconCls="icon-add">上一步</a>
				<a ref="显示配置" href="#"  class="easyui-linkbutton step" iconCls="icon-add">下一步</a>
			</div>
		</div>		
		
		<div title="显示配置">
			<form id="fieldForm" name="fieldForm" action="view.action" method="post">
			<input type="hidden" name="showFooter" id="showFooter" value="${view.showFooter}">
			<input type="hidden" name="fn" value="saveDisplay">			
			<table cellspacing="0" cellpadding="5" border="1" align="center" class="form_table">			
			<tr>
				<th><span class="null">*</span>序号</th>
				<td>
					<label><input type="radio" value="1" name="rownumbers" ${empty view.rownumbers?'checked="checked"':''} ${view.rownumbers==1?'checked="checked"':'' }/>显示</label>
					<label><input type="radio" value="0" name="rownumbers" ${view.rownumbers==0?'checked="checked"':'' }/>隐藏</label>		
				</td>
				<th>记录页面标题</th>
				<td colspan="97">
					<input type="hidden" id="editTitleId" name="editTitleId" value="${view.editTitle}">
					<select id="editTitle" name="editTitle" class="field" style="width:150px;">
						<option value="">请选择</option>
					</select>
				</td>
			</tr>
			<tr>
				<th><span class="null">*</span>选择列</th>
				<td>
					<label><input type="radio" value="0" name="checkbox" ${empty idColumn.hidden?'checked="checked"':'' }${idColumn.hidden==0?'checked="checked"':'' }/>显示</label>
					<label><input type="radio" value="1" name="checkbox" ${idColumn.hidden==1?'checked="checked"':'' }/>隐藏</label>
				</td>
				<th>关联字段</th>
				<td colspan="97">
					<input type="hidden" id="idFieldUnid" name="idFieldUnid" value="<s:property value="#request.idColumn.unid"></s:property>">
					<select id="idField" name="idField" class="field" style="width:150px;">
						<s:if test="#request.idColumn!=null">							
							<option value="<s:property value="#request.idColumn.field"></s:property>"><s:property value="#request.idColumn.field"></s:property></option>
						</s:if>
						<s:else>
							<option value="">请选择</option>
						</s:else>
					</select>
					<label><input type="checkbox" id="displayCN" > 中文字段 </label>	
				</td>
			</tr>
			</table>
			</form>
			
			<table><tr><td></td></tr></table>
			
			<table cellspacing="0" cellpadding="5" border="1" align="center" class="form_table">	
			<tr class="rowField" row="1">
				<td align="right" width="45">
					<a href="javascript:" onclick="rowEdit(this)" title="新建行"><img src="${path}/core/themes/default/images/admin/arrow_desc.gif"></a>&nbsp;&nbsp;
					<a href="javascript:" onclick="fieldEdit(this)" title="新建列"><img src="${corejs}/easyui/themes/icons/add.gif"></a>
				</td>
			<%
				for(int i=0;i<columnList.size();i++){
					Column column = columnList.get(i);
					int sort = column.getSort();
					
					String align = column.getAlign();
					if("2".equals(align)){
						align = "center";						
					}else if("3".equals(align)){
						align = "right";
					}else{
						align = "left";
					}
					
					if(i>0 && (sort%100==0) ){
			%>
			</tr>
			<tr class="rowField" row="<%=sort/100 %>">
				<td align="right" width="45">
					<a href="javascript:" onclick="rowEdit(this)" title="新建行"><img src="${path}/core/themes/default/images/admin/arrow_desc.gif"></a>&nbsp;&nbsp;
					<a href="javascript:" onclick="fieldEdit(this)" title="新建列"><img src="${corejs}/easyui/themes/icons/add.gif"></a>
				</td>
			<%			
					}
			%>
				<td id="<%=column.getUnid()%>" class="<%=column.getUnid()%> column" 
					colspan="<%=column.getColspan()%>" rowspan="<%=column.getRowspan()%>"
					align="<%=align%>">
					<a href="javascript:" onclick="fieldEdit(this)" unid='<%=column.getUnid()%>' title="<%=column.getTitle()%>">&nbsp;<%=column.getTitle()%>&nbsp;</a>
				</td>
			<%		
				}
			%>
			</tr>	
			</table>
		
		
			<div id="mm" class="easyui-menu" style="width:120px;">
				<div onclick="javascript:fieldEdit()">New</div>
			</div>
			
			
			<div id="filed" class="easyui-window" closed="true" modal="true" title="新增字段" style="width:600px;height:300px;">
				<div style="text-align: right;">
					<button class="form_btn" onclick="saveFieldEdit()"><img align="absMiddle" src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
					<button class="form_btn close"><img align="absMiddle" src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
				</div>
				<form id="saveFieldForm" name="saveFieldForm" action="view.action" method="post">
				<input type="hidden" id="fn" name="fn" value="saveField"/>
				<input type="hidden" id="columnUnid" name="columnUnid" />
				<input type="hidden" id="sort" name="sort" />
				<table class="form_table">
				<col width="15%" align="right" style="background: #fafafa"/>
				<col width="35%" align="left"/>
				<col width="15%" align="right" style="background: #fafafa"/>
				<col width="35%" align="left"/>					
				<tr>			
					<th><span class="null">*</span>标题</th>
					<td><input type="text" name="title" id="title"></td>
					<th>宽度(比例)</th>
					<td><input type="text" name="width" id="width" value=""></td>								
				</tr>
				<tr>
					<th>关联字段</th>
					<td>
						<select id="field" name="field" class="field" style="width:150px;">
							<option value="">请选择</option>
							<option value="_null" id="null" style="color:red">多表头</option>
							<option value="_empty" id="empty" style="color:red">空列</option>
						</select>			
					</td>
				</tr>
				<tr>					
					<th>对齐</th>
					<td>
						<select name="align" id="align">
							<option value="1">居左</option>
							<option value="2">居中</option>							
							<option value="3">居右</option>
						</select>
					</td>
					<th>排序</th>
					<td>
						<select name="sortable" id="sortable">
							<option value="1">允许</option>
							<option value="0">不允许</option>
						</select>
					</td>			
					
				</tr>
				<tr>
					<th>列转换函数</th>
					<td><input type="text" id="formatter" name="formatter"></td>					
				</tr>
				<tr>
					<th>合并行</th>
					<td><input type="text" id="rowspan" name="rowspan" value="1"></td>
					<th>合并列</th>
					<td><input type="text" id="colspan" name="colspan" value="1"></td>				
				</tr>
				<tr>
					<th>合并单元格</th>
					<td><input type="checkbox" id="merge" name="merge" value="1"></td>
					<th>尾部统计列</th>
					<td><input type="checkbox" id="footer" name="footer" value="1"></td>				
				</tr>
				</table>
				</form>			
			</div>
			
			<table cellspacing="0" cellpadding="0">
			<tr><td height="5px"></td></tr>
			</table>
			
			<fieldset>
				<legend style="color:gray;cursor:hand" onclick="$('#queryTable').toggle()">+ 搜索配置</legend>
				<form id="queryForm" action="view.action">
				<input type="hidden" name="fn" value="saveQuery"/>
				<table cellspacing="0" cellpadding="5" border="1" align="center" id="queryTable" class="form_table" style="display: ''">
				
				<col width="12%" align="right" style="background: #fafafa"/>
				<col width="10%" align="left"/>
				<col  align="left" style="background: #fafafa"/>
				<col/>
				<col/>
				<col/>
				<tr>
					<td style="width: 2%;" align="center" class="simpleType">
						<a href="javascript:" onclick="addRow()"><img src="${corejs}/easyui/themes/icons/edit_add.png" title="新建行"></a>&nbsp;&nbsp;
					</td>
					<td align="center" style="width: 6%;">
						<!-- <label>是否显示<input type="checkbox" onclick="selectAllSField(this)"></label> -->
						<input type="checkbox" onclick="selectAllSField(this)" title="是否全部显示">
					</td>
					<th class="simpleType" colspan="8" align="center">搜索条件</th>
					<th class="seniorType" colspan="6" align="center">搜索条件</th>
					<!-- <th style="width: 10%;">搜索样式</th>
					<td colspan="7" class="simpleType">
						自定义搜索页面：
						<label><input type="checkbox" name="searchStyle_ck" value="2" ${view.searchStyle=='2' || view.searchStyle=='4'?'checked="checked"':''}>简单</label>
						<label><input type="checkbox" name="searchStyle_ck" value="7" ${view.searchStyle=='7' || view.searchStyle=='4'?'checked="checked"':''}>高级</label>
					</td>
					<td colspan="5" class="seniorType">
						自定义搜索页面：
						<label><input type="checkbox" name="searchStyle_ck" value="2" ${view.searchStyle=='2' || view.searchStyle=='4'?'checked="checked"':''}>简单</label>
						<label><input type="checkbox" name="searchStyle_ck" value="7" ${view.searchStyle=='7' || view.searchStyle=='4'?'checked="checked"':''}>高级</label>
					</td>
					 -->
				</tr>
				<tr style="display:none" id="sTrTmp" class="query">
					<td style="width: 2%;" align="center" class="simpleType">
						<a href="javascript:" onclick="delRow(this)"><img src="${corejs}/easyui/themes/icons/cancel.png" title="移除行"></a>&nbsp;&nbsp;
					</td>
					<td align="center" style="width: 6%;">
						<a onclick="moveQueryUp(this)" href="javascript:"><img src="${path}/uistyle/style_1/ucapimages/arrow_asc.gif" title="上移"></a>
						<input type="checkbox" name="field" title="是否显示">
					</td>
					<th class="simpleType">条件字段</th>
					<td class="simpleType">
						<select id="dispalyFieldQuery" name="dispalyFieldQuery" style="width:120px;" onchange="changeSelect(this);">
							<option value="">请选择</option>
						</select>
					</td>
					<th style="width: 10%;">显示名称
						<div class="seniorType">
							(<span></span>)
						</div>
					</th>
					<td>
						<input type="text" name="name" style="width:120px;">
					</td>
					<th style="width: 10%;">
						显示类型
					</th>
					<td>
						<select name="displayType" onchange="changeDisplayType(this)" style="width:120px" onclick="selectClick(this);">
							<option value="1">文本框</option>
							<option value="2">单选框</option>
							<option value="5">复选框</option>
							<option value="3">下拉框</option>
							<option value="4">日期选择框</option>
						</select>
						<div style="display:none">
							<input type="text" name="dicUnid">
							<input type="button"  value="字典" class="btnChannel" onclick="changeDic(this)">
						</div>
					</td>
					<th style="width: 7%;">
						显示在
					</th>
					<td>
						<input type="hidden" name="displaySimple"/>
						<label><input type="checkbox" name="displaySimple_ck" value="2" class="displaySimple">简单</label>
						<label><input type="checkbox" name="displaySimple_ck" value="0" class="displaySimple">高级</label>
					</td>
				</tr>
				<s:if test="#request.queryList.size()>0">
				<s:iterator value="#request.queryList" id="query">
				<tr class="query">
					<td style="width: 2%;" align="center" class="simpleType">
						<a href="javascript:" onclick="delQueryCondition(this, '${query.unid}')"><img src="${corejs}/easyui/themes/icons/cancel.png" title="移除行"></a>&nbsp;&nbsp;
					</td>
					<td style="width: 6%;" align="center">
						<a onclick="moveQueryUp(this)" href="javascript:"><img src="${path}/uistyle/style_1/ucapimages/arrow_asc.gif" title="上移"></a>
						<input type="checkbox" name="field" value="${query.field}" checked="checked" title="是否显示">
					</td>
					<th class="simpleType">条件字段</th>
					<td class="simpleType">
						<select id="dispalyFieldQuery" name="dispalyFieldQuery" style="width:120px;" onchange="changeSelect(this);">
							<option value="">请选择</option>
						</select>
					</td>
					<th style="width: 10%;">显示名称
						<div class="seniorType">
							(<span>${query.field}</span>)
						</div>
					</th>
					<td>
						<input type="text" name="${query.field}_name" value="${query.name}" style="width:120px;">
					</td>
					<th style="width: 10%;">
						显示类型	
					</th>
					<td>
						<select name="${query.field}_displayType" onchange="changeDisplayType(this)" style="width:120px;" onclick="selectClick(this);">
							<option value="1" ${query.displayType==1?'selected="selected"':''}>文本框</option>
							<option value="2" ${query.displayType==2?'selected="selected"':''}>单选框</option>
							<option value="5" ${query.displayType==5?'selected="selected"':''}>复选框</option>
							<option value="3" ${query.displayType==3?'selected="selected"':''}>下拉框</option>
							<option value="4" ${query.displayType==4?'selected="selected"':''}>日期选择框</option>
						</select>
						<div style="display:${query.displayType==2||query.displayType==3||query.displayType==5  ?'inline':'none'}">
							<input type="text" name="${query.field}_dicUnid" value="${query.dicUnid}">
							<input type="button"  value="字典" class="btnChannel" onclick="changeDic(this)">
						</div>
					</td>
					<th style="width: 7%;">
						显示在
					</th>
					<td>
						<input type="hidden" name="${query.field}_displaySimple" value="${query.displaySimple}" />
						<label><input type="checkbox" name="${query.field}_displaySimple_ck" value="2" ${query.displaySimple==2?'checked="checked"':''}${query.displaySimple==1?'checked="checked"':''} class="displaySimple">简单</label>
						<label><input type="checkbox" name="${query.field}_displaySimple_ck" value="0" ${query.displaySimple==0?'checked="checked"':''}${query.displaySimple==1?'checked="checked"':''} class="displaySimple">高级</label>
					</td>
				</tr>
				</s:iterator>				
				</s:if>			
				</table>
				</form>
			</fieldset>
			
			<div style="text-align:center;padding:20px;">
				<a ref="SQL语句" href="#"  class="easyui-linkbutton step" iconCls="icon-add">上一步</a>
				<a ref="按钮配置" href="#"  class="easyui-linkbutton step" iconCls="icon-add">下一步</a>
			</div>		
		</div>		
		
		<div title="按钮配置">
			<table width="100%" cellspacing="0" cellpadding="0" border="1" align="center" class="form_table">
			<col width="180px">
			<col align="center">
			<col width="180px">
			<col align="center">
			<col valign="top">
			<tbody>
			<!-- <tr>
				<td style="border-right:0px;" colspan="2">搜索:<input type="text" id='tags' /></td>
			</tr> -->
			<tr>
				<!--<td>
					<select id="buttonList" style="width: 180px;" size="21" name="buttonList">
						<s:iterator value="#request.btnList" id="btn">
							<option value="${btn.BUTTON_UNID}" 
									title="${btn.BUTTON_NAME}"
									btnUnid="${btn.BUTTON_UNID}" 
									btnName="${btn.BUTTON_NAME}"
									btnFn="${btn.BUTTON_FN }" 
									subUnid = ""
									subName = ""
									subImg = ""
									
									<s:if test="#btn.BUTTON_FN=='gAdd'">
									style='color:green'
									</s:if>
									<s:elseif test="#btn.BUTTON_FN=='gDel'">
									style='color:red'
									</s:elseif>
									
									>${btn.BUTTON_NAME}</option>		
						</s:iterator>									
					</select>
				</td>
				<td>
					<ul>
						<li>
							<input type="button" value="添加" id="buttonAdd" class="btnChannel" name="btnadd">
						</li>
						<li>&nbsp;</li>
						<li>
							<input type="button" value="删除" id="buttonDel" class="btnChannel" name="btndel">
						</li>
						<li>&nbsp;</li>
						<li>
							<input type="button" value="权限" id="btnLimits" class="btnChannel" name="btndel">
						</li>
					</ul>
				</td>-->
				<th>已选按钮<br>列表</th>
				<td style="width: 25%;">
					<select id="subbuttonList" style="width: 100%; font-size:15;overflow: auto;" size="12" name="subbuttonList">
						<s:iterator value="#request.subBtnList" id="btn">
							<option value="${btn.BUTTON_UNID}" 
									title="${btn.SUB_NAME}" 
									btnUnid="${btn.BUTTON_UNID}" 
									btnName="${btn.BUTTON_NAME}"
									btnFn="${btn.BUTTON_FN }" 
									subUnid="${btn.SUB_UNID}"
									subImg="${btn.SUB_IMG }" 
									subName="${btn.SUB_NAME}"
									subSort="${btn.SUB_SORT}"
									fnPath="${btn.FN_PATH}"
									>${btn.BUTTON_NAME}</option>		
						</s:iterator>
					</select>
				</td>
				<td style="width: 5%; text-align: center;"> 
					<a onclick="moveBtn('up')" href="javascript:"><img title="上移" src="${path}/uistyle/style_1/ucapimages/arrow_asc.gif"></a>
					<br>
					<br>
					<a onclick="moveBtn('down')" href="javascript:"><img title="下移" src="${path}/uistyle/style_1/ucapimages/arrow_desc.gif"></a>
				</td>
				<td style="width: 60%;" valign="top">
					<form id="btnForm" name="btnForm" action="view.action" method="post">
					<input type="hidden" id="subSort" name="subSort"/>
					<table cellspacing="0" cellpadding="0" border="0" class="tableSet">
					<tbody>
					<col width="80px;" align="right">
					<col align="left">
					<tr>
						<th>
							<span class="null">*</span>按钮名称
						</th>
						<td colspan="3">
							<input type="text"  size="38" id="btnName" name="btnName" class="inputred">
							<input type="hidden" name="btnUnid" id="btnUnid" size="20"><!--<span style="color:red">通用的按钮选择名称</span>-->
							<input type="button" value="按钮选择" id="buttonSel" class="btnChannel" name="btnsel">
						</td>
					</tr>
					<tr>
						<th>
							<span class="null">*</span>按钮方法
						</th>
						<td colspan="3">
							<input type="text"  size="38" id="btnFn" name="btnFn" class="inputred">
						</td>
					</tr>
					<tr>
						<th>
							<span class="null">*</span>显示名称
						</th>
						<td colspan="3">
							<input type="text"  size="38" id="subName" name="subName" class="inputred"> 
							<input type="hidden" name="subUnid" id="subUnid" size="20">
							<!--<span style="color:red">不同视图显示名称</span>-->							
						</td>						
					</tr>
					<tr>
						<th>
							<span class="null">*</span>按钮图标
						</th>
						<td colspan="3">
							<input type="text"  size="38" id="subImg" name="subImg" class="inputred">
							<input type="button" value="图标选择" id="buttonImg" class="btnChannel" name="btnimg" onclick="top.lwin.viewRecordWindow('8A6F9E6071EBD831A0B8E6057FA6A9B4', '0', 'subImg', 'ICON_CLASS');">
						</td>
					</tr>
					<!-- <tr>
						<th>
							上传图标
						</th>
						<td colspan="3">
							<input type="text"  size="38" id="uploadImg" name="uploadImg" class="inputred">
							<input type="button" value="上传" id="buttonUpload" class="btnChannel" name="btnupload">
						</td>
					</tr>
					<tr>
						<th>
							图标预览
						</th>
						<td colspan="3">
							<span class="icon-add" id="img_preview">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</span>
						</td>
					</tr> -->
					<tr>
						<th>
							指定方法路径
						</th>
						<td colspan="3">
							<input type="text"  size="38" id="fnPath" name="fnPath">
						</td>
					</tr>			
					<tr>
						<td colspan="4" align="center">
							<!-- <input type="button"  value="新增" class="btnChannel" id="btnSave" name="btnSave"> -->
							<input type="button"  value="保存更新" class="btnChannel" id="btnUpdate" name="btnUpdate">
						</td>
					</tr>								
					</tbody>
					</table>
					</form>
				</td>
			</tr>
			</tbody>
			</table>
			
			<div style="text-align:center;padding:20px;">
				<a ref="预览" href="javascript:"  class="easyui-linkbutton step" iconCls="icon-add">预览</a>
				<a href="javascript:top.lwin.close(true)"  class="easyui-linkbutton" iconCls="icon-add">完成</a>
			</div>
		</div>
		
		<div title="预览" style="overflow: hidden;" disable=false>
			<iframe id="preview" width="100%" height="100%" frameborder="0" src=""></iframe>
		</div>
	</div>
	
	<!-- 菜单 -->
	<div id="menu-field" style="width:120px;" class="easyui-menu">
        <!-- <div id="add-field">追加字段</div>
        <div id="edit-field">编辑字段</div>    -->    
        <div id="del-field">删除字段</div>       
        <div id="left-field" onclick="moveField('left')">左移</div>
        <div id="right-field" onclick="moveField('right')">右移</div>
	</div>
	
	<script type="text/javascript">
	var viewUnid = '${view.unid}';
	var columns = '';
	var APP_UNID = '<%=APP_UNID%>';
	/****************增加sql类型后，添加脚本 begin********************/
	/**
	 * 说明：添加表格行
	 */
  	function addRow(){
		var obj = $('#sTrTmp:first');
		var clone = obj.clone();
		clone.attr('id', 'sTrTmp_' + parseInt(obj.parent().children().length) + 1);
		clone.attr('style', '');
		clone.find(':checkbox[value=2]').attr('checked', 'checked');
		clone.find(":hidden[name=displaySimple]").val(2)
		obj.parent().append(clone);
	}
	/**
	 * 说明： 将通过脚本条件的表格行，并且数据库中未存在该记录的，通过脚本直接剔除
	 * 参数： obj 当前删除按钮对象
	 */
	function delRow(obj){
		$(obj).parent().parent().remove();
	}
	/**
	 * 说明：	 添加行中下拉框改变事件，对行中的各个标签进行设置，使其符合后台代码的数据获取形式
	 * 参数： obj 当前下拉框对象
	 */
	function changeSelect(obj){
		$(obj).parent().parent().find(":checkbox[name=displaySimple_ck]").bind('change',function(){
			var name = $(this).attr('name');
			name = name.substring(0,name.indexOf('_ck'));
			var object = $(":checked[name="+name+"_ck]");
			if(object.length==2){
				$(':hidden[name='+name+']').val(1);
			}else{
				$(':hidden[name='+name+']').val(object.val());
			}
		});
		var oldSelected = $(obj).parent().parent().find(":checkbox[name=field]").val();
		if(oldSelected == "on" || oldSelected == null || oldSelected == ""){
			$(obj).parent().parent().find(":text[name=name]").val($(obj).find("option:selected").text());
			$(obj).parent().parent().find(":checkbox[name=field]").val($(obj).find("option:selected").val());
			$(obj).parent().parent().find(":text[name=name]").attr("name",$(obj).find("option:selected").val() + "_name");
			$(obj).parent().parent().find("select[name=displayType]").attr("name", $(obj).find("option:selected").val()+"_displayType");
			$(obj).parent().parent().find(":text[name=dicUnid]").attr("name", $(obj).find("option:selected").val()+"_dicUnid");
			$(obj).parent().parent().find(":hidden[name=displaySimple]").attr("name", $(obj).find("option:selected").val()+"_displaySimple");
			$(obj).parent().parent().find(":checkbox[name=displaySimple_ck]").attr("name", $(obj).find("option:selected").val()+"_displaySimple_ck");
		} else {
			$(obj).parent().parent().find(":text[name="+oldSelected+"_name]").val($(obj).find("option:selected").text());
			$(obj).parent().parent().find(":checkbox[name=field]").val($(obj).find("option:selected").val());
			$(obj).parent().parent().find(":text[name="+oldSelected+"_name]").attr("name",$(obj).find("option:selected").val() + "_name");
			$(obj).parent().parent().find("select[name="+oldSelected+"_displayType]").attr("name", $(obj).find("option:selected").val()+"_displayType");
			$(obj).parent().parent().find(":text[name="+oldSelected+"_dicUnid]").attr("name", $(obj).find("option:selected").val()+"_dicUnid");
			$(obj).parent().parent().find(":hidden[name="+oldSelected+"_displaySimple]").attr("name", $(obj).find("option:selected").val()+"_displaySimple");
			$(obj).parent().parent().find(":checkbox[name="+oldSelected+"_displaySimple_ck]").attr("name", $(obj).find("option:selected").val()+"_displaySimple_ck");
		}
	}
	//删除已经存在的查询条件
	/**
	 * 说明：	 将已经保存到数据库中的查询条件字段进行删除
	 * 参数： obj 当前删除按钮对象
	 *       queryUnid 查询条件字段UNID
	 */
	function delQueryCondition(obj, queryUnid){
		if(confirm('该操作不可恢复,您确定删除该项吗?')){
			$.ajax({
				url:'${path}/view.action',
				type:'post',
				dataType:'json',
				data:{
					unid:queryUnid,
					fn:'delViewQuery'
				},
				success:function(response){
					$(obj).parent().parent().remove();
				},
				error:function(){
					top.$.messager.alert("信息","删除失败！","error");
				}
			});
		}
	}
	/****************增加sql类型后，添加脚本 end********************/
	
	$(function(){
		
		//绑定视图类型事件
		$(':radio[name=type]').bind('click',function(){
			if($(this).val() == 1){
				$('#treeUrl').show();
			}else{
				$('#treeUrl').hide();
			}
		});
		
		//step配置步骤按钮绑定事件
		$(".step").bind("click",function(){
			var ref = $(this).attr("ref");
			$("#tabs").tabs("select",ref);
		});
		
		//保存关闭按钮
		$('.stepover').bind('click',function(){
			$('#baseForm').ajaxSubmit({
				async:false,
				dataType:'json',
				cache:false,
				error:function(){
					alert('保存失败');
				},
				success:function(result){
					if(result.success){
						top.lwin.close(true);
					}else{
						alert('保存失败');
					}
				}
			}); 
		});
		$('.close').bind('click',function(){
			$('#filed').window('close');
		});
		
		//为idField绑定保存事件
		$(':radio[name=rownumbers]').click(function(){
			saveIdField();
		});
		$(':radio[name=checkbox]').click(function(){
			saveIdField();
		});
		$('#idField').change(function(){
			saveIdField();
		});
		
		$('#btnSave').click(function(){
			btnSave();
		});
		$('#btnUpdate').click(function(){
			btnUpdate();
		});
		
		$(':radio[name=sourceType]').click(function(){
			if($(this).val()==3){
				$('#tr_dataClass').show();
			}else{
				$('#tr_dataClass').hide();
			}
		});
		
		//按钮事件
		bindButtonList();
		
		//删除字段
		delField();
		
		$('#field').change(function(){
			$("#title").val( $(this).find("option:selected").text());
			if($(this).val().indexOf('_null')==0 || $(this).val()==''){
				$('#width').val('');
			}else{
				$('#width').val('10');
			}
		});		
		
		$('#displayCN').change(function(){	
			if($(this).attr('checked')){
				$('#field option').each(function(){
					var comment = $(this).attr('comment');
					if( comment && comment.length>0){
						$(this).text(comment);
					}
				});
				$('#idField option').each(function(){
					var comment = $(this).attr('comment');
					if( comment && comment.length>0){
						$(this).text(comment);
					}
				});
			}else{
				$('#field option').each(function(){
					var column = $(this).attr('column');
					if( column && column.length>0){
						$(this).text(column);
					}
				});
				$('#idField option').each(function(){
					var column = $(this).attr('column');
					if( column && column.length>0){
						$(this).text(column);
					}
				});
			}
		});
		
		$(".displaySimple").bind('change',function(){
			var name = $(this).attr('name');
			name = name.substring(0,name.indexOf('_ck'));
			var obj = $(":checked[name="+name+"_ck]");
			if(obj.length==2){
				$(':hidden[name='+name+']').val(1);
			}else{
				$(':hidden[name='+name+']').val(obj.val());
			}
		});
		
		
		//按钮权限
		$('#btnLimits').bind('click',function(){
			top.lwin.open('core/view/cfg/button_edit.jsp?viewUnid='+viewUnid,'按钮权限',640,480);
		});
		
		//搜索框
		var list = new Array();
		$("#buttonList option").each(function(index){
			list[index] = $(this).text();
		});
		
		$("#tags").autocomplete(list, {
			width: 200,
			max: 10,
			highlight: false,
			scroll: true,
			scrollHeight: 300
		});
		function log(event, data, formatted) {
			var obj = $("#buttonList option[title="+formatted+"]");
			if($("#subbuttonList option[value="+obj.val()+"]").length==0){
				var clone = obj.clone();
				$("#subbuttonList").append(clone);
				clone.attr('subName',clone.attr('btnName'));
				clone.attr('subSort',$("#subbuttonList option").length-1);
				
				addSubButton(obj);
			}
		}
		$(":text, textarea").result(log).next().click(function() {
			$(this).prev().search();
		});
		
		$('#name').bind('focusout',function(){
			if($('#alias').val()==''){
				$('#alias').val(getSpell($('#name').val()));
			}		
		});

		//为tab绑定选中事件
		$("#tabs").tabs({
			onSelect:function(title){
				var bool = true;
				
				//验证基本信息保存
				if('基本信息'!=title){
					var validate = new Validation('baseForm');
					$('#baseForm').ajaxSubmit({
						async:false,
						dataType:'json',
						cache:false,
						beforeSubmit:function(){
							bool = validate.validate()
							return bool;
						},
						error:function(){
							top.lwin.errorService();
						},
						success:function(result){
							if(result.success){
								viewUnid = result.view.unid;
								$('#unid').val(viewUnid);
								
								<%
									if(StringUtils.isEmpty(viewId)){
								%>
								//location.href = '?viewId='+viewUnid+'&title='+title;
								<%		
									}
								%>
								
							}else{
								top.$.messager.alert("信息提示","保存失败!","error");
							}
						}
					}); 	
					if(!bool){
						$("#tabs").tabs("select","基本信息");
						return;
					}
				}
				
				if("SQL语句"==title){					
					$(document).unbind('contextmenu');
					
					if($(':radio[name=type]:checked').val()==1 && $('#treeClass').val()==''){
						top.$.messager.alert("信息提示","请填写树形实现类!","info");
						$("#tabs").tabs("select","基本信息");
						$('#treeClass').focus();
						return;
					}
				}
				
				else if("显示配置"==title){
					
					if($(':radio[name=sourceType]:checked').val()==3){
						if($('#dataClass').val()==''){
							top.$.messager.alert("信息提示","请先填写数据来源类!","info");
							$("#tabs").tabs("select","基本信息");
							return;
						}
					}else if($('#sql').val()==''){
						top.$.messager.alert("信息提示","请先填写sql语句!","info");
						$("#tabs").tabs("select","SQL语句");
						return;
					}
					
					
				
					$('#sqlForm').ajaxSubmit({
						dataType:'json',
						cache:false,
						async:false,
						data:{
							<%
								if(viewId!=null&&viewId.length()==32){
							%>
							viewUnid:'${view.unid}'
							<%		
								}else{
							%>
							viewUnid:viewUnid
							<%		
								}
							%>	
						},
						error:function(){
						},
						success:function(result){
							if(result.success){
								/******************根据SQL语句是否被修改，保存历史记录 begin***************************/
								if($('#isChange').val() == '1'){
									if($('#oldSql').val() != null && $('#oldSql').val() != ""){
										var sqlLog = {};
										sqlLog.unid = '';
										sqlLog.app_unid = $('#jndi').val();
										sqlLog.view_unid = viewUnid;
										sqlLog.sql = $('#oldSql').val();
										sqlLog.createtime = '';
										$.ajax({
											url:'${path}/sqlLog.action',
											type:'post',
											dataType:'json',
											data:{
												sg:JSON.stringify(sqlLog),
												fn:'sqlLog'
											},
											success:function(response){
												$('#oldSql').val($('#sql').val());
												$('#isChange').val('0');
											},
											error:function(){
											}
										});
									}
								}
								/******************根据SQL语句是否被修改，保存历史记录 end***************************/
								/*******************根据返回的sql复杂度，显示页面 begin***********************/
								var sqlType = result.sqlType;	
								var simpleArr = $(".simpleType");
								var seniorArr = $(".seniorType");
								if((typeof(simpleArr) != "undefined" && simpleArr.length > 0) && (typeof(seniorArr) != "undefined" && seniorArr.length > 0)){
									if(sqlType == '0'){
										for(var i = 0; i < simpleArr.length; i++){
											simpleArr[i].style.display = "";
										}
										for(var i = 0; i < seniorArr.length; i++){
											seniorArr[i].style.display = "none";
										}
									} else {
										for(var i = 0; i < simpleArr.length; i++){
											simpleArr[i].style.display = "none";
										}
										for(var i = 0; i < seniorArr.length; i++){
											seniorArr[i].style.display = "";
										}
									}
								}
								/*******************根据返回的sql复杂度，显示页面 end***********************/
								/*******************字段下拉框取值 begin*****************************************/
								if(sqlType == '0'){
									var fields = result.fields.field;
									if(result.fields.sField.length > 0){
										var rowArr = $("#queryTable").find("tbody").children();
										for(var i = 2; i < rowArr.length; i++){
											for(var j=0;j<fields.length;j++){
												if($(rowArr[i]).find("#dispalyFieldQuery option[value="+fields[j].name+"]").length == 0){
													if(fields[j].name == $(rowArr[i]).find("span").html()){
														$(rowArr[i]).find("#dispalyFieldQuery").append("<option selected=\"selected\" value=\""+fields[j].name+"\" column=\""+fields[j].name+"\" comment=\""+fields[j].comment+"\" title=\""+fields[j].name+" | "+fields[j].comment+"\" >"+fields[j].name+"</option>");
													} else {
														$(rowArr[i]).find("#dispalyFieldQuery").append("<option value=\""+fields[j].name+"\" column=\""+fields[j].name+"\" comment=\""+fields[j].comment+"\" title=\""+fields[j].name+" | "+fields[j].comment+"\" >"+fields[j].name+"</option>");
													}
												}
											}
											//显示中文字段
											$(rowArr[i]).find("#dispalyFieldQuery").find("option").each(function(){
												var comment = $(this).attr('comment');
												if( comment && comment.length>0){
													$(this).text(comment);
												}
											});
										}
									}
									var rowHidden = $("#queryTable").find("tbody").find("#sTrTmp");
									for(var i=0;i<fields.length;i++){
										if(rowHidden.find("#dispalyFieldQuery option[value="+fields[i].name+"]").length == 0){
											rowHidden.find("#dispalyFieldQuery").append("<option value=\""+fields[i].name+"\" column=\""+fields[i].name+"\" comment=\""+fields[i].comment+"\" title=\""+fields[i].name+" | "+fields[i].comment+"\">"+fields[i].name+"</option>");
										}
									}
									//显示中文字段
									rowHidden.find("#dispalyFieldQuery").find("option").each(function(){
										var comment = $(this).attr('comment');
										if( comment && comment.length>0){
											$(this).text(comment);
										}
									});
								}
								/*******************字段下拉框取值 end*****************************************/
								var fields = result.fields.field;
								for(var i=0;i<fields.length;i++){
									if( $("#field option[value="+fields[i].name+"]").length ==0 ){
										$("#field").append("<option value=\""+fields[i].name+"\" column=\""+fields[i].name+"\" comment=\""+fields[i].comment+"\" title=\""+fields[i].name+" | "+fields[i].comment+"\">"+fields[i].name+"</option>");
										$("#idField").append("<option value=\""+fields[i].name+"\" column=\""+fields[i].name+"\" comment=\""+fields[i].comment+"\" title=\""+fields[i].name+" | "+fields[i].comment+"\">"+fields[i].name+"</option>");
										if($("#editTitleId").val() == fields[i].name){
											$("#editTitle").append("<option selected=\"selected\" value=\""+fields[i].name+"\">"+fields[i].comment+"</option>");
										} else {
											$("#editTitle").append("<option value=\""+fields[i].name+"\">"+fields[i].comment+"</option>");
										}
									}
								}
								
								var sField = result.fields.sField;
								for(var i=0;i<sField.length;i++){
									var clone = $("#sTrTmp").clone(true);
									if($(":checkbox[name='field'][value='"+sField[i].field+"']").length==0){
										//增加条件查询位置，默认选择（简单查询）
										clone.find(':checkbox[value=2]').attr('checked', 'checked');
										clone.find(":hidden[name=displaySimple]").val(2)
										
										clone.find(":text[name=name]").attr("name",sField[i].field+"_name");
										clone.find("select[name=displayType]").attr("name",sField[i].field+"_displayType");
										clone.find(":text[name=dicUnid]").attr("name",sField[i].field+"_dicUnid");
										
										clone.find(":hidden[name=displaySimple]").attr("name",sField[i].field+"_displaySimple");
										clone.find(":checkbox[name=displaySimple_ck]").attr("name",sField[i].field+"_displaySimple_ck");
										//clone.find(":checkbox[name=displaySimple_ck]:eq(0)").attr("name",sField[i].field+"_displaySimple_ck");
										//clone.find(":checkbox[name=displaySimple_ck]:eq(1)").attr("name",sField[i].field+"_displaySimple_ck");
										
										clone.find("span").text(sField[i].field);
										clone.find(":checkbox[name=field]").val(sField[i].field);
										clone.css("display","block");
										clone.attr("id", "sTrTmp_" + i);
										$("#sTrTmp").parent().append(clone);
										/*
										$(":checkbox[name="+sField[i].field+"_displaySimple_ck]").bind('change',function(){
											var name = $(this).attr('name');
											name = name.substring(0,name.indexOf('_ck'));
											var obj = $(":checked[name="+name+"_ck]");
											
											if(obj.length==2){
												$(':hidden[name='+name+']').val(1);
											}else{
												$(':hidden[name='+name+']').val(obj.val());
											}
										});
										*/
									}
								}
								//$("#sTrTmp").remove();
								
								
								//显示中文字段
								$('#field option').each(function(){
									var comment = $(this).attr('comment');
									if( comment && comment.length>0){
										$(this).text(comment);
									}
								});
								$('#idField option').each(function(){
									var comment = $(this).attr('comment');
									if( comment && comment.length>0){
										$(this).text(comment);
									}
								});
								
							}else{
								alert('保存失败');
							}
						}
					}); 		
				}
				
				else if("预览"==title){
					$("#preview").attr("src","view.action?fn=grid&viewId="+viewUnid+"&APP_UNID="+APP_UNID);
				}
				
				else if("按钮配置"==title){
					if($('#idField').val()==''){						
						$("#tabs").tabs("select","显示配置");
						$('#idField').focus();
						alert('请选择选项列');
						return;
					}
				
					$('#fieldForm').ajaxSubmit({
						async:false,
						dataType:'json',
						cache:false,
						data:{
							viewUnid:viewUnid
						},
						error:function(){
						},
						success:function(result){
							
						}
					}); 
					
					$('#queryForm').ajaxSubmit({
						async:false,
						dataType:'json',
						cache:false,
						data:{
							viewUnid:viewUnid
						},
						error:function(){
						},
						success:function(result){
							
						}
					}); 
				}
				
				else{
					$(document).unbind('contextmenu');
				}
				
			}
		});
		/*
		setTimeout(function(){
			$("#tabs").tabs("select","<%=title%>");
		},50);
		*/
		
		/**
		* 说明：绑定SQL语句填写框,设置其是否被修改,1为被修改
		**/
		$('#sql').bind('change', function(){
			$('#isChange').val('1');
		});
		
		/**
		* 说明：绑定打开SQL语句历史记录页面
		**/
		$('#openSqlLog').bind('click', function(){
			var arg = '?appUnid=' + $('#jndi').val() + '&viewUnid=' + viewUnid;
			top.lwin.open('core/sqllog/sqllog_list.jsp' + arg, 'SQL历史记录', '800', '400', 'icon-search');
		});
		
		/**
		* 说明：按钮名称文本框的改变事件
		**/
		$('#btnName').bind('change', function(){
			$('#subName').val($('#btnName').val());
		});
		
		$('#buttonSel').bind('click', function(){
			top.lwin.open('core/view/cfg/choose_buttons.jsp', '按钮选择', 800, 495, 'icon-search');
		});
		//initTextVal();
	});	
	
	/**
	* 说明：初始化按钮显示名称
	**/
	function initTextVal(){
		var interval = setInterval(function(){
				if(($('#subName').val() == '' || $('#subName').val() == null) && ($('#btnName').val() != null && $('#btnName').val() != '')){
					$('#subName').val($('#btnName').val());	
					window.clearInterval(interval);
				}
				if($('#subName').val() != '' && $('#subName').val() != null){
					window.clearInterval(interval);
				}
			},100);
	}
	
	
	var contextmenuObj;
	
	function bindColumnMenu(){
		$('.column').bind('contextmenu',function(e){
			$('#menu-field').menu('show', {
				left: e.pageX,
				top: e.pageY
			});
			contextmenuObj = $(this);		
			return false;
		});
	}
	
	$('.column').bind('contextmenu',function(e){
		$('#menu-field').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
		contextmenuObj = $(this);		
		return false;
	});
	
	//删除字段
	function delField(){
		$('#del-field').bind('click',function(){
			var obj = contextmenuObj.find('a');
			var columnUnid = obj.attr('unid');
			
			$.messager.confirm('操作提示', '您确定删除字段吗?', function(r){
				if (r){
					$.ajax({
						url:'view.action',
						cache:false,
						dataType:'json',
						data:{
							fn:'delField',
							columnUnid:columnUnid
						},
						error:function(){
							top.lwin.errorService();
						},
						success:function(data){
							if(data.success){
								if(obj.parent().parent().find('.column').length==1 && $('.rowField').length >1){
									obj.parent().parent().remove();
								}else{
									obj.parent().remove();
								}
							}else{
								alert('删除失败');
							}
						}			
					});
				}
			});
			
			
			
		});
	}
	
	//左右移字段
	function moveField(tag){
			
		if('left'==tag){
			contextmenuObj.prev().before(contextmenuObj.clone(true));
		}else if('right'==tag){
			contextmenuObj.next().after(contextmenuObj.clone(true));
		}
		
		
		contextmenuObj.remove();
		saveSort();		
	}
	
	
	//id field 保存
	function saveIdField(){
		$('#fieldForm').ajaxSubmit({
			dataType:'json',
			async:false,
			data:{
				viewUnid:viewUnid
			},
			error:function(){
			},
			success:function(result){
				$('#idFieldUnid').val(result.idFieldColumn.unid);
			}
		}); 
	}
	
	
	var trDom;
	//字段编辑
	function fieldEdit(e){
		$('#empty').val('_empty'+(Math.random()+'').substring(2,4));
		
		trDom = $(e).parent().parent();
		var id = $(e).attr('unid');		
		if(id){
			$.ajax({
				url:'view.action',
				cache:false,
				dataType:'json',
				async:false,
				data:{
					fn:'getColumn',
					columnUnid:id
				},
				error:function(){
					top.lwin.errorService();
				},
				success:function(result){
					$('#columnUnid').val(id);
					$('#title').val(result.column.title);
					$('#align').val(result.column.align);
					$('#width').val(result.column.width);
					
					var field = result.column.field;
					if(field.indexOf('_empty')==0 || (field.indexOf('_null')==0 && result.column.width !='') ){
						$('#empty').attr('selected',true);
						
					}else if(field.indexOf('_null')==0 && result.column.width==''){
						$('#null').attr('selected',true);
						
					}else{
						$('#field').val(result.column.field);
					}
					
					$('#sortable').val(result.column.sortable);
					$('#formatter').val(result.column.formatter);
					$('#sort').val(result.column.sort);
					
					if(result.column.merge==1){
						$('#merge').attr('checked',true);
					}
					
					if(result.column.footer==1){
						$('#footer').attr('checked',true);
					}
					
					if(result.column.rowspan){
						$('#rowspan').val(result.column.rowspan);
					}
					if(result.column.colspan){
						$('#colspan').val(result.column.colspan);	
					}							
				}
			});
		}else{
			$('#columnUnid').val('');
			$('#title').val('');
			$('#align').val('');
			$('#width').val('');
			$('#field').val('');
			$('#sortable').val('');
			$('#formatter').val('');
			
			var tr = $(e).parent().parent();
			var sort = tr.attr('row')*100+ tr.find('.column').length;	
			$('#sort').val(sort);
		}
		
		$('#filed').window('open');
	}
	
	//保存按钮
	function btnSave(){	
		$('#btnUnid').val('');
		$('#subUnid').val('');
		
		if($('#subSort').val()==''){
			$('#subSort').val($("#subbuttonList option").length-1);
		}
		
		$('#btnForm').ajaxSubmit({
			async:false,
			dataType:'json',
			data:{
				viewUnid:viewUnid,
				fn:'saveBtn'	
			},
			error:function(result){
				alert('数据错');
			},
			success:function(result){
				if(result){
					var btn = result.btn;
					var btnHtml = "<option value=\""+btn.BUTTON_UNID+"\"" +
								"title=\""+btn.BUTTON_NAME+"\"" + 
								"btnUnid=\""+btn.BUTTON_UNID+"\"" + 
								"btnName=\""+btn.BUTTON_NAME+"\"" + 
								"btnFn=\""+btn.BUTTON_FN+"\"" + 
								"subUnid = \"\"" + 
								"subName = \"\"" + 
								"subImg = \"\" style='color:red'>"+btn.BUTTON_NAME+"</option>";	
								
					var subHtml = 	"<option value=\""+btn.BUTTON_UNID+"\"" +
									"title=\""+btn.SUB_NAME+"\"" + 
									"btnUnid=\""+btn.BUTTON_UNID+"\"" + 
									"btnName=\""+btn.BUTTON_NAME+"\"" + 
									"btnFn=\""+btn.BUTTON_FN+"\"" + 
									"subUnid=\""+btn.SUB_UNID+"\"" + 
									"subImg=\""+btn.SUB_IMG+"\"" + 
									"subSort=\""+btn.SUB_SORT+"\"" + 
									"fnPath=\""+btn.FN_PATH+"\"" + 
									"subName=\""+btn.SUB_NAME+"\" style='color:red'>"+btn.SUB_NAME+"</option>";
						
					
					
					$("#buttonList").append(btnHtml);					
					$("#subbuttonList").append(subHtml);
				}
			}
		});
	}
	
	//表单验证
	var btnFormValidate = new Validation('btnForm', { 
    	immediate: true,
	    validators: {
	      	btnName:'required',
	      	btnFn:'required',
	      	subName:'required',
	      	subImg:'required'
	    },
	    messages:{
	    	btnName:'请填写[按钮名称]',
	    	btnFn:'请填写[按钮方法]',
	    	subName:'请填写[显示名称]',
	    	subImg:'请填写[按钮图标]'
	    }
  	});
	
	//更新子按钮
	function btnUpdate(){
		if(!btnFormValidate.validate()){
			return;
		}
		var btnfn =  $('#btnFn').val();		
		if(btnfn == 'gAdd'){
			$('#subImg').val('icon-add');							
		}else if(btnfn == 'gDel'){
			$('#subImg').val('icon-del');				
		}else if($('#subImg').val()==''){
			$('#subImg').val('icon-application');		
		}
		
		if($('#subSort').val()==''){
			$('#subSort').val($("#subbuttonList option").length-1);
		}
	
		$('#btnForm').ajaxSubmit({
			async:false,
			dataType:'json',
			data:{
				viewUnid:viewUnid,
				fn:'saveSubBtn'	
			},
			error:function(result){
				alert('数据错');
			},
			success:function(result){
				var obj = $("#subbuttonList option:selected");
				if(obj.length==0){
					obj = $("#subbuttonList option:last");
				}			
				
				obj.attr('btnUnid',result.btn.BUTTON_UNID);
				obj.attr('btnName',result.btn.BUTTON_NAME);
				obj.attr('btnFn',result.btn.BUTTON_FN);
				
				if(result.btn.SUB_UNID){
					obj.attr('subUnid',result.btn.SUB_UNID);
				}
				if(result.btn.SUB_IMG){
					obj.attr('subImg',result.btn.SUB_IMG);
				}
				if(result.btn.SUB_NAME){
					obj.attr('subName',result.btn.SUB_NAME);
				}
				if(result.btn.FN_PATH){
					obj.attr('fnPath',result.btn.FN_PATH);
				}
				
				$('#btnUnid').val(result.btn.BUTTON_UNID);
				$('#subUnid').val(result.btn.SUB_UNID);
				top.$.messager.alert("消息","保存更新成功！","info");
			},
			error:function(){
				top.$.messager.alert("消息","保存更新失败！","error");
			}
		});
	}
	
	//字段保存
	function saveFieldEdit(){		
	
		/*
		var columnUnid = $('#columnUnid').val();
		var title = $('#title').val();
		var align = $('#align').val();
		var width = $('#width').val();
		var field = $('#field').val();
		var sortable = $('#sortable').val();
		var formatter = $('#formatter').val();
		*/
		
		var field = $('#field').val();
		if(field.indexOf('_empty')==0){
			if($('#width').val()==''){
				alert('请填写宽度');
				$('#width').focus();
				return;
			}
			
		}else if(field.indexOf('_null')==0){
			if($('#width').val()!=''){
				$('#width').val('');
			}
		}
		
		
		var sort = $('#sort').val();
		if(!sort){
			$('#sort').val($('.column').length+1);
		}
		
		$('#saveFieldForm').ajaxSubmit({
			async:false,
			cache:false,
			dataType:'json',
			data:{
				viewUnid:viewUnid				
			},
			error:function(result){
				alert('数据错');
			},
			success:function(result){
				if(result.success){
					//var colspan = $('.emptyField').attr('colspan');
					
					var align = result.column.align;
					if('2'==align){
						align = 'center';
					}else if('3'==align){
						align = 'right';
					}else{
						align = 'left';
					}
					var tdHtml = '<td id="'+result.column.unid+'" class="'+result.column.unid+' column"'
						+'colspan="'+result.column.colspan+'" rowspan="'+result.column.rowspan+'"'
						+'align="'+align+'">'
						+'<a href="javascript:" onclick="fieldEdit(this)" unid="'+result.column.unid+'" title="'+result.column.title+'">'+result.column.title+'</a>'
						+'</td>'
					
					if(result.fn=='save'){
						trDom.find('td:last').after(tdHtml);
						
					}else if(result.fn=='update'){
						$('.'+result.column.unid).before(tdHtml);
						$('.'+result.column.unid+':last').remove();
					}
					
					bindColumnMenu();
					
					//$('.emptyField').attr('colspan',colspan-1);
					
					/*
					var fieldHtml = '<div id="'+result.column.unid+'">'
								   +'<input type="hidden" name="columnUnid" value="'+result.column.unid+'">'
								   +'<input type="hidden" name="title" value="'+result.column.title+'">'
								   +'<input type="hidden" name="align" value="'+result.column.align+'">'
								   +'<input type="hidden" name="width" value="'+width+'">'
								   +'<input type="hidden" name="field" value="'+field+'">'
								   +'<input type="hidden" name="sortable" value="'+sortable+'">'
								   +'<input type="hidden" name="formatter" value="'+formatter+'">'
								   +'</div>';					
					$('#fieldForm').append(fieldHtml);
					*/
					$('#saveFieldForm').resetForm();
					$('#filed').window('close');
					
					//调整顺序
					saveSort();		
				}
			}
		}); 		
	}
	
	function saveSort(){
		var sorts = '';
		$('.rowField').each(function(i){
			var base = (i + 1) * 100;					
			$(this).find('.column').each(function(j,e){			
				sorts += $(e).attr('id')+','+(base+j)+';';
			});			
		});	
		$.post('view.action',{fn:'saveSort',sorts:sorts});
	}
	
	
	//复制sql系统参数
	function copyText(e){
		var rng = document.body.createTextRange(); 
		rng.moveToElementText(e); 
		rng.scrollIntoView(); 
		rng.select(); 
		rng.execCommand("Copy"); 
		rng.collapse(false);
		alert("复制成功!");
	}
	
	
	function bindButtonList(){
		//为左边例表绑定双击事件,用于双击添加到右侧例表
		$("#buttonList").bind("dblclick",function(){
			var obj = $(this).find(":selected");
			if($("#subbuttonList option[value="+obj.val()+"]").length==0){
				var clone = obj.clone();
				$("#subbuttonList").append(clone);
				clone.attr('subName',clone.attr('btnName'));
				clone.attr('subSort',$("#subbuttonList option").length-1);
				addSubButton(clone);
			}			
		});
		
		//为右边例表绑定双击事件,用于双击删除该选中项
		$("#subbuttonList").bind("dblclick",function(){
			var obj = $(this).find(":selected");
			delSubButton(obj);
		});
		
		//为添加按钮绑定单击事件,用于把左侧项选中添加到右侧
		$("#buttonAdd").bind("click",function(){
			var obj = $("#buttonList option:selected");
			if($("#subbuttonList option[value="+obj.val()+"]").length==0){
				addSubButton(obj);			
			}
		});
		
		//为删除按钮绑定单击事件,用于删除右侧选中项
		$("#buttonDel").bind("click",function(){
			var obj = $("#subbuttonList option:selected");
			delSubButton(obj);
		});
		
		//为右边例表绑定单击事件
		$("#subbuttonList").bind("click",function(){
			var obj = $(this).find(":selected");
			
			$('#btnUnid').val(obj.attr('btnUnid'));
			$('#btnName').val(obj.attr('btnName'));
			$('#btnFn').val(obj.attr('btnFn'));
			
			//alert(obj.attr('subUnid'));
			
			$('#subUnid').val(obj.attr('subUnid'));
			$('#subImg').val(obj.attr('subImg'));
			$('#subName').val(obj.attr('subName'));
			$('#subSort').val(obj.attr('subSort'));	
			$('#fnPath').val(obj.attr('fnPath'));	
		});
	}
	
	/**
	 * 移除子按钮
	*/
	function delSubButton(obj){
		$.ajax({
			url:"view.action?fn=delSubButton",
			type:"post",
			async:false,
			dataType:"json",
			data:{
				subUnid:$("#subUnid").val()
			},
			success:function(responseText){
				if(responseText.success){						
					obj.remove();
					$("#btnForm")[0].reset(); 
				}					
			}						
		});
	}
	
	function addSubButton(obj){
		$('#btnUnid').val(obj.attr('btnUnid'));
		$('#btnName').val(obj.attr('btnName'));
		$('#btnFn').val(obj.attr('btnFn'));
		
		$('#subUnid').val(obj.attr('subUnid'));
		$('#subImg').val(obj.attr('subImg'));
		$('#subName').val(obj.attr('subName'));
		$('#subSort').val(obj.attr('subSort'));
		
		btnUpdate();
	}
	
	function rowEdit(){
		var obj = $('.rowField:last');
		var clone = obj.clone();
		clone.attr('row',parseInt(obj.attr('row'))+1);
		clone.find('.column').remove();
		
		obj.after(clone);
		
		
	}
	
	/**
	 * 说明：显示类型下拉框改变事件
	 * @param e 当前下拉框对象
	 */
	function changeDisplayType(e){
		var val = $(e).val();
		if(val!=1 && val!=4){
			$(e).next().show();
		}else{
			$(e).next().hide();
		}
		//当下拉框选择改变时，清除字典选择
		$($(e).next().children().get(0)).val('');
	}
	
	/**
	 * 说明：显示类型下拉框点击事件
	 * @param e 当前下拉框对象
	 */
	 function selectClick(e){
	 	if($($(e).next().children().get(0)).attr('name') == 'dicUnid'){
			top.$.messager.alert("信息","<strong>条件字段</strong>不可为空，请选择！","info");
			return;
		}
	 }
	
	/**
	 * 说明：点击字典按钮显示选择窗口
	 * @param e 当前字典按钮对象
	 */
	function changeDic(e){
		top.lwin.open('/core/view/cfg/choose_dic.jsp?_rand='+Math.random()+'&dicttype='+$(e).prev().attr('name'),'字典选择',800,495,'icon-search');
	}
	
	//全选搜索字段sField
	function selectAllSField(e){
		if($(e).attr("checked")){
			$(":checkbox[name=field]").attr("checked",true);
		}else{
			$(":checkbox[name=field]").attr("checked",false);
		}	
	}
	
	//复制视图
	function copyView(id){
		$.ajax({
			url:'view.action',
			type:'post',
			dataType:'json',
			data:{
				fn:'copyView',
				viewUnid:id
			},
			success:function(responseText){
				if(responseText.success){
					alert("复制成功!");
					//location.href=top.appPath+'/admin/view/cfg/view_cfg.jsp?viewId='+responseText.unid;
					location.href='view_cfg.jsp?viewId='+responseText.unid;
				}
			}		
		});
	}
	
	function moveBtn(tag){
		var orig = $('#subbuttonList option:selected');
		if('up'==tag){
			var dest = orig.prev();
			dest.before(orig);
			
		}else if('down'==tag){
			var dest = orig.next();
			dest.after(orig);
		}
	
		var ids = '';
		$('#subbuttonList option').each(function(index){
			if(index > 0){
				ids += ',';
			}
			ids =  ids + $(this).attr('subUnid');
		});
		
		$.ajax({
			url:'view.action',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				fn:'moveBtn',
				ids:ids
			},
			error:function(){
				top.lwin.errorService();
			},
			success:function(reslut){
			}
		});
	}
	
	
	function moveQueryUp(e){
		var target = $(e).parent().parent().prev();
		var clone = $(e).parent().parent().clone(true);
		if(target.hasClass('query')&&target.css('display')!='none'){
			$(e).parent().parent().remove();
			target.before(clone);
		}else{
			alert('已是最上层');
		}	
	}
	
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
					$('#sqltime').text('验证成功'+reslut.time);
				}else{
					$('#sqltime').css('color','red');
					$('#sqltime').text('SQL语句有误');
				}
			}
		});
	}
	</script>
	
</body>

</html>