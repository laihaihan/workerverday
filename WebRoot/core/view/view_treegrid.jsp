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
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<%
	View view = (View)request.getAttribute("view");
	String resource = String.valueOf(request.getAttribute("resource"))+File.separator;
	
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
	
	<link type="text/css" rel="stylesheet" href="${theme}">
	${import_jquery}
	${import_easyui}
	
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
		
		var view = <%=JSONObject.fromObject(request.getAttribute("view"))%>;
		
		if(top.clientWidth<=viewWidth){
			viewWidth = top.clientWidth-30;
		}
		if(top.clientHeight<=viewHeigth){
			viewHeigth = top.clientHeight-30;							
		}
		
		$(function(){
			$('#list').treegrid({				
				width:$("div[region=\"center\"]").width(),
				height:$("div[region=\"center\"]").height(),
				rownumbers:${view.rownumbers eq '1'?'true':'false'},
				pagination:true,
				fitColumns:true,
				striped:true,
				nowrap:true,	
				url:'view.action',				
				queryParams:{
					fn:'treegrid_list',
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
				treeField:'SERVICENAME',
				singleSelect:false,
				frozenColumns:[[${frozenColumns}]],
				columns:[${columns}],	
				toolbar:[${toolbar}],
				onLoadSuccess:function(){
					$('#list').datagrid("clearSelections");
				},
				onDblClickRow:function(row){		
					if('${view.openType}'=='1'){						
						if(top.clientWidth<=viewWidth){
							viewWidth = top.clientWidth-30;
						}
						if(top.clientHeight<=viewHeigth){
							viewHeigth = top.clientHeight-30;							
						}
						top.lwin.open('${view.openContent}'+row['${options.idField}'],'${view.name}',viewWidth,viewHeigth);
					}
				},
				onClickRow:function(rowIndex, rowData){					
					var rowLength = $('#list').datagrid("getSelections").length;
					if(rowLength>1){
						$('#list').datagrid("clearSelections");
						$('#list').datagrid("selectRow",rowIndex);
					}					
				},
				onLoadSuccess:function(){
					$('#list').datagrid("clearSelections");
				},
				//解决分页
				onBeforeLoad:function(){						
					var page = $('#list').treegrid('getPager').pagination('options').pageNumber;
										
					var url = $('#list').treegrid('options').url;					
					if(url.indexOf('&page')>-1 ){
						url = url.substring(0,url.indexOf('&page'));
						
					}else if(url.indexOf('?page')>-1 ){		
						url = url.substring(0,url.indexOf('&page'));
					}	
					
					if(url.indexOf("?")>-1){
						url += '&page='+page;
					}else{
						url += '?page='+page;
					}							
					
					$('#list').treegrid('options').url = url;
				}
			});	
			
			
			//显示模块树
			<s:if test="#request.view.type==1">
			var setting = {
				async:{
					enable: true,
					url:"tree.action?fn=tree&class=${view.treeClass}&"+encodeURI("<%=StringUtils.substringAfter(queryString,"&")%>"),
					autoParam:["id"]
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
				var url = 'view.action?_rand=1&_search=3&fn=treegrid_list&viewId=${view.unid}';
				<s:iterator value="#request.options.treeSetting.paramList" id='params'>
					url+='&<s:property value="#params.toUpperCase()"/>='+treeNode.${params};
				</s:iterator>
				url+='&ID='+treeNode.id;
				
				$('#list').treegrid('getPager').pagination('options').pageNumber = 1;	
				$('#list').treegrid('options').url = url+'&page=1';
				$('#list ').treegrid('reload');  
			}
			</s:if>
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
				<input type="text" name="_kw" id="_kw" value="请输入关键字" class="kw"/>
				范围:
				<select name="_field" id="_field" class="field" style="width:120px">
					<!-- <option value="">全部</option>  -->
					<s:iterator value="#request.options.queryList" id="query">
						<s:if test="#query.displaySimple==2 || #query.displaySimple==1">
							<option value="${query.field}">${query.name}</option>
						</s:if>						
					</s:iterator>
				</select>				
				<a href="javascript:searchSimple()" id="sbtn" class="button">&nbsp;搜索&nbsp;</a>
			</s:if>
			<s:if test="#request.view.searchStyle==6 || #request.view.searchStyle==5 || #request.view.searchStyle==1">					
				<a href="javascript:search.displayAdvanced()" id="gsbtn" class="button">&nbsp;高级&nbsp;</a>					
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
			<!-- 自定义高级搜索 -->
			<s:if test="#request.view.searchStyle==3 || #request.view.searchStyle==4 || #request.view.searchStyle==7">
				<a href="javascript:show();" class="button">&nbsp;高级&nbsp;</a>
				<script type="text/javascript">
					function show(){
						$('#advanced').toggle('fast');
					}
				</script>
			</s:if>
		</s:if>
	</div>
	
	
	
	<!-- 高级搜索 -->
	<div id="advanced" style="border:1px solid #7DAAD4; background:#ffffff;position:absolute;z-index:9999;display:none;width:480px;height:296px;top:40px;left:50%;margin-left:-240px;padding:5px;">
		<s:if test="#request.view.searchStyle==6 || #request.view.searchStyle==5 || #request.view.searchStyle==1">
		<table width="100%" border="1" bordercolor="#99BBE8" style="border-collapse: collapse" cellpadding="5" cellspacing="0" class="form_table">
		<col width="30%">
		<col width="70%">
		<s:iterator value="#request.options.queryList" id="query">
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
		</s:iterator>		
		</table>		
		
		<table width="100%">
		<tr>
			<tr>
				<td colspan="2" align="center">
					<a href="javascript:" class="button" id="s_btn_submit">&nbsp;搜索&nbsp;</a>
					&nbsp;&nbsp;
					<a href="javascript:" class="button" id="s_btn_close">&nbsp;关闭&nbsp;</a>
				</td>
			</tr>
		</tr>
		</table>
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
	
	
	
	<!-- 动态加载JS -->
	<script type="text/javascript">
		
		//未定义按钮提示
		<s:iterator value="#request.options.btnFnList" id='btn'>	
		function ${btn}(){
			alert("按钮方法${btn}未定义!请在文件${path}/${app}/js/view/${view.alias}.js或${view.alias}.jsp定义");
		}
		</s:iterator>
		
		//未定义列转换函数提示
		<s:iterator value="#request.options.columnFormatterList" id='btn'>	
		function ${btn}(val,rowData,rowIndex){
			if(rowIndex==0){
				alert("列转换方法${btn}未定义!请在文件${path}/${app}/js/view/${view.alias}.js或${view.alias}.jsp定义");
			}
			return val;				
		}
		</s:iterator>
		
		//高级搜索
		$('#s_btn_submit').click(function(){
			searchAdvancedField();		
			$('#advanced').hide('fast');
		});
		
		//搜索所有字段
		function searchField(){
			$('#list').datagrid("load",{
				fn:'grid_list',
				viewId:viewId,
				_search:"3",				
				<s:iterator value="#request.options.sqlParams" id="query">
					<s:if test="#request.view.type==1 && #query=='ID'">
					ID:zTreeObj.getSelectedNodes()[0].id,
					</s:if>
					<s:else>
					${query}:$('#${query}').val(),
					</s:else>		
				</s:iterator>				
				onLoadSuccess:function(){
					
					setTimeout(function(){
						try{
							<s:iterator value="#request.options.sqlParams" id="query">
							$(".datagrid-body .datagrid-cell").highlight($('#${query}').val());
							</s:iterator>	
						}catch(e){}											
					},500);
							
				}
			});	
		}
		
		function searchSimple(){
			var _kw = $("#_kw").val();
			var _field = $("#_field").val();
			
			if(_kw=='请输入关键字'){
				top.$.messager.alert("信息提示","请输入关键字","info");
				fadeOutMessage(1000);
			}else{
				/*
				$('#list').treegrid("load",{
					fn:'grid_list',
					viewId:viewId,
					_kw:_kw,
					_field:_field,
					_search:"1",
					ID:getTreeId(),
					onLoadSuccess:function(){
						setTimeout(function(){
							$(".datagrid-body .datagrid-cell").highlight(_kw);
						},500);
						
					}
				});	
				*/
				var treeNode = zTreeObj.getSelectedNodes()[0];
				var url = 'view.action?_rand=1&_search=1&fn=treegrid_list&viewId=${view.unid}&_kw='+encodeURI(_kw)+'&_field='+_field;
				
				if(treeNode){
					<s:iterator value="#request.options.treeSetting.paramList" id='params'>
						url+='&<s:property value="#params.toUpperCase()"/>='+treeNode.${params};
					</s:iterator>
					url+='&ID='+treeNode.id;
				}
				
				$('#list').treegrid('getPager').pagination('options').pageNumber = 1;	
				$('#list').treegrid('options').url = url+'&page=1';
				$('#list ').treegrid('reload');  
			}			
		}
		
		//搜索所有高级字段
		function searchAdvancedField(){
			$('#list').datagrid("load",{
				fn:'grid_list',
				viewId:viewId,
				_search:"3",
				<s:iterator value="#request.options.sqlParams" id="query">
					<s:if test="#request.view.type==1 && #query=='ID'">
						ID:zTreeObj.getSelectedNodes()[0].id,
					</s:if>
					<s:else>
						${query}:getFieldVal('${query}'),
					</s:else>		
				</s:iterator>
				onLoadSuccess:function(){
					
					setTimeout(function(){
						try{
							<s:iterator value="#request.options.sqlParams" id="query">
							$(".datagrid-body .datagrid-cell").highlight($('#advanced :text[name=${query}]').val());
							</s:iterator>	
						}catch(e){}											
					},500);
							
				}
			});	
		}
		//刷新树
		function refreshTree(){
			if(zTreeObj){
				var node = zTreeObj.getSelectedNodes()[0];
				if(!node){
					zTreeObj.reAsyncChildNodes(null,'refresh');
					return ;
				}				
				
				$.ajax({
					url:"tree.action?fn=tree&class=${view.treeClass}&modId=<%=request.getParameter("modId")%>&id="+node.id,
					async:false,
					cache:false,
					error:function(){				
					},
					success:function(result){
						if( eval(result).length>0 ){
							if(!node.isParent){
								node.isParent = true;
								zTreeObj.updateNode(node);
							}							
						}else{
							if(node.isParent){
								node.isParent = false;
								zTreeObj.updateNode(node);
							}
						}						
					}
				});
				
				zTreeObj.reAsyncChildNodes(node,'refresh');		
			}		
		}
	</script>
	
	<script type="text/javascript" src="${path}/core/view/js/view_api.js"></script>
	<%@include file="js/view_grid.js.jsp"%>
	<script type="text/javascript" src="${path}/${app}/js/view/${view.alias}.js"></script>
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
