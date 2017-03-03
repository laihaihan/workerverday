<%@ page language="java" pageEncoding="UTF-8" %>
<%@page import="com.linewell.core.dict.ApasDictBussiness"%>
<%@page import="com.linewell.core.util.ClobUtil"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%
	ApasDictBussiness apasDictBussiness=new ApasDictBussiness();
%>
<form action="${path}/rsp/wasServiceAction.action" method="post" id="jspForm" name="jspForm">
<input type="hidden" name="fn" id="fn" value="${fn}" />
<input type="hidden" name="unid" id="unid" value="${service.unid}" /> 
<input type="hidden" name="status" id="status" value="${service.status}" /> 
<input type="hidden" name="deptunid" id="deptunid" value="${service.deptunid}" />
<input type="hidden" name="siteid" id="siteid" value="${service.siteid}" />
<input type="hidden" name="datafrom" id="datafrom" value="0" />
<table>
	<col width="15%" align="right">
	<col width="40%">
	<col width="15%" align="right">
	<col width="30%">
  	<tr>
	    <th><font color="#ff0000">*</font>事项名称：</th>
	    <td colspan="3">
	    	<input type="text" name=servicename value="${service.servicename}" style="width:90%"/>
	    </td>
  	</tr>
  	<tr>
    	<th><font color="#ff0000">*</font>事项类别：</th>
    	<td>
	        <select name="addtype" id='addtype' >
	            <OPTION value="">--请选择类型--</OPTION>
	            <%=apasDictBussiness.getSelectList("serviceAddType", service.getAddtype())%>
	        </select>
	  	</td>
	    <th><font color="#ff0000">*</font>办件类型：</th>
	    <td>
	        <select name="servicetype" id='servicetype'  >
	         <OPTION value="">--请选择类型--</OPTION>
	            <%=apasDictBussiness.getSelectList("serviceServiceType", service.getServicetype())%>
	        </select>
	  	</td>
  	</tr>
	<tr>
	    <th><font color="#ff0000">*</font>事项编码：</th>
	    <td>
	    	<input type="text" name=infoprojid id='infoprojid' value="${service.infoprojid}"/>
	    </td>
	    <th><font color="#ff0000">*</font>所属部门：</th>
	    <td>
	    	<input type="text" name=deptname id=deptname style="width:70%" readonly value="${service.deptname}"/>
	    	<input type="button" class="btnOnlyChannel"  id="dept_button" onclick="selectDept();"/>
	 	</td>
	</tr>
	<tr>
	    <th><font color="#ff0000">*</font>法定期限：</th>
	    <td>
	    	<input type="text" name='lawlimit' value="${service.lawlimit}"/>&nbsp;天
	    </td>
	    <th>预审期限：</th>
	    <td>
			<input type="text" name=preday style="width:70%" value="${service.preday}"/>&nbsp;天
	    </td> 
	</tr>
	<tr>
	    <th><font color="#ff0000">*</font>承诺期限：</th>
	    <td>
	    	<input type="text" name="promiseday" id="promiseday" value="${service.promiseday}"/>
	       	<select name="promisetype" id="promisetype"  style="width:60px">
		       	<option value="0" ${service.promisetype == "0" ? "selected" : ""} >工作日</option>
		       	<option value="1"  ${service.promisetype == "1" ? "selected" : ""}>工作小时</option>
	       	</select>		       
	    </td>
	    <th>电话号码：</th>
	    <td>
	    	<input type="text" name='contactphone' style="width:70%" value="${service.contactphone}"/>
	   	</td>
	</tr>
	<tr>
	    <th>事项归类：</th>
	    <td>
	        <select name="property"  >
	            <OPTION value="">--请选择分类--</OPTION>
	            <%=apasDictBussiness.getSelectList("serviceProperty", service.getProperty())%>
	        </select>
	    </td>
	    <th>排序号：</th>
	    <td>
	    	<input type="text" name=sortid style="width:70%" value="${service.sortid}"/>
	    </td>
	</tr>
	<tr>
	    <th>面向用户：</th>
	    <td>
	        <select name="foruser" id="foruser"  style="font-size:12px;width:75%">
	            <OPTION value="">--请选择分类--</OPTION>
	            <%=apasDictBussiness.getSelectList("serviceForuser", service.getForuser())%>
	        </select>
	    </td>
	     <th>显示情况：</th>
	    <td colspan="3">
	        <select id="SelectStudy" name=showtype   style="width:250">
	            <%=apasDictBussiness.getSelectList("serviceShowType", service.getShowtype())%>
	        </select>
	    </td>
	</tr>
	<tr>
	    <th>受理时间说明：</th>
	    <td colspan="3">
	    	<input type="text" id="accepttime" name=accepttime value="${service.accepttime}" style="width:90%"/>
	    </td>
	</tr>
	<tr>
	    <th>受理地址说明：</th>
	    <td colspan="3">
	    	<input type="text" id="acceptaddress" name=acceptaddress value="${service.acceptaddress}" style="width:90%"/>
	    </td>
	</tr>
	<tr>
	    <th>收费标准及依据：</th>
	    <td colspan="3">
	    	<textarea name="chargetype" rows="5" style="width:90%">${service.chargetype}</textarea>
		</td>
	</tr>
	<tr>
	    <th>申请条件：</th>
	    <td colspan="3">
	    	<textarea id="applyterm" name="applyterm" rows="5" style="width:90%"><%=StrUtil.formatNull(ClobUtil.clobToStr(service.getApplyterm()))%></textarea>
	    </td>
	</tr>
	<tr>
	    <th>法定期限说明：</th>
	    <td colspan="3">
	    	<textarea id="lawlimitinfo" name="lawlimitinfo" rows="5" style="width:90%">${service.lawlimitinfo}</textarea>
	    </td>
	</tr>
	<tr>
	    <th>承诺期限说明：</th>
	    <td colspan="3">
	    	<textarea id="promisdayinfo" name="promisdayinfo" rows="5" style="width:90%">${service.promisdayinfo}</textarea>
	    </td>
	</tr>
	<tr>
	    <th>办理程序：</th>
	    <td colspan="3">
	    	<textarea id="procedure" name="procedure" rows="5" style="width:90%"><%=StrUtil.formatNull(ClobUtil.clobToStr(service.getProcedure()))%></textarea>
	    </td>
	</tr>
	<tr>
	    <th>许可依据：</th>
	    <td colspan="3">
	    	<textarea id="according" name="according" rows="5" style="width:90%"><%=StrUtil.formatNull(ClobUtil.clobToStr(service.getAccording()))%></textarea>
	    </td>
	</tr>
	<tr>
	    <th>监督投诉：</th>
	    <td colspan="3">
	    	<textarea id="monitorcomplain" name="monitorcomplain" rows="5" style="width:90%">${service.monitorcomplain}</textarea>
	    </td>
	</tr>
	<tr>
	    <th>备注：</th>
	    <td colspan="3">
	    	<textarea id="memo" name="memo" rows="5" style="width:90%">${service.memo}</textarea>
	    </td>
	</tr>
</table>
</form>
