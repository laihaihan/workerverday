<%@ page language="java" pageEncoding="utf-8"%>
<%@page import="com.linewell.core.buildermodule.info.BuilderModuleInfo"%>
<%@page import="com.linewell.core.buildermodule.info.BuilderModuleInfoManager"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@page import="com.linewell.core.buildermodule.detail.BuilderModuleDetailManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.buildermodule.detail.BuilderModuleDetail"%>
<%@page import="com.linewell.core.util.ListUtil"%>
<%@include file="/core/params.jsp" %>
<%
String fn = "update";
String unid = request.getParameter("unid");
BuilderModuleInfo builderModuleInfo = new BuilderModuleInfoManager().doFindBeanByKey(unid);
if (null == builderModuleInfo) {
	fn = "add";
	builderModuleInfo = new BuilderModuleInfo();
	builderModuleInfo.setUnid(new UNIDGenerate().getUnid());
}
BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
Object[] objs = new Object[1];
objs[0] = builderModuleInfo.getUnid();
List<BuilderModuleDetail> detailList = builderModuleDetailManager.doFindListByCondition("punid=?",objs);

request.setAttribute("builderModuleInfo", builderModuleInfo);
%>
<HTML>
<head>
	${import_jquery}
	${import_easyui}
	${import_theme}
 <script type="text/javascript" src="${path}/core/js/json2.js"></script>
 <link rel="stylesheet" type="text/css" href="${path}/core/js/form/skypebuttons/style.css">

</head>
<body>
<div id="form_toolbar">
		<button class="form_btn" id="btnGen"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 生成 </button>
		<button class="form_btn" id="btnTableGen"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 反向生成 </button>
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
		<form id="jspForm" name=jspForm method="post" action="${path}/buildermodule.action" >
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=builderModuleInfo.getUnid()%>">
			<table width="98%" class="form_table">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<tr>
					<th height="26" align="right" nowrap>标题：</th>
					<td align="left">
						<input style="width:100%" type="text" name="titile" id="titile" value="${builderModuleInfo.titile}" size="30"  style="height:30px;line-height:25px;font-size:15px"/>
					</td> 
					<th height="26" align="right" nowrap>是否有附件：</th>
					<td align="left">
						<select  name="ishavefile" >
						<option value="1"  <%=builderModuleInfo.getIshavefile()==1?" selected='selected'":"" %>>是</option>
						<option value="0"  <%=builderModuleInfo.getIshavefile()==0?" selected='selected'":"" %>>否</option>
						</select>
					</td> 
				</tr>
				<tr>
					<th height="26" align="right" nowrap>反向生成（现有表）：</th>
					<td align="left">
						<input name="sp_table" type="text" id="sp_table" readonly value="${builderModuleInfo.tablename}">
						<input type="button" class="btnOnlyChannel" id="btntablename">
					
					</td> 
					<th height="26"  align="right" nowrap>所属显示模块：</th>
					<td align="left">
						<input type="text" name="belongtomodulename" id="belongtomodulename" value="${builderModuleInfo.belongtomodulename}" size="30"/>&nbsp;
						<input type="hidden" name="belongtomoduleunid" id="belongtomoduleunid" value="${builderModuleInfo.belongtomoduleunid}"/>&nbsp;
						<input type="button" class="btnOnlyChannel"  id="btnmodulename">
					</td>
				</tr>
				<tr>
					<th height="26" align="right" nowrap>类名：</th>
					<td align="left">
						<input  style="width:100%" name="classname" type="text" id="classname"  value="${builderModuleInfo.classname}">
					</td> 
					<th height="26" align="right" nowrap>包名：</th>
					<td align="left">
						<input  style="width:100%" name="packname" type="text" id="packname"  value="${builderModuleInfo.packname}">
					</td> 
				</tr>
				
				
			</table>
			
	    	<table width="98%"  id="mytable"  class="form_table">
	    	<tr> <td colspan="5" align="right">   <a class="button" href="#" id="add">增加一行</a> </td></tr>
	        <tr align="center">
	    	    <th align="left" style="width:25%">中文名</th>
	    	    <th align="left" style="width:10%">视图显示列</th>
	    	    <th align="left" style="width:25%">字段名（默认拼音首字母）</th>
	    	    <th align="left" style="width:20%">长度（默认500）</th>
	    	    <th  align="center" style="width:10%">操作</th>
	        </tr>
	        <%
	        if(ListUtil.isNull(detailList)){
	        	 %>	
          	<tr id="detail" name="detail">
	            <td><input style="width:100%" name="caption" type="text"  /><input type="hidden" name="dunid" value=""></td>
	            <td><input style="width:100%" name="isshowinviewbox" type="checkbox" value="1" onchange="setIsShowInView(this)"/>
	            <input type="hidden" name="isshowinview" value=""></td>
	            <td><input style="width:100%" name="enname" type="text"/></td>
	            <td><input style="width:100%" name="lengthlimit" type="text"/></td>
	          	<th><a onclick="delrow(this)" href="#">删除</a></th>
	         </tr>
         	    <%
	        }else{
        	 	for(BuilderModuleDetail builderModuleDetail:detailList){
            	    %>	
            	  <tr id="detail" name="detail">
		            <td><input style="width:100%" name="caption" type="text" value="<%=builderModuleDetail.getCaption()%>"/><input type="hidden" name="dunid" value="<%=builderModuleDetail.getUnid() %>"></td>
	            	<td><input style="width:100%" name="isshowinviewbox" <%=builderModuleDetail.getIsshowinview() == 1?" checked='checked'":""%> type="checkbox" value="1" onclick="setIsShowInView(this)"/>
	            	 <input type="hidden" name="isshowinview" value="<%=builderModuleDetail.getIsshowinview()%>"></td>
		            <td><input style="width:100%" name="enname" type="text"  value="<%=builderModuleDetail.getEnname()%>"/></td>
		            <td><input style="width:100%" name="lengthlimit" type="text"  value="<%=builderModuleDetail.getLengthlimit()%>"/></td>
		          	<th><a onclick="delrow(this,'<%=builderModuleDetail.getUnid() %>')" href="#">删除</a></th>
		         </tr>
            	    <%
     	          }
	        }
	       
	        %>
	       	 
	        </table>
		</form>
</body>
</html>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		$("#btnGen").bind("click",doGen);
		$("#btnTableGen").bind("click",btnTableGen);
		$("#btntablename").bind("click",selTable);
		//事件绑定部分
		
        $(".button").hover(function(){
            $(".button img")
            .animate({top:"-10px"}, 200).animate({top:"-4px"}, 200) // first jump
            .animate({top:"-7px"}, 100).animate({top:"-4px"}, 100) // second jump
            .animate({top:"-6px"}, 100).animate({top:"-4px"}, 100); // the last jump
        });
		
		var tr; 
		//增加行
		$("a#add").click(function(){
			//当行没有全删，则直接复制行，全删时，则用副本复制行
			if(tr==null){
				var trObj =  $("#detail").clone();
					trObj.find("input").each(function(){
					if($(this).attr("name") ==  "dunid"){
						$(this).val("11111");
					}
				});
				trObj.appendTo($("#mytable"));
			}else{
				var trObj = tr.clone();
				trObj.find("input").each(function(){
					$(this).attr("name");
				});
				trObj.appendTo($("#mytable"));
			}
		});
		
		$('#btnmodulename').bind('click',function(){
			window.showModalDialog("${path}/lw-admin/win7/moduleTree.jsp?belongToApp=<%=uappUnid%>&id=belongtomoduleunid&name=belongtomodulename",window);
		});
		
	});
	
	function selTable(){
		var jndiName = "<%=uSession.getApp().getUnid()%>";
		var selectTable = $("#sp_table").val();
		top.lwin.open("GenCode.action?jndiName="+jndiName+"&selectTable="+selectTable+"&fn=showAllTable","选择表",520,450);
	}
	
	function btnTableGen(){
		$.ajax({
			type:'post',
			url:"${path}/buildermodule.action?fn=genByTable&unid=<%=builderModuleInfo.getUnid()%>&tablename="+$("#sp_table").val(),
			async:false,
			error:function(){
				top.lwin.alert('信息提示','操作失败！','info',1500);
			},
			success:function(data){
				top.lwin.alert('信息提示','操作成功','info',2500);
				window.location.href="buildermoduleinfo_edit.jsp?unid=<%=builderModuleInfo.getUnid()%>";
				
			}
		});
	}
	
	
	//复选框是否选中
	function setIsShowInView(obj){
		if($(obj).attr("checked") ==  true){
			$(obj).parent().find("input").each(function(){
				if($(this).attr("name") ==  "isshowinview"){
					$(this).val("1");
				}
			});
		}else{
			$(obj).parent().find("input").each(function(){
				if($(this).attr("name") ==  "isshowinview"){
					$(this).val("0");
				}
			});
		}
		
	}
	
	//保存表单信息
	function doSave(){
		if(checkColumns("caption")){
			top.lwin.alert('信息提示','中文名不允许重复','info',1500);
			return;
		}
	
	
		if(checkColumns("enname")){
			top.lwin.alert('信息提示','字段名不允许重复','info',1500);
			return;
		}
	
		//TODO 数据格式验证
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
			}
		});
	}
	
	
	//判断值是否重复
	//
	function checkColumns(inputname){
		var count = 0;
		var flag = false;
	    $("input[name='"+inputname+"']").each(function(){
	       	var wVal = $(this).val();
	       	count = 0;
	   		$("input[name='"+inputname+"']").each(function(){
	   			var iVal = $(this).val();
	   			if(wVal == iVal){
	   				count = count + 1;
	   			}
	   			if(count >=2 && iVal!=""){
	   				flag = true;
	   				$(this).css("color","red");
	   				return false;
	   			}
	   		});
	    });
	    return flag;
	}
	
	
	
	function doGen(){
		$.ajax({
			type:'post',
			url:"${path}/buildermodule.action?fn=genModule&unid=<%=builderModuleInfo.getUnid()%>",
			async:false,
			error:function(){
				top.lwin.alert('信息提示','操作失败！','info',1500);
			},
			success:function(data){
				top.lwin.alert('信息提示','操作成功','info',2500);
				
			}
		});
	}
	
	
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}

	function delrow(obj,unid){
		if($("tr[name=detail]").length<=1){
			alert('最后一行不能删除');
			return ;
		}
		
		//删除服务端数据
		$.ajax({
			type:'post',
			url:"${path}/buildermoduledetail.action?fn=del&ids='"+unid+"'",
			async:false,
			error:function(){
				top.lwin.alert('信息提示','删除失败','info',1500);
			},
			success:function(html){
				$(obj).parent().parent().remove();
			}
		});
	}
	</script>