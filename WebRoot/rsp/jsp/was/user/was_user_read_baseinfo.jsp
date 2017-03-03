<%@ page language="java" pageEncoding="UTF-8" %>

<table cellpadding="0" cellspacing="1" class="p_table01">
	<tr>
        <th height="26" align="right" nowrap>个人/企业名称：</th>
        <td colspan="3" align="left">
         	${wasUser.name}
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>地址：</th>
        <td colspan="3" align="left">
         	${wasUser.address}
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>联系人：</th>
        <td colspan="3" align="left">
         	${wasUser.contact_man}
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>手机：</th>
        <td align="left">
           ${wasUser.mobile}
 	 	</td>
        <th height="26" align="right" nowrap>身份证号：</th>
        <td align="left">
            ${wasUser.idcard}
 		</td>
    </tr>
    <tr>
        <th width="10%" height="26" align="right" nowrap>注册编号：</th>
        <td width="35%" align="left">
           	${wasUser.regist_code}
        </td>
        <th width="10%" height="26" align="right" nowrap>纳税人识别号：</th>
        <td width="45%" align="left">
           	${wasUser.taxpayer_code}
        </td>
    </tr>
    <tr>
	 	<th height="26" align="right" nowrap>银行账号：</th>
        <td align="left">
            ${wasUser.bank_account}
        </td>
	 	<th height="26" align="right" nowrap>组织机构代码：</th>
        <td align="left">
            ${wasUser.org_code}
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>法人代表：</th>
        <td align="left">
           	${wasUser.legal_man}
        </td>
	 	<th height="26" align="right" nowrap>企业类型：</th>
        <td align="left">
            ${wasUser.enterprise_type}
        </td>
    </tr>
    <tr>
		<th height="26" align="right" nowrap>注册资金：</th>
        <td align="left">
            ${wasUser.regist_money}万元
        </td>
        <th height="26" align="right" nowrap>经营面积：</th>
        <td align="left">
           	${wasUser.manage_area}平方米
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>经营期限：</th>
        <td align="left">
           	${wasUser.manage_duration}
        </td>
	 	<th height="26" align="right" nowrap>经营范围：</th>
        <td align="left">
            ${wasUser.manage_scope}
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>行业：</th>
        <td align="left">
           	${wasUser.industry}
        </td>
	 	<th height="26" align="right" nowrap>股东：</th>
        <td align="left">
            ${wasUser.shareholder}
        </td>
    </tr>
</table>