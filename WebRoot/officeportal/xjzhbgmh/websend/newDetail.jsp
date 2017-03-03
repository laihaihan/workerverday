<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="com.linewell.core.util.ClobUtil"%>
<%@page import="com.linewell.cms.article.Article"%>
<%@page import="com.linewell.cms.article.ArticleManager"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ include file="/officeportal/xjzhbgmh/comm/taglibs.jsp"%>
<%
	String atrunid = request.getParameter("atrunid");
	ArticleManager manager = new ArticleManager();
	Article article = manager.doFindByUnid(atrunid);
	if(article == null){
		throw new Exception("未找到指定新闻！");
	}
	String add_hit = "update cms_article set ARTICLE_VIEWS=to_number(ARTICLE_VIEWS)+1 where ARTICLE_UNID='"+atrunid+"'";
	JDBCTool.doSQLUpdate(pxl_cms, add_hit,null);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title>新闻动态   <%=article.getTitle() %></title>
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
        <td height="25" align="left"><a href="${portalPath}index.jsp">首页</a>&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;新闻资讯</td>
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
                    <td width="25" align="left" valign="bottom" class="black_14b"></td>
                    <td align="left" class="black_14b"></td>
                    <td width="20" align="left" valign="bottom">&nbsp;</td>
                    </tr>
              </table></td>
            </tr>
            <tr>
              <td valign="top">
              	<div style="padding-left:20px;padding-right:20px;height:380px;">
              	<div align="center" style="padding-top:10px;">
              		<h3><%=article.getTitle()%></h3>
              	</div>
              	<div align="center" style="padding-bottom:5px;"><strong><%=article.getKeyword()%></strong></div>
                <div style="height:30px; line-height:30px; text-align:center; background:#f3f3f3;">
                    <b>发布时间：</b>
                    <span><%=article.getCreatetime() %></span>
                    &nbsp;&nbsp;&nbsp;
                    <b>发布人：</b>
                    <span><%=article.getEditorunid_cn_()%></span>
                    &nbsp;&nbsp;&nbsp;
                    <b>点击率：</b>
                    <span><%=article.getViews()%></span>
                    &nbsp;&nbsp;&nbsp;
                </div>
                <br/>
                <div class="content">
                     <%=article.getContent()%>
                    <div>&nbsp;</div>
                </div>
                </div>
                <div align="center">
	                <a href="javascript:window.print();">【打印】</a>
	                &nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="goto_top();">【返回顶部】</a>
	            </div>
	            <div>&nbsp;</div>
                <script type="text/javascript">
	              //<![CDATA[
	              var goto_top_type = -1;
	              var goto_top_itv = 0;
	              function goto_top_timer(){
		              var y = goto_top_type == 1 ? document.documentElement.scrollTop : document.body.scrollTop;
		              var moveby = 15;
		              y -= Math.ceil(y * moveby / 100);
		              if (y < 0) {
		              	y = 0;
		              }
		              if (goto_top_type == 1) {
		              	document.documentElement.scrollTop = y;
		              }else {
		              	document.body.scrollTop = y;
		              }
		              if (y == 0) {
		              	clearInterval(goto_top_itv);
		              	goto_top_itv = 0;
		              }
	              }
	              function goto_top(){
		              if (goto_top_itv == 0) {
			              if (document.documentElement && document.documentElement.scrollTop) {
			              	goto_top_type = 1;
			              }else if (document.body && document.body.scrollTop) {
			              	goto_top_type = 2;
			              }else {
			              	goto_top_type = 0;
			              }
						  if (goto_top_type > 0) {
			              	goto_top_itv = setInterval('goto_top_timer()', 50);
			              }
		              }
	              }
	
	              //]]>
	              </script>
              </td>
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
