<%@ page language="java" pageEncoding="UTF-8" %>

<table cellpadding="0" cellspacing="1" class="p_table01">
	<tr>
        <th height="26" align="right" nowrap>个人/企业名称：</th>
        <td colspan="3" align="left">
         	<input name="name" id="name" value="${wasUser.name}" style="width: 80%"/>
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>地址：</th>
        <td colspan="3" align="left">
        	<input name="address" id="address" value="${wasUser.address}" style="width: 80%"/>
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>联系人：</th>
        <td align="left">
        	<input name="contact_man" id="contact_man" value="${wasUser.contact_man}" style="width: 80%"/>
        </td>
        <th height="26" align="right" nowrap>所属地区：</th>
        <td>
        	<input type="hidden" name="siteid" value="${wasUser.siteid}"/>
        	<input type="text" name="site" style="width:80%" disabled="disabled" value="<s:property value="@com.linewell.rsp.module.site.RspSiteManager@getStieNameBySiteid(#request.wasUser.siteid)"/>"/>
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>手机：</th>
        <td align="left">
        	<input name="mobile" id="mobile" value="${wasUser.mobile}" style="width: 80%"/>
 	 	</td>
        <th height="26" align="right" nowrap>身份证号：</th>
        <td align="left">
        	<input name="idcard" id="idcard" value="${wasUser.idcard}" style="width: 80%"/>
 		</td>
    </tr>
    <tr>
        <th width="10%" height="26" align="right" nowrap>注册编号：</th>
        <td width="35%" align="left">
        	<input name="regist_code" id="regist_code" value="${wasUser.regist_code}" style="width: 80%"/>
        </td>
        <th width="10%" height="26" align="right" nowrap>纳税人识别号：</th>
        <td width="45%" align="left">
        	<input name="taxpayer_code" id="taxpayer_code" value="${wasUser.taxpayer_code}" style="width: 80%"/>
        </td>
    </tr>
    <tr>
	 	<th height="26" align="right" nowrap>银行账号：</th>
        <td align="left">
        	<input name="bank_account" id="bank_account" value="${wasUser.bank_account}" style="width: 80%"/>
        </td>
	 	<th height="26" align="right" nowrap>组织机构代码：</th>
        <td align="left">
        	<input name="org_code" id="org_code" value="${wasUser.org_code}" style="width: 80%"/>
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>法人代表：</th>
        <td align="left">
        	<input name="legal_man" id="legal_man" value="${wasUser.legal_man}" style="width: 80%"/>
        </td>
	 	<th height="26" align="right" nowrap>企业类型：</th>
        <td align="left">
        	<input name="enterprise_type" id="enterprise_type" value="${wasUser.enterprise_type}" style="width: 80%"/>
        </td>
    </tr>
    <tr>
		<th height="26" align="right" nowrap>注册资金：</th>
        <td align="left">
        	<input name="regist_money" id="regist_money" value="${wasUser.regist_money}" style="width: 80%"/>
            万元
        </td>
        <th height="26" align="right" nowrap>经营面积：</th>
        <td align="left">
        	<input name="manage_area" id="manage_area" value="${wasUser.manage_area}" style="width: 80%"/>
           	平方米
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>经营期限：</th>
        <td align="left">
        	<input name="manage_duration" id="manage_duration" value="${wasUser.manage_duration}" style="width: 80%"/>
        </td>
	 	<th height="26" align="right" nowrap>经营范围：</th>
        <td align="left">
        	<input name="manage_scope" id="manage_scope" value="${wasUser.manage_scope}" style="width: 80%"/>
        </td>
    </tr>
    <tr>
        <th height="26" align="right" nowrap>行业：</th>
        <td align="left">
        	<input name="industry" id="industry" value="${wasUser.industry}" style="width: 80%"/>
        </td>
	 	<th height="26" align="right" nowrap>股东：</th>
        <td align="left">
        	<input name="shareholder" id="shareholder" value="${wasUser.shareholder}" style="width: 80%"/>
        </td>
    </tr>
</table>