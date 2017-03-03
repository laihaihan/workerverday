<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.apas.service.table.ApasTable"%>
<%@page import="com.linewell.core.util.ClobUtil"%>
<%@page import="com.linewell.webutil.PageUtil"%>
<%@page import="com.linewell.apas.service.ApasService"%>
<%@page import="com.linewell.apas.service.ApasServiceManager"%>
<%@page import="com.linewell.ucap.platform.cache.dept.Dept"%>
<%@page import="com.linewell.ucap.platform.cache.dept.DeptManager"%>
<%@page import="java.util.*"%>
<%@page import="com.linewell.core.db.DataPage"%>
<%@page import="com.linewell.ucap.util.StringUtil"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.db.JdbcFactory"%>
<%@page import="com.linewell.core.db.JdbcSession"%>
<%@page import="java.sql.SQLException"%>
<%@ page import="com.linewell.apas.service.*"%>
<%@ page import="com.linewell.apas.service.material.ApasMaterialManager" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ include file="/officeportal/xjzhbgmh/comm/taglibs.jsp"%>
<%
	String unid = request.getParameter("unid");
	ApasServiceManager manager = new ApasServiceManager();
	ApasService apasService = manager.doFindBeanByKey(unid);
	//ApasService apasService = manager.doFindByInfoprojid(infoprojid);
	if(apasService == null){
		throw new Exception("查询的事项不存在！");
	}
	//查询事项的申报材料
	ApasMaterialManager materialManager = new ApasMaterialManager();
	String condition = "serviceid='"+apasService.getUnid()+"' order by sortid";
	List materialList = materialManager.doFindListByCondition(condition,null);
	request.setAttribute("materialList",materialList);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title><%=apasService.getServicename() %>详细信息</title>
	<link href="../css/css.css" rel="stylesheet" type="text/css" />
	<%@include file="/officeportal/xjzhbgmh/comm/script.jsp"%>
	<style type="">
		.bold{font-weight:bold;}
		.hand{cursor:pointer;}
	</style>
	<script type="">
	</script>
</head>

<body>
	<%-- 头部 S--%>
    <jsp:include page="../include/top.jsp"></jsp:include>
    <%-- 头部 E--%>
<table width="1000" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="31" align="center" valign="bottom" background="../images/Inv_bg_2.jpg">
    <table width="95%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="80" height="25" class="red_12b"><img src="../images/inc_3.gif" width="6" height="9" /> 当前位置： </td>
        <td height="25" align="left"><a href="${portalPath}index.jsp">首页</a>&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;事项明细</td>
      </tr>
    </table></td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td><img src="../images/1px_Tran.gif" width="100%" height="5" /></td>
  </tr>
</table>
<table width="1000" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" valign="top">&nbsp;</td>
    <td width="1000" valign="top"><table width="1000" border="0" cellpadding="1" cellspacing="1" bgcolor="#AFB7CC">
      <tr>
        <td bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td height="26" background="../images/text_pic_4.jpg" bgcolor="#9DCDF8"><table width="96%" border="0" align="center" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="25" align="left" valign="bottom" class="black_14b"><img src="../images/inc_3.gif" width="16" height="15" /></td>
                    <td align="left" class="black_14b"><%=apasService.getServicename() %>详细信息</td>
                    <td width="20" align="left" valign="bottom">&nbsp;</td>
                    </tr>
              </table></td>
            </tr>
            <tr>
              <td><table width="100%" border="0" cellpadding="0" cellspacing="5">
                  <tr>
                    <td align="center" valign="top">
                    <table width="90%" border="1" align="center" cellpadding="5"  cellspacing="0" style="border-color:#ccc; border-collapse: collapse;">
                    	<tr>
                    		<td align="right" class="bold">事项名称：</td>
                    		<td align="left" colspan="3"> <%=apasService.getServicename() %></td>
                    	</tr>
                    	<tr>
                    		<td width="15%" align="right" class="bold">事项类别：</td>
                    		<td width="35%" align="left">&nbsp;<%=apasService.getAddtype() %></td>
                    		<td width="15%" align="right" class="bold">办件类型：</td>
                    		<td width="35%" align="left">&nbsp;<%=apasService.getServicetype()%></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">事项编码：</td>
                    		<td align="left">&nbsp;<%=apasService.getInfoprojid() %></td>
                    		<td align="right" class="bold">所属部门：</td>
                    		<td align="left">&nbsp;<%=apasService.getDeptname()%></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">法定期限：</td>
                    		<td align="left">&nbsp;<%=apasService.getLawlimit() %>工作日</td>
                    		<td align="right" class="bold">承诺期限：</td>
                    		<td align="left">&nbsp;<%=PageUtil.checkNull(apasService.getPromisdayinfo())%></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">受理地址说明：</td>
                    		<td align="left" colspan="3">&nbsp;<%=PageUtil.checkNull(apasService.getAcceptaddress()) %></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">收费标准及依据：</td>
                    		<td align="left" colspan="3">&nbsp;<%=PageUtil.checkNull(apasService.getChargetype()) %></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">申请条件：</td>
                    		<td align="left" colspan="3">&nbsp;<%=ClobUtil.clobToStr(apasService.getApplyterm()) %></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">法定期限说明：</td>
                    		<td align="left" colspan="3">&nbsp;<%=PageUtil.checkNull(apasService.getLawlimitinfo()) %></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">承诺期限说明：</td>
                    		<td align="left" colspan="3">&nbsp;<%=PageUtil.checkNull(apasService.getPromisdayinfo()) %></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">办理程序：</td>
                    		<td align="left" colspan="3">&nbsp;<%=ClobUtil.clobToStr(apasService.getProcedure()) %></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">申报材料：</td>
                    		<td align="left" colspan="3">
                    		 <s:iterator value="#request.materialList" id="mal" status="table_status">
                    		 ${table_status.index+1}、${mal.infoname}<br/>
                    		 </s:iterator>
							</td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">许可依据：</td>
                    		<td align="left" colspan="3">&nbsp;<%=ClobUtil.clobToStr(apasService.getAccording()) %></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">监督投诉：</td>
                    		<td align="left" colspan="3">&nbsp;<%=PageUtil.checkNull(apasService.getMonitorcomplain()) %></td>
                    	</tr>
                    	<tr>
                    		<td align="right" class="bold">备注：</td>
                    		<td align="left" colspan="3">&nbsp;<%=PageUtil.checkNull(apasService.getMemo()) %></td>
                    	</tr>
                    </table></td>
                  </tr>
              </table></td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td><img src="../images/1px_Tran.gif" width="100%" height="8" /></td>
  </tr>
</table>
<%-- buttom --%>
<%@ include file="../include/bottom.jsp" %>
</body>
</html>
