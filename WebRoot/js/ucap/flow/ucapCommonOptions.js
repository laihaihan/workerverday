function addOption( oSel, value, text ){
	if( oSel == null ){
		return;
	}
	//2012-4-1 by@chuiting 
	//解决BUG1128V1.0-发送对话框：待选择人员输入空格，点击查询，查询出一条空的记录，但实际上不存在该空记录
	//value,text为空时，不添加到列表上，直接返回
	if((value==null||value=="")&&(text==null||text=="")){
		return;
	}
	var	 oOption = document.createElement( "OPTION" );
	oOption.value = value;
	oOption.text = text;
	oSel.add( oOption );
	oOption.setAttribute("title",text);
}
function setOptions(fieldname,values,texts){
	removeAllItems($(fieldname));
	var vt =texts.split(",");
	var vv =values.split(",");
	for (var i=0;i<vt.length;i++)
		addOption($(fieldname), vv[i],vt[i] );
	$(fieldname).selectedIndex = 0;
}
function SetOptionsValue(field,sValue){
	var obj =$(field);
	for (var i = 0 ; i <obj.options.length ; i++){
		if(	obj.options[i].value.trim() == sValue.trim() ){			
			obj.options.selectedIndex = i;
			break;
		}
	}
}
function getSelectValue(fromSele){
	 var returnObj={
	   value:'',
	   text:''
 	 }
	var obj = $(fromSele);
	 if (!(typeof(obj)=='object'&& obj.tagName.toUpperCase( )=='SELECT')) return returnObj;
	  returnObj.value=obj.options[ obj.selectedIndex ].value;
	  returnObj.text=obj.options[ obj.selectedIndex ].text;
	return returnObj	
}
function getSelectValues(fromSele,sep){
	 var returnObj={
	   value:'',
	   text:''
 	 }
 	 if (!(typeof(fromSele)=='object'&& fromSele.tagName=='SELECT')) return returnObj;
	 if(typeof(sep)=="undefined" || !sep) sep=',';
	 var optS=fromSele.options;
	  for(var i=0;i<optS.length;i++){
		returnObj.value+=sep+optS[i].value.trim();
		returnObj.text+=sep+optS[i].text.trim();  
 	  }
 	  returnObj.value=returnObj.value.slice(sep.length);
	  returnObj.text=returnObj.text.slice(sep.length);
	return returnObj	
}
function uptOption( oSel, index, value, text ){
	if( oSel == null )
		return;
	if ( index == -1 )
		return;
		
	if( value != "" )
		oSel.options[ index ].value = value;
	if( text != "" )
		oSel.options[ index ].text = text;
}
/**
 * obj	<select>Ԫ�ض���
 * loc	����ƶ�����,-1:����;1:����
 *	
 */
function moveUpOrDown( oSel, loc ){
	var ipos =oSel.selectedIndex;
	if( ipos== -1 )	return;
	if(ipos + loc < 0 || ipos + loc > oSel.length-1 )
	{//����߽�
		return;
	}
	else{
		var tempVal_loc = oSel.options[ipos + loc ].value;
		var tempTxt_loc = oSel.options[ ipos + loc ].text;
		
		var tempVal = oSel.options[ ipos].value;
		var tempTxt = oSel.options[ipos].text;
		
		oSel.options[ ipos + loc ].value = tempVal;
		oSel.options[ ipos + loc ].text = tempTxt;
		
		oSel.options[ ipos ].value = tempVal_loc;
		oSel.options[ ipos ].text = tempTxt_loc;
		
		//�ı䵱ǰѡ�е���
		oSel.selectedIndex =  ipos + loc ;
	}
}	

function printAllOptions( oSel ){
	for( var i = 0; i < oSel.length; i++ ){
		alert( oSel.options[ i ].value + ":" + oSel.options[ i ].text );		
	}
}

function addItem( destDataSel, srcDataSel, multiSel ,flag ){
	if( destDataSel == null ){
		return;
	}	
	if( srcDataSel.selectedIndex == -1 )
		return;
	for (var i=0;i<srcDataSel.options.length;i++){
		if (srcDataSel.options[i].selected) {
			var val = srcDataSel.options[i].value;
			if( !checkValExist( destDataSel, val ) ){		
				if( multiSel == 0 ){
					destDataSel.options.length = 0;
				}
				addOption( destDataSel, val, srcDataSel.options[i].text );
				if( multiSel == 0 ) break;
			}
		}
	}
	if (flag==null) srcDataSel.selectedIndex = -1;
}

function addAllItems( destDataSel,srcDataSel, multiSel ){
	if( multiSel != '0' && multiSel != '1'){
		return;
	}
	for (var i=0;i<srcDataSel.options.length;i++){		
			var val = srcDataSel.options[i].value;
			if(!checkValExist(destDataSel, val)){		
				if(multiSel == 0){
					destDataSel.options.length = 0;
				}
				addOption( destDataSel, val, srcDataSel.options[i].text );
				if( multiSel == 0 ) break;
			}
	}
	
}
/**
 * yjy 删除所有选中的列表 yjy2010-7-29
 * @param {} obj
 * @return {Boolean}
 */
function removeAllSelItem(obj){
	var SourceSelect =obj.options;
	var IsCreate = false;
	while (IsCreate == false)                  //删除源select循环 
    { 
       var SecIndex  = obj.selectedIndex; //动态得到被选择的索引 
       if (SecIndex==-1)return false;
       var theLength = SourceSelect.length ;       //动态得到Select的长度 
       if (theLength==0) return false;
       SourceSelect.remove(SecIndex);          //删除指定索引的元素 
       if (theLength == 1)                     //表示最后一个元素已删除， 
           return false;                       //源select空了，退出循环 
       if (theLength == SecIndex + 1)          //表示多选的已全部删掉，退出循环 
           return false; 
       if (SourceSelect.options[SecIndex].selected == false) 
       { 
           IsCreate = true; 
       } 
	} 
}
function removeItem( oSel ){
	if( oSel.selectedIndex != -1 ){//����Ŀ���û����ʱ˫�����Ľű�����
		var lastSelectedIndex = oSel.selectedIndex;
		oSel.options.remove( oSel.selectedIndex );
		if (oSel.length ==0) return;
		//���Ƴ�һ��Ԫ�غ�,��Ԫ�صĺ�һ��Ԫ�ؼ���ѡ��
		if( ( lastSelectedIndex + 1 ) <= oSel.length ){

			oSel.options[ lastSelectedIndex].selected = true;
		}  else {
			oSel.options[ oSel.length -1].selected = true;
		}
	}
	
	
}

function removeAllItems( oSel ){
	oSel.options.length = 0;
}


function checkValExist( oSel, val ){
	for( var i = 0; i < oSel.length; i++ ){	
		if( val == oSel.options[ i ].value ){
			return true;			
		}
	}	
	return false;
}
//������һȺ checkboxName Ϊ����� ��ѡ��(checkbox) ��ѡ��ֵ
//����˵�� checkboxName  ��ѡ����
//����ֵ���Զ��ŷָ� ��ѡ��ѡ�е�ֵ һ���ַ�
function checkboxValues(checkboxName){
   var rowid_Obj=document.getElementsByName(checkboxName);
   if (rowid_Obj==null)return "";
   var str="";
   for(var i=0;i<rowid_Obj.length;i++){
   if(rowid_Obj[i].checked && rowid_Obj[i].value.trim()!="")
	  str+="," + rowid_Obj[i].value  
	}
 	return str.slice(1);
}
function setCheckboxValue(checkboxName,value){
	var rowid_Obj=document.getElementsByName(checkboxName);
   if (rowid_Obj==null)return "";
   for(var i=0;i<rowid_Obj.length;i++){
	rowid_Obj[i].checked = false;
	  	if(rowid_Obj[i].value.trim()==value.trim())
	  	rowid_Obj[i].checked = true;
	}
}