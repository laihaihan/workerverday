<%@ page language="java" pageEncoding="UTF-8" %>

<table cellpadding="0" cellspacing="1"   class="p_table01">
    <col width="12%" align="right" style="font-weight:bold;"/>
    <col width="38%" align="left" style="padding-left:10px;"/>
    <col width="12%" align="right" style="font-weight:bold;"/>
    <col width="38%" align="left" style="padding-left:10px;"/>
    <tr>
      	<th>事项名称：</th>
      	<td>${info.servicename}</td>
      	<th>事项编码：</th>
      	<td>${service.infoprojid}</td>
    </tr>
    <tr>
       	<th>申 报 号：</th>
       	<td>${info.projid}</td>
       	<th>查询密码：</th>
       	<td>${info.projpwd}</td>
    </tr>
    <tr>
     	<th>项目名称：</th>
      	<td>${info.projectname}</td>
      	<th>申报途径：</th>
      	<td>${info.applyfrom}</td>
    </tr>
    <tr>
      	<th>承诺办结时间：</th>
      	<td>${info.promise_etime}</td>
      	<th>办理状态：</th>
      	<td>${info.handlestate}</td>                  
    </tr>
    <tr>
      	<th>手　　机：</th>
      	<td>${info.mobile}</td>
      	<th>电话号码：</th>
      	<td>${info.phone}</td>
    </tr>
    <tr>
    	<th>联 系 人：</th>
      	<td>${info.contactman}</td>
      	<th>地　　址：</th>
      	<td>${info.address}</td>
    </tr>
    <tr>
      	<th>邮　　编：</th>
      	<td>${info.postcode}</td>
      	<th>法人代表：</th>
      	<td>${info.legalman}</td>
    </tr>
    <tr>
      	<th>备　　注：</th>
      	<td colspan="3">&nbsp;</td>
    </tr>
</table>