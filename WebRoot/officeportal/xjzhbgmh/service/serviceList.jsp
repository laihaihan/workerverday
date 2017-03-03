<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.core.db.JdbcSession"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.platform.cache.dept.Dept"%>
<%@page import="com.linewell.ucap.platform.cache.dept.DeptManager"%>
<%@page import="java.util.*"%>
<%@page import="com.linewell.core.db.DataPage"%>
<%@page import="com.linewell.ucap.util.StringUtil"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.db.JdbcFactory"%>
<%@ include file="/officeportal/xjzhbgmh/comm/taglibs.jsp"%>
<%
	//情况1：按市级部门或乡镇部门; 情况2：按具体业务部门；情况3：按类型
	String deptbelong = request.getParameter("deptbelong");//情况1
	deptbelong = deptbelong == null?"":deptbelong;
	String belongtype = request.getParameter("belongtype");//部门级别
	belongtype = belongtype == null?"1":belongtype;
	String deptunid = request.getParameter("deptunid");//情况2
	deptunid = deptunid == null?"":deptunid;
	String foruser = request.getParameter("foruser");//情况3
	foruser = foruser == null?"":foruser;
	int pageSize = StringUtil.parseInt(request.getParameter("pageSize"));
	int curPage = StringUtil.parseInt(request.getParameter("curPage"));
	curPage = curPage <= 1? 1:curPage;
	pageSize = pageSize <=0? 15:pageSize;
	//标题获取
	String titleName = "所有";
	//查询当前部门的事项列表
	StringBuffer sql = new StringBuffer();
	sql.append("SELECT x.unid,x.infoprojid,x.servicename,x.addtype,y.dept_name as deptname,x.parentunid ");
	sql.append("FROM APAS_SERVICE x,ucap2.ucap_dept y where x.deptunid = y.dept_unid ");
	sql.append("and x.STATE='Y' and x.showtype not in ('1','4') ");
	if(StringUtils.isNotBlank(deptbelong)){
		sql.append("and y.dept_belongto = '"+deptbelong+"' ");
		titleName = "1".equals(belongtype)?"市级部门":"乡镇、街道、社区";
	}
	if(StringUtils.isNotBlank(deptunid)){
		sql.append("and x.deptunid = '"+deptunid+"' ");
		//获取当前部门名称
		DeptManager deptManager = new DeptManager();
		Dept dept = deptManager.doFindByUnid(deptunid);
		if(dept == null){
			throw new Exception("查询的部门不存在！");
		}else{
			titleName = dept.getName();
		}
	}
	if(StringUtils.isNotBlank(foruser)){
		sql.append("and x.foruser = '"+foruser+"' ");
		titleName = "1".equals(foruser)?"个人":("2".equals(foruser)?"企业、单位":"类型");
	}
	sql.append(" start with x.parentunid='0' connect by prior x.unid=x.parentunid ");
	//sql.append(" ORDER BY x.infoprojid");
	List serviceList = null;
	int pageCount = 0;
	int serviceSize = 0;
	int start = 0;
	int end = 0;
	try {
		JdbcSession jdbcSession = JdbcFactory.getSession(GlobalParameter.APP_WAS);
		DataPage pages = jdbcSession.queryForDataPage(sql.toString(), pageSize, curPage);
		serviceList = pages.getRecordList();
		pageCount = pages.getPageCount();
		serviceSize = pages.getRecordCount();
		start = pages.getBeginRecordCount();
		end = pages.getEndRecordCount();
	} catch (Exception e) {
		e.printStackTrace();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title><%=titleName %>--事项列表</title>
	<link href="../css/css.css" rel="stylesheet" type="text/css" />
	<%@include file="/officeportal/xjzhbgmh/comm/script.jsp"%>
	<style type="">
		.listTh{font-weight:bold;text-align:center;}
		.hand{cursor:pointer;}
		.blue{color:blue;}
	</style>
	<script type="">
	var pageCount = <%=pageCount%>;
	var curPage = <%=curPage%>;
	function goto(no){
	if(no < 1 || no > pageCount || no == curPage){
		return;
	}
	document.listForm.curPage.value = no;
	document.listForm.submit();
	}
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
        <td height="25" align="left"><a href="${portalPath}index.jsp">首页</a>&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;事项列表</td>
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
                    <td align="left" class="black_14b"><%=titleName %></td>
                    <td width="20" align="left" valign="bottom">&nbsp;</td>
                    </tr>
              </table></td>
            </tr>
            <tr>
              <td><table width="100%" border="0" cellpadding="0" cellspacing="5">
                  <tr>
                    <td align="left" valign="top">
                    <table width="100%" border="0" align="center" cellpadding="5" cellspacing="0">
                    	<tr class="listTh">
                    		<td width="5%">序号</td>
                    		<td width="15%">事项编码</td>
                    		<td width="48%">事项名称</td>
                    		<td width="8%">事项类别</td>
                    		<td width="16%">所属部门</td>
                    		<td width="8%">操作</td>
                    	</tr>
                    <%
                    int size = serviceList.size();
                    for(int i=0;i<size;i++){
                    	Map map = (Map)serviceList.get(i);
                    	String unid = map.get("UNID").toString();
                    	String proId = map.get("INFOPROJID").toString();
                    	String serviceName = map.get("SERVICENAME").toString();
                    	String type = map.get("ADDTYPE").toString();
                    	String deptName = map.get("DEPTNAME").toString();
                    	String parentunid = map.get("parentunid").toString();
                   %>
                   <tr class="news_list_2">
                   		<td align="center"><%=i+start-pageSize+1 %></td>
                   		<td align="left"><%=proId %></td>
                   		<td><% if(!"0".equals(parentunid)){out.println("&nbsp;&nbsp;&nbsp;&nbsp;");} %>
                   		<img src="../images/inc_4.gif" width="10" height="10" /> 
                   		<a href="serviceDetail.jsp?unid=<%=unid%>" target="_blank"><%=serviceName %></a></td>
                   		<td align="center"><%=type %></td>
                   		<td align="center"><%=deptName %></td>
                   		<td align="center"><a href="serviceDetail.jsp?unid=<%=unid%>" target="_blank">查看详细&gt;&gt;</a></td>
                   </tr>
                   <% 	
                    }
                    %>
                        <tr>
                          <td colspan="6" height="20" align="center">
                          <form name="listForm" action="serviceList.jsp" method="post">
                          <input type="hidden" name="deptbelong" value="<%=deptbelong%>"/>
                          <input type="hidden" name="deptunid" value="<%=deptunid%>"/>
                          <input type="hidden" name="foruser" value="<%=foruser%>"/>
                          <input type="hidden" name="belongtype" value="<%=belongtype%>"/>
                          <span onclick="goto(1)" class="hand">首页</span>  
                          <span onclick="goto(<%=curPage-1 %>)" class="hand">上一页</span>  
                          <span onclick="goto(<%=curPage+1 %>)" class="hand">下一页</span>  
                          <span onclick="goto(<%=pageCount %>)" class="hand">尾页</span>  
                          <%=curPage %>/<%=pageCount %>页 共<%=serviceSize %>条记录 <%=pageSize %>条记录/页 转到 第
                            <input name="curPage" type="text" size="5" /> 页
							<input name="Submit" type="submit" class="btn" value="提交" />
							</form>
							</td>
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