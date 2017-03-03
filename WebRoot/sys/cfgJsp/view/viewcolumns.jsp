<%@page contentType="text/html;charset=UTF-8"%>
<%
	String currentViewId = request.getParameter("unid");
	
	String personalconfig=request.getParameter("personalconfig");
%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){
		viewConfigFun.loadItemsConfig("<%=currentViewId%>","vwItemList");
		
		viewConfigFun.loadViewItemsConfig("<%=currentViewId%>","viewColumnList");
	});

</script>

<table border="1" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <tr>
    <td width="13%">
    <!-- 2012-09-24 mdf by chuiting@linewell.com
    BUG1259：视图配置-视图字段页面：如果表单字段过多，有滚动条时，界面有问题 -->
	<select name="vwItemList" size="20" style="width:100%;height:305px" id="vwItemList" onDblClick="viewConfigFun.addViewColumn(this,'<%=currentViewId%>')">
    </select>
    <!-- end 2012-09-24 mdf by chuiting@linewell.com -->
    </td>
    <td width="6%" align="center">
<ul>
        	<li>
        	  <input name="btnadd" type="button" class="btnChannel" id="button" value="添加" onClick="viewConfigFun.addViewColumn('vwItemList','<%=currentViewId%>')"/>
        	</li>
			<li>&nbsp;</li>
            <li>
        	  <input name="btndel" type="button" class="btnChannel" id="button" value="删除" onClick="viewConfigFun.delViewColumn('viewColumnList','<%=currentViewId%>')"/>
        	</li>
        </ul>
    </td>
  <td width="13%">
  <!-- 2012-09-24 mdf by chuiting@linewell.com
    BUG1259：视图配置-视图字段页面：如果表单字段过多，有滚动条时，界面有问题 -->
<select name="viewColumnList" size="20" style="width:100%;height:305px" id="viewColumnList" onChange="viewConfigFun.changeViewColumn(this,'<%=currentViewId%>')" onDblClick="viewConfigFun.delViewColumn(this,'<%=currentViewId%>')">
    </select>
    <!-- end 2012-09-24 mdf by chuiting@linewell.com -->
    </td>
  <td width="2%" align="center">
    	<a href="#" onClick="viewConfigFun.moveViewColumn('<%=currentViewId%>',-1)"><img src="../../uistyle/style_1/ucapimages/arrow_asc.gif" /></a><br/>
   	  <br /><a href="#" onClick="viewConfigFun.moveViewColumn('<%=currentViewId%>',1)"><img src="../../uistyle/style_1/ucapimages/arrow_desc.gif" /></a></td>
    <td width="58%">
    <div id="viDialogHtml">
    <table border="0" cellpadding="0" cellspacing="0" class="tableSet2">
      <tr>
        <th width="18%"><span class="red">*</span>字段显示名称</th>
        <td colspan="3"><input type="text" class="inputbox" size="40" name="displayName" id="displayName"/><input type="hidden" size="20" id="itemUnid" name="itemUnid"/></td>
      </tr>
      <!-- 添加字段来源名称by@cgc  2011-6-14   start -->
       <tr>
        <th><span class="red">*</span>字段来源名称</th>
        <td colspan="3"><input type="text" class="inputbox" size="40" name="resourceName"
         id="resourceName" readonly="readonly" disabled="disabled" /></td>
      </tr>
       <!-- 添加字段来源名称by@cgc  2011-6-14   end -->
      <tr>
        <th><span class="red">*</span>字段宽度</th>
        <td><input type="text" class="inputbox" size="15" name="width" id="width"/>
          <select name="widthType" id="widthType">
            <option value="01">像素</option>
            <option value="02">百分比</option>
          </select>          </td>
        <th>是否统计字段</th>
        <td>
          <input name="statistics" type="radio" id="statistics" value="1"/>
          是
          <input name="statistics" type="radio" id="statistics" value="0" checked/> 
          否</td>
      </tr>
      <tr>
      	<th>列转换扩展功能</th>
      	<td colspan="3">
      		<input name="converseInteraction_Cn_" id="converseInteraction_Cn_" type="text" class="inputbox" size="30"/><input name="converseInteraction" id="converseInteraction" type="hidden"/><input type="button" name="btnselect" value="选择" onclick="selectDataSD('227',1,'converseInteraction')"/>
      	</td>
      </tr>
      <!--tr>
        <th>是否显示成中文</th>
        <td colspan="3">
        	<input name="displayCn" type="radio" id="displayCn" value="1"/>是
        	<input name="displayCn" type="radio" id="displayCn" value="0" checked/> 否
        </td>
        </tr -->
      <tr>
        <th>列单击JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="onclick" name="onclick"/><img src="../../uistyle/images/help.gif" onclick="searchHelp('view_rowOnclickJS')" title="帮助"></img>
        </td>
        <th>列转换JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="conversion" name="conversion"/><img src="../../uistyle/images/help.gif" onclick="searchHelp('view_rowTurnJS')" title="帮助"></img></td>
      </tr>
      <tr style="display:none">
        <th>列得到焦点JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="onfocus" name="onfocus"/>
        </td>
        <th>列失去焦点JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="onfocusout" name="onfocusout"/></td>
      </tr>
      <tr>
        <th>是否显示</th>
        <td><input name="display" type="radio" id="display" value="1" checked/>
				是
				  <input name="display" type="radio" id="display" value="0" />
				否</td>
		 <th>列是否编辑JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="iseditjs" name="iseditjs" /></td>
        </tr>
      <tr>
        <th>提示信息类型</th>
        <td ><input name="messageType" type="radio" id="messageType" value="01" checked/>
无
  <input name="messageType" type="radio" id="messageType" value="02" />
文本串
<input name="messageType" type="radio" id="messageType" value="03" />
XML</td>
<th>值发生改变时JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="onchange" name="onchange"/><img src="../../uistyle/images/help.gif" onclick="searchHelp('view_changeValueJS')" title="帮助"></img></td>
        </tr>
      <tr>
        <th>提示信息内容</th>
        <td colspan="3"><input type="text" class="inputbox" id="message" name="message"/></td>
        </tr>
    </table>
    </div>
    </td>
  </tr>
    <%if(null==personalconfig || !personalconfig.equals("1")){%>
  <tr><td colspan="5" align="center"><input type="button" name="btnSave" id="btnSave" class="btnChannel" value="保存" onClick="viewConfigFun.viewColumnsConfigConfirm('<%=currentViewId%>')"/></td></tr>
  <%}%>
</table>
</body>