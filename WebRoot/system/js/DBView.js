var dbViewForm ={
	viewUnid:null,
	isEdit:false,
	docUnid:null,
	formUnid:null,
	newDocument:function(){
		Ext.getCmp("ucap_system_doc").show() ;
		Ext.getCmp("ucapSystemCenterPanel").syncSize();
		var doc = Ext.get("ucap_system_document");
		var docUpdater = doc.getUpdater();
		var sUrl = appPath + "system/html/"+dbViewForm.formUnid+".html";
		docUpdater.update({
	        url: sUrl,
	        scripts:true
		});
		Ext.getCmp("saveButton").setHandler(docForm.saveForm);
	},
	openDocument:function(n){
		if(dbViewForm.isEdit){
			if(undefined == n){
				n = getselectionIndex();
				if(n==-1){
					alert("请选择行");
					return;
				}
			}
			Ext.getCmp("ucap_system_doc").show() ;
			Ext.getCmp("ucapSystemCenterPanel").syncSize();
			configFileView.oldKeyValue =configFileView.selectedRowData[configFileView.primaryKey];
			configFileView.isNew = false;
	    	var doc = Ext.get("ucap_system_document");
			var docUpdater = doc.getUpdater();
			var sUrl = appPath + "system/html/"+dbViewForm.formUnid+".html";
			var keyValue = getselectionKeyValue(n);
		
			docForm.action = "getLogin";
			docForm.formUnid = dbViewForm.formUnid;
			docForm.docUnid = keyValue;
			docUpdater.update({
		        url: sUrl,
		        scripts:true,
		        callback:docForm.initForm
			});
		
			Ext.getCmp("saveButton").setHandler(docForm.saveForm);
		
		}
	},
	deleteForm :function(){
		var selectRowKey=getselections();
		if(selectRowKey==""){
			alert("请选择行");
			return;
		}
		Ext.MessageBox.confirm("确认","是否确认要删除选中的文档！",function(btn){
				if(btn=="yes"){
					 var requestConfig = {
						url:appPath + "BaseAction.action" ,
						params:{type:"fileConfig",action:"deleteForm",formUnid:dbViewForm.formUnid,docUnid:selectRowKey},	
						callback:function(options,success,response){
								if(success){
									if(response.responseText=="true"){
										alert("删除成功！");
										initDBView(null,dbViewForm.viewUnid,null,true,dbViewForm.formUnid);
									}
								}else{
									alert("获取数据失败");
								}
						}
					};
					Ext.Ajax.request(requestConfig);
				}
			});
	}
}