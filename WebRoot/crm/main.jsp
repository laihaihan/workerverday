<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<%@page import="com.linewell.ucap.util.UcapRequest" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager" %>
<%@page import="com.linewell.ucap.platform.authorized.scheme.Portal" %>
<%@page import="com.linewell.ucapx.channel.UiPortlet" %>
<%@page import="com.linewell.ucap.ui.portal.UiChannelRecord" %>
<%@page import="com.linewell.ucapx.layout.LayoutApi"%>
<%@page import="com.linewell.ucapx.channel.ChannelApi"%>
<%@include file="default/common.jsp"%>
<%
UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);

//获取Portal对象
LayoutApi layoutApi = new LayoutApi();
Portal portal = layoutApi.getLayout(currentAppId, ucapSession); 
//频道加载
ChannelApi channelApi = new ChannelApi();
List<List<UiPortlet>> portletList = channelApi.getChannelList(portal);

//事件
UiPortlet eventUiPortlet = portletList.get(0).get(0);
UiChannelRecord eventUiRecord = channelApi.getUiChannelRecord(eventUiPortlet.getChannel().getId(),
	ucapSession,ucapRequest); 

//业务机会
UiPortlet chanceUiPortlet = portletList.get(0).get(1);
UiChannelRecord chanceUiRecord = channelApi.getUiChannelRecord(chanceUiPortlet.getChannel().getId(),
  ucapSession,ucapRequest); 
//{chance_id=4595FD18399076075EE2D45DB77D344D, chance_name=123, chance_hoder=sysadmin, chance_finishdate=2011-06-29, chance_belong_to_account=, chance_type=, rownum_=1, chance_type_key_=}


//客户
UiPortlet customerUiPortlet = portletList.get(0).get(2);
UiChannelRecord customerUiRecord = channelApi.getUiChannelRecord(customerUiPortlet.getChannel().getId(),
  ucapSession,ucapRequest); 
//表单类型
String customerType = customerUiRecord.getViewInfo().getFormType();
//表单ID
String customerFormId = customerUiRecord.getViewInfo().getFormUnid();
//account_id=CBD641F6A0FA577CCDEEF7DCB5DB7EB0, account_name=兔子	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta content="南威客户关系管理系统" name="keywords" />
<meta content="南威客户关系管理系统" name="description" />
<title>南威客户关系管理系统</title>
<link href="style/inside.css" rel="stylesheet" type="text/css" />
<script language="javascript" src="<%= systemPath%>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript">
$(document).ready(function(){
});
</script>
</head>

<body>

<!-- 我的日程 -->
<!-- 分隔条 -->
<div class="separated">
</div>
<!-- 外容器 -->
<div class="box_a">
  <!-- 标题 -->
  <div class="title">
   <%= eventUiPortlet.getChannel().getTitle()%><input id="Button1" class="button" type="button" value="新建事件" /></div>
  <!-- 日程表 -->
  <table border="0" cellpadding="0" cellspacing="0" class="table_schedule">
    <%
    for(Map<String,String> item : eventUiRecord.getRecordList()){
    %>
    <tr>
      <th><%= item.get("events_subject")  %>　<%= item.get("events_date")  %> （过期时间：<%= item.get("events_time")  %>）</th>
      <td><a href="<%= item.get("events_id")  %>">修改</a></td>
    </tr>  
    <%
    }
    %>  
  </table>
</div>
<!-- 空白行 -->
<div class="blank">
</div>
<!-- 我的工作台 -->
<div class="separated">
</div>
<!-- 外容器 -->
<div class="box_a">
  <!-- 标题 -->
  <div class="title">
    <%= chanceUiPortlet.getChannel().getTitle()%><select class="gap">
    <option>马上发生</option>
    <option>营销计划</option>
    <option>潜在客户</option>
    <option>业务机会</option>
    <option>合同</option>
    </select> <input id="Button1" class="button" type="button" value="执行" />
    <a class="toright" href="#">调整</a> </div>
  <!-- 内容 -->
  <div class="box_b bold">
    我的业务机会<a class="red gap" href="#"><%= chanceUiRecord.getViewInfo().getTotalCount() %></a>条<a class="gap" href="#">新建</a>|<a class="gap" href="#">全部</a>
  </div>
  
  <!-- 视图 -->
  <table border="0" cellpadding="0" cellspacing="1" class="info_view_table">
    <!-- 标题行 -->
    <tr class="info_view_table_tr title"> 
      <td>编号</td>      
      <td>机会名称</td>      
      <td>机会类型</td>
      <td>有效时间</td>
    </tr>
    <%
    int chanceNum = 0;
    for(Map<String,String> item : chanceUiRecord.getRecordList()){
      String className = "info_view_table_tr";
      if(chanceNum % 2 == 0) className = "info_view_table_tr double";
      chanceNum++;
      //{chance_id=4595FD18399076075EE2D45DB77D344D, chance_name=123, chance_hoder=sysadmin, chance_finishdate=2011-06-29, chance_belong_to_account=, chance_type=, rownum_=1, chance_type_key_=}
    %>
    <!-- 单数行 -->
    <tr class="<%= className %>">
      <td><%= item.get("rownum_") %></td>
      <td><%= item.get("chance_name") %></td>
      <td><%= item.get("chance_type") %></td>
      <td><%= item.get("chance_finishdate") %></td>
    </tr>
    <%
    }
    %>
  </table>
</div>
<!-- 空白行 -->
<div class="blank">
</div>
<!-- 我的任务 -->
<div class="separated">
</div>
<!-- 外容器 -->
<div class="box_a">
  <!-- 标题 -->
  <div class="title">
    <%= customerUiPortlet.getChannel().getTitle()%>     
     <input id="btnNewRecord" class="button" type="button" value="新建客户" 
      onclick="window.open('account/form.jsp?type=<%=customerType%>&formId=<%=customerFormId%>');"/>
    <a class="gap" href="#">编辑视图</a></div>
  <!-- 视图 -->
  <table border="0" cellpadding="0" cellspacing="1" class="info_view_table">
    <!-- 标题行 -->
    <tr class="info_view_table_tr title"> 
      <td>客户名</td>     
      <td>行业</td>
    </tr>
    <%
    int customerNum = 0;
    for(Map<String,String> item : customerUiRecord.getRecordList()){
      String className = "info_view_table_tr";
      if(customerNum % 2 == 0) className = "info_view_table_tr double";
      customerNum++;
      //account_id=CBD641F6A0FA577CCDEEF7DCB5DB7EB0, account_name=兔子, account_industry=机械
    %>
    <!-- 单数行 -->
    <tr class="<%= className %>">
      <td><a href="account/form.jsp?unid=<%= item.get("account_id")%>&type=<%=customerType%>&formId=<%=customerFormId%>"
       target="_blank"><%= item.get("account_name")%>    
      </a></td>
      <td><%= item.get("account_industry") %></td>
    </tr>
    <%
    }
    %>
    
  </table>
  <!-- 空白行 -->
  <div class="blank">
  </div>
  <!-- 查看更多 -->
  <a href="#">查看更多&gt;&gt;</a> </div>

</body>

</html>