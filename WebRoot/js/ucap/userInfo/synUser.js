/**
 * 同步选定的用户
 * by@cgc  2011-7-25
 */
function synUser(){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || undefined==selectedRow.length) selectedRow = new Array(selectedRow);	
		var strResult="";
		if(selectedRow.length<1){
			alert("最少选择一个用户！");
			return;
		}
		
		for(var i=0;i<selectedRow.length;i++){		
			var row = selectedRow[i];
			var strJson=Ext.encode(row.json);
			if(i==0){
				strResult=strJson;
			}else{
				strResult+=","+strJson;
			}		
		}
		var rsJson="["+strResult+"]";
		var requestConfig = {
				url:ucapSession.baseAction,
				params:{"type":"synUser","act":"addUser"},
				jsonData:rsJson,
				callback:function(options,success,response){
					if (success){
						var exjson = Ext.util.JSON.decode(response.responseText);					
						var exResult=ucapCommonFun.dealException(exjson);					
						if(!exResult)return;					
						if(exResult==true){
							Ext.Msg.alert("提示","同步用户成功！");
						}else{							
							Ext.Msg.alert("提示","同步用户失败！");
						}		
					} else {						
						Ext.Msg.alert("提示","同步用户失败");
					}
				}
			}
			Ext.MessageBox.wait('用户同步中……', '请等待'); 
			Ext.Ajax.request(requestConfig);
};
/**
 * 同步应用系统的所有用户
 * by@cgc  2011-7-25
 */
function synAllUsers() {
	Ext.MessageBox.confirm("系统提示", "您确定要同步所有用户？", function(btn) {
				if (btn == "yes") {
					Ext.Ajax.timeout = 300000; // 设置超时的时间
					var requestConfig = {
						url : ucapSession.baseAction,
						params : {
							"type" : "synUser",
							"act" : "addAllUsers"
						},
						callback : function(options, success, response) {
							if (success) {
								var exjson = Ext.util.JSON
										.decode(response.responseText);
								var exResult = ucapCommonFun
										.dealException(exjson);
								if (!exResult)
									return;
								if (exResult == true) {
									Ext.Msg.alert("提示", "同步用户成功！");
								} else {
									Ext.Msg.alert("提示", "同步用户失败！");
								}
							} else {
								Ext.Msg.alert("提示", "同步用户失败");
							}
						}
					}
					Ext.MessageBox.wait('用户同步中……', '请等待');
					Ext.Ajax.request(requestConfig);
				} else {
					return;
				}
			});
}

/**
 * 同步删除IM用户
 * @param {} userIds
 */
function synDeleteUser(userNames){
		var requestConfig = {
				url:ucapSession.baseAction,
				params:{"type":"synUser","act":"synDeleteUser","data":userNames},
				callback:function(options,success,response){
					if (success){
						var exjson = Ext.util.JSON.decode(response.responseText);
						if(typeof(exjson)=="undefined"){
							return;
						}else{
							var exResult=ucapCommonFun.dealException(exjson);					
							if(!exResult)return;					
							if(exResult==true){
								//Ext.Msg.alert("提示","同步删除IM用户成功！");
							}else{							
								Ext.Msg.alert("提示","同步删除IM用户失败！");
							}		
						}					
					} else {						
						Ext.Msg.alert("提示","同步删除IM用户失败");
					}
				}
			}
			//Ext.MessageBox.wait('同步删除IM用户中……', '请等待'); 
			Ext.Ajax.request(requestConfig);
}