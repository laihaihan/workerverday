<%@page contentType="text/html;charset=UTF-8"%>
<%
	String currentViewId = request.getParameter("unid");
	String personalconfig=request.getParameter("personalconfig");
%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){
		viewConfigFun.loadItemsConfig("<%=currentViewId%>","cateItemList");
		viewConfigFun.loadCategoryItemsConfig("<%=currentViewId%>","categoryItemList");
	});

</script>

<table border="1" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <tr>
    <td width="13%">
    <!-- 2012-09-24 mdf by chuiting@linewell.com
    BUG1259：视图配置-视图字段页面：如果表单字段过多，有滚动条时，界面有问题 -->
	<select name="cateItemList" size="20" style="width:100%;height:305px" id="cateItemList" onDblClick="viewConfigFun.addCategoryItem(this,'<%=currentViewId%>')">
    </select>
    <!-- end 2012-09-24 mdf by chuiting@linewell.com -->
    </td>
    <td width="6%" align="center">
<ul>
        	<li>
        	  <input name="btnadd" type="button" class="btnChannel" id="button" value="添加" onClick="viewConfigFun.addCategoryItem('cateItemList','<%=currentViewId%>')"/>
        	</li>
			<li>&nbsp;</li>
            <li>
        	  <input name="btndel" type="button" class="btnChannel" id="button" value="删除" onClick="viewConfigFun.delCategoryItem('categoryItemList','<%=currentViewId%>')"/>
        	</li>
        </ul>
    </td>
  <td width="13%">
  <!-- 2012-09-24 mdf by chuiting@linewell.com
    BUG1259：视图配置-视图字段页面：如果表单字段过多，有滚动条时，界面有问题 -->
<select name="categoryItemList" size="20" style="width:100%;height:305px" id="categoryItemList" onChange="viewConfigFun.changeCategoryItem(this,'<%=currentViewId%>');initType(this,'<%=currentViewId%>');" onDblClick="viewConfigFun.delCategoryItem(this,'<%=currentViewId%>')">
    </select>
    <!-- end 2012-09-24 mdf by chuiting@linewell.com -->
    </td>
  <td width="2%" align="center">
    	<a href="#" onClick="viewConfigFun.moveCategoryItem('<%=currentViewId%>',-1)"><img src="../../uistyle/style_1/ucapimages/arrow_asc.gif" /></a><br/>
   	  <br /><a href="#" onClick="viewConfigFun.moveCategoryItem('<%=currentViewId%>',1)"><img src="../../uistyle/style_1/ucapimages/arrow_desc.gif" /></a></td>
    <td width="58%">
    <div id="ciDialogHtml">
    <table border="0" cellpadding="0" cellspacing="0" class="tableSet2" valign="top">
      <tr>
        <th width="18%" ><span class="red">*</span>字段显示名称</th>
        <td colspan="3"><input type="text" class="inputbox" size="40" name="itemCn" id="itemCn"/><input type="hidden" size="20" name="itemUnid" id="itemUnid"/></td>
      </tr>
      <tr>
        <th ><span class="red">*</span>分类字段类型</th>
        <td colspan="3">
        	<input name="itemType" type="radio" id="itemType" value="01" onclick="typeChange(this);" checked/>本身值
  			<input name="itemType" type="radio" id="itemType" value="02" onclick="typeChange(this);" />字典
			<input name="itemType" type="radio" id="itemType" value="03" onclick="typeChange(this);" />手工输入值
			<input name="itemType" type="radio" id="itemType" value="04" onclick="typeChange(this);" />按部门分类
			<input name="itemType" type="radio" id="itemType" value="05" onclick="typeChange(this);" />按部门(过滤)分类
			<input name="itemType" type="radio" id="itemType" value="06" onclick="typeChange(this);" />只显示一级业务部门
		</td>
	</tr>
	<tr>
        <th><span class="red">*</span>分类字段值</th>
        <td >
         <input type="text" class="inputbox" size="20" name="itemValue" id="itemValue" dictionaryType="03" sourceType="03" source="" isSingle="1"/>
		 </td>
		 	 <th>分类排序</th>
		 <td>
            <input name="itemSort" type="radio" id="itemSort" value="01"  />升序
			<input name="itemSort" type="radio" id="itemSort" value="02"  />降序
		 </td>
      </tr>
      <tr>
        <th >开始位置</th>
        <td width="33%">
        	<input name="beginIndex" type="text" class="inputbox" id="beginIndex" value="0"/><img src="../../uistyle/images/help.gif" onclick="searchHelp('viewType_begin_end')" title="帮助"></img>
        </td>
		<th >结束位置</th>
        <td width="33%">
        	<input name="endIndex" type="text" class="inputbox" id="endIndex" value="0"/>
        </td>
        </tr>
    </table>
    <script type="text/javascript">
	//	titleMenuIconChange(Ext.getDom("picture"));
		function typeChange(o){
			var oid = "itemValue";
			var obj = Ext.getDom(oid);
			var fn = function(a,b,c){
				var objcn = Ext.getDom(a+"_Cn_");
				var btn = Ext.getDom("btn_"+a);
				if(objcn && btn){
					obj.style.display=b;
					objcn.style.display=c;
					btn.style.display=c;
				}
			};
			var v = o.value;
			switch(v){
				case "02":{
					_UcapForm.tool.embellishForm(obj);
					fn(oid,"none","");
					break;
				}
				default:{
					fn(oid,"","none");
				}
			}
		}
		
		function initType(){
			_UcapFormFun.initViewItemType();
		}
	</script>
    </div>
    </td>
  </tr>
  <%if(null==personalconfig || !personalconfig.equals("1")){%>
  <tr><td colspan="5" align="center"><input type="button" name="btnSave" class="btnChannel" value="保存" onClick="viewConfigFun.viewCategoriesConfigConfirm('<%=currentViewId%>')"/></td></tr>
  <%}%>
</table>

</body>