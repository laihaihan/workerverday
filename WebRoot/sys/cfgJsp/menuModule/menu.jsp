<%@page contentType="text/html;charset=UTF-8"%>
<body>
<div id="menuConfigdialogHtml">

<table class="tableSet">
  <tr>
    <th width="16%">菜单项名称</th>
    <td  colspan="3"><input type="text" class="inputbox" name="name" id="name" style="width:350px" /></td>
   </tr>
  <tr>
    <th>来源类型</th>
    <td colspan="3" ><input type="radio" name="type" id="type"  value="01" onclick="typeChange(this.value)" />模块
        <input type="radio" name="type" id="type" value="02" onclick="typeChange(this.value);" />视图
        <input type="radio" name="type" id="type" value="03" onclick="typeChange(this.value)" />URL
        <input type="radio" name="type" id="type" value="04" onclick="typeChange(this.value)" />JavaScript脚本
		<input type="radio" name="type" id="type" value="09" onclick="typeChange(this.value)" />分类</td>
  </tr>
  <tr>
    <th>来源内容</th>
    <td colspan="3" ><input type="text" class="inputbox" name="content" id="content" style="width:350px"/>
    <input type="text"  id="content_Cn_" name="content_Cn_" style="width:350px" readonly 
    style="display:none"
    />
    <input id="_btn01" type="button" value="选" onclick="selectDataSD('215','1','content');" style="display:none"/>
     <input id="_btn02" type="button" value="选" onclick="selectDataSD('218','2','content');" style="display:none"/>
   </td>
  </tr>
  
  <tr>
    <th>执行类型</th>
    <td colspan="3" >
        <input type="radio" name="executeType" id="executeType" value="01" checked/>JavaScript脚本
        <input type="radio" name="executeType" id="executeType" value="02"/>URL
  </tr>
  <tr>
    <th>执行内容</th>
    <td colspan="3" >
    	<input type="text" class="inputbox" name="executeContent" id="executeContent" style="width:350px"/>
    </td>
  </tr>
  
   <tr>
    <th width="16%">打开方式</th>
    <td colspan="3">
   <input type="radio"  name="openType" id="openType"  value="02"/>当前页面
	   <span id="radio_url"> 
	       <input type="radio" name="openType"  id="openType" value="01" />新页面
	      <input type="radio" name="openType"  id="openType" value="03" />以iFrame方式嵌入
	   </span>
     </td>
  </tr>
  <tr>    
    <th width="16%">图标配置</th>
    <td colspan="3">
    <select name="picture" id="picture" onchange="titleMenuIconChange(this)" >
    	<option value="">无</option>
       <%
       	  
       	  for(int i=1;i<151;i++){%>
            <option value="<%="uistyle/images/icon/icon_"+i+".gif"%>"><%=i%></option>
        <% }%>
    </select>  
     <img id="titleIconImg" src="" />
    
    </td>
  </tr>   
   <tr>
    <th width="16%">提示信息</th>
    <td colspan="3"><input type="text" class="inputbox" name="tip" style="width:350px"/></td>
  </tr>    
</table><br>
   <!-- 
  	2012-08-17 mdf by cxifu@linewell.com 隐藏显示条件配置域，统一入口在角色的“业务权限”来配置权限
   -->
 <table class="tableSet" id="systemSet" style="display: none;">
   <tr >
    <th rowspan="3" width="16%" >显示条件</th>
    <td width="16%">使用范围</td>
    <td colspan="2"><input type="text" class="inputbox" name="useScopes" id="useScopes" style="display:none;"/>
    <input type="text" class="inputred" readonly name="useScopes_Cn_" id="useScopes_Cn_" />
    <input type="button" value="选" onclick="selectDataSD('200,201,202,203','0','useScopes');"/>
      </td>
  </tr>
  <!-- tr>
    <td>不能使用范围</td>
    <td colspan="2"><input type="text" class="inputbox" id="unuseScopes" name="unuseScopes" style="display:none;"/>
    <input type="text" class="inputred" readonly id="unuseScopes_Cn_" name="unuseScopes_Cn_" />
    <input type="button" value="选" onclick="selectDataSD('200,201,202,203','0','unuseScopes');"/>
      </td>
  </tr -->
  <tr>
    <td>扩展功能</td>
    <td colspan="2"><input type="text" class="inputbox" id="interaction" name="interaction" style="display:none;"/>
    <input type="text" class="inputred" readonly id="interaction_Cn_" name="interaction_Cn_"/>
    <input type="button" value="选" onclick="selectDataSD('227','0','interaction');"/>
      </td>
  </tr> 
</table> 
<script type="text/javascript">
//	titleMenuIconChange(Ext.getDom("picture"));
	function typeChange(v){
		if (v=="01" || v=="02" ){
			Ext.getDom("_btn01").style.display="none";
			Ext.getDom("_btn02").style.display="none";
			Ext.getDom("_btn"+v).style.display="";
			Ext.getDom("content").style.display="none";
			Ext.getDom("content_Cn_").style.display="";
		} else {
			Ext.getDom("_btn01").style.display="none";
			Ext.getDom("_btn02").style.display="none";
			Ext.getDom("content").style.display="";
			Ext.getDom("content_Cn_").style.display="none";
		}
		if (v=="09"){
			Ext.getDom("content").style.display="none";
		}
		if (v=="03"){
			Ext.getDom("radio_url").style.display="";
		} else {
			Ext.getDom("radio_url").style.display="none";
		}
	}
	function titleMenuIconChange(obj){
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