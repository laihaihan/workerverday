//验证ip
function check(obj){
var str = obj.value; 
    var strlength= str.length; 
    if(strlength <1){ 
        alert("输入的内容不能为空");
   		obj.focus(); 
        return false; 
    }else{ 
      if(strlength>15||strlength <7) {          //IP的字段长度的限制       
            alert("您输入的IP长度不正确，必须是7到15位"); 
   		    obj.focus(); 
            return false; 
        } 
        var patrn =/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;//正则表达式，\d为数字,{1,3}一位或为三位. 
        if(!patrn.exec(str)){ 
            alert("您输入的IP格式不正确，必须是000.000.000.000格式"); 
    		obj.focus(); 
            return false; 
        }    
        var laststr; 
        laststr= str.split(".");    //用.把字符串str分开 
        var last_patrn=/^\d{1,3}$/; 
        if(parseInt(laststr[0])>255||parseInt(laststr[1])>255||parseInt(laststr[2])>255||parseInt(laststr[3])>255) { //判断IP每位的大小     
            alert("您输入的IP范围不正确，必须是0~255之间"); 
     		obj.focus(); 
            return false; 
        } 
        if(!last_patrn.exec(laststr[3])){ 
            alert("您输入的IP格式不正确，必须是000.000.000.000格式"); 
     		obj.focus(); 
            return false; 
        } 
        return true; 
        } 
}



/**
 * 获取IM服务器配置信息
 * @return
 */
function initServerCfg(){
	var objIp=document.getElementById("dbIp");
	var objPort=document.getElementById("dbPort");
	var objUser=document.getElementById("dbUser");
	var objPassword=document.getElementById("dbPassword");
	var appPath = "/" + location.pathname.split("/")[(location.pathname.indexOf("/")>0?0:1)] + "/";
	var requestConfig = {
			url:appPath + "BaseAction.action",
			params:{"type":"configImServer","act":"getConfig"},
			callback:function(options,success,response){
				if (success){
					var json = Ext.decode(response.responseText);	
					if(json){
						objIp.setAttribute("value",json.ip);
						objPort.setAttribute("value",json.port);
						objUser.setAttribute("value",json.user);
						objPassword.setAttribute("value",json.password);
					}													
				} else {						
					alert("读取IM服务器配置失败！");
				}
			}
		} 
	Ext.Ajax.request(requestConfig);
}
/**
 * 保存IM服务器配置
 * @return
 */
function saveConfig(){
	var objIp=document.getElementById("dbIp");
	if(!check(objIp)) return;
	var objPort=document.getElementById("dbPort");
	if(""==objPort.value.trim()){
		alert("端口号不能为空！");
		objPort.focus();
		return;
	}
	if(isNaN(objPort.value.trim())){
		alert("端口号必须为数字！");
		objPort.focus();
		return;
	}
	var objUser=document.getElementById("dbUser");
	if(""==objUser.value.trim()){
		alert("用户名不能为空！");
		objUser.focus();
		return;
	}
	var objPassword=document.getElementById("dbPassword");
	if(""==objPassword.value.trim()){
		alert("密码不能为空！");
		objPassword.focus();
		return;
	}
	var appPath = "/" + location.pathname.split("/")[(location.pathname.indexOf("/")>0?0:1)] + "/";
	var data="{\"ip\":\""+objIp.value+"\",\"port\":\""+objPort.value+"\",\"user\":\""+objUser.value+"\",\"password\":\""+objPassword.value+"\"}";
	var requestConfig = {
				url:appPath + "BaseAction.action",
				params:{"type":"configImServer","act":"update","jsonData":data},
				callback:function(options,success,response){
					if (success){
						var exjson = Ext.decode(response.responseText);					
						if(exjson){
							alert("修改IM服务器配置成功！");
						}											
					} else {						
						alert("修改IM服务器配置失败！");
					}
				}
			} 
	Ext.Ajax.request(requestConfig);
}
/**
 * 关闭窗口
 * @return
 */
function closeWindow(){
	if(window.parent){
		window.parent.ucapCommonFun.ucapCurOpenType=1;	
	}
	_UcapForm.formClose();
}