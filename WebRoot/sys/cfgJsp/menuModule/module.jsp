<%@page contentType="text/html;charset=UTF-8"%>
<body>
<div id="menuConfigdialogHtml">
<table class="tableSet">
  <tr> 
    <th width="16%">名称</th>
    <td  colspan="3"><input type="text" class="inputbox" id="name" name="name" style="width:350px" /></td>
  </tr>
  <tr>
    <th>来源类型</th>
    <td colspan="3" >
        <input type="radio" name="type" id="type" value="01" onclick="typeChange_module(this.value);" />视图
        <input type="radio" name="type" id="type" value="02" onclick="typeChange_module(this.value);"/>URL
        <input type="radio" name="type" id="type" value="04" onclick="typeChange_module(this.value);"/>JavaScript脚本
		<input type="radio" name="type" id="type" value="09" onclick="typeChange_module(this.value);"/>分类</td>
  </tr>
  <tr>
    <th>来源内容</th>
    <td colspan="3" ><input type="text" class="inputbox" name="contents" id="contents" style="width:350px;display:none"/>
      <input type="text"  id="contents_Cn_" name="contents_Cn_" style="width:350px;display:none" readonly 
    />
    <input id="_btn01" type="button" value="选" onclick="selectDataSD('218','2','contents');" style="display:none"/>
  	<input id="coreview" type="button" value="选" onclick="chooseCoreView()" style="display:none"/>
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
     <input type="radio" name="openType" id="openType"  value="02" checked />当前页面
      <span id="radio_url"> 
	     <input type="radio"  name="openType" id="openType" value="01"/>新页面
	      <input type="radio"  name="openType" id="openType" value="03"/>以iFrame方式嵌入
	  </span>
     </td>
  </tr>
  <tr>    
    <th width="16%">小图标配置</th>
    <td colspan="3">
      <select name="smallPicture" id="smallPicture" onchange="titleModuleIconChange(this)" >
    	<option value="">无</option>
       <%for(int i=1;i<151;i++){%>
            <option value="<%="uistyle/images/icon/icon_"+i+".gif"%>"><%=i%></option>
        <% }%>
    </select>  
     <img id="titleIconImg" src="" /> 
    </td>
  </tr> <tr>    
    <th width="16%">大图标配置</th>
    <td colspan="3">
      <select name="bigPicture" id="bigPicture" onchange="titleModuleBigIconChange(this)" >
    	<option value="">无</option>
       <%for(int i=1;i<64;i++){%>
            <option value="<%="uistyle/images/big/icon_"+i+".gif"%>"><%=i%></option>
        <% }%>
    </select>  
     <img id="titleBigIconImg" src="" /> 
    </td>
  </tr> 
  <tr> 
    <th width="16%">是否默认打开</th>
    
    <td colspan="3">
     <input type="radio" name="defaultOpen" id="defaultOpen"  value="0" checked />否
   
     <input type="radio"  name="defaultOpen" id="defaultOpen" value="1"/>是

     </td>
  </tr>
  <tr>
    <th>业务模块</th>
    <td colspan="3" ><input type="text" class="inputbox" name="moduleUnid" id="moduleUnid" style="width:90%" style="display:none"/>
      <input type="text"  id="moduleUnid_Cn_" name="moduleUnid_Cn_" style="width:90%" readonly style="display:none"
    />
    <input id="_btn02" type="button" value="选" onclick="selectDataSD('229','1','moduleUnid');" style="display:none"/>
  </tr>     
</table><br>
  <!-- 
  	2012-08-17 mdf by cxifu@linewell.com 隐藏显示条件配置域，统一入口在角色的“业务权限”来配置权限
   -->
<table class="tableSet" id="systemSet" style="display: none;">
  <tr>
    <th rowspan="3" width="16%">显示条件</th>
    <td width="16%">使用范围</td>
    <td colspan="2"><input type="text" class="inputbox" id="useScopes" name="useScopes" style="display:none;"/>
        <input type="text" readonly class="inputred" name="useScopes_Cn_" id="useScopes_Cn_" />
    <input type="button" value="选" onclick="selectDataSD('200,201,202,203','0','useScopes');"/>
  </tr>
  <!--tr>
    <td>不能使用范围</td>
    <td colspan="2"><input type="text" class="inputbox" id="unuseScopes" name="unuseScopes" style="display:none;"/>
    <input type="text" readonly class="inputred" id="unuseScopes_Cn_" name="unuseScopes_Cn_" />
    <input type="button" value="选" onclick="selectDataSD('200,201,202,203','0','unuseScopes');"/>
   </tr -->
  <tr>
    <td>扩展功能</td>
    <td colspan="2"><input type="text" class="inputbox" id="interaction" name="interaction" style="display:none;"/>
     <input type="text" readonly class="inputred" id="interaction_Cn_" name="interaction_Cn_"/>
    <input type="button" value="选" onclick="selectDataSD('227','0','interaction');"/>
   </tr> 
</table>  
<script type="text/javascript">
	//mdf  by  fsm  避免跟菜单里德来源类型冲突
	function typeChange_module(v){
	//	var v= obj.value;
		if (v=="01"){
			Ext.getDom("_btn01").style.display="";
			Ext.getDom("contents").style.display="none";
			Ext.getDom("contents_Cn_").style.display="";
			Ext.getDom("_btn02").style.display="none";
			Ext.getDom("moduleUnid_Cn_").style.display="none";
			Ext.getDom("coreview").style.display="none";
		} else {
			Ext.getDom("_btn01").style.display="none";
			Ext.getDom("contents").style.display="";
			Ext.getDom("contents_Cn_").style.display="none";
			Ext.getDom("_btn02").style.display="none";
			Ext.getDom("moduleUnid_Cn_").style.display="none";
			Ext.getDom("coreview").style.display="none";
		}
		if (v=="09"){
			Ext.getDom("contents").style.display="none";
			Ext.getDom("_btn02").style.display="";
			Ext.getDom("moduleUnid_Cn_").style.display="";
			Ext.getDom("coreview").style.display="none";
		}
		if (v=="02"){
			Ext.getDom("coreview").style.display="";
			Ext.getDom("radio_url").style.display="";
			Ext.getDom("_btn02").style.display="none";
			Ext.getDom("moduleUnid_Cn_").style.display="none";
		} else {
			Ext.getDom("radio_url").style.display="none";
			Ext.getDom("coreview").style.display="none";
		}
	}
	function titleModuleIconChange(obj){
	
		var icon ="";
		if (obj.value!=""){
			icon = ucapSession.appPath+obj.value;			
		} else {
			//避免没选择图片时IMAGE的展示问题
			icon=ucapSession.appPath+"uistyle/images/icon/icon_0.gif";
		}
		Ext.getDom("titleIconImg").src = icon;
	}
	
	function titleModuleBigIconChange(obj){
	
		var icon ="";
		if (obj.value!=""){
			icon = ucapSession.appPath+obj.value;			
		} else {
			//避免没选择图片时IMAGE的展示问题
			icon=ucapSession.appPath+"uistyle/images/icon/icon_0.gif";
		}
		Ext.getDom("titleBigIconImg").src = icon;
	}
	function chooseCoreView(){
		var obj = new Object(); 
		window.showModalDialog(appPath+'/core/view/cfg/choose_view.jsp?_rand'+Math.random(),obj,'dialogWidth=800px;dialogHeight=495px');
		if(obj.unid){
			Ext.getDom("contents").value= "view.action?fn=grid&viewId="+obj.unid;
			Ext.DomQuery.selectNode("input[@name=openType][@value=03]").checked = true;
		}		
	}
</script>
</div>
</body>