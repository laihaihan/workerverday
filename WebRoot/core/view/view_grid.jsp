<%--
/**
 * 内网视图页
 * @author cyingquan@qq.com
 * @2010-11-18
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.view.View"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.core.util.FileUtil"%>
<%@page import="java.io.File"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<%
	View view = (View)request.getAttribute("view");
	String APP_UNID =  request.getParameter("APP_UNID");
	if(StrUtil.isNull(APP_UNID)){
		APP_UNID = "";
	}
	String resource = String.valueOf(request.getAttribute("resource"))+File.separator;
	String realPath = request.getRealPath("/");
	String modId = request.getParameter("modId");
	String queryString = new String(request.getQueryString().getBytes("iso8859-1"), "UTF-8");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
	<title>
		视图名称:${view.name}
		
		视图UNID:${view.unid}
		
		唯一标识:${options.idField}
		
		视图加载脚本:
			/${app}/js/view/${view.alias}.js 或
			/${app}/js/view/${view.alias}.jsp
		
		视图自定义搜索加载页面:
			简单:/${app}/js/view/search/${view.alias}.jsp
			高级:/${app}/js/view/search/${view.alias}_advanced.jsp
			
		action名:${view.alias}
	</title>
	
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	${import_jquery}
	${import_easyui}
	${import_theme}	
	
	<STYLE type="text/css">
		.highlight { background-color: yellow }	
		a.button:link {
			border: 1 solid #7DAAD4;
			height: 20px;
			padding: 1px;
			text-decoration: none;
			color: #315071;
			background: #F4F4F4;
		}
		
		a.button:visited {
			border: 1 solid #7DAAD4;
			height: 20px;
			padding: 1px;
			text-decoration: none;
			color: #315071;
			background: #F4F4F4;
		}
		
		a.button:hover {
			color: #ffffff;
			border-color: #388AD4;
			text-decoration: none;
			text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3);
			background-position: 0 -40px;
			background-color: #2D7DC5;
		}	
		
		.kw {
			border:1px solid #99BBE8; 
			color:gray;
		}
		.field option{
			color: #315071;
		}
	</STYLE>
	
	<link rel="stylesheet" href="${corejs}/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="${corejs}/ztree/jquery.ztree.min.js"></script>
	<script type="text/javascript" src="${corejs}/jquery.highlight.js"></script>
	<script type="text/javascript" src="${corejs}/datepicker/WdatePicker.js"></script>
	${import_autocomplete}
	
	
	<script type="text/javascript">
		var idField = '${options.idField}';//id标题符
		var golIdField = '${options.idField}';//id标题符	兼容旧脚本
		var zTreeObj;//树对象
		var viewWidth = ${view.width};
		var viewHeigth = ${view.height};
		var viewId = '${view.unid}';
		var queryString = '<%=queryString%>';
		var modId = '<%=modId%>';//模块id
		var appUnid = '<%=APP_UNID%>';
		
		var view = <%=JSONObject.fromObject(request.getAttribute("view"))%>;
		
		if(top.clientWidth<=viewWidth){
			viewWidth = top.clientWidth-30;
		}
		if(top.clientHeight<=viewHeigth){
			viewHeigth = top.clientHeight-30;							
		}
		
		$(function(){
			$('#list').datagrid({				
				width:$("div[region=\"center\"]").width(),
				height:$("div[region=\"center\"]").height(),
				rownumbers:${view.rownumbers eq '1'?'true':'false'},
				pagination:true,
				fitColumns:true,
				striped:true,
				nowrap:true,	
				url:'view.action',				
				queryParams:{
					fn:'grid_list',
					viewId:'${view.unid}'
					<%
						String[] params = queryString.split("&");
						for(int i=0;i<params.length;i++){
							if(StringUtils.startsWith(params[i],"fn") || StringUtils.startsWith(params[i],"viewId")){
								continue;
							}
							out.println(","+params[i].replaceAll("=",":'")+"'");
						}
					%>
				},
				pageSize:getPageSize(),
				pageList:getpageList(),
				remoteSort:true,
				idField:idField,
				showFooter:true,
				frozenColumns:[[${frozenColumns}]],
				columns:[${columns}],		
				toolbar:[${toolbar}],
				<s:if test="#request.view.clickType==1">
				onDblClickRow:onDblClickRow,
				</s:if>
				rowStyler:rowStyler,
				onClickRow:function(rowIndex, rowData){					
					var rowLength = $('#list').datagrid("getSelections").length;
					if(rowLength>1){
						$('#list').datagrid("clearSelections");
						$('#list').datagrid("selectRow",rowIndex);
					}	
					<s:if test="#request.view.clickType!=1">
						onDblClickRow(rowIndex, rowData);
					</s:if>				
				},
				onLoadSuccess:function(){
					$('#list').datagrid("clearSelections");
					$('.datagrid-cell').bind('mouseover',function(){
						$(this).attr('title',$(this).text());
					});
					
					<s:iterator value="#request.columnMergeList" id="column">
					var mergeIndex = 0;
					var mergeRowspan = 1;
					var mergeText = '';
					
					/*
					var fields = $('.datagrid-body td[field=${column.field}]');
					
					for(var index=0;index<fields.length;index++){
						 var text = $(fields[index]).find('.datagrid-cell').text();
						 if(index == 0){
						  	mergeText = text;
						  	
						  }else if(mergeText == text){
						  	mergeRowspan = mergeRowspan+1;
						  	if(index==fields.length-1){
						  		if(mergeRowspan > 1){
							  		$('#list').datagrid('mergeCells',{
										index:mergeIndex,
										field:'${column.field}',
										rowspan:mergeRowspan
									});
							  	}
						  	}
						  	
						  }else{
						  	//alert("index:"+index+"_mergeIndex:"+mergeIndex+"_mergeRowspan:"+mergeRowspan);
						  	if(mergeRowspan > 1){
						  		alert(1);
						  		$('#list').datagrid('mergeCells',{
									index:mergeIndex,
									field:'${column.field}',
									rowspan:mergeRowspan
								});
						  	}
						  	mergeIndex = index;
						  	mergeRowspan = 1;
						  	mergeText = text;
						  }
					}
					*/
					
					$('.datagrid-body td[field=${column.field}]').each(function(index){
						  var text = $(this).find('.datagrid-cell').text();
						  
						  if(index == 0){
						  	mergeText = text;
						  	
						  }else if(mergeText == text){
						  	mergeRowspan = mergeRowspan+1;
						  	
						  }else{
						  	//alert("index:"+index+"_mergeIndex:"+mergeIndex+"_mergeRowspan:"+mergeRowspan);
						  	if(mergeRowspan > 1){
						  		$('#list').datagrid('mergeCells',{
									index:mergeIndex,
									field:'${column.field}',
									rowspan:mergeRowspan
								});
						  	}
						  	mergeIndex = index;
						  	mergeRowspan = 1;
						  	mergeText = text;
						  }
					});
					</s:iterator>
				}
			});
			
			
			//显示模块树
			<s:if test="#request.view.type==1">
			var setting = {
				async:{
					enable: true,
					url:"tree.action?fn=tree&APP_UNID=<%=APP_UNID%>&class=${view.treeClass}&"+encodeURI("<%=StringUtils.substringAfter(queryString,"&")%>"),
					autoParam:[
						"${options.treeSetting.asyncParam}"
						<s:iterator value="#request.options.treeSetting.paramList" id='params'>
						,'${params}'
						</s:iterator>		
					]
				},
				callback:{
			    	onClick: zTreeOnClick,
			    	onAsyncSuccess:function(){
			    		$(".root_close,.roots_close").click();
			    	}
			    }			    
			};			
			$.fn.zTree.init($("#tree"), setting);
			zTreeObj = $.fn.zTree.getZTreeObj("tree");
			
			//点击刷新右侧例表
			function zTreeOnClick(event, treeId, treeNode) {
				$('#list').datagrid('clearSelections');
				$('#list').datagrid("load",{
					<s:iterator value="#request.options.treeSetting.paramList" id='params'>
					<s:property value="#params.toUpperCase()"/>:treeNode.${params},
					</s:iterator>					
					_search:"3",
					ID:treeNode.id,
					APP_UNID:'<%=APP_UNID%>',
					viewId:'${view.unid}',
					fn:'grid_list'
				});	
				$("#_kw").setOptions({
					extraParams:{
						ID:treeNode.id,
						_field:$('#_field').val()
					}
				});
			}
			</s:if>
			
			//绑定点击单选按钮文字事件
			$('.radioQuery').bind('click', function(){
				if($(this).prev().attr('checked')){
					$(this).prev().removeAttr('checked');
				} else {
					$(this).prev().attr('checked', 'checked');
				}
			});
			//绑定点击复选框文字事件
			$('.checkboxQuery').bind('click', function(){
				if($(this).prev().attr('checked')){
					$(this).prev().removeAttr('checked');
				} else {
					$(this).prev().attr('checked', 'checked');
				}
			});
		});		
	</script>
</head>

<body class="easyui-layout">

	<s:if test="#request.view.type==1">
		<div region="west" split="true" style="width: 150px; padding: 3px;">
			<ul id="tree" class="ztree">
			</ul>			
		</div>
	</s:if>
	
	<div region="center" style="padding:1px">
		<table id="list">
		</table>
	</div>	
	
	
	<div id="s_div" style="position: absolute; right:10px;top:3px;display:none;">
		<s:if test="#request.options.queryList.size()>0">
			<s:if test="#request.view.searchStyle==0 || #request.view.searchStyle==5 || #request.view.searchStyle==1">
				<s:if test="#request.options.simpleQuery != null && #request.options.simpleQuery != ''">
					${options.simpleQuery}
				</s:if>
				<!-- <input type="text" name="_kw" id="_kw" value="请输入关键字" class="kw"/>
				范围:
				<select name="_field" id="_field" class="field" style="width:120px">
					<s:iterator value="#request.options.queryList" id="query">
						<s:if test="#query.displaySimple==2 || #query.displaySimple==1">
							<option value="${query.field}">${query.name}</option>
						</s:if>						
					</s:iterator>
				</select> -->				
				<a href="javascript:search.searchSimple()" id="sbtn" class="button">&nbsp;搜索&nbsp;</a>
			</s:if>
			<s:if test="#request.view.searchStyle==6 || #request.view.searchStyle==5 || #request.view.searchStyle==1">					
				<a href="javascript:search.displayAdvanced()" id="gsbtn" class="button">&nbsp;高级&nbsp;</a>					
			</s:if>
			
			<!-- 自定义高级搜索按钮 -->
			<s:if test="#request.view.searchStyle==3 || #request.view.searchStyle==4 || #request.view.searchStyle==7">
				<a href="javascript:show();" class="button">&nbsp;高级&nbsp;</a>
				<script type="text/javascript">
					function show(){
						$('#advanced').toggle('fast');
					}
				</script>
			</s:if>
		</s:if>
		
		<!-- 自定义简单搜索 -->
		<s:if test="#request.view.searchStyle==2 || #request.view.searchStyle==3 || #request.view.searchStyle==4">
			<%
				if(FileUtil.isFileExist(resource+"search"+File.separator+view.getAlias()+".jsp")){
			%>
			<jsp:include page="/${app}/js/view/search/${view.alias}.jsp" flush="true"/>
			<%		
				}else{
					//throw new Exception("未写搜索页面:"+request.getAttribute("app")+"/js/view/search/"+view.getAlias()+".jsp");
					System.out.println("未写搜索页面:"+request.getAttribute("app")+"/js/view/search/"+view.getAlias()+".jsp");
				}
			%>
			<a href="javascript:searchField();" class="button">&nbsp;搜索&nbsp;</a>
		</s:if>
	</div>
	
	<!-- 高级搜索 -->
	<div id="advanced" style="border:1px solid #7DAAD4; background:#ffffff;position:absolute;z-index:9999;display:none;width:480px;height:296px;top:40px;left:50%;margin-left:-240px;padding:0px; background-color: #E0ECFF;">
		<div id="form_toolbar">
			<button class="form_btn" style="margin-left: -360;"><img src="${path}/core/js/easyui/themes/icons/search.png"/> 高级搜索</button>
			<button class="form_btn" id="s_btn_submit"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 搜索 </button>
			<button class="form_btn" id="s_btn_close"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
		</div>
		<s:if test="#request.view.searchStyle==6 || #request.view.searchStyle==5 || #request.view.searchStyle==1">
		<table align="center" border="1" bordercolor="#99BBE8" style="border-collapse: collapse; width: 98%; margin-top: 1%;" cellpadding="5" cellspacing="0" class="form_table">
		<col width="30%">
		<col width="70%">
		<s:if test="#request.options.advancedQuery != null && #request.options.advancedQuery != ''">
			${options.advancedQuery}
		</s:if>
		<!--<s:iterator value="#request.options.queryList" id="query">
		<s:if test="#query.displaySimple==0 || #query.displaySimple==1">
		<tr>
			<th align="right" style="font-weight:bolder;color:#1b4959;">${query.name}： </th>
			<td>
				<s:if test="#query.displayType==1">
					<input id="${query.field}" name="${query.field}" type="text" style="width:98%" onclick="this.select()"/>
				</s:if>	
				<s:elseif test="#query.displayType==2">
					${query.field}
				</s:elseif>
				<s:elseif test="#query.displayType==3">
					${query.field}
				</s:elseif>
				<s:elseif test="#query.displayType==4">
					<input id="${query.field}" name="${query.field}" type="text" class="Wdate" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})" readonly="readonly" style="cursor:hand"/>
				</s:elseif>
			</td>
		</tr>
		</s:if>
		</s:iterator>	-->	
		</table>		
		
		<!-- <table width="100%">
		<tr>
			<tr>
				<td colspan="2" align="center">
					<a href="javascript:" class="button" id="s_btn_submit">&nbsp;搜索&nbsp;</a>
					&nbsp;&nbsp;
					<a href="javascript:" class="button" id="s_btn_close">&nbsp;关闭&nbsp;</a>
				</td>
			</tr>
		</tr>
		</table> -->
		</s:if>
		
		<!-- 自定义高级搜索 -->
		<s:if test="#request.view.searchStyle==3 || #request.view.searchStyle==4 || #request.view.searchStyle==7">
			<%
				if(FileUtil.isFileExist(resource+"search"+File.separator+view.getAlias()+"_advanced.jsp")){
			%>
			<jsp:include page="/${app}/js/view/search/${view.alias}_advanced.jsp" flush="true"/>
			<table width="100%">
			<tr>
				<td align="center">
					<a href="javascript:searchAdvancedField();show();" class="button">&nbsp;搜索&nbsp;</a>
					&nbsp;&nbsp;
					<a href="javascript:" class="button" id="s_btn_close">&nbsp;关闭&nbsp;</a>
				</td>
			</tr>
			</table>
			<%		
				}else{
					System.out.println("未写搜索页面:"+request.getAttribute("app")+"/js/view/search/"+view.getAlias()+"_advanced.jsp");
				}
			%>	
		</s:if>
	</div>
	
	
	<table id="tableExcel" style="display:none;width:100%"></table>
	<!-- 动态加载JS -->
	<script type="text/javascript" src="${path}/core/view/js/view_api.js"></script>
<!--<script type="text/javascript" src="${path}/core/view/js/view_grid.js"></script>-->
	<%@include file="js/view_grid.js.jsp"%>
	<%
		if(FileUtil.isFileExist(realPath + "core/"+request.getAttribute("app")+"/js/view/" + view.getAlias() + ".js")){
	%>
	<script type="text/javascript" src="core/${app}/js/view/${view.alias}.js"></script>
	<%		
		}
	%>
	<%
		if(FileUtil.isFileExist(realPath + request.getAttribute("app") + "/js/view/" + view.getAlias() + ".js")){
	%>
	<script type="text/javascript" src="${path}/${app}/js/view/${view.alias}.js"></script>
	<%
		}
	%>
	<!-- 任何系统模式下加载视图core的js begin -->
	<s:if test="#request.app != 'core'">
	<%
		if(FileUtil.isFileExist(realPath + "/core/js/view/" + view.getAlias() + ".js")){
	%>
	<script type="text/javascript" src="${path}/core/js/view/${view.alias}.js"></script>
	<%
		}
	%>
	</s:if>
	<!-- 任何系统模式下加载视图core的js end -->
	<%
		try{			
			if(FileUtil.isFileExist(resource+view.getAlias()+".jsp")){
	%>
	<jsp:include page="/${app}/js/view/${view.alias}.jsp" flush="true"/>
	<%			
			}			
		}catch(Exception e){}
	%>
	<s:iterator value="#request.subBtnList" id="btn">
		<script type="text/javascript" src="${path}/${btn.fn_path}"></script>					
	</s:iterator>
</body>

</html>