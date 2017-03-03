<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.frame.util.GlobalUtils"%>
<%@page import="com.linewell.ucap.util.UcapRequest" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="org.apache.commons.lang.StringUtils"%>

<%
	//如果是来源是视图，则要进行转化 1 视图、2 RSS、3 JSON 4 URL 
	UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
	String sourceType=ucapRequest.getParameter("sourceType");
	String viewName = "";
	String source ="";
	if(sourceType!=null && sourceType.equals("1")){		
		source = ucapRequest.getParameter("source");
		viewName = GlobalUtils.getView(ucapRequest).getDisplayName(source);
		//对于数据来源为空时，显示null的解决  cgc 2011.5.25
		if(StringUtils.isEmpty(viewName)){
			viewName="";
		}
	}
	
 %> 
<body>
	<div id="dialogHtml">
<table border="0" class="tableSet">
  <tr>
    <th width="13%">频道名称</th>
    <td ><input type="text" class="inputbox" name="channelName" id="channelName" style="width:95%" /></td>
    <th width="13%">图标</th>
    <td>
    <select name="titlePicture" id="titlePicture" onchange="titleIconChange(this)" >
    	<option value="">无</option>
       <%
       	  
       	  for(int i=1;i<102;i++){%>
            <option value="<%="uistyle/images/icon/icon_"+i+".gif"%>"><%=i%></option>
        <% }%>
    </select>  
   	 <img id="titleIconImg" src="" />    
	</td>    
  </tr>
  <tr>
    <th width="13%" >频道高度</th>
	<td  width="43%">
		<input type="text" class="inputbox" name="channelHeight" id="channelHeight" style="width:30%"/>(像素)
		<input type="checkbox" name="adaptive" id="adaptive" value="1" />自适应
	</td>
	 <th id="recorddiv1" >记录数</th>
     <td id="recorddiv2"><input type="text" class="inputbox" name="rowNum" id="rowNum"/></td>
  </tr>
  <tr id="recorddiv3">   
    <th >记录图标</th>
    <td><select name="dataPicture" id="dataPicture" onchange="docIconChange(this)"  >
    	<option value="">无</option>
    	<%
       	  for(int i=1;i<14;i++){%>
             <option value="<%="uistyle/images/list/list"+i+".gif"%>"><%=i%></option>
        <% }%>
     </select>  
   	 <img id="docIconImg" src="" /> &nbsp;&nbsp;<span id="columnDiv">显示列数
   	 	<input type="text" class="inputbox" name="column" id="column" style="width:20%" />
   	 </span>
   	 
   	 
   	  </td>
    
    <th >是否滚动</th>
    <td><input name="roll" id="roll" type="radio" value="1" onclick="rollClk(1)" />
      是
      <input type="radio" name="roll" id="roll" value="0" onclick="rollClk(0)" />
      否</td>
  </tr>
  <tr id ="rolltr" style="dispaly:none">    
    <th>滚动方式</th>
    <td><select name="rollType" id="rollType" >
      <option value="up">向上滚动</option>
      <option value="down">向下滚动</option>
      <option value="left">向左滚动</option>
      <option value="right">向右滚动</option>
    </select>    </td>
    <th title="数越小，速度越慢，建议用2">滚动速度</th>
    <td><input type="text" class="rollSpeed" name="rollSpeed" id="rollSpeed" qtip="数越小，速度越慢，建议用2" /></td>
  </tr>
 <tr>
    <th width="13%"><div id="sourceText"></div></th>
    <td colspan="3" >
 	 <% if(!"1".equals(sourceType)){ %>	
    	<input class="channelTextarea" rows="3" type="text"  name="source" id="source"
    			nameEn="source" source="218" sourceType="20"	
    			style="width:98%"/>&nbsp;    
      <%} else { %>
      		<input type="hidden"  name="source" id="source" 				   
				/>
			<input class="channelTextarea" rows="3" type="text"  name="source_Cn_" id="source_Cn_"
				    nameEn="source" source="218" sourceType="20" class="inputred" readonly	
				style="width:80%"/>
      		 <input id="_btn01" type="button" value="选" onclick="selectDataSD('218','1','source');" />
    		 <input id="_btn02" type="button" value="选" onclick="selectpermissionView(1);" />
      <%} %>

    </td>
  </tr> 
  <tr id="ucap_tr_viewDocOpenType" style="display:none;">
    <th width="13%">打开方式<br></th>
    <td colspan="3" ><!-- 目前不支持当前窗口01,因为这会导致关闭的时候重新加载频道,将来再考虑 add by jc 20100622 -->
    				<input type="radio"  name="viewDocOpenType" id="viewDocOpenType" value="00" checked/>新窗口
    				<input type="radio"  name="viewDocOpenType" id="viewDocOpenType" value="02"/>DIV窗口&nbsp;
    <br></td>
  </tr> 
</table>
</div>
<script type="text/javascript">
	function init(){
		var json= ucapPortal.portletType.channel;
//		Ext.getDom("source").innerHTML= json.source;
		var field,value;
		if (typeof(json.titlePicture)=="undefined") json.titlePicture="";
		if (typeof(json.recordPicture)=="undefined") json.recordPicture ="";
		if (typeof(json.column)=="undefined") json.column ="";
		if (typeof(json.isRoll)=="undefined") json.isRoll = 0;
		json.roll = json.roll?1:0;
		
		var type = "<%=sourceType%>";
		if(type!="1"){
			field =["channelName","source","titlePicture","rowNum","dataPicture","roll","column","viewDocOpenType"];
	    	value =[json.channelName,json.source,json.titlePicture,json.rowNum,json.dataPicture,json.roll,json.column,json.viewDocOpenType];
		}else{
			field =["channelName","titlePicture","rowNum","dataPicture","roll","column","viewDocOpenType"];
	    	value =[json.channelName,json.titlePicture,json.rowNum,json.dataPicture,json.roll,json.column,json.viewDocOpenType];
		}
	    var jsonValue =ucapCommonFun.getJsonValue(field,value);	    
		var height;
		if (ucapPortal.portletType.disType==10){
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
		rollClk(json.isRoll);
		if (json.roll==1){
			field[field.length]="rollType";
			value[value.length]=json.rollType;
			field[field.length]="rollSpeed";
			value[value.length]=json.rollSpeed;
		}
		jsonValue = "{"+jsonValue+","+ucapCommonFun.getJsonValue(field,value)+"}";
		ucapCommonFun.bindForm(jsonValue);
		Ext.getDom("titleIconImg").src =ucapSession.appPath+ json.titlePicture;
		Ext.getDom("docIconImg").src =ucapSession.appPath+ json.dataPicture;
		
		ucapChannel.oldJson = ucapCommonFun.getFormJSon("dialogHtml");		
		if (json.style==10){
			Ext.getDom("recorddiv1").style.display="none";
			Ext.getDom("recorddiv2").style.display="none";
			Ext.getDom("recorddiv3").style.display="none";
		}
		if(json.sourceType=="01" && (json.style=="01" || json.style=="02" || json.style=="03")){
			if($("ucap_tr_viewDocOpenType"))
						$("ucap_tr_viewDocOpenType").style.display="";
		}
		
	}
	function rollClk(v){
		if (v==1){
			rolltr.style.display="";
		} else {
			rolltr.style.display="none";
		}
	}
	function titleIconChange(obj){
		var icon ="";
		if (obj.value!=""){
			icon = ucapSession.appPath+obj.value;			
		} else {
			icon="";
		}
		Ext.getDom("titleIconImg").src = icon;
	}
	function docIconChange(obj){
		if (obj.value=="")  Ext.getDom("docIconImg").src ="";
	    var icon = ucapSession.appPath+obj.value;
	    Ext.getDom("docIconImg").src = icon;
	}
	Ext.onReady(function(){
		init();
		var type = "<%=sourceType%>";
		var viewName="<%=viewName%>";
		Ext.getDom("sourceText").innerHTML= ucapChannel.getChannelSourceText(type);
		if (type=="1"){
			_UcapForm.tool.embellishForm("dialogHtml");
			Ext.getDom("source_Cn_").value = viewName;
			Ext.getDom("source").value = "<%=source%>";
			if(!ucapHeader.selfConfig){//如果不能自定义的话，用户不能选择视图，以免保密数据泄露
				if(Ext.getDom("btn_source"))
					Ext.getDom("btn_source").style.display="none";
			}
		}
		if(type=="1")
			bunChange();	
	});
	//新增
	function bunChange(){
		var status=ucapSession.userJson.userStatus;
		if(1!=status){
			if(Ext.getDom("_btn01").style.display==""){
				Ext.getDom("_btn01").style.display ="none";
				Ext.getDom("_btn02").style.display ="";
			}
		}else{
			Ext.getDom("_btn02").style.display ="none";
		}
	}
	
	//新增“选”的弹出窗体
	function selectpermissionView(type){
		var html = "sys/cfgJsp/portal/selectPermissionView.jsp";
		var title = "视图选择框";
		var inputValue = Ext.getDom("source").value;
		config(type,html,title,1,inputValue);
	}
	
	function config(type,phtml,ptitle,permissionType,inputValue){
    	var formUnid = "";
		var unid = "";
		unid = ucapSession.userJson.roles;
	    if(null!=unid && unid.indexOf(",")>0){
	        unid = unid.substring(0,unid.indexOf(","));
	    }
	
		var html=phtml+"?unid="+unid+"&formId="+formUnid+"&inputValue="+inputValue;
		var button=[
					{text:"确定",handler:function(){getResult()}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close()}
					}];
		ucapSession.commonWin = new window.top.Ext.Window({//
			title:ucapSession.win.winImg+ptitle,
		    width:510,
		    closable:true,    //取消
		    modal: true,     
			height:470,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();
    }
    
    //确定按钮返回值
	function getResult(){
		var topWin = window.top;
		var resJson = topWin.document.getElementById("resJson").value;
		resJson=Ext.decode(resJson);
		var exResult=ucapCommonFun.dealException(resJson);
		if(exResult){
			if(resJson.k){
				Ext.getDom("source").value =resJson.k;
				Ext.getDom("source_Cn_").value =resJson.v;			
			}
			ucapSession.commonWin.close();
		}

	}
</script>
</body>