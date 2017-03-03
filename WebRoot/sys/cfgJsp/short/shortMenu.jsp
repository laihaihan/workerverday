<%@page contentType="text/html;charset=UTF-8"%>
<body>
<div id="shortConfigdialogHtml">
<table border="0" class="tableSet" align="center">
<COL width="10%">
<COL width="40%">
<COL width="10%">
<COL width="40%">
 <tr>
    <th>名称：</th>
    <td colspan="3"><input type="text"  name="name" id="name" class="inputbox" /></td>
  </tr>
  <tr>
  	<th>类型：</th> 	
  	<td colspan="3" ><input type="radio" name="type" id="type"  value="01" onclick="typeChange(this.value)" />模块
        <input type="radio" name="type" id="type" value="02" onclick="typeChange(this.value);" />视图
        <input type="radio" name="type" id="type" value="03" onclick="typeChange(this.value)" />按钮
        <input type="radio" name="type" id="type" value="04" onclick="typeChange(this.value)" />Url
	</td>
  </tr>
  <tr>
    <th>内容：</th>
    <td colspan="3"><input type="text" name="content"  id="content" class="inputbox" />
     <input type="text"  id="content_Cn_" name="content_Cn_" style="width:90%" readonly 
    style="display:none" class="inputred"
    />
    <input id="_btn01" type="button" value="选" onclick="selectDataSD('215','1','content');" style="display:none"/>
    <input id="_btn02" type="button" value="选" onclick="selectDataSD('218','1','content');" style="display:none"/>
    <input id="_btn03" type="button" value="选" onclick="selectDataSD('220','1','content');" style="display:none"/>
     </td>    
  </tr>
  <tr>
  	<th>前置小图标：</th>
  	<td>
  	  <select name="picturePath" id="picturePath" onchange="titleIconChange(this)" >
    	<option value="">无</option>
       <%       	  
       	  for(int i=1;i<102;i++){%>
            <option value="<%="uistyle/images/icon/icon_"+i+".gif"%>"><%=i%></option>
        <% }%>
    </select> <img id="titleIconImg" src="" /> 
     </td>
  </tr>
  <tr>
    <th>显示方式：</th>
    <td colspan="3" ><input type="radio" name="displayType" id="displayType"  value="01"  />显示图标
        <input type="radio" name="displayType" id="displayType" value="02"  />显示文字
        <input type="radio" name="displayType" id="displayType" value="03" />显示图标文字
	</td>
	</tr>
	<tr>
     <th >提示信息：</th>
    <td colspan="3"><input type="text"  name="tip" id="tip" class="inputbox" /></td>
  </tr> 
</table>

<script type="text/javascript">

	function typeChange(v){
	//	var v= obj.value;
		Ext.getDom("_btn01").style.display="none";
		Ext.getDom("_btn02").style.display="none";
		Ext.getDom("_btn03").style.display="none";
		if (v=="01" || v=="02" || v=="03"){			
			Ext.getDom("_btn"+v).style.display="";
			Ext.getDom("content").style.display="none";
			Ext.getDom("content_Cn_").style.display="";
		} else {
			Ext.getDom("content").style.display="";
			Ext.getDom("content_Cn_").style.display="none";
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

</script>
</div>
</body>