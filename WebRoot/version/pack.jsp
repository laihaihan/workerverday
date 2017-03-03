<%@page contentType="text/html;charset=UTF-8"%>
<%
	String unid=request.getParameter("unid");
 %>
<div id="_pack_tabs">
	<div id="tab1" class="x-tab" title="配置信息">
		<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr>
			<th width="25%" qtip="可为空，则默认为webRoot目录下的所有文件夹和文件，如果有值，则取“webRoot\实际目录”下的文件夹和文件，比如：js ">打包源文件相对路径:</th>
			<TD width="30%" >
			<INPUT  id=rootDir name=rootDir id=rootDir  class=inputbox style="width:90%" /></TD>
			<TH width="25%" qtip="采用绝对路径，比如：E:\data ，如果没有加盘符，则默认在tomcat的bin(或者web应用于服务器)目录下">打包文件生成路径:</TH>
			<TD colspan="3" width="30%"><INPUT class=inputbox id=packDir name=packDir style="width:90%"></TD>
		</TR>
		<tr>
			<th colspan="6" >不打包的文件、文件夹:</th>
		</tr>
		<tr>
			<td colspan="5">
			<select multiple=true id="unpackResSelect"  size="9.5" style="width:100% " name="unpackResSelect" ></select>
			 <INPUT  id=unpackRes name=unpackRes id=unpackRes style="display:none " />
			</td>
			<td  width="13%" ><button onClick="ucapVersion.addOption($('unpackResSelect'))" >增加</button>
			<br><br><br><button id="delete" onClick="ucapVersion.delOption('unpackResSelect')" >删除</button></td>
		</tr>
		<TR>
			<th colspan="6" >额外打包的文件、文件夹:</th>
		</tr>
		<tr>
			<TD colspan="5">
			<select multiple=true size="9.5" style="width:100% " name="packOtherResSelect" id="packOtherResSelect" ></select>
			<INPUT  id=packOtherRes name=packOtherRes style="display:none "></TD>
			<td  width="10%" ><button onClick="ucapVersion.addOption($('packOtherResSelect'))">增加</button><br><br><br>
				<button id="delete" onClick="ucapVersion.delOption('packOtherResSelect')" >删除</button></td>
		</TR>
		<tr>
			<td colspan="2">
			<input type="checkbox" name="isDefaultCfg" id=isDefaultCfg value="1" />保存为默认配置
			</td>
			<td colspan="4" id="packDefault" style="display:">
			<button  onClick="ucapVersion.getDefault()" >还原默认</button>
			</td>
		</tr>
		</table>
	<div>
	<div id="tab2" class="x-tab" title="打包信息">
		<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
			<tr>
				<TH width="20%">上次打包的时间:</TH>
				<TD width="30%" >
				<INPUT readonly class=inputred id=lastPackTime name=lastPackTime style="width:85%">
				<button style="display:none" id ="dataSelect" onClick="WdatePicker({el:'lastPackTime',dateFmt:'yyyy-MM-dd HH:mm:ss'});">选</button>
				</TD>
				<TH width="20%">上次版本号:</TH>
				<TD><INPUT readonly class=inputred id=lastPackVerb name=lastPackVerb style="width:90%"></TD>
		   </TR>
			<TR>
				<TH>本次打包时间 :</TH>
				<TD><INPUT class=inputbox id=packTime name=packTime></TD>
				<TH>本次版本号:</TH>
				<TD><INPUT class=inputbox id=packVerb name=packVerb></TD>
			</TR>
			<TR>
				<TH>打包者:</TH>
				<TD><INPUT class=inputbox id=packUser name=packUser></TD>
				<TH>更新对象:</TH>
				<TD><INPUT class=inputbox id=appyOrgs name=appyOrgs></TD>
			</TR>
			<TR>
				<TH>打包描述:</TH>
				<TD colspan="6"><TEXTAREA  id=packDesc name=packDesc 
					rows="20" class="channelTextarea" type="text" style="width:95%;height=300px">
				</TEXTAREA></TD>
			</tr>
		</table>
	</div>
	<div id="tab3" class="x-tab" title="打包内容和更新逻辑">
		<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr>
			<TH width="18%">要打包的文件:<span id="countFiles"></span></TH>
			<td></td>
			<TH width="18%" >要排除的文件:</TH>
		</tr>
		<tr>
			<TD>
			<select multiple=true size="15" style="width:100% " name="packFilesSelect" id="packFilesSelect"
			 onChange="ucapVersion.show(this);"
			 ></select>
			<INPUT class=inputbox id=packFiles name=packFiles style="display:none"></TD>
			<td width="3%"><button onClick="addItem( $( 'unpackFilesSelect' ), $( 'packFilesSelect' ), 1,1);
								ucapVersion.delOption('packFilesSelect');">——》</button><br><br><br><br>
				<button onClick="addItem( $( 'packFilesSelect' ), $( 'unpackFilesSelect' ), 1,1);
				ucapVersion.delOption('unpackFilesSelect');">《——</button>
			</td>
			<TD>
			<select multiple=true size="15" style="width:100% " name="unpackFilesSelect"  id="unpackFilesSelect"
			onChange="ucapVersion.show(this);"></select>
			<INPUT class=inputbox id=unpackFiles name=unpackFiles style="display:none"></TD>
		</tr>
		<tr>
			<td colspan="9">选中文件:<span id="allFile"></span></td>
		</tr>
		</table><br>
		<table  border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr>
			<TH width="18%">更新前SQL:</TH>
			<TD colspan="6"><INPUT class=inputbox id=updateBefSql name=updateBefSql></TD>
		</TR>
		<TR>
			<TH>更新后SQL:</TH>
			<TD colspan="6"><INPUT class=inputbox id=updateAftSql name=updateAftSql></TD>
		</tr>
		<tr>
			<TH>更新后逻辑:</TH>
			<TD colspan="6"><INPUT class=inputbox id=updateAftLogic name=updateAftLogic></TD>
		</TR>
		<TR>
			<TH>更新前逻辑:</TH>
			<TD colspan="6"><INPUT class=inputbox id=updateBefLogic name=updateBefLogic></TD>
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
	            ucapSession.appPath+'version/js/version.js',
	            ucapSession.appPath+'js/ucap/flow/ucapCommonOptions.js'
	        ]   
	    });
	    function init(){
	    	//去除成功加载后的事件
		    loaderJs.un("loaded", init);   
			//添加你下面要做的代码
		    ucapVersion.initVersion("<%=unid%>");
		}
	});	 
</script>


