<%@page contentType="text/html;charset=UTF-8"%>
<%
	String unid=request.getParameter("unid");
	//WEB应用的路径
String appPath = request.getContextPath() + "/";
 %>
<div id="_pack_tabs">
  <div id="tab1" class="x-tab" title="更新包">
	<table id="upFile" border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr>
			<td colspan="8">&nbsp;&nbsp;<img src="<%=appPath%>/version/style/images/error.png"></img>
				<span>说明:附件上传大小限制为<span  class="red" id="maxAttr" qtip="如果需要改变，请到应用系统配置中更改单个文件上传的大小">
				</span>，上传的更新包，默认保存在:<span  qtip="如果需要改变，请到应用系统配置附件保存路径" class="red" id="attr_Path"></span>
				</span>
			</td>
		</tr>
		</table>
		<br/>
		<table id="upFile" border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr style="display:none"><td colspan="7">&nbsp;<input type="radio" name="uploadType" value="singleUpload" checked  onclick="ucapVersion.changeUploadType(this)"/>组合更新包上传 
		<input type="radio" name="uploadType"  value="multipleUpload"   onclick="ucapVersion.changeUploadType(this)" disabled qtip="更新到最新版本后即可使用该功能"/>独立版本更新包上传 
		<span class="red" id="updateFileTip"></span>
		</td></tr>
		<tr> 
			<th width="22%" qtip="默认上传到为当前应用系统配置的附件目录">更新包上传:</th>
			<td colspan="6">
				<div id="singleUpload">
				<iframe name="upload_hidd" style="width:0px;height:0px;"></iframe>
				<form id="fileUploadForm" name="fileUploadForm" action="" target="upload_hidd" enctype="multipart/form-data"
				 method="post" >
				    请将多个连续版本号的更新包压缩成zip文件后上传
	        		<input title="请上传要更新的zip包！" type="file" name="file" id="file" style="width:400px;height:25px"/> 
	        		<button onClick="ucapVersion.batchUpgrade.upFile()">上传</button>
					<input id="hidd_fileUploadForm_submit" type="submit" style="display:none;"/>
				</form>
				</div>
				<div style="display:none" id="multipleUpload">
					可上传多个独立版本的更新包:&nbsp;&nbsp;<button onClick="ucapVersion.uploadUpgrade()">	上传</button>
				</div>
			</td>
		</tr>
	</table>
	<br/>
	<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
	   <tr>
	      <th width="22%" rowspan="3">请选择更新的版本号:<br/><br/><br/>当前版本号:<span id="lastVerb" class="red"></span></th>
		  <td colspan = 4  style="height:120px">
		  		<span id="messageTip"> </span>
		  		<ul class="updatedVersion" id="versionInfo" >
		  		</ul>
		  </td>
		</tr>
	</table>
	<br/>
	<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
			<tr>
				<th width=22%>信息描述:</TH>
				<td><textarea readonly id=packageDesc name=packageDesc 
					cols="25" rows="18" class="inputred" type="text" style="width:99%;height:220px">
				</textarea></TD>
			</tr>
	</table>
	<br/>
  </div>
  <div id="tab2" class="x-tab" title="更新内容">
	<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr> 
			<th colspan="9" width="18%">要更新的文件:<span id="countFiles"></span></th>
		</tr>
		<tr> 
			<td colspan="9">
			<select size="13" style="width:100%;height:220px " name="updateFilesSelect" id="updateFilesSelect"
			 onChange="ucapVersion.show(this);"
			 ></select>
			<input class=inputred readonly id=updateFiles name=updateFiles style="display:none"></td>
		</tr>
		<tr> 
			<td colspan="9">选中文件:<span id="allFile"></span></td> 
		</tr>
		</table>
		<br/>
	<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr>
			<td id="dbback" >
				对更新的文件会自动进行备份，备份目录为:<span class=red id="backPath"></span><br/>
			</td>
		</tr>
		<tr>
			<td id="dbback" > 
				多版本更新比较容易出错，请对数据库和应用程序进行手动备份<br/>
			</td>
		</tr>	
		<tr>
			<td id="dbback" >
				<input onClick="ucapVersion.batchUpgrade.backDo();" type="checkbox" name="isBack" id=isBack value="1" />
				<span class=red>确认数据库和应用系统已经手动备份</span>
			</td>
		</tr>	
		</table>
		<br/>
	</div>
</div>
<link href="<%=appPath%>/version/style/updateTool.css" type="text/css" rel="stylesheet" />
<script type="text/javascript">
	Ext.onReady(function(){		
		//动态加载js
		var loaderJs = new Ucap.JsModuleLoader();   
	    loaderJs.on("loaded", init);   
	    loaderJs.load({   
	        script:[   
	            ucapSession.appPath+'version/js/version.js',
	            ucapSession.appPath+'js/ucap/flow/ucapCommonOptions.js'
	        ]   
	    });
	    function init(){
	    	//去除成功加载后的事件
		    loaderJs.un("loaded", init);   
			//添加你下面要做的代码
			ucapVersion.batchUpgrade.init("<%=unid%>");
		}
	});	 
</script>

