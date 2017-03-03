<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/core/params.jsp" %>
<%
	String type = request.getParameter("type");
	String selNum = request.getParameter("selNum");
	String inputName = request.getParameter("inputName");
	String inputSplit = request.getParameter("inputSplit");
	String outSplit = request.getParameter("outSplit");
	String arg = request.getParameter("arg");
%>
${import_jquery}
${import_ztree}
<link rel="stylesheet" href="<%=path%>/uistyle/style_1/css/ucap.css" type="text/css">
<script type="text/javascript" src="<%=path%>/default/js/common.js"></script>
<script type="text/javascript" src="<%=path%>/core/select/js/selectWindow.js"></script>
<body style="overflow: hidden;">
<table border="0" style="width:100%;height:100%;" align="center" cellpadding="0" cellspacing="0" bordercolorlight="#D3F0F9" bordercolordark="#FFFFFF">
  <tr>
    <td width="100%" valign="top">
    <div id="dialogHtml">
    <table border="0" cellpadding="0" cellspacing="0" class="tableSet2">
      <tr>
        <th width="100px">选择类型：</th>
        <td id="selectTypeId" >&nbsp;&nbsp;</td>
        <td width="100px" id='selectcheckId'>
        	级联选择：<input id='checkCascade' type='checkbox' onclick="listSelect.checkChanged(this);">
        </td>
        <td width="100px" id='allPath'>
        	包含路径：<input id='allPathCascade' type='checkbox' onclick="listSelect.allPathSelect(this);">
        </td>
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
                <div id="tree" style="width:230px;height:360px;border:#D3F0F9 1px solid;overflow:auto;"><!-- display:none -->
                	<ul id="treeSelect" class="ztree"></ul>
                </div>
                <select name="selectList" id="selectList" size="17" style="width:230px;height:260px;display:none" id="selectList" onDblClick="listSelect.addSelect();">
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
                    <li id="btnAddAllId">
        	          <input name="btnAddAll" type="button" class="btnChannel" id="button2" value="全添"  onClick="listSelect.addAll();"/>
        	        </li>
        	        <li>&nbsp;</li>
                    <li id="btnDelAllId">
        	          <input name="btnDelAll" type="button" class="btnChannel" id="button3" value="全删"  onClick="listSelect.delAll();"/>
        	        </li>
                </ul>
            </td>
          <td width="40%">
                <select name="resultList" size="17" style="width:230px;height:360px;" id="resultList" onDblClick="listSelect.delSelect();">
                </select>
            </td>
            <td width="5%" align="center">
    	        <a href="javascript:void(0);" onClick="listSelect.moveResult(-1);" title="上移"><img src="<%=path%>/uistyle/style_1/ucapimages/arrow_asc.gif"/></a><br />
   	            <br /><a href="javascript:void(0);" onClick="listSelect.moveResult(1);" title="下移"><img src="<%=path%>/uistyle/style_1/ucapimages/arrow_desc.gif" /></a>
   	        </td>
   	          </tr>
	          </table>
	  </td>
  </tr>
  <tr>
  	<td width="100%;" align="center">
  		<input type="button" id="isOk" value="确定" onclick="listSelect.sureSelect();" class="btnChannel" />
  		<input type="button" id="isQuit" value="取消" onclick="top.lwin.close();" class="btnChannel" style="margin-left: 25%;"/>
  	</td>
  </tr>
</table>
<script type="text/javascript">
	jQuery(document).ready(function(){
		listSelect.initData('<%=type%>', '<%=selNum%>', '<%=inputName%>', '<%=inputSplit%>', '<%=outSplit%>', '<%=arg%>');
		listSelect.initTypes();
		if (listSelect.selNum == "0"){
			jQuery("#btnAddAllId").show();
			jQuery("#btnDelAllId").show();
		} else {
			jQuery("#btnAddAllId").hide();
			jQuery("#btnDelAllId").hide();
		}
	});
</script>
</body>