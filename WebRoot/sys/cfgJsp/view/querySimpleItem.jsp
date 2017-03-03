<%@page contentType="text/html;charset=UTF-8"%>
<%
	String currentViewId = request.getParameter("unid");
	String personalconfig=request.getParameter("personalconfig");
	String sSysPath=request.getContextPath()+"/";
	String isLoad=request.getParameter("iframe");//是否加载session.jsp  1 加载
%>
<%
	if("1".equals(isLoad)){//表示是嵌入iframe，必须加载session.jsp
		%>
			<%@include file="/sys/jsp/session.jsp"%>
		<%
	}
%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){
		viewConfigFun.loadItemsConfig("<%=currentViewId%>","qsItemList");
		
		viewConfigFun.loadQuerySimpleItemsConfig("<%=currentViewId%>","querySimpleItemList");
	});
</script>
<table border="1" align="center" cellpadding="0" cellspacing="0" bordercolorlight="#D3F0F9" bordercolordark="#FFFFFF">
  <tr>
    <td width="100%" valign="top">
    <div id="qsDialogHtml">
    <table border="0" cellpadding="0" cellspacing="0" class="tableSet2">
      <tr>
        <th>字段中文名称</th>
        <td width="70%"><input type="hidden" class="inputbox" size="15" name="itemUnid" id="itemUnid"/><input type="text" class="inputbox" size="20" name="itemNameCn" id="itemNameCn"/>&nbsp;&nbsp;</td>
      </tr>
    </table>
    </div>
    </td>
  </tr>
  <tr>
  <td width="100%">
  <table border="0">
      <td width="40%">
	<select name="qsItemList" size="20" style="width:180px;height:305px" id="qsItemList" onDblClick="viewConfigFun.addQuerySimpleItem('qsItemList','<%=currentViewId%>')">
    </select>
    </td>
    <td width="15%" align="center">
<ul>
        	<li>
        	  <input name="btnadd" type="button" class="btnChannel" id="button" value="添加" onClick="viewConfigFun.addQuerySimpleItem('qsItemList','<%=currentViewId%>')"/>
        	</li>
			<li>&nbsp;</li>
            <li>
        	  <input name="btndel" type="button" class="btnChannel" id="button" value="删除"  onClick="viewConfigFun.delQuerySimpleItem('querySimpleItemList','<%=currentViewId%>')"/>
        	</li>
        </ul>
    </td>
  <td width="40%">
    <select name="querySimpleItemList" size="20" style="width:180px;height:305px" id="querySimpleItemList"  onChange="viewConfigFun.changeQuerySimpleItem(this,'<%=currentViewId%>')" onDblClick="viewConfigFun.delQuerySimpleItem(this,'<%=currentViewId%>')">
    </select>
    </td>
  <td width="5%" align="center">
    	<a href="javascript:void" onClick="viewConfigFun.moveQuerySimpleItem('<%=currentViewId%>',-1)"><img src="<%=sSysPath %>uistyle/style_1/ucapimages/arrow_asc.gif"/></a><br />
   	  <br /><a href="javascript:void" onClick="viewConfigFun.moveQuerySimpleItem('<%=currentViewId%>',1)"><img src="<%=sSysPath %>uistyle/style_1/ucapimages/arrow_desc.gif" /></a>    </td>
	  </table>
	  </td>
  </tr>
    <%if(null==personalconfig || !personalconfig.equals("1")){%>
  <tr><td align="center"><input type="button" name="btnSave" class="btnChannel" value="保存" onClick="viewConfigFun.querySimpleItemConfigConfirm('<%=currentViewId%>')"/></td></tr>
  <%}%>
</table>
</body>