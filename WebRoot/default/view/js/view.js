/**
	 * 视图简单查询页面
	 * 
	 * @author llp@linewell.com,zhua@linewell.com
	 * 
	 * @since 2011-07-5
*/
/**
 * 对视图分页页面的操作
 * @type 
 */

var pageObject ={
	
	/**
	 * 分页操作
	 * @param {} page  页码
	 * @param {} viewId  视图UNID
	 */
	pageChange:function(page){
		jQuery("#page").val(page);
		jQuery("#queryForm").submit();
	},
	/**
	 * 页数跳转
	 * @param {} obj 页数输入框对象
	 */
	pageSkip:function(obj){
		var $obj = jQuery(obj);
		var page = $obj.val();
		var pageCount = $obj.attr("pageCount");
		//2012-07-19 mdf by chuiting@linwell.com
		//修改bug1211：二次开发的视图在页码框录入非数字（包括空格、输入.122之类的）
		//类型回车后跳转页面提示http500错误（所有界面都会）
		var isInt = /^[0-9]*[1-9][0-9]*$/.test(page)
		if(!isInt){//end 2012-07-19 mdf by chuiting@linwell.com
			Ext.Msg.alert("提示信息", "请输入正整数！");
			return;
		}
		if(parseInt(page)>parseInt(pageCount))page=pageCount;
		pageObject.pageChange(page);
	}

};
/**
 * 查询页面的操作
 */
var searchObject={
		
	/**
	 * 打开或关闭高级查询
	 */
	openAdvance:function(){
		
		var searchObject = jQuery("#queryAdvancedDiv");
		if(searchObject.css("display") !=="none"){
			jQuery("#advancedSearch").val("▼高级搜索");
			jQuery("#searchFlag").val("false");
			searchObject.hide();
		}else{
			jQuery("#advancedSearch").val("▲高级搜索");
			jQuery("#searchFlag").val("true");
			searchObject.show();
		}
		loadViewDataPosition();
		
	},
	/**
	 * 简单查询
	 */
	simpleSearch:function(){
		var keyword = jQuery("#keyword").val();
		if("请输入搜索关键字"==keyword){
			alert("请输入搜索关键字");
			return;
		}
		var selectSearch = jQuery("#simpleSearchSelect").val(); 
		var searchCondition = "" ;
		if("0" === selectSearch){
			jQuery("#simpleSearchSelect option").each(function(i, o){				
				if(i > 0){					
					if(searchCondition) searchCondition += " OR ";
					searchCondition += jQuery(this).val() +" LIKE '%" + keyword + "%'";
				}
			});
		}else{
			searchCondition = selectSearch + " like '%" + keyword + "%'";
		}
		jQuery("#extranCon").val(searchCondition);
		jQuery("#page").val(1);
		jQuery("#queryForm").submit();
		
	},
	/**
	 * 高级查询
	 */
	advanceSearch:function(){
		
		//过滤高级查询中的所有有值的类型为text的input
		var allElements=jQuery("#queryAdvancedDiv input[type='text']");
		var itemList = new Array();
		var postion=0;
		for(var i=0;i<allElements.length;i++){
			var elementName =allElements[i].name;
			if(elementName.lastIndexOf("_Cn_")<0){
				var elementVal=jQuery("#"+elementName).val();
				if(elementVal !="undefined" && elementVal!=""){	
					itemList[postion]=elementName;
					postion++;
				}
			}
			
		}
		var searchCondition="";
		var condition="";
		var hasEnd=false;
		for(var i=0;i<itemList.length;i++){
			if(itemList[i].lastIndexOf("_begin")>-1 ){
				var beginVal =jQuery("#"+itemList[i]).val();
				var itemName=itemList[i].substring(0,itemList[i].lastIndexOf("_begin"));
				condition += itemName +"  >= '"+beginVal+"' AND ";
				
			}else if(itemList[i].lastIndexOf("_end")>-1){
				hasEnd=true;
				var endVal =jQuery("#"+itemList[i]).val();	
				itemName=itemList[i].substring(0,itemList[i].lastIndexOf("_end"));
				condition += itemName +"  <= '"+endVal+"'";
			}
			else{
				searchCondition += itemList[i] +" LIKE '%"+jQuery("#"+itemList[i]).val()+"%' AND ";
			}
			
		}
		
		//select选择框
		var selectObjs = jQuery("#queryAdvancedDiv select");
		for(var i=0;i<selectObjs.length;i++){
			var selectObj = selectObjs[i];
			if(selectObj.selectedIndex>0){
				var selectValue=selectObj.options(selectObj.selectedIndex).value;
				searchCondition +=selectObj.name+" LIKE '%"+selectValue+"%' AND ";
			}
			
		}
		if(condition==""){
			searchCondition = searchCondition.substring(0, searchCondition.length-4);
		}else{
			if(!hasEnd){
				searchCondition = searchCondition+condition.substring(0,condition.length-4);
			}else{
				searchCondition = searchCondition+condition;
			}
			
		}
		jQuery("#extranCon").val(searchCondition);
		jQuery("#searchFlag").val("true");	
		jQuery("#page").val(1);
		jQuery("#queryForm").submit();
	},
	/**
	 * 重置高级查询
	 */
	resetSearch:function(){
		var inputObjs=jQuery("#queryAdvancedDiv input[type='text']");
		for(var i=0;i<inputObjs.length;i++){
			var inputObj = inputObjs[i];
			inputObj.value="";
		}
		var selectObjs = jQuery("#queryAdvancedDiv select");
		for(var i=0;i<selectObjs.length;i++){
			var selectObj = selectObjs[i];
			selectObj.value="";
		}
	}
};

/**
 * 数据页的操作
 */
var dataObject={
	isAllChecked:false,//全选标识，全部取消为false,全选为true
	/**
	 * 全选或全不选
	 */
	allChecked:function(){
		if(!dataObject.isAllChecked){ 
			jQuery("input[name='check_key']").each(function(){this.checked=true;}); 
			dataObject.isAllChecked=true;
		}else{ 
			jQuery("input[name='check_key']").each(function(){this.checked=false;}); 
			dataObject.isAllChecked=false;
		} 

	},
	/**
	 * 获取选中的视图记录UNID 可多值
	 */
	getCheckedDocIds:function(){
		var selectObject=jQuery(":checked");
		var unids="";
		for(var i=0;i<selectObject.length;i++){
			var unid=selectObject[i].value;
			if(unid !=""){
				unids +=unid+",";
			}
		}
		unids.substring(0,unids.length-1);
		return unids;
	},
		/**
	 * 打开文档
	 */
	openDocument:function(docId){
		
		view.openViewDoc(docId,viewInfo.formType,viewInfo.formId,viewInfo.isFlowItem,viewInfo.purl,viewInfo.openJs);
		
	},
	//进行排序
	orderBy:function(){
		var obj = window.event.srcElement;
		var mod = "asc";
		if(obj.getAttribute("orderBy")==="asc"){
			mod = "desc";
		}
		var orderBy = obj.id+";"+mod;
		jQuery("#orderBy").val(orderBy);
		jQuery("#queryForm").submit();
	}
};

/**
 * 初始化数据表的位置
 */
function loadViewDataPosition(){
	var $areaSearchBar =  jQuery("#area_searchBar"); 
	var $areaTableData =  jQuery("#dataDiv"); 
	var $advancedDiv =  jQuery("#queryAdvancedDiv"); 
	var $advancedDivHeight = jQuery("#queryAdvancedDiv");
	var $buttonDivHeight = jQuery("#buttonDiv");
	var top = 0;
	if($areaSearchBar){
		top = top+$areaSearchBar.height();
	}
	if($buttonDivHeight){
		top = top+$buttonDivHeight.height();
	}
	if($advancedDiv && $advancedDiv.css("display") !== "none"){
		$areaTableData.css("top", top+$advancedDivHeight.height());
	}else{
		$areaTableData.css("top", top);
	}
}
