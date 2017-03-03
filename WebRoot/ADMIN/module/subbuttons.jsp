<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.style.Style"%>
<%@include file="../include/platformresources.jsp"%>
<%
/**
 * 模块管理首页
 * @author 
 * @since 
 */
	String btntype = "05";//表单
	if(null==btntype || btntype.trim().equals(""))btntype="";
	//按钮所属的模块
	String moduleUnid = request.getParameter("moduleUnid");
	if(null==moduleUnid || moduleUnid.trim().equals(""))moduleUnid="";
	//按钮所属系统
	String appUnid = request.getParameter("appUnid");
	if(null==appUnid || appUnid.trim().equals(""))appUnid="";
	//获取所属表单的标识，以便在设置版本时进行使用，表单标识
	String formUnid = request.getParameter("formUnid");
	String belongto = formUnid;
%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){
		viewConfigFun.loadButtonsConfig("<%=btntype%>","buttonList","<%=moduleUnid%>","<%=appUnid%>");
		
		viewConfigFun.loadSubButtonsConfig("<%=belongto%>","subbuttonList");
	});
	
	function getConfigJson(){
		var topWin = window;
		var tmpFormId = "<%=formUnid%>";
		var json = topWin.ucapCommonFun.getFormJSon("sbDialogHtml");
		if(undefined!=json.buttonUnid && json.buttonUnid!=""){
			for(var i=0;i<topWin.viewConfigFun.subButtonItems.length;i++){
				var tmpJson = topWin.viewConfigFun.subButtonItems[i];
				if(tmpJson.buttonUnid==json.buttonUnid){
					topWin.viewConfigFun.subButtonItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		var bfield=["display"];
		json = viewConfigFun.convertArray2Json(bfield,topWin.viewConfigFun.subButtonItems);
		return json;
	}
</script>

<table border="1" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <tr>
    <td width="13%">
	<select name="buttonList" size="21" style="width:180px;height:305px" id="buttonList" onDblClick="viewConfigFun.addSubButton(this,'<%=belongto%>')">
    </select>
    </td>
    <td width="6%" align="center">
<ul>
        	<li>
        	  <input name="btnadd" type="button" class="btnChannel" id="button" value="添加" onClick="viewConfigFun.addSubButton('buttonList')"/>
        	</li>
			<li>&nbsp;</li>
            <li>
        	  <input name="btndel" type="button" class="btnChannel" id="button" value="删除" onClick="viewConfigFun.delSubButton('subbuttonList')"/>
        	</li>
        </ul>
    </td>
  <td width="13%">
<select name="subbuttonList" size="21" style="width:180px;height:305px" id="subbuttonList" onChange="viewConfigFun.changeSubButton(this)" onDblClick="viewConfigFun.delSubButton(this)">
    </select>
    </td>
  <td width="2%" align="center">
    	<a href="#" onClick="viewConfigFun.moveSubButton(-1)"><img src="<%=systemPath %>uistyle/style_1/ucapimages/arrow_asc.gif" /></a><br/>
   	  <br /><a href="#" onClick="viewConfigFun.moveSubButton(1)"><img src="<%=systemPath %>uistyle/style_1/ucapimages/arrow_desc.gif" /></a></td>
    <td width="58%">
    <div id="sbDialogHtml">
    <table border="0" cellpadding="0" cellspacing="0" class="tableSet2">
      <tr>
        <th width="16%"><span class="red">*</span>按钮名称</th>
        <td colspan="3"><input class="inputred" type="text" name="buttonName" id="buttonName" size="40" readOnly/><input type="hidden" size="20" id="buttonUnid" name="buttonUnid"/></td>
      </tr>
      <tr>
        <th width="16%"><span class="red">*</span>子按钮名称</th>
        <td><input type="text" class="inputbox" size="20" id="name" name="name"/><input type="hidden" size="20" id="unid" name="unid"/></td>
        <th width="16%">是否显示</th>
         <td>
           <input name="display" type="radio" id="display" value="1" checked/>
          是
          <input name="display" type="radio" id="display" value="0"/> 
          否
          </td>
      </tr>
      <tr>
        <th width="16%"><span class="red">*</span>显示位置</th>
        <td width="40%">
         <input name="displayPosition" type="radio" id="displayPosition" value="01" checked/>
          按钮栏
          <input name="displayPosition" type="radio" id="displayPosition" value="02"/> 
          操作列
         <input name="displayPosition" type="radio" id="displayPosition" value="03"/> 
          都放
        </td>
        <th width="16%">图标</th>
        <td><input type="text" class="inputbox" id="picture" name="picture"/>
        	<input type="button" value="选" onclick="ucapCommonFun.directoryFile('picture','<%=userStylePath%>/ucapimages');"/>
        </td>
      </tr>
      <tr>
        <th>使用范围</th>
        <td colspan="3">
        	<input type="text" class="inputbox" name="useScopes" id="useScopes" style="display:none;"/>
		    <input type="text" class="inputred" readonly name="useScopes_Cn_" id="useScopes_Cn_" />
		    <input type="button" value="选" onclick="selectDataSD('200,201,202,203','0','useScopes');"/>
        </td>
      </tr>
      <!-- tr>
        <th>不能使用范围</th>
        <td colspan="3">
        	<input type="text" class="inputbox" id="unuseScopes" name="unuseScopes" style="display:none;"/>
		    <input type="text" class="inputred" readonly id="unuseScopes_Cn_" name="unuseScopes_Cn_" />
		    <input type="button" value="选" onclick="selectDataSD('200,201,202,203','0','unuseScopes');"/>
        </td>
      </tr-->
      <tr>
        <th>扩展功能</th>
        <td colspan="3">
        	<input type="text" class="inputbox" id="interaction" name="interaction" style="display:none;"/>
		    <input type="text" class="inputred" readonly id="interaction_Cn_" name="interaction_Cn_"/>
		    <input type="button" value="选" onclick="selectDataSD('227','0','interaction');"/>
        </td>
      </tr>
      <tr>
        <th>显示与否JS</th>
        <td colspan="3">
        	<input type="text" class="inputbox" id="js" name="js"/><img src="<%=systemPath %>uistyle/images/help.gif" onclick="searchHelp('button_isShow')" title="帮助"></img>
        </td>
      </tr>
      <tr>
        <th>快捷键</th>
        <td><input type="text" class="inputbox" id="altKey" name="altKey"/>
        </td>
        <th>所属菜单</th>
        <td><input type="text" class="inputbox" id="menu" name="menu"/><img src="<%=systemPath %>uistyle/images/help.gif" onclick="searchHelp('button_belongToMenu')" title="帮助"></td>
      </tr>
      <tr>
        <th>提示信息</th>
        <td colspan="3"><input type="text" class="inputbox" size="20" id="tip" name="tip"/></td>
      </tr>
    </table>
    </div>
    </td>
  </tr>
</table>
</body>