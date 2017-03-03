<%@ page language="java" pageEncoding="UTF-8" %>
<form action="${path}/rsp/wasInfoAction.action" method="post" id="jspForm" name="jspForm">
<input type="hidden" name="fn" id="fn" value="<%=fn%>" />
<input type="hidden" name="unid" value="${info.unid}" />
<input type="hidden" name="serviceid" value="${service.unid}" />
<input type="hidden" name="servicename" value="${service.servicename}" />
<input type="hidden" name="infotype" value="单件" />
<input type="hidden" name="applyfrom" value="内网" />
<input type="hidden" name="datafrom" value="0" />
<input type="hidden" name="siteid" value="<%=request.getParameter("siteid") %>">
<input type="hidden" name="servicetype" value="${service.servicetype}">
		
<table cellpadding="0" cellspacing="1"   class="p_table01">
	<col width="12%" align="right">
	<col width="33%">
	<col width="10%" align="right">
	<col width="45%">
	<tr>
    	<th height="26" align="right" nowrap>所属部门：</th>
        <td colspan="3" align="left">${service.deptname}</td>
   	</tr>
    <tr>
        <th height="26" align="right" nowrap>审批事项：</th>
        <td align="left">${service.servicename} <img src="${path}/core/themes/default/images/admin/control-double-270.png" style="vertical-align: middle;cursor:hand;" title="复制到申报名称" onclick="$('#projectname').val('${service.servicename}')"/></td>
        <th height="26" align="right" nowrap>审批类型：</th>
        <td align="left">${service.servicetype}</td>
    </tr>
	<tr>
        <th height="26" align="right" nowrap><font color="#ff0000">*</font>申报名称：</th>
        <td colspan="3" align="left">
         	<input type="text" id="projectname" name=projectname style="width:75%" value="${info.projectname}"/>
        </td>
    </tr>            
    <tr>
        <th height="26" align="right" nowrap><font color="#ff0000">*</font>申请人/单位：</th>
        <td colspan="3" align="left">
          	<input type="text" name="applyname" id="applyname" style="width:75%" value="${info.applyname}"/>
          	&nbsp;
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap><font color="#ff0000">*</font>手机：</th>
        <td align="left">
            <input type="text" name="mobile" id="mobile" style="width:90%" value="${info.mobile}"/>
        </td>
        <th height="26" align="right" nowrap><font color="#ff0000">*</font>联系人：</th>
        <td align="left">
            <input type="text" id="contactman" name="contactman" style="width:60%" value="${info.contactman}"/>
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>电话：</th>
        <td align="left">
            <input type="text" name="phone" id="phone" style="width:90%" value="${info.phone}"/>
        </td>
        <th height="26" align="right" nowrap>法人代表：</th>
        <td align="left">
            <input type="text" name="legalman" id="legalman"  style="width:60%" value="${info.legalman}"/>
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap><font color="#ff0000">*</font>地址：</th>
        <td align="left">
            <input type="text" name="address" id="address" style="width:90%" value="${info.address}"/>
        </td>
        <th height="26" align="right" nowrap>邮编：</th>
        <td align="left">
            <input type="text" name="postcode" style="width:60%" value="${info.postcode}"/>
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>备注：</th>
        <td colspan="3" align="left">
            <textarea id="memo" name="memo" style="width:80%;height:50px;">${info.memo}</textarea>
        </td>
    </tr>
</table>
</form>
