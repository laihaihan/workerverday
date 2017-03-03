var appPath ="/"+location.pathname.split("/")[1] +"/";
//var hostPath = location.split(appPath)[0];
var hostPath = location+"";
hostPath = hostPath.substring(0,hostPath.indexOf(appPath));
Ext.onReady(function(){
	Ext.namespace('ucapSession'); 
	Ext.namespace('ucapCommonFun'); 
	Ext.namespace('ucapButtonFunConfirm'); 
	Ext.QuickTips.init();
});
if (typeof(ucapHeader)=="undefined"){
	var ucapHeader={
		sUserStylePath: appPath+"uistyle/style_1/",
		menuType :1,
		navType : 1,
		viewOpenType:1,
		userJson:"",
		indexType:"",
		index:""
	}
}

var ucapSession={
	/**
	 * 应用系统的路径
	 * @type String
	 */
	appPath:appPath,
	hostPath:hostPath,
	/**
	 * 个性定义的资源路径 是在JSP中设置（header.jsp中有设置)
	 * @type String
	 */
	sUserStylePath:ucapHeader.sUserStylePath,
	/**
	 * 个性化资源的图片路径
	 * @type String
	 */
	sUserImgPath:ucapHeader.sUserStylePath+"ucapimages/",
 	userJson:ucapHeader.userJson,
 	indexType:ucapHeader.indexType,
 	/**
 	 * 视图打开方式 1表示是页签方式 2表示普通方式
 	 * @type 
 	 */
 	viewOpenType:ucapHeader.viewOpenType,
 	appUnid:ucapHeader.appUnid,
 	index:ucapHeader.index,
 	/**
 	 * 新建文档的方式 00 表示新窗口 01当前窗口 02 div窗口
 	 * @type 
 	 */
 	newdocType:ucapHeader.newdocType,
 	/**
 	 * 打开文档的方式 00 表示新窗口 01当前窗口 02 div窗口
 	 * @type 
 	 */
 	opendocType:ucapHeader.opendocType,
	baseAction:appPath+"BaseAction.action",
	/**
	 * 窗口去除header和footer后，中间的高度
	 * @type Number
	 */
	middleHeight:0,
	/**
	 * win窗口的默认设置
	 */
	win:{
		winImg:"<img src='"+appPath+"uistyle/images/icon/icon_87.gif' align='absmiddle' ></img>&nbsp;",
		winBodyStyle:"background-color:#FFF;padding:10px 14px 0px 14px;"
	},	
	mainLeft:"ucapMainLeft", //包括菜单、模块的DIV
	portalID:"portal_id",
	ucapModuleId:"ucapModule",
	leftArrowheadId:"leftArrowhead",
	ucapViewId:"ucapView",
	portal_info:"portal_info",
	/**
	 * 普通窗口对象
	 * @type 
	 */
	commonWin:null,
	/**
	 * doc 的div 窗口对象
	 * @type 
	 */
	docWin:null,
	userDefineWin:null,
	commonSelectWin:null,
	loginAppJson:"",
	/**
	 * 表单多值分隔符
	 * @type String
	 */
	fvs_sp:','
}

Ext.BLANK_IMAGE_URL =ucapSession.appPath+ 'uistyle/images/s.gif';// 替换图片文件地址为本地


var ucapCommonFun={
	isHead:1,//二级页面head是否无收缩：0收缩,1无收缩
	/**
	 * 自动设置高度
	 */
	autoMenuHeight:function(){
		//try{
			var isHead = ucapCommonFun.isHead;
			var footHeight = parseInt(Ext.getDom("footer").clientHeight)||0;
			var headHeight = parseInt(Ext.getDom("headerBox").clientHeight)||0;
			var clientHeight = Ext.getDoc().dom.body.clientHeight;
			var infoHeight = clientHeight-(isHead?headHeight:0)-footHeight;
			
			ucapSession.middleHeight = infoHeight -10;
			if (Ext.getDom("mainRight"))
					Ext.getDom("mainRight").style.height=(infoHeight-10)+"px";
			if (Ext.getDom("leftArrowhead")){
					Ext.getDom("leftArrowhead").style.height=(infoHeight-10)+"px";
					Ext.getDom("leftArrowhead").style.paddingTop=((infoHeight-10)/2-20)+"px";
			}
			if (Ext.getCmp("ucap_deptTree")){
				Ext.getCmp("ucap_deptTree").setHeight(ucapSession.middleHeight);
			}
			if (Ext.getCmp("ucap_dictTree")){
				Ext.getCmp("ucap_dictTree").setHeight(ucapSession.middleHeight);
			}
			if (Ext.getCmp("ucap_columnsTree")){
				Ext.getCmp("ucap_columnsTree").setHeight(ucapSession.middleHeight);
			}
			if (ucapPortal.portal){
				ucapPortal.portal.setHeight(ucapSession.middleHeight);
			}
			if (Ext.getCmp("ucapMenu_tree")){
				Ext.getCmp("ucapMenu_tree").setHeight(ucapSession.middleHeight);
			}
			var infoDiv = Ext.query("div[id=info]");
			if (infoDiv && infoDiv.length>0){
				var iHeight = infoHeight-(24)*infoDiv.length-37;
				for(var i=0;i<infoDiv.length;i++){
					infoDiv[i].style.height=iHeight+"px";
				}
			}
			infoDiv = Ext.query("div[id=ucap_menuFlex]");
			if (infoDiv && infoDiv.length>0){
				var iHeight = infoHeight-(28)*infoDiv.length-19;
				for(var i=0;i<infoDiv.length;i++){
					infoDiv[i].style.height=iHeight+"px";
				}
			}
			
		//}catch(e){}
	},
	
	refreshParentView:function(){
		//==1 说明是当前窗口 0 新窗口 2 div 都要刷新视图
		if (window.opener && window.opener.ucapCommonFun.ucapCurOpenType!=1) {
			//代表是新窗口打开
			window.opener.view.refresh();
		}
		if (window.parent && window.parent.ucapCommonFun.ucapCurOpenType!=1){
			//代表是div 窗口打开
			if (window.parent.ucapCurOpenDocViewId!="" && typeof window.parent.ucapCurOpenDocViewId!="undefined" ){
				var iframeView=window.parent.Ext.getDom("ifr"+window.parent.ucapCurOpenDocViewId);
				if (iframeView){
					iframeView= iframeView.contentWindow;
					if (iframeView) iframeView.view.refresh();
				} else {
					if(window.parent.view)window.parent.view.refresh();
				}
			} else{
				if(window.parent.view)window.parent.view.refresh();
		    }
			/**
			  * 视图编辑刷新
			  */
			var allView = _UcapForm.handler.allView;
			for(var view in allView){
				var objView = $(view);
				if(objView && objView.tagName.toLowerCase()=="iframe"){
					var ifrWin = objView.contentWindow;
					if(ifrWin && ifrWin.view){
						ifrWin.view.refresh();
					}
				}
			}
		}
	},
	
	/**
	 * 扩展功能前台统一执行方法，通过扩展功能标识及其它URL参数和json格式数据
	 * 
	 * @param {} interactionId 扩展功能表识
	 * 
	 * @param {} json json格式的数据对象
	 * 
	 * @param from 扩展功能执行时来自的地方，其中为0来自表单，为1来自视图,空或她值为其他的
	 */
	executeInteraction:function(interactionId,json,from){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"common","sid":interactionId},
			jsonData:json,
			callback:function(options,success,response){
				//扩展功能的回调函数不在由前台指定，而是直接由后台指定
			
				
				if(null!=response.responseText && response.responseText!=""){
					try{
						var resultJson = Ext.decode(response.responseText);						
						var exResult=ucapCommonFun.dealException(resultJson);
						if(!exResult)return;
						
						var callBackFn = resultJson.callBackFn;
						if(callBackFn && "string"!=callBackFn && callBackFn!=""){
							eval(callBackFn+"(response.responseText);");
							//return;
						}else{
							var msg = resultJson.msg;
							var result = resultJson.result;
							if(null==msg || msg==""){
								if(result=="true"){
									alert("操作成功");
								}else{
									alert("操作失败");
								}
							}else{
								alert(msg);
							}
							
							if("undefined"!=typeof(from)){
								if(from==0){
									window.location = window.location;
									ucapCommonFun.refreshParentView();
								}else if(from==1){
									view.refresh();
								}
							}
						}
					}catch(Exception){
						if(response.responseText.indexOf("true")>=0){
							alert("操作成功");
						}else{
							alert("操作失败");
						}
					}
				}else{
					Ext.Msg.alert("提示","无返回操作结果提示信息！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 根据类型、UNIDS 取得对应的中文名称
	 * @param {} sourceType 来源值
	 * @param {} unids  实际值
	 * @param {} dictUnid 字典的配置UNID
	 */
	getDisplayNames:function(sourceType,unids,dictUnid){
		var url =ucapSession.baseAction;		
		if (typeof dictUnid =="undefined") dictUnid="";
		url+="?unid="+unids+"&sourceType="+sourceType+"&dictUnid="+dictUnid+"&type=getDisplayName&rand="+Math.random();	
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		return conn.responseText;
	},
	/**
	 * 设置视图的宽度
	 * @param divId 还需要减的view宽度 默认要减去 菜单或模块的宽度 即 ucapSession.mainLeft中的宽度
	 * 即不管 divId是否为空，都要减去
	 */
	setViewWidth:function(){
		if (view==null || undefined==view.namePrefix || view.viewBaseInfos==undefined) return;
		var width = document.body.offsetWidth;	
		
		var divId = ucapModule.deductViewDivId;
		
		if (typeof divId !="undefined" && divId!=""){
			var ids = divId.split(",");
			for(var i=0;i<ids.length;i++){
				if (typeof Ext.getDom(ids[i]) !="undefined" && Ext.getDom(ids[i])){
					width = width - Ext.getDom(ids[i]).offsetWidth;
				}
			}
		}
		//下面减去 ucapSession.mainLeft 的宽度
		if("undefined"!=typeof Ext.getDom(ucapSession.mainLeft) && Ext.getDom(ucapSession.mainLeft)!=null){	
			width = width-Ext.getDom(ucapSession.mainLeft).offsetWidth;
			if (Ext.getDom(ucapSession.leftArrowheadId)!=null){
				width = width - Ext.getDom(ucapSession.leftArrowheadId).offsetWidth;
			}
		};	
		var vcDiv = Ext.getDom("viewCategories");
		if("undefined"!=vcDiv && vcDiv!=null){
			width = width-vcDiv.offsetWidth-5;
		}
		for (var i=0;i<view.viewBaseInfos.length;i++){
			var obj= Ext.getCmp(view.namePrefix+i);
			obj.setWidth(width);
		}
	},
	/**
	 * 模块的菜单的点击事件
	 * @param {} id
	 * @param {} type 视图	01  URL	02  JavaScript	04  分类	09
	 * @param {} openType 01 新窗口打开	 02 当前窗口打开	03 iframe方式打开
	 * @param {} title 如果是视图，则为视图名称
	 */
	moduleMenuClk:function(id,type,openType,title){
		type =parseInt(type,10);
		openType =parseInt(openType,10);
		if (type==1){
			this.indexOpen.openView(id,"",title);
		} else if (type==2){
			viewTabs.isInit = false;
			if (id.toLowerCase().indexOf("http://")==-1 ){
				id= ucapSession.appPath +id;
			}
			if (openType=="01" || openType==1){
				//新窗口打开				
				this.indexOpen.openUrl(id);
			} else if (openType=="02" || openType==2 ){	
				//要在当前窗口打开		
				Ext.getDom(ucapSession.portalID).innerHTML="";
				var el = Ext.get(ucapSession.ucapViewId);
				var mgr = el.getUpdater();
				mgr.update({
			        url: id,
			        scripts:true
				});
				Ext.getDom(ucapSession.ucapViewId).style.height=ucapSession.middleHeight+"px";
			} else if (openType=="03" || openType==3 ){
				if (Ext.getDom(ucapSession.portalID)) Ext.getDom(ucapSession.portalID).innerHTML="";
				//以iframe方式打开 如果id中，即URL中，有加上http的前缀，说明不是本系统的
				
				if (Ext.getDom(ucapSession.ucapViewId)){
					var iframeid = "ifram_"+this.getRandomString();
					Ext.getDom(ucapSession.ucapViewId).innerHTML = 
							this.getIframeHtml(id,iframeid,ucapSession.middleHeight);
					Ext.getDom(iframeid).src = id;
				} else {
					//说明是在嵌入的视图中，则改成div弹出
					alert("ok");
				}
			}
		} else if (type==4){
			this.evalJavaScript(id);
		}
	},	
	/**
	 * 执行js脚本 有返回值 true 或 false
	 * @param {} js
	 */
	evalJavaScript:function(js){
		if (typeof js=="undefined" || js=="") return true;
		try{
			 return eval(js);
		}catch(e){return false}
	},
	
	/**
	 * 后台调用过程中发生异常时，前台的统一处理
	 * 
	 * @param {} json 后台返回的json对象
	 */
	dealException:function(json){
		if(null!=json && null!=json.exceptionType){
			if(json.exceptionType=="01"){//说明发生了会话为空的异常了
				if(null!=window.opener){
					if(window.opener)window.opener.location.reload();   
					window.close();
				}else{
					window.location.reload(); 
				}
			}else{
				alert(json.exceptionMsg);//异常直接提示，不做其他处理
			}
			return false;
		}
		return true;
	},
	
	indexOpen:{
		/**
		 * 
		 * @param {} id
		 * @param {} type 1 表示打开模块 2表示打开视图 3表示打开URL 都是以新窗口打开 4表示脚本 9表示打开文档
		 * @param {} openType 打开方式 01 当前页面 02新页面 03以iFrame方式嵌入
		 * 			只对URL起作用
		 * @param isMenu 不为空，说明是从菜单中调用
		 */
		open:function(id,type,openType,isMenu){
			if (type==1){
				this.openModule(id);
			} else if(type==2){
				this.openView(id,isMenu);
			} else if(type==3){
				ucapCommonFun.moduleMenuClk(id,2,openType);
			} else  if (type==4){
				ucapCommonFun.evalJavaScript(id);
			} else  if (type==9){
				this.openDoc(id);
			}
		},
		/**
		 * 打开首页面
		 */
		openMainPage:function(){
			Ext.getDom(ucapSession.ucapViewId).innerHTML="";
			Ext.getDom(ucapSession.portalID).innerHTML="";
			Ext.getDom(ucapSession.ucapModuleId).style.display="none";
			Ext.getDom(ucapSession.leftArrowheadId).style.display="none";
			ucapPortal.init();
		},
		openView:function(id,isMenu,title){				
			if (typeof isMenu !="undefined" && isMenu!=""){
				if (Ext.getDom(ucapSession.ucapModuleId)){
					Ext.getDom(ucapSession.ucapModuleId).innerHTML="";
					Ext.getDom(ucapSession.ucapModuleId).style.display="none";
				}
				if (Ext.getDom(ucapSession.leftArrowheadId)){
					Ext.getDom(ucapSession.leftArrowheadId).style.display="none";
				}				
			}
			if (ucapSession.viewOpenType==1){
				if(typeof title =="undefined") title= id;
				initView(id,ucapSession.ucapViewId,title,true);	
			} else {
				initView(id,ucapSession.ucapViewId);
			}
			//alert("打开视图："+id);
		},
		openUrl:function(id){
			window.open(id);
		},
		openModule:function(id){			
			ucapModule.setModuleHtml(id,ucapSession.ucapModuleId);
			ucapCommonFun.autoMenuHeight();
		},
		/**
		 * 首页上的打开文档(不是流程)代码
		 * @param {} id
		 */
		openDoc:function(id){
			window.open(id);
		}
	},
	/**
	 * 新建流程的函数 没有参数（全部流程）
	 * @openType 打开类型 如果为空，则以系统配置的为主
	 *   0 表示 新窗口，1表示当前窗口 2表示div方式
	 */	
	newFlowDoc:function(openType){
		var par="0";
		if (typeof openType!="undefined" && openType !="") par = par+"~"+openType;
		ucapOpenFlow.openFlowDialog(ucapCommonFun.ucapOpenDoc,par);	
	},
	/**
	 * 根据flowIds进行流程的新建
	 * @openType 打开类型 如果为空，则以系统配置的为主
	 *    0 表示 新窗口，1表示当前窗口 2表示div方式
	 * @param {} flowIds
	 */
	newFlowDocByFlowIds:function(flowIds,openType){
		var par="0";
		if (typeof openType!="undefined" && openType !="") par = par+"~"+openType;
		ucapOpenFlow.openFlowDialogByFlowIds(flowIds,ucapCommonFun.ucapOpenDoc,par);
	},
	/**
	 * 当前打开文档的类型，如果为1，则文档保存时，不进行视图的刷新
	 * @type String
	 */
	ucapCurOpenDocViewId:"",//通过iframe中的视图打开文档时，视图的ID
	ucapCurOpenType:"",
	/**
	 * 打开文档的方法
	 * @param {} url 文档的Url
	 * @param {} docType 0表示新建  1表示是旧文档打开（主要是取默认的方式不同）
	 * 			如果docType有包括 ~字符串，则必须拆分成两个，一个是docType，另一个是 type
	 * @param {} type 打开类型 0 表示 新窗口，1表示当前窗口 2表示div方式
	 *           如果为空，则默认以 界面方案中的配置类型进行打开
	 * @param {} height 如果是div方式，则表示div的高度
	 * @param {} width  如果是div方式，则表示div的宽度
	 */
	ucapOpenDoc:function(url,docType,type,height,width){
		var purl = "";
		if ((typeof url=="undefined") || url=="" ){
			Ext.Msg.alert("提示信息","打开文档的Url不能为空1");
			return;
		}
		if (typeof docType=="undefined"){
			Ext.Msg.alert("提示信息","文档的类型docType不能为空");
			return;
		}
		if (docType=="") docType="0";	
		if ((docType+"").indexOf("~")>-1){
			var ts =(docType+"").split("~");
			docType = ts[0];
			if (typeof type=="undefined" || type==""){
				type = ts[1];//changed by llp 09-06-08 ts.length-1
			}
			if(ts.length>2){
				purl = ts[2];
			}
		}
		docType = parseInt(docType,10);
		if (typeof type =="undefined" || type==""){
			if (docType==0){
				type = ucapSession.newdocType;
			} else {
				type = ucapSession.opendocType;
			}
		}
		var title = docType==0?"文档新建":"文档编辑";
		type = parseInt(type,10);
    	var windoc=window;
    	ucapCommonFun.ucapCurOpenDocViewId="";
    	if(top!=self){
	 		//说明是在iframe中打开
 			windoc = parent;
 			windoc.ucapCurOpenDocViewId=view.viewId;
	 	}
	 	//获取当前url中r的值，即判断打开的文档是否可编辑
	 	var r= ucapCommonFun.getUrlParameter("r");
	 	if (r=="0" && r!=""){
	 		url = url+"r="+r;
	 	}
	 	//add by llp ，以便可以接收外部参数，但在这边必须注意，purl中的参数名称不能和之前url中的参数名称重复
	 	if(null!=purl && purl!=""){
	 		url+=purl;
	 	}
	 	windoc.ucapCommonFun.ucapCurOpenType = type;
		if (type==1){
			//当前窗口 以 iframe 方式打开
			if (url.toLowerCase().indexOf("http:")==-1){
				url =ucapSession.hostPath+url;
			};
			url +="&div=1";
			if (top!=self){
				//说明是嵌入的iframe视图中打开文档，则以div方式打开
				windoc.ucapCommonFun.ucapCurOpenType = 2;
				windoc.ucapCommonFun.ucapOpenDiv(url,height,width,windoc,title);
			} else{
				windoc.ucapCommonFun.moduleMenuClk(url,"02","03");
			}
		} else if (type==2) {
			windoc.ucapCommonFun.ucapOpenDiv(url,height,width,windoc,title);
		} else {
			window.open(url,"","loaction=no,fullscreen=no,status=yes,toolbar=no," +
					"scrollbars=no,menubar=no,resizable=yes,top=0,left=0,width="
					+(screen.availWidth-10)+",height="+(screen.availHeight-30));		
		}		
	},
	/**
	 * 以div的方式打开
	 * @param {} url    iframe的地址
	 * @param {} height  高度
	 * @param {} width   宽度
	 * @param {} windoc 要在那个window中打开
	 * @param {} title  打开的标题
	 */
	ucapOpenDiv:function(url,height,width,windoc,title){
		if(!windoc)windoc=window;
		if(typeof height=="undefined" || height=="") {
			height = windoc.document.body.clientHeight-30;
		}
		if(typeof width=="undefined" || width =="" ){
			width = windoc.document.body.clientWidth-100;
		}
		url = url+"&div=1";
		var iframeId = "_UcapOpenDociFrame";
		//add by jc 20090618 防止同时打开二个三级DIV界面时出现问题
		if($(iframeId)){
			iframeId = "_UcapOpenDociFrame1";
		}
 		var html =' <iframe id="'+iframeId+'" name="_UcapSaveiFrame" ' +
 				' width="100%" height="100%" frameborder="0"  src=""></iframe>';
		windoc.ucapSession.docWin = new windoc.Ext.Window({
				title:ucapSession.win.winImg+title,
		        width:width,
		        closable:true,    //关闭
		        maximizable:true, //最大化
		        modal: true,     
				height:height,
			 	bodyStyle:ucapSession.win.winBodyStyle,
				html:html
			});
		windoc.ucapSession.docWin.show();
		windoc.Ext.getDom(iframeId).src = url;
	},
	/**
	 * 视图按钮相关显示与否的判断
	 * @type 
	 */
	viewButton:{
		/**
		 * 父文档是否为只可编辑，则返回真
		 * @return {}
		 */
		fatherDocIsEdit:function(){
			if (window.parent){
				return window.parent._UcapForm.cfg.isRead==1;
			} else {
				return true;
			}
		}
	},
	buttonFun:{
		/**
		 * 修改用户信息
		 */
		modifyUser:function(unid,deptUnid ){	 
			 window.open(ucapSession.appPath+"sys/jsp/document.jsp?unid="+unid+"&type=03&formId=4A4357091F6399787EA58F85824F6E2F&deptUnid="+deptUnid);
		},
		/**
		 * 切换用户身份 用户身份有 应用系统管理员 部门管理员 或 个人，如果当前用户只是个，则隐藏此操作
		 * 按钮的名称不能改
		 */
		changeUserStatus:function(){
			var html="sys/cfgJsp/portal/selectUserStatus.jsp";
			var button=[{text:"确定",handler:function()
				{ucapButtonFunConfirm.changeUserStatusConfirm();}},{text:"取消",
					handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"切换用户身份",
		        width:210,
		        closable:true,    //关闭
		        modal: true,     
				height:300,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.commonWin.show();
		},		
		/**
		 * 注销
		 */
		loginOut:function(){
			var requestConfig = {
				url:ucapSession.baseAction,
				params:{"type":"loginWriteOff"},
				callback:function(options,success,response){
						if (success){
							var exjson = Ext.util.JSON.decode(response.responseText);	
							var exResult=ucapCommonFun.dealException(exjson);
							if(!exResult)return;
							window.location=ucapSession.appPath+"login.jsp";
						} else {
							Ext.Msg.alert("提示","注销不成功，请重试！");
						}
				}
			}		
			Ext.Ajax.request(requestConfig);
		},
		/**
		 * 切换系统
		 * @param {}type 有值 说明是在 login中调用
		 */
		changeSystem:function(type){			
			if (typeof(type)=="undefined") type ="";
			loginType  =type; //是全局变更
			var html="login/appSelect.jsp";
			var button=[{text:"确定",handler:function()
				{ucapButtonFunConfirm.changeSystemConfirm();}},
				{text:"取消",
					handler:function(){ucapSession.commonWin.close();}}	
			];
			var title="切换应用系统";
			if (type=="style"){
				title="切换风格"	;			
			}
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+title,
		        width:500,
		        closable:true,    //关闭
		        modal: true,     
				height:420,
				autoScroll:true,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.commonWin.show();
		},
			
	//根据界面方案中不同的类型，进行转向
	 gotoIndex:function(scheme){
			var type = scheme.indexType;
			var index = scheme.index;
			if (typeof(type)=="undefined"){
				type="01";
			}
			var iType = parseInt(type,10);
			var	indexJsp="sys/jsp/index.jsp";
			if (iType==1 || iType==2){
				window.location.href =ucapSession.appPath+ indexJsp;		
			}  else if (iType==3){
				//打开URL
				ucapCommonFun.indexOpen.openUrl(index);
			}
		},
		/**
		 * 用户自定义操作
		 */
		userDefine:function(){
			var title="";
			if (ucapSession.userJson.userStatus==3){
				title="个人自定义";
			} else if (ucapSession.userJson.userStatus==2){
				title="部门自定义";
			} else {
				title="应用系统管理员自定义";
			}
			var html="sys/cfgJsp/portal/userDefine.jsp";
			var button=[{text:"关闭",
					handler:function(){ucapSession.userDefineWin.close();}}	
			];
			ucapSession.userDefineWin = new Ext.Window({
				title:ucapSession.win.winImg+title,
		        width:210,
		        closable:true,    //关闭
		        modal: true,     
				height:330,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.userDefineWin.show();
		},
		/**
		 * 切换菜单样式
		 */
		changeMenuStyle:function(){
			var html="sys/cfgJsp/portal/selectMenuType.jsp";
			var button=[{text:"确定",handler:function()
				{ucapButtonFunConfirm.schemeConfirm();}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"切换菜单类型",
		        width:510,
		        closable:true,    //关闭
		        modal: true,     
				height:320,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.commonWin.show();
		},
		/**
		 * 切换导航栏样式
		 */
		changeNavStyle:function(){
			var html="sys/cfgJsp/portal/selectNavType.jsp";			
			var button=[{text:"确定",handler:function()
				{ucapButtonFunConfirm.schemeConfirm();}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"切换导航栏类型",
		        width:210,
		        closable:true,    //关闭
		        modal: true,     
				height:200,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.commonWin.show();
		},
		/**
		 * 更改导航栏内容
		 */
		setNavContent:function(){
			var html="sys/cfgJsp/nav/nav.jsp";
			var cut="";
			if (ucapMenu.navigation && ucapMenu.navigation.navigation
			    &&  ucapMenu.navigation.navigation.shortcutCondition ) {
				cut = ucapMenu.navigation.navigation.shortcutCondition;
			}			
			html+="?cut="+cut;
			var button=[{text:"确定",handler:function()
				{ucapButtonFunConfirm.navConfirm();}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"导航栏内容定制",
		        width:410,
		        closable:true,    //关闭
		        modal: true,     
				height:240,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.commonWin.show();
		},
		/**
		 * 设置快捷方式
		 */
		setCuts:function(){
			var html="sys/cfgJsp/cut/cut.jsp";
			var button=[
					{text:"关闭",
					handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"快捷方式定制",
		        width:310,
		        closable:true,    //关闭
		        modal: true,     
				height:240,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.commonWin.show();
		},
		/**
		 * 界面方案设置
		 */
		setScheme:function(){
			var html="sys/cfgJsp/portal/setScheme.jsp";
			var height =230;
			if (ucapSession.userJson.userStatus!=3){
				html = "sys/cfgJsp/unit/setScheme.jsp";
				height = 320;
			}
			var button=[{text:"确定",handler:function()
				{ucapButtonFunConfirm.schemeConfirm();}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"界面方案设置",
		        width:500,
		        closable:true,    //关闭
		        modal: true,     
				height:height,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.commonWin.show();
		},
		/**
		 * 恢复默认
		 */
		recover:function(){
			if (ucapSession.userJson.userStatus==1){
				Ext.Msg.alert("提示","你当前身份是应用系统管理员，不能进行恢复操作！")
				return;
			}
			var html="sys/cfgJsp/portal/recover.jsp";
			var button=[{text:"确定",handler:function()
				{ucapButtonFunConfirm.recoverConfirm();}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"恢复默认设置",
		        width:210,
		        closable:true,    //关闭
		        modal: true,     
				height:290,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.commonWin.show();
		},
		/**
		 * 切换布局
		 */
		changeLayout:function(){
			var html="sys/cfgJsp/portal/selectLayout.jsp";
			var button=[{text:"确定",handler:function()
				{ucapButtonFunConfirm.changeLayoutConfirm();}},
				{text:"取消",
					handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"切换布局",
		        width:550,
		        closable:true,    //关闭
		        modal: true,     
				height:430,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
			ucapSession.commonWin.show();
		},		
		setMainPage:function(){
			return ' onclick="this.style.behavior=\'url(#default#homepage)\';' +
										'this.setHomePage(\''+window.location+'\');" ';
		},
		analogDept:function(){
			alert("analogDept");
		},
		/**
		 * 加为收藏
		 */
		favorites:function(){
			window.external.addFavorite( window.location.href,window.title);	
		}
	},
	/**
	 * 绑定表单的属性及赋值
	 * @param {} json
	 * @param {} applyIf
	 * @return {Boolean}
	 */
	bindForm:function(json,applyIf){
		//json格式:{字段名称:{字段属性:属性值},字段名称:{字段属性:属性值}……}
		//json = "{'input_select':{'temp':'tempvalue','value':'0','DictMap':{'key':'字典名',value:'值'}}}";
		//alert(Ext.encode(json));
		if(Ext.isEmpty(json))return false;
		if(Ext.type(json)=='string'){			
			json = json.replace(/\n|\r/g," ");
			json = Ext.util.JSON.decode(json);
		}
		if(Ext.type(json)=='object'){
			var _v = "";
			var _domClick=function(path,o){
				try{
					path = path.replace(/(,)$/,"");
					var objs = Ext.DomQuery.select(path,o);
					Ext.each(objs,function(obj){
					//	alert(Ext.getDom("fitem_default_value").getAttribute("sourceType"));
						obj.click();
					});
				}catch(e){
					alert(e.description);
				}
			};
			var getPDiv = function(ooo){
				var fg = false;
				if(ooo){
					var op = ooo.parentNode;
					if(op && op.tagName.toLowerCase()=="div"){
						fg = op;
					}else{
						fg = getPDiv(op);
					}
				}
				return fg;
			};
			for(fkey in json){
				//alert(fkey);
				var o = Ext.getDom(fkey)||Ext.query("[id="+fkey+"]")||Ext.query("#"+fkey+"");
 				if (typeof o=="undefined" || o=="" || o==null) continue;
  				if(o && json[fkey] && Ext.type(json[fkey])=='object'){
					try{
						//事件
						var bindEvs = function(){
							var itemEvs = json[fkey]["itemEvents"];
							if(itemEvs)
							for(var k=0;k<itemEvs.length;k++){
								var iev = itemEvs[k];
								//var ttt = "on"+iev["EType"];
								//Ext.apply(obe,{ttt:function(){alert();}});
								var allobj = Ext.query('[name='+fkey+'],[id='+fkey+']');
								for(var i=0;i<allobj.length;i++){
									Ext.get(allobj[i]).on(iev["eType"],function(){var obe = this;eval(iev["eValue"]+"(obe)");},allobj[i]);
								}
								
							}
						};
						bindEvs();
						//属性赋值
						if(Ext.type(o)!="array"){
							if(!applyIf)Ext.applyIf(o,json[fkey]);
							else Ext.apply(o,json[fkey]);
						}else{
							o = o[0];
						}
						//选择框、赋值
						//alert(Ext.encode(json[fkey]['value']));
						//_v = json[fkey]['value'];
						_v = json[fkey]['value'];
						//_v = "01"+ucapSession.fvs_sp+"02";
						switch(o.tagName.toLowerCase()){
							case 'input':{
								switch(o.getAttribute("type").toLowerCase()){
									case 'checkbox':{
										var rdv = _v;
										var path="";
										if(Ext.type(rdv)=="array"){
											//三级界面用到的数组值
											for (var i = 0; i < rdv.length; i++) {
												var v = _v[i]["value"]||"";
												path += '[id='+fkey+'][value="'+v+'"],';
											}
										}else if(Ext.type(rdv)=="string"){
											//二级界面用到的string值
											if(_v.indexOf(ucapSession.fvs_sp)>-1){
												var ay_v = _v.split(ucapSession.fvs_sp);
												Ext.each(ay_v,function(v){
													path += '[id='+fkey+'][value="'+v+'"],';
												});
											}else{
												path = '[id='+fkey+'][value="'+_v+'"],';
											}
										}
										if(path)_domClick(path,getPDiv(o));
										break;
									}
									case 'radio':{
										if(_v && _v[0] && Ext.type(_v)!="string")
											_v = _v[0]["value"]||"";
										var path='[id='+fkey+'][value="'+_v+'"],';
										_domClick(path,getPDiv(o));
										break;
									}
									default	:{
										var cnObj = Ext.getDom(fkey+"_Cn_");
										if(_v && _v[0] && Ext.type(_v)!="string"){
											
											if(cnObj)cnObj.value = "";
											Ext.each(_v,function(v,n){
												var vt = v["text"];
												var vv = v["value"];
												if(cnObj){
													if(n==0){
														_v = (vv==undefined?vt:vv);
														cnObj.value = vt;
													}else{
														cnObj.value += ucapSession.fvs_sp + vt;
														_v += ucapSession.fvs_sp +  (vv==undefined?vt:vv);
													}
												}else{
													if(n==0){
														_v = (vt==undefined?vv:vt);
													}else{
														_v += ucapSession.fvs_sp + (vt==undefined?vv:vt);
													}
												}
											});
										}
										o.value = _v;	
									}
								}
								break;
							}
							case 'select':{
								if(_v && _v[0] && Ext.type(_v)!="string")
									_v = _v[0]["value"]||_v;
								var path='option[value="'+_v+'"]';
								var objs = Ext.DomQuery.select(path,o);
								Ext.each(objs,function(obj){
									obj.selected=true;
								});
								break;
							}
							default:{
								//span/textarea/button
								if(_v && _v[0] && Ext.type(_v)!="string"){
									var result = _v[0].text;
									for (var n = 1; n < _v.length; n++) {
										result +=ucapSession.fvs_sp+ _v[n].text;
									}
									_v = result;//显示值取text、保存值取value
								}
								if(json && json[fkey] && json[fkey].sourceType=="09"){
									_v = '<a class="red" onclick="window.open(\''+_v+'\');" target="_blank" style="cursor:hand;" title="单击下载文件">单击下载</a>';
								}
								if(o.innerHTML==undefined)o.innerText = _v;
								else o.innerHTML = _v;
								break;
							}
						}
						var isRead = json[fkey]["readOnly"];
						//isRead = true;
						if(isRead){
							try{
								var allobj = Ext.query('[name='+fkey+'],[id='+fkey+']');
								for(var i=0;i<allobj.length;i++){
									allobj[i].setAttribute("disabled",true);
								}
							}catch(e){}
							o.setAttribute("readOnly",true);
						}
					}catch(e){}
				}
			}
		}
	},
	/**
	 * 获取指定的对象集的JSON
	 * @param {} form 范围内 div
	 * @param {} root 
	 * @param {} type 
	 * @return {Boolean}
	 */
	getFormJSon:function(form,root,type){
		var formDom = Ext.getDom(form);
		if(!formDom)return false;
		form ="div#"+ form+" input[type!=button],select,textarea";
		var result = [];
		if(Ext.type(form)=='string'){
			/*
			var _form = Ext.getDom(form);
			
			if(_form || Ext.type(_form)=='element'){
				//form = _form;
			}else{
				_form = Ext.DomQuery.select(form);
				if(_form && _form.length>0)form=_form;
				else return false;
			}
			*/
			//以上注释换成下面这句
			form = Ext.DomQuery.select(form);
			Ext.each(form,function(obj,n){
				result[n] = ucapCommonFun.getObjValueJson(obj,"",formDom);
			});		
		}
		//alert(Ext.util.JSON.encode(result));
		var rjson = {};
		for (var k = 0; k < result.length; k++) {
			var re= result[k];
			rjson[re["k"]]=re["v"];
		}
		//alert(Ext.util.JSON.encode(rjson));
		return rjson;
	},
	/**
	 * 
	 * @param {} obj 需要取值的对象
	 * @param {} v 表单如果值为空,则用v作默认值
	 * @param {} formDom 范围,用于check,radio等
	 * @return {}
	 */
	getObjValueJson : function(obj,v,formDom){
		//进行selected的方法的绑定
		var s = {};
		if(!Ext.DomQuery.pseudos['selected']);
		Ext.DomQuery.pseudos['selected'] = function(c){
			var r = [];
			for(var i = 0, l = c.length; i < l; i++){
				if(c[i].selected == true){
					r[r.length] = c[i];
				}
			}
			return r;
		};
		formDom=(!formDom)?document:formDom.dom;
		obj = Ext.getDom(obj);
		if(!obj)return s;
		var name = obj.getAttribute("id")||obj.getAttribute("name");
		var value="";
		//var type = "";
		//result[name]=obj.value;
		switch(obj.tagName.toLowerCase()){
			case 'input':{
				switch(obj.getAttribute("type").toLowerCase()){
					case 'checkbox':{
						var path='input:checked[id='+name+']';
						var objs = Ext.DomQuery.select(path,formDom);
						value="";
						Ext.each(objs,function(obj,n){
							if(n!=0)value += ucapSession.fvs_sp;
							value += obj.value;
						});
						break;
					}
					case 'radio':{
						var path='input:checked[id='+name+']';
						var objs = Ext.DomQuery.select(path,formDom);
						if(objs && objs.length>0)value = objs[0].value;
						break;
					}
					default	:{
						var eeObj = Ext.fly("eWebEditor_"+obj.id);
						if(eeObj){
							try{
								eval("obj.value = eWebEditor_"+obj.id+".getHTML()");
							}catch(e){
								//alert("获取文本编辑器时出错!");
							}
						}
						value=obj.value;
					}
				}
				break;
			}
			case 'select':{
				var path='option:selected';
				var objs = Ext.query(path,obj);
				if(objs && objs.length>0) value = objs[0].value;
				break;
			}
			case 'span':{
				value=obj.innerHTML;
				break;
			}
			case 'div':{
				value=obj.innerHTML;
				break;
			}
			default:
				value=obj.value;
		}
		s["k"]=name;
		s["v"]=v||value;
		//s["t"]=type;
		return s;
	},
	/**
	 * 根据json对象对表单中的对象进行设置值
	 * @param {} json
	 * @param divID
	 */
	setFormValue:function(json,divId){
		var jsonStr="";
		for(fkey in json){
			var v=json[fkey];
			if (typeof v =="string"){
				 v = v.replace(/'/g,"\\'").replace(/\\/g,"/");
			}else if(v==null || v==undefined){
				v ="";
			}
			if (jsonStr==""){
				jsonStr =fkey+":{value:'"+v+"'}";
			} else {
				jsonStr +=","+fkey+":{value:'"+v+"'}";
			}
		}
		jsonStr = "{"+jsonStr+"}";
		this.bindForm(jsonStr,divId);
		
	},
	getJsonValue:function(field,value){
		var json ="";
		value[0] +="";
		json +=field[0]+":{value:'"+value[0].replace(/'/g,"\\'")+"'}";
		for(var i=1;i<field.length;i++){
			if (typeof(value[i])!="undefined")
				value[i] +="";
				json +=","+field[i]+":{value:'"+value[i].replace(/'/g,"\\'")+"'}";
		}
		return json;
	},
	 selectTag:function(showContent,selfObj){ 
		// 操作标签 
		var tag = Ext.getDom("tableCustomMenu").getElementsByTagName("li"); 
		var taglength = tag.length; 
		for(var i=0; i<taglength; i++){ 
			tag[i].className = ""; 
		} 
		selfObj.className = "CustomMenuHover"; 
		// 操作内容 
		for(var i=0;i<taglength; i++){ 
			Ext.getDom("tagContent"+i).style.display = "none"; 
		} 
		Ext.getDom(showContent).style.display = "block"; 
	},
	/**
	 * 增加下垃项的值
	 * @param {} oSel
	 * @param {} value
	 * @param {} text
	 */
	addOption:function( oSel, value, text ){
		if( oSel == null ){
			return;
		}
		oSel.options.add(new Option(text,value)) ; 
	},
	/**
	 * 对list中的元素进行上下移动
	 * 
	 * @param {} oSel
	 * 
	 * @param {} option
	 */
	moveOption:function(oSel,index){
		var result = false;
		if(null==oSel.options || oSel.options.length<1){
			return result;
		}
		for(var i=0;i<oSel.options.length;i++){
			var option = oSel.options[i];
			if(option.selected){
				if(index<0 && (i+index)<0)return result;
				if(index>0 && (i+index)>(oSel.options.length-1))return result;
				var v = oSel.options[i].value;
				var it = oSel.options[i].innerText;
				oSel.options[i].value = oSel.options[i+index].value;
				oSel.options[i].innerText = oSel.options[i+index].innerText;
				oSel.options[i+index].value = v;
				oSel.options[i+index].innerText = it;
				oSel.options[i+index].selected=true;
				
				result = true;
				break;
			}
		}
		return result;
	},
	
	/**
	 * 获取url参数如index.htm?id=1  返回1
	 */
	getUrlParameter:function(name){
		var params=location.search.slice(1).split('&');
			for(var i=0;i<params.length;i++){
			var temp=params[i].split("=");
			if(temp[0]==name ){
				return temp[1];
			}
		}
		return "";
	},
	/**
	 * 获取父文档url参数中的值如index.htm?id=1  返回1
	 * @param {} name
	 * @return {String}
	 */
	 getOpenerUrlParameter:function(name){
		if (!this.haveOpener()) return "";
	 	var params=window.opener.location.search.slice(1).split('&');
		for(var i=0;i<params.length;i++){
			var temp=params[i].split("=");
			if(temp[0]==name ){
				return temp[1];
			}
		}
		return "";
	},
	
	/**
	 * 在ifame中获取父窗口的参数
	 * @param {} name 参数名称
	 * @return {String} 参数值
	 */
	 getParentUrlParameter:function(name){
	 	var params=window.parent.location.search.slice(1).split('&');
		for(var i=0;i<params.length;i++){
			var temp=params[i].split("=");
			if(temp[0]==name ){
				return temp[1];
			}
		}
		return "";
	},
	
	/**
	 * 判断当前窗口是否有父文档
	 */
	haveOpener:function(){
		if (!window.opener) return false;
		if(typeof (window.opener.location+"")=="undefined") return false;
		return true;
	},
	/**
	 * 用于AJAX的提交
	 * 根据当前的时间，计算不重复的字符串作为随机
	 * 返回值：随机数 = 小时 + 分钟 + 秒钟  
	 */
	getRandomString:function(){
		var vDate = new Date();
		return(vDate.getHours().toString() + vDate.getMinutes().toString() + vDate.getSeconds().toString());
	},
	/**
	 * iframe设置
	 * @param {} id iframe的ID
	 * @param {} url
	 * @return {}
	 */
	getIframeHtml:function(url,id,height){
		if (typeof height=="undefined") height="600";
		return '<iframe id="'+id+'" name="'+id+'" ' +
				' width="100%" height="'+height+'" frameborder="0" src="'+url+'"></iframe>';
	},
	/**
	 * iframe
	 * @param {} id iframe
	 * @param {} url
	 * @return {}
	 */
	getSelfIframeHtml:function(url,id,height){
		if (typeof height=="undefined") height="100%";
		var js =' onload="ucapCommonFun.iframeFitHeight(this)" ';
		return '<iframe id="'+id+'" name="'+id+'" ' + js+
				' width="100%" height="'+height+'" frameborder="0" src="'+url+'"></iframe>';
	},
	iframeFitHeight:function(oIframe) 
	{//Iframe窗口自适应高度 兼容IE6.0 FF2.0以上 
	    try 
	    { 
	        var oWin = oIframe.name ? window.frames[oIframe.name] : oIframe.contentWindow; 
	        var height = oWin.document.body.scrollHeight;
	        var width = oWin.document.body.scrollWidth;
	        if (width<600){
	        	width = 600;
	        	oIframe.style.width = width + "px"; 
	        }
	        if (height<500) height=500;
	        oIframe.style.height = height + "px"; 	  
	       	
	    } 
	    catch(e){} 
	},
	
	/**
	 * 根据视图标识及文档标识获取相应的提示信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} unid 文档标识
	 * 
	 */
	getViewTip:function(viewId,unid){	
		var url =ucapSession.baseAction;
		url+="?viewId="+viewId+"&type=viewTip&unid="+unid+"&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		if(null==conn.responseText || conn.responseText=="")return "";
		var json = Ext.util.JSON.decode(conn.responseText);	
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		var jsonArr = json.items;
		if (typeof jsonArr =="undefined") return "";	
		var qhtml = ucapCommonFun.getQHtml(json);
		
		return qhtml;
	},
	/**
	 * 通过把json数据转化成相应的html
	 * @param {} json
	 */
	getQHtml:function(json){
		var qhtml = "<table class='titleTipTb'>";
		var jsonArr = json.items;	
		for(var i=0;i<jsonArr.length;i++){
			qhtml+="<tr>";
			qhtml+="<td class='titleTipTitleTd' >"+jsonArr[i].title+":</td>";
			qhtml+="<td class='titleTipVTd'>"+jsonArr[i].value+"</td>";//支持图片，如<img src="/ucap/...jpg"/>
			qhtml+="</tr>";
		}
		qhtml+="</table>";
		
		return qhtml;
	}
}
/**
 * 按钮确认后执行的操作，均为私有方法 private，不能直接调用
 */
var ucapButtonFunConfirm={
	/**
	 * 切换用户身份后的操作
	 */
	changeUserStatusConfirm:function(){
		var json = ucapCommonFun.getFormJSon("userDialogHtml");
		if (json.type=="2" && json.dept==""){
			Ext.Msg.alert("提示","以部门管理员的身份登录，必须选择一个部门！");
			return;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"switchUserStatus","userType":json.type,"deptUnid":json.dept},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					window.location.reload();
				} else {
					Ext.Msg.alert("提示","切换用户身份不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 切换系统后的操作
	 * private
	 */
	changeSystemConfirm:function(){
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		if (json.appList==""){
			for (var i=0;i<ucapSession.loginAppJson.appList.length;i++){
				if (ucapSession.loginAppJson.lastApp==ucapSession.loginAppJson.appList[i].unid){
					json.appList = i;
					break;
				}
			}
		}
		var requestConfig = {
			url:"login.action",
			params:{"type":"afterChoose","styleUnid":ucapSession.loginAppJson.styleList[json.appStyle].unid,
					"isDefault":json.defaultOption,"schemeUnid":ucapSession.loginAppJson.scheme[json.appList].unid},
			jsonData:ucapSession.loginAppJson.appList[json.appList],
			callback:function(options,success,response){
				if (success){
					var jsonException = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(jsonException);
					if(!exResult)return;
					ucapCommonFun.buttonFun.gotoIndex(ucapSession.loginAppJson.scheme[json.appList]);
				}
			}
		}
		Ext.Ajax.request(requestConfig);	
		ucapSession.commonWin.hide();
	},		
	/**
	 * 界面方案相关的设置
	 */
	schemeConfirm:function(){
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"setScheme"},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					window.location.reload();
				} else {
					Ext.Msg.alert("提示","自定义设置不成功，请重新设置！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * private 切换布局，按确定后执行的方法
	 */
	changeLayoutConfirm:function(){
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"changeLayout",
					"portalId":ucapPortal.ucapPortalObj.unid},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					ucapPortal.init();
					ucapSession.commonWin.close();
					//window.location.reload();
				} else {
					Ext.Msg.alert("提示","切换布局不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	recoverConfirm:function(){
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		if (json.recover==""){
			Ext.Msg.alert("提示","请选一项进行恢复设置！");
			return;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"recover","recoverType":json.recover,"fvs_sp":ucapSession.fvs_sp},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					window.location.reload();
				} else {
					Ext.Msg.alert("提示","恢复不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	navConfirm:function(){
		var json = ucapCommonFun.getFormJSon("dialogNavHtml");
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"nav",act:"save"},
			jsonData:json,
			callback:function(options,success,response){
				
				var exjson = Ext.util.JSON.decode(response.responseText);	
				var exResult=ucapCommonFun.dealException(exjson);
				if(!exResult)return;
					
				if (success && response.responseText=="true"){					
					ucapMenu.initNavigation();
					ucapSession.commonWin.close();
				} else {
					Ext.Msg.alert("提示","导航栏设置不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}
function $F(id){
	return $(id).value;
}
function $(id){
	return Ext.getDom(id);
}
/**
 * 取字段的值，允许多张表单的取值
 * @param {} fileName
 * @return {}
 */
function $V(fileName){
	try{
		return _UcapForm.tool.getFormValue(fileName,true);
	}catch(e){return ""};	
}
function loadfile(_sUrl, filetype){
	if(!isjscssfile(_sUrl,filetype)){
		var filename = "http://" + location.host + appPath + _sUrl;
		if (filetype=="js"){ //判断文件类型 
		  var fileref=document.createElement('script');//创建标签 
		  fileref.setAttribute("type","text/javascript");//定义属性type的值为text/javascript 
		  fileref.setAttribute("src", filename);//文件的地址 
		} 
		else if (filetype=="css"){ //判断文件类型 
		  var fileref=document.createElement("link");
		  fileref.setAttribute("rel", "stylesheet");
		  fileref.setAttribute("type", "text/css");  
		  fileref.setAttribute("href", filename); 
		} 
		if (typeof fileref!="undefined") 
		  document.getElementsByTagName("head")[0].appendChild(fileref);
	}
}
function isjscssfile(_sUrl, filetype){
	var filename = _sUrl;
	var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" ;//得到文件类型使用的相应标签名
	var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" ;//得到属性名
	//得到所有的用来连接外部文件的标签
	var allsuspects=document.getElementsByTagName(targetelement);
	for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
		return true;
	}
	return false;
}/**
 * 菜单定制 模块定制方法
 * @author yjy
 */
Ext.namespace('ucapMenuConfig'); 

var ucapMenuConfig={
	/**
	 * 1表示是菜单定制 2表示是模块定制
	 * @type Number
	 */
	type:1,
	/**
	 * html类型 1表示菜单项 2表示模块根 3表示模块的项 4表示菜单的根
	 * @type Number
	 */
	htmlType:1,
	title:"",
	leftWidth:185,
	displayName:"",
	saveNewImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_103.gif" +'"/>',
	saveImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_29.gif" +'"/>',
	closeImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_102.gif" +'"/>',

	rootUnid:"",   //根节点UNID
	treeJson:[],      //树的来源值
	oldJson:[],  //旧的json值
	html:"",
	tree:null,  //当前树的对象
	root:null,  //根节点的对象
	newRootId:"_ucapMenuNew",
	height:500,
	saveFlag:false, //当前菜单是否有更改过的标志，主要是用来刷新父页面
	isNewFlag:false, //判断是否为新增状态，在保存后，此值设置为false,新建时设置为true
	preHtml:"", //前一步的HTML，避免html重复加载
	cutNode:null,  //剪切的节点对象
	win:"",
	/**
	 * 初始化相关变量值
	 */
	initValue:function(){
		this.oldJson = null;
		this.preHtml ="";
		this.tree = null;
		this.treeJson=[];
	},
	/**
	 * 打开菜单定制对话框 public
	 * @param isNew 如果为真，说明是要新建一个菜单
	 * @param isNotInitWin 是否不用初始化窗口，为空默认为需要
	 */
	openMenuConfig:function(isNew,isNotInitWin){
	 //	isNew  = true;
		if (typeof(isNotInitWin)=="undefined") isNotInitWin  = false;
		
		this.initValue();
		if (!isNew || typeof(isNew)=="undefined"){
			this.isNewFlag = false;
		} else {
			this.isNewFlag = isNew;
		}
		this.type=1;
		this.title="系统"; 
		this.displayName="应用系统";
		if (!isNotInitWin) ucapMenuConfig.initWinBox();
		//装载菜单对象
		this.createMenuTree();
	},
	/**
	 * 视图上的打开文档
	 * @param {} moduleUnid
	 */
	openModeuleByView:function(moduleUnid){
		this.openModuleConfig(moduleUnid);
	},
	/**
	 * 打开模块定制对话框 public
	 * @param moduleUnid 如果为空，说明是要新建一个菜单
	 * @param isNotInitWin 是否不用初始化窗口，为空默认为需要
	 */
	openModuleConfig:function(moduleUnid,isNotInitWin){
		var isNew = false;
		if (typeof moduleUnid =="undefined" || moduleUnid=="") {
			moduleUnid="";
			isNew =true;
		}
		if (typeof isNotInitWin =="undefined") isNotInitWin ="";
		this.initValue();
		this.isNewFlag = isNew;
	    this.html="sys/cfgJsp/menuModule/moduleRoot.jsp";
		this.type=2;
		this.title="模块"; 
		if (this.isNewFlag){
			this.rootUnid = this.newRootId;
			this.displayName = "新建模块";
		} else {
			this.createModuleTree(moduleUnid);
		}
		if (isNotInitWin=="")  this.initWinBox();
		this.createTree();
	},
	/**
	 * 生成树型菜单
	 */
	createMenuTree:function(){
		if (this.isNewFlag){
			//说明是新建菜单		
			ucapMenuConfig.rootUnid = this.newRootId;	
			ucapMenuConfig.createTree();
			return;
		}
		var menuActionParams={type:"menu",act:"getAllMenu",menuType:"tree",edit:"1"};
		var requestConfig = {
			url:ucapSession.baseAction,
			params:menuActionParams,
			callback:function(options,success,response){
				
				if (response.responseText==""){
					ucapMenuConfig.isNewFlag = true;
					ucapMenuConfig.rootUnid = ucapMenuConfig.newRootId;	
					ucapMenuConfig.createTree();
					return;
				} else	if (success){
					var json = Ext.util.JSON.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					if (typeof json.uiMenu == "undefined"){
						ucapMenuConfig.treeJson =[];
					} else{
						ucapMenuConfig.treeJson = json.uiMenu;
					}
					ucapMenuConfig.rootUnid = json.unid;
					ucapMenuConfig.displayName = json.name;
					ucapMenuConfig.createTree();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 生成模块菜单
	 */
	createModuleTree:function(moduleUnid){
		var url =ucapSession.baseAction;
		url+="?type=module&act=getModuleMenu&moduleUnid="+moduleUnid+
				"&random="+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);			
		var result = conn.responseText;
		if (result.indexOf("error")>-1){
			Ext.Msg.alert("提示","从后台获取模块内容时出错，模块的ID为"+moduleUnid);
			return "";
		}
		var json = Ext.decode(result);
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		this.displayName = json.displayName;
		this.moduleUnid = json.unid;  	
		this.rootUnid = this.moduleUnid;
		if (typeof json.uiModule =="undefined"){
			this.treeJson=[];
		} else {
			this.treeJson = json.uiModule;
		}
		//ucapModule.json = this.treeJson;
		//ucapModule.allJson.unid =this.moduleUnid;
		//ucapModule.displayName = this.displayName;
	},
	
	/**
	 * private
	 */
    initWinBox:function(){   
     	var buttonItems=[
	  		//{text: '复制',id:"copy", handler: onItemClick},
	      //  {text: '剪切',id:"cut", handler: onItemClick},
	      //  {text: '粘贴',id:"paste",disabled:true, handler: onItemClick},
	      //  {text: '移动',id:"move", handler: onItemClick},
	        {text: '重命名',id:"menuFileRename",handler:onItemClick},'-',
	        {text: '删除', id:"menuFileDelete",handler: onItemClick}
	  		];
		var toolbar=[
	    	{text: '文件',menu :{items: [{text: '新建',id:"menuFileNew", handler: onItemClick},'-',
	                        {text: '关闭',id:"menuFileClose", handler: onItemClick}]}},
	        {text: '编辑', menu :{items: buttonItems}},
	        {text: '查看',menu :{items: [{text: '展开',id:"menuExpand", handler: onItemClick},
	        	{text: '折叠',id:"menuCollapse", handler: onItemClick},
	        	{text: '全部展开',id:"menuExpandAll", handler: onItemClick},
	        	{text: '全部折叠',id:"menuCollapseAll", handler: onItemClick}
	        	]}},
	          '-',
	         {text: '新建',id:"menuNew", handler: onItemClick},
	         {text: '删除', id:"menuDelete",handler: onItemClick},
	         {text:'恢复默认',id:"menuRecover",handler:onItemClick},
	         {text:'变更生效',id:"menuAppChange",handler:onItemClick},
	         '-'
	      ];
    	ucapMenuConfig.win = new Ext.Window({
            title: ucapSession.win.winImg+this.title+'定制窗口',
            closable:true,
            width:700,
            height:this.height,
            modal: true, 
            bodyStyle:ucapSession.win.winBodyStyle,
            tbar:toolbar,
            plain:true,
            layout: 'border',
            items:[
            	{title:'<div id="menuConfigTitle"></div>',
	             region:'west',	            
	             html:'<div id="leftTree">正在加载菜单，请稍等......</div>',
	             width:this.leftWidth,
	             autoScroll:true,
	             collapsible:true, 
	             split: true},
	            {
	             id:"centerId",
	             region:"center",
	             html:'<div id="ucapCenter"></div>',
	          //   bodyStyle:ucapSession.win.winBodyStyle,
//	             autoLoad:{url:ucapSession.appPath+this.html,scripts:true,nocache: true},
	             buttonAlign:"right",
	             tbar:['->',
	             	{text:this.saveNewImg+"保存并新增下一下",handler:function(){
	             				ucapMenuConfig.save("",1)} },
	             	{text:this.saveImg+"保存",id:"menuSave",handler:function(){
	             				ucapMenuConfig.save()} },
	             	{text:this.closeImg+"关闭",id:"menuClose",handler: onItemClick}
	             	]
	            }          
            ]
        });
        ucapMenuConfig.win.show();  
        var bar = ucapMenuConfig.win.getTopToolbar();
        bar.addField(
        	new Ext.form.Checkbox({name:'saveInfo',fieldLabel:'1',
        	   boxLabel:'保存成功时有提示',checked:true})        		
        );
     	if (ucapSession.userJson.userStatus==1){
     		Ext.getCmp("menuRecover").setDisabled(true);
     	}     	
     	//注册窗口的关闭事件
     	ucapMenuConfig.win.on("beforeclose",function(){
     		try{
	     		if (ucapMenuConfig.saveFlag && ucapSession.userJson.userStatus!=1){
	     			//如果是系统管理员，则不提示
	      			if (ucapMenuConfig.type ==1){
	     				ucapMenu.init();	
	     			} else {
	     				//alert(ucapModule.allJson.unid);
	     				//alert(ucapSession.ucapModuleId);
	     				ucapModule.setModuleHtml(ucapModule.moduleUnid,ucapSession.ucapModuleId);
	     			}
	     			ucapMenuConfig.saveFlag = false;
	     		//	Ext.Msg.alert("提示信息","当前的设置有更改，你必须重新加载，才能使设置生效！");	
	     		}
     		} catch(e){};
     	});
     	
    },
	/**
	 * private
	 */
	createTree:function(){
		this.preHtml = "";
     	this.tree = null;
    	this.htmlType="";
		var title=this.title+"菜单定制";
		this.setWinTitle(title);
	 	Ext.DomHelper.applyStyles(Ext.get("leftTree"),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom("leftTree").innerHTML="";
	 	var root;
	 	if (typeof(this.treeJson)!="undefined" ){
		 	root=new Ext.tree.AsyncTreeNode({
				expanded: true,		
				id:this.rootUnid,
				text:this.displayName,
				children: this.treeJson 
			});	
	 	} else {
	 		root=new Ext.tree.AsyncTreeNode({
				expanded: true,		
				id:this.rootUnid,
				leaf:true,
				text:this.displayName
			});	
	 	}
		var tree=new Ext.tree.TreePanel({
			renderTo:"leftTree",
			root:root,
			animate:true,
			rootVisible:true,
			enableDD: true, //允许拖放
			autoScroll:true,
			 containerScroll: true,
			//width:this.leftWidth-5,
			height:ucapMenuConfig.height-92,
			loader: new Ext.tree.TreeLoader({
				dataUrl:""
			})
		});		
		tree.on("click",function(){
			ucapMenuConfig.isNewFlag = false;
			ucapMenuConfig.loadHtml();			
		});
		tree.addListener('movenode', ucapMenuConfig.handleMoveNode); 
		
		tree.on('contextmenu', menuShow);
        function menuShow ( node )
          {
          	node.select();//让右击是选中当前节点     
          	ucapMenuConfig.setButtonState(); 
            treeRightMenu.show(node.ui.getAnchor());
                               
         };
        var treeRightMenu = new Ext.menu.Menu({ 
             items: [ 
	             { 	 id:'menuRightNew',
	                 text: '新建',
	                 icon:"",
	                 handler:onItemClick 
	             },                 
	             { 	 id:'menuRightDelete',
	                 text: '删除',
	                 icon:"",
	                 handler:onItemClick 
	             },/*{
	             	 id:"menuCut",
	                 text: "剪切", 
	                 icon: "",
	                 handler:onItemClick
	              },{
	             	 id:"menuPaste",
	                 text: "粘贴", 
	                 disabled:true,
	                 icon: "",
	                 handler:onItemClick
	              },*/{
	                 text: "重命名", 
	                 icon: "",
	                 handler:function(){onItemClick("menuRename")}
	              }
             ]
         });             
		
		
		  //树形节点上的移动
       // tree.on("moveNode",ucapMenuConfig.handleMoveNode);
         // 添加 树的右键菜单
       // tree.on('contextMenu', menuShow);
               
		this.tree  =tree;
		root.select();
		this.root = root;		
		this.loadHtml();
	},
	/**
	 * @param isNotLoad 如果为ture 则不用LOAD 数据，只是进行htmlType类型的判断
	 * private
	 */
	loadHtml:function(isNotLoad){
		var notLoad = false;
		if (typeof(isNotLoad)!="undefined") notLoad = isNotLoad;
		
		var node = this.getSelectNode();
		var unid= node.id;
		var params ;
		//如果是新建子项状态，则要进行判断，如果是在根节点，则以模块子项装载页面
		if (ucapMenuConfig.type==2){
			if (node.id ==this.root.id){
				//如果是根节点，则进行判断
				if (node.id == this.newRootId || !this.isNewFlag){
					//是新建
					this.htmlType =2
				} else {
					this.htmlType =3;	
				}
			} else {
				this.htmlType =3;	
			}
			if (this.htmlType == 2){
				params ={"type":"module","act":"getModuleRoot","unid":unid,"random":ucapCommonFun.getRandomString()};
				ucapMenuConfig.html="sys/cfgJsp/menuModule/moduleRoot.jsp";
			} else {
				params ={"type":"module","act":"getModuleItem","unid":unid,"random":ucapCommonFun.getRandomString()};
				ucapMenuConfig.html="sys/cfgJsp/menuModule/module.jsp";
			}				
		} else {
			if (node.id ==this.root.id){
				//如果是根节点，则进行判断
				if (node.id == this.newRootId || !this.isNewFlag){
					//是新建
					this.htmlType =4
				} else {
					this.htmlType =1;	
				}
			} else {
				this.htmlType =1;	
			}
			if (this.htmlType ==4){
				ucapMenuConfig.html="sys/cfgJsp/menuModule/menuRoot.jsp";
				params ={"type":"menu","act":"getMenuRoot","unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是菜单
			} else {
				ucapMenuConfig.html="sys/cfgJsp/menuModule/menu.jsp";
				params ={"type":"menu","act":"getMenuItem","unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是菜单
			}
		};
		if (notLoad) return;
		if (this.isNewFlag){
			ucapMenuConfig.preHtml ="";
		};
		var url=ucapSession.appPath+ucapMenuConfig.html;
		if (ucapMenuConfig.preHtml!=ucapMenuConfig.html){
			
			var el = Ext.get("ucapCenter");
			var mgr = el.getUpdater();
			mgr.update({
		        url: url,
		        scripts:true
			});			
			mgr.on("update",function(){
				if (ucapSession.userJson.userStatus!=1){
					if (Ext.getDom("systemSet"))
					   Ext.getDom("systemSet").style.display="none";
				};				
				ucapMenuConfig.setValue(unid,params)				
			})
			/*Ext.get("ucapCenter").load({url: url},{},function(){
				if (ucapSession.userJson.userStatus!=1){
					if (Ext.getDom("systemSet"))
					   Ext.getDom("systemSet").style.display="none";
				};				
				ucapMenuConfig.setValue(unid,params)}
		    );*/
		    
		    
		    ucapMenuConfig.preHtml = ucapMenuConfig.html;
		} else {
			ucapMenuConfig.setValue(unid,params);
		}			
	},
	setButtonState:function(){
		var node = ucapMenuConfig.getSelectNode();
		//进行新建按钮的权限过滤，如果是叶子节点，不能再新建
		if (ucapMenuConfig.root.id == ucapMenuConfig.newRootId){
			//不能新建
			Ext.getCmp("menuNew").setDisabled(true);
			Ext.getCmp("menuRightNew").setDisabled(true);
			Ext.getCmp("menuFileNew").setDisabled(true);
			Ext.getCmp("menuDelete").setDisabled(true);
			Ext.getCmp("menuRightDelete").setDisabled(true);
			Ext.getCmp("menuFileDelete").setDisabled(true);
			return;
		} else {
			Ext.getCmp("menuDelete").setDisabled(false);
			Ext.getCmp("menuRightDelete").setDisabled(false);
			Ext.getCmp("menuFileDelete").setDisabled(false);
		}
		
		/*if (ucapMenuConfig.root.id == node.id){
			//根节点
			Ext.getCmp("cut").setDisabled(true);
			Ext.getCmp("menuCut").setDisabled(true);
		} else {
			Ext.getCmp("menuCut").setDisabled(false);
			Ext.getCmp("cut").setDisabled(false);
		}*/
		if( !node.isLeaf() ||  node.id == ucapMenuConfig.root.id || ucapMenuConfig.oldJson.type=="09" ){
			//允许新建
		    Ext.getCmp("menuFileNew").setDisabled(false);
			Ext.getCmp("menuNew").setDisabled(false);
			Ext.getCmp("menuRightNew").setDisabled(false);	
		} else {
			//不能新建
			Ext.getCmp("menuFileNew").setDisabled(true);
			Ext.getCmp("menuNew").setDisabled(true);
			Ext.getCmp("menuRightNew").setDisabled(true);
		}

	},
	/**
	 * private
	 */
	setValue:function(unid,params,flag){
		if (this.isNewFlag) {
			ucapMenuConfig.setButtonState();
			return; //新建状态，不用加载数据
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					var json = Ext.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
				//	alert("设置"+Ext.encode(json))
					ucapCommonFun.setFormValue(json);
					if (json!=null){
						if (Ext.getDom("interaction_Cn_")){
							Ext.getDom("interaction_Cn_").value =
								ucapCommonFun.getDisplayNames("227",Ext.getDom("interaction").value);
						}
						if (Ext.getDom("unuseScopes_Cn_")){
							Ext.getDom("unuseScopes_Cn_").value = 
								ucapCommonFun.getDisplayNames("200,201,202,203",Ext.getDom("unuseScopes").value);
						}
						if (Ext.getDom("useScopes_Cn_")){
							Ext.getDom("useScopes_Cn_").value =
								ucapCommonFun.getDisplayNames("200,201,202,203",Ext.getDom("useScopes").value);
						}
						try{
							if (Ext.getDom("smallPicture")) titleModuleIconChange(Ext.getDom("smallPicture"));
							if (Ext.getDom("picture")) titleMenuIconChange(Ext.getDom("picture"));
						}catch(e){};
					}
					ucapMenuConfig.oldJson = ucapCommonFun.getFormJSon("menuConfigdialogHtml");
					ucapMenuConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示","取值不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * name 有值，说明是通过改名进行的
	 * @param {} name
	 * @param newflag 为1，说明是保存并新建下一个
	 */
	save:function(msgName,newflag){
		if (typeof newflag =="undefined") newflag ="";
		var isSaveInfo = ucapCommonFun.getObjValueJson("saveInfo").v;
		
		var isRename = true;
		if (typeof(msgName)=="undefined" || msgName==""){
			isRename = false;		
		}
		var json;
		if (!isRename ){
			json = ucapCommonFun.getFormJSon("menuConfigdialogHtml");
			if (newflag==""){
				if (Ext.encode(ucapMenuConfig.oldJson)==Ext.encode(json)){
					Ext.Msg.alert("保存提示","当前数据未更改，无须保存！");
					return ;
				}
			}
		} else {
			//自己组装Json格式
			ucapMenuConfig.loadHtml(true);
			if (ucapMenuConfig.htmlType==2){
				json = {displayName:msgName};
			} else {
				json = {name:msgName};
			}			
		}
		var node = ucapMenuConfig.getSelectNode();
		var unid = node.id;
		var flag = "";
		if (ucapMenuConfig.isNewFlag) {
			if (node.id==ucapMenuConfig.root.id){
				//说明是在根节点在新建 
				flag="newSaveByRoot";
			} else {
				flag ="newSave";	
			}
		}
		var params;
		if (ucapMenuConfig.htmlType ==1){
			params ={"type":"menu","act":"saveMenuItem",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是菜单
		} else if (ucapMenuConfig.htmlType ==2){
			params ={"type":"module","act":"saveModuleRoot",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()};
		} else if (ucapMenuConfig.htmlType ==3){
			params ={"type":"module","act":"saveModuleItem",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()};
		} else if (ucapMenuConfig.htmlType ==4){
			params ={"type":"menu","act":"saveMenuRoot",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()};
		}		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					ucapMenuConfig.oldJson = ucapCommonFun.getFormJSon("menuConfigdialogHtml");
					if (!isRename && isSaveInfo !="" && newflag=="") Ext.Msg.alert("提示","保存信息成功！");
					if(ucapMenuConfig.isNewFlag){
						//新建 文档的保存
						ucapMenuConfig.newSaveConfig(json,response);
					} else {
					    //旧文档的保存	
						ucapMenuConfig.oldSaveConfig(json,response);
					}
					if (newflag==1){
						//说明是保存后要继续新建文档
						//alert("okadaa");
						var node = ucapMenuConfig.getSelectNode();
						if (node.id != ucapMenuConfig.tree.getRootNode().id){
							//说明不是根节点	
							node.parentNode.select();
						}						
						ucapMenuConfig.isNewFlag = true;
						ucapMenuConfig.loadHtml();						
					}
					ucapMenuConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示","保存不成功，请重试！");
				}
			}
		}		
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 新建文档后的保存操作 private
	 * @param {} json
	 */
	newSaveConfig:function(json,response){
		//这是后台返回是父节点的JSON
		var node = ucapMenuConfig.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
		if (node.id == ucapMenuConfig.newRootId){
			//说明是根节点自己的保存,只需替换根节点就可以
			node.id=mjson.unid;
			if (ucapMenuConfig.type==1){
				node.setText(mjson.name);
			} else{
				node.setText(mjson.displayName);
			}	
			node.leaf= true;
			ucapMenuConfig.rootUnid = node.id;
			ucapMenuConfig.root = node;
		} else {		
			if (node.id==ucapMenuConfig.root.id){
				//如果是在根节点上进行的新建
				//要替换根节点的ID，因为后台有可能是新增的根节点 根节点的值，放在 text对象中
				node.id = mjson.text;				
				ucapMenuConfig.rootUnid = node.id;
				ucapMenuConfig.root = node;
			}
			//恢复实际的值
			mjson.text = (json.name);					
			//在当前节点下追加一个子节点
			node.expand();
			var newNode = new Ext.tree.TreeNode(mjson);	
			node.leaf = false;
			node.icon="";
			node.appendChild(newNode);			
			newNode.select();			
			
		}
		ucapMenuConfig.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		ucapMenuConfig.saveFlag = true;			
		var node = ucapMenuConfig.getSelectNode();			
		if (response.responseText.indexOf("nochange")>-1){
			//说明只是对旧对象进行保存，只要更新名称就可以了	
			if (ucapMenuConfig.htmlType==2){
				node.setText(json.displayName);
			} else {
				node.setText(json.name);	
			}			
		} else {
			//说明是新增一个对象，则要替换当前节点
			var mjson = Ext.decode(response.responseText);	
			if (node.id==ucapMenuConfig.root.id){
			  //说明是根节点的保存
				node.id=mjson.unid;
				if (ucapMenuConfig.type==1){
					node.setText(mjson.name);
				} else{
					node.setText(mjson.displayName);
				}
			} else {
				node.id =mjson.id;
				node.attributes.belongToUsers = mjson.belongToUsers;
				node.attributes.belongToDepts = mjson.belongToDepts;
				node.setText(mjson.text);
				node.qtip = mjson.qtip;							
			}						
		}
	},
	getSelectNode:function(){
		return ucapMenuConfig.tree.getSelectionModel().getSelectedNode();	
	},
	setWinTitle:function(title){
		Ext.getDom("menuConfigTitle").innerHTML= title;	
	},
	paste:function(){
		var node = ucapMenuConfig.getSelectNode();
		ucapMenuConfig.handleMoveNode(ucapMenuConfig.tree,ucapMenuConfig.cutNode,
			ucapMenuConfig.cutNode.parentNode,node.parentNode,node.parentNode.indexOf(node));
		
		ucapMenuConfig.cutNode = null;
		Ext.getCmp("paste").setDisabled(true);
		Ext.getCmp("menuPaste").setDisabled(true);
	},
	/**
	 * 树的移动
	 */
	handleMoveNode:function(tree,node,oldParent,newParent,index){
		var type = "module";
		if(ucapMenuConfig.type==1){
			type = "menu";
		}
/*		Ext.MessageBox.alert("move","nodeid="+node.id+"newIndex:"+index+";OLDPARENTID:"+
			oldParent.id+";newParentId:"+newParent.id);
*/	 	var oldParentType ="item";
		if (oldParent.id == ucapMenuConfig.root.id){
			//说明是根节点
			oldParentType="root";
		}
		var newParentType ="item";
		if (newParent.id == ucapMenuConfig.root.id){
			//说明是根节点
			newParentType="root";
		}
		var params={type:type,act:"move",unid:node.id,index:index,oldParentId:oldParent.id,
				newParentId:newParent.id,oldParentType:oldParentType,newParentType:newParentType,
				"random":ucapCommonFun.getRandomString()};

		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if (response.responseText=="false"){
						Ext.Msg.alert("移动提示","移动不能被保存，无法生效！");
						return;
					}
					ucapMenuConfig.saveFlag = true;
				} else {
					Ext.Msg.alert("移动提示","移动不能被保存，无法生效！")	;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 删除选中节点的树，包括下面的所有子树
	 * @param infoFlag 是否要删除的提示，默认为true
	 */
	deleteNode:function(infoFlag){
		if (typeof (infoFlag) =="undefined") infoFlag =true;
		var deleteNodeAct =function(){
			var unid = node.id;
			var flag = "item";
			var fatherUnid="";
			var fatherType="item";
			if (node.id == ucapMenuConfig.root.id){
				flag = "root";
			} else {
				fatherUnid = node.parentNode.id;
			}
			if (fatherUnid==ucapMenuConfig.root.id){
				fatherType = "root";
			}
			var type="module";
			if (ucapMenuConfig.type==1){
				type="menu";
			} 
			var params ={"type":type,"act":"delete",flag:flag,"unid":unid,fatherUnid:fatherUnid,
						fatherType:fatherType,
						"random":ucapCommonFun.getRandomString()};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){	
						var exjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult)return;
						
						ucapMenuConfig.saveFlag = true;
						var node = ucapMenuConfig.getSelectNode();
						if (flag!="root"){
							var mjson = Ext.decode(response.responseText);
							var pnode = node.parentNode;
							if (pnode.id == ucapMenuConfig.root.id){
								node.parentNode.id = mjson.unid;
								ucapMenuConfig.rootUnid = mjson.unid;
								ucapMenuConfig.root = pnode;							
							} else {
								pnode.id = mjson.id;
							}
							node.remove();
							pnode.select();
							ucapMenuConfig.loadHtml();
						} else {
							//说明是删除整棵树
							if (response.responseText!="newtree"){
								//node.remove();
								//要重新加载树
								var mjson = Ext.decode(response.responseText);
								if (ucapMenuConfig.type==1){									
									ucapMenuConfig.treeJson = mjson.uiMenu;
									ucapMenuConfig.rootUnid = mjson.unid;
									ucapMenuConfig.displayName = mjson.name;
									ucapMenuConfig.createTree();
								} else {				
									ucapMenuConfig.displayName = mjson.displayName;
									ucapMenuConfig.moduleUnid = mjson.unid;  
									ucapMenuConfig.treeJson = mjson.uiModule;
									ucapMenuConfig.rootUnid = mjson.unid;
									ucapMenuConfig.createTree();
									//ucapMenuConfig.createModuleTree(ucapModule.allJson.unid);
								}
							} else{
								//说明已经是空的对象
								if (ucapMenuConfig.type==1){
									ucapMenuConfig.openMenuConfig("",1);	
								} else {
									ucapMenuConfig.openModuleConfig("",1);
								}
							}
						}
					} else {
						Ext.Msg.alert("提示","删除或恢复不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		var node = ucapMenuConfig.getSelectNode();
		if (infoFlag){
			var msg="";
			var nodemsg = "";
			if (!node.isLeaf()){
				nodemsg = "<br><br>删除时将同时删除其下所有的子节点"
			}
			if (ucapSession.userJson.userStatus==1){
				//说明是系统管理员	
				msg = "你当前是应用系统管理员身份，" +nodemsg+
						"且此操作不可恢复，你是否确定删除？";	
			} else if (ucapSession.userJson.userStatus==2){
				//说明是部门管理员
				msg = "你当前是部门管理员身份，" +nodemsg+
						"你是否确定删除？";	
			} else {
			 //说明是个人		
				msg ="你是否确定要删除选中的节点" +nodemsg+
						"？";	
			}
			Ext.MessageBox.confirm("删除提示",msg,function(id){
				if (id=="yes"){
	        		deleteNodeAct();
	    		}
			});	    	
		} else {
			deleteNodeAct();
		}
    	
	}
}
var onItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "menuNew":{   		
		ucapMenuConfig.isNewFlag = true;
		ucapMenuConfig.loadHtml();
		break;
	}
	case "menuRightNew":
		ucapMenuConfig.isNewFlag = true;
		ucapMenuConfig.loadHtml();
		break;
	case "menuFileNew":{
		ucapMenuConfig.isNewFlag = true;
		ucapMenuConfig.loadHtml();
		break;
	}
	case "menuRecover":{
		Ext.MessageBox.confirm("恢复提示","你是否确定恢复整个菜单<br>你自定义的所有节点" +
				"都将被删除，并恢复到初始状态，请确认？",
			  function(id){
					if (id=="yes"){
		    			ucapMenuConfig.root.select();   
		        		ucapMenuConfig.deleteNode(false);
		    		} 
			 },this
		);	
		break;
	}
	case "menuDelete":{
		ucapMenuConfig.deleteNode();
		break;
	}
	case "menuRightDelete":{
		ucapMenuConfig.deleteNode();
		break;
	}
	case "menuFileDelete":{
		ucapMenuConfig.deleteNode();
		break;
	}
	case "menuClose":{
		ucapMenuConfig.win.close();
   	  	break;
	}
	case "menuFileClose":{
		ucapMenuConfig.win.close();
   	  	break;
	}
	case "menuExpandAll":
		ucapMenuConfig.getSelectNode().expand(true);
		break;
	case "menuExpand":
		ucapMenuConfig.getSelectNode().expand();
		break;
	case "menuCollapseAll":
		ucapMenuConfig.getSelectNode().collapse(true);
		break;
	case "menuCollapse":
		ucapMenuConfig.getSelectNode().collapse();
		break;
	case "menuRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("改名提示","名称不能为空！");
		 			return;
		 		}
				ucapMenuConfig.save(msg);
			}
		},this);
		break;
	case "menuFileRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				ucapMenuConfig.save(msg);
			}
		},this);
		break;
	case "menuAppChange":
		if (ucapMenuConfig.type ==1){
			ucapMenu.init();	
		} else {
			ucapModule.setModuleHtml(ucapModule.moduleUnid,ucapSession.ucapModuleId);
		}
		ucapMenuConfig.saveFlag = false;
		break;
/*	case "cut":
		ucapMenuConfig.cutNode = ucapMenuConfig.getSelectNode();
		Ext.getCmp("paste").setDisabled(false);
		Ext.getCmp("menuPaste").setDisabled(false);
		break;
	case "menuCut":
		ucapMenuConfig.cutNode = ucapMenuConfig.getSelectNode();
		Ext.getCmp("paste").setDisabled(false);
		Ext.getCmp("menuPaste").setDisabled(false);
		break;
	case "paste":
		ucapMenuConfig.paste();
		break;
	case "menuPaste":
		ucapMenuConfig.paste();
		break;
*/	
	default :
       alert(btn.id+"代码未实现！");
	} 
}/**
 * 三级界面表单相关代码
 * JC_SeekArt
 */
var pfx_ucap = "ucap_";
var _UcapForm = {
	mainDiv:'_ucap_main_div',
	//配置信息
	cfg : {
		otherAction:"",//其它获取表单json的action
		otherSaveAction:"",//其它保存表单的acton
		defaultPath:appPath+'html/'+(ucapSession.appUnid||"")+"/",
		systemPath:appPath+'html/system/',
		docTitle : {},
		mainUnid:null,//主表单标识
		mainFormType:null,//主表单类型
		unid:null,//文档唯一标识
		curFormId:null,//当前表单或显示表单标识
		curFormType:null,//当前表单类型
		isTabNew:null,
		tab:null,
		form:null,
		formShow:null,
		composeForm:null,
		subButtonList:null,
		uiItemList:null,
		showLodingId:null,//进度条ID
		/**
		 * 只读标志 -1不能查看 0 只读 1 编辑
		 * @type 
		 */
		isRead:null,
		/**
		 * 父文档可编辑的标志，默认为1表示可编辑 0表示只读
		 * @type String
		 */
		fatherIsRead:"",
		formType:null,
		jspTmpStr:{
			formJson:{"id":"showBoxNoTab","class":"showContent"},
			form:'<div id="{id}"></div>',
			composeFormJson:{"id":"showTabBody","class":"showContent"},
			composeForm:'<div id="showBox">\
									<div id="showMenu">\
								    	<ul id="showMenuUL">\
								        </ul>\
								    </div>\
									<div id="showMenuLine"><div id="fl"></div></div>\
									<div id="{id}" class="{class}">\
								    </div>\
								</div>'
		},
		htmlTmpStr:{
			form:'<div main=## id="'+pfx_ucap+'{unid}" class="" htmlUrl="{htmlUrl}"></div>',
			input_html:'<input type="{type}" id="{name}" name="{name}" value="{value}"/>{text}&#160;',
			select_html:'<select name="{name}" id="{name}" value="{value}"></select>',
			option_html:'<OPTION name="{name}_{i}" id="{name}_{i}" value="{value}">{text}</OPTION>',
			btn_cn_html:'<input id="{id}_Cn_" type="text" class="{class}" readOnly/>&#160;<input id="btn_{id}" class="btnChannel" value="{text}" type="button"/>',
			areabtn_html:'<textarea id="{id}_Cn_" class="{class}" readOnly row="2"></textarea>&#160;<input id="btn_{id}" class="btnChannel" value="{text}" type="button"/>',
			ucap_img:'<img src="{src}" id="{id}" onclick="{onclick}"></img>',
			btn_html:'<input id="btn_{id}" class="btnChannel" value="{text}" type="button"/>',
			file_html:'<form name="form_{id}" action="" enctype="multipart/form-data" method="post" target="iframe{id}">' +
					'<input id="{id}" type="text" class="{class}" readOnly/><br/><div id="div_{id}" style="display:{display}">请选择要上传的文件：<input name="file" id="file_{id}" type="file" style1="width:0px;" value="" style="display:none1;"/></div>' +
					'{downFile}' +
					'</form><iframe name="iframe{id}" src="#" style="width:0px;height:0px;"></iframe>',
			downhtml:'{downFile}'
		},
		tabTmp : '<li id="{unid}" types="{types}" contents="{contents}" onclick="{tabclick}" style="cursor:hand;"><span qtip="{name}" style="width:70px;overflow:hidden; word-break:keep-all; white-space:nowrap; text-overflow:ellipsis;">{name}</span></li>',
		tabBodyTmp : '<div main=# id="'+pfx_ucap+'{unid}" style="display:none;" types="{types}" contents="{contents}"></div>',
		tabContentsTmp:'<div main=## id="'+pfx_ucap+'{unid}" style="display:none1;" types="{types}"></div>',
		toolBarBtnTmp:{
			defaultStr : '<a href="javascript:void(0);"><img src="'+ucapHeader.sUserStylePath+'ucapimages/{picture}" title="{tip}" onclick="{code}"/>{name1}</a>',
			btn:'<button title="{tip}" onclick="{code}" class=btnn1 onmouseover="this.className=\'btnn3\'" onmouseout="this.className=\'btnn1\'">{name}</button>',
			btnImg:'<button title="{tip}" onclick="{code}" class=btnn2 onmouseover="this.className=\'btnn4\'" onmouseout="this.className=\'btnn2\'">' +
					'<IMG src="'+ucapHeader.sUserStylePath+'ucapimages/{picture}" align=absMiddle>&nbsp;{name}</button>'
		}
	}
};
_UcapForm.handler = {
	all : {},
	getFormById: function (sUnid) {
		return this.all[sUnid];
	},
	addForm: function (sUnid,oForm) {
		this.all[sUnid] = oForm;
	},
	removeForm: function (sUnid) {
		delete this.all[sUnid];
	},
	/**
	 * 视图集
	 * @type 
	 */
	allView:{},
	getViewById: function (sUnid) {
		return this.allView[sUnid];
	},
	addView: function (sUnid,oView) {
		this.allView[sUnid] = oView;
	},
	removeView: function (sUnid) {
		delete this.allView[sUnid];
	}
};
//常用工具
_UcapForm.tool = {
	cfg:_UcapForm.cfg,
	showLodingMsg:function(title,msg,width,progress,closable){
		this.cfg.showLodingId = Ext.MessageBox.show({   
					wait:true,
					waitConfig:{increment:10,interval:1000},
	       			title: title||'系统提示',   
	       			msg: msg||'正在处理中...',   
	       			progressText: '',   
	       			width:width||300,   
	       			progress:progress||true,   
	       			closable:closable||false,   
	       			animEl: 'loding'  
	     		});
		return this.cfg.showLodingId;
	},
	hideLodingMsg:function(){
		if(this.cfg.showLodingId)this.cfg.showLodingId.hide();
	},
	/**
	 * 取JSON对象中，字段的值
	 * @param {} itemName 字段的英文名称
	 * @return {}
	 */
	getFormValue:function(itemName,isV){
		itemName = itemName.toLowerCase();
		var all = _UcapForm.handler.all;
		for(var formUnid in all){
			var itemList = all[formUnid].uiItemList;
			var result = "",tvalue,ttext;
			for (var m = 0; m < itemList.length; m++) {
				var itemNameEn = itemList[m].item.nameEn.toLowerCase();
				if(itemNameEn==itemName){
					var itemValue = itemList[m].item.value||itemList[m].uiItemValueList;
					tvalue = itemValue[0].value||itemValue[0].text;
					ttext = itemValue[0].text||itemValue[0].value;
					result = isV?tvalue:ttext;
					for (var n = 1; n < itemValue.length; n++) {
						tvalue = itemValue[n].value||itemValue[n].text;
						ttext = itemValue[n].text||itemValue[n].value;
						result +=ucapSession.fvs_sp+ (isV?tvalue:ttext);
						return result;
					}
				}
			}
		}
		return result;
	},
	/**
	 * 附件类型通过window.open下载
	 */
	openFile:function(){
		//getFileName
		var mainForm = _UcapForm.handler.all[_UcapForm.cfg.mainUnid];
		var requestConfig = {
			url:appPath+"BackGroundService.upload?getFileName=1&punid="+mainForm.unid,
			params:"",
			callback:function(options,success,response){
				if(success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if(response.responseText)window.open(response.responseText);
					else{
						Ext.Msg.alert("系统提示","当前附件不存在!");
					}
				}
			}
		};
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 附件类型删除
	 * @param {} inputId
	 */
	deleteFile:function(inputId){
		var fileValue = $("file_"+inputId).value;
		if(fileValue!=""){
			Ext.Msg.alert("系统提示","请刷新后再删除文件!");
			return;
		}
		Ext.Msg.confirm("是否要删除文件","删除后将无法还原,确定要删除吗？",
		function(flag){
				if(flag=="yes"){
					var mainForm = _UcapForm.handler.all[_UcapForm.cfg.mainUnid];
					var requestConfig = {
						url:appPath+"BackGroundService.upload?delete=1&punid="+mainForm.unid,
						params:"",
						callback:function(options,success,response){
							if(success){
								var exjson = Ext.decode(response.responseText);
								var exResult=ucapCommonFun.dealException(exjson);
								if(!exResult)return;
								
								if(response.responseText=="true"){
									if($(inputId))$(inputId).value="";
									_UcapForm.docSave();
									Ext.Msg.alert("系统提示","删除成功！");
								}else{
									Ext.Msg.alert("系统提示","删除失败,文件不存在！");
								}
							}
						}
					};
					Ext.Ajax.request(requestConfig);
				}
			}
		);
	},
	setCfgJson:function(json){
		var unid = ucapCommonFun.getUrlParameter("unid");
		this.cfg.form = json["form"];
		this.cfg.formShow = json["formShow"];
		this.cfg.composeForm = json["composeForm"];
		this.cfg.subButtonList = json["subButtonList"];
		this.cfg.uiItemList = json["uiItemList"];
		this.cfg.isRead = json["isRead"];
		//根据父文档进行重新的设置
		if (this.cfg.isRead>_UcapForm.cfg.fatherIsRead){
			this.cfg.isRead = 0;
		}
		if (this.cfg.isRead==1){
			//yjy 增加 对表单JS的判断 只有是编辑状态才能进行判断
			if (typeof this.cfg.form.editJs!="undefined" && this.cfg.form.editJs!=""){
				var editForm = ucapCommonFun.evalJavaScript(this.cfg.form.editJs);
				if (!editForm){
					this.cfg.isRead = 0;
				}
			}
		}
		this.cfg.isTabNew = (!unid || (json["isNew"]!="" && json["isNew"]==1))?1:0;
	},
	setCfgStr:function(unid,type,id){this.cfg.unid = unid;this.cfg.curFormType = type;this.cfg.curFormId = id;},
	setDocumentTitle:function(fj){
		var titleObj = Ext.getDom("ucap_document_title");
		titleObj.innerHTML = fj["titleStyle"]||fj["nameCn"];
		var sTitle = titleObj.innerHTML;
		//进行正则替换
		var _replaceField = function(){
			var _title=sTitle;
			var _ma = _title.match(/{F\$\w*}/g);
			if(null==_ma || _ma.length<1)return _title;
			for(var j=0;j<_ma.length;j++){
				var _rema = _ma[j].replace(/{F\$|}/g,"");
				
			//	var tempObj = Ext.getDom(_rema);
			//	var _vt = (!tempObj)?"":(tempObj.value||"新建,未名");
				//yjy更新，这样可保证能只读页面也能正确取到值
				var tempObj = Ext.getDom(_rema);
				if (tempObj){
					tempObj = tempObj.value;
					if(Ext.type(tempObj)=="array")
						tempObj=tempObj[0].text;
				} else{
					tempObj = $V(_rema);
				}
				var _vt = (!tempObj)?"无标题":(tempObj||"无标题");
				_title = _title.replace(_ma[j],_vt);
			}
			return _title;
		};
		
		sTitle = _replaceField()||"";
		if(!sTitle || sTitle=="undefined")return;
		if (window.parent && window.parent.ucapSession.docWin ){
			var wpdoc = window.parent.ucapSession.docWin;
			if(wpdoc.title.indexOf("文档新建")==-1){
				wpdoc.setTitle(ucapSession.win.winImg+sTitle);
			}
		} else {
			Ext.getDoc().dom.title = sTitle;
		}
		
		//Ext.getDoc().dom.title = sTitle;
		this.cfg.docTitle[this.cfg.curFormId] = sTitle;
	},
	/**
	 * 
	 * @param {} formEvents
	 * @param {} type
	 */
	executeJavaScript:function(formEvents,sType){
		var result = true;
		if(formEvents && formEvents.length>0)
		Ext.each(formEvents,function(fe){
			//alert(Ext.encode(fe));
			if(null==fe)return;
			var type = fe["eType"];//类型js、扩展功能
			var excType = fe["excType"];//执行类型:新(旧)文档打开、保存前后
			var value = fe["eValue"];
			if(type=="01" && excType==sType){
				//类型js
				result = eval(value);
			}else if(type=="02" && excType==sType){
				//扩展功能
				result = eval("_UcapForm.tool.executeInteraction('"+value+"');");
			}
		});
		return result;
	},
	//执行扩展功能
	executeInteraction:function(id){
		var json={};
		var params=location.search.slice(1).split('&');
		for(var i=0;i<params.length;i++){
			var temp=params[i].split("=");
			json[temp[0]||""]=temp[1]||"";
		}
		//var callBackFn = ucapCommonFun.getUrlParameter("callBackFn")||"";
		ucapCommonFun.executeInteraction(id,json,0);
	},
	//加载按钮
	setButton:function(sbl,tb){
		//if (_ucapDistb==1) return;
		//考虑按钮显示条件、按钮类型
		//只有图片，只有文字，图文类型按钮
		var btn = sbl||this.cfg.subButtonList||[];
		//alert(Ext.encode(btn));
		var altKey = new Ext.KeyMap(document.body);
		var toolbtn = tb||_ucapButtonDivName;
		var btnstr = "";
		for(var i=0;i<btn.length;i++){
			//alert(Ext.encode(btn[i]));
			var bn = btn[i];
			if(bn["display"]!=false){
				//var b = (function(){var js=bn["js"];return function(){return (""==js)?true:eval(js);}()})();
				var b = ucapCommonFun.evalJavaScript(bn.js);
				if(b==true){
					var codetype = bn["button"].codeType;
					var jscode = bn["button"]["code"].replace(/"/g,"'");
					switch(codetype){
						case "02":{
							bn["code"] = "_UcapForm.tool.executeInteraction('"+jscode+"');";
							break;
						}
						default:{
							bn["code"] = jscode;
						}
					}
					//绑定快捷方式
					try{
						altKey.addBinding({
							key:bn["altKey"],alt:true,scope:this,
							fn:(function(){var js = jscode;return function(){eval(js);};})()
						}); 
					}catch(e){}
					if(bn["picture"]){
						btnstr = this.cfg.toolBarBtnTmp.btnImg;
					}else{
						btnstr = this.cfg.toolBarBtnTmp.btn;
					}
					if(Ext.fly(toolbtn))this.complieTmp(btnstr,toolbtn,bn);
				}
				
			}
		}
	},
	//加载tab及div
	setTabDiv:function(t){
		var tabs = t||this.cfg.composeForm["tabs"];
		//alert(Ext.encode(tabs));
		//如果只有一个页签则不显示该页签
		if(tabs.length==1){
			$("showMenu").style.display="none";
			$("showMenuLine").style.display="none";
		}
		for(var i=0;i<tabs.length;i++){
			tabs[i]["tabclick"] = '_UcapForm.ucapForm.selectTag('+i+',this);';
			//加载tab
			this.complieTmp(this.cfg.tabTmp,"showMenuUL",tabs[i]);
			//加载tab对应的DIV
			//alert(Ext.encode(tabs[i]["types"]));
			this.complieTmp(this.cfg.tabBodyTmp,"showTabBody",tabs[i]);
			var types = tabs[i]["types"].split(",");
			var contents = tabs[i]["contents"].split(",");
			//if(!contents)this.complieTmp(this.cfg.tabContentsTmp,pfx_ucap+tabs[i]["unid"],{"unid":tabs[i]["unid"],"types":types});
			for(var j=0;j<types.length;j++){
				this.complieTmp(this.cfg.tabContentsTmp,pfx_ucap+tabs[i]["unid"],{"unid":contents[j],"types":types[j]});
			}
		}
	},
	//加载模板
	complieTmp : function(tmp,tag,json,verb){
		var tpl = new Ext.Template(tmp);
		tpl.compile();
		if(verb)return tpl.doInsert(verb,tag,json);
		else return tpl.append(tag,json);
	},
	/**
	 * 根据[json||divid||objid]渲染表单事件及对话框
	 * @param {} args
	 * @param {} dictTree[字典treejson]
	 */
	embellishForm:function(args,dictTree){
		var cfg = _UcapForm.cfg;
		var complieTmp = _UcapForm.tool.complieTmp;
		var item,sourceType,nameEn,source;
		if(args)
		switch(Ext.type(args)){
			case "object":item = args;break;
			case "element":item = args;break;
			case "array":{
				for (var i = 0; i < args.length; i++) {
					this.embellishForm(args[i]);
				}
				return;
			}
			case "string":{
				var oy = Ext.query('div#'+args+' input,textarea')||Ext.query(args);
				this.embellishForm(oy);
				return;
			}
		}
		var objFalg = item.tagName;//用来判断对象类型[json、document]
		nameEn = objFalg?(item.getAttribute("nameEn")||item.id):item["nameEn"];//字段的英文名
		var obj = Ext.getDom(nameEn);
		sourceType = obj?obj.getAttribute("sourceType")||item["sourceType"]:"";
		source = obj?obj.getAttribute("source")||item["source"]:"";
		var displayStyle = obj?obj.getAttribute("displayStyle")||item["displayStyle"]:"";
		/**
		 * 设置显示样式
		 * inputId要设置的对象,styleTypes要显示的样式类型
		 */
		var setDisplayStyle = function(inputId,styleTypes){
			//style="border:0;border-bottom:1 solid black;background:transparent;font-weight:bold;font-style:italic;"
			if(!$(inputId))return;
			var styleType = styleTypes.split(",");
			for (var i = 0; i < styleType.length; i++) {
				switch(styleType[i]){
					case "underline":{//下划线
						$(inputId).style.border=0;
						$(inputId).style.borderBottom = "1 solid black";
						$(inputId).style.background="transparent";
						break;
					}
					case "Strong":{//加粗
						$(inputId).style.fontWeight="bold";
						break;
					}
					case "em":{//斜体
						$(inputId).style.fontStyle="italic";
						break;
					}
				}
			}
		}
		if(displayStyle){
			setDisplayStyle(obj,displayStyle);
		}
		/**
		 * 设置隐藏替换值
		 */
		//displayConversion displayGivenCondtion displayInteraction
		var displayGivenCondtion = obj?obj.getAttribute("displayGivenCondtion")||item["displayGivenCondtion"]:"";
		if(displayGivenCondtion){
			var isdgc = eval(displayGivenCondtion);
			if(isdgc){
				var displayConversion = obj?obj.getAttribute("displayConversion")||item["displayConversion"]:"";
				var pobj = obj.parentNode;
				pobj.removeChild(obj);
				pobj.appendChild("<span>"+displayConversion+"</span>");
			}
		}
		/**
		 * 设置是否编辑功能
		 */
		var editGivenCondtion = obj?obj.getAttribute("editGivenCondtion")||item["editGivenCondtion"]:"";
		if(editGivenCondtion){
			var isegc = eval(displayGivenCondtion);
			if(isegc && isegc==true && item.readOnly!=undefined)item.readOnly=true;
		}
		
		//var dicShowType = item["itemShow"]["dictionaryType"];
		var fn20 = function(_s,s02){
			var btnCnHtmlTmp = cfg.htmlTmpStr.btn_cn_html;
			var btnHtmlTmp = cfg.htmlTmpStr.btn_html;
			var obj = Ext.getDom(nameEn);
			var _ss = obj.getAttribute("source")||item["source"];
			var _t=obj.getAttribute("isSingle")||item["isSingle"];
			var fieldNames = obj.getAttribute("columnMap")||item["columnMap"];
			
			if(s02){//视图列
				if(!Ext.getDom(nameEn+"_Cn_"))complieTmp(btnHtmlTmp,obj.parentNode,{"id":nameEn,"text":"选","class":"inputred"});
				var btn = Ext.getDom("btn_"+nameEn);
				Ext.apply(btn,{"onclick":function(){
					var _ev=obj.getAttribute("Evalue")||"";
					return (function(){selectView(_ss,fieldNames,nameEn,_t,_ev);})();
				}});
			}else{//通用选择框、字典选择框
				if(_t!=1){
					btnCnHtmlTmp = cfg.htmlTmpStr.areabtn_html;
				}
				if(!Ext.getDom(nameEn+"_Cn_"))complieTmp(btnCnHtmlTmp,obj.parentNode,{"id":nameEn,"text":"选","class":"inputred"},"afterBegin");
				obj.style.display="none";
				var btn = Ext.getDom("btn_"+nameEn);
				Ext.apply(btn,{"onclick":function(){
					//如果_s不存在则为通用选择框,否则为字典选择框[03]
					var _source = _s;
					if(!_s){
						var conValue = obj.getAttribute("conValue");
						if(Ext.getDom(conValue)) {
							_ss = Ext.getDom(conValue).value;
						} else {
							_ss="";
						}
						_source=obj.getAttribute("source")||200;
					}
					var _ev=obj.getAttribute("Evalue")||"";
					return (function(){selectDataSD(_source,_t,nameEn,_ss||"",_ev);})();
				}});
			}
		};
		//alert(Ext.encode(item["type"]));
		//进行文本编辑器的配置
		var ewebEditorFn = function(){
			var iframe1 = '<iframe id="{id}" src="'+ucapSession.appPath+'eWebEditor/ewebeditor.htm?id='+nameEn+'&style=mini" frameborder="0" scrolling="no" width="100%" height="350"></iframe>';
			complieTmp(iframe1,Ext.getDom(nameEn).parentNode,{"id":'eWebEditor_'+nameEn});
			Ext.getDom(nameEn).style.display="none";
			//var mhtml = new Ext.form.HtmlEditor(Ext.get(nameEn),{
			//});
			//mhtml.onResize(300,500);
	  		//mhtml.render(nameEn);
		}
		//if(item["type"]=="05"){
			//ewebEditorFn();
			//sourceType="06";
		//}
		//span、div等对象不进行渲染
		if(obj && obj.tagName.toLowerCase()!="span" && obj.tagName.toLowerCase()!="div")
		switch(sourceType){
			case "01":break;//手工输入
			case "02":{
				fn20("",1);
				//selectView(viewId,fieldNames,inputName,isSingle);
				break;//视图列
			}
			case "04":{//日期
				//var date = new Ext.form.DateField(Ext.get(nameEn));
				//date.format = "Y-m-d";
				source = source||"yyyy-MM-dd";
				var img = '<span><IMG style="CURSOR: pointer;" onclick="{onclick}" src="'+ucapSession.appPath+'js/ucap/calendar/skin/datePicker.gif" align=absMiddle/></span>';
				complieTmp(img,Ext.getDom(nameEn).parentNode,{"onclick":"WdatePicker({el:'"+nameEn+"',dateFmt:'"+source+"'});"});
				break;
			}
			case "05":{//日期时间
				source = source||"yyyy-MM-dd HH:mm";
				var img = '<span><IMG style="CURSOR: pointer;" onclick="{onclick}" src="'+ucapSession.appPath+'js/ucap/calendar/skin/datePicker.gif" align=absMiddle/></span>';
				complieTmp(img,Ext.getDom(nameEn).parentNode,{"onclick":"WdatePicker({el:'"+nameEn+"',dateFmt:'"+source+"'});"});
				break;
			}
			case "06":{//textarea
				var pobj = obj.parentNode;
				pobj.removeChild(obj);
				source = source||"350";
				var areatext = '<textarea id="{id}" name="{id}" style="width:100%;height:'+source+'px;"></textarea>';
				complieTmp(areatext,pobj,{"id":nameEn});
				break;
			}
			case "07":break;//计算
			case "08":{//多文本编辑
				ewebEditorFn();
				break;
			}
			case "09":{//文件上传
				var filehtml = cfg.htmlTmpStr.file_html;
				var pobj = obj.parentNode;
				pobj.removeChild(obj);
				var filecfg = {"id":nameEn};
				if((cfg.isRead+"")=="1"){
					if(!item.value[0]){
						filecfg = {"id":nameEn,"display":"none1"};
						complieTmp(filehtml,pobj,filecfg);
					}else{
						filecfg = {"id":nameEn,"class":"inputred","display":"none","downFile":'<span onclick="$(\'div_'+nameEn+'\').style.display=\'\';" style="color:red;cursor:hand;">重新上传</span>&#160;&#160;' +
																							'<span onclick="_UcapForm.tool.openFile();" style="cursor:hand;">下载</span>&#160;&#160;' +
																							'<span onclick="_UcapForm.tool.deleteFile(\''+nameEn+'\');" style="cursor:hand;">删除</span>'};
						
						complieTmp(filehtml,pobj,filecfg);
					}
				}
				
				break;
			}
			case "20":{//通用选择框
				fn20();
				break;
			}//case 08
			case "03":{//字典
				
				var dicShowType = objFalg?item.getAttribute("dictionaryType"):((item["dictionaryType"]||item["itemShow"]["dictionaryType"]));
				//alert(dicShowType);
				var inputPty = {"name":nameEn,"id":nameEn,"type":"text"};
				var dicHtmlTmp = cfg.htmlTmpStr.input_html;
				//alert(Ext.encode(ij[i]));
				var oObj = obj = Ext.getDom(nameEn);
				switch(dicShowType){
					case "01":{//下拉（COMBO）
						complieTmp(cfg.htmlTmpStr.select_html,obj.parentNode,inputPty);
						oObj.parentNode.removeChild(oObj);
						obj = Ext.getDom(nameEn);
						dicHtmlTmp = cfg.htmlTmpStr.option_html;
						inputPty = {};
						//为了option可以安全的append到select中
						Ext.DomHelper.useDom=true;
						break;
					}
					case "02":{//RADIO
						inputPty["type"]="radio";obj=obj.parentNode;break;
					}
					case "03"://字典弹出框
						fn20("204");
						break;
					case "011"://Ext下拉框
						if(!dictTree)dictTree=[];
						var children = dictTree["children"];
						var data = [];
						for (var j = 0; j < children.length; j++) {
							data[j]=[children[j]["value"],children[j]["text"]];
						}
						//alert(data);
						var comboWithTooltip = new Ext.form.ComboBox({
					        //tpl: '<tpl for="."><div ext:qtip="{state}. {nick}" class="x-combo-list-item">{state}</div></tpl>',
					        store: data,
					        displayField:'state',
					        typeAhead: true,
					        mode: 'local',
					        triggerAction: 'all',
					        //emptyText:'Select a state...',
					        selectOnFocus:true,
					        applyTo: nameEn
					    });


						break;
					case "05":{//CHECKBOX
						inputPty["type"]="checkbox";obj=obj.parentNode;break;
					}
					//case "06":continue;break;//手工输入
					default:break;
				}
				if(dicShowType=="01" || dicShowType=="02" || dicShowType=="05"){
					if(!dictTree)break;
					var children = dictTree["children"];
					if(!children)break;
					try{
						for (var j = 0; j < children.length; j++) {
							inputPty["text"]=children[j]["text"]||"";
							inputPty["value"]=children[j]["value"]||"";
							inputPty["i"] = j;
							if(Ext.DomHelper.useDom)
								Ext.DomHelper.append(Ext.get(obj), {tag:'option',value:inputPty["value"],html:inputPty["text"]});
							else
								complieTmp(dicHtmlTmp,obj,inputPty);
						}
						if(oObj && oObj.parentNode)oObj.parentNode.removeChild(oObj);
					}catch(e){}
				}
				break;
			}//case 03
		}
		Ext.DomHelper.useDom=false;
	},
	form : function(fjson,ijson){
		var cfg = this.cfg;
		var complieTmp = this.complieTmp;
		var fj = fjson||cfg.form;
		var ij = ijson||cfg.uiItemList//所有字段列表
		//alert(Ext.encode(fj["verifyFields"]));
		if(!cfg.mainUnid)cfg.mainUnid=fj["unid"];
		//alert(Ext.encode(ij));
		//alert(Ext.encode(formJson));
		//加载HTML模板
		var tag = cfg.jspTmpStr.formJson["id"];
		var divId = pfx_ucap+fj["unid"];
		if(!Ext.fly(tag)){
			tag = cfg.jspTmpStr.composeFormJson["id"];
		}
		if(!Ext.fly(divId))this.complieTmp(cfg.htmlTmpStr.form,tag,fj);
		//alert(tag);
		//考虑是否只读页面
		//alert(Ext.fly(divId));
		//alert("加载HTML页面:"+formJson["htmlUrl"]);
		var htmlUrl = "",formName = "";
		//this.cfg.isRead = 0;
		switch(cfg.isRead+""){
			case "0" : formName = "R_"+(fj["htmlUrl"]||(fj["unid"]+".html"));break;
			case "1" : formName = fj["htmlUrl"]||(fj["unid"]+".html");break;
			default:formName = "error.html";break;
		}
		var htmlFolder  = this.cfg.defaultPath;
		if(fj.nameEn && fj.nameEn.toLowerCase().indexOf("ucap_")==0){
			htmlFolder=this.cfg.systemPath;
		}
		htmlUrl = htmlFolder + formName;
		var parm = {
			rds:ucapCommonFun.getRandomString()
		};
		var embellishForm = this.embellishForm;
		Ext.get(divId).load({"url":htmlUrl},parm,function(objDiv,isb){
			if(isb){
				//编辑状态
				//绑定字段属性及赋值、绑定事件
				var item,value,nameEn;
				//alert(Ext.encode(itemJson));
				for(var i=0;i<ij.length;i++){
					var jsonItem = {};//需要给页面绑定的属性
					item = ij[i]["item"];//字段的属性
					value =  ij[i]["uiItemValueList"];//字段的值
					item["value"] = value;//将字段的值赋值给字段的属性json中
					nameEn = item["nameEn"];//字段的英文名
					var dict = ij[i]["dictTree"];
					
					//给页面的nameEn绑定item中的所有属性
					jsonItem[nameEn] = item;
					//item["dictTree"] = dict;
					//if(dict)alert(Ext.encode(jsonItem));
					//alert(Ext.encode(jsonItem));
					Ext.apply(jsonItem[nameEn],item["itemShow"]||{});
					Ext.apply(jsonItem[nameEn],item["itemEvents"]||{});
					//alert(Ext.encode(item["itemEvents"]));
					//if(item["itemShow"])alert(Ext.encode(item["itemShow"]));
					if((cfg.isRead+"")=="1"){//编辑状态
						//渲染对象对话框事件
						//根据json渲染
						try{
							embellishForm(item,dict);
						}catch(e){}
					}
					//绑定属性及值
					//alert(i+" :ij: "+ij.length);
					//alert(Ext.encode(jsonItem));
					ucapCommonFun.bindForm(jsonItem);
					//alert(Ext.encode(jsonItem));break;
					//考虑是否要改正规的格式存储起来
				}
				//非组合表单加载标题
				//if(cfg.formType!="03")
				_UcapForm.tool.setDocumentTitle(fj);
				var formEvents = fj["formEvents"];
				if(cfg.isTabNew){
					//新文档
					_UcapForm.tool.executeJavaScript(formEvents,"01");
				}else{
					//旧文档
					_UcapForm.tool.executeJavaScript(formEvents,"02");
				}
			}else{
				if(objDiv)objDiv.update('<div class="red" align="center">未找到相关表单,请与管理员联系!<br/>'+htmlUrl+'</div>');
			}
		});
	},
	formShow : function(fjson,ijson){
		//alert(Ext.encode(this.cfg.formShow));
		this.form(fjson||this.cfg.formShow,ijson||this.cfg.uiItemList);
	},
	composeForm : function(fjson,ijson){
		//alert(Ext.encode(this.cfg.composeForm));
		var cpForm = fjson||this.cfg.composeForm;
		this.cfg.formType = "03";
		_UcapForm.tool.setDocumentTitle({"titleStyle":cpForm["name"]});
		if (window.parent && window.parent.ucapSession.docWin){				
			window.parent.ucapSession.docWin.setTitle(ucapSession.win.winImg+cpForm["name"]);
		} else {
			Ext.getDoc().dom.title = cpForm["name"];
		}
		//Ext.getDoc().dom.title = cpForm["name"];
		//如果有配置打开的JSP则直接跳转到该JSP页面
		var jspUrl = cpForm["jspUrl"];
		if(jspUrl && jspUrl.indexOf("jsp")>-1 && window.location.href.indexOf(jspUrl)==-1){
			window.location=this.cfg.composeForm["jspUrl"];
			//window.location="document.jsp";
		}
		//alert(Ext.encode(this.cfg.form));
		if(this.cfg.mainFormType=="02"){
			this.cfg.mainUnid = this.cfg.form["unid"];
		}else 
			this.cfg.mainUnid = cpForm["mainFormId"];
		//加载tab及div
		this.setTabDiv();
		//初始化主表单数据
		//this.formShow(this.cfg.form||this.cfg.formShow);
	}
};
/**
 * 保存表单 
 * @param callBack 执行成功的回调函数，参数是字符串
 * 
 */
_UcapForm.docSave = function(saveCallBack){
	if(!Validator.Validate(_UcapForm.mainDiv)){
		Ext.Msg.alert("提示信息","表单数据不完整,请填完整后再提交!");
		return false;
	}
	//进行单一文件的上传
	var uploadFile = function(){
		var fileInputs = Ext.query("input[sourceType=09]");
		var bSave = false;//是否执行后续的保存
		if (fileInputs.length==0)return true;
		for (var i = 0; i < fileInputs.length; i++) {
			var inputId = fileInputs[i].id;
			var divFile = $("div_"+inputId);
			if(divFile.style.display=="none"){
				return true;
			}
			var iframe = $("iframe"+inputId);
			var ifr_src = iframe.getAttribute("src");
			var iframeFlag = iframe.contentWindow.document.body.innerHTML;
			var flag = iframe.getAttribute("flag");
			if(flag=="false"){
				iframeFlag = "false";
			}else{
				bSave = true;
			}
			var fileValue = $("file_"+inputId).value;
			if(fileValue=="")bSave = true;
			if((ifr_src=="#" && iframeFlag.indexOf("true")==-1 && fileValue!="")){
				if(iframe.getAttribute("flag")!="true"){
					Ext.get("iframe"+inputId).on("load",function(){
							var inputPath = iframe.contentWindow.document.body.innerHTML;
							if(inputPath=="false"){
								iframe.setAttribute("flag","true");alert("上传附件失败");
							}else{
								$(inputId).value = inputPath.replace(/\\/g,"/");
								iframe.setAttribute("flag","true");
							}
							_UcapForm.docSave();
						});
					try{
						var form = $("form_"+inputId);
						var mainForm = _UcapForm.handler.all[_UcapForm.cfg.mainUnid];
						form.setAttribute("action",appPath+"BackGroundService.upload?upload=1"
											+"&punid="+mainForm.unid);
						form.submit();
					}catch(e){
						//return false;
					};
					iframe.setAttribute("flag","true");//正在执行中
					return false;
				}else{
					iframe.setAttribute("flag","false");//未执行或者已经执行过
					return true;
				}
			}else{
				iframe.setAttribute("flag","false");//未执行或者已经执行过
			}
			break;//目前只只支持一个表单有单一上传文件
		}
		return bSave;
	}
	//返回ture则表示上传成功
	if(!uploadFile())return;
	if(typeof saveCallBack !="string" ) saveCallBack = "";
	var unid = ucapCommonFun.getUrlParameter("unid");
	var fformUnid = ucapCommonFun.getUrlParameter("fformUnid");
	var funid = ucapCommonFun.getUrlParameter("funid");
	var flowParm = "";
	var isNew = unid;//用于保存成功后是否进行跳转
	var all = _UcapForm.handler.all;
	var mid = _UcapForm.cfg.mainUnid;//主表单UNID
	var mainForm = _UcapForm.handler.getFormById(mid);
	var jresult = [];
	var ji = 0;
	
	var formEvents = all[mid]["form"]["formEvents"];
	//alert(Ext.encode(formEvents));
	var isContinue;
	if(!isNew){
		//新文档保存前
		isContinue = _UcapForm.tool.executeJavaScript(formEvents,"03");
	}else{
		//旧文档保存前
		isContinue = _UcapForm.tool.executeJavaScript(formEvents,"05");
	}
	//alert(isContinue);
	if(isContinue==false)return;
	//return;
	for(var a in all){
		//页签是否新建0否1是
		var isTabNew = (!isNew || (all[a]["isNew"]!="" && all[a]["isNew"]==1))?1:0;
		//alert(Ext.encode(a));
		//if(a==mid)continue;
		var jr = {};
		var jitem = [];
		var items = all[a]["uiItemList"];
		
		//if(isTabNew)alert("新文档");else alert("旧文档");
		
		for (var i = 0; i < items.length; i++) {
			var item = items[i]["item"];
			var name = item["nameEn"];
			var value = item["value"]||items[i]["value"];
			//alert(Ext.encode(value));
			//alert(!value[0]);
			var obj = Ext.getDom(name);
			/**
			 * 返回有字段集的json
			 * 格式：{k:"",v:"",t:""}
			 */
			var getKVT = function(v){
				var kvt = {};
				//中文值及实际值的获取
				kvt = ucapCommonFun.getObjValueJson(name,v);
				var type = item["type"];
				if(Ext.encode(kvt)=="{}"){
					if(v && v.length>0){
						kvt["k"]=name;
						kvt["v"]=v[0].value;
						kvt["t"]=type;
					}
				}else{
					kvt["t"]=type;
				}
				//if(kvt["v"])kvt["v"]=v||obj.value;
				return kvt;
			};
			
			//判断字段数据是否需要更新[新文档、旧文档]
			if(!isTabNew){
				try{
					//旧文档,判断数据是否有修改,只提交改动过的.
					var tempV = getKVT();
					if(!value[0])value[0]={};
					var _v = (value[0]["value"]||value[0]["text"])||"";
					for(var k=1;k<value.length;k++){
						_v += ucapSession.fvs_sp+value[k]["value"];
					}
					//alert(_v+":::"+tempV["v"]);
					if(obj && _v!=tempV["v"]){
						jitem[i] = tempV;
						//alert(_v+":::"+tempV["v"]);
						//if(value[0]) value[0]["text"] = tempV["v"];
						//if(value[0]) value[0]["value"] = tempV["v"];
						if(item["spellSource"]==1)tempV["s"]=1;
					}
				}catch(e){
					//alert(e.description);
				}
				
			}else{
				//新文档,全部提交,如果对象在页面不存在则取原来的数据作为默认值
				
				if(obj)jitem[i] = getKVT();
				else jitem[i] = getKVT(item["value"]||items[i]["value"]);
				//alert(Ext.encode(item["value"]||items[i]["value"]));
				if(jitem[i]["spellSource"]==1)jitem[i]["s"]=1;
				//alert(Ext.encode(jitem[i]));
				//alert(Ext.encode(jitem[i]));
			}
		}
		if(Ext.encode(jitem)=="[]"){
			continue;
		}
		var form = all[a]["form"]||all[a]["formShow"];
		if(form){
			//表单UNID
			jr["formUnid"] = form["unid"];
			//文档UNID
			jr["unid"] = all[a]["unid"];
			//alert(jr["unid"]);
			//判断是否主表
			if(!mid||mid==a){
				
				//alert("主表单保存");
				//从URL上获取主表信息
				if(!isNew && fformUnid && funid){
					//表单UNID
					jr["fformUnid"] = fformUnid;
					//文档UNID
					jr["funid"] = funid;
				}
				
			}else if(mid && mid!=a){
				//alert("非主表单保存");
				var cf =  all[mid]["composeForm"];
				//不是主表单,并且有主合表单
				if(cf){
					//alert("非主表单有主表保存");
					//表单UNID
					jr["fformUnid"] = mainForm["form"]["unid"];
					//文档UNID
					jr["funid"] = all[mid]["unid"];
				}else{
					//普通表单、无主从关系的单一表单
				}
			}
		}
		//alert(Ext.encode(jitem));
		if(isTabNew){
			jr["isNew"] = "1";
			var temp = all[a];
			temp["isNew"] = "";
			//新建时加入流程参数
			var nodeid = ucapCommonFun.getUrlParameter("nodeid");
			var flowid = ucapCommonFun.getUrlParameter("flowid");
			nodeid = !nodeid?"":nodeid;
			flowid = !flowid?"":flowid;
			if(flowid!="" && flowParm.indexOf("flowid")<0){
				flowParm += "&flowid="+flowid+"&nodeid="+nodeid;
			}
		}
		else{
			jr["isNew"] = "0";
		}
		jr["item"] = jitem;
		jresult[ji] = jr;
		ji++;
	}
	/**
	 * 加入视图编辑数据的获取
	 */
	var allView = _UcapForm.handler.allView;
	for(var view in allView){
		var objView = $(view);
		if(objView && objView.tagName.toLowerCase()=="iframe"){
			var ifrWin = objView.contentWindow;
			if(ifrWin && ifrWin.view){
				var editGridDatas = ifrWin.view.getEditorGridDatas();
				editGridDatas = Ext.decode(editGridDatas);
				for(var i=0;i<editGridDatas.length;i++){
					/**
					 * 加入主表修改
					 */
					var data = editGridDatas[i];
					if(!data["fformUnid"])data["fformUnid"]=mainForm["form"]["unid"];
					if(!data["funid"])data["funid"]=all[mid]["unid"];
					jresult[jresult.length]=data;
				}
				if(!window.view.viewSaveValidator(editGridDatas))return false;
			}
		}
	}
	/**
	 * 保存其它特殊表单信息接口
	 */
	var otherFormData = _UcapForm.ucapForm.otherFormData();
	if(otherFormData && Ext.type(otherFormData)=='array'){
		for(var i=0;i<otherFormData.length;i++){
			/**
			 * 加入主表修改
			 */
			var data = otherFormData[i];
			if(!data["fformUnid"])data["fformUnid"]=mainForm["form"]["unid"];
			if(!data["funid"])data["funid"]=all[mid]["unid"];
			jresult[jresult.length]=data;
		}
	}
	
	if(Ext.encode(jresult)=="[]"){
		Ext.Msg.alert("保存提示","文档没有修改，无需保存！");
		return false;
	}
	//alert(Ext.encode(jresult));
	//return;
	//type=getForm&act=save
	var ps = "type=getForm&act=save"+flowParm+"&"+ucapCommonFun.getRandomString();
	var curwin = window;
	if (parent){
		curwin = parent;
	}
	if(!_UcapForm.cfg.otherSaveAction){
		_UcapForm.cfg.otherSaveAction = ucapSession.baseAction;
	}
	var requestConfig = {
		url:_UcapForm.cfg.otherSaveAction,
		params:ps,
		jsonData:jresult,
		callback:function(options,success,response){
			if (success){
				
				var flag = response.responseText;
				var exjson = Ext.decode(flag);
				var exResult=ucapCommonFun.dealException(exjson);
				if(!exResult)return;
				
				if(flag=="1" || flag==1){
					//if(_ucapDistb!=1){
					curwin.Ext.Msg.alert("保存提示","文档保存成功!");
					//}
					if(!isNew ){
						//新文档保存后
						isContinue = _UcapForm.tool.executeJavaScript(formEvents,"04");
						if(isContinue==false)return;
						
						var formType = ucapCommonFun.getUrlParameter("type");
						var flowid= ucapCommonFun.getUrlParameter("flowid");
						if(flowid){
							//ucapOpenFlow.openOldFlowDoc("&type="+formType+"&unid="+mainForm["unid"],_UcapForm.openFlowDoc);						
							//csj  2009.7.30
							ucapOpenFlow.openOldFlowDoc("&unid="+mainForm["unid"],_UcapForm.openFlowDoc);	
						}else{
							window.location=window.location.href.replace(/(unid=)/,"unid="+mainForm["unid"]);
						}
					} else{
						//修改json里面的值
						var submitData = options.jsonData;
						for (var j = 0; j < submitData.length; j++) {
							var dataItems = submitData[j].item;
							for (var kk = 0; kk < dataItems.length; kk++) {
								var ditem = dataItems[kk];
								if(ditem){
									var nameEn = ditem.k;
									var formUnid = submitData[j].formUnid;
									if(!all[formUnid])continue;
									var itemList = all[formUnid].uiItemList;
									for (var m = 0; m < itemList.length; m++) {
										var itemNameEn = itemList[m].item.nameEn;
										if(itemNameEn==nameEn){
											var itemValue = itemList[m].item.value;
											for (var n = 0; n < itemValue.length; n++) {
												itemValue[n].text = ditem.v;
											}
										}
									}
								}//end if(ditem)
							}
						}
						//旧文档保存成功后
						isContinue = _UcapForm.tool.executeJavaScript(formEvents,"06");
						if(isContinue==false)return;
					}
					//modified by llp 09-06-10
					ucapCommonFun.refreshParentView();
					//执行回调函数
					if (saveCallBack!=""){
						ucapCommonFun.evalJavaScript(saveCallBack+"('"+mainForm["unid"]+"');");
					}					
				}else if(flag=="0"){
					curwin.Ext.Msg.alert("保存提示","文档保存失败!");
				}else{
					curwin.Ext.Msg.alert("保存提示",flag);
				}
			}
			_UcapForm.tool.hideLodingMsg();
		}
	}
	//document.write(Ext.encode(jresult));
	//return;
	this.tool.showLodingMsg();
	Ext.Ajax.request(requestConfig);
	return true;

};
_UcapForm.openFlowDoc=function(url){
	// type 打开类型 0 表示 新窗口，1表示当前窗口 2表示div方式
	var type = ucapSession.opendocType;
	if (type==1 || type==2){
		 url = url+"&div=1";
	}
	window.location = url;
}
/**
 * 表单的关闭事件
 */
_UcapForm.formClose=function(){
	if (window.parent){
		if (window.parent.ucapSession.docWin){
			window.parent.ucapSession.docWin.close();
		}else{
			window.close();
		}
		if (window.parent.ucapCommonFun.ucapCurOpenType==1){
			//要重新打开视图
			window.parent.initView(window.parent.view.viewId,window.parent.ucapSession.ucapViewId);
		}
	} else {
		window.close();
	}
}
/**
 * 加载表单
 */
_UcapForm.ucapForm = function(){
	var loadMain = false;
	var cfg = _UcapForm.cfg;
	var tool = _UcapForm.tool;
	var returnForm = function(unid,type,formId,isTab,isReload){
		//根据传进来的参数与后台交互返回表单json数据集
		//tool.setCfgStr(unid,type,id);
		//根据表单类型加载不同的JSP模板,分为有tab的【组合表单】和无tab的【表单、显示表单】
		var mainDiv = "_ucap_main_div";
		if(Ext.fly(mainDiv))
		switch(type){
			case "01":tool.complieTmp(cfg.jspTmpStr.form,mainDiv,cfg.jspTmpStr.formJson);break;
			case "02":tool.complieTmp(cfg.jspTmpStr.form,mainDiv,cfg.jspTmpStr.formJson);break;
			case "03":tool.complieTmp(cfg.jspTmpStr.composeForm,mainDiv,cfg.jspTmpStr.composeFormJson);break;
		}
		returnForm.initAjax(unid,type,formId,isTab,isReload);
	};
	returnForm.otherFormData=function(){return null};
	//表单【字段、表单的按钮】
	//显示表单【字段、显示表单的按钮】
	//组合表单【tab集、字段、组合表单的按钮、显示表单、表单】
	//根据不同的【表单类型、表单标识】获取相应的按钮集
	//根据不同的【表单类型、表单标识】获取相应的字段集
	returnForm.initForm = function(json,type){
		tool.setCfgJson(json);
		type = type||cfg.curFormType;
		switch(type){
			case "01":tool.form();break;
			case "02":tool.formShow();break;
			case "03":{
				tool.composeForm();
				//默认打开第一个页签
				this.selectTag(0);
				break;
			}
		}
		//加载按钮,第一次交互时加载按钮进来
		if(!loadMain)tool.setButton();
		//alert(Ext.encode(cfg.form));
		return this;
	};
	
	returnForm.initAjax = function(unid,type,formId,isTab,isReload,isAjax){
		if(cfg.mainFormType=="02"){
			formId = cfg.form["unid"];
		}
		tool.setCfgStr(unid,type,formId);
		var json = _UcapForm.handler.getFormById(formId);
		if(cfg.docTitle[formId])
			if (window.parent && window.parent.ucapSession.docWin){				
				window.parent.ucapSession.docWin.setTitle(ucapSession.win.winImg+cfg.docTitle[formId]);
			} else {
				Ext.getDoc().dom.title = cfg.docTitle[formId]||"";
			}
		if(!isAjax){
			if(!isReload && json){
				//打开标签时如果是主文档则初始化组合表单里面的主文档数据
				if(formId==cfg.mainUnid && !loadMain){
					this.initForm(json,type);
					loadMain = true;
				}
				return;
			}else if(isReload && json){
				this.initForm(json);
				return;
			}
		}
		json = {};
		//alert(formId+"+"+cfg.mainUnid);
		var instanceUnid = ucapCommonFun.getUrlParameter("instanceUnid");
		var nodeid = ucapCommonFun.getUrlParameter("nodeid");
		var flowid = ucapCommonFun.getUrlParameter("flowid");
		nodeid = !nodeid?"":nodeid;
		flowid = !flowid?"":flowid;
		instanceUnid = !instanceUnid?"":instanceUnid;
		var flowParm = "&flowid="+flowid+"&nodeid="+nodeid+"&instanceUnid="+instanceUnid;
		var ps = 'type=getForm&unid='+unid+'&formType='+type+'&formId='+formId+
				((!isTab)?"&subButton=0":"")+((!unid)?"&isNew=1":"")+((cfg.mainUnid && formId!=cfg.mainUnid)?"&main="+cfg.mainUnid:"")+flowParm;
		//alert(ps);
		if(!cfg.otherAction){
			//mdy by llp 2009-7-31
			cfg.otherAction = ucapSession.baseAction; 
		}
		var requestConfig = {
			id:_UcapForm.mainDiv,
			url:cfg.otherAction,
			params:ps,
			callback:function(options,success,response){
				if (success){
					json = Ext.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					//alert(Ext.encode(json["formShow"]));
					//alert(Ext.encode(json["isRead"]));
					//alert(Ext.encode(json["uiItemList"]));
					var key = formId;
					if(type=="03"){
						//取组合表单中的主表单标识,并加入到全局变量中
						var cfjson = json["composeForm"];
						if(!cfjson){
							Ext.Msg.alert("系统提示","组合表单不存在!");
							return;
						}
						var mft = cfjson["mainFormType"];
						cfg.mainFormType = mft;
						if(mft=="02"){
							key = json["form"]["unid"];
						}else{
							key = json["composeForm"]["mainFormId"];
						}
					}
					_UcapForm.handler.addForm(key,json);
					returnForm.initForm(json,type);
				}else{
					returnForm.error(options.id,'加载表单信息失败,请与管理员联系!');
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	};
	returnForm.selectTag = function (n,selfObj){ 
		// 操作内容 
		var oDiv = Ext.query("div[main=#]","showTabBody");
		try{
			var types = oDiv[n].getAttribute("types").split(",");
			var contents = oDiv[n].getAttribute("contents").split(",");
			var unid = ucapCommonFun.getUrlParameter("unid");
			//alert(types[0]+":"+contents[0]);
			for(var i=0;i<types.length;i++){
				var t = types[i];
				var divId = (!contents[i])?oDiv[n].id:pfx_ucap+contents[i];
				var oFlwDiv = Ext.getDom(divId);
				switch(t){
					case "03" :{//视图
						if(!unid && i==0){
							alert("请先保存再打开视图");
							return;
						}
						_UcapForm.handler.addView(contents[i],contents[i]);
						var parm = location.href.replace(/(^[^?]*\?)|(&fformUnid=)[\w]*|(&funid=)[\w]*/ig,"");
						//alert(parm+"&fformUnid="+cfg.mainUnid+"&funid="+unid);
						if(oFlwDiv.innerHTML=="")
							initJspView(contents[i],divId,parm+"&fformUnid="+cfg.mainUnid+"&funid="+unid,true,true,true);
						break;
					}
					case "04"://日志
						break;
					case "05"://意见
						var requestConfig = {
							//url:appPath+ucapSession.baseAction,
							url:ucapSession.baseAction,
							params:'type=getOpinion&unid='+unid,
							callback:function(options,success,response){
									
									if (success){
									var opinion = Ext.util.JSON.decode(response.responseText);
									if(!opinion)return;
									var exjson = Ext.decode(opinion);
									var exResult=ucapCommonFun.dealException(exjson);
									if(!exResult)return;
									
									var sHtml='<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" class="opndoc">';
									if (typeof(opinion) != "undefined" && opinion != null && opinion != "") {
									for(var i=0; i<opinion.length; i++)
										{
											sHtml +='<TR><TD class="head">'+opinion[i].opinionName+'</TD></TR>';
											sHtml +='<TR><td><div class="rzt">'+opinion[i].opinionContent+'</div>';
											sHtml +=' <div class="footnote"><span class="opnblue">'+opinion[i].transactorBelongName+'   </span><span class="opngreen">';
											sHtml +=opinion[i].transactorName+'</span>'+opinion[i].transactTime+'</div> </td>';
											sHtml +='</tr>';
										}		
									}								
									sHtml +='</TABLE>';	
							 		oFlwDiv.innerHTML=sHtml;
									}else{
											Ext.Msg.alert("保存提示","文档保存失败!");
									}
						        }
						    }
				    	Ext.Ajax.request(requestConfig);
						break;
					case "06"://监控
						oDiv[n].style.display = "block";
						var instanceUnid = ucapGetUrlParameter("instanceUnid");
						if(!instanceUnid){
							alert("系统提示：非流程文档无监控信息!");
							return;
						}
						var src = appPath+"CreateImage?";
						src+="docUnid="+unid;
						src+="&instanceUnid="+instanceUnid+"&"+ucapCommonFun.getRandomString();
						if(oFlwDiv.firstChild.innerHTML=="" && unid){
							_UcapForm.tool.complieTmp(_UcapForm.cfg.htmlTmpStr.ucap_img,oFlwDiv.firstChild,{"id":"ucap_img","src":src});
						}
						//alert(oFlwDiv.firstChild.innerHTML);
						//alert(oFlwDiv.innerHTML);
						break;
					case "07"://打開JSP
						if(Ext.getDom(divId).innerHTML==""){
							//oDiv[n].style.display = "block";
							var el = Ext.get(divId);
							var mgr = el.getUpdater();
							var sUrl = appPath+contents[i];
							var parm = location.href.replace(/^[^?]*\?/,"");
							mgr.update({
						        url: sUrl,
						        params:parm,
						        scripts:true
							});
						}						
						break;
					case "08":{//普通附件
						if(!oFlwDiv.firstChild.innerHTML && unid){
							var punid = unid,docType = 0;//普通附件
							var panel = new Ext.Panel({
								//title: '模板配置列表',
								//width:800,
								height:300,
								tbar: [
									 {text: '刷新',handler: function(){ucap_attr_fun.getInfo(docType,punid);}},
						             {text: '上传附件',handler: function(){
						                	var sType=3;
						                	_UcapForm.ucapForm.templateCfg(sType,punid,docType);
						                }}
						        ],
						        html:'<div id="ucap_attr_div'+docType+'"></div>',
						        //autoLoad:{url:appPath+"testjc.html",scripts:true,nocache: true},
							    renderTo: oFlwDiv.firstChild
							});
							
							ucap_attr_fun.getInfo(docType,punid);
						}
						break;
					}
					case "09":{//模板配置
						if(!oFlwDiv.firstChild.innerHTML && unid){
							var punid = unid,docType = 1;//模板配置
							var panel = new Ext.Panel({
								//title: '模板配置列表',
								//width:800,
								tbar: [
									 {text: '刷新',handler: function(){ucap_attr_fun.getInfo(docType,punid);}},
						             {text: '上传正文',handler: function(){
						                	var sType=0;
						                	_UcapForm.ucapForm.templateCfg(sType,punid,docType);
						                }},
						            {text: '上传办理单',handler: function(){
						                	var sType=1;
						                	_UcapForm.ucapForm.templateCfg(sType,punid,docType);
						                }}
						        ],
						        html:'<div id="ucap_attr_div'+docType+'"></div>',
						        //autoLoad:{url:appPath+"testjc.html",scripts:true,nocache: true},
							    renderTo: oFlwDiv.firstChild
							});
							
							ucap_attr_fun.getInfo(docType,punid);
						}
						break;
					}
					default:{//表、显示表单【01,02】
						this.initAjax(unid,t,contents[i],true);
					}
				}
			}
		}catch(e){}
		var tag = Ext.query('li',"showMenu"); 
		for(var i=0; i<tag.length; i++){ 
			tag[i].className = ""; 
		} 
		tag[n].className = "showMenuHover";
		for(i=0;i<oDiv.length; i++){ 
			if(i==n)oDiv[n].style.display = "block";
			else oDiv[i].style.display = "none";
		} 
		
	};
	returnForm.templateCfg = function(sType,punid,docType,split){
		var win = new Ext.Window({
			id	:	"ucap_win_templatecfg",
		    title  :ucapSession.win.winImg+'文件上传',
		    width:500,
		    height:300,
		    closable:true,
		    plain: true,
		    modal:true,
		  //  bodyStyle:ucapSession.win.winBodyStyle,
		    autoLoad:{url:appPath+'plus/fileUpload.html?'+ucapCommonFun.getRandomString(),
		    			scripts:true,nocache: true},
		    buttons: [{
		    	id:'uploadButton',
		        text:'开始上传',
		        type:'submit',
		        //disabled:true,
		        handler:function(){
		        	if(!split)split="~!~";
		        	var fnames = Ext.query("input[id=fileName]");
					var captions = "";
					for(var k=0;k<fnames.length-1;k++){
						if(fnames[k].value==""){
							captions+=escape("无标题")+split;
						}else{
							captions+=escape(fnames[k].value)+split;
						}
					}
		        	var pbar2 = new Ext.ProgressBar({
						text:'Ready',
						id:'pbar2',
						cls:'left-align',
						renderTo:'progressBar'
					});
		
					var btn2 = Ext.get('uploadButton');
					//btn2.on('click', function(){
						Runner.run(pbar2, btn2, 100, function(){
						    pbar2.reset();
						    pbar2.updateText('上传成功!');
						},sType,punid,docType);
					//});

					captions = captions.replace(/(~!~)$/,"");
					captions = escape(captions);
					Ext.getDom("fileUploadForm").action = "BackGroundService.upload?docType="+docType
									+"&punid="+punid+"&captions="+captions+"&split="+split+"&type="+sType;
					Ext.getDom("fileUploadForm").target="upload_hidd"
					Ext.getDom("hidd_fileUploadForm_submit").click();
		        }
		    },{
		    	id:'cancelUploadButton',
		        text: '关闭',
		        handler: function(){
		            win.close();
		            ucap_attr_fun.getInfo(docType,punid);
		        }
		    }]
		});
		win.show();
		
	}
	returnForm.error = function(sid,serror){
		var obj = Ext.get(sid);
		if(obj)obj.update('<div class="red" align="center">'+serror+'</div>');
	}
	returnForm.a = function(s){
		Ext.Msg.alert(s);
	}
	return returnForm;
}();
/**
 * 附件、模板上传功能
 * @type 
 */
var ucap_attr_fun = {
	getInfo : function(docType,punid){
		Ext.Ajax.request({
			url:appPath+'GetAttrInfo?act=info&docType='+docType+'&punid='+punid+'&type=-1&'+ucapCommonFun.getRandomString(), 
			success : function(a) { 
				Ext.getDom("ucap_attr_div"+docType).innerHTML="";
				var jsonData = Ext.decode(a.responseText);
				var data = [];
				if(a.responseText!="[null]")
				for(var jd=0;jd<jsonData.length;jd++){
					var _d=[];
					var jdd = jsonData[jd];
					_d[0] = jdd["caption"]||('<a href="javascript:void(0);" onclick="ucap_attr.onconfig(\''+jdd["cfgUnid"]+'\')">'+jdd["cfgCaption"]+'&#160;</a>');
					_d[1] = (jdd["fileName"]||jdd["cfgFileName"]).replace(/(\w*:[\\|\/]\w*[\\|\/])/ig,"");
					_d[2] = jdd["type"]||jdd["cfgType"];;
					switch(_d[2]){
						case "0":_d[2]="正文";break;
						case "1":_d[2]="办理单";break;
						default : _d[2]="其它";break;
					}
					_d[3] = (parseInt((jdd["size"]||jdd["cfgSize"])/1024/10.24)/100)||0.01;
					_d[4] = jdd["created"]||jdd["cfgCreated"];;
					_d[5] = '<a href="javascript:void(0);" onclick="ucap_attr_fun.downFile(\''+docType+'\',\''+(jdd["unid"]||jdd["cfgUnid"])+'\')">下载</a>&#160;&#160;' +
							'<a href="javascript:void(0);" onclick="ucap_attr_fun.delFile(\''+docType+'\',\''+(jdd["unid"]||jdd["cfgUnid"])+'\',\''+(jdd["punid"]||jdd["cfgPunid"])+'\')">删除</a>';
					data[jd] = _d;
				}
				//Ext.QuickTips.init();
			    var xg = Ext.grid;
			    // shared reader
			    var reader = new Ext.data.ArrayReader({}, [
			       {name: '文件标题'},
			       {name: '文件名称'},
			       {name: '类型'},
			       {name: '文件大小(M)',type: 'float'},
			       {name: '上传时间'},
			       {name: '操作'}
			    ]);
			    //var sm = new xg.CheckboxSelectionModel();
			    var grid2 = new xg.GridPanel({
			        store: new Ext.data.Store({
			            reader: reader,
			            data: data
			        }),
			        viewConfig: {
			            forceFit:true
			        },
			        cm: new xg.ColumnModel([
			            //sm,
			        	new xg.RowNumberer(),
			            {id:'caption',header: "文件标题", width: 200, sortable: true, dataIndex: '文件标题'},
			            {id:'fileName',header: "文件名称", width: 100, sortable: true, dataIndex: '文件名称'},
			            {id:'type',header: "类型", width: 50, sortable: true, dataIndex: '类型'},
			            {id:'size',header: "文件大小(M)", width: 120, sortable: true, dataIndex: '文件大小(M)'},
			            {id:'created',header: "上传时间", width: 200, sortable: true, dataIndex: '上传时间'},
			            {header: "操作", width: 80, sortable: true, dataIndex: '操作'}
			        ]),
			        //sm: sm,
			        bodyStyle:'width:100%',
	    			autoWidth:true,
	    			//frame:true,
			        renderTo: Ext.getDom("ucap_attr_div"+docType)
			    });
			 }
		});
	},
	downFile:function(docType,unid){
		window.open(appPath+'GetAttrInfo?act=down&docType='+docType+'&unid='+unid+'&type=-1&'+ucapCommonFun.getRandomString());
	},
	delFile:function(docType,unid,punid){
		Ext.Msg.confirm("系统提示","警告:删除后将无法恢复！您确定要删除些文件？",
		function(flag){
			if(flag=="yes")
			Ext.Ajax.request({
				url:appPath+'AttrUpload?docType='+docType+'&unid='+unid+'&stateType=3&'+ucapCommonFun.getRandomString(), 
				success : function(a) { 
					ucap_attr_fun.getInfo(docType,punid);
				 }
			});
		});
	}
}
/**
 * 表单基础函数
 * @type 
 */
var _UcapFormFun = {
	/**
	 * 创建默认的HTML表单
	 */
	createHTML : function(){
		Ext.Msg.confirm("系统提示","确定要生成HTML文件吗？这将会覆盖原有的HTML页面！！！",function(yn){if(yn=="yes"){
			var formId = ucapCommonFun.getUrlParameter("unid");
			var requestConfig = {
				url:ucapSession.baseAction,
				params:{"type":"CreateHtmlAction","unid":formId},
				//jsonData:json,
				callback:function(options,success,response){
					
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if(callBackFn && "string"!=callBackFn && callBackFn!=""){
						ucapCommonFun.evalJavaScript(callBackFn+"(response.responseText);");
					}else{
						if(Ext.encode(response.responseText).indexOf("true")>-1){
							Ext.Msg.alert("提示","生成HTML页面成功！");
						}else{
							Ext.Msg.alert("提示","生成HTML页面失败！");
						}
					}
				}
			}
			Ext.Ajax.request(requestConfig);
		}});
	},
	/**
	 * 联动绑定事件
	 * @param {} o 单击的对象
	 * @param {} oid 选择后要设置值的input的name
	 * @param {} a
	 * @param {} b
	 * @param {} c 选择框类型  比如：20
	 * @param {} d 类型对应的值 比如：202
	 * @param {} e 是否要隐藏 input
	 * @param {} f 是否单多值 1单值 0 多值
	 */
	fn:function(o,oid,a,b,c,d,e,f){
		var obj = Ext.getDom(oid);
		var obj_Cn_ = Ext.getDom(oid+"_Cn_");
		var obj_btn = Ext.getDom("btn_"+oid);
		if(o){	
			if(obj)obj.style.display=a;
			if(obj_Cn_)obj_Cn_.style.display=b;
			if(obj_btn)obj_btn.style.display=b;
			obj.setAttribute("sourceType",c);
			obj.setAttribute("source",d);
			if(typeof f=="undefined") f= 1;
			obj.setAttribute("isSingle",f!=1?"0":f);
			obj.setAttribute("nameEn",obj.id);
			obj.setAttribute("dictionaryType","03");
			if(e)_UcapForm.tool.embellishForm(obj);
		}
	},
	/**
	 * 用于表单字段显示属性与表单字段中的所属的表单主键关联
	 */
	setShowFormUnid : function(){
		try{
			var unid = ucapCommonFun.getUrlParameter("unid");
			var funid = "";
			if(!unid){
				funid = ucapCommonFun.getUrlParameter("funid");
			}else{
				funid = Ext.getDom("fitem_form_unid").value;
			}
			Ext.getDom("show_form_unid").value = funid;
		}catch(e){}
	},
	/**
	 * 用户管理_用户-新建时设置URL上的部门UNID
	 */
	setUserDeptsUnid : function(){
		try{
			var deptUnid = ucapCommonFun.getUrlParameter("deptUnid");
			var obj = Ext.getDom("user_depts");
			var objCn = Ext.getDom("user_depts_Cn_");
			if(obj){
				obj.value = deptUnid;
				if(objCn)objCn.value = deptUnid;
			}
		}catch(e){}
	},
	/**
	 * 文章_文章新建时，设置URL上的栏目UNID
	 */
	setColumnsUnid : function(){
		try{
			var funid = ucapCommonFun.getUrlParameter("funid");
			var fcn = ucapCommonFun.getUrlParameter("fcn");
			var obj = Ext.getDom("article_columns_unid");
			var objCn = Ext.getDom("article_columns_unid_Cn_");
			if(obj){
				obj.value = funid;
				if(objCn)objCn.value = fcn;
			}
		}catch(e){}
	},
	/**
	 * 视图配置-视图来源类型单击事件
	 * @param {} o
	 */
	viewSourceTypeClick:function(o){
		var oid = "view_source_unid";
		if(o){
			var v = o.value+"";
			switch(v){
				case "01":
					this.fn(o,oid,"none","","20","222","1");
					break;
				case "02":
					this.fn(o,oid,"none","","20","224","1");
					break;
				default:this.fn(o,oid,"","none","","");break;
			}
		}
	},
	/**
	 * 视图配置-表单类型单击事件
	 * @param {} o
	 */
	viewFormTypeClick:function(o){
		var oid = "view_form_unid";
		if(o){
			var v = o.value+"";
			switch(v){
				case "01":
					this.fn(o,oid,"none","","20","222",1);
					break;
				case "02":
					this.fn(o,oid,"none","","20","221",1);
					break;
				case "03":
					this.fn(o,oid,"none","","20","226",1);
					break;
			}
		}
	},
	/**
	 * 表单字段配置-输入来源类型
	 * @param {} o
	 */
	fitemSourceTypeClick:function(o){
		var oid = "fitem_source";
		var fcm = $("fitem_column_map").parentNode.parentNode;
		if(o){
			var v = o.value+"";
			switch(v){
				case "02":
					this.fn(o,oid,"none","","20","218",1);
					fcm.style.display="";
					break;
				case "03":
					this.fn(o,oid,"none","","03","",1);
					fcm.style.display="none";
					break;
				default:
					this.fn(o,oid,"","none","","",1);
					fcm.style.display="none";
					//if(v!="01" && v!="07" && v!="20")$(oid).readOnly=true;
					break;
			}
		}
	},
	/**
	 * 表单字段配置-默认值类型
	 * @param {} o
	 */
	fitemDefaultTypeClick:function(o){
		var obj = Ext.getDom("fitem_default_value");
		var obj_Cn_ = Ext.getDom("fitem_default_value_Cn_");
		var obj_btn = Ext.getDom("btn_fitem_default_value");
		if(o){
			var fn = function(a,b,c,d,e){			
				obj.style.display=a;
				obj.setAttribute("sourceType",c);
				obj.setAttribute("source",d);
				obj.setAttribute("dictionaryType","03");
				obj.setAttribute("isSingle","1");
				obj.setAttribute("nameEn",obj.id);
				if(e)_UcapForm.tool.embellishForm(obj);
				if(obj_Cn_)obj_Cn_.style.display=b;
				if(obj_btn)obj_btn.style.display=b;
			};
			var v = o.value+"";
			switch(v){
				case "03":
					try{
						fn("none","","03",Ext.getDom("fitem_source").value,"1");
					}catch(e){
						_UcapFormFun.fitemDefaultTypeClick(o);
					}
					break;
				case "02" :
					fn("none","","20","208","1");
					break;
				//case "20":
					//fn("none","","20","222","1");
					//break;
				default:fn("","none","","");break;
			}
		}
	},
	/**
	 * 视图查询-对应表来源类型
	 * @param {} o
	 */
	queryFormTypeClick:function(o){
		var oid = "query_form_unid";
		if(o){
			var v = o.value+"";
			switch(v){
				case "01":
					this.fn(o,oid,"none","","20","222");
					break;
				case "02":
					this.fn(o,oid,"none","","20","221");
					break;
				case "03":
					this.fn(o,oid,"none","","20","226");
					break;
			}
		}
	},
	/**
	 * 频道配置-频道样式
	 * @param {} o 事件源对象
	 * @param {} c 是否触发来源类型的单击事件[没有或false时触发]
	 */
	channelStyleClick:function(o,c){
		var objId = "channel_source_type";
		if(o){
			var fn = function(a,b){
				var all = Ext.query("input[id="+objId+"][value=04],[id="+objId+"][value=05]");
				var dall = Ext.query("input[id="+objId+"][value!=04][value!=05]");
				for(var i=0;i<all.length;i++){
					all[i].setAttribute("disabled",a);
					if(!c && b && i==0)all[i].click();
				}
				for(var i=0;i<dall.length;i++){
					dall[i].setAttribute("disabled",b);
					if(!c && a && i==0)dall[i].click();
				}
			};
			var v = o.value+"";
			switch(v){
				case "01":
				case "02":
				case "03":
					fn(true,false);
					break;
				default:fn(false,true);break;
			}
		}
	},
	/**
	 * 频道配置-数据来源类型
	 * @param {} o
	 */
	channelSourceTypeClick:function(o){
		var csId = "channel_style";
		var csobj = Ext.query("input:checked[id="+csId+"]");
		this.channelStyleClick(csobj[0],true);
		if(o){
			var v = o.value+"";
			var oid = "channel_source";
			switch(v){
				case "01":
					this.fn(o,oid,"none","","20","218",1);
					break;
				case "05":
					this.fn(o,oid,"none","","20","209",1);
					break;
				default:this.fn(o,oid,"","none","","");break;
			}
		}
	},
	/**
	 * 设计管理系统界面方案-首页类型
	 * @param {} o
	 */
	schemeIndexTypeClick:function(o){
		var oid = "scheme_index";
		if(o){
			var v = o.value+"";
			switch(v){
				case "02":
					try{
						this.fn(o,oid,"none","","20","215",1);
					}catch(e){
						this.schemeIndexTypeClick(o);
					}
					break;
				default:this.fn(o,oid,"","none","","");break;
			}
		}
	},
	/**
	 * 界面配置_快捷方式-类型
	 * @param {} o
	 */
	shortcutTypeClick:function(o){
		var oid = "shortcut_content";
		if(o){
			var v = o.value+"";
			switch(v){
				case "01":
					this.fn(o,oid,"none","","20","215",1);
					break;
				case "02":
					this.fn(o,oid,"none","","20","218",1);
					break;
				case "03":
					this.fn(o,oid,"none","","20","220",1);
					break;
				default:this.fn(o,oid,"","none","","");break;
			}
		}
	},
	/**
	 * 数据库视图配置-显示表单类型
	 * @param {} o
	 */
	dbviewDisplayFormTypeClick:function(o){
		var oid = "dbview_display_form_unid";
		if(o){
			var v = o.value+"";
			switch(v){
				case "01":
					this.fn(o,oid,"none","","20","221",1);
					break;
				case "02":
					this.fn(o,oid,"none","","20","226",1);
					break;
				default:this.fn(o,oid,"","none","","");break;
			}
		}
	},
	/**
	 * 设计管理_固定查询-固定查询来源
	 * @param {} o
	 */
	fixedquerySourceTypeClick:function(o){
		var oid = "fixedquery_source";
		if(o){
			var v = o.value+"";
			switch(v){
				case "01":
					this.fn(o,oid,"none","","20","218",1);
					break;
				case "02":
					this.fn(o,oid,"none","","20","222",1);
					break;
				default:this.fn(o,oid,"","none","","");break;
			}
		}
	},
	/**
	 * 页签配置-页签类型
	 * @param {} o
	 */
	tabTypesClick:function(o){
		var oid = "tab_contents";
		var v = o.value+"";
		switch(v){
			case "01":
				this.fn(o,oid,"none","","20","222",1);
				break;
			case "02":
				this.fn(o,oid,"none","","20","221",1);
				break;
			case "03":
				this.fn(o,oid,"none","","20","218",1);
				break;
			default:this.fn(o,oid,"","none","","");break;
		}
	},
	/**
	 * 组合表单配置-主表单类型
	 * @param {} o
	 */
	cformMainFormTypeClick:function(o){
		var oid = "cform_main_form";
		var v = o.value+"";
		switch(v){
			case "01":
				this.fn(o,oid,"none","","20","222",1);
				break;
			case "02":
				this.fn(o,oid,"none","","20","221",1);
				break;
			default:this.fn(o,oid,"","none","","");break;
		}
	},
	/**
	 * 按钮类型变更
	 * @param {} o
	 */
	butonTypeClick:function(o){
		var oid = "button_code";
		var v = o.value+"";
		switch(v){
			case "02":
			//扩展功能
				this.fn(o,oid,"none","","20","227",1);
				break;
			case "03":
				//流程
				this.fn(o,oid,"none","","20","999",1,0);
				break;
			default:this.fn(o,oid,"","none","","");break;
		}
	},
	/**
	 * 视图配置-提示信息类型
	 * @param {} o
	 */
	viewMessageTypeClick:function(o){
		var obj = Ext.getDom("view_message");
		var obj_Cn_ = Ext.getDom("view_message_Cn_");
		var obj_btn = Ext.getDom("btn_view_message");
		if(o){
			var fn = function(a,b,c,d,e,f){			
				obj.style.display=a;
				obj.setAttribute("sourceType",c);
				obj.setAttribute("source",d);
				obj.setAttribute("dictionaryType","03");
				obj.setAttribute("isSingle",f);
				obj.setAttribute("conValue","view_source_unid");
				obj.setAttribute("nameEn",obj.id);
				if(e)_UcapForm.tool.embellishForm(obj);
				if(obj_Cn_)obj_Cn_.style.display=b;
				if(obj_btn)obj_btn.style.display=b;
			};
			var v = o.value+"";
			switch(v){
				case "02":
					try{
						fn("none","","20","223","1","0");
					}catch(e){
						_UcapFormFun.viewMessageTypeClick(o);
					}
					break;
				case "03" :
					fn("none","","20","227","1",1);
					break;
				default:fn("","none","","");break;
			}
		}
	},
	/**
	 * 将有联动效果的相关字段进行值转换
	 * @param {} o
	 * {id:"",map:{"radio中的值1":"通用选择框值1"},enObj:"源对象",cnObj:"目标对象"}
	 */
	initRadioToCnValue:function(o){
		var obj = o||{};
		var map = obj.map;
		var enObj = obj.enObj;
		var cnObj = obj.cnObj||Ext.getDom(enObj.id+"_Cn_");
		if(!obj.id || !map || !enObj || !enObj.id || !cnObj)return false;
		var path='input:checked[id='+obj.id+']';
		var objs = Ext.DomQuery.select(path);
		var radioValue;
		if(objs && objs.length>0) radioValue = objs[0].value;
		var mapV = map[radioValue];
		//alert(radioValue+":"+mapV);
		if(mapV){
			var dictUnid = enObj.getAttribute("source")||"";
			var cnv = ucapCommonFun.getDisplayNames(mapV,enObj.value,dictUnid);
			cnObj.value = cnv||enObj.value||"";
			//alert(cnv+"::"+cnObj.value);
		}
	},
	buttonOpenDocSetCn:function(){
		this.initRadioToCnValue({
			id:"button_code_type",
			map:{"03":"999","02":"227"},
			enObj:Ext.getDom("button_code")
		});
	},
	/**
	 * 字段基本信息初始化
	 */
	initFitem:function(){
		this.initRadioToCnValue({
			id:"fitem_source_type",
			map:{"03":"204","02":"218"},
			enObj:Ext.getDom("fitem_source")
		});
		this.initRadioToCnValue({
			id:"fitem_default_type",
			map:{"02":"208","03":"204"},
			enObj:Ext.getDom("fitem_default_value")
		});
	},
	/**
	 * 数据库视图配置信息初始化
	 */
	initDbView:function(){
		this.initRadioToCnValue({
			id:"dbview_display_form_type",
			map:{"01":"221","02":"226"},
			//enObj:Ext.getDom("fitem_source_Cn_"),
			enObj:Ext.getDom("dbview_display_form_unid")
		});
	},
	initView:function(){
		this.initRadioToCnValue({
			id:"view_message_type",
			map:{"02":"223","03":"227"},
			//enObj:Ext.getDom("fitem_source_Cn_"),
			enObj:Ext.getDom("view_message")
		});
	},
	initViewItemType:function(){
		this.initRadioToCnValue({
			id:"itemType",
			map:{"02":"204"},
			//enObj:Ext.getDom("fitem_source_Cn_"),
			enObj:Ext.getDom("itemValue")
		});
	}
}


/**
 * wrod控件
 * 如果要在word中配置将url中的图片展示出来可以用
 * ctrl+F9然后把域配置在{}中
 * @type 
 */
var ucap_attr = {
	//默认的json
	json:{
		appUnid:"",
		userUnid:"",    //用户ID
		userName:"",    //用户中文名称
		userDept:"",    //用户部门(中文名称)
		actionType:"0",  //操作类型
		isMht:"1",       //是否同步生成mht格式文件
		isRead:"1",      //是否只读
		isCopy:"1",      //是否可以复制
		isSaveAs:"1",    //是否可以另存
		isPrint:"1",     //是否可以打印
		countPrint:"0",  //最多可以打印的次数
		isHideRevision:"1",  //是否查看痕迹
		punid:"",       //源UNID(表单UNID、文档UNID)
		unid :"",       //附件UNID
		cfgUnid:"",   //模板的UNID
		fileName:"",    //附件名称
		attrType:"0",    //附件类型
		stateType:"2",    //附件状态
		docType:"1",		//文档类型[普通0,配置1]
		caption:"",
		filePath:"",
		isShowList:true
	},
	/**
	 * 意见配置源
	 * @type 
	 */
	optionCfg:{
		0:"意见1,意见2,意见3,意见4,意见5,意见6,意见7,意见8",
		1:"opinion_name1,opinion_name2,opinion_name3,opinion_name4,opinion_name5,opinion_name6,opinion_name7,opinion_name8"
	},
	/**
	 * 意见数据源
	 * @type 
	 */
	optionSource:{
		0:"",
		1:""
	},
	/*	actionType
	 * "0";//查看
	 * "1";//起草
	 * "2";//批阅
	 * "3";//生成
	 * "10";//配置
	 * "11";//打印
	 * 
	 */
	onlook:function(){
		ucap_attr.open({"punid":ucapCommonFun.getUrlParameter("unid"),"actionType":0});
	},
	/**
	 * 起草正文
	 */
	ondraft:function(){
		ucap_attr.open({
			"punid":ucapCommonFun.getUrlParameter("unid"),
			"actionType":1,
			"isShowList":true
							});
	},
	/**
	 * 生成正文
	 */
	onfinalize:function(){
		ucap_attr.open({"punid":ucapCommonFun.getUrlParameter("unid"),"actionType":3
							});
	},
	/**
	 * 配置模板
	 * @param {} attrUnid 是实际附件的attrUnid
	 */
	onconfig:function(attrUnid){
		ucap_attr.open({"actionType":10,
								"punid":ucapCommonFun.getUrlParameter("unid"),
								"docType":1,
							"unid":attrUnid
							});
	},
	/**
	 * 打印办理单
	 */
	onprint:function(){
		ucap_attr.open({"punid":ucapCommonFun.getUrlParameter("unid"),"actionType":11,"attrType":1
							});
	},
	//获取基本信息并启动
	/**
	 * 
	 * @param {} json
	 * @param {} Interface
	 * @param {} arg  其中的UNID是用来下载用，可能是模板的UNID，实际要保存的附件UNID是在json.unid中
	 */
	setWordInfoConfig:function(json,Interface,arg){
	   //上传的URL
		var GetWordInfoConfig = {
			url:ucapSession.baseAction,
			params:{"type":"getWordInfo"},
			jsonData:json,
			callback:function(options,success,response){
				if(success){
					//获取基本信息
					var rjson = Ext.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(rjson);
					if(!exResult)return;
					var url = ucapSession.hostPath+appPath+'AttrUpload?docType='+json["docType"]+
							'&stateType='+json["stateType"]+
							'&caption='+json["caption"]+
							'&punid='+json["punid"]+
							'&attrType='+json["attrType"]+
							'&appUnid='+rjson["appUnid"]+
							'&unid='+json["unid"];
					rjson["upUrl"]=url+'&fileName='+(arg["fileName"]||json["fileName"])+'&isMht='+rjson["isMht"];
					//rjson["mhtUrl"]=url+'&fileName='+(arg["fileName"]||json["fileName"]).replace(/(.doc)$/g,".mht");
					//alert(rjson["mhtUrl"]);
					rjson = Ext.encode(rjson);	
					//进行状态的设置
					//rjson["docType"]="1";
					//
					Interface.FileName="processing.lw";
					Interface.SaveCfgTxt(rjson);
					//获取模板
					var sUrl = ucapSession.hostPath+appPath+'GetAttrInfo?act=down&docType='+(arg["docType"]||json["docType"])+'&unid='+(arg["unid"]||json.unid);
					Interface.FileName=json.fileName;
					Interface.DownloadAttr(sUrl);
					
					//打开模板
					Interface.Launch();
				}
			}
		};
		Ext.Ajax.request(GetWordInfoConfig);
	},
	//获取域配置数据源
	/**
	 * 
	 * @param {} json 配置信息
	 * @param {} Interface VB对象
	 */
	setWordFormCfg:function(json,Interface){
		//alert(Ext.encode(json))
		var GetWordFormCfg = {
				url:ucapSession.baseAction,
				params:{"unid":json.punid,"type":"getWordForm"},
				jsonData:json,
				callback:function(options,success,response){
					if(success){
						//alert(response.responseText);
						var result_0 = "";
						var result_1 = "";
						var rjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(rjson);
						if(!exResult)return;
						for (var i = 0; i < rjson.length; i++) {
							var r = rjson[i];
							result_0 += r["nameCn"].replace(/,/g,"")+",";
							result_1 += r["nameEn"].replace(/,/g,"")+",";
						}
						result_0 += ucap_attr.optionCfg[0].replace(/(,)$/g,"");
						result_1 += ucap_attr.optionCfg[1].replace(/(,)$/g,"");
						Interface.FileName= json.unid+"_source.lw";
						Interface.SaveCfgTxt(result_0+";"+result_1);
						json.fileName = json.unid+".doc";
						//获取基本信息并打开文件
						ucap_attr.setWordInfoConfig(json,Interface,{});
					}
				}
			};
			Ext.Ajax.request(GetWordFormCfg);
	},
	//获取意见数据源
	//isForm是否同步获取表单数据源
	/**
	 * 
	 * @param {} json
	 * @param {} Interface
	 * @param {} isWFS
	 * @param {} isWIC
	 * @param {} fn
	 * @param {} arg
	 */
	setWordOpinionSource:function(json,Interface,isWFS,isWIC,fn,arg){
		var unid = json.punid;
		var esc = ucap_attr.attr_escapeStr;
		//获取意见数据源
			var GetWordOpinionSource = {
				url:ucapSession.baseAction,
				//unid,文档UNID
				params:{"act":"2","unid":unid,"type":"getWordForm"},
				jsonData:json,
				callback:function(options,success,response){
					if(success){
						//alert(response.responseText);
						//[{"opinion_name":"发送时意见","opinion_content":"wwwwwwww","opinion_type":"1","opinion_transactor_name":"","opinion_tran_dept_name":"南威公司","opinion_transact_time":"2009-05-12 15:44:16"}]
						var c = {
							0:"opinion_name",
							1:"opinion_type",
							2:"opinion_content",
							3:"opinion_transactor_name",
							4:"opinion_tran_dept_name",
							5:"opinion_transact_time"
						};
						
						var rjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(rjson);
						if(!exResult)return;
						ucap_attr.optionSource[0]="";
						ucap_attr.optionSource[1]="";
						if(rjson && rjson!=null)
						for(var i=0;i<rjson.length;i++){
							var result_0 = "";
							var result_1 = "";
							var rj = rjson[i];
							if(i==0){
								result_0 += c[0]+rj[c[1]]+""
								result_1 +=esc(rj[c[0]])+"\n"
											+  esc(rj[c[2]])+"\n"
											+  esc(rj[c[3]])+"\t"
											+  esc(rj[c[4]])+"\t"
											+  esc(rj[c[5]])+"\n";
								if(i==rjson.length-1){
									ucap_attr.optionSource[0]+=result_0;
									ucap_attr.optionSource[1]+=esc(result_1);
								}
							}else{
								if(rj[c[i-1]]==rj[c[i]]){
									result_1 +=esc(rj[c[2]])+"\n"
												+  esc(rj[c[3]])+"\t"
												+  esc(rj[c[4]])+"\t"
												+  esc(rj[c[5]])+"\n";
									if(i==rjson.length-1){
										ucap_attr.optionSource[0]+=result_0;
										ucap_attr.optionSource[1]+="\n"+esc(result_1);
									}
								}else{
									ucap_attr.optionSource[0]+=result_0;
									ucap_attr.optionSource[1]+="\t"+esc(result_1);
									result_0 = "\t"+c[0]+rj[c[1]]
									result_1 = esc(rj[c[0]])+","
												+  esc(rj[c[2]])+","
												+  esc(rj[c[3]])+","
												+  esc(rj[c[4]])+","
												+  esc(rj[c[5]])+"";
								}
							}
							//alert(ucap_attr.optionSource[0]+ucap_attr.optionSource[1]);
						}
						//获取表单数据源
						if(isWFS)ucap_attr.setWordFormSource(json,Interface,isWIC,fn,arg);
					}
				}
			};
			Ext.Ajax.request(GetWordOpinionSource);
	},
	//获取表单数据源
	setWordFormSource:function(json,Interface,isWIC,fn,arg){
		var esc = ucap_attr.attr_escapeStr;
		var GetWordFormSource = {
				url:ucapSession.baseAction,
				//unid,文档UNID
				params:{"act":"1","unid":json.punid,"formUnid":_UcapForm.cfg.mainUnid,"type":"getWordForm"},
				jsonData:json,
				callback:function(options,success,response){
					if(success){
						//alert(response.responseText);
						var result_0 = "";
						var result_1 = "";
						var rjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(rjson);
						if(!exResult)return;
						rjson = rjson[0];
						for(fkey in rjson){
							result_0 += fkey.replace(/\t/g,"")+"\t";
							result_1 += esc(rjson[fkey])+"\t";
						}
						result_0 += ucap_attr.optionSource[0].replace(/(,)$/g,"");
						result_1 += ucap_attr.optionSource[1].replace(/(,)$/g,"");
						Interface.FileName= json.unid+".lw";
						Interface.SaveCfgTxt(result_0+"\n"+result_1,"1");
						//alert(result_0.replace(/(\t)$/g,"")+"\n"+result_1.replace(/(\t)$/g,""));
						//return;
						//获取基本信息并打开文件
						if(isWIC)ucap_attr.setWordInfoConfig(json,Interface);
						if(fn)fn(json,Interface,arg);
					}
				}
			};
			Ext.Ajax.request(GetWordFormSource);
	},
	/*
	 * 配置、起草、批阅、打印
	 */
	open:function(arg){		
		var json = {};
		Ext.apply(json,ucap_attr.json||{});
		Ext.apply(json,arg||{});

		if ( ( typeof (json.actionType)=="undefined")){
			Ext.Msg.alert("提示信息","打开WORD的actionType不能为空！");
			return;
		}
		//创建VB中的接口
		var Interface = null;
		try{
			Interface = new ActiveXObject("ucapWord.Interface");
		}catch(e){
			Ext.Msg.alert("系统提示：","系统检测：您当前未安装ucap相关控件！");
			return;
		}
		if(json["actionType"]=="10"){
			//获取配置数据源
			ucap_attr.setWordFormCfg(json,Interface);
		}else{
			//获取word列表[查看、起草、批阅、生成、打印]
			//alert(_UcapForm.cfg.mainUnid);
			var GetWordListCfg = {
				url:appPath+'GetAttrInfo', 
				params:{"punid":json.punid,"funid":_UcapForm.cfg.mainUnid,"act":"list","type":json["attrType"]},
				callback:function(options,success,response){
					if(success){
						
						var rjson = Ext.decode(response.responseText);						
						var exResult=ucapCommonFun.dealException(rjson);
						if(!exResult)return;
						
						var rlen = rjson.length;
						var attrUnid;
						var docType;
						if(rlen==1){
							if(rjson[0]==null){
								Ext.Msg.alert("系统提示","未配置模板！");
								return;
							}
							//直接打开word
							attrUnid = rjson[0]["unid"];
							if(attrUnid){
								//说明是旧文档打开
								json["stateType"]="2"; //update
								json.unid =attrUnid;
								docType ="0";
							}else{
								if(json["actionType"]==0){
									Ext.Msg.alert("系统提示","没找到相关文件！");
									return;
								}
								//说明是根据模板起草的文档
								attrUnid = rjson[0]["cfgUnid"];
								json["stateType"]="1"; //insert
								var win = new ActiveXObject("Linewell.Windows");
								json.unid  = win.GetUNID();
								docType ="1";
							}
							json["fileName"]=json.unid +".doc";
							json["caption"]=rjson[0]["caption"]||rjson[0]["cfgCaption"];
							json["attrType"]="0";
							json["docType"]="0";
							ucap_attr.setWordOpinionSource(json,Interface,1,0,
								ucap_attr.setWordInfoConfig,{"punid":json.punid,"docType":docType,"fileName":json.fileName,"unid":attrUnid});
							//ucap_attr.setWordInfoConfig(json,unid,Interface,punid);
						}else{
							
						}
					}
				}
			};
			Ext.Ajax.request(GetWordListCfg);
		}
	},
	/**
	 * 用于将回车换行及tab转意，
	 * 然后在控件中进行替换
	 * @param {} s
	 * @return {}
	 */
	attr_escapeStr:function(s){
		s = s.replace(/[\r|\n]/ig,"`!p").replace(/(\t)/ig,"`!t");
		return s;
	}
};var viewBaseInfo={
	viewId:"",            //视图标识
	formId:"",            //表单标识
	formType:"",          //表单类型
	isSonView:false,      //是否有子视图
	sonViewIds:"",        //子视图标识
	previewType:"",        //预览方式
	categoryType:"",       //视图分类中的位置，如果视图分类为“00”则表示为没有分类
	checkPosition:"",      //选项列位置
	pageSize:20,
	viewType:"",           //视图类型
	openJs:"",             //打开的js函数
	isFlowItem:false,      //是否有流程字段
	advancedJson:null,     //高级查询的json配置
	categoryItemType:"",   //分类字段的类型
	isEdit:false,          //是否直接进入编辑状态
	formItemsJson:null,     //视图编辑中json格式的数据
	loadJs:"",              //视图加载完执行的js函数
	addRowjs:"",            //可编辑表格增加行的js函数
	onlysaveSelected:false  //只保存选中行,为true只保存选中，false的话保存所有行
}

var view={
	viewType:"01",
	
	//actionParams:{"type":"getView","viewId:":viewId,"punid":punid},
	viewId:"",
	
	renderto:"",
	
	hasTab:false,
	
	//dataUrl:"http://localhost:8081/xmmss/resJson2.jsp?1=1",
	dataUrl:ucapSession.baseAction+"?type=getView&action=getData&rand="+Math.random(),
	
	checkPosition:"",
	
	width:822,
	
	json:null,
	
	displayName:"",
	
	viewBaseInfos:null,
	
	namePrefix:"viewdiv_",
	
	pageSize:10,
	
	index:0,

	sqlLikeKey:'~!@0~!@5',        //SQL中like的关键字
	
	
	sqlAnd:'~!@AND@!~',           //SQL并且的关键字(AND)连接
	
	sqlOr:'~!@OR@!~',               //SQL并且的关键字(OR)连接
	
	sqlLTEQ:'~!@0~!@2',               //SQL并且的关键字(<=)连接
	
	sqlGTEQ:'~!@0~!@1',               //SQL并且的关键字(>=)连接
	
	sqlEQ:'~!@0~!@0',               //SQL并且的关键字(=)连接
	
	fieldDbType:'~!@DB@!~',         //数据库字段
	
	fieldConstType:'~!@CL@!~',      //常量字段
	
	fieldEndPrefix:'~!@E@!~',        //结束符
	
	currentGridIndex:0,              //当前选中表格的索引
	
	purl:"",                         //上级父的url标识
	
	mouseOverIndex:-1,               //鼠标移动所在行识别
	
	outOtherHeight:0,                //外部其它资源高度,如用户管理用户视图上面有了按钮，其相应的高度应该发生变化
	
	pcateUrl:"",                     //分类查询传入的值
	
	isSingle:"",           		     //是否为单选
	
	recordSplit:"",         		 //行分隔符号
	
	colSplit:"",             		 //列分隔符号
	
	isTab:"",                        //是否来自页签
	
	noTbar:"",                       //没有按钮区
	
	noBbar:"",                       //没有分页
	
	gridHeight:0,                     //表格高度
	
	gridWidth:0,                      //表格宽度
	
	
	/**
	 * 根据视图标识进行初始化视图
	 * 
	 * @param {} viewids 视图标识
	 * 
	 * @param rendprefix 绚烂位置的名称，如位置为“view_0”,那么rendprefix就为“view_”
	 */
	initview:function(viewid,render,noQuery,noPreview,noSelfConfig){
		var viewIds = viewid.split(",");
		//if(rendprefix!=undefined && rendprefix!="")view.namePrefix = rendprefix;
		for(var j=0;j<viewIds.length;j++){
			
			if(undefined==viewIds[j] || viewIds[j]==""){
				continue;
			}
			if(view.getIndexFromBaseInfo(viewIds[j])>=0)return;
			
			view.init(viewIds[j]);
			
			var index = view.viewBaseInfos.length-1;
			
			view.createGridDiv(index,render);
			
	    	//初始化简单查询
	    	if("undefined"!=noQuery && (noQuery==true || noQuery=="true")){
	    		var queryDiv = Ext.getDom("search");
	    		if(undefined!=queryDiv && null!=queryDiv){
	    			queryDiv.style.display="none";
	    		}
	    	}else{
	    		view.initSimpleSelect(view.json,index);
				view.initAdvancedSelect(view.json,index);
	    	}
	    	
			if(view.viewType=="01"){
				view.loadCommonGrid(viewIds[j],index,noPreview,noSelfConfig);
			}else if(view.viewType=="02"){//列表型视图
				view.loadListGrid(viewIds[j],index);
			}else{//图文并茂型视图
				view.loadImageGrid(viewIds[j],index);
			}
			//中间树形
			if(view.viewBaseInfos[index].categoryType=="02" && index==0){//只有第一个视图才进行建立视图分类
				viewTree.init(view.viewBaseInfos[index].viewId,'viewCategories',index,view.viewBaseInfos[index].categoryItemType);
			}
			//采用递归进行创建子视图
			if(view.viewBaseInfos[index].sonViewIds!=""){
				view.initview(view.viewBaseInfos[index].sonViewIds,render,noQuery,noPreview,noSelfConfig);
			}
		}
	},
	
	/**
	 * 进行视图刷新
	 */
	refreshView:function(viewid,render,noQuery,noPreview,noSelfConfig){
		var viewIds = viewid.split(",");
		for(var j=0;j<viewIds.length;j++){
			
			if(undefined==viewIds[j] || viewIds[j]==""){
				continue;
			}
			var index = view.getIndexFromBaseInfo(viewid);
			view.init(viewIds[j],index);
			view.createGridDiv(index,render);
	    	//初始化简单查询
	    	if("undefined"!=typeof(noQuery) && (noQuery==true || noQuery=="true")){
	    		var queryDiv = Ext.getDom("search");
	    		if(undefined!=queryDiv && null!=queryDiv){
	    			queryDiv.style.display="none";
	    		}
	    	}else{
	    		view.initSimpleSelect(view.json,index);
				view.initAdvancedSelect(view.json,index);
	    	}
	    	
			if(view.viewType=="01"){
				view.loadCommonGrid(viewIds[j],index,noPreview,noSelfConfig);
			}else if(view.viewType=="02"){//列表型视图
				view.loadListGrid(viewIds[j],index);
			}else{//图文并茂型视图
				view.loadImageGrid(viewIds[j],index);
			}
			//中间树形
			if(view.viewBaseInfos[index].categoryType=="02" && index==0){//只有第一个视图才进行建立视图分类
				viewTree.init(view.viewBaseInfos[index].viewId,'viewCategories',index,view.viewBaseInfos[index].categoryItemType);
			}
			
			//采用递归进行创建子视图
			if(view.viewBaseInfos[index].isSonView && view.viewBaseInfos[index].sonViewIds!=""){
				view.initview(view.viewBaseInfos[index].sonViewIds,render,noQuery,noPreview,noSelfConfig);
			}
		}
	},
	
	/**
	 * 判断视图id是否已在列表中
	 *  
	 * @param {} viewId
	 */
	getIndexFromBaseInfo:function(viewId){
		var result = -1;
		
		if(undefined!=view.viewBaseInfos && view.viewBaseInfos.length>0){
			for(var i=0;i<view.viewBaseInfos.length;i++){
				var vbi = view.viewBaseInfos[i];
				if(vbi.viewId==viewId){
					result = i;
					break;
				}
			}
		}
		
		return result;
	},
	
	
	
	createGridDiv:function(index,render){
		//创建表格的div
		var mainDiv = document.getElementById(render);
		mainDiv.innerHTML="";
		if(view.viewBaseInfos[0].categoryType=="02"){
			var mainLeft = Ext.getDom("viewCategories");
			if(undefined==mainLeft){
				mainLeft = document.createElement("div");
				//mainLeft.style="overflow:auto; height:590px;border:1px solid #c3daf9;"
				mainLeft.id = "viewCategories";
				mainDiv.appendChild(mainLeft);
			}
		}
		
		
		var mainRight = Ext.getDom("mainRight");
		if(undefined==mainRight){
			mainRight = document.createElement("div");
			mainRight.id = "mainRight";
			//mainRight.style.width=document.body.offsetWidth-200;
			mainRight.style.styleFloat="left";
			mainDiv.appendChild(mainRight);
		}

		//普通搜索
		var searchNewDiv = document.createElement("div");
		var searchNewDivHtml = "<div id=\"searchLeft\"></div>";
		
		searchNewDivHtml+="<div id=\"searchBox\"><img src=\""+ucapSession.sUserImgPath+"icon_search.gif\" align=\"absmiddle\" /> 搜索：";
		searchNewDivHtml+="<input name='keyword' type='text' class='searchinputbox' onkeydown='view.kdSearch("+index+")' id='keyword' onmousedown=\"if(this.value=='请输入搜索关键字')this.value=''\" value='请输入搜索关键字' size='20' />";
		searchNewDivHtml+=" 在 <select name=\"searchName\" id='simpleSearchSelect_"+index+"'>";
		searchNewDivHtml+="<option value='0'>请选择搜索范围</option>";
		searchNewDivHtml+="</select> <input type=\"button\" value=\"搜索\" id=\"simpleSearch_"+index+"\" class=\"btn1\" onclick=view.search("+index+")> <input type=\"button\" class=\"btn1\" id=\"advancedSearch_"+index+"\" onclick=\"view.setSearchMore(this,"+index+")\" value=\"▼高级搜索\" />";
		searchNewDiv.innerHTML = searchNewDivHtml;		
		searchNewDiv.id="search";
		mainRight.appendChild(searchNewDiv);
		
		//高级搜索
		var searchMoreNewDiv = document.createElement("div");
		searchMoreNewDiv.id = "searchMore_"+index;
		searchMoreNewDiv.style.display="none";
		//searchMoreNewDiv.style.width="auto";
		mainRight.appendChild(searchMoreNewDiv);
		//创建视图div
		var gridDiv = document.createElement("div");
		gridDiv.id = view.namePrefix+index;
		mainRight.appendChild(gridDiv);
		//创建表单div
//		var formDiv = document.createElement("div");
//		formDiv.id = "formdiv_"+index;
//		formDiv.style.width="100%";
//		formDiv.style.border="#BAD1D7 1px solid";
//		mainRight.appendChild(formDiv);
	},
	
	/**
	 * 先进性初始化
	 */
	init:function(currentViewId,index){
		
		var url =ucapSession.baseAction;
		url+="?viewId="+currentViewId+"&type=getView&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		view.json = Ext.util.JSON.decode(conn.responseText);

		var exresult = ucapCommonFun.dealException(view.json);
		if(!exresult)return;
		
		if(null==view.viewBaseInfos){
			view.viewBaseInfos = new Array();
		}
		//alert(view.json.unid);
		//new一个对象，以免是对对原有值的替换
		var viewBaseInfo = new Object();
		
		viewBaseInfo.viewId = view.json.punid;
		viewBaseInfo.formId = view.json.formUnid;
		viewBaseInfo.formType = view.json.formType;
		viewBaseInfo.previewType = view.json.previewType;
		viewBaseInfo.isSonView = view.json.sonView;
		viewBaseInfo.pageSize = view.json.pageSize;
		if(isNaN(viewBaseInfo.pageSize)){
			viewBaseInfo.pageSize=0;
		}else if(parseInt(viewBaseInfo.pageSize)<=0){
			viewBaseInfo.pageSize = 20;
		}
		viewBaseInfo.categoryType = view.json.categories;
		viewBaseInfo.checkPosition = view.json.checkPosition;
		viewBaseInfo.sonViewIds = view.json.sonViewUnids;
		viewBaseInfo.viewType = view.json.type;
		viewBaseInfo.openJs = view.json.openJs;
		
		
		if("undefined"!=typeof(view.json.flowItem)){
			viewBaseInfo.isFlowItem = view.json.flowItem;
		}
		
		if(undefined==view.json.categoryItems || view.json.categoryItems.length==0){
			viewBaseInfo.categoryType = "00";
		}else{
			viewBaseInfo.categoryItemType = view.json.categoryItems[0].itemType;
			if(viewBaseInfo.categoryType==""){
				viewBaseInfo.categoryType="01";
			}
		}
		
		var isEdit=1; //默认为可编辑  -1不能查看 0 只读 1可编辑
		//如果是子视图，则文档的打开权限要根据父文档的权限来判断
		if (window.parent && window.parent._UcapForm && window.parent._UcapForm.cfg){
			if("undefined"!=typeof(window.parent._UcapForm.cfg.isRead) && null!=window.parent._UcapForm.cfg.isRead){
				isEdit = window.parent._UcapForm.cfg.isRead;	
			}
		}
		//如果父文档不可编辑的话，则视图也默认不可编辑
		if(typeof(isEdit)!="undefined" && isEdit==1){
			viewBaseInfo.isEdit = view.json.edit;
		}else{
			viewBaseInfo.isEdit = false;
		}
		
		//视图加载完毕的js函数
		viewBaseInfo.loadjs=view.json.loadjs;
		viewBaseInfo.addRowjs = view.json.addRowjs;
		viewBaseInfo.onlysaveSelected = view.json.onlysaveSelected;
		
		if(undefined==index || index<0)view.viewBaseInfos[view.viewBaseInfos.length] = viewBaseInfo;
	},
	
	/**
	 * 初始化简单查询
	 * @param {} json
	 */
	initSimpleSelect:function(json,index){
		var query = json.query;
		if(undefined==query)return;
		var simpleItem = query.querySimpleItems;
		if(undefined==simpleItem)return;
		var simpleSearchSelect = Ext.getDom("simpleSearchSelect_"+index);
		
		for(var i=0;i<simpleItem.length;i++){
			ucapCommonFun.addOption(simpleSearchSelect,simpleItem[i].itemNameEn,simpleItem[i].itemNameCn);
		}
	},
	
	/**
	 * 初始化高级查询
	 * 
	 * @param {} json
	 */
	initAdvancedSelect:function(json,index){
		
		var query = json.query;
		if("undefined"==typeof(query) || query==null){
			var searchDiv = Ext.getDom("search");
			searchDiv.style.display="none";
			return;
		}
		var advancedItem = query.queryAdvancedItems;
		
		if("undefined"==typeof(advancedItem) || advancedItem==null || advancedItem.length<1){
			Ext.getDom("advancedSearch_"+index).style.display="none";
			return;
		}
		
		view.viewBaseInfos[index].advancedJson=advancedItem;
		
		var advancedDiv = Ext.getDom("searchMore_"+index);
		
		var tri = 0;
		var html ="";//<table class='table2'>
		var timeFormat = "yyyy-MM-dd";
		for(var i=0;i<advancedItem.length;i++){
			
			var inputHtml = "";
			if(advancedItem[i].hasBegin){
				if("undefined"!=typeof(advancedItem[i].dataType) && (advancedItem[i].dataType=="04" || advancedItem[i].dataType=="05")){
					//TODO加入日期时间选择框
					inputHtml+="&nbsp;从&nbsp;&nbsp;<input type=\"text\" name='"+advancedItem[i].itemNameEn+"_1' class=\"inputred\" readOnly/>";
					
					inputHtml+="<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+advancedItem[i].itemNameEn+"_1\",dateFmt:\""+timeFormat+"\"});' src='"+ucapSession.appPath+"js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
					inputHtml+="&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" name='"+advancedItem[i].itemNameEn+"_2' class=\"inputred\" readOnly/>";
					inputHtml+="<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+advancedItem[i].itemNameEn+"_2\",dateFmt:\""+timeFormat+"\"});' src='"+ucapSession.appPath+"js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
				}else{
					inputHtml+="&nbsp;从&nbsp;&nbsp;<input type=\"text\" name='"+advancedItem[i].itemNameEn+"_1' class=\"inputsearchbox\"/>";
					inputHtml+="&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" name='"+advancedItem[i].itemNameEn+"_2' class=\"inputsearchbox\"/>";
				}			
			}else{
				if("undefined"!=typeof(advancedItem[i].dataType) && advancedItem[i].dataType=="20"){
					inputHtml+="<input type=\"hidden\" id='"+advancedItem[i].itemNameEn+"' name='"+advancedItem[i].itemNameEn+"' class=\"inputsearchbox\"/>";
					inputHtml+="<input type=\"text\" id='"+advancedItem[i].itemNameEn+"_Cn_' name='"+advancedItem[i].itemNameEn+"_Cn_' class=\"inputred\" readOnly/>";
					inputHtml+="<input type='button' class='btn1' name='btnselect' value='选择' onclick=\""+"selectDataSD('"+advancedItem[i].dataSource+"',1,'"+advancedItem[i].itemNameEn+"')"+"\"/>";
				}else if("undefined"!=typeof(advancedItem[i].dataType) && advancedItem[i].dataType=="03"){
					inputHtml+="<select id='"+advancedItem[i].itemNameEn+"' name='"+advancedItem[i].itemNameEn+"'>"+advancedItem[i].optionValue+"</select>";
				}else{
					inputHtml+="<input type=\"text\" id='"+advancedItem[i].itemNameEn+"' name='"+advancedItem[i].itemNameEn+"' class=\"inputsearchbox\"/>";
				}
				if("undefined"!=typeof(advancedItem[i].dataType) && (advancedItem[i].dataType=="04" || advancedItem[i].dataType=="05")){
					inputHtml+="<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+advancedItem[i].itemNameEn+"\",dateFmt:\""+timeFormat+"\"});' src='"+ucapSession.appPath+"js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
				}
			}
			
			if(tri%2==0){
				html+="<tr>";
				html+="<th height='20' class=\"head\">"+advancedItem[i].itemNameCn+"</th>";
				
				
				if((advancedItem.length<=(i+1)) || advancedItem[i+1].hasBegin){
					html+="<td colspan='3'>";
					
					html+=inputHtml;
					
					html+="</td>";
					html+="</tr>"
					tri=tri+2;
				}else{
					if(advancedItem[i].hasBegin){
						html+="<td colspan='3'>";
						html+=inputHtml;
						html+="</td>";
						
						tri=tri+2;
					}else{
						html+="<td>"+inputHtml+"</td>"
						tri=tri+1;
					}
				}
			}else{
				html+="<th height='20' class=\"head\">"+advancedItem[i].itemNameCn+"</th>";
				html+="<td>"
				html+=inputHtml+"</td>";
				html+="</tr>";
				tri=tri+1;
			}
		}
		
		if(html!=""){
			if(html.substring(html.length-5,html.length)!="</tr>"){
				html=html.substring(0,html.length-5);
			}else{
				html=html.substring(0,html.length-10);
			}
			html +="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' class='btn1' value='搜索' onclick='view.advancedSearch("+index+")'/></td></tr>";
		}
		html = "<table class=\"table2\">"+html;
		html+="</table>";
		advancedDiv.innerHTML = html;
	},
	
	setSearchMore:function(obj,index){
		var searchMoreDiv= document.getElementById('searchMore_'+index);
    	if(searchMoreDiv.style.display==''){  
    		searchMoreDiv.style.display='none';
    		var gridPanel = Ext.getCmp(view.namePrefix+index);
    		gridPanel.setHeight(ucapSession.middleHeight-27-view.outOtherHeight);
    		obj.value = "▼高级搜索";
    	}else{
    		searchMoreDiv.style.display='';
    		var gridPanel = Ext.getCmp(view.namePrefix+index);
    		searchMoreDiv.style.width =gridPanel.getInnerWidth()-2;
    		var divHeight = document.getElementById('searchMore_'+index).offsetHeight;
    		gridPanel.setHeight(ucapSession.middleHeight-27-view.outOtherHeight-divHeight);
    		obj.value = "▲高级搜索";
    	}
    },
    
    /**
     * 根据子视图标识和父文档id重新加载子视图
     * 
     * @param {} sonViewIds 子视图标识
     * 
     * @param {} pdid 子视图上级数据标识
     */
    reloadSonView:function(sonViewIds,pdid){
    	if(undefined==sonViewIds || sonViewIds=="")return;
    	
    	var svds = sonViewIds.split(",");
    	
    	for(var i=0;i<svds.length;i++){
    		var vid = svds[i];
    		var vbi = null;
    		var index = -1;
    		for(var j=0;j<view.viewBaseInfos.length;j++){
    			if(view.viewBaseInfos[j].viewId==vid){
    				vbi = view.viewBaseInfos[j];
    				index = j;
    			}
    		}
    		
    		if(null!=vbi){
    			//普通视图
    			if(vbi.viewTyp=="01"){
    				var grid = Ext.getCmp(view.namePrefix+index);
    				grid.getStore().baseParams={pdid:pdid};
    				grid.getStore().reload({params:{start:0,limit:vbi.pageSize}});
    			}else if(vbi.viewTyp=="02"){//列表视图
    				loadListGrid(vid,index,pdid);
    			}else if(vbi.viewTyp=="03"){//图文并茂视图
    				loadListGrid(vid,index,pdid);
    			}
    		}
    	}
    },
	
	/**
	 * 加载普通类型的视图数据
	 * 
	 * @param {} index
	 */
	loadCommonGrid:function(curViewId,index,noPreview,noSelfConfig){
		var searchDiv= Ext.getDom('search');
		var width = document.body.offsetWidth;
		var vcDiv = Ext.getDom("viewCategories");
		var gridJspHeight = 0;
		if("undefiend"!=searchDiv && null!=searchDiv && searchDiv.offsetWidth>0){
			width = searchDiv.offsetWidth;
		}else{
			var gridAutoHeight=false;
			if("undefined"!=typeof(vcDiv) && vcDiv!=null){
				width = width-vcDiv.offsetWidth-6;
			}
			var mainLeft = Ext.getDom("ucapMainLeft");
			if("undefined"!=typeof(mainLeft) && mainLeft!=null && mainLeft.offsetWidth>0){
				width = width-mainLeft.offsetWidth-8;
				if("undefined"!=typeof(vcDiv) && vcDiv!=null){
					width=width+2;
				}
			}
		}

		//iframe时宽度要做适当的变化
		if("undefined"==typeof(isFromJsp) || isFromJsp!="true"){//不是来自ifame的情况
			gridAutoHeight = false;
		}else{
			var pIframe = window.parent.Ext.getDom("ifr"+curViewId);
			if("undefined"!=typeof(pIframe) && null!=pIframe && parseInt(pIframe.style.height)>0){
				gridJspHeight = parseInt(pIframe.style.height);
				var vcDiv = Ext.getDom("viewCategories");
				if("undefined"!=typeof(vcDiv) && null!=vcDiv){
					vcDiv.style.height = gridJspHeight;
				}
				var searchDiv= Ext.getDom('search');
				if("undefiend"!=searchDiv && null!=searchDiv){
					gridJspHeight=gridJspHeight-searchDiv.offsetHeight;//减去查询的高度
				}
				gridAutoHeight = false;
			}else{
				gridAutoHeight = true;
			}
		}
		
//		var url = view.dataUrl+"&viewId="+curViewId;
//		
//		if(undefined!=view.purl && view.purl!=""){
//			if(view.purl.trim().substring(0,1)=="&"){
//				url+=view.purl;
//			}else{
//				url+="&"+view.purl;
//			}
//		}
		var url = view.dataUrl+"&viewId="+curViewId;
		var urlsp = url.split("?");
		url = url.substring(urlsp[0].length+1);
		var urljson = Ext.urlDecode(url);
		var purljson = Ext.urlDecode(view.purl);
		Ext.apply(purljson,urljson);
		url = urlsp[0]+"?"+Ext.urlEncode(purljson);
		
		// 定义列模型
		var items = null;
		var remoteSort = true;
		
		//如果是编辑就通过编辑模型获取编辑的列数据
		if(view.viewBaseInfos[index].isEdit){
			items =Ext.util.JSON.decode(view.getEditColumnModuleJson(index,view.json));
			remoteSort = false;
		}else{
			items =Ext.util.JSON.decode(view.getColumnModuleJson(view.json));
		}
		
		var cm = new Ext.grid.ColumnModel(
			items
		);
		
		// 定义数据源为远程代理和JSON数据格式
		var ds = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : url
			}),
			reader : new Ext.data.JsonReader(
				{
					totalProperty : 'totalProperty',
					root : 'root'
				}, 
		    	view.getJsonReader(view.json)
			),
			remoteSort:remoteSort         //设置排序方式为后台排序，后台获取的参数的方式：排序名称的参数为：sort,排序方式的参数为:dir
		});//end ds
		// 加载首页数据，每页显示10条记录
		ds.load({
			params : {
				start : 0,
				limit : view.viewBaseInfos[index].pageSize
			}
		});//end ds.load	
		// 定义复选框
		var sm = null;
		if(view.isSingle=="1"){
			sm = new Ext.grid.RowSelectionModel({singleSelect:true});
		}else{
			sm = new Ext.grid.CheckboxSelectionModel();
		}
		
		var gridTbar = null;
		if("undefined"==typeof(view.noTbar) || view.noTbar!="true"){
			gridTbar = new Ext.Toolbar({
				items:view.getTBarJson(view.json,index,noPreview,noSelfConfig)
			});
		}
		
		var gridBbar = null;
		if("undefined"==typeof(view.noBbar) || view.noBbar!="true"){
			gridBbar = new Ext.PagingToolbar({
				pageSize : view.viewBaseInfos[index].pageSize,
				store : ds,
				displayInfo : true,//为false，不显示视图的记录信息，单显示分页
				displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg : "没有记录"
			});
		}
		
		// 设置所有列字段默认排序
		// 定义一个表格面板
		var grid = null;
		
		if(view.viewBaseInfos[index].isEdit){
			width=width-14;
			grid = new Ext.grid.EditorGridPanel({
				id : view.namePrefix+index,// 设置标识ID，方便以后引用！
				stripeRows: true,//让grid相邻两行背景色不同，具体颜色值还可修改ext-all.css中的.x-grid3-row-alt颜色值
				cm : cm,// 列模型
				ds : ds,// 数据源
				sm : sm,// 复选框
				loadMask:true,  //
				autoHeight:gridAutoHeight,
				autoWidth:false,
				width:width,
				tbar :gridTbar,
				// 表格底部分页工具栏
				bbar : gridBbar,
				//是否单击就进入编辑状态
				clicksToEdit:1,
									
				renderTo : view.namePrefix+index
	
			});
			
		}else{
			grid = new Ext.grid.GridPanel({
				id : view.namePrefix+index,// 设置标识ID，方便以后引用！
				//以下三个属性去掉，就可实现去掉表格面板的边框
				//title : view.displayName,// 标题
				//header:true,//是否显示标题栏，为false则不显示
				stripeRows: true,//让grid相邻两行背景色不同，具体颜色值还可修改ext-all.css中的.x-grid3-row-alt颜色值
				cm : cm,// 列模型
				ds : ds,// 数据源
				sm : sm,// 复选框
				loadMask:true,  //
				autoHeight:gridAutoHeight,// 自动设置高度，这个配置很重要
				autoWidth:false,
				width : width,
				//x : 1,// 设置初始位置横坐标
				//y : 1,// 设置初始位置纵坐标
				//floating : false,// 设置浮动，能否拖动成功就靠它了,注意设置浮动后它就置顶了
				
				// UI视图配置
				//强制设置了表格的宽度，此属性去点，表格中列的宽度就可以根据列设置的宽度
				viewConfig : {
					forceFit : false
				},
				// 表格顶部动作或按钮工具栏
				
				tbar :gridTbar,
					
				// 表格底部分页工具栏
				bbar : gridBbar,
									
				renderTo : view.namePrefix+index
	
			});
			
			grid.on("headerclick",view.headerclick);
		
			//鼠标移过去的提示信息
			if(view.json.messageType!="" && view.json.messageType!="01"){
				grid.on("mouseover",view.mouseover);
			}
		
			//视图上列移动的数据实现	
			grid.getColumnModel().on('columnmoved', view.columnMove);
			//视图上行双击的事件添加实现
			grid.on('rowdblclick', view.rowdbClick);
			
			//单元格单击事件实现
			grid.on('cellclick', view.cellclick);
		}
		
		cm.defaultSortable = true;
		
		if("undefined"==typeof(isFromJsp) || isFromJsp!="true"){
			if(!gridAutoHeight)view.setGridHeight(grid);
		}else{
			if(!gridAutoHeight){
				grid.setHeight(gridJspHeight);
			}
		}
		
		//视图加载完毕后执行相应的函数
		if(null!=view.viewBaseInfos[index].loadjs && view.viewBaseInfos[index].loadjs!=""){
			if(view.viewBaseInfos[index].loadjs.indexOf(")")>0){
				eval(view.viewBaseInfos[index].loadjs);
			}else{
				eval(view.viewBaseInfos[index].loadjs+"()");
			}
		}
		
		if(null!=grid.getStore().getSortState()){
			grid.getStore().getSortState().field=null;
		}
	},
	
	/**
	 * 单元格编辑后的事件,做为单元格事件的参考
	 * 
	 * @param {} obj
	 */
	focus:function(f){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		
		var selectModule = grid.getSelectionModel();
		//获取表格所在的行
		var row = selectModule.getSelected();
		
		//设置相应单元格的值
		f.setValue("设置单元格的值!");
	},
	
	/**
	 * @param insertDataJson 符合json格式的数据 String
	 * 
	 * 在可编辑表格中插入一行数据
	 * 
	 */
	insertEditorGridData:function(insertDataJson){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var recordJson = "";
		var dataJson = "";
		var toLoadData = true;
		if("undefined"!=typeof(insertDataJson) && insertDataJson!=""){
			dataJson = insertDataJson;
			toLoadData = false;
		}
		var colCount = grid.getColumnModel().getColumnCount(false);
		var beginIndex = 1;
		if(view.viewBaseInfos[view.index].checkPosition!="02")beginIndex=0;
		for(var j=beginIndex;j<colCount;j++){
			
			var dataIndex =  grid.getColumnModel().getDataIndex(j);
			var itemJson = view.getItemJsonByItemUnid(view.viewBaseInfos[view.index].formItemsJson,dataIndex);
			var val = "";
			if(null!=itemJson && null!=itemJson.uiItemValueList){
				for(var k=0;k<itemJson.uiItemValueList.length;k++){
					if(val==""){
						val = typeof(itemJson.uiItemValueList[k].value)=="undefined"?itemJson.uiItemValueList[k].text:itemJson.uiItemValueList[k].value;
					}else{
						val +=","+typeof(itemJson.uiItemValueList[k].value)=="undefined"?itemJson.uiItemValueList[k].text:itemJson.uiItemValueList[k].value;
					}
				}
			}
			if(recordJson==""){
				recordJson+="{name:'"+dataIndex+"'}";
				if(toLoadData)dataJson+=dataIndex+":'"+val+"'";
				
			}else{
				recordJson+=",{name:'"+dataIndex+"'}";
				if(toLoadData)dataJson+=","+dataIndex+":'"+val+"'";
			}
		}
		var Record =  Ext.data.Record.create(Ext.decode("["+recordJson+"]"));
		var r = new Record(Ext.decode("{"+dataJson+"}"));
		var rowCount = grid.getStore().getCount();
		grid.stopEditing();
		grid.getStore().insert(rowCount, r);
       	grid.startEditing(rowCount, beginIndex+1);
	},
	
	/**
	 * 删除表格中的数据
	 */
	deleteEditorGridData:function(){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
		
		for(i=0;i<selectedRow.length;i++){
			var row = selectedRow[i];
			grid.getStore().remove(row);
		}
	},
	
	/**
	 * 根据编辑视图中配置增加函数，在回车的时候进行增加，如果没有配置此函数，则回车时则不增加
	 */
	addEditorGridRow:function(){
		if(null!=view.viewBaseInfos[0].addRowjs && ""!=view.viewBaseInfos[0].addRowjs){
			if(view.viewBaseInfos[0].addRowjs.indexOf(")")>0){
				eval(view.viewBaseInfos[0].addRowjs);
			}else{
				eval(view.viewBaseInfos[0].addRowjs+"()");
			}
		}
	},
	
	/**
	 * 获取可编辑后的数据
	 * 
	 */
	getEditorGridDatas:function(){
		if(!view.viewBaseInfos[view.index].isEdit)return "[]";
		
		var grid = Ext.getCmp(view.namePrefix+view.index);
		//如果没有指定只保存选中行的数据的话，那么保存所有行
		
		if(!view.viewBaseInfos[view.index].onlysaveSelected){
			grid.getSelectionModel().selectAll();
		}		
		
		var rowCount = grid.getSelectionModel().getCount();   //表格中的行数
		
		if(rowCount<1)return "[]";
		
		var datas="[";
		
		var colCount = grid.getColumnModel().getColumnCount(false);
		
		var beginIndex = 1;
		
		if(view.viewBaseInfos[view.index].checkPosition!="02")beginIndex=0;
		
		for(var i=0;i<rowCount;i++){
			var row = grid.getSelectionModel().getSelections()[i];
			
			if(datas!="["){
				datas+=",{";
			}else{
				datas+="{";
			}
			
			var unidIndex = grid.getColumnModel().getDataIndex(beginIndex);
			datas+="formUnid:'"+view.viewBaseInfos[view.index].formId+"',unid";
			datas+=":'"+(row.data[unidIndex]||"")+"',isNew:";
			
			if(null==row.data[unidIndex] || row.data[unidIndex]==""){
				datas+="'1'"
			}else{
				datas+="'0'"
			}
			
			datas+=",item:[";
			
			for(var j=beginIndex;j<colCount;j++){
				var dataIndex =  grid.getColumnModel().getDataIndex(j);
				
				if(dataIndex==unidIndex)continue;
				
				datas+="{k:'"+dataIndex+"',v:"+Ext.encode(view.formatDate((row.data[dataIndex]||"")))+"},";
			}
			datas=datas.substring(0,datas.length-1);
			datas+="]";
			datas+="}";
		}
		datas+="]";
		
		return datas;
	},
	
	/**
	 * 设置表格高度
	 * 
	 */
	setGridHeight:function(grid){
		var searchDiv= Ext.getDom('search');
		var vcDiv = Ext.getDom("viewCategories");
		if("undefined"==typeof(grid) || grid==null){
			var grid = Ext.getCmp(view.namePrefix+view.index);
		}
		if("undefiend"==typeof(grid) || grid==null)return;
		if(ucapSession.middleHeight==0){
			ucapCommonFun.autoMenuHeight();
		}
		var ght = ucapSession.middleHeight;
		if("undefiend"!=searchDiv && null!=searchDiv){
			ght=ght-searchDiv.offsetHeight;
		}
		grid.setHeight(ght-view.outOtherHeight);

		if("undefined"!=typeof(vcDiv) && vcDiv!=null){
			vcDiv.style.height=ucapSession.middleHeight;
		}
	},
	
	/**
	 * 鼠标移过去的触发事件代码
	 * 
	 * @param {} e
	 * @param {} t
	 */
	mouseover:function(e,t){
		//var grid = Ext.getCmp(view.namePrefix+view.index);
		var curViewId = "";
		//alert(mouseOverIndex);
		var rowIndex = this.getView().findRowIndex(t);
		
		if(rowIndex==view.mouseOverIndex)return;
		
		view.mouseOverIndex = rowIndex;
		
		var row = this.getStore().getAt(view.mouseOverIndex);
		
		if(null==row || typeof(row)=="undefined")return;
		
		var columnIndex = 0;
		var vbi = view.viewBaseInfos[view.getGridNum(this.id)];
		if(vbi.checkPosition=="02"){
			columnIndex=1;
			
		}
		curViewId = vbi.viewId;
			
		var unid = row.data[this.getColumnModel().getDataIndex(columnIndex)];
		
		var qhtml = ucapCommonFun.getViewTip(curViewId,unid);
		
		Ext.QuickTips.register({
			target: e.target,
			text:qhtml, //'<table><tr><td>编辑:</td><td>文本</td></tr><tr><td>fdkfk:</td><td>fdkfk</td></tr></table>',
			autoHide: true,
			hideDelay: 0,
			showDelay: 0
		})
	},
	
	/**
	 * 列表型视图的数据加载
	 * 
	 * @param {} curViewId
	 * 
	 * @param {} index
	 */
	loadListGrid:function(curViewId,index,pdid){
		var listHtml="<table class=table3 cellSpacing=0 cellPadding=0 width=\"100%\" border=0>";
		
		for(var i=0;i<20;i++){
			listHtml+="<tr>";
			listHtml+="<TD class=tdHover><IMG src=\""+ucapSession.sUserImgPath+"icon_file.gif\">&nbsp;&nbsp;<A class=tableText href=\"#\">一个模块下可以包含多级的子模块，显示主要有两种形式</A></TD>";
			listHtml+="<TD class=tdHover><IMG src=\""+ucapSession.sUserImgPath+"icon_file.gif\">&nbsp;&nbsp;<A class=tableText href=\"#\">一个模块下可以包含多级的子模块，显示主要有两种形式</A></TD>";
			listHtml+="</tr>";
		}
		
		listHtml+="</table>"
		
		var gridDiv = Ext.getDom(view.namePrefix+index);//
		gridDiv.style.margin="0px 5px";
		gridDiv.style.border="#BAD1D7 1px solid";
		gridDiv.style.padding="4px";
		gridDiv.style.height="485px";
		gridDiv.style.overflow="auto";
		
		gridDiv.innerHTML = listHtml;
	},
	
	/**
	 * 加载图文并茂型视图
	 * 
	 * @param {} curViewId 视图标识
	 * 
	 * @param {} index 当前视图索引
	 */
	loadImageGrid:function(curViewId,index,pdid){		
		var imageHtml = "<table class=table5>";
		
		for(var i=0;i<3;i++){
			imageHtml+="<tr>"
			imageHtml+="<TH><A href=\"#\"><IMG height=100 src=\"../../appimage/imglist_pic_5.jpg\" width=154></A></TH>";
			imageHtml+="<TH><A href=\"#\"><IMG height=100 src=\"../../appimage/imglist_pic_6.jpg\" width=154></A></TH>";
			imageHtml+="<TH><A href=\"#\"><IMG height=100 src=\"../../appimage/imglist_pic_7.jpg\" width=154></A></TH>";
			imageHtml+="<TH><A href=\"#\"><IMG height=100 src=\"../../appimage/imglist_pic_8.jpg\" width=154></A></TH>";
			imageHtml+="</tr>"
			imageHtml+="<tr>"
			imageHtml+="<TD><INPUT id=checkbox type=checkbox name=checkbox> <A class=tableText href=\"#\">图文并茂式</A>&nbsp;&nbsp;&nbsp;<IMG height=13 src=\""+ucapSession.sUserImgPath+"img_between.gif\" width=1> &nbsp;<A href=\"#\"><IMG title=修改 height=9 src=\""+ucapSession.sUserImgPath+"icon_img_edit.gif\" width=9></A> <A href=\"#\"><IMG title=删除 height=7 src=\""+ucapSession.sUserImgPath+"icon_img_del.gif\" width=8></A></TD>";
			imageHtml+="<TD><INPUT id=checkbox type=checkbox name=checkbox> <A class=tableText href=\"#\">图文并茂式</A>&nbsp;&nbsp;&nbsp;<IMG height=13 src=\""+ucapSession.sUserImgPath+"img_between.gif\" width=1> &nbsp;<A href=\"#\"><IMG title=修改 height=9 src=\""+ucapSession.sUserImgPath+"icon_img_edit.gif\" width=9></A> <A href=\"#\"><IMG title=删除 height=7 src=\""+ucapSession.sUserImgPath+"icon_img_del.gif\" width=8></A></TD>";
			imageHtml+="<TD><INPUT id=checkbox type=checkbox name=checkbox> <A class=tableText href=\"#\">图文并茂式</A>&nbsp;&nbsp;&nbsp;<IMG height=13 src=\""+ucapSession.sUserImgPath+"img_between.gif\" width=1> &nbsp;<A href=\"#\"><IMG title=修改 height=9 src=\""+ucapSession.sUserImgPath+"icon_img_edit.gif\" width=9></A> <A href=\"#\"><IMG title=删除 height=7 src=\""+ucapSession.sUserImgPath+"icon_img_del.gif\" width=8></A></TD>";
			imageHtml+="<TD><INPUT id=checkbox type=checkbox name=checkbox> <A class=tableText href=\"#\">图文并茂式</A>&nbsp;&nbsp;&nbsp;<IMG height=13 src=\""+ucapSession.sUserImgPath+"img_between.gif\" width=1> &nbsp;<A href=\"#\"><IMG title=修改 height=9 src=\""+ucapSession.sUserImgPath+"icon_img_edit.gif\" width=9></A> <A href=\"#\"><IMG title=删除 height=7 src=\""+ucapSession.sUserImgPath+"icon_img_del.gif\" width=8></A></TD>";
			imageHtml+="</tr>"
		}
		
		imageHtml+="</table>"
		
		var gridDiv = Ext.getDom(view.namePrefix+index);//
		gridDiv.style.margin="0px 5px";
		gridDiv.style.border="#BAD1D7 1px solid";
		gridDiv.style.padding="4px";
		gridDiv.style.height="485px";
		gridDiv.style.overflow="auto";
		
		gridDiv.innerHTML = imageHtml;
	},
	
	/**
	 * 获取视图列的json格式数据
	 * 
	 * @param {} json
	 */
	getColumnModuleJson:function(json){
		//先判断是否有选项列
		var columnModuleJson = "";
		view.checkPosition = json.checkPosition;
		
		//columnModuleJson="new Ext.grid.RowNumberer()";
		//左边
		if(view.checkPosition=="02"){
			columnModuleJson+="new Ext.grid.CheckboxSelectionModel()";
		}
		
		var viewItems = json.viewItems;
		
		for(var i=0;i<viewItems.length;i++){
			if(undefined==typeof(viewItems[i].itemNameEn) || viewItems[i].itemNameEn=="")continue;
			if(columnModuleJson==""){
				columnModuleJson="{header:'"+viewItems[i].displayName+"'";
			}else{
				columnModuleJson=columnModuleJson+",{header:'"+viewItems[i].displayName+"'";
			}
			columnModuleJson+=",dataIndex:'"+viewItems[i].itemNameEn.toLowerCase()+"'";
			
			var columnWidth = viewItems[i].width;
			
			var widthType = viewItems[i].widthType;
			
			if(!viewItems[i].display){
				columnModuleJson+=",hidden:true,hideable:false";
			}
			
			if(widthType=="02"){
				columnWidth = view.width*columnWidth/100;
			}
			
			columnModuleJson+=",width:"+columnWidth;
			
			if(viewItems[i].conversion!=""){
				columnModuleJson+=",renderer:"+viewItems[i].conversion;
			}
			columnModuleJson+="}";
		}//列加载完毕
		
		//右边
		if(view.checkPosition=="03"){
			columnModuleJson+=",new Ext.grid.CheckboxSelectionModel()";
		}
		columnModuleJson = "["+columnModuleJson+"]";
		
		return columnModuleJson;
	},
	
	/**
	 * 获取可编辑表格的列模型
	 * 
	 * @param {} json 列数据模型
	 */
	getEditColumnModuleJson:function(index,json){
		//先根据当前的index属性获取当前的视图展示的表单，以便获取其中的字段信息,直接从先前的表单中进行获取
		var vbi = view.viewBaseInfos[index];
		var url =ucapSession.baseAction;
		url+="?formType=01&formId="+vbi.formId+"&type=getForm&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var itemsJson = Ext.util.JSON.decode(conn.responseText);			
		var exResult=ucapCommonFun.dealException(itemsJson);
		if(!exResult)return;
		
		view.viewBaseInfos[index].formItemsJson = itemsJson;
		
		//先判断是否有选项列
		var columnModuleJson = "";
		view.checkPosition = json.checkPosition;
		
		//columnModuleJson="new Ext.grid.RowNumberer()";
		//左边
		if(view.checkPosition=="02"){
			columnModuleJson+="new Ext.grid.CheckboxSelectionModel()";
		}
		
		var viewItems = json.viewItems;
		
		for(var i=0;i<viewItems.length;i++){
			if(undefined==typeof(viewItems[i].itemNameEn) || viewItems[i].itemNameEn=="")continue;
			var itemJson = view.getItemJsonByItemUnid(itemsJson,viewItems[i].itemUnid);
			if(columnModuleJson==""){
				columnModuleJson="{header:'"+viewItems[i].displayName+"'";
			}else{
				columnModuleJson=columnModuleJson+",{header:'"+viewItems[i].displayName+"'";
			}
			columnModuleJson+=",dataIndex:'"+viewItems[i].itemNameEn.toLowerCase()+"'";
			
			var columnWidth = viewItems[i].width;
			
			var widthType = viewItems[i].widthType;
			
			if(!viewItems[i].display){
				columnModuleJson+=",hidden:true,hideable:false";
			}
			
			if(widthType=="02"){
				columnWidth = view.width*columnWidth/100;
			}
			
			columnModuleJson+=",width:"+columnWidth;
			
			if(viewItems[i].conversion!=""){
				columnModuleJson+=",renderer:"+viewItems[i].conversion;
			}else{
				if(null!=itemJson && (itemJson.item.sourceType=="04" || itemJson.item.sourceType=="05")){
					columnModuleJson+=",renderer:view.formatDate";
				}
			}
			
			var editor = view.getEditerByItemJson(itemJson,viewItems[i]);
			
			if(null!=editor && editor!=""){
				columnModuleJson += ","+editor;
			}
			
			columnModuleJson+="}";
		}//列加载完毕
		
		//右边
		if(view.checkPosition=="03"){
			columnModuleJson+=",new Ext.grid.CheckboxSelectionModel()";
		}
		columnModuleJson = "["+columnModuleJson+"]";
		
		return columnModuleJson;
	},
	
	/**
	 * 格式化日期格式的数据
	 * 
	 * @param {} value
	 * @return {}
	 */
	formatDate:function(value){
		try{
			return value.format("Y-m-d");
		}catch(Exception){
			return value;
		}
    },

	
	/**
	 * 通过itemsjson及itemUnid获取到相应的item对象
	 * 
	 * @param {} itemsJson itemsJson对象
	 * 
	 * @param {} itemUnid 字段标识
	 */
	getItemJsonByItemUnid:function(itemsJson,itemUnid){
		var itemJson = null;
		
		if(null!=itemsJson && itemsJson.uiItemList.length>0){
			for(var i=0;i<itemsJson.uiItemList.length;i++){
				var tmpItemJson = itemsJson.uiItemList[i];
				if(null!=tmpItemJson && null!=tmpItemJson.item && (itemUnid==tmpItemJson.item.unid || tmpItemJson.item.nameEn.toLowerCase()==itemUnid)){
					itemJson = tmpItemJson;
					break;
				}
			}
		}

		return itemJson;
	},
	
	/**
	 * 通过域字段的itemJson获取editor对象
	 *  
	 * @param {} itemJson
	 */
	getEditerByItemJson:function(itemJson,viewItem){
		var editJson = "";
		if(null==itemJson || null==itemJson.item)return editJson;
		switch(itemJson.item.sourceType){
			case '03':
				editJson="editor: new Ext.form.ComboBox({typeAhead:true,triggerAction:'all',transform:'"
				+itemJson.item.nameEn.toLowerCase()+"',lazyRender:true,listClass: 'x-combo-list-small'";
				if(null!=itemJson.item.itemShow){//加入只读属性
					if("undefined"!=typeof(itemJson.item.itemShow.readOnly) && itemJson.item.itemShow.readOnly){//如果字段只读的话
						editJson+=",readOnly:true";
					}
				}
				editJson+="})";
				
				var dictSelect = document.getElementById(itemJson.nameEn);
				if("undefined"==typeof(dictSelect) || null==dictSelect){
					dictSelect = document.createElement("select");
					dictSelect.id = itemJson.item.nameEn.toLowerCase();
					dictSelect.name = itemJson.item.nameEn.toLowerCase();
					dictSelect.style.display = "none";
										
					if(null!=itemJson.dictTree && null!=itemJson.dictTree.children){
						for(var i=0;i<itemJson.dictTree.children.length;i++){
							ucapCommonFun.addOption(dictSelect,itemJson.dictTree.children[i].value,itemJson.dictTree.children[i].text);
						}
					}
					
					document.body.insertBefore(dictSelect);
				}
				
				break;
			case '04':
				editJson="editor:new Ext.form.DateField({format:'Y-m-d'";
				if(null!=itemJson.item.itemShow){
					if("undefined"!=typeof(itemJson.item.itemShow.readOnly) && itemJson.item.itemShow.readOnly){//如果字段只读的话
						editJson+=",readOnly:true";
					}
				}
				editJson+="})";
				break;
			case '05':
				editJson="editor:new Ext.form.DateField({format:'Y-m-d'";
				if(null!=itemJson.item.itemShow){
					if("undefined"!=typeof(itemJson.item.itemShow.readOnly) && itemJson.item.itemShow.readOnly){//如果字段只读的话
						editJson+=",readOnly:true";
					}
				}
				editJson+="})";
				break;
			case '20':
				editJson="editor: new Ext.form.TextField({";
				if(viewItem.onclick!=""){
					editJson+="listeners:{focus:"+viewItem.onclick+"}";//
				}
				//add by jc 20090818
				if(viewItem.onchange!=""){
					editJson+="listeners:{change:function(field,e){ "+viewItem.onchange+" }}";//
				}
				if(null!=itemJson.item.itemShow){
					if("undefined"!=typeof(itemJson.item.itemShow.readOnly) && itemJson.item.itemShow.readOnly){//如果字段只读的话
						if(viewItem.onclick!="")editJson+=",";
						editJson+="readOnly:true";
					}
				}
				editJson+="})";
				break;
			default:
				if(itemJson.item.length>500){
					editJson="editor: new Ext.form.TextArea({";
					if(viewItem.onclick!=""){
						editJson+="listeners:{focus:"+viewItem.onclick+"}";//具体onclick事件的编写可以参考view.focus方法
					}else{
						editJson+="listeners:{focus:view.setTextAreaHeight}";
					}
				}else{
					editJson="editor: new Ext.form.TextField({";
					if(viewItem.onclick!=""){
						editJson+="listeners:{focus:"+viewItem.onclick+"}";//具体onclick事件的编写可以参考view.focus方法
					}
					//add by jc 20090818
					if(viewItem.onchange!=""){
						editJson+="listeners:{change:function(field,e){ "+viewItem.onchange+" }}";//
					}
					if(null!=itemJson.item.itemShow){
						if("undefined"!=typeof(itemJson.item.itemShow.readOnly) && itemJson.item.itemShow.readOnly){//如果字段只读的话
							if(viewItem.onclick!="")editJson+=",";
							editJson+="readOnly:true";
						}
					}
				}
				
				editJson+="})";
		}
		
		return editJson;
	},
	
	/**
	 * 设置编辑表格中大文本框的高度，以便用户的输入
	 * 
	 * @param {} f
	 */
	setTextAreaHeight:function(f){
		f.setHeight(200);
	},
	
	/**
	 * 获取视图列json格式数据
	 * @param {} json
	 */
	getJsonReader:function(json){
		var jsonReader = "";
		var viewItems = json.viewItems;
		
		for(var i=0;i<viewItems.length;i++){
			if(undefined==typeof(viewItems[i].itemNameEn) || viewItems[i].itemNameEn=="")continue;
			if(jsonReader==""){
				jsonReader+="{name:'"+viewItems[i].itemNameEn.toLowerCase()+"'}"
			}else{
				jsonReader+=",{name:'"+viewItems[i].itemNameEn.toLowerCase()+"'}"
			}
		}
		jsonReader="["+jsonReader+"]";
		return Ext.util.JSON.decode(jsonReader);
	},
	
	/**
	 * 获取工具栏上的json
	 * 
	 * @param {} json
	 */
	getTBarJson:function(json,index,noPreview,noSelfConfig){
		var TBarJson = "";
		var buttonItems = json.subButtonList;
		for(var i=0;i<buttonItems.length;i++){
			if (typeof  buttonItems[i].button == "undefined" || buttonItems[i].button =="null"
			   || buttonItems[i].button ==null ) continue;
			if("undefined"!=typeof(buttonItems[i].js) && buttonItems[i].js!=""){
				var result = ucapCommonFun.evalJavaScript(buttonItems[i].js);
				if(!result)continue;
			}  
			if(TBarJson==""){
				TBarJson = "{id:'btn"+buttonItems[i].unid+"'";
			}else{
				TBarJson+=",{id:'btn"+buttonItems[i].unid+"'";
			}
			TBarJson+=",text:'"+buttonItems[i].name+"'";
			
			
			if("undefined"!=typeof(buttonItems[i].picture) && buttonItems[i].picture!=""){
				TBarJson+=",icon:'"+ucapSession.sUserImgPath+buttonItems[i].picture+"'";
				TBarJson+=",iconCls:'x-btn-text-icon'";
			}
			var codeType = buttonItems[i].button.codeType;
			
			if(codeType=="01"){
				TBarJson+=",handler:function(){view.index="+index+";"+buttonItems[i].button.code+"}}";
			}else if (codeType=="02"){//扩展功能
				TBarJson+=",handler:function(){view.index="+index+";"+"view.executeInteration('"+buttonItems[i].button.code+"')}}";
			} else if (codeType=="03"){
				//说明是流程新建窗口
				TBarJson+=",handler:function(){view.index="+index+";"+"ucapCommonFun.newFlowDocByFlowIds('"+buttonItems[i].button.code+"')}}";
			}
		}//end for
		
		//目前作为测试时使用，保证在按钮没有配置的情况下，每个视图上都有相应的按钮
		if(TBarJson==""){
			TBarJson = "{id:'btnAdd',text:'新增',handler:function(){view.index="+index+";view.newDocument()"+"}}";
			TBarJson += ",{id:'btndelete',text:'删除',handler:function(){view.index="+index+";"+"view.deleteDocument()"+"}}";
			TBarJson += ",{id:'btnmodify',text:'修改',handler:function(){view.index="+index+";"+"view.openDocument(3)"+"}}";
			TBarJson += ",{id:'btnrefresh',text:'刷新',handler:function(){view.index="+index+";"+"view.refresh()"+"}}";
			TBarJson += ",{id:'btnreset',text:'重置',handler:function(){view.index="+index+";"+"view.reset()"+"}}";
		}

		
		if(TBarJson!=""){
			TBarJson=TBarJson+",'->'";
		}else{
			TBarJson=TBarJson+"'->'";
		}
		
//		if(undefined==noPreview || !noPreview){
//			TBarJson+=",{id:'preview"+index+"',text:'预览',tooltip:{title:'表单预览',text:'显示或隐藏预览的表单'},";
//			TBarJson+="iconCls: 'preview-bottom',menu:{id:'reading-menu"+index+"',cls:'reading-menu',width:100,items:[";
//			TBarJson+="{text:'底部',checked:true,group:'rp-group',handler:function(){view.preview('02',"+index+")},scope:this,iconCls:'preview-bottom'}";
//			TBarJson+=",{text:'隐藏',checked:false,group:'rp-group',handler:function(){view.preview('00',"+index+")},scope:this,iconCls:'preview-hide'}]}}";
//		}
		//自定义
		if("undefined"==typeof(noSelfConfig) || !(noSelfConfig==true || noSelfConfig=="true")){
			TBarJson+=",{id:'btnselfconfig"+index+"',text:'自定义',";
			TBarJson+="iconCls: 'preview-bottom',menu:{id:'selfconfig-menu"+index+"',cls:'reading-menu',width:100,items:[";
			TBarJson+="{text:'基本信息',checked:true,group:'rp-group',handler:function(){view.selfConfig('01',"+index+")},scope:this}";
			TBarJson+=",{text:'视图列',checked:true,group:'rp-group',handler:function(){view.selfConfig('02',"+index+")},scope:this}";
			TBarJson+=",{text:'简单查询',checked:true,group:'rp-group',handler:function(){view.selfConfig('03',"+index+")},scope:this}";
			TBarJson+=",{text:'高级查询',checked:true,group:'rp-group',handler:function(){view.selfConfig('04',"+index+")},scope:this}";
			TBarJson+=",{text:'视图排序',checked:true,group:'rp-group',handler:function(){view.selfConfig('05',"+index+")},scope:this}";
			TBarJson+=",{text:'视图分类',checked:true,group:'rp-group',handler:function(){view.selfConfig('06',"+index+")},scope:this}";
			if(typeof(ucapSession.userJson.userStatus)!="undefined" && ucapSession.userJson.userStatus=="1"){
				TBarJson+=",{text:'视图条件',checked:true,group:'rp-group',handler:function(){view.selfConfig('07',"+index+")},scope:this}";
				TBarJson+=",{text:'视图按钮',checked:true,group:'rp-group',handler:function(){view.selfConfig('08',"+index+")},scope:this}";
			}
			//
			TBarJson+=",{text:'恢复默认',checked:false,group:'rp-group',handler:function(){view.selfConfig('10',"+index+")},scope:this}]}}";
		}
		//TBarJson += ",{id:'btnselfconfig',text:'自定义',handler:function(){view.index="+index+";"+"view.selfConfig()"+"}}";
		TBarJson += ",{id:'btnno',text:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}";
		TBarJson="["+TBarJson+"]";
		
		return Ext.util.JSON.decode(TBarJson);
	},
	
	/**
	 * 根据列名称获取表格选中行中指定列的值，列如果多个的话，采用逗号","隔开
	 * 
	 * @param {} colNames 获取的列名称
	 * 
	 * @param {} outsplit 输出分隔符号
	 */
	getColumnValueByName:function(colName){
		var result = "";
		var osplit = "";
		if("undefined"==typeof(colName) || colName=="")return result;
		var colNames = colName.split(",");
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || "undefined"==typeof(selectedRow.length)){
			selectedRow = new Array(selectedRow);
		}
		
		for(var i=0;i<selectedRow.length;i++){
			var row = selectedRow[i];
			if(result!="")result = result+view.recordSplit;
			for(var j=0;j<colNames.length;j++){
				if("undefined"==typeof(result) || result==""){
					result = row.data[colNames[j]];
				}else{
					result+=view.colSplit+row.data[colNames[j]];
				}
			}
			if(view.isSingle=="1")break;//如果是单选，则执行一次就跳出循环
		}

		return result;
	},
	
	/**
	 * 私有方法，通过表格的标识获取表格序号
	 * @param {} gridId
	 * @return {}
	 */
	getGridNum:function(gridId){
		var result = 0;
		if(gridId!=""){
			result = Number(gridId.replace(view.namePrefix,""));
		}
		
		return result;
	},
	
	/**
	 * 获取表格的当前行数
	 */
	getGridRowCount:function(){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var rownum = grid.getStore().getCount(); 
		return rownum;
	},
	
	/**
	 * 视图列移动函数
	 * @param {} columnModal
	 * @param {} oldIndex
	 * @param {} newIndex
	 */
	columnMove:function(columnModal,oldIndex, newIndex){	
		if(view.viewBaseInfos[view.currentGridIndex].checkPosition=="02"){
			oldIndex = oldIndex-1;
			newIndex = newIndex-1;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"sortViewColumn",
					"viewId":view.viewBaseInfos[view.currentGridIndex].viewId,"oldIndex":oldIndex,"newIndex":newIndex},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
				} else {
					Ext.Msg.alert("提示","移动失败，下次登录时将不起作用！");
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 设置单击列所在的表格
	 * @param {} grid
	 * @param {} columnIndex
	 * @param {} e
	 */
	headerclick:function(grid,columnIndex,e){
		view.currentGridIndex = view.getGridNum(grid.id);
	},
	
	/**
	 * 视图行双击函数
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	rowdbClick:function(grid,rowIndex,e){
		var gridNum = view.getGridNum(grid.id);
		var vbi = view.viewBaseInfos[gridNum];
		var openJs = vbi.openJs;
		
		//如果打开的脚本为0的话，则不打开相应的文档
		if(openJs=="0")return;
		
		if(vbi.isSonView){
			var row = grid.getStore().getAt(rowIndex);
			var columnIndex = 0;
			
			if(view.viewBaseInfos[gridNum].checkPosition=="02"){
				columnIndex=1;
			}
			
			var unid = row.data[grid.getColumnModel().getDataIndex(columnIndex)];
			
			view.openDocument(1,gridNum,unid,vbi.formType,vbi.formId);
		}
	},
		
	
	/**
	 * 普通视图的列单击函数
	 * 
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} columnIndex
	 * @param {} e
	 */
	cellclick:function(grid, rowIndex, columnIndex, e){
		if(columnIndex==0)return;
		var gridNum = view.getGridNum(grid.id);
		var vbi = view.viewBaseInfos[gridNum];
		var openJs = vbi.openJs;
		
		//如果打开的脚本为0的话，则不打开相应的文档
		if(openJs=="0")return;
		
		if(!vbi.isSonView){
			var row = grid.getStore().getAt(rowIndex);
			var columnIndex = 0;
			
			if(view.viewBaseInfos[gridNum].checkPosition=="02"){
				columnIndex=1;
			}
			
			var unid = row.data[grid.getColumnModel().getDataIndex(columnIndex)];
			
			view.openDocument(1,gridNum,unid,vbi.formType,vbi.formId);
		}
	},
	
	/**
	 * 视图预览
	 * 
	 * @param {} index
	 */
	preview:function(val,index){
		var formDiv = Ext.getDom("formdiv_"+index);
		
		if(val=="00"){
			formDiv.style.display="none";
		}else{
			formDiv.style.display="";
		}
	},
	
	/**
	 * 根据扩展功能的标识执行扩展功能
	 * 
	 * @param {} sid
	 */
	executeInteration:function(sid){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var gridNum = view.getGridNum(grid.id);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
		var str="";
		for(var i=0;i<selectedRow.length;i++){
			var row = selectedRow[i];
			str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
		}
		if(str!="")str = str.substring(1);
		//视图配置信息
		var vbi = view.viewBaseInfos[gridNum];
		var json = "{unid:'"+str+"',type:'"+vbi.formType+"',formId:'"+vbi.formId+"'}";
		//alert(json);
		//开始执行扩展功能
		ucapCommonFun.executeInteraction(sid,Ext.decode(json),1);
	},
	
	/**
	 * 普通文档新建窗口
	 */
	newDocument:function(){
		this.openDocument(2);
	},
	/**
	 * yjy 视图上文档打开 只能在视图上调用
	 * @type 1 表示是 视图或首页中的单击打开 2 表示是新建文档 3 表示要通过 选中一个文档后，再打开
	 * 如果为空，要重新取值
	 * @param {} obj
	 */
	openDocument:function(type,gridNum,unid,formType,formId){
		var vbi = null;
		if("undefined"==typeof(type) || type==""){
			Ext.Msg.alert("提示信息","openDocument打开文档type的类型不能为空");
			return;
		}
		if("undefined"==typeof(gridNum) || "undefined"==typeof(unid) || "undefined"==typeof(formType) || "undefined"==typeof(formId)){
			var grid = Ext.getCmp(view.namePrefix+view.index);
			gridNum = view.getGridNum(grid.id);
			vbi = view.viewBaseInfos[gridNum];
			var row = grid.getSelectionModel().getSelected();
			var unidIndex = 1;
			if (type==3){
				if(undefined==row || row==null){
					Ext.MessageBox.alert("提示","请选择要打开的文档!");
					return;
				}
				unid = row.data[grid.getColumnModel().getDataIndex(unidIndex)];
			};
			if(typeof unid=="undefined") unid="";
			formType = vbi.formType;
			formId=vbi.formId;
		}else{
			vbi = view.viewBaseInfos[gridNum];
		}	
		var tmpUrl = view.filterSql(view.purl);
		if(tmpUrl==""){
			tmpUrl = view.pcateUrl;
		}else{
			if(tmpUrl.substring(tmpUrl.length-1)=="&"){
				tmpUrl=tmpUrl+view.pcateUrl;
			}else{
				tmpUrl=tmpUrl+"&"+view.pcateUrl;
			}
		}
		tmpUrl = view.filterSql(tmpUrl);
		this.openViewDoc(unid,formType,formId,vbi.isFlowItem,tmpUrl,vbi.openJs);
	},
	/**
	 * yjy 视图中打开（首页上也可调用此方法） 也在 视图的配置js中用 view.openViewDoc(height,width)进行调用
	 * @param {} unid       文档的Unid
	 * @param {} formType   文档类型
	 * @param {} formId     容器的ID
	 * @param {} isFlowItem  是否为流程，默认为 false
	 * @param {} tmpUrl     打开文档时，其他的url参数，格式为 text=999&num=333
	 * @param {} openJs     打开的方法  可为空
	 * @height div窗口的高度
	 * @width  div窗口的宽度
	 */
	openViewDoc:function(unid,formType,formId,isFlowItem,tmpUrl,openJs,height,width){
		if(typeof isFlowItem=="undefined" ) isFlowItem = false;
		if(undefined!=openJs && openJs!=""){
			var openCode = openJs.substring(0,openJs.indexOf("("));
			//执行相应的脚本
			
			var ib = openJs.indexOf("(")+1;
			var iEnd = openJs.indexOf(")");
			var par = openJs.substring(ib,iEnd);
			if(par.trim()=="") {
				par="";
			} else {par = ","+par};
			var js;
			if (openJs.indexOf("OpenFlowDocByTodoUnid")>-1){
				js = openCode+"('"+unid+"',ucapCommonFun.ucapOpenDoc,1"+par+")";	
			} else{
				js = openCode+"('"+unid+"','"+formType+"','"+
					formId+"',"+isFlowItem+",'"+tmpUrl+"',''"+par+")";
			}
			ucapCommonFun.evalJavaScript(js);
		}else{//默认普通打开方式
			if(isFlowItem){
				//有流程字段则采用流程的方式打开
				//csj 2009.8.6 
				//ucapOpenFlow.openOldFlowDoc("&type="+formType+"&unid="+unid,ucapCommonFun.ucapOpenDoc,1); 
				ucapOpenFlow.openOldFlowDoc("&unid="+unid,ucapCommonFun.ucapOpenDoc,1);
			}else{
			    //无流程的打开
				var url = ucapSession.appPath +"sys/jsp/";
				url+="document.jsp?unid="+unid+"&type="+formType+"&formId="+formId;			
				if(undefined!=tmpUrl && tmpUrl!=""){
						url+="&"+tmpUrl;
				}
				var flag=(unid==""?0:1);
				ucapCommonFun.ucapOpenDoc(url,flag,"",height,width);
			}
		}
	},
	/**
	 * 删除视图中选中的文档
	 */
	deleteDocument:function(){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
		var str="";
		for(var i=0;i<selectedRow.length;i++){
			var row = selectedRow[i];
			str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
		}
		if(str==""){
			Ext.MessageBox.alert("提示","请选择要删除的文档！");
			return;
		}
		str = str.substring(1);
		//str="["+str+"]";
		Ext.MessageBox.confirm("确认","是否确认要删除选中的文档！",function(btn){
			if(btn=="yes"){
				var json = {"formUnid":view.viewBaseInfos[view.index].formId,formType:view.viewBaseInfos[view.index].formType,docUnid:str};
				var requestConfig = {
					url:ucapSession.baseAction,
					params:{"type":"getForm","act":"delete"},
					jsonData:json,
					callback:function(options,success,response){
						if (success){
							var exjson = Ext.util.JSON.decode(response.responseText);	
							var exResult=ucapCommonFun.dealException(exjson);
							if(!exResult)return;
							
							Ext.Msg.alert("提示","删除文档成功！");
							view.refresh();
							
						} else {
							Ext.Msg.alert("提示","删除文档不成功！");
						}
					}
				}
				Ext.Ajax.request(requestConfig);
				
			}
		});
	},
	
	/**
	 * 回收站上的操作，包括文档的还原很删除
	 * 
	 * @param {} type
	 */
	recycleDoc:function(type){
		var action = "delete";
		var actionTip = "删除";
		
		if("undefined"!=typeof(type) && type==1){
			action = "restore";
			actionTip = "还原";
		}
		
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
		var str="";
		for(var i=0;i<selectedRow.length;i++){
			var row = selectedRow[i];
			str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
		}
		if(str==""){
			Ext.MessageBox.alert("提示","请选择要"+actionTip+"的文档！");
			return;
		}
		str = str.substring(1);
		//str="["+str+"]";
		Ext.MessageBox.confirm("确认","是否确认要"+actionTip+"选中的文档！",function(btn){
			if(btn=="yes"){
				var json = {docUnid:str};
				var requestConfig = {
					url:ucapSession.baseAction,
					params:{"type":"recycle","action":action},
					jsonData:json,
					callback:function(options,success,response){
						if (success){
							var exjson = Ext.util.JSON.decode(response.responseText);	
							var exResult=ucapCommonFun.dealException(exjson);
							if(!exResult)return;
							
							Ext.Msg.alert("提示",actionTip+"文档成功！");
							view.refresh();
							
						} else {
							Ext.Msg.alert("提示",actionTip+"文档不成功！");
						}
					}
				}
				Ext.Ajax.request(requestConfig);
				
			}
		});
			
	},
	/**
	 * 
	 * @type 
	 */
	filterSql:function(purl){
		//过滤父url
		if(undefined==purl || purl=="" || purl=="null" || purl==null)return "";
		
		var canHasInstanceId = true;
		
		if(purl.indexOf("funid=")>=0)canHasInstanceId=false;
		
		var purls = purl.split("&");
		var tmpUrl = "";
		for(var i=0;i<purls.length;i++){
			var tmpName = purls[i].substring(0,purls[i].indexOf("="));
			if(tmpName=="unid" || tmpName=="type" || tmpName=="formId")continue;
			
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
	},
	
	/**
	 * 进行刷新当前视图
	 */
	refresh:function(){
		try{
			var grid = Ext.getCmp(view.namePrefix+view.index);
			if (grid){
				grid.getStore().removeAll();
				grid.getBottomToolbar().updateInfo();
				grid.getStore().reload();
			} else {
				//要取嵌入视图的view	
			}
		}catch(e){};
	},
	
	/**
	 * 视图重置操作，清空视图上的查询信息
	 */
	reset:function(){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		if(grid){
			var keywordObj = Ext.getDom("keyword");
			keywordObj.value = "";
			
			var divobj = Ext.getDom("searchMore_"+view.index);
			var inputObjs = divobj.getElementsByTagName("input");
			for(var i=0;i<inputObjs.length;i++){
				var inputObj = inputObjs[i];
				if(inputObj.type=="text" && inputObj.value!=""){
					inputObj.value="";
				}
			}
			grid.getStore().removeAll();
			grid.getBottomToolbar().updateInfo();
			grid.getStore().baseParams={extracon:"",categorycon:""};
			grid.getStore().reload({params:{start:0,limit:view.viewBaseInfos[view.index].pageSize}});
		}
	},
	
	/**
	 * 视图当中的个人自定义
	 */
	selfConfig:function(type,index){
		var currrentViewId = view.viewBaseInfos[index].viewId;
		
		if(type=="01"){//视图基本信息
			viewConfig.configViewInfo(currrentViewId);
		}else if(type=="02"){//视图列
			viewConfig.configViewColumns(currrentViewId);
		}else if(type=="03"){//视图简单查询
			viewConfig.configSimpleQuery(currrentViewId);
		}else if(type=="04"){//视图高级查询
			viewConfig.configAdvancedQuery(currrentViewId);
		}else if(type=="05"){//视图排序
			viewConfig.configSortItem(currrentViewId);
		}else if(type=="06"){//视图分类
			viewConfig.configCategoryItem(currrentViewId);
		}else if(type=="07"){//视图条件
			viewConfig.configViewCondition(currrentViewId);
		}else if(type=="08"){//子按钮配置
			viewConfig.configSubButton(currrentViewId);
		}else if(type=="10"){//恢复默认
			viewConfig.configRestoreDefault(currrentViewId);
		}
		
		view.currentGridIndex = index;
	},
	
	/**
	 * 查询时按回车触发的事件
	 * 
	 * @param {} index
	 */
	kdSearch:function(index){
		if(event.keyCode==13){//回车时进行查询
			view.search(index);
		}
	},
	
	/**
	 * 视图中简单查询的操作
	 * 
	 * @param {} index
	 */
	search:function(index){
		var searchValue = "";
		var divobj = window.event.srcElement.parentElement;
		var options = Ext.getDom("simpleSearchSelect_"+index).options;
		var inputObjs = divobj.getElementsByTagName("input");
		var inputObj = null;
		
		for(var i=0;i<inputObjs.length;i++){
			if(inputObjs[i].name=="keyword"){
				inputObj = inputObjs[i];
				break;
			}
		}
//		if(inputObj.value=="" || inputObj.value=="请输入搜索关键字"){
//			Ext.MessageBox.alert("信息提示","请输入查询的内容!");
//			return;
//		}
		
		for(var i=1;i<options.length;i++){
			var option = options[i];
			if(option.selected){
				searchValue = view.fieldDbType+option.value+view.fieldEndPrefix+view.sqlLikeKey+view.fieldConstType+inputObj.value+view.fieldEndPrefix;
				break;
			}
			
			if(searchValue==""){
				searchValue =view.fieldDbType+option.value+view.fieldEndPrefix+view.sqlLikeKey+view.fieldConstType+inputObj.value+view.fieldEndPrefix;
			}else{
				searchValue =searchValue+view.sqlOr+view.fieldDbType+option.value+view.fieldEndPrefix+view.sqlLikeKey+view.fieldConstType+inputObj.value+view.fieldEndPrefix;
			}
			
		}

		var grid = Ext.getCmp(view.namePrefix+index);
		view.reloadByCon(index,searchValue,"01");
//		grid.getStore().baseParams={extracon:searchValue};
//		grid.getStore().reload({params:{start:0,limit:view.viewBaseInfos[index].pageSize}});
	},
	
	/**
	 * 视图列值转换测试,test
	 * @param {} val
	 */
	viewTest:function(val){
		return "原值："+val+";现值：*"+val;
	},
	
	/**
	 * 高级查询
	 * 
	 * @param {} index
	 */
	advancedSearch:function(index){
		var searchValue = "";
		var divobj = Ext.getDom("searchMore_"+index);
		var inputObjs = divobj.getElementsByTagName("input");
		for(var i=0;i<inputObjs.length;i++){
			var inputObj = inputObjs[i];
			if(inputObj.type=="text" && inputObj.value!=""){
				if(view.hasBeginInputName(inputObj.name,index)){				
					if(inputObj.name.lastIndexOf("_1")>0){
						searchValue=searchValue+view.fieldDbType+inputObj.name.substring(0,inputObj.name.length-2)+view.fieldEndPrefix
						+view.sqlGTEQ+view.fieldConstType+inputObj.value+view.fieldEndPrefix+view.sqlAnd;
					}else{
						searchValue=searchValue+view.fieldDbType+inputObj.name.substring(0,inputObj.name.length-2)+view.fieldEndPrefix
						+view.sqlLTEQ+view.fieldConstType+inputObj.value+view.fieldEndPrefix+view.sqlAnd;
					}
				}else{
					if(inputObj.name.lastIndexOf("_Cn_")>0){
						continue;
					}
					var inputName = inputObj.name;
					//if(inputName.lastIndexOf("_Cn_")>0)inputName = inputName.substring(0,inputName.lastIndexOf("_Cn_"));
					searchValue=searchValue+view.fieldDbType+inputName+view.fieldEndPrefix+view.sqlLikeKey+view.fieldConstType+inputObj.value+view.fieldEndPrefix+view.sqlAnd;
				}
			}
		}
		var selectObjs = divobj.getElementsByTagName("select");
		for(var i=0;i<selectObjs.length;i++){
			var selectObj = selectObjs[i];
			searchValue=searchValue+view.fieldDbType+selectObj.name+view.fieldEndPrefix
						+view.sqlGTEQ+view.fieldConstType+selectObj.value+view.fieldEndPrefix+view.sqlAnd;
		}
		if(searchValue==""){
			Ext.MessageBox.alert("信息提示","请针对查询字段输入相应的查询值！");
			return;
		}
		searchValue = searchValue.substring(0,searchValue.length-view.sqlAnd.length);
		
		view.reloadByCon(index,searchValue,"01");
	},
	
	/**
	 * 判断一个对象列表是否已经有包含inputname对象，有返回true，否则返回false
	 * 
	 * @param {} inputObjs 判断一个对象列表
	 * 
	 * @param {} inputName 输入框名称
	 */
	hasInputByName:function(inputObjs,inputName){
		var result = false;
		for(var i=0;i<inputObjs.length;i++){
			var inputObj = inputObjs[i];
			if(inputObj.name==(inputName+"_Cn_")){
				result = true;
				break;
			}
		}
		return result;
	},
	
	/**
	 * 根据外部条件
	 * @param {} index
	 * @param {} extracon
	 */
	reloadByCon:function(index,searchValue,type,pcateUrl){
		if("undefined"!=typeof(pcateUrl)){
			view.pcateUrl = pcateUrl;
		}
		//根据外部条件重新加载表格中的数据
		var grid = Ext.getCmp(view.namePrefix+index);
		
		if(undefined!=type && type=="01"){
			if(undefined!=typeof(grid.getStore().baseParams.categorycon)){
				grid.getStore().baseParams={extracon:searchValue,categorycon:grid.getStore().baseParams.categorycon};
			}else{
				grid.getStore().baseParams={extracon:searchValue};
			}
		}else{
			
			grid.getStore().baseParams={categorycon:searchValue};
		}
		grid.getStore().removeAll();
		grid.getBottomToolbar().updateInfo();
		grid.getStore().reload({params:{start:0,limit:view.viewBaseInfos[index].pageSize}});
	},
	
	/**
	 * 根据一个字段名称判断一个字段是否为起字段
	 * @param {} inputName
	 * @param {} index
	 * @return {}
	 */
	hasBeginInputName:function(inputName,index){
		var result = false;

		var advancedQueryItems = view.viewBaseInfos[index].advancedJson;
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
	},
	
	/**
	 * 加载视图中的字段列表
	 * 
	 * @param {} viewId
	 */
	loadItemsConfig:function(viewId){
		var json = null;
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getFormItemEnCn",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){
					json = Ext.util.JSON.encode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					return json;
				} else {
					Ext.Msg.alert("提示","表单字段或数据库视图字段加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 根据视图标识获取视图名称
	 * 
	 * @param {} viewIds 视图标识
	 */
	getViewDisplayName:function(viewIds){
		var tjson=null;
		var url =ucapSession.baseAction;
		
		url+="?viewIds="+viewIds+"&action=getViewName&type=getView&rand="+Math.random();
		
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var exjson = Ext.util.JSON.encode(conn.responseText);					
		var exResult=ucapCommonFun.dealException(exjson);
		if(!exResult)return;
		
		return conn.responseText;
	//tjson = Ext.util.JSON.decode(conn.responseText);
		//return tjson.titles;
	},
	/**
	 * 视图编辑保存前验证函数
	 * @param {} jsondata 保存前的Json数据
	 * @return {Boolean}
	 */
	viewSaveValidator:function(jsondata){
		return true;
	}
	
}//end view

var viewTabs={
	tabs:null,
	isInit:false,
	tabViewIds:null,
	closeabled:false,
	
	addTab:function(viewId,title,index){
		if(ucapSession.middleHeight==0){
			ucapCommonFun.autoMenuHeight();
		}
		var ght = ucapSession.middleHeight;
		ght = ght-25;//减去页签的高度
		
		if(null==title || title==undefined){
			title = "未知";
		}
		if(index!=0)this.closeabled = false;
		var tabPanel = viewTabs.tabs.add({
			id:viewId,
			title:title,
			tabTip:title,
			header:false,
			html:"<iframe name='ifr"+viewId+"' id='"+viewId+"' src='"+ucapSession.appPath+"sys/jsp/view.jsp?viewId="+viewId+"&isTab=1' style='width:100%;height:"+ght+"px' marginwidth='1' frameborder='0' scrolling='no'></iframe>",
            closable:this.closeabled
        });//.show()
        viewTabs.tabs.on("remove",viewTabs.tabRemove);
        if(index==0){
        	tabPanel.show();
        	Ext.getDom('ifr'+viewId).src = ucapSession.appPath+"sys/jsp/view.jsp?viewId="+viewId+"&isTab=1";
        }
	},
	
	init:function(renderto){
		if(viewTabs.isInit){
			if(null!=viewTabs.tabViewIds && viewTabs.tabViewIds.length>0){
				viewTabs.tabViewIds.splice(0,viewTabs.tabViewIds.length);//移除所有的视图id
			}
			viewTabs.closeabled = true;
			return;
		}else{
			viewTabs.closeabled = false;
		}
		if(ucapSession.middleHeight==0){
			ucapCommonFun.autoMenuHeight();
		}
		var ght = ucapSession.middleHeight;
		ght = ght-20;//减去页签的高度
		
		Ext.getDom(renderto).innerHTML="";
		viewTabs.tabs = new Ext.TabPanel({
        	renderTo:renderto,
        	activeTab:0,
        	resizeTabs:true, // turn on tab resizing
        	minTabWidth: 65,
        	tabWidth:85,
        	enableTabScroll:true,
        	height:ght,
			bodyBorder:false,
			frame:false,
			autoWidth:true,
        	defaults: {autoScroll:false},
        	plugins: new Ext.ux.TabCloseMenu()
    	});
    	
     	viewTabs.isInit=true;
	},
	
	/**
	 * 根据视图id删除其中已存在项
	 * @param {} vid
	 */
	removeTabId:function(vid){
		if(undefined!=viewTabs.tabViewIds.length && viewTabs.tabViewIds.length>0){
			for(var i=0;i<viewTabs.tabViewIds.length;i++){
				if(viewTabs.tabViewIds[i]==vid){
					viewTabs.tabViewIds.splice(i,1);
					break;
				}
			}
		}
	},
	
	/**
	 * 页签删除事件
	 * @param {} item
	 * @param {} c
	 */
	tabRemove:function(item,c){
		viewTabs.removeTabId(c.id);
	}
}


Ext.ux.TabCloseMenu = function(){
    var tabs, menu, ctxItem;
    this.init = function(tp){
        tabs = tp;
        tabs.on('contextmenu', onContextMenu);
    }

    function onContextMenu(ts, item, e){
        if(!menu){ // create context menu on first right click
            menu = new Ext.menu.Menu([{
                id: tabs.id + '-close',
                text: '关闭页签',
                handler : function(){
                	viewTabs.removeTabId(item.id);
                    tabs.remove(ctxItem);
                }
            },{
                id: tabs.id + '-close-others',
                text: '关闭其它页签',
                handler : function(){
                    tabs.items.each(function(item){
                        if(item.closable && item != ctxItem){
                        	viewTabs.removeTabId(item.id);
                            tabs.remove(item);
                        }
                    });
                }
            }]);
        }
        ctxItem = item;
        var items = menu.items;
        items.get(tabs.id + '-close').setDisabled(!item.closable);
        var disableOthers = true;
        tabs.items.each(function(){
            if(this != item && this.closable){
                disableOthers = false;
                return false;
            }
        });
        items.get(tabs.id + '-close-others').setDisabled(disableOthers);
        menu.showAt(e.getPoint());
    }
};

//开始加载
/**
 * 初始化视图
 * @param {} viewId 视图标识
 * @param {} renderto 绚烂的div标识
 * @param {} isQuery 是否有查询 true时没有
 * @param {} noPreview 是否没有预览 true时没有
 * @param {} noSelfConfig 是否没有自定义 true时没有
 */
function initView(viewId,renderto,title,hasTab,purl,outTbarHeight,noQuery,noPreview,noSelfConfig) {
	//var hasShow = false; 
	if (Ext.getDom(ucapSession.portalID))
		Ext.getDom(ucapSession.portalID).innerHTML="";
	if (Ext.getDom(ucapSession.portal_info))
		Ext.getDom(ucapSession.portal_info).style.display="none";
	//外部
	if("undefined"==typeof(purl)){
		view.purl = "";
	}else{
		view.purl = purl;
	}
	
	if("undefined"!=typeof(outTbarHeight)){
		view.outOtherHeight = outTbarHeight;
	}else{
		view.outOtherHeight = 0;
	}
	
	var viewIds = viewId.split(",");
	var titles = [];
	if(viewIds.length>1){
		if(undefined==hasTab || !hasTab){
			if(undefined!=viewTabs.tabViewIds && viewTabs.tabViewIds.length>0){
				viewTabs.tabViewIds.splice(0,viewTabs.tabViewIds.length);//移除所有的视图id
			}
			viewTabs.isInit = false;
		}
		var tls = view.getViewDisplayName(viewId);
		//alert(viewId+"  "+tls);
		titles = tls.split(",");
		hasTab = true;
	}
	if(undefined==hasTab || !hasTab){
		view.viewBaseInfos = new Array();
		view.viewId = viewId;
		view.renderto = renderto;
		Ext.QuickTips.init();// 浮动信息提示
		view.initview(viewId,renderto,noQuery,noPreview,noSelfConfig);
		view.hasTab = false;
	}else{
		
		for(var i=0;i<viewIds.length;i++){
			var tmpViewId = viewIds[i];
			view.hasTab = true;
			if(undefined!=viewTabs.tabViewIds && viewTabs.tabViewIds.length>0 && viewTabs.isInit){
				var hasTab = false;
				viewTabs.tabs.items.each(function(item){
			 		if(item.id==tmpViewId){
			 			viewTabs.tabs.activate(item.id);
			 			//Ext.getDom('ifr'+viewId).src = ucapSession.appPath+"sys/jsp/view.jsp?viewId="+viewId;
			 			hasTab = true;
			 		}
             	})
             	if(hasTab)return;
			}
			viewTabs.init(renderto);
			if(i<titles.length){
				viewTabs.addTab(tmpViewId,titles[i],i);
			}else{
				viewTabs.addTab(tmpViewId,title,i);
			}
			if(undefined==viewTabs.tabViewIds){
				viewTabs.tabViewIds = new Array();
			}
			viewTabs.tabViewIds[viewTabs.tabViewIds.length]=tmpViewId;
			//alert("*");
			if(viewIds.length>1)viewTabs.tabs.show(viewIds[0]);
			
		}
		
	}

};//end ready


function initFormJspView(viewId,renderto,purl,noQuery,noPreview,noSelfConfig,isTab,noTbar,noBbar,isSingle,recordSplit,colSplit){
	Ext.QuickTips.init();// 浮动信息提示

	view.viewBaseInfos = new Array();//重新定义视图的定义信息
	
	view.renderto = renderto;
	view.viewId = viewId;
	view.hasTab = false;
	
	if("undefined"!=typeof(isSingle))view.isSingle = isSingle;
	if("undefined"!=typeof(recordSplit))view.recordSplit=recordSplit;
	if("undefined"!=typeof(colSplit))view.colSplit = colSplit;
	if("undefined"!=typeof(isTab))view.isTab=isTab;
	if("undefined"!=typeof(noTbar))view.noTbar = noTbar;
	if("undefined"!=typeof(noBbar))view.noBbar = noBbar;
	
	if(undefined==purl){
		view.purl = "";
	}else{
		view.purl = purl;
	}
	
	view.initview(viewId,renderto,noQuery,noPreview,noSelfConfig);
}

function initJspView(viewId,renderto,purl,noQuery,noPreview,noSelfConfig) {
	if("undefined"!=typeof(renderto) && renderto!=""){
		var pdiv = Ext.getDom(renderto);
		
		pdiv.innerHTML = "<iframe name=\"ifr"+viewId+"\" id=\""+viewId+"\" style='width:100%;height:300px;' scrolling='no' marginwidth='1' frameborder='0' src='false'></iframe>";
		
		//alert(purl);
		var re = /&/g;
		
		purl = purl.replace(re,"~$*$~");
		
		var frmUrl = ucapSession.appPath+"sys/jsp/view.jsp?viewId="+viewId+"&purl="+purl;
		
		if("undefined"!=typeof(noQuery)){
			frmUrl+="&noQuery="+noQuery;
		}
		
		if("noPreview"!=typeof(noPreview)){
			frmUrl+="&noPreview="+noPreview;
		}
		if("noSelfConfig"!=typeof(noSelfConfig)){
			frmUrl+="&noSelfConfig="+noSelfConfig;
		}
		var isEdit=1; //默认为可编辑  -1不能查看 0 只读 1可编辑
		//如果是子视图，则文档的打开权限要根据父文档的权限来判断
		if (window.parent && window.parent._UcapForm){
			isEdit = window.parent._UcapForm.cfg.isRead;	
		}
		if (typeof isEdit=="undefined" || "undefined"==isEdit || !isEdit){
			isEdit  = _UcapForm.cfg.isRead;
		}
		if (isEdit!=1){
			isEdit ="&r=0";
		} else {
			isEdit="&r=1";	
		}
		Ext.getDom("ifr"+viewId).src = frmUrl+isEdit;
	}
};//end ready

//重写以下这个方法，表格的行就允许多选
/*
Ext.override(Ext.grid.RowSelectionModel,{	
	clickMulSelect : true,
	handleMouseDown : function(g, rowIndex, e){       
		if(e.button !== 0 || this.isLocked()){
        	return;
    	};
    	var view = this.grid.getView();
		//shift 多行选择
    	if(e.shiftKey && !this.singleSelect && this.last !== false){			
        	var last = this.last;
        	this.selectRange(last, rowIndex, e.ctrlKey);
        	this.last = last; // reset the last
        	view.focusRow(rowIndex);
    	}else{			
        	var isSelected = this.isSelected(rowIndex);			
        	if((e.ctrlKey || this.clickMulSelect) && isSelected){
            	this.deselectRow(rowIndex);
        	}else if(!isSelected || this.getCount() > 1){
            	this.selectRow(rowIndex, e.ctrlKey || e.shiftKey || this.clickMulSelect);
            	view.focusRow(rowIndex);
        	}
     	}
 	}
});
*/

//重写这个方法，以便回车时，鼠标可以移动本行的下一单元格
Ext.override(Ext.grid.RowSelectionModel, {   
    onEditorKey : function(field, e) {    
       var k = e.getKey(), newCell, g = this.grid, ed = g.activeEditor;   
       var shift = e.shiftKey;    
       var colCount = g.getColumnModel().getColumnCount(false);
       var rowCount = g.getStore().getCount();//获取当前的行数
       
       if (k == e.ENTER) {   
            e.stopEvent();   
            ed.completeEdit();   
            if (shift) {   
                   newCell = g.walkCells(ed.row, ed.col - 1, -1,this.acceptsNav, this);   
            } else {
            	 if(rowCount==(ed.row+1) && colCount==(ed.col+1)){
            	   	view.addEditorGridRow();
            	 }else{
            	   	newCell = g.walkCells(ed.row, ed.col + 1, 1,this.acceptsNav, this);   
            	 }
            	 //newCell = g.walkCells(ed.row, ed.col + 1, 1,this.acceptsNav, this);   
            }   
        } else if (k == e.TAB) {   
            e.stopEvent();   
            ed.completeEdit();   
            newCell = g.walkCells(ed.row, ed.col - 1, -1,this.acceptsNav, this); 
//            if (this.moveEditorOnEnter !== false) {   
//               if(shift) {   
//                    newCell = g.walkCells(ed.row - 1, ed.col, -1,this.acceptsNav, this);   
//               } else {   
//                    newCell = g.walkCells(ed.row + 1, ed.col, 1,this.acceptsNav, this);   
//               }   
//            }   
       } else if (k == e.ESC) {   
            ed.cancelEdit();   
       }   
       if (newCell) {
       		g.getSelectionModel().selectRow(newCell[0]);
            g.startEditing(newCell[0], newCell[1]);   
       }   
    }   
});
var viewTree={
	dataUrl:ucapSession.baseAction+"?type=getView&action=getCategory",
	viewId:"",
	index:0,
	rootJson:null,
	deptId:"",
	
	/**
	 * 
	 * @param {} viewId
	 * @param {} renderto
	 * @param {} index
	 * @param {} categoryItemType
	 */
	init:function(viewId,renderto,index,categoryItemType){
		//Ext.BLANK_IMAGE_URL = "../../uistyle/images/s.gif";
		var url = viewTree.dataUrl+"&viewId="+viewId;
		/*add by jc 20090813 组合当前URL上的参数*/
		var ourl = Ext.urlDecode(view.purl);
		delete ourl["type"];
		url += "&"+Ext.urlEncode(ourl);
		
		viewTree.viewId = viewId;
		
		if("undefined"!=typeof(categoryItemType) && categoryItemType=="04"){
			//获取根节点对象
			var rurl =ucapSession.baseAction;
			rurl+="?action=getDeptTree&type=treeSelect&unid=&rand="+Math.random();
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", rurl, false);
			conn.send(null);
			var exjson = Ext.util.JSON.decode(conn.responseText);	
			var exResult=ucapCommonFun.dealException(exjson);
			if(!exResult)return;
			
			if("undefined"!=typeof(conn.responseText) && conn.responseText!=""){
				viewTree.rootJson = Ext.util.JSON.decode(conn.responseText)[0];
				deptId = this.rootJson.id;
				url+="&deptUnid="+deptId;
			}else{
				viewTree.rootJson = {id:viewId,text:"视图分类"};	
			}
			//树形根节点加载完毕
		}else{
			viewTree.rootJson = {id:viewId,text:"视图分类"};
		}
		
        /************************** 创建表格面板**************************/
        var contacterTree = new Ext.tree.TreePanel({
            id:"treePanel_"+viewId,
            border:false,
            lines:true,            //为false去掉树的线
            rootVisible:true,              
            autoScroll:true,
            animate:true,    
            autoHeight : true,
            autoWidth : true,
			renderTo : renderto,         
            enableDD: false,         // 允许树可以拖拽
            containerScroll: true,
			
            //设置数据加载
            loader: new Ext.tree.TreeLoader({			
                dataUrl:url
            }),
            
            //设置树形的根节点
            root:new Ext.tree.AsyncTreeNode({
                id : viewTree.rootJson.id,
                text: viewTree.rootJson.text,
                draggable:false,        
                //checked:false,
                expanded: true   // 展开根节点下的节点
            }),
				 
            listeners:{
               	click : function(node){
               		var searchValue = "";
               		var pcateUrl = "";
               		while(node.id!=viewTree.viewId){
               			if("undefined"==typeof(node.attributes.name) || node.attributes.name==""){
               				break;
               			}
               			if(searchValue.indexOf(node.attributes.name)>=0){
               				node = node.parentNode;
               				continue;
               			}
               			if(searchValue==""){
               				searchValue=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               				+view.fieldConstType+node.attributes.value+view.fieldEndPrefix;
               				pcateUrl = node.attributes.name+"="+node.attributes.value;
               			}else{
               				searchValue=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               				+view.fieldConstType+node.attributes.value+view.fieldEndPrefix+view.sqlAnd+searchValue;
               				pcateUrl+="&"+node.attributes.name+"="+node.attributes.value;
               			}
               			node = node.parentNode;
               			if(null==node || "undefined"==typeof(node)){
               				break;
               			}
               		}
               		//重新加载视图中的数据
               		view.reloadByCon(index,searchValue,"00",pcateUrl);                      
                },
                beforeload:function(node){
                	
                }
            }//end listeners
      });

    /**
     * 树形加载前的事件
     */
    contacterTree.on('beforeload', 
        function(node){ 
			if(!node.isLeaf()){
			 	
				var url = viewTree.dataUrl+"&viewId="+viewTree.viewId+"&itemName="+node.attributes.name; 
				var conn = "";         //上级的条件
				while(node.id!=viewTree.viewId){
					if(conn.indexOf(node.attributes.name)>=0){
						node = node.parentNode;
						continue;
					}
					
               		if(conn==""){
               	    	conn=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               	    	+view.fieldConstType+node.attributes.value+view.fieldEndPrefix;
               		}else{
               			conn=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               			+view.fieldConstType+node.attributes.value+view.fieldEndPrefix+view.sqlAnd+conn;
               		}
               		node = node.parentNode;
               		if(null==node || "undefined"==typeof(node)){
               			break;
               		}
               	}//end while
               	 
				url+="&conn="+conn;
			    contacterTree.loader.dataUrl=url; 
			     
			}//end if
         }
     ); 
         
   }//end init
}/**
 * 排序
 * @type 
 */
var sortItem={
	sortItem:"",
	
	json:null
}

/**
 * 视图自定义对象，
 * 
 * @type 
 */
var viewConfig={
	
	hasViewColumnConfig:false,
	
	/**
	 * 自定义视图的基本信息
	 * 
	 * @param {} viewid
	 */
	configViewInfo:function(viewId){
		var html="sys/cfgJsp/view/viewinfo.jsp?unid="+viewId;
		var button=[
					{text:"确定",handler:function(){viewConfigFun.viewInfoConfirm(viewId)}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close()}
					}];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"视图基本信息自定义",
		    width:650,
		    closable:true,    //取消
		    modal: true,     
			height:260,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			//html:ucapSession.win.getIframeHtml("viewInfoConfig",html),
			buttons:button
		});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义视图列
	 * 
	 * @param {} viewId
	 */
	configViewColumns:function(viewId){
		var html="sys/cfgJsp/view/viewcolumns.jsp?unid="+viewId+"&personalconfig=1";
		var button=[{text:"确定",handler:function(){viewConfigFun.viewColumnsConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"视图列自定义",
		        width:880,
		        closable:true,    //取消
		        modal: true,     
				height:400,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义简单查询
	 * @param {} viewId
	 */
	configSimpleQuery:function(viewId){
		var html="sys/cfgJsp/view/querySimpleItem.jsp?unid="+viewId+"&personalconfig=1";
		var button=[{text:"确定",handler:function(){viewConfigFun.querySimpleItemConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close()}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"简单查询自定义",
		        width:480,
		        closable:true,    //取消
		        modal: true,     
				height:440,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义高级查询
	 * 
	 * @param {} viewId
	 */
	configAdvancedQuery:function(viewId){
		var html="sys/cfgJsp/view/queryAdvancedItem.jsp?unid="+viewId+"&personalconfig=1";
		var button=[{text:"确定",handler:function(){viewConfigFun.queryAdvancedItemConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close()}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"高级查询自定义",
		        width:480,
		        closable:true,    //取消
		        modal: true,     
				height:440,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义排序信息
	 * 
	 * @param {} viewId
	 */
	configSortItem:function(viewId){
		var html="sys/cfgJsp/view/sortItem.jsp?unid="+viewId+"&personalconfig=1";
		//var html="sys/cfgJsp/view/viewcolumns.jsp?viewId="+viewId;
		
		var button=[{text:"确定",handler:function(){viewConfigFun.sortItemConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"视图排序自定义",
		        width:480,
		        closable:true,    //取消
		        modal: true,     
				height:420,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义分类信息
	 * @param {} viewId
	 */
	configCategoryItem:function(viewId){
		var html="sys/cfgJsp/view/categoryitem.jsp?unid="+viewId+"&personalconfig=1";
		var button=[{text:"确定",handler:function(){viewConfigFun.viewCategoriesConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"视图分类自定义",
		        width:880,
		        closable:true,    //取消
		        modal: true,     
				height:420,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 视图自定义恢复默认
	 * 
	 * @param {} viewId
	 */
	configViewCondition:function(viewId){
		var html="sys/cfgJsp/view/viewConditionCfg.jsp?unid="+viewId+"&personalconfig=1";
		//var html="sys/cfgJsp/view/viewcolumns.jsp?viewId="+viewId;
		
		var button=[{text:"确定",handler:function(){viewConfigFun.viewConditionConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"视图条件",
		        width:880,
		        closable:true,    //取消
		        modal: true,     
				height:420,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 视图自定义恢复默认
	 * 
	 * @param {} viewId
	 */
	configSubButton:function(viewId){
		var html="sys/cfgJsp/subbutton/subbutton.jsp?unid="+viewId+"&personalconfig=1&btntype=03";
		//var html="sys/cfgJsp/view/viewcolumns.jsp?viewId="+viewId;
		
		var button=[{text:"确定",handler:function(){viewConfigFun.subButtonConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"视图子按钮",
		        width:880,
		        closable:true,    //取消
		        modal: true,     
				height:400,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 视图自定义恢复默认
	 * 
	 * @param {} viewId
	 */
	configRestoreDefault:function(viewId){
		var html="sys/cfgJsp/view/restoreDefault.jsp?unid="+viewId;
		//var html="sys/cfgJsp/view/viewcolumns.jsp?viewId="+viewId;
		
		var button=[{text:"确定",handler:function(){viewConfigFun.restoreDefaultConfirm(viewId);}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new Ext.Window({
				title:ucapSession.win.winImg+"恢复默认",
		        width:280,
		        closable:true,    //取消
		        modal: true,     
				height:320,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	}
	
}

/**
 * 视图自定义中相关的功能实现
 * 
 * @type 
 */
var viewConfigFun={
	
	viewConfigItems:null,//默认
	
	viewCofigColumns:null,//视图列
	
	viewConfigCategoriesItems:null,//视图分类列
	
	viewSortItems:null,            //视图排序列
	
	viewQuerySimpleItems:null,     //视图简单查询
	
	viewQueryAdvancedItems:null,   //视图高级查询
	
	subButtonItems:null,           //子按钮列表
	
	itemConfigList:null,           //字段列表
	
	buttonConfigList:null,         //按钮列表
	
	/**
	 * 恢复默认
	 */
	restoreDefaultConfirm:function(viewId){
		var json = ucapCommonFun.getFormJSon("rdDialogHtml");
		var restoreType = json.restoreType;
		if(undefined==restoreType || restoreType==""){
			Ext.MessageBox.alert("提示","请选择要恢复默认的类型！");
			return;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"restoreDefault",
					"viewId":viewId,"restoreType":restoreType,"tmp":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					viewConfigFun.viewConfigRefresh(viewId);
					ucapSession.commonWin.close();
				} else {
					Ext.Msg.alert("提示","恢复默认不成功！");
					ucapSession.commonWin.close();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		
	},
	
	/**
	 * 视图条件保存
	 * 
	 * @param {} viewId 视图标识
	 */
	viewConditionConfirm:function(viewId,personnalConfig){
		viewConditionCfg.setCondition();
		var json={condition:viewConditionCfg.condition,conditionCn:viewConditionCfg.conditionCn};
		
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"saveViewCondition",
					"viewId":viewId,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						Ext.Msg.alert("提示","条件配置保存成功！");
					}
				} else {
					Ext.Msg.alert("提示","条件配置不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 把数组转化为json对象
	 * 
	 * @param {} viewId
	 */
	convertArray2Json:function(bfield,configInfoItems){
		
		var jsonString="";
		
		for(var i=0;i<configInfoItems.length;i++){
			var json = configInfoItems[i];
			
			if(undefined!=bfield && bfield!="" && bfield.length>0){
				for(var j=0;j<bfield.length;j++){
					if(json[bfield[j]]=="1"){
						json[bfield[j]]=true;
					}else{
						json[bfield[j]]=false;
					}
				}
			}
			
			if(jsonString==""){
				jsonString = Ext.util.JSON.encode(json);
			}else{
				jsonString +=","+Ext.util.JSON.encode(json);
			}
		}
		
		jsonString="{items:["+jsonString+"]}";
		
		return Ext.util.JSON.decode(jsonString);
	},
	/**
	 * 视图自定义后的刷新功能
	 */
	viewConfigRefresh:function(viewId){
		var griddiv = Ext.getDom(view.renderto);
		if(undefined==griddiv || null==griddiv)return;
		griddiv.innerHTML = "";
		view.refreshView(viewId,view.renderto,false);
	},
	
	/**
	 * 视图基本信息自定义
	 * @param {} viewId
	 */
	viewInfoConfirm:function(viewId){
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		if(json["turnPage"]=="1"){
			json["turnPage"] = true;
		}else{
			json["turnPage"] = false;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"saveViewInfo",
					"viewId":viewId,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					viewConfigFun.viewConfigRefresh(viewId);
					ucapSession.commonWin.close();
				} else {
					Ext.Msg.alert("提示","视图基本信息自定义不成功！");
					ucapSession.commonWin.close();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	
	/**
	 * 加载视图中的字段列表
	 * 
	 * @param {} viewId
	 */
	loadItemsConfig:function(viewId,listName){
		viewConfigFun.itemConfigList = new Array();
		var url =ucapSession.baseAction;
		url+="?viewId="+viewId+"&type=viewSelfConfig&action=getFormItemEnCn";
		url+="&tmp="+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var itemList = Ext.getDom(listName);
		var items = json.items;

		//alert(Ext.util.JSON.encode(json));
		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConfigFun.itemConfigList[i] = items[i];
				ucapCommonFun.addOption(itemList,items[i].unid,items[i].nameCn);
			}
		}
	},
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	viewColumnsConfigConfirm:function(viewId,personnalConfig){
		var json = ucapCommonFun.getFormJSon("viDialogHtml");
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<viewConfigFun.viewCofigColumns.length;i++){
				var tmpJson = viewConfigFun.viewCofigColumns[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewCofigColumns[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		var bfield=["statistics","displayCn","display"];
		json = viewConfigFun.convertArray2Json(bfield,viewConfigFun.viewCofigColumns);
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setViewColumn",
					"viewId":viewId,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					//Ext.Msg.alert("提示","视图排序保存成功！");
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						Ext.Msg.alert("提示","视图列配置保存成功！");
					}
				} else {
					Ext.Msg.alert("提示","视图排序保存不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 加载视图列信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 所在列标名称
	 */
	loadViewItemsConfig:function(viewId,listName){
		viewConfigFun.viewCofigColumns = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getViewColumns",
					"viewId":viewId,"tmp":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);				
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					var itemList = Ext.getDom(listName);
					var viewItems = json.viewItems;
					if(undefined!=viewItems && viewItems){
						for(var i=0;i<viewItems.length;i++){
							if(undefined==viewItems[i] || null==viewItems[i])continue;
							viewConfigFun.viewCofigColumns[i] = viewItems[i];
							var option = ucapCommonFun.addOption(itemList,viewItems[i].itemUnid,viewItems[i].displayName);
						}
					}
					
				} else {
					Ext.Msg.alert("提示","表单字段或数据库视图字段加载不成功！")
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 增加视图列基本信息
	 * 
	 * @param {} obj
	 */
	addViewColumn:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var viewColumnList = Ext.getDom("viewColumnList");

		for(var i=0;i<viewColumnList.options.length;i++){
			var tmpOpt = viewColumnList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(viewColumnList,selectOpt.value,selectOpt.text);
		
		var field=["itemUnid","displayName","width","widthType"];
		var value=[selectOpt.value,selectOpt.text,"100","01"];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue);
		
		//直接调用保存
		viewConfigFun.saveViewColumn(viewId);
	},
	
	/**
	 * 删除视图列
	 * 
	 * @param {} obj 视图列所在位置
	 * 
	 * @param {} viewId 视图标识
	 */
	delViewColumn:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewCofigColumns.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);	
		
		Ext.getDom("itemUnid").value="";
	},
	
	changeViewColumn:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("viDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			for(var i=0;i<viewConfigFun.viewCofigColumns.length;i++){
				var tmpJson = viewConfigFun.viewCofigColumns[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewCofigColumns[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		if(obj.selectedIndex<0)return;
		
		for(var i=0;i<viewConfigFun.viewCofigColumns.length;i++){
			
			var json = viewConfigFun.viewCofigColumns[i];
			if(json.itemUnid==obj.value){
				//modify by jc 20090818
				var field=["itemUnid","displayName","width","widthType","statistics",
					"displayCn","onclick","conversion","display","messageType","message","converseInteraction","converseInteraction_Cn_","onfocus","onfocusout","onchange"];
				var display="0";
				if(undefined!=json.display && (json.display==true || json.display=="1")){
					display = "1";
				}
				var statistics="0";
				if(undefined!=json.statistics && (json.statistics==true || json.statistics=="1")){
					statistics = "1";
				}
				var displayCn="0";
				if(undefined!=json.displayCn && (json.displayCn==true || json.displayCn=="1")){
					displayCn = "1";
				}
				//modify by jc 20090818
				var value=[json.itemUnid,json.displayName,json.width,json.widthType,statistics
					,displayCn,json.onclick,json.conversion,display,json.messageType,json.message,json.converseInteraction,json.converseInteraction_Cn_,json.onfocus,json.onfocusout,json.onchange];
				//alert(Ext.util.JSON.decode(json));
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue);
				break;
			}
		}
	},
	/**
	 * 保存视图列配置
	 * 
	 * @param {} viewId 视图标识
	 */
	saveViewColumn:function(viewId){
		var json = ucapCommonFun.getFormJSon("viDialogHtml");
		
		if(json.itemUnid==""){
			return;
		}
		
		viewConfigFun.viewCofigColumns[viewConfigFun.viewCofigColumns.length] = json;
	},
	
	/**
	 * 进行移动视图列
	 * @param {} viewId
	 * @param {} direction
	 */
	moveViewColumn:function(viewId,direction){
		var oldIndex = Ext.getDom("viewColumnList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("viewColumnList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewCofigColumns[oldIndex+direction];
			viewConfigFun.viewCofigColumns[oldIndex+direction] =viewConfigFun.viewCofigColumns[oldIndex]; 
			viewConfigFun.viewCofigColumns[oldIndex] = tmpJson;
			
		}
	},
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	viewCategoriesConfigConfirm:function(viewId,personnalConfig){
		var json = ucapCommonFun.getFormJSon("ciDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<viewConfigFun.viewConfigCategoriesItems.length;i++){
				var tmpJson = viewConfigFun.viewConfigCategoriesItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewConfigCategoriesItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		json = viewConfigFun.convertArray2Json("",viewConfigFun.viewConfigCategoriesItems);
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setCategoryItem",
					"viewId":viewId},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					//Ext.Msg.alert("提示","视图排序保存成功！");
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						Ext.Msg.alert("提示","视图分类保存成功！");
					}
				} else {
					Ext.Msg.alert("提示","视图分类保存不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 加载视图列信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 所在列标名称
	 */
	loadCategoryItemsConfig:function(viewId,listName){
		viewConfigFun.viewConfigCategoriesItems = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getCategoryItems",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){					
					var json = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					var itemList = Ext.getDom(listName);
					var viewItems = json.categoryItems;
					if(undefined!=viewItems && viewItems){
						for(var i=0;i<viewItems.length;i++){
							if(undefined==viewItems[i] || null==viewItems[i])continue;
							viewConfigFun.viewConfigCategoriesItems[i] = viewItems[i];
							var option = ucapCommonFun.addOption(itemList,viewItems[i].itemUnid,viewItems[i].itemCn);
						}
					}
					
				} else {
					Ext.Msg.alert("提示","表单字段或数据库视图字段加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 增加视图列基本信息
	 * 
	 * @param {} obj
	 */
	addCategoryItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var viewColumnList = Ext.getDom("categoryItemList");

		for(var i=0;i<viewColumnList.options.length;i++){
			var tmpOpt = viewColumnList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(viewColumnList,selectOpt.value,selectOpt.text);
		
		var field=["itemUnid","itemCn","itemType","itemValue"];
		var value=[selectOpt.value,selectOpt.text,"01",""];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue);
		
		//直接调用保存
		viewConfigFun.saveCategoryItem(viewId);
	},
	
	/**
	 * 删除视图列
	 * 
	 * @param {} obj 视图列所在位置
	 * 
	 * @param {} viewId 视图标识
	 */
	delCategoryItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewConfigCategoriesItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);	
		
		Ext.getDom("itemUnid").value="";
	},
	
	changeCategoryItem:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("ciDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			for(var i=0;i<viewConfigFun.viewConfigCategoriesItems.length;i++){
				var tmpJson = viewConfigFun.viewConfigCategoriesItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewConfigCategoriesItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		if(obj.selectedIndex<0)return;
		
		for(var i=0;i<viewConfigFun.viewConfigCategoriesItems.length;i++){
			
			var json = viewConfigFun.viewConfigCategoriesItems[i];
			if(json.itemUnid==obj.value){
				var field=["itemUnid","itemCn","itemType","itemValue","beginIndex",
					"endIndex"];
				
				var value=[json.itemUnid,json.itemCn,json.itemType,json.itemValue,json.beginIndex,json.endIndex];
				//alert(Ext.util.JSON.decode(json));
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue);
				break;
			}
		}
	},
	
	/**
	 * 保存视图列配置
	 * 
	 * @param {} viewId 视图标识
	 */
	saveCategoryItem:function(viewId){
		var json = ucapCommonFun.getFormJSon("ciDialogHtml");
		
		if(json.itemUnid==""){
			return;
		}
		
		viewConfigFun.viewConfigCategoriesItems[viewConfigFun.viewConfigCategoriesItems.length] = json;
	},
	
	/**
	 * 进行移动视图列
	 * @param {} viewId
	 * @param {} direction
	 */
	moveCategoryItem:function(viewId,direction){
		var oldIndex = Ext.getDom("categoryItemList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("categoryItemList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewConfigCategoriesItems[oldIndex+direction];
			viewConfigFun.viewConfigCategoriesItems[oldIndex+direction] =viewConfigFun.viewConfigCategoriesItems[oldIndex]; 
			viewConfigFun.viewConfigCategoriesItems[oldIndex] = tmpJson;
			
		}
	},
	
	/**
	 * 加载视图列信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 所在列标名称
	 */
	loadSortItemsConfig:function(viewId,listName){
		viewConfigFun.viewSortItems = new Array();
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getSortItems",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){					
					var json = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					var itemList = Ext.getDom(listName);
					var sortItems = json.sortItems;
					if(undefined!=sortItems){
						for(var i=0;i<sortItems.length;i++){
							if(undefined==sortItems[i] || null==sortItems[i])continue;
							viewConfigFun.viewSortItems[i] = sortItems[i];
							var option = ucapCommonFun.addOption(itemList,sortItems[i].sortItem,viewConfigFun.getItemNameCn(sortItems[i].sortItem));
						}
					}
					
				} else {
					Ext.Msg.alert("提示","表单字段或数据库视图字段加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	

	/**
	 * 增加视图排序
	 * 
	 * @param {} obj
	 * 
	 * @param {} viewId
	 */
	addSortItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var sortItemList = Ext.getDom("sortItemList");

		for(var i=0;i<sortItemList.options.length;i++){
			var tmpOpt = sortItemList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(sortItemList,selectOpt.value,selectOpt.text);
		
		var field=["sortItem","sortType"];
		var value=[selectOpt.value,"01"];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue);
		
		//直接调用保存
		viewConfigFun.saveSortItem(viewId);
	},
	
	/**
	 * 保存排序列
	 * @param {} viewId
	 */
	saveSortItem:function(viewId){
		var json = ucapCommonFun.getFormJSon("siDialogHtml");
		
		if(json.sortItem==""){
			return;
		}
		
		viewConfigFun.viewSortItems[viewConfigFun.viewSortItems.length] = json;
	},
	
	/**
	 * 删除排序列
	 * @param {} obj
	 * @param {} viewId
	 */
	delSortItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewSortItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);
	},
	
	/**
	 * 获取点击json格式的数据
	 * @param {} obj
	 * @param {} viewId
	 */
	changeSortItem:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("siDialogHtml");
		if(undefined!=json.sortItem && json.sortItem!=""){
			
			for(var i=0;i<viewConfigFun.viewSortItems.length;i++){
				var tmpJson = viewConfigFun.viewSortItems[i];
				if(tmpJson.sortItem==json.sortItem){
					viewConfigFun.viewSortItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		if(obj.selectedIndex<0)return;
		for(var i=0;i<viewConfigFun.viewSortItems.length;i++){
			json = viewConfigFun.viewSortItems[i];
			
			if(json.sortItem==obj.value){
				var field=["sortItem","sortType"];
				var value=[json.sortItem,json.sortType];
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue);
				break;
			}
		}
	},
	
	/**
	 * 移动视图排序zid
	 * 
	 * @param {} viewId
	 * @param {} direction
	 */
	moveSortItem:function(viewId,direction){
		var oldIndex = Ext.getDom("sortItemList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("sortItemList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewSortItems[oldIndex+direction];
			viewConfigFun.viewSortItems[oldIndex+direction] =viewConfigFun.viewSortItems[oldIndex]; 
			viewConfigFun.viewSortItems[oldIndex] = tmpJson;
			
		}
	},
	
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	sortItemConfigConfirm:function(viewId,personnalConfig){
		var json = ucapCommonFun.getFormJSon("siDialogHtml");
		//alert(Ext.encode(json));
		if(undefined!=json.sortItem && json.sortItem!=""){
			
			for(var i=0;i<viewConfigFun.viewSortItems.length;i++){
				var tmpJson = viewConfigFun.viewSortItems[i];
				if(tmpJson.sortItem==json.sortItem){
					viewConfigFun.viewSortItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		json = viewConfigFun.convertArray2Json("",viewConfigFun.viewSortItems);
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setSortItem",
					"viewId":viewId},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						Ext.Msg.alert("提示","视图排序保存成功！");
					}
				} else {
					Ext.Msg.alert("提示","视图排序保存不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	
	
	
	
	/**
	 * 加载视图查询信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 
	 */
	loadQuerySimpleItemsConfig:function(viewId,listName){
		viewConfigFun.viewQuerySimpleItems = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getSimpleQueryItems",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);				
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					var itemList = Ext.getDom(listName);
					var querySimpleItems = json.items;

					if(undefined!=querySimpleItems && querySimpleItems){
						for(var i=0;i<querySimpleItems.length;i++){
							if(undefined==querySimpleItems[i] || null==querySimpleItems[i])continue;
							viewConfigFun.viewQuerySimpleItems[i] = querySimpleItems[i];
							var option = ucapCommonFun.addOption(itemList,querySimpleItems[i].itemUnid,viewConfigFun.getItemNameCn(querySimpleItems[i].itemUnid));
						}
					}
					
				} else {
					Ext.Msg.alert("提示","视图简单查询列加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	
	/**
	 * 增加视图排序
	 * 
	 * @param {} obj
	 * 
	 * @param {} viewId
	 */
	addQuerySimpleItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var querySimpleItemList = Ext.getDom("querySimpleItemList");

		for(var i=0;i<querySimpleItemList.options.length;i++){
			var tmpOpt = querySimpleItemList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(querySimpleItemList,selectOpt.value,selectOpt.text);
		
		var field=["itemUnid","itemNameCn"];
		var value=[selectOpt.value,selectOpt.text];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue);
		
		//直接调用保存
		viewConfigFun.saveQuerySimpleItem(viewId);
	},
	
	/**
	 * 保存排序列
	 * @param {} viewId
	 */
	saveQuerySimpleItem:function(viewId){
		var json = ucapCommonFun.getFormJSon("qsDialogHtml");
		
		if(json.sortItem==""){
			return;
		}
		
		viewConfigFun.viewQuerySimpleItems[viewConfigFun.viewQuerySimpleItems.length] = json;
	},
	
	/**
	 * 删除排序列
	 * @param {} obj
	 * @param {} viewId
	 */
	delQuerySimpleItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewQuerySimpleItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);
	},
	
	/**
	 * 获取点击json格式的数据
	 * @param {} obj
	 * @param {} viewId
	 */
	changeQuerySimpleItem:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("qsDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<viewConfigFun.viewQuerySimpleItems.length;i++){
				var tmpJson = viewConfigFun.viewQuerySimpleItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewQuerySimpleItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		if(obj.selectedIndex<0)return;
		for(var i=0;i<viewConfigFun.viewQuerySimpleItems.length;i++){
			json = viewConfigFun.viewQuerySimpleItems[i];
			
			if(json.itemUnid==obj.value){
				var field=["itemUnid","itemNameCn"];
				var value=[json.itemUnid,json.itemNameCn];
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue);
				break;
			}
		}
	},
	
	/**
	 * 移动视图排序zid
	 * 
	 * @param {} viewId
	 * @param {} direction
	 */
	moveQuerySimpleItem:function(viewId,direction){
		var oldIndex = Ext.getDom("querySimpleItemList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("querySimpleItemList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewQuerySimpleItems[oldIndex+direction];
			viewConfigFun.viewQuerySimpleItems[oldIndex+direction] =viewConfigFun.viewQuerySimpleItems[oldIndex]; 
			viewConfigFun.viewQuerySimpleItems[oldIndex] = tmpJson;
			
		}
	},
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	querySimpleItemConfigConfirm:function(viewId,personnalConfig){
		var json = ucapCommonFun.getFormJSon("qsDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<viewConfigFun.viewQuerySimpleItems.length;i++){
				var tmpJson = viewConfigFun.viewQuerySimpleItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewQuerySimpleItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		json = viewConfigFun.convertArray2Json("",viewConfigFun.viewQuerySimpleItems);
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setSimpleQueryItem",
					"viewId":viewId},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						Ext.MessageBox.alert("提示","视图简单查询自定义成功！");
					}
				} else {
					Ext.MessageBox.alert("提示","视图简单查询自定义不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	
	
	
	
	
	//高级查询
	/**
	 * 加载视图查询信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 
	 */
	loadQueryAdvancedItemsConfig:function(viewId,listName){
		viewConfigFun.viewQueryAdvancedItems = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getAdvancedQueryItems",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					var itemList = Ext.getDom(listName);
					var queryAdvancedItems = json.items;

					if(undefined!=queryAdvancedItems && queryAdvancedItems){
						for(var i=0;i<queryAdvancedItems.length;i++){
							if(undefined==queryAdvancedItems[i] || null==queryAdvancedItems[i])continue;
							viewConfigFun.viewQueryAdvancedItems[i] = queryAdvancedItems[i];
							var option = ucapCommonFun.addOption(itemList,queryAdvancedItems[i].itemUnid,viewConfigFun.getItemNameCn(queryAdvancedItems[i].itemUnid));
						}
					}
					
				} else {
					Ext.Msg.alert("提示","视图高级查询列加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 增加视图排序
	 * 
	 * @param {} obj
	 * 
	 * @param {} viewId
	 */
	addQueryAdvancedItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var queryAdvancedItemList = Ext.getDom("queryAdvancedItemList");

		for(var i=0;i<queryAdvancedItemList.options.length;i++){
			var tmpOpt = queryAdvancedItemList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(queryAdvancedItemList,selectOpt.value,selectOpt.text);
		
		var field=["itemUnid","itemNameCn","hasBegin"];
		var value=[selectOpt.value,selectOpt.text,"1"];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue);
		
		//直接调用保存
		viewConfigFun.saveQueryAdvancedItem(viewId);
	},
	
	/**
	 * 保存排序列
	 * @param {} viewId
	 */
	saveQueryAdvancedItem:function(viewId){
		var json = ucapCommonFun.getFormJSon("qaDialogHtml");
		
		if(json.sortItem==""){
			return;
		}
		
		viewConfigFun.viewQueryAdvancedItems[viewConfigFun.viewQueryAdvancedItems.length] = json;
	},
	
	/**
	 * 删除排序列
	 * @param {} obj
	 * @param {} viewId
	 */
	delQueryAdvancedItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewQueryAdvancedItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);
	},
	
	/**
	 * 获取点击json格式的数据
	 * @param {} obj
	 * @param {} viewId
	 */
	changeQueryAdvancedItem:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("qaDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<viewConfigFun.viewQueryAdvancedItems.length;i++){
				var tmpJson = viewConfigFun.viewQueryAdvancedItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewQueryAdvancedItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		if(obj.selectedIndex<0)return;
		for(var i=0;i<viewConfigFun.viewQueryAdvancedItems.length;i++){
			json = viewConfigFun.viewQueryAdvancedItems[i];
			
			if(json.itemUnid==obj.value){
				var field=["itemUnid","itemNameCn","hasBegin"];
				var hasBegin = "0";
				if(undefined!=json.hasBegin && (json.hasBegin==true || json.hasBegin=="1")){
					hasBegin="1";
				}
				var value=[json.itemUnid,json.itemNameCn,hasBegin];
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue);
				break;
			}
		}
	},
	
	/**
	 * 移动视图排序zid
	 * 
	 * @param {} viewId
	 * 
	 * @param {} direction
	 */
	moveQueryAdvancedItem:function(viewId,direction){
		var oldIndex = Ext.getDom("queryAdvancedItemList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("queryAdvancedItemList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewQueryAdvancedItems[oldIndex+direction];
			viewConfigFun.viewQueryAdvancedItems[oldIndex+direction] =viewConfigFun.viewQueryAdvancedItems[oldIndex]; 
			viewConfigFun.viewQueryAdvancedItems[oldIndex] = tmpJson;
			
		}
	},
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	queryAdvancedItemConfigConfirm:function(viewId,personnalConfig){
		var json = ucapCommonFun.getFormJSon("qaDialogHtml");
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<viewConfigFun.viewQueryAdvancedItems.length;i++){
				var tmpJson = viewConfigFun.viewQueryAdvancedItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					tmpJson = json;
				}
			}
			
		}//end if(undefined!=json.s
		
		var bfield=["hasBegin"];
		
		json = viewConfigFun.convertArray2Json(bfield,viewConfigFun.viewQueryAdvancedItems);
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setAdvancedQueryItem",
					"viewId":viewId},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						Ext.MessageBox.alert("提示","视图高级查询自定义成功！");
					}
				} else {
					Ext.MessageBox.alert("提示","视图高级查询自定义不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 根据字段id获取中文名称
	 * @param {} itemUnid
	 * @return {}
	 */
	getItemNameCn:function(itemUnid){
		var nameCn = "";
		
		for(var i=0;i<viewConfigFun.itemConfigList.length;i++){
			var item = viewConfigFun.itemConfigList[i];
			if(item.unid==itemUnid){
				nameCn = item.nameCn;
				break;
			}
		}
		
		return nameCn;
	},
	
	
	
	//子按钮配置
		/**
	 * 加载视图中的字段列表
	 * 
	 * @param {} viewId
	 */
	loadButtonsConfig:function(btntype,listName){
		viewConfigFun.buttonConfigList = new Array();
		var url =ucapSession.baseAction;
		url+="?btntype="+btntype+"&type=subButton&action=getButtons";
		url+="&"+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var buttonList = Ext.getDom(listName);
		var items = json.items;

		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConfigFun.buttonConfigList[i] = items[i];
				ucapCommonFun.addOption(buttonList,items[i].unid,items[i].name);
			}
		}
	},
	
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	subButtonConfigConfirm:function(belongto,personnalConfig){
		var json = ucapCommonFun.getFormJSon("sbDialogHtml");
		
		if(undefined!=json.buttonUnid && json.buttonUnid!=""){
			
			for(var i=0;i<viewConfigFun.subButtonItems.length;i++){
				var tmpJson = viewConfigFun.subButtonItems[i];
				if(tmpJson.buttonUnid==json.buttonUnid){
					viewConfigFun.subButtonItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		var bfield=["display"];
		json = viewConfigFun.convertArray2Json(bfield,viewConfigFun.subButtonItems);
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"subButton","action":"saveSubButtons",
					"belongto":belongto,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					//Ext.Msg.alert("提示","视图排序保存成功！");
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(belongto);
						ucapSession.commonWin.close();
					}else{
						Ext.Msg.alert("提示","子按钮配置成功！");
					}
					
				} else {
					Ext.Msg.alert("提示","子按钮配置不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 加载视图列信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 所在列标名称
	 */
	loadSubButtonsConfig:function(belongto,listName){
		viewConfigFun.subButtonItems = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"subButton","action":"getSubButtons",
					"belongto":belongto},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);						
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					var itemList = Ext.getDom(listName);
					var subButtonItems = json.items;
					if(undefined!=subButtonItems && subButtonItems){
						for(var i=0;i<subButtonItems.length;i++){
							if(undefined==subButtonItems[i] || null==subButtonItems[i])continue;
							viewConfigFun.subButtonItems[i] = subButtonItems[i];
							var option = ucapCommonFun.addOption(itemList,subButtonItems[i].buttonUnid,subButtonItems[i].name);
						}
					}
					
				} else {
					Ext.Msg.alert("提示","子按钮列表加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 增加视图列基本信息
	 * 
	 * @param {} obj
	 */
	addSubButton:function(obj){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		var selectOpt = obj.options[obj.selectedIndex];
		
		var subButtonList = Ext.getDom("subbuttonList");

		for(var i=0;i<subButtonList.options.length;i++){
			var tmpOpt = subButtonList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		ucapCommonFun.addOption(subButtonList,selectOpt.value,selectOpt.text);
		
		var field=["buttonName","buttonUnid","name","display"];
		var value=[selectOpt.text,selectOpt.value,selectOpt.text,"1"];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue);
		
		//直接调用保存
		viewConfigFun.saveSubButton();
	},
	
	/**
	 * 删除视图列
	 * 
	 * @param {} obj 视图列所在位置
	 * 
	 * @param {} viewId 视图标识
	 */
	delSubButton:function(obj){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.subButtonItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);	
		
		Ext.getDom("buttonUnid").value="";
	},
	
	changeSubButton:function(obj){
		var json = ucapCommonFun.getFormJSon("sbDialogHtml");
		
		if(undefined!=json.buttonUnid && json.buttonUnid!=""){
			for(var i=0;i<viewConfigFun.subButtonItems.length;i++){
				var tmpJson = viewConfigFun.subButtonItems[i];
				if(tmpJson.buttonUnid==json.buttonUnid){
					viewConfigFun.subButtonItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		if(obj.selectedIndex<0)return;
		for(var i=0;i<viewConfigFun.subButtonItems.length;i++){
			
			var json = viewConfigFun.subButtonItems[i];
			if(json.buttonUnid==obj.value){
				var field=["buttonName","buttonUnid","name","display","picture","useScopes",
					"unuseScopes","interaction","js","altKey","menu","tip"];
				var display="0";
				if(undefined!=json.display && (json.display==true || json.display=="1")){
					display = "1";
				}			
				var value=[json.buttonName,json.buttonUnid,json.name,display,json.picture,json.useScopes
					,json.unuseScopes,json.interaction,json.js,json.altKey,json.menu,json.tip];
				//alert(Ext.util.JSON.decode(json));
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue);
				break;
			}
		}
		//add by jc 20090827扩展功能、使用范围的中文取值
		$("useScopes_Cn_").value = ucapCommonFun.getDisplayNames("200,201,202,203",$("useScopes").value,"20");
		$("unuseScopes_Cn_").value = ucapCommonFun.getDisplayNames("200,201,202,203",$("unuseScopes").value,"20");
		$("interaction_Cn_").value = ucapCommonFun.getDisplayNames("227",$("interaction").value,"20");
	},
	
	/**
	 * 保存视图列配置
	 * 
	 * @param {} viewId 视图标识
	 */
	saveSubButton:function(){
		var json = ucapCommonFun.getFormJSon("sbDialogHtml");

		if(undefined==json.buttonUnid || json.buttonUnid==""){
			return;
		}
		
		viewConfigFun.subButtonItems[viewConfigFun.subButtonItems.length] = json;
	},
	
	/**
	 * 进行移动子按钮
	 * 
	 * @param {} belongto
	 * 
	 * @param {} direction
	 */
	moveSubButton:function(direction){
		var oldIndex = Ext.getDom("subbuttonList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("subbuttonList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.subButtonItems[oldIndex+direction];
			viewConfigFun.subButtonItems[oldIndex+direction] =viewConfigFun.subButtonItems[oldIndex]; 
			viewConfigFun.subButtonItems[oldIndex] = tmpJson;
			
		}
	}
	
}﻿/**
 * 视图条件自定义
 * 
 * @type 
 */
var viewConditionCfg = {
	
    compareCfgs:["~!@0~!@0","~!@0~!@1","~!@0~!@2","~!@0~!@3","~!@0~!@4","~!@0~!@5","~!@0~!@6"
    ,"~!@0~!@7","~!@0~!@8","~!@0~!@9","~!@0~!@A","~!@0~!@B"],
    
    compareSqls:[" = "," >= "," <= "," > "," < "," LIKE "," LIKE "," LIKE "," NOT LIKE "," IS NULL "," IS NOT NULL "," != "],
	
	dbItems:null,               //数据库字段列表
	
	flowItems:null,             //流程字段列表
	
	sysParamsItems:null,        //系统参数列表
	
	cfgType:"1",                //配置类型，为手工输入或者为配置，0：手工输入；1：配置
	
	condition:"",               //视图条件
	
	conditionCn:"",             //视图条件的中文配置
	
	optionSplit:"~@$<br/>$@~", //option间的分隔符号
	
	fieldEndPrefix:"~!@E@!~",   //字段结束标识符
		
	

	/**
	 * 先初始化数据界面
	 */
	init:function(viewId){
		//先初始化视图配置界面(1)获取数据库字段 (2)、获取流程字段 (3)、获取系统变量
		viewConditionCfg.getViewCondition(viewId);
		var manaulTable = Ext.getDom("manualCfg");
		var sysTable = Ext.getDom("sysCfg");
		if(viewConditionCfg.conditionCn=="" && viewConditionCfg.condition!=""){//为手工输入条件
			viewConditionCfg.cfgType = 0;
			viewConditionCfg.checkRadio('0');
			
			
			manaulTable.style.display="";
			sysTable.style.display = "none";
			
			var conInput = Ext.getDom("contextarea");
			conInput.innerText = viewConditionCfg.condition;
		}else{
			viewConditionCfg.cfgType = 1;
			viewConditionCfg.checkRadio('1');
			manaulTable.style.display="none";
			sysTable.style.display = "";
			
			var cons = viewConditionCfg.condition.split(viewConditionCfg.optionSplit);
			var conCns = viewConditionCfg.conditionCn.split(viewConditionCfg.optionSplit);
			
			var resultCn = Ext.getDom("resultsSel_CN");
			
			//循环所有条件
			for(var i=0;i<cons.length;i++){
				ucapCommonFun.addOption(resultCn,cons[i],conCns[i]);
			}
			
			//并且开始初始化选择界面
			viewConditionCfg.initSel(viewId,"~!@DB@!~","leftSel_CN");
			viewConditionCfg.initSel(viewId,"~!@DB@!~","rightSel_CN");
		}
	},
	
	/**
	 * 选中radio的状态值
	 * 
	 * @param {} val
	 */
	checkRadio:function(val){
		var radios = document.getElementsByName("cfgType");
		for(var i=0;i<radios.length;i++)
		{
			if(radios[i].value==val){
				radios[i].checked=true;
			}
		}
	},
	
	
	/**
	 * 根据视图标识获取数据库视图绑定的字段
	 * 
	 * @param {} viewId
	 */
	getDbItems:function(viewId,refresh){
		/**
		 * 如果不为空的话以及不是刷新的话则不重新加载
		 */
		if(undefined!=viewConditionCfg.dbItems && null!=viewConditionCfg.dbItems && !refresh)return;
		
		viewConditionCfg.dbItems = new Array();
		
		var url =ucapSession.baseAction;
		url+="?viewId="+viewId+"&type=viewSelfConfig&action=getFormItemEnCn";
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);			
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var items = json.items;

		//alert(Ext.util.JSON.encode(json));
		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConditionCfg.dbItems[i] = items[i];
			}
		}
	},
	
	/**
	 * 获取流程字段列表
	 * 
	 * @param {} viewId
	 */
	getFlowItems:function(){
		/**
		 * 如果不为空的话以及不是刷新的话则不重新加载
		 */
		if(undefined!=viewConditionCfg.flowItems && null!=viewConditionCfg.flowItems)return;
		viewConditionCfg.flowItems = new Array();
		
		var url =ucapSession.baseAction;
		url+="?type=viewSelfConfig&action=getFlowItems";
		
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var items = json.items;

		//alert(Ext.util.JSON.encode(json));
		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConditionCfg.flowItems[i] = items[i];
			}
		}
	},
	
	/**
	 * 获取系统参数列表
	 * 
	 * @param {} viewId
	 */
	getSysParams:function(){
		/**
		 * 如果不为空的话以及不是刷新的话则不重新加载
		 */
		if(undefined!=viewConditionCfg.sysParamsItems && null!=viewConditionCfg.sysParamsItems)return;
		
		viewConditionCfg.sysParamsItems = new Array();
		
		var url =ucapSession.baseAction;
		url+="?type=viewSelfConfig&action=getSysParams";
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var items = json.items;

		//alert(Ext.util.JSON.encode(json));
		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConditionCfg.sysParamsItems[i] = items[i];
			}
		}
	},
	
	/**
	 * 通过视图标识获取已经配置好的视图条件
	 * 
	 * @param {} viewId
	 */
	getViewCondition:function(viewId){
		var url =ucapSession.baseAction;
		url+="?viewId="+viewId+"&type=viewSelfConfig&action=getViewCondition&rand="+Math.random();
		
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);

		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		//设置视图条件
		viewConditionCfg.condition = json.condition;
		viewConditionCfg.conditionCn = json.conditionCn;

	},
	
	
	initSel:function(viewId,type,selName){
		//根据类型以及相应选择列名称进行初始化
		var items = null;
		if(typeof(selName)=="string"){
			selName = Ext.getDom(selName);
		}
		
		//先清空所有选项
		var length = selName.options.length;
		for(var i=0;i<length;i++){
			selName.options.remove(0);
		}
		
		selName.style.display="";
		var re = /Sel/g;
		var inputName = Ext.getDom(selName.id.replace(re,"Input"));
		inputName.style.display = "none";
		
		if(type=="~!@DB@!~" || type=="~!@FW@!~"){
			if(type=="~!@DB@!~"){
				viewConditionCfg.getDbItems(viewId,false);
				items = viewConditionCfg.dbItems;
			}else{
				items = viewConditionCfg.getFlowItems();
				items = viewConditionCfg.flowItems;
			}
			
			for(var i=0;i<items.length;i++){
				ucapCommonFun.addOption(selName,items[i].nameEn,items[i].nameCn);
			}
		}else if(type=="~!@XY@!~"){
			viewConditionCfg.getSysParams();
			items = viewConditionCfg.sysParamsItems;
			for(var i=0;i<items.length;i++){
				ucapCommonFun.addOption(selName,items[i].unid,items[i].name);
			}
		}else{
			selName.style.display = "none";
			inputName.style.display = "";
		}
	},
	
	/**
	 * 在配置的情况下设置条件值
	 */
	setCondition:function(){
		//先初始化
		viewConditionCfg.condition = ""; 
		viewConditionCfg.conditionCn = "";
		
		if(viewConditionCfg.cfgType=="0"){//手工输入
			viewConditionCfg.condition = Ext.getDom("contextarea").innerText ;
		}else{
			var selectCn = Ext.getDom("resultsSel_CN");
			
			for(var i=0;i<selectCn.options.length;i++){
				var option = selectCn.options[i];
				if(viewConditionCfg.condition==""){
					viewConditionCfg.condition = option.value;
					viewConditionCfg.conditionCn = option.innerText;
				}else{
					viewConditionCfg.condition +=viewConditionCfg.optionSplit+option.value;
					viewConditionCfg.conditionCn += viewConditionCfg.optionSplit+option.innerText;
				}
			}//end for
			
		}//end if(viewConditionCfg.cfgType
	},
	
	/**
	 * 配置方式的转化
	 */
	cfgTypeChange:function(obj){
		var ct = "";
		if(obj.checked){
			ct = obj.value;
		}
		var cfgManualTable = Ext.getDom("manualCfg");
		var cfgSysTable = Ext.getDom("sysCfg");
		//manualCfg,sysCfg
		if(ct=="0"){
			cfgManualTable.style.display = "";
			cfgSysTable.style.display = "none";
			viewConditionCfg.changeConToManual();
			
			Ext.getDom("contextarea").innerText = viewConditionCfg.condition.replace(viewConditionCfg.optionSplit,"");
		}else{
			cfgManualTable.style.display = "none";
			cfgSysTable.style.display = "";
		}
		viewConditionCfg.cfgType = ct;
	},
	
	/**
	 * 把系统配置条件向手工输入条件转换
	 */
	changeConToManual:function(){
		viewConditionCfg.setCondition();
		
		for(var i=0;i<viewConditionCfg.compareCfgs.length;i++){
			viewConditionCfg.condition = viewConditionCfg.condition.replace(viewConditionCfg.compareCfgs[i],viewConditionCfg.compareSqls[i]);
		}
	},
	
	//与操作相关的功能
	
	/**
	 * 增加条件,如果index不为空的话则为更新条件
	 */
	addCon:function(index){
		var leftFieldType = Ext.getDom("leftseloptions_CN");
		var leftFieldName = Ext.getDom("leftSel_CN");
		var leftInputName = Ext.getDom("leftInput_CN");
		var compareType = Ext.getDom("compareTypeSel_CN");
		
		var rightFieldType = Ext.getDom("rightseloptions_CN");
		var rightFieldName = Ext.getDom("rightSel_CN");
		var rightInputName = Ext.getDom("rightInput_CN");
		var andOr = Ext.getDom("andOrSel_CN");
		
		var con = "";
		
		if(leftFieldType.selectedIndex<0){
			Ext.MessageBox.alert("提示","请选择字段类型");
			return;
		}
		
		if(leftFieldType.value!="~!@DZ@!~" && leftFieldType.value!="~!@CL@!~"){
			if(leftFieldName.selectedIndex<0){
				Ext.MessageBox.alert("提示","请选择相应的字段");
				return;
			}
		}else{
			if(leftInputName.value==""){
				Ext.MessageBox.alert("提示","请输入相应的字段值");
				return;
			}
		}
		
		if(compareType.selectedIndex<0){
			Ext.MessageBox.alert("提示","请选择比较方式");
			return;
		}
		
		if(compareType.value!="~!@0~!@9" && compareType.value!="~!@0~!@A"){
			if(rightFieldType.selectedIndex<0){
				Ext.MessageBox.alert("提示","请选择条件值类型");
				return;
			}
			
			if(rightFieldType.value!="~!@DZ@!~" && rightFieldType.value!="~!@CL@!~"){
				if(rightFieldName.selectedIndex<0){
					Ext.MessageBox.alert("提示","请选择条件值");
					return;
				}
			}
			
			if(leftFieldType.value!="~!@DZ@!~" && leftFieldType.value!="~!@CL@!~"){
				con=leftFieldType.value+leftFieldName.value+viewConditionCfg.fieldEndPrefix;
				conCn=leftFieldName.options[leftFieldName.selectedIndex].innerText;
			}else{
				con=leftFieldType.value+leftInputName.value+viewConditionCfg.fieldEndPrefix;
				conCn = leftInputName.value;
			}
			
			con = con+compareType.value+rightFieldType.value;
			conCn=conCn+" "+compareType.options[compareType.selectedIndex].innerText+" ";
			
			if(rightFieldType.value!="~!@DZ@!~" && rightFieldType.value!="~!@CL@!~"){
				con+=rightFieldName.value+viewConditionCfg.fieldEndPrefix;
				conCn+=rightFieldName.options[rightFieldName.selectedIndex].innerText
			}else{
				con+=rightInputName.value+viewConditionCfg.fieldEndPrefix;
				conCn+=rightInputName.value;
			}
			con+=andOr.value;
			
			if(andOr.value!=""){
				conCn+=" "+andOr.options[andOr.selectedIndex].innerText;
			}
		}else{
			con= leftFieldType.value+leftFieldName.value+viewConditionCfg.fieldEndPrefix+compareType.value+andOr.value;
			conCn= leftFieldName.options[leftFieldName.selectedIndex].innerText
			+compareType.options[compareType.selectedIndex].innerText+" "+andOr.options[andOr.selectedIndex].innerText
		}
		
		var option = new Option(conCn,con);
		
		var conSelect = Ext.getDom("resultsSel_CN");
		//增加条件到列表中
		if(undefined==index || index<0){
			conSelect.options.add(option,conSelect.selectedIndex+1);
		}else{
			conSelect.options[index]= option;
		}
	},
	
	/**
	 * 刷新条件
	 */
	refreshCon:function(){
		//刷新条件
		var conSelect = Ext.getDom("resultsSel_CN");
		if(conSelect.selectedIndex<0)return;
		var conSelect = Ext.getDom("resultsSel_CN");
		viewConditionCfg.addCon(conSelect.selectedIndex);
	},
	
	/**
	 * 删除条件
	 */
	delCon:function(){
		var conSelect = Ext.getDom("resultsSel_CN");
		if(conSelect.selectedIndex<0)return;
		
		conSelect.options.remove(conSelect.selectedIndex);
	},
	
	/**
	 * 加左边括号
	 */
	addLeftBracked:function(){
		var conSelect = Ext.getDom("resultsSel_CN");
		var option = new Option("(","(");
		conSelect.options.add(option,conSelect.selectedIndex+1);
	},
	
	/**
	 * 加右边括号
	 */
	addRightBracked:function(){
		var conSelect = Ext.getDom("resultsSel_CN");
		var option = new Option(")",")");
		conSelect.options.add(option,conSelect.selectedIndex+1);
	},
	
	/**
	 * 进行移动视图配置条件
	 * 
	 * @param {} direction 1:为向下移动，-1为向上移动
	 */
	moveConItem:function(direction){
		if(Ext.getDom("resultsSel_CN").selectedIndex<0)return;
		ucapCommonFun.moveOption(Ext.getDom("resultsSel_CN"),direction);
	},
	
	/**
	 * 对选择的节点进行切换
	 * 
	 * @param {} obj
	 */
	selectParseAndSet:function(obj){
		if(obj.selectedIndex<0)return;
		
		var connValue = obj.value;
		
		if(connValue=="" || connValue=="(" || connValue==")")return;
		
		var leftFieldType = connValue.substring(0,8);
		connValue = connValue.substring(8);
		var leftFieldVal = connValue.substring(0,connValue.indexOf(viewConditionCfg.fieldEndPrefix));
		connValue=connValue.substring(connValue.indexOf(viewConditionCfg.fieldEndPrefix)+viewConditionCfg.fieldEndPrefix.length);
		var compareType = connValue.substring(0,8);
		connValue = connValue.substring(8);
		var rightFieldType="";
		var rightFieldValue="";
		
		var andOr = "";
		
		if(compareType!="~!@0~!@9" && compareType!="~!@0~!@A"){//比较类型不是“为空”或“不为空”
			rightFieldType = connValue.substring(0,8);
			connValue=connValue.substring(8);
			rightFieldValue=connValue.substring(0,connValue.indexOf(viewConditionCfg.fieldEndPrefix));
			
			andOr = connValue.substring(connValue.indexOf(viewConditionCfg.fieldEndPrefix)+viewConditionCfg.fieldEndPrefix.length);
		}else{
			andOr = connValue;
		}
		
		//进行设置值
		Ext.getDom("leftseloptions_CN").value = leftFieldType;
		viewConditionCfg.initSel("",leftFieldType,'leftSel_CN');
		
		if(leftFieldType=="~!@DZ@!~" || leftFieldType=="~!@CL@!~"){
			Ext.getDom("leftInput_CN").value = leftFieldVal;
		}else{
			Ext.getDom("leftSel_CN").value = leftFieldVal;
		}
		
		Ext.getDom("compareTypeSel_CN").value = compareType;
		
		Ext.getDom("rightseloptions_CN").value = rightFieldType;
		viewConditionCfg.initSel("",rightFieldType,'rightSel_CN');
		if(rightFieldType=="~!@DZ@!~" || rightFieldType=="~!@CL@!~"){
			Ext.getDom("rightInput_CN").value = rightFieldValue;
		}else{
			Ext.getDom("rightSel_CN").value = rightFieldValue;
		}
		
		Ext.getDom("andOrSel_CN").value=andOr;
	}
}
var ucapDept = {
	rootJson:[],
	tree:null,
	isNewFlag:false,  //是否新建部门的标志
	newRootId:"_ucapDeptNew",
	deptId:"deptleftTree",
	userViewId:"02EA017398D04F4500151416001D0000", //用户视图UNID
	oldJson:[],  //旧的json值
	editDeptWin:null,  //窗口对象
	renameValue:"",    //重命名的名称
	initDept:function(){
		if (ucapSession.userJson.userStatus==3){
			return;			
		}
		var buttonItems=[
			{text: '编辑部门',handler:function(){onDeptItemClick("edit")}},
	        {text: '重命名',handler:function(){onDeptItemClick("rename")}},'-',
	        {text: '删除部门',handler: function(){onDeptItemClick("delete")}}
	  		];
		var toolbar=[
	    	{text: '文件',menu :{items: [{text: '新建部门',handler:function(){onDeptItemClick("new")} }]}},
	        {text: '编辑', menu :{items: buttonItems}},
	        {text: '查看',menu :{items: [{text: '展开',id:"deptExpand", handler: onDeptItemClick},
	        	{text: '折叠',id:"deptCollapse", handler: onDeptItemClick},
	        	{text: '全部展开',id:"deptExpandAll", handler: onDeptItemClick},
	        	{text: '全部折叠',id:"deptCollapseAll", handler: onDeptItemClick}
	        	]}},
	    	  '-',
	         {text: '新建部门',handler:function(){onDeptItemClick("new")}},
	         {text: '编辑部门',handler: function(){onDeptItemClick("edit")}},
	         {text: '删除部门',handler: function(){onDeptItemClick("delete")}}
	      ];
	    var height = ucapSession.middleHeight;
	    if (height < 300) height=500;
	    
		var panel = new Ext.Panel({
			id:"ucap_deptTree",
	   		applyTo:"deptTree",
            //bodyStyle:ucapSession.win.winBodyStyle,
            plain:true,
            layout: 'border',
            height:height,
            tbar:toolbar,
            autoWidth:true,
            //width:500,
            items:[
            	{title:'部门列表',
	             region:'west',	            
	             html:'<div id="'+this.deptId+'">正在加载部门列表，请稍等......</div>',
	             width:180,
	             autoScroll:true,
	             collapsible:true, 
	             height:height-10,
	             split: true},
	            {
	             region:"center",
	             contentEl:"deptHtml",
	             autoWidth:true,
	             buttonAlign:"right"
	            }          
            ]
        });
 		//获取根节点对象
 		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"dept",act:"getDeptTree",unid:""},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					if (response.responseText!="null" && response.responseText!=""){
						ucapDept.rootJson = Ext.util.JSON.decode(response.responseText)[0];
					} else {
						ucapDept.rootJson = [];					
					}
					ucapDept.createTree("");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},	
	createTree:function(){
		Ext.DomHelper.applyStyles(Ext.get(this.deptId),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom(this.deptId).innerHTML="";
	 	if (this.rootJson.length==0){
	 		//说明是从头新建部门
	 		this.rootJson ={id:ucapDept.newRootId,text:""};
	 	}
	 	var root=new Ext.tree.AsyncTreeNode({
	 		id:this.rootJson.id,
			expanded: true,	
			text:this.rootJson.text
		});	
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction
	     });
		loader.on('beforeload', function(treeloader, node) {
			if (node.id==ucapDept.newRootId) return;
			treeloader.baseParams ={type:"dept",act:"getDeptTree",unid:node.id};
         }, this);

		var tree=new Ext.tree.TreePanel({
			renderTo:this.deptId,
			root:root,
			animate:true,
			rootVisible:true,
			enableDD: true, //允许拖放
			autoScroll:true,
			containerScroll: true,
			loader:loader
		});		
	
		this.tree = tree;
		tree.on("click",function(node){
			ucapDept.setUserView(node.id);
		});
		tree.addListener('movenode', ucapDept.handleMoveNode); 
		
		tree.on('contextmenu', menuShow);
        function menuShow ( node )
          {
          	node.select();//让右击是选中当前节点     
            treeRightMenu.show(node.ui.getAnchor());
                               
         };
        var treeRightMenu = new Ext.menu.Menu({ 
             id: 'treeMenuContext',
             items: [ 
	             {   text: '新建部门',
	                 icon:"",
	                 handler:function(){onDeptItemClick("new")} 
	             },  
	             {   text: '编辑部门',
	                 icon:"",
	                 handler:function(){onDeptItemClick("edit")} 
	             }, 
	             { 
	                 text: '删除部门',
	                 icon:"",
	                 handler:function(){onDeptItemClick("delete")}  
	             },
	             {
	                 text: "重命名", 
	                 icon: "",
	                 handler:function(){onDeptItemClick("rename")}
	              }
             ]
         });           

		this.tree  =tree;
		root.select();
		ucapDept.setUserView(root.id);
	},
	/**
	 * 树的移动
	 */
	handleMoveNode:function(tree,node,oldParent,newParent,index){
		var posIndex=index+1;
		if (index==newParent.childNodes.length-1){
			//说明是在最后一个
			posIndex = index-1;
		}
		
		var posNode = newParent.childNodes[posIndex];
		var params={type:"dept",act:"move",unid:node.id,posDeptId:posNode.id,
				newParentId:newParent.id,
				"random":ucapCommonFun.getRandomString()};

		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if (response.responseText=="false"){
						Ext.Msg.alert("移动提示","移动不能被保存，无法生效！");
						return;
					}
				} else {
					Ext.Msg.alert("移动提示","移动不能被保存，无法生效！")	;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 删除选中节点的树，包括下面的所有子树
	 */
	deleteNode:function(){
		var deleteNodeAct =function(){
			var unid = node.id;
			var params ={"type":"dept","act":"delete","unid":unid};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){
						var exjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult)return;
						
						var node = ucapDept.getSelectNode();
						//看能否找到下一个节点的记录，如果是默认选中，如果本身是最后一个，则取前一个
						//如果就自己一个，则默认取上一节点的
						var newnode;
						if (node.id!=ucapDept.tree.getRootNode().id){
							if (node.nextSibling){
								newnode = node.nextSibling;
							} else if(node.previousSibling){
								newnode = node.previousSibling;
							} else {
								newnode = node.parentNode;
							}
							newnode.select();
							ucapDept.setUserView(newnode);
							node.remove();
						} else{
							ucapDept.rootJson=[];
							ucapDept.createTree();
							//alert("根节点删除");
						}		
					//	pnode.select();
					//	ucapDept.loadHtml();
					} else {
						Ext.Msg.alert("提示","删除不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		var node = ucapDept.getSelectNode();
		var msg="删除本部门时，将同时删除其下所有的部门及所有对应的用户，此操作不可恢复，请确认?";
		Ext.MessageBox.confirm("删除提示",msg,function(id){
			if (id=="yes"){
        		deleteNodeAct();
    		}
		});	
	},
	//根据部门ID，设置根节点的值
	setValue:function(unid){
	//	this.setEmpty();
		//获取根节点对象
 		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"dept",act:"getDept",unid:unid},
			callback:function(options,success,response){
				if (success){
					var json = Ext.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					ucapCommonFun.setFormValue(json);
					ucapDept.oldJson = ucapCommonFun.getFormJSon("deptEditHtml");
				}
			}
		}
		Ext.Ajax.request(requestConfig);		
	},
	getSelectNode:function(){
		return ucapDept.tree.getSelectionModel().getSelectedNode();	
	},	
	/**
	 * 保存部门
	 * @param {} name 不为空，说明是从重命名过来的
	 * @param flag 为1，说明是保存并新建下一个
	 */
	saveDept:function(name,flag){
		if (typeof name=="undefined") name = "";
		if (typeof flag=="undefined") flag = "";
		
		if (name=="") {
			if (Ext.getDom("name").value.trim()==""){
				Ext.Msg.alert("保存提示","部门名称不能为空！");
				return;
			}
			var json = ucapCommonFun.getFormJSon("deptEditHtml");
			if (flag!=1){
				if (Ext.encode(this.oldJson)==Ext.encode(json)){
					Ext.Msg.alert("保存提示","当前文档未更改，无须保存！");
					return ;
				}
			}
		} else {
			var json = {name:name};
		}
		
		var node = this.getSelectNode();
		var punid = node.id;
		if (node.id == this.newRootId) punid="";
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"dept",act:"save",punid:punid,flag:this.isNewFlag},
			jsonData:json,
			callback:function(options,success,response){
				if (success){	
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					ucapDept.oldJson = ucapCommonFun.getFormJSon("deptTreeHtml");
					//Ext.Msg.alert("提示","保存信息成功！");
					if(ucapDept.isNewFlag){
						//新建 文档的保存
						ucapDept.newSaveConfig(json,response,flag);
					} else {
					    //旧文档的保存	
						ucapDept.oldSaveConfig(json,response,flag);
					}
					ucapDept.editDeptWin.close();
					if (flag==1){
						ucapDept.newEditDept();				
					}
				} else {
					Ext.Msg.alert("提示","保存不成功，请重试！");
				}
			}
		}		
		Ext.Ajax.request(requestConfig);
		
	},
		/**
	 * 新建文档后的保存操作 private
	 * @param {} json
	 */
	newSaveConfig:function(json,response){
		//这是后台返回是父节点的JSON
		var node = ucapDept.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
		if (node.id == ucapDept.newRootId){
			//说明是根节点自己的保存,只需替换根节点就可以
			node.id = mjson.id;
			node.setText(mjson.text);
			node.leaf = true;
		} else {				
			//在当前节点下追加一个子节点
			node.expand();
			var newNode = new Ext.tree.TreeNode(mjson);	
			node.leaf = false;
			node.icon="";
			node.appendChild(newNode);			
			//newNode.select();	
			//ucapDept.setUserView(newNode);
		}
		ucapDept.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		
		var node = ucapDept.getSelectNode();
		//说明只是对旧对象进行保存，只要更新就可以了
		if (Ext.getDom("name")){
			node.setText(Ext.getDom("name").value);
		} else {
			node.setText(ucapDept.renameValue);
			ucapDept.renameValue = "";
		}
	},
	/**
	 * 根据部门的ID，打开视图
	 * @param {} node
	 */
	setUserView:function(deptUnid){		
		initView(this.userViewId,"userView","","","deptUnid="+deptUnid,26);
		ucapModule.deductViewDivId =ucapDept.deptId;
		ucapCommonFun.setViewWidth();
	},
	/**
	 * 弹出窗口进行部门的新建或保存
	 */
	newEditDept:function(unid){		
		var title;
		if (typeof unid == "undefined" || unid==this.newRootId){
			title = "新建部门";
			unid="";
			this.isNewFlag = true;			
		} else {
			title = "编辑部门";
		}
		var html="sys/cfgJsp/dept/dept.jsp?unid="+unid;
		var button=[
				{text:"保存并新增下一个",
					handler:function(){ucapDept.saveDept("",1);}},
				{text:"保存并关闭",
					handler:function(){ucapDept.saveDept();}},
				{text:"取消",
					handler:function(){ucapDept.editDeptWin.close()}}	
			];
		this.editDeptWin = new Ext.Window({
				title:ucapSession.win.winImg+title,
		        width:500,
		        closable:true,    //关闭
		        modal: true,     
				height:300,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		this.editDeptWin.show();
	}
}
var onDeptItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "new":{   		
		ucapDept.newEditDept();
		break;
	}
	case "newWin":{   	
		window.open(window.location,"_blank");
		break;
	}
	case "edit":{   
		var node = ucapDept.getSelectNode();
		ucapDept.newEditDept(node.id);
		break;
	}
	case "delete":{
		ucapDept.deleteNode();
		break;
	}
	case "deptExpandAll":
		ucapDept.getSelectNode().expand(true);
		break;
	case "deptExpand":
		ucapDept.getSelectNode().expand();
		break;
	case "deptCollapseAll":
		ucapDept.getSelectNode().collapse(true);
		break;
	case "deptCollapse":
		ucapDept.getSelectNode().collapse();
		break;
	case "rename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
		 	if (id=="ok"){
		 		if (msg==""){
		 			Ext.Msg.alert("改名提示","部门名称不能为空！");
		 			return;
		 		}
		 		ucapDept.renameValue = msg;
				ucapDept.saveDept(msg);
			}
		},this);		
		break;
	default :
       alert(btn.id+"代码未实现！");
	} 
}/**
 * 字典定制 模块定制方法
 * @author yjy
 */
Ext.namespace('ucapDictConfig'); 

var ucapDictConfig={
	title:"",
	leftWidth:200,
	displayName:"",
	saveNewImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_103.gif" +'"/>',
	saveImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_29.gif" +'"/>',
	closeImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_102.gif" +'"/>',
	treeJson:[],      //树的来源值
	oldJson:[],  //旧的json值
	rootUnid:"", //根节点的值，如果是新建则== newRootId，否则为_dictTree
	rootName:"字典列表", //根节点的名称
	tree:null,  //当前树的对象
	newRootId:"_ucapDictNew",
	root:null,
	isNewFlag:false, //判断是否为新增状态，在保存后，此值设置为false,新建时设置为true
	/**
	 * 初始化字典
	 */
	initDict:function(unid,rootName){
		if (ucapSession.userJson.userStatus==3){
			return;			
		}
	//	var unid="";
		this.oldJson = null;
		this.tree = null;
		this.treeJson=[];
		if (typeof unid !="undefined" && unid !="null"){
			this.rootUnid = unid;
			if (typeof rootName !="undefined" && rootName!="null" && rootName!="")
				this.rootName = rootName;
		} else {
			this.rootUnid = this.newRootId;
		}
		ucapDictConfig.initWinBox();
		//装载字典对象
		this.createDictTree();
	},	
	/**
	 * 生成树型字典
	 */
	createDictTree:function(){
		if (this.isNewFlag){
			//说明是新建字典		
			ucapDictConfig.rootUnid = this.newRootId;	
			ucapDictConfig.createTree();
			return;
		}
		ucapDictConfig.createTree();		
	},
	/**
	 * private
	 */
    initWinBox:function(){   
     	var buttonItems=[
	        {text: '重命名',id:"dictFileRename",handler:onDictItemClick},'-',
	        {text: '删除', id:"dictFileDelete",handler: onDictItemClick}
	  		];
		var toolbar=[
	    	{text: '文件',menu :{items: [{text: '新建',id:"dictFileNew", handler: onDictItemClick},'-',
	                        {text: '关闭',id:"dictFileClose", handler: onDictItemClick}]}},
	        {text: '编辑', menu :{items: buttonItems}},
	        {text: '查看',menu :{items: [{text: '展开',id:"dictExpand", handler: onDictItemClick},
	        	{text: '折叠',id:"dictCollapse", handler: onDictItemClick},
	        	{text: '全部展开',id:"dictExpandAll", handler: onDictItemClick},
	        	{text: '全部折叠',id:"dictCollapseAll", handler: onDictItemClick}
	        	]}},
	          '-',
	         {text: '新建',id:"dictNew", handler: onDictItemClick},
	         {text: '删除', id:"dictDelete",handler: onDictItemClick},
	         {text:'恢复默认',id:"dictRecover",handler:onDictItemClick},
	         '-'
	      ];
	    var height = ucapSession.middleHeight;
	    if (height < 300) height=500;
	    Ext.getDom("dictTree").innerHTML="";
    	var panel = new Ext.Panel({
            plain:true,
            id:"ucap_dictTree",
            applyTo:"dictTree",
            layout: 'border',
            height:height,
     //       bodyStyle:ucapSession.win.winBodyStyle,
            tbar:toolbar,
            items:[
            	{
	             region:'west',	            
	             html:'<div id="dictleftTree">正在加载字典，请稍等......</div>',
	             width:this.leftWidth,
	             autoScroll:true,
	             collapsible:true,
	             split: true
	           },
	            {
	             region:"center",
	             html:'<div id="ucapDictCenter"></div>',
	             buttonAlign:"right",
	             tbar:['->',
	             	{text:this.saveNewImg+"保存并新增下一下",handler:function(){
	             				ucapDictConfig.save("",1)} },
	             	{text:this.saveImg+"保存",id:"dictSave",handler:function(){
	             				ucapDictConfig.save()} }
	             	]
	            }          
            ]
        });

        var bar = panel.getTopToolbar();
        bar.addField(
        	new Ext.form.Checkbox({name:'saveInfo',fieldLabel:'1',
        	   boxLabel:'保存成功时有提示',checked:true})        		
        );     
        if (ucapSession.userJson.userStatus==1){
     		Ext.getCmp("dictRecover").setDisabled(true);
     	}   
    },
	/**
	 * private
	 */
	createTree:function(){
  	 	Ext.DomHelper.applyStyles(Ext.get("dictleftTree"),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom("dictleftTree").innerHTML="";
	 	var root=new Ext.tree.AsyncTreeNode({
			expanded: true,		
			id:this.rootUnid,
			text:this.rootName
		});	
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction
	     });
		loader.on('beforeload', function(treeloader, node) {
			var unid=node.id;
		//	if (unid==ucapDictConfig.newRootId) return;
//			alert(unid+"  "+ucapDictConfig.rootUnid )
			if (node.id==ucapDictConfig.newRootId) unid="";
			treeloader.baseParams ={type:"dict",act:"getDictTree",flag:"edit",unid:unid};
         }, this);

		var tree=new Ext.tree.TreePanel({
			renderTo:"dictleftTree",
			root:root,
			animate:true,
			rootVisible:true,
			enableDD: true, //允许拖放
			autoScroll:true,
			containerScroll: true,
			loader: loader
		});		
		tree.on("click",function(node){
			if (node.id == ucapDictConfig.newRootId){
				ucapDictConfig.isNewFlag = true;
			} else {
				ucapDictConfig.isNewFlag = false;
			}
			ucapDictConfig.loadHtml();			
		});
		tree.addListener('movenode', ucapDictConfig.handleMoveNode); 
		
		tree.on('contextmenu', dictShow);
        function dictShow ( node )
          {
          	node.select();//让右击是选中当前节点     
          	ucapDictConfig.setButtonState(); 
            treeRightDict.show(node.ui.getAnchor());                               
         };
        var treeRightDict = new Ext.menu.Menu({ 
             items: [ 
	             { 	 id:'dictRightNew',
	                 text: '新建',
	                 icon:"",
	                 handler:onDictItemClick 
	             },                 
	             { 	 id:'dictRightDelete',
	                 text: '删除',
	                 icon:"",
	                 handler:onDictItemClick 
	             },{
	                 text: "重命名", 
	                 icon: "",
	                 handler:function(){onDictItemClick("dictRename");}
	              }
             ]
         });   
         //设置第一个为选中
        tree.on('load', function(node){   
        	if (node.id == ucapDictConfig.rootUnid){
        		var fnode = node.firstChild;
        		if (fnode==null) {
        			ucapDictConfig.isNewFlag = true;
        			node.select();        			
        		} else {
	         		var path ="/"+ucapDictConfig.rootUnid+"/"+ fnode.id;
	       			ucapDictConfig.tree.selectPath(path);
        		}
        		ucapDictConfig.loadHtml();
        	}
         });
        
		this.tree  =tree;
		this.root = root;
		//root.select();
		
	},
	/**
	 * private
	 */
	loadHtml:function(){
		var node = this.getSelectNode();
		var unid= node.id;
		var html="sys/cfgJsp/dict/dictItem.jsp";
		var url=ucapSession.appPath+html;
		Ext.get("ucapDictCenter").load({url: url},{},function(){	
			if (ucapSession.userJson.userStatus!=1){
				if (Ext.getDom("systemSet"))
				   Ext.getDom("systemSet").style.display="none";
			}
			ucapDictConfig.setValue(unid);}
	    );
	},
	setButtonState:function(){
		var node = ucapDictConfig.getSelectNode();
		//进行新建按钮的权限过滤
/*		if (node.id == ucapDictConfig.newRootId){
			//不能新建
			Ext.getCmp("dictNew").setDisabled(true);
			Ext.getCmp("dictRightNew").setDisabled(true);
			Ext.getCmp("dictFileNew").setDisabled(true);
			Ext.getCmp("dictDelete").setDisabled(true);
			Ext.getCmp("dictRightDelete").setDisabled(true);
			Ext.getCmp("dictFileDelete").setDisabled(true);
			return;
		} else {
			Ext.getCmp("dictDelete").setDisabled(false);
			Ext.getCmp("dictRightDelete").setDisabled(false);
			Ext.getCmp("dictFileDelete").setDisabled(false);
		}*/
		//允许新建
/*	    Ext.getCmp("dictFileNew").setDisabled(false);
		Ext.getCmp("dictNew").setDisabled(false);
		Ext.getCmp("dictRightNew").setDisabled(false);	*/
		//下面进行删除权限的判断"attributes":{"belongToUsers":"100001"}
		var disabled = true;//默认为不能删除
		if (node.id==ucapDictConfig.rootUnid){
			//说明是根节点都可以删除
			disabled = false;
		} else {
			
			var attr =node.attributes.attributes;	
			if (typeof attr=="undefined") attr= node.attributes;
			if (ucapSession.userJson.userStatus==1){
				//系统管理员
				disabled = false;
			} else if (ucapSession.userJson.userStatus==2){
				//部门管理员
				if (typeof attr.belongToDepts!="undefined"){
					if (attr.belongToDepts ==ucapSession.userJson.effectiveAdminDept )
						disabled = false;					
				}
			} else if (ucapSession.userJson.userStatus==3){
				//是个人
				if (typeof attr.belongToUsers!="undefined"){
					if (attr.belongToUsers ==ucapSession.userJson.unid )
						disabled = false;
				}				
			}
		}
		Ext.getCmp("dictDelete").setDisabled(disabled);
		Ext.getCmp("dictRightDelete").setDisabled(disabled);
		Ext.getCmp("dictFileDelete").setDisabled(disabled);
		
		
	},
	/**
	 * private
	 */
	setValue:function(unid){
		Ext.getDom("dictName").focus();
		if (unid==ucapDictConfig.newRootId)return;
		if (this.isNewFlag) {
			ucapDictConfig.setButtonState();
			return; //新建状态，不用加载数据
		}
		var	params ={"type":"dict","act":"getDictItem","unid":unid,
		 		"random":ucapCommonFun.getRandomString()};
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					var json = Ext.decode(response.responseText);				
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
				//	alert("设置"+Ext.encode(json))
					ucapCommonFun.setFormValue(json);
					if (Ext.getDom("editors_Cn_")){
						Ext.getDom("editors_Cn_").value = 
							ucapCommonFun.getDisplayNames("200,201,202,203",Ext.getDom("editors").value);
					}
					ucapDictConfig.oldJson = ucapCommonFun.getFormJSon("dictConfigdialogHtml");
					ucapDictConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示","取值不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * name 有值，说明是通过改名进行的
	 * @param {} name
	 * @param newflag 为1，说明是保存并新建下一个
	 */
	save:function(msgName,newflag){
		if (typeof newflag =="undefined") newflag ="";
		var isSaveInfo = ucapCommonFun.getObjValueJson("saveInfo").v;
		
		var isRename = true;
		if (typeof(msgName)=="undefined" || msgName==""){
			isRename = false;		
		}
		var json;
		if (!isRename ){
			json = ucapCommonFun.getFormJSon("dictConfigdialogHtml");
			json ={name:json.dictName,value:json.value,editors:json.editors};
			if (newflag==""){
				if (Ext.encode(ucapDictConfig.oldJson)==Ext.encode(json)){
					Ext.Msg.alert("保存提示","当前数据未更改，无须保存！");
					return ;
				}
			}
			
			if (Ext.getDom("dictName").value==""){
				Ext.Msg.alert("保存提示","字典名称不能为空！");
				Ext.getDom("dictName").focus();
				return ;	
			}
		} else {
			//自己组装Json格式
			ucapDictConfig.loadHtml(true);
			json = {name:msgName};
		}
		var node = ucapDictConfig.getSelectNode();
		var unid = node.id;
		var flag = "";
		if (ucapDictConfig.isNewFlag) {
			if (node.id==ucapDictConfig.root.id){
				//说明是在根节点在新建 
				flag="newSaveByRoot";
			} else {
				flag ="newSave";	
			}
		} else {
			flag = "oldSave";
		}
		var params;
		params ={"type":"dict","act":"save",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是字典
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					ucapDictConfig.oldJson = ucapCommonFun.getFormJSon("dictConfigdialogHtml");
					if (!isRename && isSaveInfo !="" && newflag=="") Ext.Msg.alert("提示","保存信息成功！");
					if(ucapDictConfig.isNewFlag){
						//新建 文档的保存
						ucapDictConfig.newSaveConfig(json,response);
					} else {
					    //旧文档的保存	
						ucapDictConfig.oldSaveConfig(json,response);
					}
					if (newflag==1){
						//说明是保存后要继续新建文档
						var node = ucapDictConfig.getSelectNode();
						node.parentNode.select();											
						ucapDictConfig.isNewFlag = true;
						ucapDictConfig.loadHtml();						
					}
					ucapDictConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示","保存不成功，请重试！");
				}
			}
		}		
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 新建文档后的保存操作 private
	 * @param {} json
	 */
	newSaveConfig:function(json,response){
		//这是后台返回是父节点的JSON
		var node = ucapDictConfig.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
		//在当前节点下追加一个子节点
		node.expand();
		var newNode = new Ext.tree.TreeNode(mjson);	
		node.leaf = false;
		node.icon="";
		node.appendChild(newNode);			
		newNode.select();
		ucapDictConfig.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		ucapDictConfig.saveFlag = true;			
		var node = ucapDictConfig.getSelectNode();	
		if (response.responseText.indexOf("nochange")>-1){
			//说明只是对旧对象进行保存，只要更新名称就可以了	
			node.setText(json.name);					
		} else {
			//说明是新增一个对象，则要替换当前节点
			//alert(response.responseText);
			var mjson = Ext.decode(response.responseText);	
			node.id =mjson.unid;
			if (mjson.belongToUsers)
				node.attributes.belongToUsers = mjson.belongToUsers;
			if (mjson.belongToDepts)
				node.attributes.belongToDepts = mjson.belongToDepts;
			node.setText(mjson.dictName);									
		}
	},
	getSelectNode:function(){
		return ucapDictConfig.tree.getSelectionModel().getSelectedNode();	
	},
	/**
	 * 树的移动
	 */
	handleMoveNode:function(tree,node,oldParent,newParent,index){
	
		var posIndex=index-1;
		//posNode后续的节点要进行处理，即序号要加1，而新移动节点的序号等于posNode节点的位置
		var posNode = newParent.childNodes[posIndex];
		var posNodeId ="";
		if (typeof(posNode)!="undefined"){
			posNodeId = posNode.id;
		}
		var newParentId = "";
		if (newParent.id != ucapDictConfig.root.id){
			//说明不是根节点
			newParentId= newParent.id;
		}
		var params={type:"dict",act:"move",unid:node.id,posNode:posNodeId,
					newParentId:newParentId,
				"random":ucapCommonFun.getRandomString()};
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					if (response.responseText=="false"){
						Ext.Msg.alert("移动提示","移动不能被保存，无法生效！");
						return;
					} else{
						//替换新的节点，并且要重新加载所有的子节点
						var mjson = Ext.decode(response.responseText);	
						var exResult=ucapCommonFun.dealException(mjson);
						if(!exResult)return;
					
						node.id =mjson.id;
						node.attributes.belongToUsers = mjson.belongToUsers;
						node.attributes.belongToDepts = mjson.belongToDepts;
						node.setText(mjson.text);
						var treeLoad = ucapDictConfig.tree.getLoader();
						treeLoad.load(node);
					}
				} else {
					Ext.Msg.alert("移动提示","移动不能被保存，无法生效！")	;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 删除选中节点的树，包括下面的所有子树
	 * @param infoFlag 是否要删除的提示，默认为true
	 */
	deleteNode:function(infoFlag){
		if (typeof (infoFlag) =="undefined") infoFlag =true;
		var deleteNodeAct =function(){
			var unid = node.id;
			var flag = "item";
			if (node.id == ucapDictConfig.root.id){
				flag = "root";
			} 		
			var params ={"type":"dict","act":"delete",flag:flag,"unid":unid,
						"random":ucapCommonFun.getRandomString()};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){
						var json = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(json);
						if(!exResult)return;
						
						ucapDictConfig.saveFlag = true;
						var node = ucapDictConfig.getSelectNode();
						var num = parseInt(response.responseText,10);
						if (num<1 && infoFlag){
							Ext.Msg.alert("删除提示","你所选的字典你没有权限删除！");							
							return;
						}
						if (flag!="root"){
							var newnode;
							if (node.nextSibling){
								newnode = node.nextSibling;
							} else if(node.previousSibling){
								newnode = node.previousSibling;
							} else {
								newnode = node.parentNode;
							}
							node.remove();
							newnode.select();
							ucapDictConfig.loadHtml();
						} else {
							//说明是删除整棵树，重新加载树
							ucapDictConfig.initDict();
						}
					} else {
						Ext.Msg.alert("提示","删除不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		var node = ucapDictConfig.getSelectNode();
		if (infoFlag){
			var msg="";
			var nodemsg = "";
			if (!node.isLeaf()){
				nodemsg = "<br><br>删除时将同时删除其下所有的子节点";
			}
			if (ucapSession.userJson.userStatus==1){
				//说明是系统管理员	
				msg = "你当前是应用系统管理员身份，" +nodemsg+
						"且此操作不可恢复，你是否确定删除？";	
			} else if (ucapSession.userJson.userStatus==2){
				//说明是部门管理员
				msg = "你当前是部门管理员身份，" +nodemsg+
						"你是否确定删除？";	
			} else {
			 //说明是个人		
				msg ="你是否确定要删除选中的节点" +nodemsg+
						"？";	
			}
			Ext.MessageBox.confirm("删除提示",msg,function(id){
				if (id=="yes"){
	        		deleteNodeAct();
	    		}
			});	    	
		} else {
			deleteNodeAct();
		}
    	
	}
}
var onDictItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "dictNew":{   		
		ucapDictConfig.isNewFlag = true;
		ucapDictConfig.loadHtml();
		break;
	}
	case "dictRightNew":
		ucapDictConfig.isNewFlag = true;
		ucapDictConfig.loadHtml();
		break;
	case "dictFileNew":{
		ucapDictConfig.isNewFlag = true;
		ucapDictConfig.loadHtml();
		break;
	}
	case "dictDelete":{
		ucapDictConfig.deleteNode();
		break;
	}
	case "dictRightDelete":{
		ucapDictConfig.deleteNode();
		break;
	}
	case "dictFileDelete":{
		ucapDictConfig.deleteNode();
		break;
	}
	case "dictClose":{
		ucapDictConfig.win.close();
   	  	break;
	}
	case "dictFileClose":{
		ucapDictConfig.win.close();
   	  	break;
	}
	case "dictExpandAll":
		ucapDictConfig.getSelectNode().expand(true);
		break;
	case "dictExpand":
		ucapDictConfig.getSelectNode().expand();
		break;
	case "dictCollapseAll":
		ucapDictConfig.getSelectNode().collapse(true);
		break;
	case "dictCollapse":
		ucapDictConfig.getSelectNode().collapse();
		break;
	case "dictRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("改名提示","名称不能为空！");
		 			return;
		 		}
				ucapDictConfig.save(msg);
			}
		},this);
		break;
	case "dictFileRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("改名提示","名称不能为空！");
		 			return;
		 		}
				ucapDictConfig.save(msg);
			}
		},this);
		break;
	case "dictRecover":{
		Ext.MessageBox.confirm("恢复提示","你是否确定恢复整个字典<br>你自定义的所有字典" +
				"都将被删除，并恢复到初始状态，请确认？",
			  function(id){
					if (id=="yes"){
		    			ucapDictConfig.root.select();   
		        		ucapDictConfig.deleteNode(false);
		    		} 
			 },this
		);	
		break;
	}
	default :
       alert(btn.id+"代码未实现！");
	} 
} /*************************************************
	Validator v1.01
	code by 我佛山人
	modify
	根据Ext整合到LINEWELL的UCAP
	by JC_SeekArt V-2009.04.17
	
*************************************************/

Validator = {
	Notnull : /^(.+)?\S+(.+)?$/,
	Require : /.+/,
	Email : /^((\s?)+$)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
	Phone : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
	Mobile : /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/,
	Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	IdCard : /^\d{15}(\d{2}[A-Za-z0-9])?$/,
	Currency : /^\d+(\.\d+)?$/,
	Number : /^\d+$/,
	Zip : /^[1-9]\d{5}$/,
	QQ : /^[1-9]\d{4,9}$/,
	Integer : /^[-\+]?\d+$/,
	Double : /^[-\+]?\d+(\.\d+)?$/,
	English : /^[A-Za-z]+$/,
	Chinese :  /^[\u0391-\uFFE5]+$/,
	UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	Date 		: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/,
	DateTime	: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) ([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
	IsSafe : function(str){return !this.UnSafe.test(str);},
	SafeString : "this.IsSafe(value)",
	Limit : "this.limit(value.length,getAttribute('min'),  getAttribute('field_len'))",
	LimitB : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('field_len'))",
	Repeat : "value == document.getElementsByName(getAttribute('to'))[0].value",
	Range : "getAttribute('min') < value && value < getAttribute('field_len')",
	Compare : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
	Custom : "this.Exec(value, getAttribute('regexp'))",
	Group : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('field_len'))",
	Item:[],
	ErrorItem : [],
	ErrorMessage : ["以下原因导致提交失败：\t\t\t\t"],
	Validate : function(str, mode){
		var require,msg,vScope,vType,vEmpty;
		str = str?('div#'+str+' input,textarea'):"input,textarea";
		var objs = Ext.query(str);
		this.Item = objs;
		this.ErrorItem=[];
		this.ErrorMessage = ["以下原因导致提交失败：\t\t\t\t"];
		this.ClearState();
		for(var i=0;i<objs.length;i++){
			with(objs[i]){
				require = getAttribute("require");
				//是否进行验证,默认进行验证
				if(require && require==1)continue;
				msg = getAttribute("validateMessage")||"";
				vScope = getAttribute("validateScope")||"";
				vType = getAttribute("valiateType")||"";
				vEmpty = getAttribute("validateEmpty");
				var bResult = true;
				//validateMessage\validateScope
				if((!vEmpty || vEmpty==0) && Ext.isEmpty(value) && vType!="Notnull")continue;
				switch(vType){
					case "":break;	
					default:{
						if(vType && this[vType] && !this[vType].test(value)){
							if(null==msg || msg==""){
								var cusMsg='';
								switch(vType){
									case "Date" 	:
										cusMsg = ',日期格式填写不对，只能为YYYY-MM-DD';
										break;
									case "DateTime" :
										cusMsg = ',日期时间格式填写不对，只能为YYYY-MM-DD hh:mm';
										break;
									case "Notnull"	:
									 	cusMsg = ',不能为空';
										break;
									case "Integer"	:
										cusMsg = ',只能为整数';
										break;
									case "Number"	:
										cusMsg = ',只能为数值';
										break;
									default :
										cusMsg = ',输入不符合规则';
										break;
								}
								this.AddError(i,getAttribute("nameCn")+cusMsg);
							}else{
								this.AddError(i, getAttribute("nameCn")+","+msg);
							}
							bResult = false;
						}
						//进行范围的判断
						if(bResult && vScope){
							var vs = vScope.split(",");
							var len = value.length;
							if(vs.length==1){
								//alert("等于");
								bResult = (len == vs[0]);
								if(!bResult)this.AddError(i, getAttribute("nameCn")+",长度不等于"+vs[0]);
							}else if(vs.length==2){
								var min=parseInt(vs[0]),max=parseInt(vs[1]);
								if(vs[0]==""){
									//小于vs[1]
									bResult = (len<max);
									if(!bResult)this.AddError(i, getAttribute("nameCn")+",长度小于"+max);
								}else{
									if(vs[1]==""){
										//大于vs[0]
										bResult = (len>min);
										if(!bResult)this.AddError(i, getAttribute("nameCn")+",长度大于"+min);
									}else{
										//大于vs[0],小于vs[1]
										bResult = (len>min && len<max);
										if(!bResult)this.AddError(i, getAttribute("nameCn")+",长度不在"+min+"到"+max+"范围");
									}
								}
							}
						}//结束范围判断
					}
				}
			}
		}//结束for
		if(this.ErrorMessage.length > 1){
			mode = mode || 3;
			var errCount = this.ErrorItem.length;
			switch(mode){
			case 2 :
				for(var i=1;i<errCount;i++)
					if(this.ErrorItem[i])this.ErrorItem[i].style.color = "red";
			case 1 :
				alert(this.ErrorMessage.join("\n"));
				//this.ErrorItem[1].focus();
				break;
			case 3 :
				for(var i=0;i<errCount;i++){
				try{
					if(this.ErrorItem[i])
						Ext.DomHelper.append(this.ErrorItem[i].parentNode,
							'<span style="color:red;cursor:hand;width:20px;" id="__ErrorMessagePanel" title="'+this.ErrorMessage[i+1].replace(/\d+:/,"")+'">&#160;！</span>');
					}catch(e){
						//alert(e.description);
					}
				}
				//this.ErrorItem[1].focus();
				break;
			default :
				alert(this.ErrorMessage.join("\n"));
				break;
			}
			return false;
		}
			return true;
	},
	limit : function(len,min, max){
		min = min || 0;
		max = max || Number.MAX_VALUE;
		return min <= len && len <= max;
	},
	LenB : function(str){
		return str.replace(/[^\x00-\xff]/g,"**").length;
	},
	ClearState : function(elem){
		var errors = Ext.query("span[id=__ErrorMessagePanel]");
		for(var i=0;i<errors.length;i++){
			errors[i].parentNode.removeChild(errors[i]);
		}
	},
	AddError : function(index, str){
		//this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
		this.ErrorItem[this.ErrorItem.length] = this.Item[index];
		//this.ErrorMessage[index] = index + ":" + str;
		this.ErrorMessage[this.ErrorItem.length] = str;
	},
	Exec : function(op, reg){
		return new RegExp(reg,"g").test(op);
	},
	/**
	 * 验证范围
	 * @param {} op1
	 * @param {} operator
	 * @param {} op2
	 * @return {}
	 */
	compare : function(op1,operator,op2){
		switch (operator) {
			case "NotEqual":
				return (op1 != op2);
			case "GreaterThan":
				return (op1 > op2);
			case "GreaterThanEqual":
				return (op1 >= op2);
			case "LessThan":
				return (op1 < op2);
			case "LessThanEqual":
				return (op1 <= op2);
			default:
				return (op1 == op2);            
		}
	},
	/**
	 * 验证checkbox
	 * @param {} name
	 * @param {} min
	 * @param {} max
	 * @return {}
	 */
	MustChecked : function(name, min, max){
		var groups = document.getElementsByName(name);
		var hasChecked = 0;
		min = min || 1;
		max = max || groups.length;
		for(var i=groups.length-1;i>=0;i--)
			if(groups[i].checked) hasChecked++;
		return min <= hasChecked && hasChecked <= max;
	}
};Ext.ux.TreeCheckNodeUI = function() {
	// 多选: 'multiple'(默认)
	// 单选: 'single'
	// 级联多选: 'cascade'(同时选父和子);'parentCascade'(选父);'childCascade'(选子)
	this.checkModel = 'multiple';

	// only leaf can checked
	this.onlyLeafCheckable = false;

	Ext.ux.TreeCheckNodeUI.superclass.constructor.apply(this, arguments);
};

Ext.extend(Ext.ux.TreeCheckNodeUI, Ext.tree.TreeNodeUI, {

	renderElements : function(n, a, targetNode, bulkRender) {
		var tree = n.getOwnerTree();
		this.checkModel = tree.checkModel || this.checkModel;
		this.onlyLeafCheckable = tree.onlyLeafCheckable || false;

		// add some indent caching, this helps performance when rendering a
		// large tree
		this.indentMarkup = n.parentNode
				? n.parentNode.ui.getChildIndent()
				: '';

		// var cb = typeof a.checked == 'boolean';
		var cb = (!this.onlyLeafCheckable || a.leaf);
		var href = a.href ? a.href : Ext.isGecko ? "" : "#";
		var buf = [
				'<li class="x-tree-node"><div ext:tree-node-id="',
				n.id,
				'" class="x-tree-node-el x-tree-node-leaf x-unselectable ',
				a.cls,
				'" unselectable="on">',
				'<span class="x-tree-node-indent">',
				this.indentMarkup,
				"</span>",
				'<img src="',
				this.emptyIcon,
				'" class="x-tree-ec-icon x-tree-elbow" />',
				'<img src="',
				a.icon || this.emptyIcon,
				'" class="x-tree-node-icon',
				(a.icon ? " x-tree-node-inline-icon" : ""),
				(a.iconCls ? " " + a.iconCls : ""),
				'" unselectable="on" />',
				cb
						? ('<input class="x-tree-node-cb" type="checkbox" ' + (a.checked
								? 'checked="checked" />'
								: '/>'))
						: '',
				'<a hidefocus="on" class="x-tree-node-anchor" href="', href,
				'" tabIndex="1" ',
				a.hrefTarget ? ' target="' + a.hrefTarget + '"' : "",
				'><span unselectable="on">', n.text, "</span></a></div>",
				'<ul class="x-tree-node-ct" style="display:none;"></ul>',
				"</li>"].join('');

		var nel;
		if (bulkRender !== true && n.nextSibling
				&& (nel = n.nextSibling.ui.getEl())) {
			this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel, buf);
		} else {
			this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);
		}

		this.elNode = this.wrap.childNodes[0];
		this.ctNode = this.wrap.childNodes[1];
		var cs = this.elNode.childNodes;
		this.indentNode = cs[0];
		this.ecNode = cs[1];
		this.iconNode = cs[2];
		var index = 3;
		if (cb) {
			this.checkbox = cs[3];
			Ext.fly(this.checkbox).on('click',
					this.check.createDelegate(this, [null]));
			index++;
		}
		this.anchor = cs[index];
		this.textNode = cs[index].firstChild;
	},

	// private
	check : function(checked) {
		var n = this.node;
		var tree = n.getOwnerTree();
		this.checkModel = tree.checkModel || this.checkModel;

		if (checked === null) {
			checked = this.checkbox.checked;
		} else {
			this.checkbox.checked = checked;
		}

		n.attributes.checked = checked;
		tree.fireEvent('check', n, checked);

		if (this.checkModel == 'single') {
			var checkedNodes = tree.getChecked();
			for (var i = 0; i < checkedNodes.length; i++) {
				var node = checkedNodes[i];
				if (node.id != n.id) {
					node.getUI().checkbox.checked = false;
					node.attributes.checked = false;
					tree.fireEvent('check', node, false);
				}
			}
		} else if (!this.onlyLeafCheckable) {
			if (this.checkModel == 'cascade'
					|| this.checkModel == 'parentCascade') {
				var parentNode = n.parentNode;
				if (parentNode !== null) {
					this.parentCheck(parentNode, checked);
				}
			}
			if (this.checkModel == 'cascade'
					|| this.checkModel == 'childCascade') {
				if (!n.expanded && !n.childrenRendered) {
					n.expand(false, false, this.childCheck);
				} else {
					this.childCheck(n);
				}
			}
		}
	},

	// private
	childCheck : function(node) {
		var a = node.attributes;
		if (!a.leaf) {
			var cs = node.childNodes;
			var csui;
			for (var i = 0; i < cs.length; i++) {
				csui = cs[i].getUI();
				if (csui.checkbox.checked ^ a.checked)
					csui.check(a.checked);
			}
		}
	},

	// private
	parentCheck : function(node, checked) {
		var checkbox = node.getUI().checkbox;
		if (typeof checkbox == 'undefined')
			return;
		if (!(checked ^ checkbox.checked))
			return;
		if (!checked && this.childHasChecked(node))
			return;
		checkbox.checked = checked;
		node.attributes.checked = checked;
		node.getOwnerTree().fireEvent('check', node, checked);

		var parentNode = node.parentNode;
		if (parentNode !== null) {
			this.parentCheck(parentNode, checked);
		}
	},

	// private
	childHasChecked : function(node) {
		var childNodes = node.childNodes;
		if (childNodes || childNodes.length > 0) {
			for (var i = 0; i < childNodes.length; i++) {
				if (childNodes[i].getUI().checkbox.checked)
					return true;
			}
		}
		return false;
	},

	toggleCheck : function(value) {
		var cb = this.checkbox;
		if (cb) {
			var checked = (value === undefined ? !cb.checked : value);
			this.check(checked);
		}
	}
});
/**
 * 对ucap平台中通用选择对话框进行分装
 */

/**
 * 通用选择对话框
 * 
 * @param {} type 类型，通用选择对话框的类型，包括全局缓存中的所有类型，而且允许其多个的组合，如“203,204,205”
  * @param {} selNum 选择结果返回值，用于区分单选或多选 1为单选，0为多选，默认为多选
  * @param {} inputName 要设置字段的名称或id
 * @param {}  conValue 条件值，用于选择对话框用户选择适外部输入的条件值，多值以逗号“,”分隔，允许为空
  * @param {} outputFunc 点击确定后执行的函数 (默认参数为一对象 obj ={text:"",value:""} )
  * @param {} inputSplit 输入分隔符号，默认值为","
 * @param {}  outSplit 输出分隔符号，默认为","
*            
 * 如果type 为 204 字典，则conValue中是字典的UNID
 * 
 * type 为228，说明是栏目的树型选择
 * 
 */
function selectDataSD(type,selNum,inputName,conValue,outputFunc,
		inputSplit, outSplit) {
	if (typeof selNum =="undefined") selNum = "0";	
	
	listSelect.isTree = false;  //默认为普通选择		
	
	var html = "sys/jsp/select/listSelect.jsp?type="+type;	
	
	var oldValue ="";
	var oldText = "";
	if(undefined!=inputName && typeof(inputName)=='string'){
		oldValue = Ext.getDom(inputName).value;
		oldText = Ext.getDom(inputName+"_Cn_").value;
	}
	listSelect.oldValue = oldValue;
	listSelect.oldText = oldText;
	listSelect.selNum = selNum;
	listSelect.conValue = conValue;
	listSelect.type = type;	
	if (undefined != inputSplit)
		listSelect.inputSplit = inputSplit;
	if (undefined != outSplit)
		listSelect.outSplit = outSplit;		
	listSelect.type = type;
	
	var width=520;
	var height=400;
	if (type=="204" || type=="228"){
		listSelect.isTree = true;  //设置为树型
		if (typeof conValue=="undefined") conValue ="";
		html = "sys/jsp/select/commonTreeSelect.jsp?unid="+conValue+"&type="+type;
		if (type=="204"){
			ucapTreeSelect.rootName ="字典列表";
			ucapTreeSelect.actionType="dict";
			ucapTreeSelect.act ="getDictTree";
		} else if (type=="228"){
			ucapTreeSelect.rootName ="栏目列表";
			ucapTreeSelect.actionType="columns";
			ucapTreeSelect.act ="getColumnsTree";
		}
		ucapTreeSelect.selectType = selNum;			
		if(selNum=="1" ||selNum==1){
			width=210;
			height=300;	
			if (conValue==""){
				height=410;
			}
			ucapTreeSelect.width = width-40;
			ucapTreeSelect.height = height - 90;
		} else {
			height=410;
			ucapTreeSelect.width = 190;
			ucapTreeSelect.height = height - 90;
		}
	} else {
		if(undefined!=conValue)html+="&conValue="+conValue;
		html+="&oldValue="+oldValue;			
		if(undefined!=selNum)html+="&selNum="+selNum;	
		if(undefined!=inputSplit)html+="&inputSplit="+inputSplit;
		if(undefined!=outSplit)html+="&outSplit="+outSplit;
	}
	
	if (type.indexOf("200")>-1 || type.indexOf("201")>-1){
		//人员、部门
		listSelect.isTree = true;  //设置为树型
	}
	var button = [{
				text : "确定",
				handler : function() {
					
					if (listSelect.isTree && listSelect.selNum==1){
						var flag = listSelect.treeAddSelect();
						if (!flag) return;
					}
					
					var value = listSelect.getSelectedValue();
					var text = value.substring(value.indexOf(listSelect.valTextSplit)+listSelect.valTextSplit.length);
					value=value.substring(0,value.indexOf(listSelect.valTextSplit));
					if(undefined!=inputName && inputName!=""){
						if(typeof(inputName)=='string'){
							var descCn = Ext.getDom((inputName+"_Cn_"));
							inputName = Ext.getDom(inputName);
							if (inputName) inputName.value = value;
							if(descCn)descCn.value = text;
						}
						
					}
					if(undefined!=outputFunc && outputFunc!="" && typeof outputFunc =="string"){//回调函数
						try{
							(function(){
								var args = {"value":value,"text":text};
								eval(outputFunc+"(args);");
							})();
						}catch(e){
							alert("执行回调函数【"+outputFunc+"】失败!");
						}
					}
					ucapSession.commonSelectWin.close();					
				}
			}, {
				text : "取消",
				handler : function() {
					ucapSession.commonSelectWin.close();
				}
			}];
	ucapSession.commonSelectWin = new Ext.Window({
				title : ucapSession.win.winImg + "通用选择框",
				width : width,
				closable : true, // 关闭
				modal : true,
				height : height,
				bodyStyle : ucapSession.win.winBodyStyle,
				autoLoad : {
					url : ucapSession.appPath + html,
					scripts : true,
					nocache : true
				},
				buttons : button
			});
	ucapSession.commonSelectWin.show();
}
//视图选择框
/**
 * 
 * @param fieldNames 要选择的视图字段名称
 * @param {} viewId 视图的UNID
 * @param {} inputName 要设置字段的名称或id
 * @param {} isSingle 单多选标志 默认为单选  1 表示单选 其他值表示多选(但不能为空）
 * @param {} recordSplit 多记录之间的分隔符 默认为：~RECORD_UCAP~ ，注意不能用正则中的特殊字符
 * @param {} colSplit    单记录，列之间的分隔符 默认为：~COL_UCAP~ ，注意不能用正则中的特殊字符
 * @param {} purl   视图的外部条件参数 类似  unid=88999&type=1;主要用于视图条件的配置（配置成URL参数）
 * @param {} callBack 回调函数，默认参数为选中的值 格式为Json格式  {"value":v,"text":v}
 * 			 其中 value是有包括各分隔符的原始值 text是把分隔符变化空格
 * @param {} sTitle  对话框标题名称
 */
function selectView(viewId,fieldNames,inputName,isSingle,callBack,sTitle,purl,recordSplit,colSplit){
	var recSplit ="~RECORD_UCAP~";
	var cSplit = "~COL_UCAP~";
	if (typeof fieldNames=="undefined" || fieldNames==""){
		Ext.Msg.alert("提示信息","要选择的视图列名称不能为空！");
		return;
	}
	if (typeof viewId=="undefined" || viewId==""){
		Ext.Msg.alert("提示信息","视图的UNID不能为空！");
		return;
	}
	if (typeof isSingle =="undefined" || isSingle=="") isSingle = "1"; //默认单选
	if (typeof recordSplit =="undefined" || recordSplit=="") recordSplit = recSplit;
	if (typeof colSplit =="undefined" || colSplit=="") colSplit = cSplit;
	
	var html="sys/jsp/view.jsp";	
	html+="?viewId="+viewId;
	html+="&noPreview=true&noTbar=true";
	if (typeof purl!="undefined" && purl !=""){
		purl = purl.replace(/&/g,"~$*$~");
		html +="&purl="+purl;
	}
	html +="&isSingle="+isSingle+"&recordSplit="+recordSplit+"&colSplit="+colSplit;
	var selectConfirm =function(){
		var v=Ext.getDom("_UcapSelectiFrame").contentWindow.view.getColumnValueByName(fieldNames);
		var args = {"value":v,"text":v.replace(/(~RECORD_UCAP~|~COL_UCAP~)/g," ")};
		if(typeof inputName !="undefined" && inputName!=""){
			if(typeof(inputName)=='string'){
				var descCn = Ext.getDom((inputName+"_Cn_"));
				inputName = Ext.getDom(inputName);
				if (inputName) inputName.value = args.text;
				if(descCn)descCn.value = v;
			}			
		}
		if(undefined!=callBack && callBack!="" && typeof callBack =="string"){//回调函数
			try{
				(function(){					
					eval(callBack+"(args);");
				})();
			}catch(e){
				alert("执行回调函数【"+callBack+"】失败!");
			}
		}
		ucapSession.commonWin.close();
	/*	var obj = $("blobtest");
		eval(" eWebEditor_"+obj.id+".setHTML(v)");*/
	}
	var button=[{text:"确定",handler:function()
		{selectConfirm();}},
			{text:"取消",
			handler:function(){ucapSession.commonWin.close()}}	
	];
	html = ucapSession.hostPath+ucapSession.appPath+html;
	html =' <iframe id="_UcapSelectiFrame" name="_UcapSelectiFrame" ' +
		' width="100%" height="100%" frameborder="0"  src="'+html+'"></iframe>'
	var height = document.body.clientHeight-50;
	var width = document.body.clientWidth/2;
	ucapSession.commonWin = new Ext.Window({
		title:ucapSession.win.winImg+(sTitle||"视图列选择对话框"),
        width:width,
        closable:true,    //关闭
        modal: true,     
        autoScroll:true,
		height:height,
	//	bodyStyle:ucapSession.win.winBodyStyle,
		html:html,
		//autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
		buttons:button
	});
	ucapSession.commonWin.show();
}

/**
 * 相应的选中值的值类型以及相应的值
 * 
 * @type
 */
var selectValue = {
	type : "", // 类型
	value : "", // 对应值
	test: ""    //对应的文本值
}
/**
 * 列表选择对话框相关js
 * 
 * @type
 */
var listSelect = {

	selectValues : null, // 选中的对应值对象

	oldValue : "", // 原始值
	
	oldText:"",    //原始文本值

	inputSplit : ",", // 输入分隔符

	outSplit : ",", // 输出分隔符

	selNum : 0, // 选择个数

	type : "", // 选择类型

	conValue : "", // 条件值

	inputType : "0", // 输入值类型

	outType : "0", // 输出类型
	
	currentType:"", //当前选择类型
	
	treeDivId:"treeSelect",   //树形所在div的标识
	
	commSelectId:"selectList",         //普通选择框的ID标识
	
	deptRootId:"_deptroot-undefined",//树形根节点默认标识
	
	rootJson:null,                     //树形根节点对象
	
	tree:null,                       //树形对象 TreePanel
	
	isTree:false,                    //当前选择是否为树形,是的话在添加和全添的方法不一样
	
	valTextSplit:"~$@s@$~",//值名称的分隔符号
	/**
	 * 初始化选择类型
	 */
	initTypes : function() {
		var radioHtml = "";
		var url = ucapSession.baseAction;
		url += "?type=listSelect&action=getTypes&selecttype=" + listSelect.type+"&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);	
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var items = json.items;

		listSelect.initSelectedValue();
		
		if (undefined != items) {
			for (var i = 0; i < items.length; i++) {
				if (i == 0) {
					// 对其进行初始化
					listSelect.loadType(items[i].type, listSelect.conValue);
				}
				if (undefined == items[i] || null == items[i])
					continue;
				if (undefined == radioHtml || radioHtml == "") {
					radioHtml = "<input type='radio' value='" + items[i].type
							+ "' name='select' id='select' checked onClick='listSelect.radioClick(this);'>" + items[i].name
							+ "</input>"
				} else {
					radioHtml += "<input type='radio' value='" + items[i].type
							+ "' name='select' id='select' onClick='listSelect.radioClick(this);'>" + items[i].name
							+ "</input>"
				}
			}
		}

		// 把当前选择类型框设置相应的td中
		Ext.getDom("selectTypeId").innerHTML = radioHtml;
	},

	/**
	 * 初始化通用选择框
	 * 
	 * @param {}
	 *            type 类型
	 * 
	 * @param {}
	 *            conValue 条件值
	 */
	loadType : function(type, conValue) {
		//设置当前类型
		listSelect.currentType = type;
		if(type=="200" || type=="201"){//200,201为用户、部门，采用树形的方式显示
			
			this.loadTree(type,conValue);
		}else{
			this.loadList(type,conValue);
		}

		// 初始化选中的值
		//listSelect.initSelectedValue();
	},
	
	/**
	 * 加载列表
	 * 
	 * @param {} type
	 * 
	 * @param {} conValue
	 */
	loadList:function(type,conValue){
		
		Ext.getDom(this.treeDivId).style.display="none";
		Ext.getDom(this.commSelectId).style.display="";
		this.isTree = false;
		
		if (this.selNum =="1"){
			Ext.getDom(this.commSelectId).multiple=false;
		} else {
			Ext.getDom(this.commSelectId).multiple=true;
		}
		
		var url = ucapSession.baseAction;
		url += "?type=listSelect&conval=" + conValue + "&selecttype=" + type+"&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var itemList = Ext.getDom(this.commSelectId);
		var items = json.items;
		// 先清空列表
		if (undefined != itemList && itemList.options.length > 0) {
			var olength = itemList.options.length;
			for (var i = 0; i < olength; i++) {
				itemList.options.remove(0);
			}
		}
	
		if (undefined != items) {
			for (var i = 0; i < items.length; i++) {
				if (undefined == items[i] || null == items[i])
					continue;
				
				ucapCommonFun.addOption(itemList, items[i].id, items[i].name);
			}
		}
	},
	
	/**
	 * 加载树形数据
	 * 
	 * @param {} type
	 * 
	 * @param {} conValue
	 */
	loadTree:function(type,conValue){
		Ext.getDom(this.treeDivId).style.display="";
		Ext.getDom(this.commSelectId).style.display="none";
		this.isTree = true;
		//获取根节点对象
 		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"treeSelect",action:"getDeptTree",unid:""},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if (response.responseText!="null"){
						listSelect.rootJson = Ext.util.JSON.decode(response.responseText)[0];
					} else {
						this.rootJson = null;					
					}
					listSelect.createTree(type,conValue);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		//树形根节点加载完毕
	},
	
	/**
	 * 创建树型
	 * 
	 * @param {} type 加载类型
	 * 
	 * @param {} conValue 相应的条件值
	 */
	createTree:function(type,conValue){
		Ext.DomHelper.applyStyles(Ext.get(this.treeDivId),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom(this.treeDivId).innerHTML="";
	 	var onlyLeafCheckable = false;
	 	if(type=="200") onlyLeafCheckable = true;
	 	var checkModel = "childCascade";  //允许级联选择
	 	if(listSelect.selNum==1){
	 		checkModel = "single";
	 	} 
	 	if (null==this.rootJson){
	 		//说明是从头新建部门
	 		this.rootJson ={id:this.deptRootId,text:""};
	 	}
	 	var root;	 	
	 	if (onlyLeafCheckable){
	 		root=new Ext.tree.AsyncTreeNode({
		 		id:this.rootJson.id,
				expanded: true,	
				text:this.rootJson.text			
			});	
	 	} else {
		 	 root=new Ext.tree.AsyncTreeNode({
		 		id:this.rootJson.id,
				expanded: true,	
			 	checked:false,
				text:this.rootJson.text			
			});	
	 	}		
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction,
	          baseAttrs: {uiProvider: Ext.ux.TreeCheckNodeUI} 
	     });
	     
		loader.on('beforeload', function(treeloader, node) {
			if (node.id==this.deptRootId) return;
			treeloader.baseParams ={type:"treeSelect",action:"getDeptTree",unid:node.id,selectType:type}
         }, this);

		var tree=new Ext.tree.TreePanel({
			renderTo:this.treeDivId,
			root:root,
			animate:true,
			rootVisible:true,
			autoScroll:true,
			width:190,
			height:270,
			containerScroll: true,
			loader:loader,
			//扩展的属性
			onlyLeafCheckable:onlyLeafCheckable,  //是否只允许选择叶子节点
			checkModel:checkModel                 //是否为单选或级选择
		});		
	
		//root.select();
		this.tree = tree;
	},
	
	
	/**
	 * radio 单击事件
	 * 
	 * @param {} obj
	 */
	radioClick:function(obj){
		if(!obj.checked){
			return;
		}
		var ctype = obj.value;
		
		if(ctype==listSelect.currentType)return;
		
		var resultList = Ext.getDom("resultList");
		
		if(undefined!=resultList){
			if(null==listSelect.selectValues){
				listSelect.selectValues = new Array();
			}
			var index = -1;
			
			for(var i=0;i<listSelect.selectValues.length;i++){
				var sv = listSelect.selectValues[i];
				if(sv.type==listSelect.currentType){
					index = i;
					break;
				}
			}
			
			var selectValue = new Object();
			selectValue.type = listSelect.currentType;
			var tmpValue = listSelect.getResultValue();
			if(undefined!=tmpValue && tmpValue!=""){
				selectValue.value = tmpValue.substring(0,tmpValue.indexOf(listSelect.valTextSplit));
				selectValue.text = tmpValue.substring(tmpValue.indexOf(listSelect.valTextSplit)+listSelect.valTextSplit.length);
			}

			if(index<0){
				listSelect.selectValues[listSelect.selectValues.length] = selectValue;
			}else{
				listSelect.selectValues[index]=selectValue;
			}
		}
		
		listSelect.loadType(ctype,listSelect.conValue);
	},

	/**
	 * 初始化选中的值
	 */
	initSelectedValue : function() {
		var resultList = Ext.getDom("resultList");

		// 先清空列表
		if (undefined != resultList && resultList.options.length > 0) {
			var olength = resultList.options.length;
			for (var i = 0; i < olength; i++) {
				resultList.options.remove(0);
			}
		}
		
		if(""!=listSelect.oldValue && ""!=listSelect.oldText){
			var oldValueArr = listSelect.oldValue.split(listSelect.inputSplit);
			var oldTextArr = listSelect.oldText.split(listSelect.inputSplit);
			
			var length = oldValueArr.length>oldTextArr.length?oldTextArr.length:oldValueArr.length;
			
			for(var i=0;i<length;i++){
				ucapCommonFun.addOption(resultList,oldValueArr[i],oldTextArr[i]);
			}
		}
		
//		var itemList = Ext.getDom(this.commSelectId);
//		
//		//当前类型是否已经有选中值
//		var cvalue = listSelect.oldValue;
//		if(undefined!=listSelect.selectValues){
//			for(var i=0;i<listSelect.selectValues.length;i++){
//				var tmpSv = listSelect.selectValues[i];
//				if(tmpSv.type == listSelect.currentType){
//					cvalue = tmpSv.value;
//				}
//			}
//		}
//
//		if (undefined != itemList && itemList.options.length > 0) {
//			for (var i = 0; i < itemList.options.length; i++) {
//				var option = itemList.options[i];
//
//				if (listSelect.inputType == "0") {
//					if (cvalue.indexOf(option.value) >= 0) {
//						ucapCommonFun.addOption(resultList,option.value,option.innerText);
//					}
//				} else {
//					if (cvalue.indexOf(option.innerText) >= 0) {
//						ucapCommonFun.addOption(resultList,option.value,option.innerText);
//					}
//				}
//			}
//		}

	},
	
	/**
	 * 获取选择的结果值
	 */
	getResultValue:function(){
		var resultList = Ext.getDom("resultList");
		var val="";
		var text="";
		
		if(undefined!=resultList.options && resultList.options.length>0){
			for(var i=0;i<resultList.options.length;i++){
				var tmpOpt = resultList.options[i];
				var tmpVal = "";
				var tmpTxt = "";
				tmpTxt = tmpOpt.innerText;
				tmpVal = tmpOpt.value;
				if(val==""){
					val = tmpVal;
				}else{
					val+=listSelect.outSplit+tmpVal;
				}				
				if(text==""){
					text = tmpTxt;
				}else{
					text+=listSelect.outSplit+tmpTxt;
				}
			}
		}
		
		return val+listSelect.valTextSplit+text;
	},

	/**
	 * 移动选择的结果值
	 * 
	 * @param {}
	 *            direction 移动方向，1向下移动，-1向上移动
	 */
	moveResult : function(direction) {
		var resultList = Ext.getDom("resultList");
		if (resultList.selectedIndex < 0)
			return;
		ucapCommonFun.moveOption(resultList, direction);
	},
	addSelect:function(){
		if(this.isTree){
			this.treeAddSelect();
		} else {
			this.commonAddSelect();
		}
	},
	treeAddSelect:function(){
		var tree = listSelect.tree;
		var nodes = tree.getChecked();
		if (nodes.length==0){
			Ext.Msg.alert("提示信息","当前未选择任何节点");
			return false;
		}		
		if (listSelect.selNum == 1) {// 先清空列表
			// 先清空列表
			this.delAll();
		}		
		for(var i=0;i<nodes.length;i++){
			var unid = nodes[i].id;
			if (this.type=="204"){
				//是字典
				if (ucapTreeSelect.valueType=="value"){
					unid = nodes[i].attributes.value;
				}
			}
			var obj={value:unid,innerText:nodes[i].text};
			this.addOptionByValue(obj);	
		}
		return true;
		
	},
	/**
	 * 增加选中
	 */
	commonAddSelect : function() {
		var selectList = Ext.getDom(this.commSelectId);
		if (selectList.selectedIndex < 0)
			return;
		var resultList = Ext.getDom("resultList");
		if (listSelect.selNum == 1) {// 先清空列表
			// 先清空列表
			this.delAll();
		}
		for (var i=0;i<selectList.options.length;i++){
			if (selectList.options[i].selected) {
				var val = selectList.options[i];
				this.addOptionByValue(val);				
			}
		}
	},
	addAll:function(){
		if (this.isTree){
			this.treeAddAll();	
		} else {
			this.commonAddAll();
		}
	},
	treeAddAll:function(){
		
	},
	/**
	 * 增加全部
	 */
	commonAddAll : function() {
		var selectList = Ext.getDom(this.commSelectId);
		var resultList = Ext.getDom("resultList");
		if (undefined == selectList || selectList.options.length < 0)
			return;
		for (var i = 0; i < selectList.options.length; i++) {
			var selectOpt = selectList.options[i];			
			this.addOptionByValue(selectOpt);		
		}

	},

	/**
	 * 删除选中
	 */
	delSelect : function() {
		var resultList = Ext.getDom("resultList");
		if (resultList.selectedIndex < 0)
			return;

		resultList.options.remove(resultList.selectedIndex);
	},

	/**
	 * 删除所有选中
	 */
	delAll : function() {
		var resultList = Ext.getDom("resultList");

		if (undefined != resultList && resultList.options.length > 0) {
			var olength = resultList.options.length;
			for (var i = 0; i < olength; i++) {
				resultList.options.remove(0);
			}
		}
	},
	/**
	 * 把selectOpt的对象，添加到结果中
	 * @param {} selectOpt
	 */
	addOptionByValue:function(selectOpt){
		var resultList = Ext.getDom("resultList");
		for (var i = 0; i < resultList.options.length; i++) {
			var tmpOpt = resultList.options[i];
			if (tmpOpt.value == selectOpt.value) {
				return;
			}
		}
		// 增加完毕
		ucapCommonFun.addOption(resultList,selectOpt.value,selectOpt.innerText);

	},
	/**
	 * 获取所有的选择值
	 */
	getSelectedValue:function(){
		var selectedValue = "";
		var selectedText = "";
		
		if(undefined!=listSelect.selectValues && listSelect.selectValues.length>0){
			for(var i=0;i<listSelect.selectValues;i++){
				if(listSelect.selectValues[i].type!=listSelect.currentType){
					if(selectedValue==""){
						selectedValue = listSelect.selectValues[i].value;
						selectedText = listSelect.selectValues[i].text;
					}else{
						selectedValue +=listSelect.outSplit+listSelect.selectValues[i].value;
						selectedText +=listSelect.outSplit+listSelect.selectValues[i].text;
					}
				}
			}
		}
		
		var tmpValue = listSelect.getResultValue();
		if(tmpValue!=""){
			if(selectedValue==""){
				selectedValue = tmpValue.substring(0,tmpValue.indexOf(listSelect.valTextSplit));
			}else{
				selectedValue +=listSelect.outSplit+ tmpValue.substring(0,tmpValue.indexOf(listSelect.valTextSplit));
			}
			
			if(selectedText==""){
				selectedText = tmpValue.substring(tmpValue.indexOf(listSelect.valTextSplit)+listSelect.valTextSplit.length);
			}else{
				selectedText +=listSelect.outSplit+tmpValue.substring(tmpValue.indexOf(listSelect.valTextSplit)+listSelect.valTextSplit.length);
			}
		}		
		return selectedValue+listSelect.valTextSplit+selectedText;
	}
}


//以下是树型选择的方法
var	ucapTreeSelect={
	rootUnid:"", 
	rootName:"字典列表",
	selectType:"1", //单，多选的标志 1表示单选
	inputName:"",   //要设置的字段名称
	inputSplit:"",  //输入的分隔符
	outSplit:"",    //输出的分隔符
	valueType:"value",  //值的类型 有 id value 
	// 多选: 'multiple'(默认)
	// 单选: 'single'
	// 级联多选: 'cascade'(同时选父和子);'parentCascade'(选父);'childCascade'(选子)
	checkModel:"childCascade", 
	//是否只能选择叶子
	onlyLeafCheckable:true,
	height:"",
	width:"",
	actionType:"",  //参数
	act:"",
	tree:null,
	/**
	 * unid如果为空，则说明可以同时选上级节点及叶子节点
	 * @param {} unid
	 * @param {} rootName
	 */
	createTree:function(unid,rootName){
		if(typeof unid =="undefined" || unid==null || unid=="" ){			
			unid="_root";
			this.valueType = "id";
		} else {
			this.valueType ="value";
			this.rootName = rootName;
		}	
		this.rootUnid = unid;		
		Ext.getDom("multiSelect").style.display="";
		Ext.getDom("commonSelectTree").innerHTML="";
		Ext.DomHelper.applyStyles(Ext.get("commonSelectTree"),'style="padding:0px;"');

		if(this.selectType=="1"){
			this.checkModel="single";
			Ext.getDom("multiSelect").style.display="none";
			//this.width =170;
			//this.height=210;
		} else {
			this.checkModel = "childCascade";
		//	this.width =190;
		//	this.height=320;
		}
		if (unid=="_root"){
		//	this.checkModel ="cascade";
			this.onlyLeafCheckable = false;
		}
	 	var root=new Ext.tree.AsyncTreeNode({
			expanded: true,		
			id:this.rootUnid,
			text:this.rootName
		});	
	
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction
	     });
		loader.on('beforeload', function(treeloader, node) {
			var unid=node.id;
			if (unid=="_root") unid="";
			treeloader.baseParams ={type:ucapTreeSelect.actionType,act:ucapTreeSelect.act,unid:unid},
			treeloader.baseAttrs= { uiProvider: Ext.ux.TreeCheckNodeUI } 
         }, this);
		var tree=new Ext.tree.TreePanel({
			renderTo:"commonSelectTree",
			root:root,
			animate:true,
			checkModel: this.checkModel,   //对树的级联多选
   			onlyLeafCheckable: this.onlyLeafCheckable,//对树所有结点都可选
			rootVisible:true,
			autoScroll:true,
			//autoWidht:true,
			//autoHeight:true,
			width:this.width,
			containerScroll: true,
			height:this.height,
			loader: loader
		});		
		listSelect.tree = tree;
	}
}/**
 * 菜单定制 快捷方式集定制方法
 * @author yjy
 */
Ext.namespace('ucapShortConfig'); 
var ucapShortConfig={
	/**
	 * html类型 1表示菜单项 2表示根
	 * @type Number
	 */
	htmlType:1,
	title:"",
	leftWidth:185,
	displayName:"",
	name:"",
	saveNewImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_103.gif" +'"/>',
	saveImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_29.gif" +'"/>',
	closeImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_102.gif" +'"/>',

	rootUnid:"",   //根节点UNID
	treeJson:[],      //树的来源值
	oldJson:[],  //旧的json值
	html:"",
	tree:null,  //当前树的对象
	root:null,  //根节点的对象
	newRootId:"_ucapShortNew",
	height:500,
	isNewFlag:false, //判断是否为新增状态，在保存后，此值设置为false,新建时设置为true
	preHtml:"", //前一步的HTML，避免html重复加载
	cutNode:null,  //剪切的节点对象
	win:"",
	/**
	 * 初始化相关变量值
	 */
	initValue:function(){
		this.oldJson = null;
		this.preHtml ="";
		this.tree = null;
		this.treeJson=[];
	},
	/**
	 * 视图上的打开文档
	 * @param {} ShortUnid
	 */
	openShortByView:function(ShortUnid){
		this.openShortConfig(ShortUnid);
	},
	/**
	 * 打开快捷方式集定制对话框 public
	 * @param ShortUnid 如果为空，说明是要新建一个菜单
	 * @param isNotInitWin 是否不用初始化窗口，为空默认为需要
	 */
	openShortConfig:function(shortUnid,isNotInitWin){
		var isNew = false;
		if (typeof shortUnid =="undefined" || shortUnid=="") {
			shortUnid="";
			isNew =true;
		}
		if (typeof isNotInitWin =="undefined") isNotInitWin ="";
		this.initValue();
		this.isNewFlag = isNew;
		this.title="快捷方式集"; 
		if (this.isNewFlag){
			this.rootUnid = this.newRootId;
			this.displayName = "新建快捷方式集";
		} else {
			this.createShortTree(shortUnid);
		}
		if (isNotInitWin=="")  this.initWinBox();
		this.createTree();
	},
	/**
	 * 生成快捷方式集菜单
	 */
	createShortTree:function(shortUnid){
		var url =ucapSession.baseAction;
		url+="?type=short&act=getShortTree&shortUnid="+shortUnid+
				"&random="+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);			
		var result = conn.responseText;
		
		if (result.indexOf("error")>-1){
			Ext.Msg.alert("提示","从后台获取快捷方式集内容时出错，快捷方式集的ID为"+shortUnid);
			return "";
		}
		var json = Ext.decode(result);
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		this.displayName = json.displayName;
		this.name = json.name;
		this.shortUnid = json.unid;  	
		this.rootUnid = this.shortUnid;
		if (typeof json.shortcuts =="undefined"){
			this.treeJson=[];
		} else {
			this.treeJson = json.shortcuts;
		}
	},
	
	/**
	 * private
	 */
    initWinBox:function(){   
     	var buttonItems=[
	        {text: '重命名',id:"shortFileRename",handler:onShortItemClick},'-',
	        {text: '删除', id:"shortFileDelete",handler: onShortItemClick}
	  		];
		var toolbar=[
	    	{text: '文件',menu :{items: [{text: '新建',id:"shortFileNew", handler: onShortItemClick},'-',
	                        {text: '关闭',id:"shortFileClose", handler: onShortItemClick}]}},
	        {text: '编辑', menu :{items: buttonItems}},
	        {text: '查看',menu :{items: [{text: '展开',id:"shortExpand", handler: onShortItemClick},
	        	{text: '折叠',id:"shortCollapse", handler: onShortItemClick},
	        	{text: '全部展开',id:"shortExpandAll", handler: onShortItemClick},
	        	{text: '全部折叠',id:"shortCollapseAll", handler: onShortItemClick}
	        	]}},
	          '-',
	         {text: '新建',id:"shortNew", handler: onShortItemClick},
	         {text: '删除', id:"shortDelete",handler: onShortItemClick},
	         '-'
	      ];
    	ucapShortConfig.win = new Ext.Window({
            title: ucapSession.win.winImg+this.title+'定制窗口',
            closable:true,
            width:700,
            height:this.height,
            modal: true, 
            bodyStyle:ucapSession.win.winBodyStyle,
            tbar:toolbar,
            plain:true,
            layout: 'border',
            items:[
            	{title:'<div id="menuConfigTitle"></div>',
	             region:'west',	            
	             html:'<div id="leftTree">正在加载，请稍等......</div>',
	             width:this.leftWidth,
	             autoScroll:true,
	             collapsible:true, 
	             split: true},
	            {
	             id:"centerId",
	             region:"center",
	             html:'<div id="ucapShortCenter"></div>',
	          //   bodyStyle:ucapSession.win.winBodyStyle,
//	             autoLoad:{url:ucapSession.appPath+this.html,scripts:true,nocache: true},
	             buttonAlign:"right",
	             tbar:['->',
	             	{text:this.saveNewImg+"保存并新增下一下",handler:function(){
	             				ucapShortConfig.save("",1);} },
	             	{text:this.saveImg+"保存",id:"shortSave",handler:function(){
	             				ucapShortConfig.save();} },
	             	{text:this.closeImg+"关闭",id:"shortClose",handler: onShortItemClick}
	             	]
	            }          
            ]
        });
        ucapShortConfig.win.show();  
        var bar = ucapShortConfig.win.getTopToolbar();
        bar.addField(
        	new Ext.form.Checkbox({name:'saveInfo',fieldLabel:'1',
        	   boxLabel:'保存成功时有提示',checked:true})        		
        );
    },
	/**
	 * private
	 */
	createTree:function(){
		this.preHtml = "";
     	this.tree = null;
    	this.htmlType="";
		var title=this.title+"定制";
		this.setWinTitle(title);
	 	Ext.DomHelper.applyStyles(Ext.get("leftTree"),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom("leftTree").innerHTML="";
	 	var root;
	 	if (typeof(this.treeJson)!="undefined" ){
		 	root=new Ext.tree.AsyncTreeNode({
				expanded: true,		
				id:this.rootUnid,
				text:this.displayName,
				children: this.treeJson 
			});	
	 	} else {
	 		root=new Ext.tree.AsyncTreeNode({
				expanded: true,		
				id:this.rootUnid,
				leaf:true,
				text:this.displayName
			});	
	 	}
		var tree=new Ext.tree.TreePanel({
			renderTo:"leftTree",
			root:root,
			animate:true,
			rootVisible:true,
			enableDD: true, //允许拖放
			autoScroll:true,
			 containerScroll: true,
			//width:this.leftWidth-5,
			height:ucapShortConfig.height-92,
			loader: new Ext.tree.TreeLoader({
				dataUrl:""
			})
		});		
		tree.on("click",function(){
			ucapShortConfig.isNewFlag = false;
			ucapShortConfig.loadHtml();			
		});
		tree.addListener('movenode', ucapShortConfig.handleMoveNode); 
		
		tree.on('contextmenu', menuShow);
        function menuShow ( node )
          {
          	node.select();//让右击是选中当前节点     
          	ucapShortConfig.setButtonState(); 
            treeRightMenu.show(node.ui.getAnchor());
                               
         };
        var treeRightMenu = new Ext.menu.Menu({ 
             items: [ 
	             { 	 id:'shortRightNew',
	                 text: '新建',
	                 icon:"",
	                 handler:onShortItemClick 
	             },                 
	             { 	 id:'shortRightDelete',
	                 text: '删除',
	                 icon:"",
	                 handler:onShortItemClick 
	             },{
	                 text: "重命名", 
	                 icon: "",
	                 handler:function(){onShortItemClick("shortRename");}
	              }
             ]
         });             
		this.tree  =tree;
		root.select();
		this.root = root;		
	 	this.loadHtml();
	},
	/**
	 * @param isNotLoad 如果为ture 则不用LOAD 数据，只是进行htmlType类型的判断
	 * private
	 */
	loadHtml:function(isNotLoad){
		var notLoad = false;
		if (typeof(isNotLoad)!="undefined") notLoad = isNotLoad;
		
		var node = this.getSelectNode();
		var unid= node.id;
		var params ;
		//如果是新建子项状态，则要进行判断，如果是在根节点，则以快捷方式集子项装载页面
		if (node.id ==this.root.id){
			//如果是根节点，则进行判断
			this.htmlType =2;			
		} else {
			this.htmlType =1;	
		}
		if (this.isNewFlag && node.id != this.newRootId ){
			this.htmlType =1;
		}
		if (this.htmlType == 2){
			ucapShortConfig.html="sys/cfgJsp/short/shortRoot.jsp";
		} else {
			params ={"type":"short","act":"getShortItem","unid":unid,"random":ucapCommonFun.getRandomString()};
			ucapShortConfig.html="sys/cfgJsp/short/shortMenu.jsp";
		}	
		if (notLoad) return;
		if (this.isNewFlag){
			ucapShortConfig.preHtml ="";
		};
		var url=ucapSession.appPath+ucapShortConfig.html;
		if (ucapShortConfig.preHtml!=ucapShortConfig.html){
			ucapShortConfig.preHtml = ucapShortConfig.html;
			var el = Ext.get("ucapShortCenter");
			var mgr = el.getUpdater();
			mgr.update({
		        url: url,
		        scripts:true
			});			
			mgr.on("update",function(){
				if (ucapShortConfig.htmlType==2){
					if (node.id == ucapShortConfig.rootUnid){
						if (Ext.getDom("displayName")) Ext.getDom("displayName").value = ucapShortConfig.displayName;
						if (ucapShortConfig.name && Ext.getDom("name")) Ext.getDom("name").value = ucapShortConfig.name;
					}
					ucapShortConfig.setButtonState();					
				} else {
					ucapShortConfig.setValue(unid,params);
				}
				
			})
		    
		} else {
			if (ucapShortConfig.htmlType==2) return;
			ucapShortConfig.setValue(unid,params);
		}			
	},
	setButtonState:function(){
		var node = ucapShortConfig.getSelectNode();
		//进行新建按钮的权限过滤，如果是叶子节点，不能再新建
		if (ucapShortConfig.root.id == ucapShortConfig.newRootId){
			//不能新建
			Ext.getCmp("shortNew").setDisabled(true);
			Ext.getCmp("shortRightNew").setDisabled(true);
			Ext.getCmp("shortFileNew").setDisabled(true);
			Ext.getCmp("shortDelete").setDisabled(true);
			Ext.getCmp("shortRightDelete").setDisabled(true);
			Ext.getCmp("shortFileDelete").setDisabled(true);
			return;
		} else {
			Ext.getCmp("shortDelete").setDisabled(false);
			Ext.getCmp("shortRightDelete").setDisabled(false);
			Ext.getCmp("shortFileDelete").setDisabled(false);
		}
		if( !node.isLeaf() ||  node.id == ucapShortConfig.root.id ){
			//允许新建
		    Ext.getCmp("shortFileNew").setDisabled(false);
			Ext.getCmp("shortNew").setDisabled(false);
			Ext.getCmp("shortRightNew").setDisabled(false);	
		} else {
			//不能新建
			Ext.getCmp("shortFileNew").setDisabled(true);
			Ext.getCmp("shortNew").setDisabled(true);
			Ext.getCmp("shortRightNew").setDisabled(true);
		}
	},
	/**
	 * private
	 */
	setValue:function(unid,params,flag){
		if (this.isNewFlag) {
			ucapShortConfig.setButtonState();
			return; //新建状态，不用加载数据
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					if (response.responseText==null || response.responseText=="null" ) return;
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					if(typeof json =="undefined" || json==null) return;
					ucapCommonFun.setFormValue(json);					
					if(json==undefined || "undefined"!=typeof(json.picturePath)){
						Ext.getDom("titleIconImg").src =ucapSession.appPath+ json.picturePath;
					}
				 	ucapShortConfig.oldJson = ucapCommonFun.getFormJSon("shortConfigdialogHtml");
				 	ucapShortConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示","取值不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * name 有值，说明是通过改名进行的
	 * @param {} name
	 * @param newflag 为1，说明是保存并新建下一个
	 */
	save:function(msgName,newflag){
		if (typeof newflag =="undefined") newflag ="";
		var isSaveInfo = ucapCommonFun.getObjValueJson("saveInfo").v;
		
		var isRename = true;
		if (typeof(msgName)=="undefined" || msgName==""){
			isRename = false;		
		}
		var json;
		if (!isRename ){
			json = ucapCommonFun.getFormJSon("shortConfigdialogHtml");
//			alert(Ext.encode(json));
			if (newflag==""){
				if (Ext.encode(ucapShortConfig.oldJson)==Ext.encode(json)){
					Ext.Msg.alert("保存提示","当前数据未更改，无须保存！");
					return ;
				}
			}
		} else {
			//自己组装Json格式
			ucapShortConfig.loadHtml(true);
			if (ucapShortConfig.htmlType==2){
				json = {displayName:msgName};
			} else {
				json = {name:msgName};
			}			
		}
		var node = ucapShortConfig.getSelectNode();
		var unid = node.id;
		var flag="old";
		var parentId="";
		if (this.isNewFlag){
			flag="new";
			parentId = ucapShortConfig.root.id;
		}
		var params;
		if (ucapShortConfig.htmlType ==2){
			params ={"type":"short","act":"saveShortRoot",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是菜单
		} else if (ucapShortConfig.htmlType ==1){
			params ={"type":"short","act":"saveShortItem",flag:flag,"unid":unid,parentId:parentId,"random":ucapCommonFun.getRandomString()};
		} 	
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					ucapShortConfig.oldJson = ucapCommonFun.getFormJSon("shortConfigdialogHtml");
					if (!isRename && isSaveInfo !="" && newflag=="") Ext.Msg.alert("提示","保存信息成功！");
					if(ucapShortConfig.isNewFlag){
						//新建 文档的保存
						ucapShortConfig.newSaveConfig(json,response);
					} else {
					    //旧文档的保存	
						ucapShortConfig.oldSaveConfig(json,response);
					}
					if (newflag==1){
						//说明是保存后要继续新建文档
						//alert("okadaa");
						var node = ucapShortConfig.getSelectNode();
						if (node.id != ucapShortConfig.tree.getRootNode().id){
							//说明不是根节点	
							node.parentNode.select();
						}						
						ucapShortConfig.isNewFlag = true;
						ucapShortConfig.loadHtml();		
					}
					ucapShortConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示","保存不成功，请重试！");
				}
			}
		}		
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 新建文档后的保存操作 private
	 * @param {} json
	 */
	newSaveConfig:function(json,response){
		//这是后台返回是父节点的JSON
		var node = ucapShortConfig.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
	  
		if (node.id == ucapShortConfig.newRootId){
			//说明是根节点自己的保存,只需替换根节点就可以
			node.id=mjson.unid;
			node.setText(mjson.displayName);
			node.leaf= true;
			ucapShortConfig.rootUnid = node.id;
			ucapShortConfig.root = node;
		} else {						
			//在当前节点下追加一个子节点
			node.expand();
			var newNode = new Ext.tree.TreeNode({
				id:mjson.unid,
				text:mjson.name,
				leaf:true
			});	
			node.leaf = false;
			node.icon="";
			node.appendChild(newNode);			
			newNode.select();			
			
		}
		ucapShortConfig.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		ucapShortConfig.saveFlag = true;			
		var node = ucapShortConfig.getSelectNode();			
		if (response.responseText.indexOf("nochange")>-1){
			//说明只是对旧对象进行保存，只要更新名称就可以了	
			if (ucapShortConfig.htmlType==2){
				node.setText(json.displayName);
			} else {
				node.setText(json.name);	
			}			
		} else {
			//说明是新增一个对象，则要替换当前节点
			var mjson = Ext.decode(response.responseText);	
			if (node.id==ucapShortConfig.root.id){
			  //说明是根节点的保存
				node.id=mjson.unid;
				node.setText(mjson.displayName);	
			} else {
				node.id =mjson.unid;
				node.setText(mjson.name);						
			}						
		}
	},
	getSelectNode:function(){
		return ucapShortConfig.tree.getSelectionModel().getSelectedNode();	
	},
	setWinTitle:function(title){
		Ext.getDom("menuConfigTitle").innerHTML= title;	
	},	
	/**
	 * 树的移动
	 */
	handleMoveNode:function(tree,node,oldParent,newParent,index){
		var posIndex=index+1;
		if (index==newParent.childNodes.length-1){
			//说明是在最后一个
			posIndex = index-1;
		}		
		var posNode = newParent.childNodes[posIndex];
		var params={type:"short",act:"move",unid:node.id,posCutId:posNode.id,
					"random":ucapCommonFun.getRandomString()};
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if (response.responseText=="false"){
						Ext.Msg.alert("移动提示","移动不能被保存，无法生效！");
						return;
					}
				} else {
					Ext.Msg.alert("移动提示","移动不能被保存，无法生效！")	;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 删除选中节点的树，包括下面的所有子树
	 * @param infoFlag 是否要删除的提示，默认为true
	 */
	deleteNode:function(infoFlag){
		if (typeof (infoFlag) =="undefined") infoFlag =true;
		var deleteNodeAct =function(){
			var unid = node.id;
			var flag = "item";
			if (node.id == ucapShortConfig.root.id){
				flag = "root";
			} 	
			var params ={"type":"short","act":"delete",flag:flag,"unid":unid,
						"random":ucapCommonFun.getRandomString()};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){	
						var exjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult)return;
						
						ucapShortConfig.saveFlag = true;
						var node = ucapShortConfig.getSelectNode();
						if (flag!="root"){
							var pnode = node.parentNode;							
							node.remove();
							pnode.select();							
							ucapShortConfig.loadHtml();
						} else {
							//说明已经是空的对象
							ucapShortConfig.openShortConfig("",1);
							ucapShortConfig.name="";
						//	ucapShortConfig.displayName="";
						}
					} else {
						Ext.Msg.alert("提示","删除不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		var node = ucapShortConfig.getSelectNode();
		if (infoFlag){
			var msg="";
			var nodemsg = "";
			if (!node.isLeaf()){
				nodemsg = "<br><br>删除时将同时删除其下所有的子节点";
			}
			msg ="你是否确定要删除选中的节点" +nodemsg+
					"？";				
			Ext.MessageBox.confirm("删除提示",msg,function(id){
				if (id=="yes"){
	        		deleteNodeAct();
	    		}
			});	    	
		} else {
			deleteNodeAct();
		}
    	
	}
}
var onShortItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "shortNew":{   		
		ucapShortConfig.isNewFlag = true;
		ucapShortConfig.loadHtml();
		break;
	}
	case "shortRightNew":
		ucapShortConfig.isNewFlag = true;
		ucapShortConfig.loadHtml();
		break;
	case "shortFileNew":{
		ucapShortConfig.isNewFlag = true;
		ucapShortConfig.loadHtml();
		break;
	}
	case "shortDelete":{
		ucapShortConfig.deleteNode();
		break;
	}
	case "shortRightDelete":{
		ucapShortConfig.deleteNode();
		break;
	}
	case "shortFileDelete":{
		ucapShortConfig.deleteNode();
		break;
	}
	case "shortClose":{
		ucapShortConfig.win.close();
   	  	break;
	}
	case "shortFileClose":{
		ucapShortConfig.win.close();
   	  	break;
	}
	case "shortExpandAll":
		ucapShortConfig.getSelectNode().expand(true);
		break;
	case "shortExpand":
		ucapShortConfig.getSelectNode().expand();
		break;
	case "shortCollapseAll":
		ucapShortConfig.getSelectNode().collapse(true);
		break;
	case "shortCollapse":
		ucapShortConfig.getSelectNode().collapse();
		break;
	case "shortRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("改名提示","名称不能为空！");
		 			return;
		 		}
				ucapShortConfig.save(msg);
			}
		},this);
		break;
	case "shortFileRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				ucapShortConfig.save(msg);
			}
		},this);
		break;
	
	default :
       alert(btn.id+"代码未实现！");
	} 
}/*
 * My97 DatePicker 4.2
 * SITE: http://dp.my97.net
 * BLOG: http://my97.cnblogs.com
 * MAIL: smallcarrot@163.com
 */
var $dp,WdatePicker;(function(){var $={

$wdate:true,
$crossFrame:false,
$dpPath:"",
position:{},
lang:"auto",
skin:"default",
dateFmt:"yyyy-MM-dd",
realDateFmt:"yyyy-MM-dd",
realTimeFmt:"HH:mm:ss",
realFullFmt:"%Date %Time",
minDate:"1900-01-01 00:00:00",
maxDate:"2099-12-31 23:59:59",
startDate:"",
alwaysUseStartDate:false,
yearOffset:1911,
isShowWeek:false,
highLineWeekDay:true,
isShowClear:true,
isShowToday:true,
isShowOthers:true,
readOnly:false,
errDealMode:0,
autoPickDate:null,
qsEnabled:true,

disabledDates:null,disabledDays:null,opposite:false,onpicking:null,onpicked:null,onclearing:null,oncleared:null,eCont:null,vel:null,errMsg:"",quickSel:[],has:{}};WdatePicker=S;var V=window,N="document",H="documentElement",A="getElementsByTagName",T,_,R,G,Z;switch(navigator.appName){case"Microsoft Internet Explorer":R=true;break;case"Opera":Z=true;break;default:G=true;break}T=V;if($.$crossFrame){try{while(T.parent[N]!=T[N]&&T.parent[N][A]("frameset").length==0)T=T.parent}catch(P){}}_=J();if($.$wdate)K(_+"skin/WdatePicker.css");var L;if(T.$dp){try{L=(T.$dp.$("MY")=="lIkEmY97")}catch(P){L=P.number==-2146823277?true:false}}if(!T.$dp||L){$dp=Q({ff:G,ie:R,opera:Z,el:null,win:V,status:L?2:0,defMinDate:$.minDate,defMaxDate:$.maxDate,$:function(_){try{this.win[N]}catch($){return"lIkEmY97"}return(typeof _=="string")?this.win[N].getElementById(_):_},$D:function($,_){return this.$DV(this.$($).value,_)},$DV:function(_,$){if(_!=""){this.dt=$dp.cal.splitDate(_,$dp.cal.dateFmt);if($)for(var A in $){if(this.dt[A]===undefined)this.errMsg="invalid property:"+A;this.dt[A]+=$[A]}if(this.dt.refresh())return this.dt}return""},show:function(){if(this.dd)this.dd.style.display="block"},hide:function(){if(this.dd)this.dd.style.display="none"},attachEvent:C});if(!L)X(T,function(){S(null,true)})}else $dp=T.$dp;if(!V[N].docMD){C(V[N],"onmousedown",B);V[N].docMD=true}if(!T[N].docMD){C(T[N],"onmousedown",B);T[N].docMD=true}C(V,"onunload",function(){$dp.hide()});function Q(_){T.$dp=T.$dp||{};for(var $ in _)T.$dp[$]=_[$];return T.$dp}function C(A,$,_){if(R)A.attachEvent($,_);else{var B=$.replace(/on/,"");_._ieEmuEventHandler=function($){return _($)};A.addEventListener(B,_._ieEmuEventHandler,false)}}function J(){var _,A,$=document.getElementsByTagName("script");for(var B=0;B<$.length;B++){_=$[B].src.substring(0,$[B].src.toLowerCase().indexOf("wdatepicker.js"));A=_.lastIndexOf("/");if(A>0)_=_.substring(0,A+1);if(_)break}return _}function D(F){var E,C;if(F.substring(0,1)!="/"&&F.indexOf("://")==-1){E=T.location.href;C=location.href;if(E.indexOf("?")>-1)E=E.substring(0,E.indexOf("?"));if(C.indexOf("?")>-1)C=C.substring(0,C.indexOf("?"));var _="",D="",A="",H,G,B="";for(H=0;H<Math.max(E.length,C.length);H++)if(E.charAt(H).toLowerCase()!=C.charAt(H).toLowerCase()){G=H;while(E.charAt(G)!="/"){if(G==0)break;G-=1}_=E.substring(G+1,E.length);_=_.substring(0,_.lastIndexOf("/"));D=C.substring(G+1,C.length);D=D.substring(0,D.lastIndexOf("/"));break}if(_!="")for(H=0;H<_.split("/").length;H++)B+="../";if(D!="")B+=D+"/";F=B+F}$.$dpPath=F}function K(C,$,D){var B=V[N],E=B[A]("HEAD").item(0),_=B.createElement("link");_.href=C;_.rel="stylesheet";_.type="text/css";if($)_.title=$;if(D)_.charset=D;E.appendChild(_)}function X($,_){C($,"onload",_)}function E($){$=$||T;var B=0,_=0;while($!=T){var D=$.parent[N][A]("iframe");for(var F=0;F<D.length;F++){try{if(D[F].contentWindow==$){var E=U(D[F]);B+=E.left;_+=E.top;break}}catch(C){}}$=$.parent}return{"leftM":B,"topM":_}}function U(E){if(R)return E.getBoundingClientRect();else{var A={ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i},G=null,_=E.offsetTop,F=E.offsetLeft,D=E.offsetWidth,B=E.offsetHeight,C=E.offsetParent;if(C!=E)while(C){F+=C.offsetLeft;_+=C.offsetTop;if(C.tagName.toLowerCase()=="body")G=C.ownerDocument.defaultView;C=C.offsetParent}C=E.parentNode;while(C.tagName&&!A.ROOT_TAG.test(C.tagName)){if(C.scrollTop||C.scrollLeft)if(!A.OP_SCROLL.test(C.style.display))if(!Z||C.style.overflow!=="visible"){F-=C.scrollLeft;_-=C.scrollTop}C=C.parentNode}var $=Y(G);F-=$.left;_-=$.top;D+=F;B+=_;return{"left":F,"top":_,"right":D,"bottom":B}}}function M($){$=$||T;var _=$[N];_=_[H]&&_[H].clientHeight&&_[H].clientHeight<=_.body.clientHeight?_[H]:_.body;return{"width":_.clientWidth,"height":_.clientHeight}}function Y($){$=$||T;var B=$[N],A=B[H],_=B.body;B=(A&&A.scrollTop!=null&&(A.scrollTop>_.scrollLeft||A.scrollLeft>_.scrollLeft))?A:_;return{"top":B.scrollTop,"left":B.scrollLeft}}function B(_){src=_?(_.srcElement||_.target):null;if($dp&&$dp.dd&&$dp.dd.style.display=="block"&&src!=$dp.el){var A=$dp.el,B=$dp.cal,$=$dp.el[$dp.elProp];if($!=null){$dp.$w.hideSel();if($!=""&&!$dp.readOnly)B.date.loadFromDate(B.splitDate($,B.dateFmt));if($==""||(B.isDate(B.date)&&B.isTime(B.date)&&B.checkValid(B.date))){B.mark(true);if($!="")B.update();else B.setRealValue("");$dp.hide()}else B.mark(false)}else $dp.hide()}}var O=[];function W(){$dp.status=2;F()}function F(){if(O.length>0){var $=O.shift();$.el={innerHTML:""};$.eCont=$dp.$($.eCont);$.autoPickDate=true;$.qsEnabled=false;I($)}}function S(C,$){$dp.win=V;C=C||{};if($){$dp.status=1;I({el:{innerHTML:""}},true)}else if(C.eCont){O.push(C);if($dp.status==2)F()}else{if($dp.status==0)$dp.status=1;if($dp.status!=2)return;var B,A=_();if(A){B=A.srcElement||A.target;A.cancelBubble=true}C.el=$dp.$(C.el||B);if(!C.el||C.el&&C.el.disabled||(C.el==$dp.el&&$dp.dd.style.display!="none"&&$dp.dd.style.left!="-1970px"))return;I(C)}function _(){if(G){func=_.caller;while(func!=null){var $=func.arguments[0];if($&&($+"").indexOf("Event")>=0)return $;func=func.caller}return null}return event}}function I(G,A){for(var F in $)if(F.substring(0,1)!="$")$dp[F]=$[F];for(F in G)if($dp[F]===undefined)$dp.errMsg="invalid property:"+F;else $dp[F]=G[F];$dp.elProp=$dp.el&&$dp.el.nodeName=="INPUT"?"value":"innerHTML";if($dp.el[$dp.elProp]==null)return;if($dp.lang=="auto")$dp.lang=R?navigator.browserLanguage.toLowerCase():navigator.language.toLowerCase();if(!$dp.dd||$dp.eCont||($dp.lang&&$dp.realLang&&$dp.realLang.name!=$dp.lang)){if($dp.dd&&!$dp.eCont)T[N].body.removeChild($dp.dd);if($.$dpPath=="")D(_);var B="<iframe src=\""+$.$dpPath+"My97DatePicker.htm\" frameborder=\"0\" border=\"0\" scrolling=\"no\"></iframe>";if($dp.eCont){$dp.eCont.innerHTML=B;X($dp.eCont.childNodes[0],W)}else{$dp.dd=T[N].createElement("DIV");$dp.dd.style.cssText="position:absolute;z-index:19700";$dp.dd.innerHTML=B;T[N].body.appendChild($dp.dd);X($dp.dd.childNodes[0],W);if(A)$dp.dd.style.left=$dp.dd.style.top="-1970px";else{$dp.show();C()}}}else if($dp.cal){$dp.show();$dp.cal.init();C()}function C(){var F=$dp.position.left,B=$dp.position.top,G=U($dp.el),$=E(V),C=M(T),A=Y(T),D=$dp.dd.offsetHeight,_=$dp.dd.offsetWidth;if(isNaN(B)){if(B=="above"||(B!="under"&&(($.topM+G.bottom+D>C.height)&&($.topM+G.top-D>0))))B=A.top+$.topM+G.top-D-3;else B=A.top+$.topM+G.bottom;B+=R?-1:1}else B+=A.top+$.topM;if(isNaN(F))F=A.left+Math.min($.leftM+G.left,C.width-_-5)-(R?2:0);else F+=A.left+$.leftM;$dp.dd.style.top=B+"px";$dp.dd.style.left=F+"px"}}})()// ucap流程函数
/**
 * yjy 2008-5-17更新成div方式，并采用extjs的处理方法
 * 
 * @type
 */

var ucapFlowSys = {
	sUcapSystemPath : "/" + location.pathname.split("/")[1] + "/",
	/**
	 * 流程的提交的servelet
	 * 
	 * @type String
	 */
	servlet : "WorkFlowServlet",
	commSelect : "js/ucap/flow/commonSelect.jsp",
	sendJsp : "js/ucap/flow/ucapFlowSend.jsp",
	sendReadOnlyJsp : "js/ucap/flow/ucapFlowSendReadOnly.jsp",
	returnJsp : "js/ucap/flow/ucapFlowReturn.jsp",
	transferJsp : "js/ucap/flow/ucapFlowTransfer.jsp",
	opinionJsp : "js/ucap/flow/OpinionDialog.jsp",
	actionParams : ["getFlowList", "getNodeList", "flowjsp", "getSendFlowInfo",
			"getParticipants", "getUnidsByRolePos", "getSubFlowInfo",
			"sendFlow", "completeFlow", "getReturnFlowInfo", "returnFlow",
			"getTransferInfo", "oldFlowJsp", "OpinionSave", "ucapXtree",
			"getFlowListByIds", "getFlowJspByTodoUnid", "getDefaultType","getParticipantsByFilter"],
	split_str : "!@#",// 多值分隔符
	openFlowDocFun : "", // 新建流程或打开流程文档的外部函数
	openFlowDocFunParams : "",// 对应的参数
	sendWin : null,
	par : "",
	/**
	 * 普通选择框的值
	 * 
	 * @type
	 */
	selectDialogParam : {
		title : "",// 标题
		info : "",// 提示信息
		values : "",// 多值
		texts : "", // 多值
		callBack : null
		// 回调函数，默认参数为选中的值的对象
	},
	sendFlowDialogRead:{
		nextApproveType : "",// 审批方式
		nextNode : "",// 节点名称
		values : ""// 人员名称
	}
}
/**
 * 流程打开对话框
 * 
 * @type
 */
var ucapOpenFlow = {
	isSubFlowDialog : false, // 是否为子流程发送框的标志
	/**
	 * 发送对话框的返回值
	 * 
	 * @type
	 */
	flowReturn : {
		nextNodeUnid : "", // 下一节点的UNID
		auditType : "", // 审批方式
		nodeTransactors : "", // 节点办理人
		nodeTransactorids : "", // 节点办理人ID
		notNodeTransactors : "", // 非节点办理人
		notNodeTransactorids : "" // 非节点办理人ID
	},
	/**
	 * 弹出所有的当前用户可创建的流程
	 * 
	 * @param {function}
	 *            openCallBack回调函数 默认参数为URL
	 * @param {object}
	 *            openCallBackParam，外面调用时的参数
	 */
	openFlowDialog : function(openCallBack, openCallBackParam) {
		this.isSubFlowDialog = false;
		if (typeof openCallBack != "undefined") {
			if (typeof openCallBack != "function") {
				Ext.Msg.alert("提示信息", "回调函数只能是函数，不能是字段串(默认参数为新建流程文档的URL)");
				return;
			}
		}
		ucapFlowSys.openFlowDocFun = openCallBack;
		ucapFlowSys.openFlowDocFunParams = openCallBackParam;
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[0]
			},
			callback : function(options, success, response) {
				if (success) {
					ucapOpenFlow._flowBox(response);
				} else {
					Ext.Msg.alert("提示", "获取流程列表不成功");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 获取流程列表后执行的方法
	 * 
	 * @param {}
	 *            response
	 * @subFlow 有值说明是子流程调用 private 不能在外部调用
	 */
	_flowBox : function(response) {
		var result = response.responseText;
		var docs = _ucapXmlDom();
		docs.loadXML(result);
		var flag = docs.selectSingleNode("//result/flag");
		if (flag) {
			if (flag.text == "false") {
				var msgNode = docs.selectSingleNode("//result/msg");
				Ext.Msg.alert(msgNode.text);
				return;
			}
		}
		var flow = docs.selectNodes("//flow");
		ucapFlowSys.selectDialogParam.values = flow[0].getAttribute("id");
		ucapFlowSys.selectDialogParam.texts = flow[0].getAttribute("name");
		ucapFlowSys.selectDialogParam.title = "新建流程对话框";
		ucapFlowSys.selectDialogParam.info = "请选择一个流程";
		ucapFlowSys.selectDialogParam.callBack = ucapOpenFlow.openFlowByFlowUnid;
		for (var i = 1; i < flow.length; i++) {
			ucapFlowSys.selectDialogParam.values += ucapFlowSys.split_str
					+ flow[i].getAttribute("id");
			ucapFlowSys.selectDialogParam.texts += ucapFlowSys.split_str
					+ flow[i].getAttribute("name");
		}
		if (flow.length > 1) {
			// 说明有多个流程列表，要弹出流程选择框
			ucapOpenFlow.openCommSelect(ucapFlowSys.selectDialogParam.callBack);
		} else {
			// 说明只有一个流程，则不弹出对话框，直接进行节点的判断
			ucapOpenFlow
					.openFlowByFlowUnid(ucapFlowSys.selectDialogParam.values);
		}
	},
	/**
	 * 外部可传流程配置的ID进行新建流程对话框 flowIds为流程配置的所有ID列表以“,”分隔
	 * 
	 * @param {}
	 *            flowIds
	 * @param {}
	 *            openCallBackParam，外面调用时的参数
	 * @param {}
	 *            openCallBack
	 */
	openFlowDialogByFlowIds : function(flowIds, openCallBack, openCallBackParam) {
		this.isSubFlowDialog = false;
		if (typeof openCallBack != "undefined") {
			if (typeof openCallBack != "function") {
				Ext.Msg.alert("提示信息", "回调函数只能是函数，不能是字段串(默认参数为新建流程文档的URL)");
				return;
			}
		}
		ucapFlowSys.openFlowDocFun = openCallBack;
		ucapFlowSys.openFlowDocFunParams = openCallBackParam;
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[15],
				"flowIds" : flowIds
			},
			callback : function(options, success, response) {
				if (success) {
					ucapOpenFlow._flowBox(response);
				} else {
					Ext.Msg.alert("提示", "获取流程列表不成功");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 弹出通用的选择框
	 */
	openCommSelect : function(callBack) {
		var html = ucapFlowSys.commSelect;
		var button = [{
					text : "确定",
					id : "commonConfirm",
					handler : function() {
						ucapOpenFlow.commonSelectConfirm(callBack);
					}
				}, {
					text : "取消",
					handler : function() {
						ucapSession.commonWin.close()
					}
				}];
		var title = ucapFlowSys.selectDialogParam.title;
		ucapSession.commonWin = new Ext.Window({
					title : ucapSession.win.winImg + title,
					width : 500,
					closable : true, // 关闭
					modal : true,
					height : 300,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : ucapSession.appPath + html,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapSession.commonWin.show();
	},
	commonSelectConfirm : function(callBack) {
		var json = ucapCommonFun.getFormJSon("dialogSelectHtml");

		var value = json.ucap_selects;
		var par = json.par;

		if (value == "") {
			Ext.Msg.alert("提示信息", "请选择一个值！");
			return;
		}

		try {
			if (typeof callBack == "string") {
				ucapCommonFun.evalJavaScript(callBack + "('" + value + "','"
						+ par + "')");
			} else {
				callBack.call(this, value, par);
			}
			ucapSession.commonWin.close();
		} catch (e) {
		}
	},
	/**
	 * 根据流程ID，判断是否有多个可初始化的节点，如果是，则弹出节点选择框，否则返回流程ID、表单ID
	 * 
	 * @param {}
	 *            flowId 单个流程的UNID
	 */
	openFlowByFlowUnid : function(flowId) {
		var nodeAction = function(response) {
			var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var nodes = docs.selectNodes("//nodes/node");
			ucapFlowSys.selectDialogParam.values = nodes[0].getAttribute("id")
					+ "~@" + nodes[0].getAttribute("formid") + "~@" + flowId;
			ucapFlowSys.selectDialogParam.texts = nodes[0].text;
			ucapFlowSys.selectDialogParam.title = "选择节点对话框";
			ucapFlowSys.selectDialogParam.info = "请选择一个要进入的节点";
			ucapFlowSys.selectDialogParam.callBack = ucapOpenFlow.openFlowByNodeUnid;
			for (var i = 1; i < nodes.length; i++) {
				ucapFlowSys.selectDialogParam.values += ucapFlowSys.split_str
						+ nodes[i].getAttribute("id") + "~@"
						+ nodes[i].getAttribute("formid") + "~@" + flowId;
				ucapFlowSys.selectDialogParam.texts += ucapFlowSys.split_str
						+ nodes[i].text;
			}
			if (nodes.length > 1) {
				// 说明要弹出节点选择对话框
				ucapOpenFlow
						.openCommSelect(ucapFlowSys.selectDialogParam.callBack);
			} else {
				// 说明当前流程只有一个节点，可直接根据流程ID和节点ID进入下一步骤
				ucapOpenFlow
						.openFlowByNodeUnid(ucapFlowSys.selectDialogParam.values);
			}
		};
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[1],
				"flowid" : flowId
			},
			callback : function(options, success, response) {
				if (success) {
					nodeAction(response);
				} else {
					Ext.Msg.alert("提示", "获取节点列表不成功");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * nodeid为三个值 ，以~@分开，第一个值 为节点的UNID，第二个值为表单的UNID，第三个值为流程配置的UNID
	 * 
	 * @param {}
	 *            nodeid
	 */
	openFlowByNodeUnid : function(nodeid) {
		var ids = nodeid.split("~@");
		var sPara = "&flowid=" + ids[2] + "&nodeid=" + ids[0] + "&formid="
				+ ids[1] + "&unid=";

		if (ucapOpenFlow.isSubFlowDialog) {
			// 说明是子流程调用
			var actFlowId = ids[2];
			var actNodeId = ids[0];
			ucapFlowFun.subFlowSendFlow(actFlowId, actNodeId, "");
			return;
		}

		/**
		 * 新建流程对话框，确认后执行的方法
		 */
		var openFlow = function(response) {
			var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var node = docs.selectSingleNode("//result");
			var sUrl = ucapFlowSys.sUcapSystemPath + node.text + sPara;
			if (typeof(ucapFlowSys.openFlowDocFun) == "function") {
				if (typeof(ucapFlowSys.openFlowDocFunParams) != "undefined") {
					if (node.text == "") {
						sUrl = ids[0];
					}
				}
				ucapFlowSys.openFlowDocFun.call(this, sUrl,
						ucapFlowSys.openFlowDocFunParams);
			} else {
				if (node.text == "") {
					Ext.Msg.alert("提示信息",
							"找不到此流程对应的表单，可能是取表单的接口未实现，或此流程对应的表单ID为空！");
					return;
				}
				window.open(sUrl);
			}
		}
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[2],
				"formid" : ids[1]
			},
			callback : function(options, success, response) {
				if (success) {
					openFlow(response);
				} else {
					Ext.Msg.alert("提示", "根据流程表单，获取JSP文件时出错！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 查看旧流程文档的方法
	 * 
	 * @param {}
	 *            par ="unid=文档的UNID"
	 * @param {}
	 *            openCallBackParam，外面调用时的参数
	 * @param openCallBack
	 *            回调函数，默认第一个为URL，第二个为 openCallBackParam
	 */
	openOldFlowDoc : function(par, openCallBack, openCallBackParam) {
		if (typeof openCallBack != "undefined") {
			if (typeof openCallBack != "function") {
				Ext.Msg.alert("提示信息", "回调函数只能是函数，不能是字段串(默认参数为流程文档的URL)");
				return;
			}
		}
		ucapFlowSys.openFlowDocFun = openCallBack;
		ucapFlowSys.openFlowDocFunParams = openCallBackParam;
		var openPostFn = function(response) {
			var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var flow = docs.selectNodes("//instance");
			if (!flow || !flow[0]) {
				Ext.Msg.alert("文档打开提示", "你没有权限打开此文档！");
				return;
			}
			var node = flow[0];

			var jsp = node.getAttribute("jsp");

			var instance = node.getAttribute("id");
			if (flow && flow.length == 1) {
				ucapOpenFlow._openDocByInstance(jsp + "~@" + instance, par);
			} else {
				// 说明有多个流程实例，要弹出对话框让其选择
				ucapFlowSys.selectDialogParam.values = jsp + "~@" + instance;
				ucapFlowSys.selectDialogParam.texts = flow[0].text;
				ucapFlowSys.selectDialogParam.title = "要进入的流程选择对话框";
				ucapFlowSys.selectDialogParam.info = "请选择一个你要进入的流程";
				ucapFlowSys.selectDialogParam.callBack = ucapOpenFlow._openDocByInstance;
				ucapFlowSys.par = par;
				for (var i = 1; i < flow.length; i++) {
					jsp = flow[i].getAttribute("jsp");
					instance = flow[i].getAttribute("id");
					ucapFlowSys.selectDialogParam.values += ucapFlowSys.split_str
							+ jsp + "~@" + instance;
					ucapFlowSys.selectDialogParam.texts += ucapFlowSys.split_str
							+ flow[i].text;
				}
				ucapOpenFlow
						.openCommSelect(ucapFlowSys.selectDialogParam.callBack);
			}
		};
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet + "?" + par,
			params : {
				"ucapid" : ucapFlowSys.actionParams[12]
			},
			callback : function(options, success, response) {
				if (success) {
					openPostFn(response);
				} else {
					Ext.Msg.alert("提示", "获取流程文档时出错！参数为：" + par);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 打开旧文档后，执行的方法
	 */
	_openDocByInstance : function(jsp_instanceid, par) {
		var v = jsp_instanceid.split("~@");
		var jsp = v[0];
		var instance = v[1];

		if (jsp != "") {
			var p = "";
			if (jsp.indexOf("?") > -1) {
				p = "&";
			} else {
				p = "?";
			}
			par = p + "instanceUnid=" + instance + par;
			var sUrl = ucapFlowSys.sUcapSystemPath + jsp + par;
			if (typeof(ucapFlowSys.openFlowDocFun) == "function") {
				if (typeof(ucapFlowSys.openFlowDocFunParams) != "undefined") {
					// sUrl += ucapFlowSys.openFlowDocFunParams;
				}
				ucapFlowSys.openFlowDocFun.call(this, sUrl,
						ucapFlowSys.openFlowDocFunParams);
			} else {
				window.open(sUrl);
			}
		} else
			Ext.Msg.alert("提示信息", '此流程对应的JSP文件未配置,请与管理员联系!');
	},
	/**
	 * 根据待办事宜UNID，打开流程文档
	 * 
	 * @param {string}
	 *            todoUnid
	 * @param {function}
	 *            openCallBack回调函数 默认参数为URL
	 * @param {object}
	 *            openCallBackParam，外面调用时的参数
	 */
	OpenFlowDocByTodoUnid : function(todoUnid, openCallBack, openCallBackParam) {
		if (typeof(todoUnid) == "undefined")
			todoUnid = "";
		if (todoUnid == "") {
			Ext.Msg.alert("提示信息", "待办事宜文档的UNID不能为空!");
			return;
		}
		ucapFlowSys.openFlowDocFun = openCallBack;
		ucapFlowSys.openFlowDocFunParams = openCallBackParam;
		var OpenPostTodoFn = function(response) {
			var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var flow = docs.selectNodes("//instance");
			var node = flow[0];
			var jsp = node.getAttribute("jsp");
			var instance = node.getAttribute("id");
			var docunid = node.getAttribute("docUnid");
			var par = "&unid=" + docunid;
			ucapOpenFlow._openDocByInstance(jsp + "~@" + instance, par);
		}
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[16],
				"todoUnid" : todoUnid
			},
			callback : function(options, success, response) {
				if (success) {
					OpenPostTodoFn(response);
				} else {
					Ext.Msg.alert("提示", "获取流程文档时出错！参数为：" + par);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}

var ucapFlowFun = {
	// 流程对话框相关值
	flowValue : {
		docUnid : "", // 实际文档的UNID
		instanceUnid : "", // 流程实例的UNID
		docTitle : "", // 实际文档的标题
		actFlowUnid : "", // 点击子流程时，实际流程配置ID
		actNodeUnid : "", // 点击子流程时，实际的节点ID
		/**
		 * 1-发送 2 分流发送 3 子流程发送 4更改流程对话框 5 退回 6转办
		 * 
		 * @type String
		 */
		type : "", // 发送类型
		opinionNo : "", // 如果不为空，则意见对话框显示在发送框的下面
		endFlowUnid : "" // 流程结束的节点UNID
	},
	sendFlowDialogConfirmFun : "", // 发送对话框确认后执行的函数
	completeFlowConfirmFun : "", // 办理结束后，执行的函数
	actionName : new Array("办理结束", "收回", "收回", "阅批结束", "结束此流程", "收回子流程",
			"退回上一节点", "", "子流程退回", "收回转办"),

	/**
	 * 初始化相关值
	 */
	_initValue : function() {
		// 流程对话框相关值
		this.flowValue = new Object();
		ucapOpenFlow.isSubFlowDialog = false;
	},
	
	sendFlowOpinion : function( opinionNo) {
		this._initValue();
		if (typeof(opinionNo) == "undefined")
			opinionNo = "";
		this.flowValue.opinionNo = opinionNo;

		// 获取 当前文档的UNID 和流程实例的UNID
		this.flowValue.docUnid = ucapGetUrlParameter("unid");
		if (this.flowValue.docUnid == "") {
			Ext.Msg.alert("提示信息", "当前文档是新文档，请先保存！");
			return;
		}
		this.flowValue.instanceUnid = ucapGetUrlParameter("instanceUnid");
		 
		this.flowValue.type = "1";
		var height = 400; // 高度
		var width = 500; // 宽度
			var para = {
				"ucapid" : ucapFlowSys.actionParams[17],
				docUnid : ucapFlowFun.flowValue.docUnid,
				instanceUnid : ucapFlowFun.flowValue.instanceUnid
			};
			var requestConfig = {
				url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
				params : para,
				callback : function(options, success, response) {
					if (success) {
						if (result.indexOf("false") == -1) {
							var docs = _ucapXmlDom();
							docs.loadXML(result);
							var docRoot = docs.selectSingleNode("//doc");
							var mode = ucapGetAttributeValue(docRoot, "mode");// 0--不弹出对话框,1--弹出对话框不可修改,2--弹出对话框并选择
							if ((typeof(mode) == "undefined" || mode == null
									|| mode == "" || mode == "2")) {
								var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
								if (ucapFlowFun.flowValue.opinionNo != "") {
									height += 80;
								}
								ucapFlowFun.openSendFlowDialog(
										ucapFlowSys.sUcapSystemPath
												+ ucapFlowSys.sendJsp, width,
										height, callBack);
							} else if (mode == "0" || mode == "1") {
								var tmpucapFlowReturn = {
									nextNodeUnid : "", // 下一节点的UNID
									auditType : "", // 审批方式
									nodeTransactors : "", // 节点办理人
									nodeTransactorids : "", // 节点办理人ID
									notNodeTransactors : "", // 非节点办理人
									notNodeTransactorids : "" // 非节点办理人ID
								}
								var _ucapNextFlowUnid = ucapGetAttributeValue(
										docRoot, "flowid");
								tmpucapFlowReturn.auditType = ucapGetAttributeValue(
										docRoot, "auditType");
								tmpucapFlowReturn.nextNodeUnid = ucapGetAttributeValue(
										docRoot, "transition");
								var transactor = docRoot
										.getElementsByTagName("transactor");
								var notTransactor = docRoot
										.getElementsByTagName("notTransactors");
								if (transactor.length > 0) {
									tmpucapFlowReturn.nodeTransactorids = transactor[0]
											.selectSingleNode("value").text;
									tmpucapFlowReturn.nodeTransactors = transactor[0]
											.selectSingleNode("name").text;
								}
								if (notTransactor.length > 0) {

									if (typeof(notTransactor[0]) != "undefined") {
										tmpucapFlowReturn.nodeTransactorids = notTransactor[0]
												.selectSingleNode("value").text;
										tmpucapFlowReturn.nodeTransactors = notTransactor[0]
												.selectSingleNode("name").text;
									}
								}
								var _ucapSendArray = new Array();
								_ucapSendArray[0] = tmpucapFlowReturn;
								if (mode == "0") {
										var sUrl = ucapFlowSys.sUcapSystemPath + ucapFlowSys.opinionJsp;

									ucapOpinion.openDialogDefault(sUrl, height, width, "18",_ucapNextFlowUnid,_ucapSendArray);
									
//									
//									ucapFlowFun.sendFlowConfirm(
//											_ucapNextFlowUnid, _ucapSendArray,
//											"");
								} else if (mode == "1") {
									ucapFlowSys.sendFlowDialogRead.values = tmpucapFlowReturn.nodeTransactors;
									ucapFlowSys.sendFlowDialogRead.nextNode = ucapGetAttributeValue(
											docRoot, "nodeName");
									ucapFlowSys.sendFlowDialogRead.nextApproveType = ucapGetAttributeValue(
											docRoot, "auditName");
									ucapFlowFun
											.openSendFlowDialogReadOnly(
													ucapFlowSys.sUcapSystemPath
															+ ucapFlowSys.sendReadOnlyJsp,
													width, height,
													_ucapNextFlowUnid,
													_ucapSendArray);
								}
							}
						} else {
							var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
							if (ucapFlowFun.flowValue.opinionNo != "") {
								height += 80;
							}
							ucapFlowFun.openSendFlowDialog(
									ucapFlowSys.sUcapSystemPath
											+ ucapFlowSys.sendJsp, width,
									height, callBack);
						}
					} else {
						Ext.Msg
								.alert("提示", "获取默认类型时出错！参数为："
												+ Ext.encode(para));
					}
				}
			}
			Ext.Ajax.request(requestConfig);
			return;
 
	},
	/**
	 * 发送对话框 type =1 发送对话框 ＝2分流发送 3子流程发送框 ＝4更改流程对话框 5退回 6 转办 opinionNo
	 * 有值，说明要同时显示意见对话框
	 * 
	 * @param {}
	 *            type
	 * @param {}
	 *            opinionNo
	 * @param sendFlowDialogConfirmFun
	 */
	sendFlow : function(type, opinionNo, sendFlowDialogConfirmFun) {
		this._initValue();
		if (typeof(opinionNo) == "undefined")
			opinionNo = "";
		this.flowValue.opinionNo = opinionNo;

		// 获取 当前文档的UNID 和流程实例的UNID
		this.flowValue.docUnid = ucapGetUrlParameter("unid");
		if (this.flowValue.docUnid == "") {
			Ext.Msg.alert("提示信息", "当前文档是新文档，请先保存！");
			return;
		}
		this.flowValue.instanceUnid = ucapGetUrlParameter("instanceUnid");
		if (typeof(type) == "string") {
			if (type == "")
				type = "0";
			type = parseInt(type);
		}
		this.flowValue.type = type;
		var height = 400; // 高度
		var width = 500; // 宽度
		if (type == 2) {
			// 说明有分流发送
			height += 60;
		}

		if (type == 3) {
			// 说明是子流程
			var para = {
				"ucapid" : ucapFlowSys.actionParams[6],
				"sendType" : ucapFlowFun.flowValue.type,
				docUnid : ucapFlowFun.flowValue.docUnid,
				instanceUnid : ucapFlowFun.flowValue.instanceUnid
			};
			var requestConfig = {
				url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
				params : para,
				callback : function(options, success, response) {
					if (success) {
						ucapOpenFlow.isSubFlowDialog = true;
						ucapOpenFlow._flowBox(response);
					} else {
						Ext.Msg
								.alert("提示", "获取流程文档时出错！参数为："
												+ Ext.encode(para));
					}
				}
			}
			Ext.Ajax.request(requestConfig);
			return;
		} else if (type == 5) {
			// 说明是退回对话框
			height = 330;
			if (ucapFlowFun.flowValue.opinionNo != "") {
				height += 135;
			}
			var callBack = ucapFlowFun.returnSendOk;
			this.openSendFlowDialog(ucapFlowSys.sUcapSystemPath
							+ ucapFlowSys.returnJsp, width, height, callBack);
		} else if (type == 6) {
			// 说明是转办对话框
			height = 350;
			var callBack = ucapFlowFun.transSendOk;
			this.openSendFlowDialog(ucapFlowSys.sUcapSystemPath
							+ ucapFlowSys.transferJsp, width, height, callBack);
		} else if (type == 1) {
			// 说明是普通发送框
			// modify by csj 2009.5.31
			var para = {
				"ucapid" : ucapFlowSys.actionParams[17],
				docUnid : ucapFlowFun.flowValue.docUnid,
				instanceUnid : ucapFlowFun.flowValue.instanceUnid
			};
			var requestConfig = {
				url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
				params : para,
				callback : function(options, success, response) {
					if (success) {
						var result = response.responseText;
						if (result.indexOf("false") == -1) {
							var docs = _ucapXmlDom();
							docs.loadXML(result);
							var docRoot = docs.selectSingleNode("//doc");
							var mode = ucapGetAttributeValue(docRoot, "mode");// 0--不弹出对话框,1--弹出对话框不可修改,2--弹出对话框并选择
							if ((typeof(mode) == "undefined" || mode == null
									|| mode == "" || mode == "2")) {
								var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
								if (ucapFlowFun.flowValue.opinionNo != "") {
									height += 80;
								}
								ucapFlowFun.openSendFlowDialog(
										ucapFlowSys.sUcapSystemPath
												+ ucapFlowSys.sendJsp, width,
										height, callBack);
							} else if (mode == "0" || mode == "1") {
								var tmpucapFlowReturn = {
									nextNodeUnid : "", // 下一节点的UNID
									auditType : "", // 审批方式
									nodeTransactors : "", // 节点办理人
									nodeTransactorids : "", // 节点办理人ID
									notNodeTransactors : "", // 非节点办理人
									notNodeTransactorids : "" // 非节点办理人ID
								}
								var _ucapNextFlowUnid = ucapGetAttributeValue(
										docRoot, "flowid");
								tmpucapFlowReturn.auditType = ucapGetAttributeValue(
										docRoot, "auditType");
								tmpucapFlowReturn.nextNodeUnid = ucapGetAttributeValue(
										docRoot, "transition");
								var transactor = docRoot
										.getElementsByTagName("transactor");
								var notTransactor = docRoot
										.getElementsByTagName("notTransactors");
								if (transactor.length > 0) {
									tmpucapFlowReturn.nodeTransactorids = transactor[0]
											.selectSingleNode("value").text;
									tmpucapFlowReturn.nodeTransactors = transactor[0]
											.selectSingleNode("name").text;
								}
								if (notTransactor.length > 0) {

									if (typeof(notTransactor[0]) != "undefined") {
										tmpucapFlowReturn.nodeTransactorids = notTransactor[0]
												.selectSingleNode("value").text;
										tmpucapFlowReturn.nodeTransactors = notTransactor[0]
												.selectSingleNode("name").text;
									}
								}
								var _ucapSendArray = new Array();
								_ucapSendArray[0] = tmpucapFlowReturn;
								if (mode == "0") {
									ucapFlowFun.sendFlowConfirm(
											_ucapNextFlowUnid, _ucapSendArray,
											"");
								} else if (mode == "1") {
									ucapFlowSys.sendFlowDialogRead.values = tmpucapFlowReturn.nodeTransactors;
									ucapFlowSys.sendFlowDialogRead.nextNode = ucapGetAttributeValue(
											docRoot, "nodeName");
									ucapFlowSys.sendFlowDialogRead.nextApproveType = ucapGetAttributeValue(
											docRoot, "auditName");
									ucapFlowFun
											.openSendFlowDialogReadOnly(
													ucapFlowSys.sUcapSystemPath
															+ ucapFlowSys.sendReadOnlyJsp,
													width, height,
													_ucapNextFlowUnid,
													_ucapSendArray);
								}
							}
						} else {
							var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
							if (ucapFlowFun.flowValue.opinionNo != "") {
								height += 80;
							}
							ucapFlowFun.openSendFlowDialog(
									ucapFlowSys.sUcapSystemPath
											+ ucapFlowSys.sendJsp, width,
									height, callBack);
						}
					} else {
						Ext.Msg
								.alert("提示", "获取默认类型时出错！参数为："
												+ Ext.encode(para));
					}
				}
			}
			Ext.Ajax.request(requestConfig);
			return;

		} else {
			var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
			if (ucapFlowFun.flowValue.opinionNo != "") {
				height += 80;
			}
			ucapFlowFun.openSendFlowDialog(ucapFlowSys.sUcapSystemPath
							+ ucapFlowSys.sendJsp, width, height, callBack);
		}
	},
	/**
	 * 在子流程的发送中，调用发送给子流程的对话框
	 * 
	 * @param {}
	 *            actFlowId 子流程的流程ID
	 * @param {}
	 *            actNodeId 子流程的节点ID
	 * @param {}
	 *            endFlowUnid 流程结束的ID，可为空，主要是在“发送框中”调用
	 */
	subFlowSendFlow : function(actFlowId, actNodeId, endFlowUnid) {
		ucapFlowFun.flowValue.actFlowUnid = actFlowId; // 点击子流程时，实际流程配置ID
		ucapFlowFun.flowValue.actNodeUnid = actNodeId; // 点击子流程时，实际的节点配置ID

		if (typeof(endFlowUnid) == "undefined")
			endFlowUnid = "";
		ucapFlowFun.flowValue.endFlowUnid = endFlowUnid;
		if (ucapSession.commonWin)
			ucapSession.commonWin.close();
		var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
		ucapFlowFun.openSendFlowDialog(ucapFlowSys.sUcapSystemPath
						+ ucapFlowSys.sendJsp, 500, 400, callBack); // 弹出流程发送对话框
	},
	/**
	 * 发送后的确定
	 * 
	 * @param {}
	 *            nextFlowUnid
	 * @param {}
	 *            sendValueArray
	 * @param {}
	 *            endFlowUnid
	 */
	sendFlowConfirm : function(nextFlowUnid, sendValueArray, endFlowUnid) {
		var flowXmlDoc = __getSendXmlDoc(nextFlowUnid, sendValueArray,
				endFlowUnid);
		Ext.MessageBox.show({
					msg : '正在提交中，请稍等...',
					progressText : '提交...',
					width : 300,
					wait : true,
					waitConfig : {
						interval : 300
					},
					icon : Ext.MessageBox.INFO
				});
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[7],
				"sendType" : this.flowValue.type,
				docUnid : this.flowValue.docUnid,
				instanceUnid : this.flowValue.instanceUnid
			},
			xmlData : flowXmlDoc,
			callback : function(options, success, response) {
				if (success) {
					Ext.MessageBox.hide();
					var fn = ucapFlowFun.sendFlowDialogConfirmFun;
					if (typeof(fn) != "function")
						fn = ucapFlowFun.sendFlowPost;

					fn.call(this, response, ucapFlowFun.flowValue.type);
					// ucapSession.commonWin.close();
				} else {
					Ext.Msg.alert("提示", "发送给后时出错！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	sendFlowPost : function(response, type) {
		alert("提交给下一步骤成功！");
		window.location = window.location;
	},
	openSendFlowDialog : function(url, width, height, callBack) {
		var button = [{
					text : "确定",
					id : "commonConfirm",
					handler : function() {
						if (typeof callBack == "function") {
							callBack.call(this)
						} else {
							Ext.Msg.alert("提示信息", "没有正确设置回调函数：" + callBack);
						}
					}
				}, {
					text : "取消",
					handler : function() {
						ucapFlowSys.sendWin.close()
					}
				}];
		ucapFlowSys.sendWin = new Ext.Window({
					title : ucapSession.win.winImg + "发送对话框",
					width : width,
					closable : true, // 关闭
					modal : true,
					height : height,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : url,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapFlowSys.sendWin.show();
	},
	openSendFlowDialogReadOnly : function(url, width, height,
			_ucapNextFlowUnid, _ucapSendArray) {
		var button = [{
			text : "确定",
			handler : function() {
				ucapFlowFun.sendFlowConfirm(_ucapNextFlowUnid, _ucapSendArray,
						"");
			}
		}, {
			text : "取消",
			handler : function() {
				ucapFlowSys.sendWin.close();
			}
		}];
		ucapFlowSys.sendWin = new Ext.Window({
					title : ucapSession.win.winImg + "发送对话框",
					width : width,
					closable : true, // 关闭
					modal : true,
					height : height,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : url,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapFlowSys.sendWin.show();
	},
	/**
	 * type 0 办理结束(多人并行、多人顺序或分流状态下办理结束) 1 表示上一节点收回 2－表示本节点收回 3－表示阅批结束 4－表示结束流程
	 * 5－表示子流程收回 6－退回上一节点 7 表示是发送中发送到结束节点，8 子流程退回 9－－表示收回转办 opinionNo
	 * 有值，说明要同时显示意见对话框，只在退回时有用到，其他情况，均为空 结束流程有可能的是：主流程中的结束，子流程中的结束，分流状态下的结束流程
	 * subFlowUnid 表示是要收回的子流程的实例UNID
	 */
	completeFlow : function(type, opinionNo, OpinionName, subFlowUnid) {
		this._initValue();
		if (typeof(opinionNo) == "undefined")
			opinionNo = "";
		if (typeof(OpinionName) == "undefined")
			OpinionName = "";
		if (typeof(subFlowUnid) == "undefined")
			subFlowUnid = "";
		this.flowValue.opinionNo = opinionNo;
		// 获取 当前文档的UNID 和流程实例的UNID
		this.flowValue.docUnid = ucapGetUrlParameter("unid");
		if (this.flowValue.docUnid == "") {
			Ext.Msg.alert("提示信息", "当前文档是新文档，请先保存！");
			return;
		}
		var subFlowCallBack = function(response) {
			var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var flow = docs.selectNodes("//subFlow");
			var node = flow[0];
			var name = node.text;
			var subFlowUnid = node.getAttribute("subFlowInstanceId");
			if (flow && flow.length == 1) {
				ucapFlowFun._subFlowCompleteFlow(subFlowUnid);
			} else {

				// 说明有多个子流程实例，要弹出对话框让其选择
				ucapFlowSys.selectDialogParam.values = flow[0]
						.getAttribute("subFlowInstanceId");
				ucapFlowSys.selectDialogParam.texts = flow[0].text;
				ucapFlowSys.selectDialogParam.title = "要收回的子流程选择对话框";
				ucapFlowSys.selectDialogParam.info = "请选择一个你要收回的子流程";
				ucapFlowSys.selectDialogParam.callBack = ucapFlowFun._subFlowCompleteFlow;
				for (var i = 1; i < flow.length; i++) {
					ucapFlowSys.selectDialogParam.values += ucapFlowSys.split_str
							+ flow[i].getAttribute("subFlowInstanceId");;
					ucapFlowSys.selectDialogParam.texts += ucapFlowSys.split_str
							+ flow[i].text;
				}
				ucapOpenFlow
						.openCommSelect(ucapFlowSys.selectDialogParam.callBack);
			}
		}

		this.flowValue.instanceUnid = ucapGetUrlParameter("instanceUnid");
		_ucapOpinionValue.completeType = "";

		var continueFun = function() {

			var sUrl = ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet;
			if (type == "5" && subFlowUnid != "") {
				sUrl += "?subFlowUnid=" + subFlowUnid;
			}
			var requestConfig = {
				url : sUrl,
				params : {
					"ucapid" : ucapFlowSys.actionParams[8],
					"completeType" : type,
					docUnid : ucapFlowFun.flowValue.docUnid,
					instanceUnid : ucapFlowFun.flowValue.instanceUnid
				},
				callback : function(options, success, response) {
					if (success) {
						if (type == "5" && subFlowUnid == "") {
							subFlowCallBack(response);
						} else {
							var fn = ucapFlowFun.completeFlowConfirmFun;
							if (typeof(fn) != "function")
								fn = ucapFlowFun.sendFlowPost;
							fn.call(this, response, type);
						}
					} else {
						Ext.Msg.alert("提示", "发送给后时出错！");
					}
				}
			}
			Ext.Ajax.request(requestConfig);
		}

		if (ucapFlowFun.flowValue.opinionNo != "" && opinionNo != "-99") {
			// 弹出意见对话框 == -99 表示是在意见对话框中调用的
			if (OpinionName == "")
				OpinionName = "退回意见";
			_ucapOpinionValue.name = OpinionName;
			_ucapOpinionValue.completeType = type;
			ucapOpinion.opinionDialog(null, ucapFlowFun.flowValue.opinionNo);
			return;
		} else {
			if (opinionNo != "-99") {
				if (type != "5" || subFlowUnid != "") {
					Ext.MessageBox.confirm("提示信息", "你是否确定要执行"
									+ this.actionName[type] + "操作?", function(
									id) {
								if (id == "yes") {
									continueFun();
								} else {
									return;
								}
							});
				} else {
					continueFun();
				}
			} else {
				continueFun();
			}
		}
	},
	/**
	 * 发送的确定
	 */
	ucapFlowSendOk : function() {
		ucapFlowSendOk();// 在ucapSendFlow.js中，必须要动态加载成功后才能执行
	},
	/**
	 * 退回的确定
	 */
	returnSendOk : function() {
		returnSendOk();// 在ucapReturn.js中，必须要动态加载成功后才能执行
	},
	/**
	 * 转办的确定
	 */
	transSendOk : function() {
		transSendOk(); // 在ucapTrans.js中，必须要动态加载成功后才能执行
	},
	_subFlowCompleteFlow : function(subFlowUnid) {
		ucapFlowFun.completeFlow("5", "", "", subFlowUnid);
	}
}

// 意见对话框的相关参数
var _ucapOpinionValue = {
	name : "", // 意见名称
	type : "", // 意见类型，用数字进行定义
	sendType : "", // 是否直接发送,为1为直接发送,否则为不直接发送
	completeType : "" // 办理结束时，调用的意见对话框
}
var _ucapOpinionSend = {
	opinionObj : null,
	type : ""
}

/**
 * 意见对话框
 * 
 * @type
 */
var ucapOpinion = {
	/**
	 * 意见弹出窗口脚本 obj当前意见按狃对象，type意见类型，可在配置意见按狃中进行配置 sendType = 1
	 * 表示，点击意见后，再弹出发送对话框 sendType = 2 表示，意见和发送对话框合并在一起显示 ，但是通过意见按钮进行调用 sendType =
	 * 6 表示，退回上一节点 sendType=3 意见与默认类型集成
	 * 
	 * @param {}
	 *            obj
	 * @param {}
	 *            type
	 * @param {}
	 *            sendType
	 */
	win : null,
	/**
	 * 外部调用的方法
	 * 
	 * @param {}
	 *            obj 按钮对象 用 this 参数
	 * @param {}
	 *            type 意见类型 区别各个不同的意见 可用 1 2 3 等
	 * @param {}
	 *            sendType 意见中集成发送操作
	 * @param {}
	 *            height 意见对话框高度
	 * @param {}
	 *            width 意见对话框宽度
	 * @param {}
	 *            size 意见输入框的高度 默认为18
	 */
	opinionDialog : function(obj, type, sendType, height, width, size) {
		if (ucapFlowFun.flowValue.docUnid == "") {
			ucapFlowFun.flowValue.docUnid = ucapGetUrlParameter("unid");
			ucapFlowFun.flowValue.instanceUnid = ucapGetUrlParameter("instanceUnid");
		}
		if (ucapFlowFun.flowValue.docUnid == "") {
			alert("当前是新文档，请先保存！");
			return;
		}
		if (typeof size == "undefined")
			size = "18";
		// 设置url
		var sUrl = ucapFlowSys.sUcapSystemPath + ucapFlowSys.opinionJsp;

		if (typeof(type) == "undefined")
			type = "99";
		if (obj)
			_ucapOpinionValue.name = obj.innerText;
		_ucapOpinionValue.type = type;

		if (typeof(sendType) == "undefined")
			sendType = "";
		_ucapOpinionValue.sendType = sendType;
		_ucapOpinionSend.type = "";
		if (sendType == "2" || sendType == "3") {
			// 要判断当前用户是否有发送权限，如果有，则弹出发送对话框，否则不变
			_ucapOpinionSend.opinionObj = obj;
			_ucapOpinionSend.type = type;
			var requestConfig = {
				url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
				params : {
					"ucapid" : "opinionInfo",
					docUnid : ucapFlowFun.flowValue.docUnid,
					instanceUnid : ucapFlowFun.flowValue.instanceUnid
				},
				callback : function(options, success, response) {
					if (success) {
						ucapOpinion.getSend(response, sendType);
					} else {
						Ext.Msg.alert("提示", "判断当前用户是否有发送权限时出错！");
					}
				}
			}
			Ext.Ajax.request(requestConfig);
		} else {
			// 调用方法进行弹出新窗口
			this.openDialog(sUrl, height, width, size);
		}
	},
	getSend : function(response, opinionSendType) {
		var result = response.responseText;
		var docs = _ucapXmlDom();
		docs.loadXML(result);
		var docRoot = docs.selectSingleNode("//doc");
		var sendType = ucapGetAttributeValue(docRoot, "sendType");
		if (sendType != "") {
			// 说明有发送权限，要弹出带意见的发送框
			if (opinionSendType == "2") {
				ucapFlowFun.sendFlow(sendType, "1");
			} else if (opinionSendType == "3") {
				ucapFlowFun.sendFlowOpinion("1");
			}
		} else {
			// 重新调用意见对话框，但把sendType从2变成1
			ucapOpinion.opinionDialog(_ucapOpinionSend.opinionObj,
					_ucapOpinionSend.type, "1");
		}
	},
	openDialog : function(url, height, width, size) {
		if (typeof size == "undefined")
			size = "";
		url = url + "?size=" + size;
		if (typeof height == "undefined" || height == "") {
			height = document.body.clientHeight - 50;
		}
		if (typeof width == "undefined" || width == "") {
			width = document.body.clientWidth - 100;
		}
		var button = [{
					text : "确定",
					id : "commonConfirm",
					handler : function() {
						doOpinionOk();
						ucapOpinion.win.close();
					}
				}, {
					text : "取消",
					handler : function() {
						ucapOpinion.win.close()
					}
				}];
		ucapOpinion.win = new Ext.Window({
					title : ucapSession.win.winImg + "意见填写框",
					width : width,
					closable : true, // 关闭
					modal : true,
					height : height,
					maximizable : true,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : url,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapOpinion.win.show();
	},
	openDialogDefault: function(url, height, width, size,_ucapNextFlowUnid,_ucapSendArray) {
		if (typeof size == "undefined")
			size = "";
		url = url + "?size=" + size;
		if (typeof height == "undefined" || height == "") {
			height = document.body.clientHeight - 50;
		}
		if (typeof width == "undefined" || width == "") {
			width = document.body.clientWidth - 100;
		}
		var button = [{
					text : "确定",
					id : "commonConfirm",
					handler : function() {
						doOpinionOk(_ucapNextFlowUnid,_ucapSendArray);
						ucapOpinion.win.close();
					}
				}, {
					text : "取消",
					handler : function() {
						ucapOpinion.win.close()
					}
				}];
		ucapOpinion.win = new Ext.Window({
					title : ucapSession.win.winImg + "意见填写框",
					width : width,
					closable : true, // 关闭
					modal : true,
					height : height,
					maximizable : true,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : url,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapOpinion.win.show();
	}
	
}

function __createXmlDoc() {
	var flowXmlDoc = _ucapXmlDom();
	var head = flowXmlDoc.createProcessingInstruction("xml",
			"version='1.0' encoding='GBK'");
	flowXmlDoc.appendChild(head);
	var root = flowXmlDoc.createElement("doc");
	flowXmlDoc.appendChild(root);
	var flow = flowXmlDoc.createElement("ucapFlow");
	root.appendChild(flow);
	return flowXmlDoc;
}
function __getSendXmlDoc(nextFlowUnid, sendValueArray, endFlowUnid) {
	// 生成一个xml post 到后台
	var flowXmlDoc = __createXmlDoc();
	var flow = flowXmlDoc.selectSingleNode("//ucapFlow");
	addAttrib(flow, "nextFlowUnid", nextFlowUnid);
	addAttrib(flow, "nextFlowType", ucapFlowFun.flowValue.type);
	if (sendValueArray[0].auditType == "") {
		addAttrib(flow, "endFlowNodeUnid", sendValueArray[0].nextNodeUnid);
		return flowXmlDoc;
	} else {
		if (typeof(endFlowUnid) != "undefined" && endFlowUnid != "") {
			addAttrib(flow, "endFlowNodeUnid", endFlowUnid);
		} else {
			addAttrib(flow, "endFlowNodeUnid", "");
		}
	}
	if (sendValueArray[0].auditType == "8888") {
		// 表示是否在分流状态下发送给聚合节点，但由于是多路聚合，只能当结束分流处理
		addAttrib(flow, "isSendConvergeNodeId", "1");
		return flowXmlDoc;
	}
	addAttrib(flow, "isSendConvergeNodeId", "");

	for (var i = 0; i < sendValueArray.length; i++) {
		var sendValue = flowXmlDoc.createElement("sendValue");
		flow.appendChild(sendValue);
		var node = flowXmlDoc.createElement("nextNodeUnid");
		node.text = sendValueArray[i].nextNodeUnid;
		sendValue.appendChild(node);
		var node = flowXmlDoc.createElement("auditType");
		node.text = sendValueArray[i].auditType;
		sendValue.appendChild(node);
		var node = flowXmlDoc.createElement("nodeTransactorids");
		node.text = sendValueArray[i].nodeTransactorids;
		sendValue.appendChild(node);
		var node = flowXmlDoc.createElement("notNodeTransactorids");
		node.text = sendValueArray[i].notNodeTransactorids;
		sendValue.appendChild(node);
	}
	return flowXmlDoc;
}
// 获取url参数如index.htm?id=1 用ucapGetUrlParameter('id') 返回1
function ucapGetUrlParameter(name) {
	var params = location.search.slice(1).split('&');
	for (var i = 0; i < params.length; i++) {
		var temp = params[i].split("=");
		if (temp[0] == name) {
			return temp[1];
		}
	}
	return "";
}
function _ucapXmlDom() {
	// 通过对象/属性检测法，判断是IE来是Mozilla
	if (window.ActiveXObject) {
		var arrSignatures = ["MSXML2.DOMDocument.5.0",
				"MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0",
				"MSXML2.DOMDocument", "Microsoft.XmlDom"];

		for (var i = 0; i < arrSignatures.length; i++) {
			try {

				var oXmlDom = new ActiveXObject(arrSignatures[i]);

				return oXmlDom;

			} catch (oError) {
				// ignore
			}
		}

		throw new Error("MSXML is not installed on your system.");

		// 同上
	} else if (document.implementation
			&& document.implementation.createDocument) {

		var oXmlDom = document.implementation.createDocument("", "", null);

		// 创建Mozilla版本的parseError对象
		oXmlDom.parseError = {
			valueOf : function() {
				return this.errorCode;
			},
			toString : function() {
				return this.errorCode.toString()
			}
		};

		// 初始化parseError对象
		oXmlDom.__initError__();

		oXmlDom.addEventListener("load", function() {
					this.__checkForErrors__();
					this.__changeReadyState__(4);
				}, false);

		return oXmlDom;

	} else {
		throw new Error("Your browser doesn't support an XML DOM object.");
	}
}
// 以下为创建通用的XML DOM 方法

var _sUserAgent = navigator.userAgent;
var _isOpera = _sUserAgent.indexOf("Opera") > -1;
var _isIE = _sUserAgent.indexOf("compatible") > -1
		&& _sUserAgent.indexOf("MSIE") > -1 && !_isOpera;
var _isKHTML = _sUserAgent.indexOf("KHTML") > -1
		|| _sUserAgent.indexOf("Konqueror") > -1
		|| _sUserAgent.indexOf("AppleWebKit") > -1;

var _isMoz = _sUserAgent.indexOf("Gecko") > -1 && !_isKHTML;
// 如果是Mozilla
if (_isMoz) {
	Document.prototype.readyState = 0;
	Document.prototype.onreadystatechange = null;

	Document.prototype.__changeReadyState__ = function(iReadyState) {
		this.readyState = iReadyState;

		if (typeof this.onreadystatechange == "function") {
			this.onreadystatechange();
		}
	};
	// 初始化parseError对象
	Document.prototype.__initError__ = function() {
		this.parseError.errorCode = 0;
		this.parseError.filepos = -1;
		this.parseError.line = -1;
		this.parseError.linepos = -1;
		this.parseError.reason = null;
		this.parseError.srcText = null;
		this.parseError.url = null;
	};

	Document.prototype.__checkForErrors__ = function() {

		if (this.documentElement.tagName == "parsererror") {

			var reError = />([\s\S]*?)Location:([\s\S]*?)Line Number (\d+), Column (\d+):<sourcetext>([\s\S]*?)(?:\-*\^)/;

			reError.test(this.xml);

			this.parseError.errorCode = -999999;
			this.parseError.reason = RegExp.$1;
			this.parseError.url = RegExp.$2;
			this.parseError.line = parseInt(RegExp.$3);
			this.parseError.linepos = parseInt(RegExp.$4);
			this.parseError.srcText = RegExp.$5;
		}
	};

	// 定义Mozilla的loadXML方法
	Document.prototype.loadXML = function(sXml) {

		this.__initError__();

		this.__changeReadyState__(1);

		var oParser = new DOMParser();
		var oXmlDom = oParser.parseFromString(sXml, "text/xml");

		while (this.firstChild) {
			this.removeChild(this.firstChild);
		}

		for (var i = 0; i < oXmlDom.childNodes.length; i++) {
			var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
			this.appendChild(oNewNode);
		}

		// 载入后检查错误
		this.__checkForErrors__();

		// 没有问题，设置readyState属性为4
		this.__changeReadyState__(4);

	};

	Document.prototype.__load__ = Document.prototype.load;

	Document.prototype.load = function(sURL) {
		this.__initError__();
		this.__changeReadyState__(1);
		this.__load__(sURL);
	};

	Node.prototype.__defineGetter__("xml", function() {
				var oSerializer = new XMLSerializer();
				return oSerializer.serializeToString(this, "text/xml");
			});
}
// 为节点node增加 一属性值
function addAttrib(node, attribName, value) {
	var attrib = node.ownerDocument.createAttribute(attribName);
	attrib.value = value;
	node.setAttributeNode(attrib);
}
function ucapGetAttributeValue(node, str) { /* 取出属性值 */
	var sTr = node.getAttribute(str);
	if (sTr == null) {
		return "";
	} else {
		return sTr.trim();
	}
}
// 去掉字符串首尾空格
String.prototype.trim = function() {
	var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	return (m == null) ? "" : m[1];
}
// 打开可视化设计器
function _ucapVisualFlow() {
	window.open(sUcapSystemPath + "jsp/common/visualflow.jsp");
}
