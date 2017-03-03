
//ucapPortal.ucapSetChannelHtml("12DB4B64864E224219F7CDBEC7773D66","testPortal");

/**
 * 首页频道自己设置测试
 * @type 
 */
//if (ucapPortal) ucapPortal.callBackFun = setPortal;
 function setPortal(channels){
 	Ext.getDom("portal_id").innerHTML="";
	Ext.getDom("portal_info").style.display="none";
 }
function getIndexFram(paraChannel,i,j){
	//alert(Ext.encode(paraChannel)+" i="+i+" j="+j);
}
function getMenu(succes,responseText){
	if (succes){
		$("menu").innerText=responseText;
	}
}
function getNav(succes,responseText){
	if (succes){
		$("nav").innerText=responseText;
	}
}
/**
 * 主要用于文档发布
 * 
 * @type 
 */
var docFunc={
	
	/**
	 * 发布文档
	 */
	publishDoc:function(state){
		var docUnid = _UcapForm.cfg.unid;
		var formId = _UcapForm.cfg.curFormId;
		var formType = _UcapForm.cfg.curFormType;
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"publish","unid":docUnid,"formUnid":formId,"formType":formType,"state":state},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					Ext.Msg.alert("提示信息","文档发布成功！");
					window.location = window.location;
				} else {
					Ext.Msg.alert("提示信息","文档发布失败！");
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	}
	
}

/**
 * 测试用例
 * @type 
 */
var testUserFun = {
	/**
	 * 写HelloAction类
	 * 在verbs.properties中配置Action
	 * 在user.js中写交互方法
	 * 在应用中配置或其它js函数中调用此方法testUserFun.testAction();
	 */
	testAction:function(){
		var docUnid = "";
		var formId = "";
		var formType = "";
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"hello","unid":docUnid,"formUnid":formId,"formType":formType},
			callback:function(options,success,response){
				if (success){
					var jsonobj = Ext.decode(response.Text);
					Ext.Msg.alert("提示信息",response.Text);
					alert(jsonobj);
				} else {
					Ext.Msg.alert("提示信息","连接失败！");
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	}
};

function getShortcutsHtml(){
	if (this.content.length==0)return "";
	var html ="<table align='center' width='100%' cellpadding='0' cellspacing='0' >";
	var row=5;
	var spac=2;
	html+="<tr><td colspan='"+spac+"' style='background: url(../../uistyle/style_1/ucapimages/shortcuts_top_bg.jpg) repeat-x center bottom;height:14px;width:100%;'>&nbsp;</td></tr>";
	var width=100/spac;
	//取出图片所在的列的值
	var flag=0;
	for(var i=0;i<this.content.length;i++){
	    if(flag==0){
	        row=row-1;
	        html +="<tr height='26px' style='background-color:#F2FBFC'>";
	    }
	    html +="<td width='"+width+"%' align='center' >"+ucapMenu.getCutHtml(this.content[i],1)+"</td>";
	    flag=flag+1;
	    if(flag==spac){
	        html +="</tr>";
	        flag=0;
	        
	    }		
	}
	var count=this.content.length%spac;
	if(count!=0){
	    for(var i=0;i<=count;i++){
	    html +="<td width='"+width+"%' height='20px'>&nbsp;</td>";
	    }
	    html +="</tr>";
	}
	
	for(var j=0;j<=row;j++){
	html+="<tr height='25px' style='background-color:#F2FBFC'><td colspan='"+spac+"'>&nbsp;</td></tr>";
	}
	html+="<tr><td colspan='"+spac+"' style='background: url(../../uistyle/style_1/ucapimages/shortcuts_bottom_bg.jpg) repeat-x center bottom;height:14px;width:100%;'>&nbsp;</td></tr>";
	html +="</table>"
	return html;
}
/**
 * 页签被激活时触发的自定义事件
 * @param {} tabid 页签ID
 * @param {} ifrid 视图ID
 */
view.tabUserActivate = function(tabid,ifrid){
	//以下逻辑为每次单击激活页签时自动刷新页签内的视图数据
//	var ifrWin = $(ifrid).contentWindow;
//	if(ifrWin && ifrWin.view){
//		ifrWin.view.refresh();
//	}
};