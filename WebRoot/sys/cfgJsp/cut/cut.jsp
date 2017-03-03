<%@page contentType="text/html;charset=UTF-8"%>
<body>
<script type="text/javascript">
	var channelType = 0;
	Ext.onReady(function(){		
		//初始化页面的值
		loadCuts();			
	});
	function loadCuts(){
		var resultList = Ext.getDom("cuts");
		if (undefined != resultList && resultList.options.length > 0) {
			var olength = resultList.options.length;
			for (var i = 0; i < olength; i++) {
				resultList.options.remove(0);
			}
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"short","act":"getUserCuts"},
			callback:function(options,success,response){
				if (success){
					if (response.responseText=="null" || response.responseText==null) return;
					var json = Ext.decode(response.responseText);
					if (json==null) return;
					var type=-1;
					var obj = document.getElementById("cuts");
					for(var i=0;i<json.length;i++){
						 ucapCommonFun.addOption(obj,json[i].unid,json[i].displayName);
					}					
				} else {
					Ext.Msg.alert("提示","获取快捷方式列表不成功，请重试！")
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
	function getFormJSon(){
		return ucapCommonFun.getFormJSon("dialogCutHtml");
	}
	function add(){
		ucapShortConfig.openShortByView();
	}
	function edit(){
		var json =getFormJSon();
		if (json.cuts==""){
			Ext.Msg.alert("编辑提示","请选择一快捷方式后，再编辑！");
			return;
		}
		ucapShortConfig.openShortByView(json.cuts);
	}
	function refresh(){
		loadCuts();		
	}
	function deleteUnid(){
		var json =getFormJSon();
		if (json.cuts==""){
			Ext.Msg.alert("删除提示","请选择一快捷方式后，再删除！");
			return;
		}
		Ext.MessageBox.confirm("删除提示","你是否确定要删除选中的快捷方式？",delcallBack);		
       	function delcallBack(id){
       		if (id=="yes"){
        		var requestConfig = {
					url:ucapSession.baseAction,
					params:{"type":"short","act":"delete",flag:"root","unid":json.cuts},
					callback:function(options,success,response){
						if (success){
							var resultList = Ext.getDom("cuts");
							if (resultList.selectedIndex < 0)
								return;					
							resultList.options.remove(resultList.selectedIndex);
											
							//window.location.reload();
						} else {
							Ext.Msg.alert("提示","删除快捷方式不成功，请重试！")
						}
					}
				}
				Ext.Ajax.request(requestConfig);	
       		}
       	}
	}	
</script>

<div id="dialogCutHtml">
 <table class="tableCustom"  >
	 	 <tr>
	    <td align="center" >
	    	<select id="cuts" name="cuts"
			size="8" style="width:100% "></select> 
			<input type="button" value="新增" onclick="add()" />
			<input type="button" value="编辑" onclick="edit()" />
			<input type="button" value="刷新" onclick="refresh()" />
			<input type="button" value="删除" onclick="deleteUnid()" />
	    </td>
	  </tr>
	</table>
</div>
</body>

	
