<%@page contentType="text/html;charset=UTF-8"%>
<body>
<script type="text/javascript">
	//新增“选”的弹出窗体
	function selectpermissionView(type){
		var html = "sys/cfgJsp/portal/selectPermissionView.jsp";
		var title = "视图选择框";
		config(type,html,title,1);
	}
	
	function config(type,phtml,ptitle,permissionType){
    	var formUnid = "";
		var unid = "";
		unid = ucapSession.userJson.roles;
	    if(null!=unid && unid.indexOf(",")>0){
	        unid = unid.substring(0,unid.indexOf(","));
	    }
	
		var html=phtml+"?unid="+unid+"&formId="+formUnid;
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
	
	
	
	
	
	//新增
	function bunChange(v){
		if(v=="01"){
			var status=ucapSession.userJson.userStatus;
			if(1!=status){
				if(Ext.getDom("_btn01").style.display==""){
					Ext.getDom("_btn01").style.display ="none";
					Ext.getDom("_btn02").style.display ="";
				}
			}else{
				Ext.getDom("_btn02").style.display ="none";
			}
		}else{
			Ext.getDom("_btn02").style.display ="none";
		}
	}
	
	Ext.onReady(function(){		
		rollClk(0);
		styleChange("01");
		typeChange("01");
				
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
	function styleChange(v){
		if (v!="02" && v!="03"){
			imgid.style.display="none";
		} else {
			imgid.style.display="";
		};
		recordimg.style.display="";
		rollid.style.display="";
		if (v=="04" || v=="05" ||v=="06" ||v=="07" || v=="08" || v=="09" || v=="10" ){
			recordimg.style.display="none";
			rollid.style.display="none";
		}
		//过滤可选择的类型  by@cgc 2011-7-29   start
		var select = document.getElementById("sourceType");
		if(v=="01"){
			var text=new Array("视图","RSS","JSON");
   			var value=new Array("01","02","03");
  			addOptions(select,text,value);
		}
		if(v=="02"||v=="03"){//增加"图文环绕"和"图文并茂"与数据源的对应关系的处理  add by zzhan@linewell.com
			var text=new Array("视图");
   			var value=new Array("01");
  			addOptions(select,text,value);
		}
		if(v=="04" || v=="05" ||v=="06" ||v=="07" || v=="09"){
			var text=new Array("URL地址");
   			var value=new Array("04");
  			addOptions(select,text,value);
		}
		if(v=="08"){
			var text=new Array("快捷方式");
   			var value=new Array("05");
   			addOptions(select,text,value);
		}
		if(v=="10"){
			var text=new Array("视图");
   			var value=new Array("01");
   			addOptions(select,text,value);
		}
		//过滤可选择的类型  by@cgc 2011-7-29   end		
	}
	//移除所有的选择项   by@cgc 2011-7-29
	function removeOptions(select){
  		var length = select.length; 
		for(var i=length-1;i>=0;i--){ 
			select.remove(i); 
		} 
	}
	//添加选择项   by@cgc 2011-7-29
	function addOptions(select,textList,valueList){
		removeOptions(select);
   		for(var i=0;i<textList.length;i++){
   			var item = new Option(textList[i],valueList[i]);
   			select.options.add(item);
   			//解决通频道样式为快捷方式时，数据来源值的选择框应为快捷方式集选择框，而不是视图选择框 add by jc 20120315
   			if(i==0){
   				typeChange(valueList[i]);
   			}
   		}
	}
	
	function typeChange(v){
		Ext.getDom("_btn01").style.display="none";
		Ext.getDom("_btn05").style.display="none";
		if (v=="01" || v=="05"){
			Ext.getDom("_btn"+v).style.display="";
			Ext.getDom("source").style.display="none";
			Ext.getDom("source_Cn_").style.display="";
		} else {
			Ext.getDom("source").style.display="";
			Ext.getDom("source_Cn_").style.display="none";
		}
		bunChange(v);
	}
</script>

<div id="dialogHtml">
<input type=hidden name=unid id=unid>
<table border="0" class="tableSet">
  <tr>
    <th  width="15%" >频道名称</th>
    <td  width="30%" ><input type="text" class="inputbox" name="channelName" style="width:95%" /></td>
    <th width="15%" >图标</th>
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
    <th>频道样式</th>       
	<td >
	    <select name="style" id="style" onchange="styleChange(this.value)"  >
    	<option value="01">列表</option>
    	<option value="10">表格方式</option>
    	<option value="02">图文环绕</option>
    	<option value="03">图文并茂</option>
    	<option value="04">FLASH</option>
    	<option value="05">VIDEO</option>
    	<option value="06">音乐播放</option>
    	<option value="07">图表</option>
    	<option value="08">快捷方式</option>
    	<option value="09">URL</option>
       </select>	</td>
	 <th>数据来源</th>
     <td > <select name="sourceType" id="sourceType" onchange="typeChange(this.value);"  >
    	<option value="01">视图</option>
    	<option value="02">RSS</option>
    	<option value="03">JSON</option>
      </select>
      </td>
  </tr>  
  <tr id="embellish_tr">
    <th >渲染事件名</th>
	<td colspan="9">
		<input type="text" class="inputbox" name="embellish" id="embellish" style="width:95%"/>
	</td>
  </tr>
  <tr>
    <th >数据来源值</th>
	<td colspan="9">
		<input type="text" class="inputbox" name="source" id="source" style="width:95%"/>
		<input type="text" class="inputred" id="source_Cn_" name="source_Cn_" style="width:90%" readonly/>
 
    <input id="_btn01" type="button" value="选" onclick="selectDataSD('218','1','source');" />
    <input id="_btn02" type="button" value="选" onclick="selectpermissionView(1);" />
    <input id="_btn05" type="button" value="选" onclick="selectDataSD('209','1','source');" />
 
	</td>
  </tr>
  <tr>
    <th>频道高度</th>
	<td >
		<input type="text" class="inputbox" name="channelHeight" style="width:30%"/>(像素)
		<input type="checkbox" name="adaptive" id="adaptive" value="1" />自适应
	</td>
	
  </tr>
  
  <tr id="imgid" style="dispaly:none">
    <th >图片所在列数</th>
	<td >
		<input type="text" class="inputbox" name="pictureColumn" id="pictureColumn" style="width:30%"/>
	</td>
	 <th>大小(像素)</th>
     <td >宽度<input type="text" class="inputbox" name="pictureWidth" id="pictureWidth" style="width:30%"/>
     高度
     <input type="text" class="inputbox" name="pictureHeight" id="pictureHeight" style="width:30%"/></td>     
  </tr>  
  <tr id="recordimg">  
  	 <th>记录数</th>
     <td ><input type="text" class="inputbox" name="rowNum" id="rowNum"/></td>
    <th >记录图标</th>
    <td><select name="dataPicture" id="dataPicture" onchange="docIconChange(this)"  >
    	<option value="">无</option>
    	<%
       	  for(int i=1;i<14;i++){%>
             <option value="<%="uistyle/images/list/list"+i+".gif"%>"><%=i%></option>
        <% }%>
     </select>  
   	 <img id="docIconImg" src="" />  &nbsp;&nbsp;<span id="columnDiv">显示列数
   	 	<input type="text" class="inputbox" name="column" id="column" style="width:20%" />
   	  </td>
  </tr>
  <tr id="rollid">    
    <th>是否滚动</th>
    <td><input name="isRoll" id="isRoll" type="radio" value="1" onclick="rollClk(1)" />
      是
      <input type="radio" name="isRoll" id="isRoll" value="0" onclick="rollClk(0)" checked />
      否</td>
  </tr>
  <tr id ="rolltr" style="dispaly:none">    
    <th>滚动方式</th>
    <td><select name="rollType" id="rollType">
      <option value="01">向上滚动</option>
      <option value="02">向下滚动</option>
      <option value="03">向左滚动</option>
      <option value="04">向右滚动</option>
    </select>    </td>
    <th>滚动速度</th>
    <td><input type="text" class="rollSpeed" name="rollSpeed" id="rollSpeed"/></td>
  </tr>
</table>
</div>
</body>


	
