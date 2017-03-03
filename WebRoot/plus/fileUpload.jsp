<%@page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>文件上传</title>
<jsp:include page="../sys/jsp/session.jsp"/>
</head>
<body>
<div style="background-color:#FFF;padding:10px 14px 0px 14px;height:100%;">
	<div id="readme"></div>
	<div id="uploadFileUrl"></div>
	<iframe name="upload_hidd" style="width:0px;height:0px;"></iframe>
	<form id="fileUploadForm" name="fileUploadForm" action="" enctype="multipart/form-data" method="post" target="upload_hidd">
	<div id="div_file">
	文件标题：<input name="fileName" id="fileName" value="" style="width:150px;"/>&#160;&#160;&#160;&#160;<span id="docType_div" style="display:none1;"></span>
	文件路径：<input type="file" name="file" id="file" style="width:250px;" onChange="addFileInput()"/><input type="button" value="删除" onclick="deleteFileAttr()"><br/>   
	</div>
	<input id="hidd_fileUploadForm_submit" type="submit" style="display:none;"/>
	</form>
	<div id="progressBar"> </div>
</div>
<script>
var runner = new Ext.util.TaskRunner();
var tasker = null;
//刷新上传状态
var Runner = function(){
    var f = function(pbar, btn, count, cb,sType,punid,docType){
        return function(){
        	Ext.Ajax.request({url:appPath+'BackGroundService.upload?uploadStatus=&'+ucapCommonFun.getRandomString(), 
				success : function(a) { 
					var uploadInfo = Ext.decode(a.responseText);
					if(a.responseText=="false" || (uploadInfo["ReadTotalSize"]==uploadInfo["UploadTotalSize"])){
				     	//btn.dom.disabled = true;
				     	pbar.updateProgress(100, "文件【"+$("fileName").value+"】上传成功!");
						window.parent.ucap_attr_fun.getInfo(docType,punid);
						//setTimeout(ucap_attr_fun.getInfo(docType,punid), 1000);
						cb();
						runner.stop(tasker);
						runner.stopAll();
						window.frameElement.setAttribute("isUpload","true");
				     	return;
					}
					var progressPercent = Math.ceil((uploadInfo["ReadTotalSize"]) / uploadInfo["UploadTotalSize"]*100);
					var num = uploadInfo["CurrentUploadFileNum"];
					pbar.updateProgress(progressPercent/100, uploadInfo["Status"]);
				},        
				failure : function(a) {
				     // alert(a.responseText); 
				} 
			}); 
       };
    };
    return {
        run : function(pbar, btn, count, cb,sType,punid,docType){
        	var fn = f(pbar, btn, count, cb,sType,punid,docType);
        	var tempFn = function(){
		        fn();
		    };
        	var task = {
			    run:tempFn,
			    interval: 100 //1 second
			}
			tasker = runner.start(task);
        }
    }
}();
function addFileInput(){
	var spv = ($("file").value||"").split("\\");
	$("fileName").value = (spv[spv.length-1]||"").replace(/([\.]\w*)$/,"");
}
/**
 * 删除本身iframe上传项
 */
function deleteFileAttr(){
	//可以直接删除本身iframe，亦可以设置个状态隐藏起来不上传文件
	if(window.frameElement){
		window.frameElement.setAttribute("isUpload","hidden");
		window.frameElement.style.display="none";
	}
}
/**
 * 获取文件类型
 */
var _fileUpload_Html = (function(){
	//ucap_attr_fun.setAttrTypes("|测试|测试1|自定义");
	var allTypes = window.parent.ucap_attr_fun.attrTypes||window.parent.ucap_attr_fun.defaultAttrTypes;
	var types = allTypes.split("|");
	var html = '文件类型：<select id="s_fileType" style="width:80px;">';
	for(var i=0;i<types.length;i++){
		if(types[i]=="正文")
			html += '<option name="r_fileType" value="0">'+types[i]+'</option>';
		else if(types[i]=="办理单")
			html += '<option name="r_fileType" value="1">'+types[i]+'</option>';
		else if(types[i]=="附件")
			html += '<option name="r_fileType" value="2">'+types[i]+'</option>';
		else	
			html += '<option name="r_fileType" value="'+types[i]+'">'+types[i]+'</option>';
	}
	//if(types.length>1)
	html+='</select><span id="fileType_span" style="display:none;"> 自定义：<input name="fileType" id="fileType" style="width:100px;" value=""/></span><br/>';
	$("docType_div").innerHTML = html;
	return html;
})();
var ucap_run = false;//是否正在上传状态
function file_upload(sType,punid,docType,split){
	//正在运行或没有选择要上传文件时不上传
	if(ucap_run){
		return;
	}
	if($("file").value==""){
		window.frameElement.setAttribute("isUpload","false");
		return;
	}
	ucap_run = true;
	sType = sType || ucapCommonFun.getUrlParameter("sType");
	punid = punid || ucapCommonFun.getUrlParameter("punid");
	docType = docType || ucapCommonFun.getUrlParameter("docType");
	split = split || ucapCommonFun.getUrlParameter("split")||"";
   	if(!split)split="~!~";
   	var fnames = Ext.query("input[id=fileName]");
   	var fTypes = Ext.query("select[id=s_fileType]");
	var captions = "";
	var types = "";
	for(var k=0;k<fnames.length;k++){
		if(fnames[k].value=="" && k!=fnames.length-1){
			captions+=escape("无标题")+split;
			types+=escape(fTypes[k].value)+split;
		}else{
			captions+=escape(fnames[k].value)+split;
			types+=escape(fTypes[k].value)+split;
		}
	}
	var pbar2 = new Ext.ProgressBar({
		text:'准备上传中……',
		id:'pbar2',
		cls:'left-align',
		renderTo:'progressBar'
	});
	
	var btn2 = Ext.get('uploadButton');
	Runner.run(pbar2, btn2, 100, function(){
	    pbar2.reset();
	    pbar2.updateText("文件【"+$("fileName").value+"】上传成功!");
	},sType,punid,docType);
	
	captions = captions.replace(/(~!~)$/,"");
	captions = escape(captions);
	types = types.replace(/(~!~)$/,"");
	types = escape(types);
	var isDocSave = punid?"1":"0";
	_UcapForm.cfg.isDocSave = isDocSave;
	Ext.getDom("fileUploadForm").action = "BackGroundService.upload?docType="+docType+"&types="+types
					+"&punid="+punid+"&captions="+captions+"&split="+split+"&type="+sType+"&isDocSave="+isDocSave;
	Ext.getDom("fileUploadForm").target="upload_hidd";
	Ext.getDom("hidd_fileUploadForm_submit").click();
	$("div_file").style.display="none";
}
</script>
</body>
</html>