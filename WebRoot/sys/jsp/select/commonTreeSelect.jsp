<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.frame.util.GlobalUtils"%>
<%@page import="com.linewell.ucap.util.UcapRequest" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@include file="/sys/jsp/jspSession.jsp"%>
<%
	UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
	String unid = ucapRequest.getParameter("unid");
	String type = ucapRequest.getParameter("type");
	String conValue = ucapRequest.getParameter("conValue");
	
	if(null==unid)unid = "";
	if(null==conValue)conValue = "";
	String cnName ="";
	if (unid!=null && !unid.equals("") && type!=null && !type.equals("")){
		Integer iType =new Integer(Integer.parseInt(type));
		cnName = GlobalUtils.getDisplayName(iType,ucapRequest,unid);
	}
 %>
<body>
<div >
<script type="text/javascript">
	Ext.onReady(function(){		
		ucapTreeSelect.createTree("<%=unid%>","<%=cnName%>","<%=conValue%>");		
	});	 
</script>


<table width="100%" align="center" cellpadding="0" cellspacing="0">
  <tr>
	  <td width="35%">
		  <table >
		  	<tr> <td >
		  	
	  	    	<!-- 
		  	    	2012-06-28 mdy by wyongjian@linewell.com 
					此页面引用的CSS文件中已包含overflow:auto，此处再次设置将会出错，去掉overflow:auto即可
					解决BUG1179-字典弹出框，不需要出现滚动条时也出现的问题
		  	     -->
				<div id="commonSelectTree" style="border:#D3F0F9 1px solid;width:190px"></div>
				<!-- 
					end 2012-06-28 mdy by wyongjian@linewell.com 
				-->
		    </td></tr>
		  </table>
	  </td>
  <td>
  	<div id="multiSelect">
	   <table>
	  	<tr>
		    <td width="15%">
				<ul>
			       	<li>
			       	  <input name="btnadd" type="button" class="btnChannel" id="button" value="添加" onClick="listSelect.addSelect();"/>
			       	</li>
					<li>&nbsp;</li>
			           <li>
			       	  <input name="btndel" type="button" class="btnChannel" id="button" value="删除"  onClick="listSelect.delSelect();"/>
			       	</li>
			       <!-- <li>&nbsp;</li>
			           <li>
			       	  <input name="btnAddAll" type="button" class="btnChannel" id="button" value="全添"  onClick="listSelect.addAll();"/>
			       	</li> -->	
			       	<li>&nbsp;</li>
			           <li>
			       	  <input name="btnDelAll" type="button" class="btnChannel" id="button" value="全删"  onClick="listSelect.delAll();"/>
			       	</li>
			     </ul>
		  </td>
	  
		  	<td width="40%">
			    <select name="resultList" size="20" style="width:180px" id="resultList" onDblClick="listSelect.delSelect();">
			    </select>
			</td>
		
	 	 <td width="5%" align="center">
	    	<a href="javascript:void(0);" onClick="listSelect.moveResult(-1);"><img src="<%=sUserStylePath%>ucapimages/arrow_asc.gif"/></a><br />
	   	  <br /><a href="javascript:void(0);" onClick="listSelect.moveResult(1);"><img src="<%=sUserStylePath%>ucapimages/arrow_desc.gif" /></a>
	   	  </td>
   	   	</tr>
   	   </table>
  </div>
  </td>
 </tr>
</table>
</div>
</body>