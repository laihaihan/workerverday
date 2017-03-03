<%@ page language="java" pageEncoding="UTF-8" %>

 <fieldset>
        <legend class="legend">项目联系人信息</legend>
            <table cellpadding="0" cellspacing="1"   class="p_table01" align="center">
                <col width="15%" align="right">
                <col width="30%" align="left">
                <col width="20%" align="right">
                <col width="35%" align="left">
                <tr>
                    <th>项目联系人姓名：</th>
                    <td>${projInfo.contacter}</td>
                    <th>项目联系人身份证号 ：</th>
                    <td>${projInfo.contacter_id}</td>
                </tr>
                <tr>
                    <th>项目联系人电子邮件：</th>
                    <td>${projInfo.email}</td>
                    <th>项目联系人电话1：</th>
                    <td>${projInfo.phone1}</td>
                </tr>
                <tr>
                    <th>项目联系人电话2：</th>
                    <td>${projInfo.phone2}</td>
                    <th>项目联系人手机1：</th>
                    <td>${projInfo.mobile1}</td>
                </tr>
                <tr>
                    <th>项目联系人手机2：</th>
                    <td>${projInfo.mobile2}</td>
                    <th>项目联系人地址：</th>
                    <td>${projInfo.address}</td>
                </tr>
                <tr>
                    <th>项目联系人邮编：</th>
                    <td colspan="3">${projInfo.zipcode}</td>
                </tr>
            </table>
    </fieldset>
    <br />
	<fieldset>
        <legend class="legend">项目负责人信息</legend>
        <table cellpadding="0" cellspacing="1"   class="p_table01" align="center">
            <col width="16%" align="right">
            <col width="34%" align="left">
            <col width="15%" align="right">
            <col width="35%" align="left">
            <tr>
                <th>项目负责人姓名：</th>
                <td>
                	${projInfo.charger}
                </td>
                <th>项目负责人电话：</th>
                <td>
                	${projInfo.charger_phone}
                </td>
            </tr>
            <tr>
                <th>项目负责人手机：</th>
                <td>
                	${projInfo.charger_mobile}
                </td>
                <th>项目负责人邮箱：</th>
                <td>
                	${projInfo.charger_email}
                </td>
            </tr>
        </table>
    </fieldset>
    <br />
 	<fieldset>
		<legend class="legend">项目信息</legend>
		<table cellpadding="0" cellspacing="1"   class="p_table01" align="center">
		     <col width="15%" align="right">
		     <col width="35%" align="left">
		     <col width="15%" align="right">
		     <col width="35%" align="left">
		     <tr>
		         <th>项目名称 ：</th>
		         <td>${projInfo.proj_name}</td>
		         <th>立项年份：</th>
		         <td>${projInfo.proj_year}</td>
		     </tr>
		     <tr>
		         <th> 审批机关：</th>
		         <td>${projInfo.proj_year}</td>
		         <th>建筑面积(平方米) ：</th>
		         <td>${projInfo.build_size}</td>
		     </tr>
		     <tr>
		         <th>用地面积(平方米)：</th>
		         <td>${projInfo.ydmjpfm}</td>
		         <th>建设规模 ：</th>
		         <td>${projInfo.build_scale}</td>
		     </tr>
		     <tr>
		         <th>总投资额(万元) ：</th>
		         <td>${projInfo.total_invest}</td>
		         <th>建设周期 ：</th>
		         <td>${projInfo.build_scale}</td>
		     </tr>
		     <tr>
		         <th>建设地址 ：</th>
		         <td>${projInfo.build_addr}</td>
		         <th>建设内容：</th>
		         <td>${projInfo.build_content}</td>
		     </tr>
		     <tr>
		         <th>项目备注 ：</th>
		         <td colspan="3">${projInfo.remark}</td>
		     </tr>
		 </table>
	</fieldset>
	