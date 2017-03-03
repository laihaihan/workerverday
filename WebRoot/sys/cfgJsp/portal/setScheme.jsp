<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/sys/jsp/jspSession.jsp"%>
<%@page import="com.linewell.ucap.frame.util.GlobalUtils"%>
<%@page import="com.linewell.ucap.util.UcapRequest" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%
	String moduleName="";
	String index = scheme.getIndex();
	//System.out.println(index+ scheme.getIndexType());
	
	if (scheme.getIndexType().equals("02") && index!=null){
		UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
		moduleName =  GlobalUtils.getModule(ucapRequest).getDisplayName(index);
	}
 %>
<body> 
<script type="text/javascript">
	Ext.onReady(function(){		
		var openStyle = "<%=scheme.getOpenStyle()%>";
		var indexType = "<%=scheme.getIndexType()%>";
		var index = "<%=scheme.getIndex()%>";
		
		var field=["openStyle","indexType","index"];
		var value=[openStyle,indexType,index];
		var	jsonValue = "{"+ucapCommonFun.getJsonValue(field,value)+"}";
		ucapCommonFun.bindForm(jsonValue);
		if (indexType=="02"){
			Ext.getDom("index_Cn_").value="<%=moduleName%>";
		}
	}); 
	function typeChange(obj){
		var v= obj.value;
		if (v=="02" ){
			Ext.getDom("_btn").style.display="";
			Ext.getDom("index").style.display="none";
			Ext.getDom("index_Cn_").style.display="";
		} else {
			Ext.getDom("index").style.display="";
			Ext.getDom("index_Cn_").style.display="none";
			Ext.getDom("_btn").style.display="none";
			if (v=="01"){
				Ext.getDom("index").style.display="none";
			}
		}
	}
</script>

<div id="dialogHtml">
 <table border="0" align="center" class="tableSet">
   <tr>
   	<th>视图打开方式</th>
    <td><input name="openStyle" type="radio" id="openStyle" value="01" checked="checked" />
      页签式<input type="radio" name="openStyle" id="openStyle" value="02" /> 普通式
    </td>
    <th>首页类型</th>
    <td>
	    <input name="indexType" type="radio" id="indexType" value="01"
	     checked="checked"  onclick="typeChange(this);" />频道
	  	<input type="radio" name="indexType" id="indexType" value="02" onclick="typeChange(this);" />模块
		<input type="radio" name="indexType" id="indexType" value="03" onclick="typeChange(this);"/>URL
	</td>    
  </tr>
  <tr>
    <th>首页类型值</th>
    <td colspan="3"><input type="text"  id="index" name="index" style="width:90%"/>
    <input type="text"  id="index_Cn_" name="index_Cn_" style="width:90%" readonly/>
    <input id="_btn" type="button" value="选" onclick="selectDataSD('215','1','index');" />
    </td>
  </tr>
</table>
</div>
</body>


	
