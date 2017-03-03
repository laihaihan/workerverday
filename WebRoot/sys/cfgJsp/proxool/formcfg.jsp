<%@page contentType="text/html;charset=UTF-8"%>
<div id="_formcfg_tabs">
	<div id="tab1" class="x-tab" title="应用系统列表">
		<table border="0" cellpadding="0" cellspacing="0" align="center"
			class="tableSet">
			<tr>
				<th colspan="6">
					请选择要生成表单配置的应用系统:
				</th>
			</tr>
			<tr>
				<TD colspan="6">
					<select size="20" style="width: 100%" name="appSelect" id="appSelect"
						onChange="ucapFormcfg.dateChange();"></select>
					<INPUT class=inputbox id=packFiles name=dateSource
						style="display: none">
				</TD>
			</TR>
		</table>
		<div>
			<div id="tab2" class="x-tab" title="配置表选择">
				<table border="0" cellpadding="0" cellspacing="0" align="center"
					class="tableSet">
					<tr>
						<TH width="18%">
							所有可生成配置的表:
							<span id="countFiles"></span>
						</TH>
						<td></td>
						<TH width="18%">
							要生成配置的表:
						</TH>
					</tr>
					<tr>
						<TD><div>
						  <div>
							<select multiple=true size="10" style="width: 100%" id="allTableSelect"
								name="allTableSelect" ondblclick="ucapFormcfg.moveOption( document.getElementById('allTableSelect'), document.getElementById( 'selTableSelect' ));"></select>
							<INPUT class=inputbox id=allTable name=allTable
								style="display: none">
						</div>
                        <div>已配置过的表
							<select multiple=true size="10" style="width: 100%" id="tablesCfg"
								name="tablesCfg"  ></select>
							<INPUT class=inputbox id=tablesCfg name=tablesCfg
								style="display: none">
						</div>
                        </div></TD>
						<td width="3%">
							<button
								onClick="ucapFormcfg.moveOption( document.getElementById('allTableSelect'), document.getElementById( 'selTableSelect' ));">
								添加
							</button>
							
							
							<br>
							<button	onClick="ucapFormcfg.moveAllOptions( document.getElementById('allTableSelect'), document.getElementById( 'selTableSelect' ));">
							  
								全添
							</button>
							<br>
							<button
								onClick="ucapFormcfg.moveOption(document.getElementById('selTableSelect'), document.getElementById( 'allTableSelect' ));">
								删除
							</button>
							<br>
							<button onClick="ucapFormcfg.moveAllOptions( document.getElementById('selTableSelect'), document.getElementById( 'allTableSelect' ));">
							   
								全删
							</button>
						</td>
						<TD>
							<select multiple=true size="20" style="width: 100%" id="selTableSelect"
								name="selTableSelect" onChange="ucapFormcfg.show(this)" ondblclick="ucapFormcfg.moveOption( document.getElementById('selTableSelect'), document.getElementById( 'allTableSelect' ));"></select>
							<INPUT class=inputbox id=selTable name=selTable
								style="display: none">
						</TD>
					</tr>

				</table>
			</div>
			<div id="tab3" class="x-tab" title="字段选择">
				<table border="0" cellpadding="0" cellspacing="0" align="center"
					class="tableSet">
					<tr>
						<th width="18%" colspan="6">
							已选择表
							<select onChange="ucapFormcfg.selTabChange();" style="width: 80%" id="allSelTableSelect"
								name="allSelTableSelect"></select>
						</th>
					</tr>
					<tr>
						<TH width="46%">
							要配置的字段:
						</TH>
						<td></td>
						<TH width="46%">
							要排除配置的字段:
						</TH>
					</tr>
					<tr>
						<TD>
							<select multiple=true size="19" style="width: 100%" id="itemsSelect"
								name="itemsSelect"></select>
							<INPUT class=inputbox id=items name=items style="display: none">
						</TD>
						<td width="8%">
							<button id="btnAdd" name="btnAdd" 
								onclick="addItem( $( 'unItemsSelect' ), $( 'itemsSelect' ), 1,1);
								ucapFormcfg.delOption('itemsSelect');
								ucapFormcfg.setFormItem();
								">
								添加
							</button>
							<br>
							<br>
							<br>
							<br>
							<button
								onclick="addItem( $( 'itemsSelect' ), $( 'unItemsSelect' ), 1,1);
				ucapFormcfg.delOption('unItemsSelect');
				ucapFormcfg.setFormItem();
				">
								删除
							</button>
						</td>
						<TD>
							<select multiple=true size="19" style="width: 100%"
								name="unItemsSelect" id="unItemsSelect"></select>
							<INPUT class=inputbox id=unItems name=unItems
								style="display: none">
						</TD>
					</tr>
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
	            ucapSession.appPath+'js/ucap/changeDB/formcfg.js',
	            ucapSession.appPath+'js/ucap/flow/ucapCommonOptions.js',
	            ucapSession.appPath+'js/ucap/portal/sysindex.js'
	        ]   
	    });
	    function init(){
	    	//去除成功加载后的事件
		    loaderJs.un("loaded", init);   
			//添加你下面要做的代码
		    ucapFormcfg.init();
		}
	});	 
</script>