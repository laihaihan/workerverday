<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/sys/jsp/jspSession.jsp"%> 
<body>
<script type="text/javascript">
	Ext.onReady(function(){
		var type;
		if (typeof(ucapMenu)!="undefined"){
			if (typeof(ucapMenu.menuType)!="undefined"){
				type = 	ucapMenu.menuType;
			}
		}	
		if (typeof(type)=="undefined") type =1;
		setRadio(type);				
	});
	function setRadio(v){
		var field =["menuStyle"];
		var value = new Array();
		value[0]=  v
		var jsonValue = "{"+ucapCommonFun.getJsonValue(field,value)+"}";
		ucapCommonFun.bindForm(jsonValue);	
	}	
</script>

<div id="dialogHtml">
<table border="0" cellpadding="0" cellspacing="0" align="center" class="styleBox">
  <tr>
    <td ></td>
  </tr>
  <tr>
    <td class="styleMainBox">
    	<ul > 
        	<li onclick="setRadio(1)"><img src="<%=sUserStylePath%>ucapimages/menu_type_1.gif" class="layoutFrame" /><br />
        	<input name="menuStyle"  id="menuStyle" type="radio" value="1"  />页签型</li>
            <li onclick="setRadio(2)"><img src="<%=sUserStylePath%>ucapimages/menu_type_2.gif" class="layoutFrame" /><br />
            <input name="menuStyle"  id="menuStyle" type="radio" value="2" />下拉菜单型</li>
          <li onclick="setRadio(3)"><img src="<%=sUserStylePath%>ucapimages/menu_type_3.gif" class="layoutFrame" /><br />
          <input name="menuStyle"  id="menuStyle" type="radio" value="3" />大图标</li>
            <li onclick="setRadio(4)"><img src="<%=sUserStylePath%>ucapimages/menu_type_4.gif" class="layoutFrame" /><br />
            <input name="menuStyle"  id="menuStyle" type="radio" value="4" />小图标</li>
            <li onclick="setRadio(5)"><img src="<%=sUserStylePath%>ucapimages/menu_type_5.gif" class="layoutFrame" /><br />
            <input name="menuStyle"  id="menuStyle" type="radio" value="5"/>树型</li>
            <li onclick="setRadio(6)"><img src="<%=sUserStylePath%>ucapimages/menu_type_6.gif" class="layoutFrame" /><br />
            <input name="menuStyle"  id="menuStyle" type="radio" value="6" />伸缩</li>
         </ul>
    </td>
  </tr>
</table>
</div>
</body>

	
