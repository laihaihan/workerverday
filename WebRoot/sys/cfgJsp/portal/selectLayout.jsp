<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/sys/jsp/jspSession.jsp"%> 
<body>
<script type="text/javascript">
	Ext.onReady(function(){
		setRadio(1);
		if (typeof(ucapPortal)!="undefined"){
			if (typeof(ucapPortal.ucapPortalObj)!="undefined"){
				var type = 	ucapPortal.ucapPortalObj.type;
				if (typeof(type)=="undefined") type =1;
				setRadio(type);
				if (type=="18" || type==18){
					Ext.getDom("column").value=ucapPortal.ucapPortalObj.column;
					Ext.getDom("columnWidth").value=ucapPortal.ucapPortalObj.columnWidth;
				}
			}
		}		
	});
	function setRadio(v){
		var field =["layoutStyle"];
		var value = new Array();
		value[0]=  v
		var jsonValue = "{"+ucapCommonFun.getJsonValue(field,value)+"}";
		ucapCommonFun.bindForm(jsonValue);
		Ext.getDom("userDefine").style.display="none";
		if (v=="18" || v==18){
			Ext.getDom("userDefine").style.display="";
			Ext.getDom("column").focus();
		}
	}
	function setWidth(obj){
	 	try{
			if (obj.value!="" && Ext.getDom("columnWidth").value==""){
				var n =parseInt(obj.value);
				var w = parseInt(100/n);
				var v =w;
				for (var i=1;i<n;i++){
					v +=","+w;
				}
				Ext.getDom("columnWidth").value= v;
			};
		} catch(e){};
	}
</script>

<div id="dialogHtml">
<table border="0" cellpadding="0" cellspacing="0" align="center" class="styleBox">
  <tr>
    <td >布局样式</td>
  </tr>
  <tr>
    <td class="layOutBox">
    	<ul > 
        	<li onclick="setRadio(1)"><img src="<%=sUserStylePath%>ucapimages/layout_1.gif" class="layoutFrame" /><br />
        	<input name="layoutStyle"  id="layoutStyle" type="radio" value="1"  />1:1:1</li>
            <li onclick="setRadio(2)"><img src="<%=sUserStylePath%>ucapimages/layout_2.gif" class="layoutFrame" /><br />
            <input name="layoutStyle"  id="layoutStyle" type="radio" value="2" />1:1</li>
          <li onclick="setRadio(3)"><img src="<%=sUserStylePath%>ucapimages/layout_3.gif" class="layoutFrame" /><br />
          <input name="layoutStyle"  id="layoutStyle" type="radio" value="3" />  1:3</li>
            <li onclick="setRadio(4)"><img src="<%=sUserStylePath%>ucapimages/layout_4.gif" class="layoutFrame" /><br />
            <input name="layoutStyle"  id="layoutStyle" type="radio" value="4" />2:1</li>
            <li onclick="setRadio(5)"><img src="<%=sUserStylePath%>ucapimages/layout_5.gif" class="layoutFrame" /><br />
            <input name="layoutStyle"  id="layoutStyle" type="radio" value="5"/>3:1</li>
            <li onclick="setRadio(6)"><img src="<%=sUserStylePath%>ucapimages/layout_6.gif" class="layoutFrame" /><br />
            <input name="layoutStyle"  id="layoutStyle" type="radio" value="6" />1:2</li>
            <li onclick="setRadio(7)"><img src="<%=sUserStylePath%>ucapimages/layout_7.gif" class="layoutFrame" /><br />
            <input name="layoutStyle"  id="layoutStyle" type="radio" value="7" />1:2:1</li>
            <li onclick="setRadio(18)"><img src="<%=sUserStylePath%>ucapimages/layout_8.gif" class="layoutFrame" /><br />
            <input name="layoutStyle"  id="layoutStyle" type="radio" value="18" />自定义</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td height="8"></td>
  </tr>
  <tr>
    <td id = "userDefine" >
    	<ul>
        	<li>总列数：
        	  <input type="text" class="inputbox" onblur="setWidth(this);" size="3" style="width:5%" name="column" id ="column"/>
        	列宽度(百分比%，以小写逗号分隔，不用输入%)：
       	      <input type="text" class="inputbox"   name="columnWidth"  id="columnWidth" style="width:22%"  />
   		  </li>          
    	</ul>
    </td>
  </tr>
</table>
</div>
</body>

	
