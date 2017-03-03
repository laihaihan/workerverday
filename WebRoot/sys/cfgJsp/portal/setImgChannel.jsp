<%@page contentType="text/html;charset=UTF-8"%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){		
		//初始化页面的值
	//	
		var json= ucapPortal.portletType.channel;		
		var field,value;
		if (typeof(json.titlePicture)=="undefined") json.titlePicture="";
		if (typeof(json.recordPicture)=="undefined") json.recordPicture ="";
		if (typeof(json.isRoll)=="undefined") json.isRoll = 0;
		field =["channelName","source","titlePicture","rowNum","dataPicture",
					"isRoll","pictureColumn","pictureWidth","pictureHeight"];
	    value =[json.channelName,json.source,json.titlePicture,json.rowNum,
	    		json.dataPicture,json.isRoll,json.pictureColumn,json.pictureWidth,json.pictureHeight];
	    var jsonValue =ucapCommonFun.getJsonValue(field,value);	    
		if (json.height==0){
			field =["adaptive"];
			value =[1];
		} else{
			field =["channelHeight"];
			value =[json.height];
		};
		rollClk(json.isRoll);
		if (json.isRoll==1){
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
	});
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
</script>

<div id="dialogHtml">
<table border="0" class="tableSet">
  <tr>
    <th width="14%" >频道名称</th>
    <td ><input type="text" class="inputbox" name="channelName" id="channelName" style="width:95%" /></td>
    <th width="15%">图标</th>
    <td>
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
    <th width="15%" >频道高度</th>
	<td  width="43%">
		<input type="text" class="inputbox" name="channelHeight" id="channelHeight" style="width:30%"/>(像素)
		<input type="checkbox" name="adaptive" id="adaptive" value="1" />自适应
	</td>
	 <th>记录数</th>
     <td ><input type="text" class="inputbox" name="rowNum" id="rowNum"/></td>
  </tr>
  
  <tr>
    <th >图片所在列数</th>
	<td>
		<input type="text" class="inputbox" name="pictureColumn" id="pictureColumn" style="width:30%"/>
	</td>
	 <th>大小(像素)</th>
     <td >宽度<input type="text" class="inputbox" name="pictureWidth" id="pictureWidth" style="width:30%"/>
     高度
     <input type="text" class="inputbox" name="pictureHeight" id="pictureHeight" style="width:30%"/></td>
  </tr>  
  <tr>   
    <th >记录图标</th>
    <td><select name="dataPicture" id="dataPicture" onchange="docIconChange(this)"  >
    	<option value="">无</option>
    	<%
       	  for(int i=1;i<14;i++){%>
             <option value="<%="uistyle/images/list/list"+i+".gif"%>"><%=i%></option>
        <% }%>
     </select>  
   	 <img id="docIconImg" src="" />  </td>
    
    <th>是否滚动</th>
    <td><input name="isRoll" type="radio" id="isRoll" value="1" onclick="rollClk(1)" />
      是
      <input type="radio" name="isRoll" id="isRoll"  value="0" onclick="rollClk(0)" />
      否</td>
  </tr>
  <tr id ="rolltr" style="dispaly:none">    
    <th>滚动方式</th>
    <td><select name="rollType" id="rollType" >
      <option value="01">向上滚动</option>
      <option value="02">向下滚动</option>
      <option value="03">向左滚动</option>
      <option value="04">向右滚动</option>
    </select>    </td>
    <th>滚动速度</th>
    <td><input type="text" class="rollSpeed" name="rollSpeed" id="rollSpeed" /></td>
  </tr>
 <tr>
    <th>内容</th>
      <td colspan="9"><TEXTAREA class="channelTextarea" rows="3" type="text"  name="source" id="source" style="width:98%"></TEXTAREA>&nbsp;
    </td>    
  </tr> 
</table>
</div>
</body>


	
