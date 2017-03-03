 <%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
 <script type="text/javascript">
  
    var sqlLikeKey = '~!@0~!@5';        //SQL中like的关键字
    
	var sqlAnd = '~!@AND@!~';           //SQL并且的关键字(AND)连接
	
	var sqlOr = '~!@OR@!~';               //SQL并且的关键字(OR)连接
	
	var sqlLTEQ = '~!@0~!@2';               //SQL并且的关键字(<=)连接
	
	var sqlGTEQ = '~!@0~!@1';               //SQL并且的关键字(>=)连接
	
	var sqlEQ = '~!@0~!@0';               //SQL并且的关键字(=)连接
	
	var fieldDbType = '~!@DB@!~';        //数据库字段
	
	var fieldConstType = '~!@CL@!~';      //常量字段
	
	var fieldEndPrefix = '~!@E@!~';       //结束符
	
	var advPrefix = "$_A_$";                //作为高级查询的前缀 
   		
function hasBeginInputName(inputName){
	
	var result = false;
	var advancedQueryItems = new Array();
	<%
		if(null != query && null != query.getQueryAdvancedItems() && query.getQueryAdvancedItems().size() >0 ){
			for(int i=0 ; i<query.getQueryAdvancedItems().size();i++){
	%>
				advancedQueryItems[<%=i%>] ={"itemNameEn":"<%=query.getQueryAdvancedItems().get(i).getItemNameEn() %>","hasBegin":"<%=query.getQueryAdvancedItems().get(i).isHasBegin() %>"} ;
	<%	
			}
		}
	%>
	if(inputName.substr(inputName.length-2)=="_1" ||  inputName.substr(inputName.length-2)=="_2"){
		inputName = inputName.substr(0,inputName.length-2);
	}else{
		return result;
	}
	if(undefined!=advancedQueryItems){
		for(var i=0;i<advancedQueryItems.length;i++){
			var advancedQueryItem = advancedQueryItems[i];
			if(advancedQueryItem.itemNameEn==inputName && advancedQueryItem.hasBegin){
				return true;
			}
		}
	}
	
	return result;
}

//全选，不选
function selectedChangeAll(){
	var  selectedAllChange = document.getElementById("selectedAllChange") ;
	if(selectedAllChange){
		var check_key = document.getElementsByName("check_key");
		if(check_key){
			for(var i=0; i < check_key.length; i++){
				check_key[i].checked = selectedAllChange.checked;
			}
		}
	}
}

	


//获取选中的对象
function getselections(){
	var check_key = document.getElementsByName("check_key");
	var selectRowKeys ="";
	var j=0;
	if(check_key){
		for(var i=0; i < check_key.length; i++){
			if(check_key[i].checked){
				if(j!=0){
					selectRowKeys = selectRowKeys +",";
				}
				selectRowKeys =selectRowKeys + check_key[i].value ;
				j++;
			} 
		}
	}
	return selectRowKeys ;
}


//获取选中的对象
function getselectionKeyValue(n){
	var check_key = document.getElementsByName("check_key");
	var primaryKeyValue=null;
	if(check_key){
		for(var i=0; i < check_key.length; i++){
			if(i==n){
				primaryKeyValue = check_key[i].value ;
				break;
			} 
		}
	}
	return primaryKeyValue ;
}


function getselectionIndex(){
	var check_key = document.getElementsByName("check_key");
	var primaryKeyValue=null;
	if(check_key){
		for(var i=0; i < check_key.length; i++){
			if(check_key[i].checked){
				return i;
			} 
		}
	}
	return -1;
}



//可根据unid 获取对应记录的信息
function getSelecttionRowDatas(){
	var check_key = document.getElementsByName("check_key");
	var j=0;
	var rowDataJson = <%=jsonObj.get("root")%>;
	var array = new Array();
	if(null != rowDataJson && rowDataJson.length>0){
		for(var i=0;i<rowDataJson.length;i++){
			if(check_key[i].checked){
				array[j] = rowDataJson[j];
				j++;
			}
		}
	}
	return array;
}

//可根据unid 获取对应记录的信息
function getSelecttionRowData(n){
	var check_key = document.getElementsByName("check_key");
	var rowDataJson = <%=jsonObj.get("root")%>;
	var rowJson = null;
	if(null != rowDataJson && rowDataJson.length>0){
		for(var i=0;i<rowDataJson.length;i++){
			if(i==n){
				rowJson = rowDataJson[i];
				return rowJson;
			}
		}
	}
	return null;
}


	
	
//过滤purl	
function filterSql(purl){
	//过滤父url
	if(undefined==purl || purl=="" || purl=="null" || purl==null) return "";
	
	var canHasInstanceId = true;
	
	if(purl.indexOf("funid=")>=0)canHasInstanceId=false;
	
	var purls = purl.split("&");
	var tmpUrl = "";
	for(var i=0;i<purls.length;i++){
		var tmpName = purls[i].substring(0,purls[i].indexOf("="));
		if(tmpName=="unid" || tmpName=="type" || tmpName=="formId")
			continue;
		
		if(!canHasInstanceId && tmpName=="instanceUnid"){
			continue;
		}
		
		if(tmpUrl==""){
			tmpUrl =  purls[i];
		}else{
			tmpUrl+="&"+purls[i];
		}	
	}
	
	return tmpUrl;
}
	

	
/**
 * 简单查询
 * @param {} viewId
 */
function sampleQuery(viewId){	    
	var extrancon="";
	var queryValue = document.getElementById("keyword").value;
	if("" != queryValue && "请输入搜索关键字" != queryValue ){
		var simpleSearchSelectObj =document.getElementById("simpleSearchSelect");
		var simpleSearchSelectedText = simpleSearchSelectObj.options[simpleSearchSelectObj.selectedIndex].text ;
		var simpleSearchSelectedValue = simpleSearchSelectObj.options[simpleSearchSelectObj.selectedIndex].value ;
		
		if("0" == simpleSearchSelectedValue){
			alert("请选择对应查询范围");
			return;
		}     	
		extrancon = fieldDbType + simpleSearchSelectedValue + fieldEndPrefix + sqlLikeKey + fieldConstType + queryValue + fieldEndPrefix ;
	}
	var forms = document.forms;	
	if(null!=forms && forms.length>0){
	 	for(var i=0;i<forms.length;i++){
	 		if(forms[i].id =="querySampleForm"){		 			
	 			var temTextInput = document.createElement("<input type=hidden>");
				temTextInput.name = "extrancon" ;
				temTextInput.value = extrancon;
				var advanceDivIsDisplay = document.createElement("<input type=hidden>");
				advanceDivIsDisplay.name = "advanceDivIsDisplay" ;
				advanceDivIsDisplay.value = "0";
				forms[i].appendChild(temTextInput);
				
				var isoldrefTextInput= null;
				isoldrefTextInput = document.createElement("<input type=hidden>");
				isoldrefTextInput.name = "isoldref" ;
				isoldrefTextInput.value = "<%=isoldref%>";
				forms[i].appendChild(isoldrefTextInput);
				
	 			forms[i].action ="<%=basePath%>system/jsp/viewJsp.jsp?viewId="+ viewId ;
				forms[i].method ="post";
				forms[i].submit();
				return;
	 		}
	 	}
	 }
}

/**
 * 高级查询
 * @param {} viewId
 */
function advanceQuery(viewId){		
	
	var advancedVlaue = getAdvancedItemsValue() ;
	
	if(""==advancedVlaue){
		alert("请针对查询字段输入相应的查询值！");
		return;
	}
	var forms = document.forms;	
	if(null!=forms && forms.length>0){
	 	for(var i=0;i<forms.length;i++){
	 		if(forms[i].id =="queryAdvancedForm"){		 			
	 			var temTextInput = document.createElement("<input type=hidden>");
				temTextInput.name = "extrancon" ;
				temTextInput.value = advancedVlaue;
				forms[i].appendChild(temTextInput);
				
				var advanceDivDisplay = document.createElement("<input type=hidden>");
				advanceDivDisplay.name = "advanceDivDisplay" ;
				advanceDivDisplay.value = "1";
				forms[i].appendChild(advanceDivDisplay);	
				
				var isoldrefTextInput= null;
				isoldrefTextInput = document.createElement("<input type=hidden>");
				isoldrefTextInput.name = "isoldref" ;
				isoldrefTextInput.value = "<%=isoldref%>";
				forms[i].appendChild(isoldrefTextInput);
				
	 			forms[i].action ="<%=basePath%>system/jsp/viewJsp.jsp?viewId="+ viewId ;
				forms[i].method ="post";
				forms[i].submit();
				return;
	 		}
	 	}
	 }
	
}




/**
 * 是否显示高级查询
 */
function changeAdvancedDivDisplay(){
	var advancedDiv = document.getElementById('queryAdvancedDiv'); 
	var area_table_data =  document.getElementById('dataDiv'); 
	if(advancedDiv){
		if(advancedDiv.style.display == "none")
	    {
	       var advanceHeight = 90 + advancedDiv.rows.length*30;
	       area_table_data.style.top = advanceHeight ;
	       advancedDiv.style.visibility ="visible";
	       advancedDiv.style.display = "";  
	    }
	   else 
	   {
	   	  area_table_data.style.top = 85 ;
	      advancedDiv.style.visibility ="hidden";
	      advancedDiv.style.display = "none";
	   }
	   
   }
}
/**
 * 初始化数据表的位置
 */
function loadViewDataPosition(){
	if(dbViewForm.isEdit == false){
		var allobj = Ext.query('[name=isCheckboxShow],[id=isCheckboxShow]');
		if(allobj!=null){
			for(var i=0;i<allobj.length;i++){
				allobj[i].style.display="none";
			}
		}
		//Ext.getDom("isCheckboxShow").style.display="none";
	}
	var area_searchBar =  document.getElementById('area_searchBar'); 
	var area_table_data =  document.getElementById('dataDiv'); 
	var advancedDiv = document.getElementById('queryAdvancedDiv'); 
	if(area_table_data){
		if(null!= area_searchBar){
			if(null!=advancedDiv){
				if(advancedDiv.style.display == "")
				 	area_table_data.style.top = 85 + advancedDiv.rows.length*30;
				else
					area_table_data.style.top = 85 ;
			}else{
				area_table_data.style.top = 85 ;
			}
		}else{
			area_table_data.style.top = 55 ;
		}
	}
}


/**
 * 通过此方法获取高级查询的值
 * @return {String}
 */
function  getAdvancedItemsValue(){
	var searchValue = "";
			
	var divobj =document.getElementById("queryAdvancedDiv");
	
	var inputObjs = divobj.getElementsByTagName("input");

   	for(var i=0;i<inputObjs.length;i++){
		var inputObj = inputObjs[i];
		
		if((inputObj.type=="text"||inputObj.type=="hidden") && inputObj.value!=""){
			
			var inputObjName = (inputObj.name||inputObj.id).replace(advPrefix,"");	
		
			if(hasBeginInputName(inputObjName)){
			
				if(inputObjName.lastIndexOf("_1")>0){
					searchValue=searchValue+fieldDbType+inputObjName.substring(0,inputObjName.length-2)+fieldEndPrefix
					+sqlGTEQ+fieldConstType+inputObj.value+fieldEndPrefix+sqlAnd;
				}else{
					
					searchValue=searchValue+fieldDbType+inputObjName.substring(0,inputObjName.length-2)+fieldEndPrefix
					+sqlLTEQ+fieldConstType+inputObj.value+fieldEndPrefix+sqlAnd;
				}
			}else{			
				//不存在name时
				if(!inputObjName || inputObjName.lastIndexOf("_Cn_")>0){
					continue;
				}
								
				searchValue = searchValue + fieldDbType + inputObjName + fieldEndPrefix + sqlLikeKey + fieldConstType + inputObj.value + fieldEndPrefix + sqlAnd;
		
			}
		}
			
	}
	
	var selectObjs = divobj.getElementsByTagName("select");
	for(var i=0;i<selectObjs.length;i++){
		var selectObj = selectObjs[i];
		if(selectObj.value=="")
			continue;
		searchValue=searchValue+fieldDbType+selectObj.name.replace(advPrefix,"")+fieldEndPrefix
					+sqlEQ+fieldConstType+selectObj.value+fieldEndPrefix+sqlAnd;
	}
	
	if(searchValue==""){
		return "";
	}
	searchValue= searchValue.substring(0,searchValue.length - sqlAnd.length);
	return searchValue;
}


/**
 * 重置
 * @return {String}
 */
function  advancedSeaReset(){
	var searchValue = "";
	var divobj =document.getElementById("queryAdvancedDiv");
	var inputObjs = divobj.getElementsByTagName("input");
   	for(var i=0;i<inputObjs.length;i++){
		var inputObj = inputObjs[i];
		if((inputObj.type=="text"||inputObj.type=="hidden") && inputObj.value!=""){
			inputObj.value = "";
		}
	}

}

loadViewDataPosition();		
		
   </script>