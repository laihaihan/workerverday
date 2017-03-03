
var appPath = "/" + location.pathname.split("/")[(location.pathname.indexOf("/")>0?0:1)] + "/";
/**
 * 初始化和重新加载按钮项
 * @return
 */
function initImBtnCfg(){
	var requestConfig = {
			url:appPath + "BaseAction.action",
			params:{"type":"configImButton","act":"getItem"},
			callback:function(options,success,response){
				if (success){
					var jsonArray = Ext.decode(response.responseText);					
					if(jsonArray.length<1){
						var divMsg=document.createElement("div");
						divMsg.innerHTML="<div style='text-align:center'>当前没有IM集成选项配置</div>";
						document.body.appendChild(divMsg);
					}else{
						var div=document.createElement("divMsg");
						div.innerHTML="<div style='color:red'>配置IM客户端集成模块，包括名字、地址、打开方式、提示信息等信息。例待办事宜、会议通知</div>";
						document.body.appendChild(div);
						for(var i=0;i<jsonArray.length;i++){
							var json=jsonArray[i];
							getItem(json.imBtnName,json.imBtnUri,json.imBtnTip,json.imBtnOpen,json.imBtnImg);
						}		
					}											
				} else {						
					alert("获取IM按钮配置失败！");
				}
			}
		} 
	Ext.Ajax.request(requestConfig);
}
/**
 * 插入表单的html字符串
 * @param index 随机生成的3位数
 * @param name
 * @return
 */
function setHtml(index,name){	
	var strHtml="";
	strHtml="<fieldset id=\"fset_"+index+"\"><legend>"+name+"</legend>"
			+"<table class=\"table2\" id=\"tb_"+index+"\" style=\"opacity: 1;\">"
			+"<colgroup><col width=\"20%\"><col width=\"25%\"><col width=\"20%\">" 
			+"<col width=\"25%\"><col width=\"30px\"></colgroup>" 
			+"<tbody><tr><th><span class=\"red\"> * </span> 配置项名称：</th>"
			+"<td><input name=\"imBtnName_"+index+"\" id=\"imBtnName_"+index+"\" class=\"inputbox\"></td>"
			+"<th><span class=\"red\"> * </span> URI链接地址：</th>"
			+"<td><input name=\"imBtnUri_"+index+"\" id=\"imBtnUri_"+index+"\" class=\"inputbox\"></td>"
			+"</tr>"
			+"<tr><th><span class=\"red\"> * </span> 提示信息：</th>"
			+"<td><input name=\"imBtnTip_"+index+"\" id=\"imBtnTip_"+index+"\" class=\"inputbox\"></td>"
			+"<th>图标序号：</th><td><select name=\"imBtnImg_"+index+"\" id=\"imBtnImg_"+index+"\""
			+"onchange=\"iconChange(this,"+index+")\">"
			+"<option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option>"
			+"<option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option>"
			+"<option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option><option value=\"12\">12</option>"
			+"<option value=\"13\">13</option><option value=\"14\">14</option><option value=\"15\">15</option><option value=\"16\">16</option>"
			+"</select>"
			+"<img id=\"titleIconImg_"+index+"\"  width=\"20\" height=\"20\" src=\"./sys/cfgJsp/im/inteItems/Button_MWndLeft1_Normal.bmp\" />"
			+"</td><td style=\"border:0px;align:center\">"
			+"<input type=\"button\" name=\"deleteBtn_"+index+"\" id=\"deleteBtn_"+index+"\" onclick=\"deleteItem('div_"+index+"')\" value=\"删除\">	"
			+"</td></tr><tr><th><span class=\"red\"> * </span> 打开链接方式：</th>"	
			+"<td><input type=\"radio\" name=\"openMethod_"+index+"\" id=\"openMethod_"+index+"\" value=\"0\" checked=\"true\">在IE打开"
			+"<input type=\"radio\" name=\"openMethod_"+index+"\" id=\"openMethod_"+index+"\" value=\"1\">在IM打开</td><th>"
			+"<span class=\"red\"> </span></th><td></td>"
			+"</tr></tbody></table></fieldset>";
	return strHtml;
}

/**
 * 加载已配置项和值
 * @param name
 * @param uri
 * @param tip
 * @param open
 * @param img
 * @return
 */
function getItem(name,uri,tip,open,img){
	var index=parseInt(Math.random()*1000+1); 
	var strHtml=setHtml(index,name);
	var div=document.createElement("div");
	div.id="div_"+index;	
	Ext.DomHelper.append(div,strHtml);
	document.body.appendChild(div);
	var itemName=document.getElementById("imBtnName_"+index);
	itemName.value=name;
	var imBtnUri=document.getElementById("imBtnUri_"+index);
	imBtnUri.value=uri;
	var imBtnTip=document.getElementById("imBtnTip_"+index);
	imBtnTip.value=tip;
	var imBtnImg=document.getElementById("imBtnImg_"+index);
	imBtnImg.value=img;
	var strSrc="./sys/cfgJsp/im/inteItems/Button_MWndLeft" +img + "_Normal.bmp";
	document.getElementById("titleIconImg_"+index).src = strSrc;
	var openMethod=document.getElementsByName("openMethod_"+index);
	
	open = open + "";
	for(var i = 0; i < openMethod.length; i++){
		if(openMethod[i].value == open){
			openMethod[i].checked=true;
			break;
		}
	}
	document.body.appendChild(div);
}

/**
 * 添加新按钮项
 * @param name
 * @return
 */
function addItem(name){
	if(null==name||""==name){
		name="IM集成按钮配置";
	}
	var index=parseInt(Math.random()*1000+1); 
	var strHtml=setHtml(index,name);
	var div=document.createElement("div");
	div.id="div_"+index;
	
	Ext.DomHelper.append(div,strHtml);
	document.body.appendChild(div);
}
/**
 * 保存IM按钮项
 * @return
 */
function saveItem(divId){
	var items=document.getElementsByTagName("fieldset");
	if(!divId && items && items.length<1){
		alert("当前没有按钮项，无需保存！");
		return;
	}
	var jsonArray="["
	for(var i=0;i<items.length;i++){
		var fieldsetId=items[i].id;
		var strArray=fieldsetId.split("_");
		var index=strArray[1];
		var itemName=document.getElementById("imBtnName_"+index).value;
		var itemUri=document.getElementById("imBtnUri_"+index).value;
		var itemTip=document.getElementById("imBtnTip_"+index).value;
		var itemImg=document.getElementById("imBtnImg_"+index).value;
//		var itemOpenMethod=document.getElementById("openMethod_"+index).value;
		var itemOpenMethod;
		var openMethod=document.getElementsByName("openMethod_"+index);
		for(var j = 0; j < openMethod.length; j++){
			if(openMethod[j].checked == true){
				itemOpenMethod=openMethod[j].value;
				break;
			}
		}
		
		var json="{\"itemName\":\""+itemName+"\",\"itemUri\":\""+itemUri+"\",\"itemTip\":\""+itemTip+"\",\"itemImg\":\""+itemImg+"\",\"itemOpenMethod\":\""+itemOpenMethod+"\"}";
		if(0==i){
			jsonArray+=json;
		}else{
			jsonArray+=","+json;
		}	
	}
	jsonArray+="]"
	var requestConfig = {
			url:appPath + "BaseAction.action",
			params:{"type":"configImButton","act":"saveItem","jsonData":jsonArray},
			callback:function(options,success,response){
				if (success){
					var json = Ext.decode(response.responseText);					
					if(jsonArray){
						if(null!=divId&&""!=divId){//删除后的保存
							alert("删除IM按钮配置成功！");
						}else{
							alert("保存IM按钮配置成功！");
							window.location=window.location;
						}					
					}											
				} else {						
					alert("保存IM按钮配置失败！");
				}
			}
		} 
		Ext.Ajax.request(requestConfig);
}
/**
 * 删除IM按钮项
 * @param divId 按钮项所属的divId
 * @return
 */
function deleteItem(divId){
	var strArray=divId.split("_");
	var index=strArray[1];
	var div=document.getElementById(divId);
	document.body.removeChild(div);	
	saveItem(divId);
}

/**
 * 切换图标
 * @param obj
 * @param index
 * @return
 */
function iconChange(obj,index){
	var strSrc="./sys/cfgJsp/im/inteItems/Button_MWndLeft" +obj.value + "_Normal.bmp";
	document.getElementById("titleIconImg_"+index).src = strSrc;
}