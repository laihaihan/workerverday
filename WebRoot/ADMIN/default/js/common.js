/**
 * CRM公共js脚本文件 
 * @author xhuatang@linewell.com
 * @since  2011-07-06
 */

/**
 * 系统的路径
 */
var appPath = "/" + 
	location.pathname.split("/")[(location.pathname.indexOf("/")>0?0:1)] + "/";

	
//定义交互的页面
var actionUrl =  appPath + "app.action";


/**
 * 定义ucap的Session对象
 */
var ucapSession = {
	/**
	 * 应用系统的路径
	 * 
	 * @type String
	 */
	appPath : appPath,
	hostPath : "",
	baseAction : appPath + "BaseAction.action",
	/**
	 * win窗口的默认设置
	 */
	win : {
		winImg : "<img src='"
				+ appPath
				+ "uistyle/images/icon/icon_87.gif' align='absmiddle' ></img>&nbsp;",
				//减小DIV弹出框的边距
		winBodyStyle : "background-color:#FFF;padding:1px 1px 1px 1px;"
	},
	viewCache:{},
	setViewCache:function(viewId,key,value){
		if(!this.viewCache[viewId]){
			this.viewCache[viewId] = {};
		}
		this.viewCache[viewId][key] = value;
	}
}

/**
 * 定义UCAP的公共实现的方法
 */
var ucapCommonFun={
/**
	 * 后台调用过程中发生异常时，前台的统一处理
	 * 
	 * @param {}
	 *            json 后台返回的json对象
	 */
	dealException : function(json) {
		if (null != json && null != json.exceptionType) {
			if (json.exceptionType == "01") {// 说明发生了会话为空的异常了
				if (null != window.opener) {
					if (window.opener)
						window.opener.location.reload();
					window.close();
				} else {
					window.location.reload();
				}
			} else {
				alert(json.exceptionMsg);// 异常直接提示，不做其他处理
			}
			return false;
		}
		return true;
	},
	/**
	 * 获取url参数如index.htm?id=1 返回1
	 * url将URL中的字符串时进行分解获取参数name的实际值
	 * modify by jc 20100420
	 */
	getUrlParameter : function(name,url) {
		var params = null;
		if(url){
			params = url.replace(/[^\?\&]*(\?|&)/,"").split('&');
		}else{
			params = window.location.search.slice(1).split('&');
		}
		for (var i = 0; i < params.length; i++) {
			var temp = params[i].split("=");
			if (temp[0] == name) {
				//支持值里面有=，如&purl=unid=123&，取出的值为unid=123 mdf by jc 20110311
				return params[i].replace(/^[\w]*=/,"");
			}
		}
		return "";
	},
	/**
	 * 增加下垃项的值
	 * 
	 * @param {}
	 *            oSel
	 * @param {}
	 *            value
	 * @param {}
	 *            text
	 */
	addOption : function(oSel, value, text) {
		if (oSel == null) {
			return;
		}
		oSel.options.add(new Option(text, value));
	},
		/**
	 * 对list中的元素进行上下移动
	 * 
	 * @param {}
	 *            oSel
	 * 
	 * @param {}
	 *            option
	 */
	moveOption : function(oSel, index) {
		var result = false;
		if (null == oSel.options || oSel.options.length < 1) {
			return result;
		}
		for (var i = 0; i < oSel.options.length; i++) {
			var option = oSel.options[i];
			if (option.selected) {
				if (index < 0 && (i + index) < 0)
					return result;
				if (index > 0 && (i + index) > (oSel.options.length - 1))
					return result;
				var v = oSel.options[i].value;
				var it = oSel.options[i].innerText;
				oSel.options[i].value = oSel.options[i + index].value;
				oSel.options[i].innerText = oSel.options[i + index].innerText;
				oSel.options[i + index].value = v;
				oSel.options[i + index].innerText = it;
				oSel.options[i + index].selected = true;

				result = true;
				break;
			}
		}
		return result;
	},
	/**
	 * 执行js脚本 有返回值 true 或 false
	 * 
	 * @param {}
	 *            js
	 */
	evalJavaScript : function(js) {
		if (typeof js == "undefined" || js == "")
			return true;
		try {
			return eval(js);
		} catch (e) {
			return false
		}
	}
};


/**
 * 设置首页
 * @return 设置首页的代码
 */
var setMainPage = function() {
	return 'this.style.behavior=\'url(#default#homepage)\';'
			+ 'this.setHomePage(\'' + window.location + '\');';
};

/**
 * 加为收藏
 */
var setFavorites = function() {
	//兼容IE及火狐,收藏夹 mdf by jc 20100915
	var title = window.title,url=window.location.href;
	var ua = navigator.userAgent.toLowerCase();
	try {
		window.external.addFavorite(url, title);
	} catch(e) {
		try {
			if(ua.indexOf("msie 8")>-1){
				window.external.AddToFavoritesBar(url,title,"");//IE8
			}else{
				window.sidebar.addPanel(title, url, "");//firefox
			}
		} catch(e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}	
	return false;
};



//jQuery扩展
jQuery.extend({
  /**
   * 加载js文件，并执行回调函数
   * @param jsArray  需要加载的js文件的路径
   * @param callback 回调的方法
   */
  loadJs : function(jsArray, callback){
    for(var i in jsArray){
      var js = jsArray[i];
      var $script = jQuery("<" + "script></" + "script" + ">");
      $script.attr({"src" : "'"+js+"'", "language" : "javascript"});      
      jQuery("head").append($script);      
    }
    if(callback){
      callback();
    }
  }
});

/**
 * 定义通用选择框
 */
var ucapSelect = {
	selectDataSD :function (type,selNum,inputName,conValue,outputFunc,
		inputSplit, outSplit,treeType) {
		  //第一次加载			
			if(typeof Ext =="undefined"){
				var jsArray = [appPath +"js/ext/ext-base.js",
									appPath +"js/ext/ext-all.js",
									appPath +"js/ext/ext-lang-zh_CN.js",
                 				    appPath +"crm/js/commonSelect.js"];				
				jQuery.loadJs(jsArray,function(){ 		
          			 selectDataSD(type,selNum,inputName,conValue,outputFunc,inputSplit, outSplit,treeType);
       			 });				
			}else{//再次加载
			  Ext.BLANK_IMAGE_URL = appPath + 'uistyle/images/s.gif';// 替换图片文件地址为本地
			  selectDataSD(type,selNum,inputName,conValue,outputFunc,inputSplit, outSplit,treeType);
			}		
	}
};
/**
 * 解决IE9的Range不存在createContextualFragment方法导致Ext出错的BUG by xhuatang@linewell.com 2011-3-23
 */
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment)
{	
	Range.prototype.createContextualFragment = function(html)
	{
		var frag = document.createDocumentFragment(), 
		div = document.createElement("div");
		frag.appendChild(div);
		div.outerHTML = html;
		return frag;
	};
}

