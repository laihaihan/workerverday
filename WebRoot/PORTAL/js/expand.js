/**
 * 公文频道的渲染事件
 * @param {} param 频道基本信息
 */
function gongwen(param){
	var htmlResult = "";
	//1.接收到的频道配置信息
	var settingInfo=encodeURIComponent(param[0].xml);
	
	//2.这里将配置信息推送给gongwen.jsp进行渲染
	 jQuery.ajax({
	   type: "POST",
	   async : false,
	   url: appPath+"/PORTAL/demo/gongwen.jsp",
	   data: settingInfo,
	   dataType: "text",
	   success: function(result){
	   		if(result){
	   			//3.返回渲染结果的HTML
	   			htmlResult=result;
			}
	   }
	});
	 
	//4.返回频道展示HTML
    return htmlResult;
};

/**
 * 邮件列表-频道渲染函数
 * @param {} param 频道基本信息
 */
function mailList(param){
	var $ = jQuery;
	var content = this;
	
	//获取频道配置信息
	var portlet = $(param).children("portlet");
	var portletDisplay = $(param).children("portletDisplay");

	//请求WebService的回调函数
	var callBack = function(data){
		//频道数据的打开事件
		var openJs = $(data).find("doc>info>click").text()||1;
		var rows = "";
		var i=0;
		//组装频道内容的行数据的HTML
		$(data).find("doc>items>item").each(function(){
			var row = "";
			if(i==0){
				row = "<dt>";
				$(this).children().each(function(i){
					row += "<div>"+$(this).text()+"</div>";
				});
				row += "</dt>";
			}else{
				row = "<dd>";
				$(this).children().each(function(i){
					row += "<div>"+$(this).text()+"</div>";
				});
				row += "</dd>";
			}
			i++;
			rows += row;
		});
		//频道内容HTML框架
		var html = '	<div class="t"></div>\
		<div class="b"></div>\
		<div class="l"></div>\
		<div class="r"></div>\
		<div class="lt"></div>\
		<div class="rt"></div>\
		<div class="lb"></div>\
		<div class="rb"></div>\
		<div class="icon"></div>\
		<div class="title">电子邮件</div>\
		<div class="info">您有<a style="color:red">5</a>封未读邮件</div>\
		<dl class="dl">\
		'+rows+'\
		</dl>		';
		
		var y = $(param).children("y").text();
		var x = $(param).children("x").text();
		//设置频道坐标
		$(content).ucapChannel("setXY",{x:x,y:y});
		var width = $(param).children("width").text();
		var height = $(param).children("height").text();
		//设置频道宽高
		$(content).css("width",width);
		$(content).css("height",height);
		
		//将频道内容HTML加入到频道中
		$(content).append(html);
		//渲染行样式
		$(content).find("dd:even").addClass("blueBg");
	}
	
	//获取WebService地址
	var url = portlet.children("source").text()||"";
	if(url){
		//根据URL获取WebService数据
		$(content).ucapChannel.ajaxWebService(url,callBack);
	}
	
	return "";
};

function showViewList(param){
	//直接修改标题后，再重新设置频道内容
	/*var div = $("<div style='margin-rignt:10px'><a href='#'>更多</a></div>");
	$(param).find("portlet name").append(div);
	$(this).ucapChannel("setContent",param); */


	var htmlResult = "";
	//1.接收到的频道配置信息
	var settingInfo=encodeURIComponent(param[0].xml);
	
	//2.这里将配置信息推送给gongwen.jsp进行渲染
	jQuery.ajax({
	   	type: "POST",
	   	async : false,
	   	url: appPath+"/lw-admin/portal/view_list.jsp",
	   	data: settingInfo,
	   	dataType: "text",
	   	success: function(result){
	   		if(result){
	   			//3.返回渲染结果的HTML
	   			htmlResult=result;
			}
	   	}
	});
	
	//4.返回频道展示HTML
    return htmlResult;
    
}