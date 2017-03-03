<%@page contentType="text/html;charset=UTF-8"%>
<%
	String unid=request.getParameter("unid");
 %>
<div id="_pack_tabs">
	<div id="tab1" class="x-tab" title="更新包">
		<table id="upFile" border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr>
			<td colspan="8">
				<span>说明：附件上传大小限制为<span  class="red" id="maxAttr" qtip="如果需要改变，请到应用系统配置中更改单个文件上传的大小"></span>
				 ，上传的更新包，默认保存在：<span  qtip="如果需要改变，请到应用系统配置附件保存路径" class="red" id="attr_Path"></span>
				</span>
			</td>
		</tr>
		<tr> 
			<th width="25%" qtip="默认上传到为当前应用系统配置的附件目录">选择要更新包:</th>
			<td colspan="6">
	<iframe name="upload_hidd" style="width:0px;height:0px;"></iframe>
	<form id="fileUploadForm" name="fileUploadForm" action="" target="upload_hidd" enctype="multipart/form-data"
	 method="post" >
        	<input title="请上传要更新的zip包！" type="file" name="file" id="file" style="width:400px;height:25px"/> 
        	<button onClick="ucapVersion.upgrade.upFile()">上传</button>
	<input id="hidd_fileUploadForm_submit" type="submit" style="display:none;"/>
	</form>
			</TD>
		</TR>
	</table><br>
	<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr><td colspan="7">更新包信息 </td>
		</tr>
			<TR>
				<TH width="15%">打包者:</TH>
				<TD ><INPUT class=inputred readonly id=packUser name=packUser></TD>
				<TH width="15%">打包时间 :</TH>
				<TD width="26%"><INPUT class=inputred readonly id=packTime name=packTime></TD>
				<TH width="15%">版本号:</TH>
				<TD ><INPUT class=inputred readonly id=packVerb name=packVerb></TD>
			</TR>
			<TR>
				<TH>打包描述:</TH>
				<TD colspan="6"><TEXTAREA readonly id=packageDesc name=packageDesc 
					cols="21" rows="18" class="inputred" type="text" style="width:95%;height:250px">
				</TEXTAREA></TD>
			</tr>
		</table>
	<div>
	<div id="tab2" class="x-tab" title="更新内容">
		<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr>
		<td colspan="9" id="dbback" ><input onClick="ucapVersion.upgrade.backDo();" type="checkbox" name="isBack" id=isBack value="1" />
					<span class=red>已经对现有的数据库进行备份   </span>
			<br>对更新的文件会自动进行备份，备份目录为：<span class=red id="backPath"></span>
		</td>
		</tr>
		<tr> 
			<TH colspan="9" width="18%">要更新的文件:<span id="countFiles"></span></TH>
		</tr>
		<tr> 
			<TD colspan="9">
			<select size="13" style="width:100% " name="updateFilesSelect" id="updateFilesSelect"
			 onChange="ucapVersion.show(this);"
			 ></select>
			<INPUT class=inputred readonly id=updateFiles name=updateFiles style="display:none"></TD>
		</tr>
		<tr> 
			<td colspan="9">选中文件:<span id="allFile"></span></td> 
		</tr>
		</table><br>
		<table  border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr>
			<TH width="18%">更新前SQL:</TH>
			<TD colspan="6"><INPUT class=inputred readonly id=updateBefSql name=updateBefSql></TD>
		</TR>
		<TR>
			<TH>更新后SQL:</TH>
			<TD colspan="6"><INPUT class=inputred readonly id=updateAftSql name=updateAftSql></TD>
		</tr>
		<tr>
			<TH>更新后逻辑:</TH>
			<TD colspan="6"><INPUT class=inputred readonly id=updateAftLogic name=updateAftLogic></TD>
		</TR>
		<TR>
			<TH>更新前逻辑:</TH>
			<TD colspan="6"><INPUT class=inputred readonly id=updateBefLogic name=updateBefLogic></TD>
		</TR>
		</table>
	</div>
</div>
<script type="text/javascript">
	Ext.onReady(function(){		
		//动态加载js
		var loaderJs = new Ucap.JsModuleLoader();   
	    loaderJs.on("loaded", init);   
	    loaderJs.load({   
	        script:[   
	            ucapSession.appPath+'js/ucap/version/version.js',
	            ucapSession.appPath+'js/ucap/flow/ucapCommonOptions.js'
	        ]   
	    });
	    function init(){
	    	//去除成功加载后的事件
		    loaderJs.un("loaded", init);   
			//添加你下面要做的代码
			ucapVersion.upgrade.init("<%=unid%>");
		}
	});	 
</script>


