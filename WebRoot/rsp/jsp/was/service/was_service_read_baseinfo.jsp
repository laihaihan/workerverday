<%@ page language="java" pageEncoding="UTF-8" %>

<table cellpadding="0" cellspacing="1"   class="p_table01">
	<col width="20%">
	<col width="80%">
	<tr>
		<th>事项名称：</th>
		<td>${service.servicename}</td>
	</tr>
	<tr>
		<th>事项编码：</th>
		<td>${service.infoprojid}</td>
	</tr>
	<tr>
        <th>事项类型：</th>
        <td>${service.addtype}&nbsp;</td>
	</tr>
	<tr>
         <th>行使依据：</th>
         <td>
         <s:property value="@com.linewell.core.util.ClobUtil@clobToStr(#request.service.according)"/>
         &nbsp;</td>
	</tr>
    <tr>
         <th>受理条件：</th>
         <td>
         <s:property value="@com.linewell.core.util.ClobUtil@clobToStr(#request.service.applyterm)"/>
         &nbsp;</td>
    </tr>
	<tr>
		<th>&nbsp;办理流程：</th>
	   	<td>
	   	<s:property value="@com.linewell.core.util.ClobUtil@clobToStr(#request.service.procedure)"/>
	   	&nbsp;</td>
	</tr>
	<tr>
       <th>&nbsp;法定期限：</th>
       <!--td class="user_fram" bgcolor="#ffffff">${service.lawlimit}个工作日&nbsp;</td-->
       <td>${service.lawlimitinfo}&nbsp;</td>
	</tr>
	<tr>
        <th>&nbsp;承诺期限：</th>
        <!--td class="user_fram" bgcolor="#ffffff"> ${service.promiseday}个工作日</td -->
        <td> ${service.promisdayinfo}&nbsp;</td>
	</tr>
                    <tr>
                      <th>&nbsp;收费标准及依据：</th>
                      <td>${service.chargetype}&nbsp;</td>
                    </tr>
                    <tr>
                      <th>&nbsp;办理部门：</th>
                      <td>${service.deptname}&nbsp;</td>
                    </tr>
	                    
	               	<tr>
	                 	<th>&nbsp;办理地点：</th>
	                      <td>${service.acceptaddress}&nbsp;</td>
	                </tr>
	                    <tr>
						   <th>&nbsp;监督电话：</th>
	                      <td>${service.monitorcomplain}&nbsp;</td>
	                      </tr>
						<tr>
	                      <th>&nbsp;联系电话：</th>
	                      <td>
	                      	${service.contactphone}
						  </td>
	                    </tr>
</table>