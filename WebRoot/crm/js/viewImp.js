/**
 * 对视图按钮的操作
 * @type 
 */
var viewImp={
	/**
	 * 刷新 
	 */
	refreshView:function(){
		jQuery("#page").val(1);
		jQuery("#queryForm").submit();
	},
	/**
	 * 获取要删除文档的JSON
	 */
	getDeleteUnids:function(){
		var unids = dataObject.getCheckedDocIds();
		if(""==unids){
			alert("请选择要删除的文档！");
			return "";
		}
		var strResult="";
		
		var isDelete=confirm("是否确认要删除选中的文档！");
		if(isDelete){
			
			var unids = dataObject.getCheckedDocIds();
			var json = '{"formUnid":\"'+viewInfo.formId+'\",formType:\"'+viewInfo.formType+'\","docUnid":\"'+unids+'\",' +
						'"strResult":\"'+strResult+'\","isFlowItem":\"'+viewInfo.isFlowItem+'\" }';
			return json;
		}
	},
	/**
	 * 删除
	 */
	deleteDocument:function(){
		
		var $operaterObject = jQuery.getEventDom$();
		var data = "";
		if( !$operaterObject.attr("docUnid")){
			data = viewImp.getDeleteUnids();
		}else{
			data = $operaterObject.attr("docUnid");
		}
		if(""==data){
			return;
		}
		var requestConfig = {
				url:ucapSession.baseAction,
				params : {					
					type :"getForm",
					act:"delete"
				},
				jsonData:data,
				callback : function(options, success, response) {
					if (success) {
						var json = response.responseText;
						if(json !=""){
							Ext.Msg.alert("提示信息", "删除成功",function(){window.location.reload();});
							
							
						}else{
							Ext.Msg.alert("提示信息", "删除失败");
						}
					} else {
						Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
					}
					
				}
			}
			Ext.Ajax.request(requestConfig);
	},
	/**
	 * 修改视图文档
	 */
	modifyDocument:function(){
		var unids = dataObject.getCheckedDocIds();
		if(""==unids){
			alert("请选择要修改的文档！");
			return;
		}
		var docId=unids.split(",")[0];
		dataObject.openDocument(docId);
	},
	/**
	 * 重置视图
	 */
	resetView:function(){
		searchObject.resetSearch();
		jQuery("#extranCon").val("");
		if("true"==jQuery("#searchFlag").val()){
			jQuery("#searchFlag").val("true");
		}else{
			jQuery("#searchFlag").val("false");
		}
			
		jQuery("#page").val(1);
		jQuery("#queryForm").submit();
	},
	/**
	 * 新建文档
	 */
	newDocument:function(){
		
		view.openViewDoc("",viewInfo.formType,viewInfo.formId,viewInfo.isFlowItem,viewInfo.purl,viewInfo.openJs);
	},
	/**
	 * 打开视图文档
	 */
	openViewDoc:function(){
		
		var $operaterObject = jQuery.getEventDom$();
		var docId = "";
		docId = $operaterObject.attr("docUnid");
		if("" === docId){
			alert("无法打开文档！");
			return;
		}
		dataObject.openDocument(docId);
		
	}
	
};