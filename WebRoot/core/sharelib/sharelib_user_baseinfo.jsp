<%@ page language="java" contentType="text/html; charset=utf-8" %>
<form action="${path}/ShareLibUser.action" method="post" name="editForm" id="editForm">
<input type="hidden" name="fn" value="<%=fn%>" />
<input type="hidden" name="unid" value="${shareLibUser.unid}" />
<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" class="form_table_ext">
	<tr>
        <td height="26" align="right" nowrap><font color="#FF0000">*</font>个人/企业名称：</td>
        <td colspan="3" align="left">
         	<input type="text" name="name" id="name" value="${shareLibUser.name}" style="width:77%">
        </td>
    </tr>
    <tr>
        <td height="26" align="right" nowrap>地址：</td>
        <td colspan="3" align="left">
         	<input type="text" name="address" id="address" value="${shareLibUser.address}" style="width:77%">
        </td>
    </tr>
    <tr>
        <td height="26" align="right" nowrap>联系人：</td>
        <td colspan="3" align="left">
         	<input type="text" name="contact_man" id="contact_man" value="${shareLibUser.contact_man}" style="width:77%">
        </td>
    </tr>
    <tr>
        <td height="26" align="right" nowrap>手机：</td>
        <td align="left">
            <input type="text" name="mobile" id="mobile" value="${shareLibUser.mobile}" style="width:80%" value=""/>
 	 	</td>
        <td height="26" align="right" nowrap>身份证号：</td>
        <td align="left">
            <input type="text" name="idcard" id="idcard" value="${shareLibUser.idcard}" style="width:55%" value=""/>
 		</td>
    </tr>
    <tr>
        <td width="10%" height="26" align="right" nowrap>注册编号：</td>
        <td width="35%" align="left">
           	<input type="text" name="regist_code" id="regist_code" value="${shareLibUser.regist_code}" style="width:80%" value=""/>
        </td>
        <td width="10%" height="26" align="right" nowrap>纳税人识别号：</td>
        <td width="45%" align="left">
           	<input type="text" name="taxpayer_code" id="taxpayer_code" value="${shareLibUser.taxpayer_code}" style="width:55%" value=""/>
        </td>
    </tr>
    <tr>
	 	<td height="26" align="right" nowrap>银行账号：</td>
        <td align="left">
            <input type="text" name="bank_account" id="bank_account" value="${shareLibUser.bank_account}" style="width:80%" value=""/>
        </td>
	 	<td height="26" align="right" nowrap>组织机构代码：</td>
        <td align="left">
            <input type="text" name="org_code" id="org_code" value="${shareLibUser.org_code}" style="width:55%" value=""/>
        </td>
    </tr>
    <tr>
        <td height="26" align="right" nowrap>法人代表：</td>
        <td align="left">
           	<input type="text" name="legal_man" id="legal_man" value="${shareLibUser.legal_man}" style="width:80%" value=""/>
        </td>
	 	<td height="26" align="right" nowrap>企业类型：</td>
        <td align="left">
            <input type="text" name="enterprise_type" id="enterprise_type" value="${shareLibUser.enterprise_type}" style="width:55%" value=""/>
        </td>
    </tr>
    <tr>
		<td height="26" align="right" nowrap>注册资金：</td>
        <td align="left">
            <input type="text" name="regist_money" id="regist_money" value="${shareLibUser.regist_money}" style="width:80%" value="0"/>万元
        </td>
        <td height="26" align="right" nowrap>经营面积：</td>
        <td align="left">
           	<input type="text" name="manage_area" id="manage_area" value="${shareLibUser.manage_area}" style="width:55%" value="0"/>平方米
        </td>
    </tr>
    <tr>
        <td height="26" align="right" nowrap>经营期限：</td>
        <td align="left">
           	<input type="text" name="manage_duration" id="manage_duration" value="${shareLibUser.manage_duration}" style="width:80%" value=""/>
        </td>
	 	<td height="26" align="right" nowrap>经营范围：</td>
        <td align="left">
            <input type="text" name="manage_scope" id="manage_scope" value="${shareLibUser.manage_scope}" style="width:55%" value=""/>
        </td>
    </tr>
    <tr>
        <td height="26" align="right" nowrap>行业：</td>
        <td align="left">
           	<input type="text" name="industry" id="industry" value="${shareLibUser.industry}" style="width:80%" value=""/>
        </td>
	 	<td height="26" align="right" nowrap>股东：</td>
        <td align="left">
            <input type="text" name="shareholder" id="shareholder" value="${shareLibUser.shareholder}" style="width:55%" value=""/>
        </td>
    </tr>
</table>
</form>
<script type="text/javascript">
   	var validate = new Validation('editForm', { 
    	immediate: true,
	    validators: {
	      name:'required',
	      regist_money:'float',
	      manage_area:'float'
	    },
	    messages:{
	    	name:'请填写[个人/企业名称]',
	    	regist_money:'请填写[注册资金必须为数字]',
	    	manage_area:'请填写[经营面积必须为数字]'
	    }
  	});	
</script> 