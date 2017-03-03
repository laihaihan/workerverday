<%@ page language="java" pageEncoding="UTF-8" %>
<table width="100%" border="1" align="center" cellpadding="1" cellspacing="0" bordercolorlight="#A5B6C8" bordercolordark="#FFFFFF" style="display:block">
<col width="30" align="center"/>
<col width="25%"/>
<col width="8%"/>
<col width="22%" align="center"/>
<col width="100" align="center"/>
<col/>
<tr>
	<th align="center">序号</th>
	<th align="center">材料名称</th>
	<th align="center">份数</th>
	<th align="center">备注</th>
	<th align="center">收取方式</th>
	<th align="left">文件操作
		<font color="red">
			[全选/反选<input type="checkbox" name="attrcheckbox" id="attrcheckbox">]
		</font>
	</th>
</tr>
<s:if test="#request.materialList.size()>0">
	<s:iterator value="#request.materialList" id="material" status="status">
	<input type="hidden" name="materialUnid" value="${material.unid}"/>
	<input type="hidden" name="${material.unid}_unid" value="${empty (material.attrList)?'':material.attrList[0].unid}"/>		
	<input type="hidden" name="${material.unid}_name" value="${material.infoname}"/>
	<input type="hidden" name="${material.unid}_fromshare" value=""/>
	<tr id="${material.unid}_tr">
		<td>${status.index+1}、</td>
		<td height="26" align="left" valign="middle">${material.infoname}</td>
		<td><input type="text" name="${material.unid}_amount" style="width:90%" value="${empty material.attrList[0].amount ? 1 : material.attrList[0].amount}"></td>
		<td><input type="text" name="${material.unid}_memo" style="width:95%" value="${material.attrList[0].memo}"></td>
		<td align="left" valign="middle" nowrap >
			<select name="${material.unid}_savestate" class="getTypes">
				<s:iterator value="#material.getTypeList" id="getType">
					<s:if test="#material.attrList.size()>0">
						<option value="${getType.value}" ${material.attrList[0].savestate eq getType.value?'selected':''}>${getType.name}</option>
					</s:if>
					<s:else>
						<option value="${getType.value}">${getType.name}</option>
					</s:else>
				</s:iterator>
			</select>
		</td>
		<td>
			<!-- 引入不同材料收取方式的显示页面 -->
			<s:iterator value="#material.getTypeList" id="getType">
				<span class="sp_${getType.value}" style="display:none;">
					<s:if test="#getType.html_url != null && #getType.html_url != ''">
						<jsp:include page="/was/jsp/info/bussiness/attrs/${getType.html_url}" flush="true"/>
					</s:if>
					<s:else>
						&nbsp;
					</s:else>
				</span>
			</s:iterator>
		</td>
	</tr>
	</s:iterator>
</s:if>
<s:else>
	<tr><td colspan="8" align="center" style="color:red;height:30px;">无需收取材料</td></tr>
</s:else>
</table>
<div style="height:30px;"></div>
<script type="text/javascript">
	$(function(){
		$("#attrcheckbox").bind("click",selectAll);
		$(".getTypes").bind("change",changeGetType);
		$(".getTypes").each(function(index,item){
			var selectedValue = $(item).val();
			$(item).parent().next().find(".sp_" + selectedValue).show();
		})
	});

	//材料全部选取
	function selectAll(){
		if(jQuery(":checkbox[name=attrcheckbox]").attr("checked")){
			jQuery(".ischeck option[value=Y]").attr("selected",true);
		}else{
			jQuery(".ischeck option[value=N]").attr("selected",true);
		}
	}			
	
	
	//提取共享材料
	function getShareLibAttr(materialid){
		if(checkShareLibUser(1)){
			//var url = "/core/sharelib/sharelib_attr_list.jsp?type=1&userunid="+$("#sharelib_user_unid").val()+"&materialid="+materialid;
			var url = "/core/rsp/rspsharemapping_list.jsp?type=1&userunid="+$("#sharelib_user_unid").val()+"&materialid="+materialid+"&applyname="+$("#applyname").val();
			//var url = "/core/rsp/rspresourcebaseinfo_list.jsp?type=1&userunid="+$("#sharelib_user_unid").val()+"&materialid="+materialid;
			top.popup.showModalDialog(url,'共享材料',500,350);
		}
	}
	
	
	
	//材料收取方式切换
	function changeGetType(){
		var eventObj = $(window.event.srcElement);
		var selectedValue = eventObj.val();
		var parent = eventObj.parent().next();
		parent.find('span').each(function(index,item){
			if($(item).attr("class") == "sp_" + selectedValue){ 
				$(item).show();
			}else{
				$(item).hide();
			}
		});
	}
</script>

<!-- 引入不同材料收取方式的样式及脚本 -->
<s:iterator value="#material.getTypeList" id="getType">
	<s:if test="#getType.other_url != null && #getType.other_url != ''">
		<jsp:include page="/was/jsp/info/bussiness/attrs/${getType.other_url}" flush="true"/>
	</s:if>
</s:iterator>