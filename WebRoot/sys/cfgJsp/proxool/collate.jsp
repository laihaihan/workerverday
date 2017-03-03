<%@page contentType="text/html;charset=UTF-8"%>
<div id="_collate_tabs">
	<div id="tab1" class="x-tab" title="数据源映射">
		<table border="0"  cellpadding="0" cellspacing="0" align="center" class="tableSet">
		<tr>
			<th colspan="6" >请选择要映射的数据源:</th>
		</tr>
		<tr>
			<TD colspan="6" >
			<select  size="20" style="width:100% " id="dateSourceSelect" name="dateSourceSelect" onChange="ucapCollate.dateChange();"></select>
			<INPUT class=inputbox id=packFiles name=packFiles style="display:none"></TD>
		</TR>
		</table>
	<div>
	<div id="tab2" class="x-tab" title="表单映射" >
		<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet" style="width:100%">
			<tr>
			<TH width="18%">所有可映射表:<span id="countFiles"></span></TH>
			<td></td>
			<TH width="18%" >要映射的表:</TH>
			</tr>
		 <tr>
			<TD style="width:45%">
			<select multiple=true size="20" style="width:100% " name="allTableSelect" id="allTableSelect"
			 ></select>
			<INPUT class=inputbox id=allTable name=allTable style="display:none"></TD>
			<td width="10%"><button onClick="addItem( $( 'selTableSelect' ), $( 'allTableSelect' ), 1,1);
								ucapCollate.delOption('allTableSelect');"> ——》 </button><br><br><br><br>
				<button onClick="addItem( $( 'allTableSelect' ), $( 'selTableSelect' ), 1,1);
				ucapCollate.delOption('selTableSelect');"> 《—— </button>
			</td>
			<TD style="width:45%">
			<select multiple=true size="20" style="width:100% " name="selTableSelect" id="selTableSelect"
			onChange="ucapCollate.show(this);"></select>
			<INPUT class=inputbox id=selTable name=selTable style="display:none"></TD>
		</tr>
			
		</table>
	</div>
	<div id="tab3" class="x-tab" title="字段映射">
		<table border="0" cellpadding="0" cellspacing="0" align="center" class="tableSet" style="width:100%">
		<tr>
			<th width="18%" colspan="6"> 已选择表<select onChange="ucapCollate.selTabChange();"
			   style="width:80% " name="allSelTableSelect" id="allSelTableSelect"
			 ></select></th>
		</tr>
		<tr>
			<TH width="18%">要映射字段:</TH>
			<td></td>
			<TH width="18%">要排除映射的字段:</TH>
		</tr>
		<tr>
			<TD style="width:45%"> 
			<select multiple=true size="19" style="width:100% " name="itemsSelect"  id="itemsSelect"
			 ></select>
			<INPUT class=inputbox id=items name=items style="display:none"></TD>
			<td width="10%"><button onClick="addItem( $( 'unItemsSelect' ), $( 'itemsSelect' ), 1,1);
								ucapCollate.delOption('itemsSelect');
								ucapCollate.setFormItem();
								">——》</button><br><br><br><br>
				<button onClick="addItem( $( 'itemsSelect' ), $( 'unItemsSelect' ), 1,1);
				ucapCollate.delOption('unItemsSelect');
				ucapCollate.setFormItem();
				">《——</button>
			</td>
			<TD style="width:45%">
			<select multiple=true size="19" style="width:100% " name="unItemsSelect"  id="unItemsSelect"
			></select>
			<INPUT class=inputbox id=unItems name=unItems style="display:none"></TD>
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
	            ucapSession.appPath+'js/ucap/changeDB/collate.js',
	            ucapSession.appPath+'js/ucap/flow/ucapCommonOptions.js'
	        ]   
	    });
	    function init(){
	    	//去除成功加载后的事件
		    loaderJs.un("loaded", init);   
			//添加你下面要做的代码
		    ucapCollate.init();
		}
	});	 
</script>


