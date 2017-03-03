<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.frame.util.GlobalUtils"%>
<%@page import="com.linewell.ucap.util.UcapRequest" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>

<%
	UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
	String source = ucapRequest.getParameter("source");
	String cutName = GlobalUtils.getShortCuts(ucapRequest).getDisplayName(source);
 %> 
<body>
<script type="text/javascript">
	Ext.onReady(function(){		
		//初始化页面的值
		var json= ucapPortal.portletType.channel;		
		var field,value;
		if (typeof(json.titlePicture)=="undefined") json.titlePicture="";
		field =["channelName","source","titlePicture"];
	    value =[json.channelName,json.source,json.titlePicture];
	    var jsonValue =ucapCommonFun.getJsonValue(field,value);	
	    var height;
		if (ucapPortal.portletType.disType==9){
			height = json.items["height"];			
		} else{
			height =json.height;
		}
		if(typeof(height)=="undefined") height=0;
		if (height==0){
			field =["adaptive"];
			value =[1];
		} else{
			field =["channelHeight"];
			value =[height];
		}	
		jsonValue = "{"+jsonValue+","+ucapCommonFun.getJsonValue(field,value)+"}";
		ucapCommonFun.bindForm(jsonValue);
		Ext.getDom("titleIconImg").src =ucapSession.appPath+ json.titlePicture;
		ucapChannel.oldJson = ucapCommonFun.getFormJSon("dialogHtml");		
		_UcapForm.tool.embellishForm("dialogHtml");
		Ext.getDom("source_Cn_").value = "<%=cutName%>";
	});
	function titleIconChange(obj){
		var icon ="";
		if (obj.value!=""){
			icon = ucapSession.appPath+obj.value;			
		} else {
			icon="";
		}
		Ext.getDom("titleIconImg").src = icon;
	}
</script>

<div id="dialogHtml">
	<table border="0" class="tableSet">
		<tr>
			<th width="15%" >标题名称</th>
			<td width="31%"><input type="text" class="inputbox" name="channelName" id="channelName" style="width:80%"/>
			</td>
			<th width="15%" >频道高度</th>
			<td colspan="2" width="43%">
				<input type="text" class="inputbox" name="channelHeight" id="channelHeight" style="width:30%"/>(像素)
				<input type="checkbox" name="adaptive"  id="adaptive" value="1" />自适应
			</td>
		</tr>
		<tr>
			<th>标题图标</th>
			<td colspan="9">
			    <select name="titlePicture" id="titlePicture" onchange="titleIconChange(this)" >
			    	<option value="">无</option>
			       <%
			       	  
			       	  for(int i=1;i<103;i++){%>
			            <option value="<%="uistyle/images/icon/icon_"+i+".gif"%>"><%=i%></option>
			        <% }%>
			    </select>  
			   	 <img id="titleIconImg" src="" />    
			</td>    
		</tr>
		<tr>
			<th width="13%" >快捷方式</th>
			<td width="13%"colspan="9">
			<input type="text"  name="source" id="source"
    			nameEn="source" source="209" sourceType="20"	
    				style="width:98%"/>
    			</td>
		</tr>
</table>
</div>
</body>


	
