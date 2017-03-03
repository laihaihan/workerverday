<%@ page language="java" pageEncoding="UTF-8" %>
 <fieldset>
        <legend class="legend">业主单位信息</legend>
            <table cellpadding="0" cellspacing="1"   class="p_table01" align="center">
                <col width="16%" align="right">
                <col width="34%" align="left">
                <col width="15%" align="right">
                <col width="35%" align="left">
                <tr>
                    <th>单位名称：</th>
                    <td>${ownerUnit.unit_name}</td>
                    <th>单位组织代码证 ：</th>
                    <td>${ownerUnit.org_code}</td>
                </tr>
                <tr>
                    <th>单位地址：</th>
                    <td>${ownerUnit.unit_addr}</td>
                    <th>单位邮编 ：</th>
                    <td>${ownerUnit.zipcode}</td>
                </tr>
                <tr>
                    <th>单位法人代表 ：</th>
                    <td>${ownerUnit.corporator}</td>
                    <th>单位法人代码 ：</th>
                    <td>${ownerUnit.corporator_code}</td>
                </tr>
                <tr>
                    <th>单位法人邮箱 ：</th>
                    <td>${ownerUnit.corporator_email}</td>
                    <th>单位市民邮箱：</th>
                    <td>${ownerUnit.people_email}</td>
                </tr>
                <tr>
                    <th>单位电话号码 ：</th>
                    <td>${ownerUnit.mobile}</td>
                    <th>单位传真号码 ：</th>
                    <td>${ownerUnit.fax_number}</td>
                </tr>
                <tr>
                    <th>单位通讯地址：</th>
                    <td>${ownerUnit.comm_addr}</td>
                    <th>单位联系人姓名 ：</th>
                    <td>${ownerUnit.contacter}</td>
                </tr>
                <tr>
                    <th>单位联系人电子邮件 ：</th>
                    <td>${ownerUnit.email}</td>
                    <th>单位联系人姓名1：</th>
                    <td>${ownerUnit.phone1}</td>
                </tr>
                <tr>
                    <th>单位联系人电话2 ：</th>
                    <td>${ownerUnit.phone2}</td>
                    <th>单位登记日期：</th>
                    <td>${ownerUnit.reg_date}</td>
                </tr>
                <tr>
                    <th>单位备注 ：</th>
                    <td colspan="3">${ownerUnit.remark}</td>
                </tr>
            </table>
    </fieldset>
    <br />
    <fieldset>
        <legend class="legend">申报单位信息</legend>
            <table cellpadding="0" cellspacing="1"   class="p_table01" align="center">
                <col width="16%" align="right">
                <col width="34%" align="left">
                <col width="15%" align="right">
                <col width="35%" align="left">
                <tr>
                    <th>单位名称：</th>
                    <td>${reporterUnit.unit_name}</td>
                    <th>单位组织代码证 ：</th>
                    <td>${reporterUnit.org_code}</td>
                </tr>
                <tr>
                    <th>单位地址：</th>
                    <td>${reporterUnit.unit_addr}</td>
                    <th>单位邮编 ：</th>
                    <td>${reporterUnit.zipcode}</td>
                </tr>
                <tr>
                    <th>单位法人代表 ：</th>
                    <td>${reporterUnit.corporator}</td>
                    <th>单位法人代码 ：</th>
                    <td>${reporterUnit.corporator_code}</td>
                </tr>
                <tr>
                    <th>单位法人邮箱 ：</th>
                    <td>${reporterUnit.corporator_email}</td>
                    <th>单位市民邮箱：</th>
                    <td>${reporterUnit.people_email}</td>
                </tr>
                <tr>
                    <th>单位电话号码 ：</th>
                    <td>${reporterUnit.mobile}</td>
                    <th>单位传真号码 ：</th>
                    <td>${reporterUnit.fax_number}</td>
                </tr>
                <tr>
                    <th>单位通讯地址：</th>
                    <td>${reporterUnit.comm_addr}</td>
                    <th>单位联系人姓名 ：</th>
                    <td>${reporterUnit.contacter}</td>
                </tr>
                <tr>
                    <th>单位联系人电子邮件 ：</th>
                    <td>${reporterUnit.email}</td>
                    <th>单位联系人姓名1：</th>
                    <td>${reporterUnit.phone1}</td>
                </tr>
                <tr>
                    <th>单位联系人电话2 ：</th>
                    <td>${reporterUnit.phone2}</td>
                    <th>单位登记日期：</th>
                    <td>${reporterUnit.reg_date}</td>
                </tr>
                <tr>
                    <th>单位备注 ：</th>
                    <td colspan="3">${reporterUnit.remark}</td>
                </tr>
            </table>
    </fieldset>