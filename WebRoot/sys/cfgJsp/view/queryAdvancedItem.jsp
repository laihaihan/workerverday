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
		viewConfigFun.loadItemsConfig("<%=currentViewId%>","qaItemList");
		
		viewConfigFun.loadQueryAdvancedItemsConfig("<%=currentViewId%>","queryAdvancedItemList");
	});
</script>
<table border="1" align="center" cellpadding="0" cellspacing="0" bordercolorlight="#D3F0F9" bordercolordark="#FFFFFF">
  <tr>
    <td width="100%" valign="top">
    <div id="qaDialogHtml">
    <table border="0" cellpadding="0" cellspacing="0" class="tableSet2">
      <tr>
        <th>字段中文名称</th>
        <td width="30%"><input type="text" class="inputbox" size="20" name="itemNameCn" id="itemNameCn"/>&nbsp;&nbsp;</td>
        <th align="right">是否有起始阶段</th>
        <td width="30%"><input type="hidden" class="inputbox" size="15" name="itemUnid" id="itemUnid"/><input type="radio" name="hasBegin" id="hasBegin" value="1"/>是<input type="radio" name="hasBegin" id="hasBegin" value="0"/>否</td>
      </tr>
    </table>
    </div>
    </td>
  </tr>
  <tr>
  <td width="100%">
  <table border="0">
      <td width="40%">
	<select name="qaItemList" size="20" style="width:180px;height:305px" id="qaItemList" onDblClick="viewConfigFun.addQueryAdvancedItem('qaItemList','<%=currentViewId%>')">
    </select>
    </td>
    <td width="15%" align="center">
<ul>
        	<li>
        	  <input name="button" type="submit" class="btnChannel" id="button" value="添加" onClick="viewConfigFun.addQueryAdvancedItem('qaItemList','<%=currentViewId%>')"/>
        	</li>
			<li>&nbsp;</li>
            <li>
        	  <input name="button" type="submit" class="btnChannel" id="button" value="删除" onClick="viewConfigFun.delQueryAdvancedItem('queryAdvancedItemList','<%=currentViewId%>')"/>
        	</li>
        </ul>
    </td>
  <td width="40%">
    <select name="queryAdvancedItemList" size="20" style="width:180px;height:305px" id="queryAdvancedItemList" onChange="viewConfigFun.changeQueryAdvancedItem(this,'<%=currentViewId%>')" onDblClick="viewConfigFun.delQueryAdvancedItem(this,'<%=currentViewId%>')">
    </select>
    </td>
  <td width="5%" align="center">
    	<a href="javascript:void" onClick="viewConfigFun.moveQueryAdvancedItem('<%=currentViewId%>',-1)"><img src="<%=sSysPath %>uistyle/style_1/ucapimages/arrow_asc.gif"/></a><br />
   	  <br /><a href="javascript:void" onClick="viewConfigFun.moveQueryAdvancedItem('<%=currentViewId%>',1)"><img src="<%=sSysPath %>uistyle/style_1/ucapimages/arrow_desc.gif" /></a>    </td>
	  </table>
	  </td>
  </tr>
  <%if(null==personalconfig || !personalconfig.equals("1")){%>
  <tr><td align="center"><input type="button" name="btnSave" class="btnChannel" value="保存" onClick="viewConfigFun.queryAdvancedItemConfigConfirm('<%=currentViewId%>')"/></td></tr>
  <%}%>
</table>
</body>