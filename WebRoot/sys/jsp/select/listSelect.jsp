<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/sys/jsp/jspSession.jsp"%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){
		listSelect.initTypes();
		if (listSelect.selNum!="0"){
			Ext.getDom("_allSelect").style.display="none";
		} else {
			Ext.getDom("_allSelect").style.display="";
		}
	});
</script>
<table border="1" style="width:100%;height:100%;" align="center" cellpadding="0" cellspacing="0" bordercolorlight="#D3F0F9" bordercolordark="#FFFFFF">
  <tr>
    <td width="100%" valign="top">
    <div id="dialogHtml">
    <table border="0" cellpadding="0" cellspacing="0" class="tableSet2">
      <tr>
        <th width="100px">选择类型：</th>
        <td id="selectTypeId" >&nbsp;&nbsp;</td>
        <td width="100px"  id='selectcheckId'>级联选择：<input id='checkCascade'  type='checkbox' onclick="listSelect.checkChanged(this);"></td>
      </tr>
    </table>
    </div>
        <table border="0" cellpadding="0" cellspacing="0" class="tableSet2">
       <tr>
        <td style="width:80%"> <input id="queryId"></input><input name="queryButton" type="button" class="btnChannel" id="queryButton" value="查询" onClick="listSelect.query();"/>&nbsp;&nbsp;<input style="display:none" name="queryBackButton" type="button" class="btnChannel" id="queryBackButton" value="返回" onClick="listSelect.queryBack();"/></td>
      </tr>
    </table>
    </td>
  </tr>
  <tr>
  <td width="100%">
          <table border="0">
          <tr>
            <td width="40%">
                <div id="treeSelect" style="width:190px;height:270px;border:#D3F0F9 1px solid;display:none">
                </div>
                <select name="selectList" id="selectList" size="17" style="width:230px;height:260px" id="selectList" onDblClick="listSelect.addSelect();">
                </select>
                 <select name="queryList" id="queryList" size="17" style="width:230px;display:none">
                </select>
            </td>
            <td width="15%" align="center">
                <ul>
        	        <li>
        	          <input name="btnadd" type="button" class="btnChannel" id="button" value="添加" onClick="listSelect.addSelect();"/>
        	        </li>
			        <li>&nbsp;</li>
                    <li>
        	          <input name="btndel" type="button" class="btnChannel" id="button1" value="删除"  onClick="listSelect.delSelect();"/>
        	        </li>
        	        <li>&nbsp;</li>
        	        <div id="_allSelect">
        	        <div id="btnAddAllId">
	                    <li>
	        	          <input name="btnAddAll" type="button" class="btnChannel" id="button2" value="全添"  onClick="listSelect.addAll();"/>
	        	        </li>
	        	        <li>&nbsp;</li>
	        	      </div>
	                    <li>
	        	          <input name="btnDelAll" type="button" class="btnChannel" id="button3" value="全删"  onClick="listSelect.delAll();"/>
	        	        </li>
	                </div>
                </ul>
            </td>
          <td width="40%">
                <select name="resultList" size="17" style="width:180px;height:260px" id="resultList" onDblClick="listSelect.delSelect();">
                </select>
            </td>
            <td width="5%" align="center">
    	        <a href="javascript:void(0);" onClick="listSelect.moveResult(-1);"><img src="<%=sUserStylePath%>ucapimages/arrow_asc.gif"/></a><br />
   	            <br /><a href="javascript:void(0);" onClick="listSelect.moveResult(1);"><img src="<%=sUserStylePath%>ucapimages/arrow_desc.gif" /></a>
   	        </td>
   	          </tr>
	          </table>
	  </td>
  </tr>
</table>
</body>