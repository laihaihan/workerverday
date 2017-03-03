<%@page contentType="text/html;charset=UTF-8"%>
<%
	String currentViewId = request.getParameter("unid");
	String personalconfig=request.getParameter("personalconfig");
%>

<body>
<script type="text/javascript">
	Ext.onReady(function(){
		viewConfigFun.loadItemsConfig("<%=currentViewId%>","siItemList");
		
		viewConfigFun.loadSortItemsConfig("<%=currentViewId%>","sortItemList");
	});
</script>
<table border="1" align="center" cellpadding="0" cellspacing="0" bordercolorlight="#D3F0F9" bordercolordark="#FFFFFF">
  <tr>
  <td width="100%">
  <table border="0">
      <td width="40%">
	<select name="siItemList" size="20" style="width:180px;height:305px" id="siItemList" onDblClick="viewConfigFun.addSortItem('siItemList','<%=currentViewId%>')">
    </select>
    </td>
    <td width="15%" align="center">
<ul>
        	<li>
        	  <input name="btnadd" type="button" class="btnChannel" id="btnadd" value="添加" onClick="viewConfigFun.addSortItem('siItemList','<%=currentViewId%>')"/>
        	</li>
			<li>&nbsp;</li>
            <li>
        	  <input name="btndel" type="button" class="btnChannel" id="btndel" value="删除" onClick="viewConfigFun.delSortItem('sortItemList','<%=currentViewId%>')"/>
        	</li>
        </ul>
    </td>
  <td width="40%">
    <select name="sortItemList" size="20" style="width:180px;height:305px" id="sortItemList" onChange="viewConfigFun.changeSortItem(this,'<%=currentViewId%>');" onDblClick="viewConfigFun.delSortItem('sortItemList','<%=currentViewId%>');">
    </select>
    </td>
  <td width="5%" align="center">
    	<a href="#" onClick="viewConfigFun.moveSortItem('<%=currentViewId%>',-1)"><img src="../../uistyle/style_1/ucapimages/arrow_asc.gif"/></a><br />
   	  <br/><a href="#" onClick="viewConfigFun.moveSortItem('<%=currentViewId%>',1)"><img src="../../uistyle/style_1/ucapimages/arrow_desc.gif"/></a>    </td>
	  </table>
	  </td>
  </tr>
   <tr>
    <td width="100%" valign="top">
   <div id="siDialogHtml">
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="right" width="400"><input type="hidden" size="20" name="sortItem" id="sortItem"/><input type="radio" name="sortType" id="sortType" value="01"/>升序<input type="radio" name="sortType" id="sortType" value="02"/>降序</td>
      </tr>
    </table>
    </div>
    
    </td>
  </tr>
   <%if(null==personalconfig || !personalconfig.equals("1")){%>
  <tr><td align="center"><input type="button" name="btnSave"  id="btnSave" class="btnChannel" value="保存" onClick="viewConfigFun.sortItemConfigConfirm('<%=currentViewId%>')"/></td></tr>
  <%}%>
</table>
</body>