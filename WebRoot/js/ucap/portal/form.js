/**
 * 三级界面表单相关代码
 * JC_SeekArt
 */
var pfx_ucap = "ucap_";
var _UcapForm = {
	mainDiv:'_ucap_main_div',
	
	/**
	 * 流程监控图的刷新
	 */
	refreshFlowMonitorImg:function(){
		var ucapImgDom = Ext.getDom("ucap_img");
		var imgSrc = ucapImgDom.src;
		ucapImgDom.src = imgSrc+"&rand=1";
	},
	//配置信息
	cfg : {
		belongAppUnid:"",//yjy 2010-7-27 表单所属的应用系统UNID
		otherAction:"",//其它获取表单json的action
		otherSaveAction:"",//其它保存表单的acton
		defaultPath:appPath+'html/'+(ucapCommonFun.getUrlParameter("belongToAppId")||ucapSession.appUnid||"")+"/",
		systemPath:'system',//修改为系统存放文件夹 mdf by jc 20110310
		docTitle : {},
		mainUnid:null,//组合表单中配置的主表单标识(表单UNID或显示表单UNID)
		mainFormType:null,//组合表单中配置的主表单类型
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
		isDocSave:"",//用于保存时判断是否需要改变附件的状态(新文档为0旧文档为1,为1时要更新相关附件信息的字段值)
		formHtmlUrl:"",
		attrPath:"",
		attrConfigPath:"",
		/**
		 * 只读标志 -1不能查看 0 只读 1 编辑
		 * @type 
		 */
		isRead:null,
		//附件权限
		attrPopedom:{
			upload:-1,//附件上传
			down:1,//附件查看、下载 所有文档默认为允许查看和下载mdf by jc 20100708
			del:-1,//附件删除
			uploadStraightMatter:-1,//正文
			uploadTransaction:-1,//办理单
			cfg:-1//模板配置
		},
		/**
		 * 父文档可编辑的标志，默认为1表示可编辑 0表示只读
		 * @type String
		 */
		fatherIsRead:1,//默认值为1
		//是否为主表单   by@cgc && jc  2011-7-4
		isMainForm:function(curFormId){
			if(_UcapForm.ucapForm.getMainUnid()==curFormId){
				return true;
			}
			return false;
		},
		formType:null,
		jspTmpStr:{
			formJson:{"id":"showBoxNoTab","class":"showContent"},
			form:'<div id="{id}" class="{class}"></div>',
			composeFormJson:{"id":"showTabBody","class":"showContent"},
			composeForm:'<div id="showBox">\
									<div id="showMenu" style="overflow-x:hidden;white-space:nowrap;">\
								    	<ul id="showMenuUL" style="white-space:nowrap;">\
								        </ul>\
								    </div>\
									<div id="{id}" class="{class}">\
								    </div>\
								</div>'
		},
		htmlTmpStr:{
			form:'<div main=## id="'+pfx_ucap+'{unid}" class="" htmlUrl="{htmlUrl}"></div>',
			input_html:'<input type="{type}" id="{name}" name="{name}" value="{value}" class="{class}" {readOnly}/>{text}&#160;',
			select_html:'<select name="{name}" id="{name}" value="{value}"></select>',
			option_html:'<OPTION name="{name}_{i}" id="{name}_{i}" value="{value}">{text}</OPTION>',
			btn_cn_html:'<input id="{id}_Cn_" type="text" class="{class}" style="height:21px" readOnly/>&#160;<input id="btn_{id}" class="btnOnlyChannel" value="{text1}" type="button"/>',
			areabtn_html:'<textarea id="{id}_Cn_" class="{class}" readOnly row="2" style="height:40px"></textarea>&#160;<input id="btn_{id}" class="btnOnlyChannel" value="{text1}" type="button"/>',
			ucap_img:'<span onclick="_UcapForm.refreshFlowMonitorImg();" style="cursor:hand;position:absolute;top:0;left:0;right:0;height:24px;width:100%;">【<font color="red">刷新</font>】</span><img src="{src}" id="{id}" onclick="{onclick}"></img>',
			btn_html:'<input id="btn_{id}" class="btnOnlyChannel" value="{text1}" type="button"/>',
			file_html:'<form name="form_{id}" action="" enctype="multipart/form-data" method="post" target="iframe{id}">' +
					'<input id="{id}" type="text" class="{class}" style="display:{obj_display}" readOnly/>{br}<div id="div_{id}" style="display:{display}">请选择要上传的文件：<input name="file" id="file_{id}" type="file" style1="width:0px;" value="" style="display:none1;"/></div>' +
					'{downFile}' +
					'</form><iframe name="iframe{id}" src="#" style="width:0px;height:0px;"></iframe>',
			downhtml:'{downFile}'
		},
		tabTmp : '<li id="{unid}" types="{types}" contents="{contents}" onclick="{tabclick}" style="cursor:pointer;"><span qtip="{name}" style="width:70px;overflow:hidden; word-break:keep-all; white-space:nowrap; text-overflow:ellipsis;">{name}</span></li>',
		tabBodyTmp : '<div main=# id="'+pfx_ucap+'{unid}" style="display:none;" types="{types}" contents="{contents}"></div>',
		tabContentsTmp:'<div main=## id="'+pfx_ucap+'{unid}" style="display:none1;" types="{types}"></div>',
		toolBarBtnTmp:{
			defaultStr : '<a href="javascript:void(0);"><img src="'+ucapHeader.sUserStylePath+'ucapimages/{picture}" title="{tip}" onclick="{code}"/>{name1}</a>',
			btn:'<button title="{tip}" style="{width}" onclick="{code}" class=btnn1 onmouseover="this.className=\'btnn3\'" onmouseout="this.className=\'btnn1\'">\
					<div class="btnn5"><IMG src="'+ucapHeader.sUserStylePath+'ucapimages/default_btn.gif" align=absMiddle>&nbsp;{name}</div></button>',
			btnImg:'<button title="{tip}" onclick="{code}" class=btnn1 onmouseover="this.className=\'btnn3\'" onmouseout="this.className=\'btnn1\'">' +
					'<div class="btnn5"><IMG src="'+ucapHeader.sUserStylePath+'ucapimages/{picture}" align=absMiddle>&nbsp;{name}</div></button>'
		}
	}
};
/**
 * 
 * @type 
 */
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
	 * 三级界面配置在页签里面所有打开的视图unid集合
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
	},
	/**
	 * 视图表单列表集合。
	 * JSON格式：{视图UNID:[表单JSON1,表单JSON2]}
	 * @type 
	 */
	allViewFormList:{},
	/**
	 * 获取视图UNID对应的表单列表的数组
	 * @param {} sUnid
	 * @return []数组
	 */
	getViewFormList:function(sUnid){
		return this.allViewFormList[sUnid];
	},
	/**
	 * 增加一个视图表单列表集合
	 * @param {} sUnid 视图UNID
	 * @param {} oViewFormList 是一个视图表单集合数组
	 */
	addViewFormList:function(sUnid,oViewFormList){
		this.allViewFormList[sUnid] = oViewFormList;
	},
	/**
	 * 删除指定的视图表单列表集合
	 * @param {} sUnid
	 */
	removeViewFormList:function(sUnid){
		delete this.allViewFormList[sUnid];
	},
	/**
	 * 返回指定的一个视图表单列表中的表单
	 * @param {} sUnid
	 * @param {} index
	 * @return {}
	 */
	getViewForm:function(sUnid,index){
		try{
			if(this.allViewFormList[sUnid])
				return this.allViewFormList[sUnid][index];
		}catch(e){
			return null;
		}
		return null;
	},
	/**
	 * 增加一个视图表单
	 * @param {} sUnid 视图UNID
	 * @param {} oViewForm 一个视图表单
	 * @param {} index 要覆盖的索引号,如果没有则追加在数组的最后一个
	 */
	addViewForm:function(sUnid,oViewForm,index){
		if(!this.allViewFormList[sUnid]){
			this.allViewFormList[sUnid] = [];
		}
		if(typeof(index)=="undefined" || null==index){
			index = this.allViewFormList[sUnid].length;
		}
		try{
			var i = index;
			this.allViewFormList[sUnid][i] = oViewForm;
		}catch(e){
		}
	},
	/**
	 * 删除指定视图表单
	 * @param {} sUnid 视图UNID
	 * @param {} index 第几条记录的索引
	 */
	removeViewForm:function(sUnid,index){
		try{
			if(this.allViewFormList[sUnid])
				delete this.allViewFormList[sUnid][index];
		}catch(e){
			alert("目前不支持此方法!");
		}
	}
};
//常用工具
_UcapForm.tool = {
	cfg:_UcapForm.cfg,
	/**
	 * 界面升级待完善 add by jc
	 */
	doTopMenu:function(){
		if($("ucap_topMenu")){
			var sHtml = '<div id="ucap_topMenuLeft"></div>\
								<div id="ucap_topMenuBox">\
								  <table border="0" cellpadding="0" cellspacing="0">\
							        <tr>';
			var viewMId = ucapCommonFun.getUrlParameter("viewMId");
			if(viewMId && viewMId!="undefined"){
				sHtml += '<td width="54" height="24" align="center"><a href="javascript:_UcapDocPaper.getFirst();" class="topMenuText">首篇</a></td>\
					          <td width="54" height="24" align="center"><a href="javascript:_UcapDocPaper.getPrev();" class="topMenuText">上一篇</a></td>\
					          <td width="54" height="24" align="center"><a href="javascript:_UcapDocPaper.getNext();" class="topMenuText">下一篇</a></td>\
					          <td width="54" height="24" align="center"><a href="javascript:_UcapDocPaper.getLast();" class="topMenuText">末篇</a></td>';
			}
	         sHtml +='<td style="display:none;" width="54" height="24" align="center"><a href="javascript:void(0);" class="topMenuText">历史</a></td>\
					          <td style="display:none;" width="54" height="24" align="center"><a href="javascript:_UcapForm.tool.showRightContent();" class="topMenuText">右侧栏</a></td>\
					        </tr>\
					      </table>\
						</div>\
						<div id="ucap_topMenuSearch" style="display:none;">\
							<input name="textfield" type="text" value="键入查询的内容" size="23" />\
						</div>';
			$("ucap_topMenu").innerHTML = sHtml;
			if(viewMId && viewMId!="undefined" && (_ucapDistb==0||_ucapDistb=="null")){
			    $("ucap_topMenu").style.display="";
			}
		}
	},
	/**
	 * 界面升级待完善 add by jc
	 */
	doRightContent:function(){
		var sHtml = '<div id="rightMenuTitle">\
	  <img src="../../uistyle/style_1/ucapimages/ico_r1.gif" width="15" height="16" align="absmiddle" />\
	  &nbsp;<strong>任务</strong>\
	  <span class="rightMenuClose"><a href="javascript:void(0);"><img src="'+ucapHeader.sUserStylePath+'/ucapimages/icon_down.gif" align="absmiddle" /></a>\
	  &nbsp;&nbsp;<a href="javascript:_UcapForm.tool.showRightContent();"><img src="'+ucapHeader.sUserStylePath+'/ucapimages/icon_close.gif" align="absmiddle" /></a></span>\
	  </div>\
	  <div id="rightMenuChannel">\
	  	<table width="100%" border="0" cellpadding="0" cellspacing="0">\
	        <tr>\
	          <td height="23" colspan="2" background="'+ucapHeader.sUserStylePath+'/ucapimages/right_submenu.gif">&nbsp;&nbsp;最近打开的项目</td>\
	        </tr>\
			<tr>\
	          <td width="30" height="5"></td>\
	          <td></td>\
	        </tr>\
			<tr>\
	          <td width="30" height="20">&nbsp;</td>\
	          <td>&nbsp;&nbsp;<a href="#">测试文档001</a></td>\
	        </tr>\
	        <tr>\
	          <td width="30" height="20">&nbsp;</td>\
	          <td>&nbsp;&nbsp;<a href="#">测试文档001</a></td>\
	        </tr>\
	    </table>\
	  </div>';
	  $("rightMenu").innerHTML = sHtml;
	},
	showTopMenu:function(){
		$("ucap_topMenu").style.display="";
	},
	showRightContent:function(){
		if(!$("rightMenu").innerText || $("rightMenu").style.display=="none"){
			$(_UcapForm.mainDiv).style.width="75%";
			$("rightMenu").style.display="";
			if(!$("rightMenu").innerText)_UcapForm.tool.doRightContent();
		}else{
			$(_UcapForm.mainDiv).style.width="100%";
			$("rightMenu").style.display="none";
		}
	},
	hideTopMenu:function(){
		$("ucap_topMenu").style.display="none";
	},
	hideRightContent:function(){
		$(_UcapForm.mainDiv).style.width="100%";
		$("rightMenu").style.display="none";
	},
	/**
	 * 加载进度条
	 * @param {} title
	 * @param {} msg
	 * @param {} width
	 * @param {} progress
	 * @param {} closable
	 * @return {}
	 */
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
	/**
	 * 隐藏进度条
	 */
	hideLodingMsg:function(){
		if(this.cfg.showLodingId)this.cfg.showLodingId.hide();
	},
	/**
	 * 取JSON对象中，字段的值
	 * @param {} itemName 字段的英文名称
	 * @return {}
	 */
	getFormValue:function(itemName,isV){
		var result = ""
		itemName = itemName.toLowerCase();
		var all = _UcapForm.handler.all;
		for(var formUnid in all){
			var itemList = all[formUnid].uiItemList;
			var tvalue,ttext;
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
					}
					return result;
				}
			}
		}
		return result;
	},
	/**
	 * 用于$V方法，取视图表单列表中的值
	 * @param {} itemName
	 * @param {} index
	 * @param {} isV
	 * @return {}
	 */
	getViewFormValue:function(itemName,index,isV){
		var result = ""
		itemName = itemName.toLowerCase();
		var all = _UcapForm.handler.allViewFormList;
		for(var viewId in all){
			var viewForm = _UcapForm.handler.getViewForm(viewId,index);
			if(viewForm){
				var itemList = viewForm.uiItemList;
				var tvalue,ttext;
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
						}
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
					if(response.responseText)window.open(ucapSession.appPath+'sys/cfgJsp/downLoad/downLoad.jsp?url='+response.responseText);
					else{
						Ext.Msg.alert("系统提示","当前附件不存在!");
					}
				}
			}
		};
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 附件重新上传验证
	 */
	valFile:function(nameEn){
		$("div_"+nameEn).style.display="";
		if($(nameEn).value !=""){
			Ext.Msg.alert("系统提示","请删除原有文档后上传!");
		}
	}
	
	,
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
	/**
	 * 设置表单配置信息及表单编辑权限
	 * @param {} json 表单JOSN
	 * @param {} rowNum 视图列表第几条数据
	 */
	setCfgJson:function(json,rowNum){
		var unid = ucapCommonFun.getUrlParameter("unid");
		this.cfg.form = json["form"];
		this.cfg.formShow = json["formShow"];
		this.cfg.composeForm = json["composeForm"];
		this.cfg.subButtonList = json["subButtonList"];
		this.cfg.uiItemList = json["uiItemList"];
		this.cfg.isRead = json["isRead"];
		_UcapForm.tool.setAttrPopedom(json["attrPopedom"]);
		//根据主表单设置，父文档的是否为只读  by@cgc 2011-7-4
		if(this.cfg.isMainForm(this.cfg.form.unid)){
			_UcapForm.cfg.fatherIsRead=this.cfg.isRead;
		}
		//根据父文档进行重新的设置
		if (this.cfg.isRead>_UcapForm.cfg.fatherIsRead){
			this.cfg.isRead = 0;
		}
		if (this.cfg.isRead==1){
			//yjy 增加 对表单JS的判断 只有是编辑状态才能进行判断
			if (typeof this.cfg.form.editJs!="undefined" && this.cfg.form.editJs!=""){
				if(typeof(rowNum)!="undefined" && rowNum!=null){
					if(this.cfg.form.editJs){
						this.cfg.form.editJs = this.cfg.form.editJs.replace(/(\$index)/,(rowNum-1));
					}
				}
				var editForm = ucapCommonFun.evalJavaScript(this.cfg.form.editJs);
				if (!editForm){
					this.cfg.isRead = 0;
				}
			}
			//进行URL的isRead属性进行文档只读判断 add by jc 20110519
			if(this.cfg.isRead==1){
				var isRead = ucapCommonFun.getUrlParameter("isRead");
				//只有为0时才是只读，其他按照默认状态
				if(isRead=="0"){
					this.cfg.isRead = 0;
				}
			}
		}
		this.cfg.isTabNew = (!unid || (json["isNew"]!="" && json["isNew"]==1))?1:0;
	},
	setCfgStr:function(unid,type,id){this.cfg.unid = unid;this.cfg.curFormType = type;this.cfg.curFormId = id;},
	setDocumentTitle:function(fj){
		//设置按钮区的文档标题add by jc 20100511
		if($("_ucapFormDocTitle") && $("_ucapFormDocTitle").innerHTML==""){
			$("_ucapFormDocTitle").innerHTML = this.cfg.formDocTitle||"";
		}
		var titleObj = Ext.getDom("ucap_document_title");
		var sTitle = "";
		if(titleObj){
			titleObj.innerHTML = fj["titleStyle"]||fj["nameCn"];
			sTitle = titleObj.innerHTML;
		}
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
		if (window.parent){
			var newdocType = window.parent.ucapHeader.newdocType;
			var opendocType = window.parent.ucapHeader.opendocType;
			var wpdoc = window.parent.ucapSession.docWin;
			var unid = ucapCommonFun.getUrlParameter("unid");
			var curNewDocType=null,curOpenDocType=null;
			//页签式中无法在文档打开方式为当前方式时无法取到对应的视图打开方式,而系统默认的与实际打开的又有偏差
			//从top的缓存中获取视图全局缓存信息add by jc 20100622
			var viewId = ucapCommonFun.getUrlParameter("viewMId");
			if(viewId){
				//setViewCache在视图是view.init事件中设置
				curNewDocType = window.top.ucapSession.getViewCache(viewId,"newdocType");
				curOpenDocType = window.top.ucapSession.getViewCache(viewId,"opendocType");
			}
			//this.cfg.docTitle[this.cfg.curFormId] = sTitle;
			//增加判断，只将主表单的标题设置为页签的标题  by@cgc 2011-7-8
			if(_UcapForm.ucapForm.getMainUnid()==_UcapForm.cfg.curFormId || null !=_UcapForm.cfg.formShow){
				if (!unid){
					if(""!=curNewDocType && curNewDocType!="99"){
						newdocType = curNewDocType;
					}
					if(newdocType=="02"){//DIV弹出
						if(wpdoc)
							wpdoc.setTitle(ucapSession.win.winImg+sTitle);
					}else if(newdocType=="01"){//页签式				
						this.cfg.docTitle[this.cfg.curFormId] = sTitle;
						var tabs = window.top.viewTabs.tabs;
						if(tabs && tabs.getActiveTab()){
							sTitle ="<div qtip='"+sTitle+"'>"+ucapCommonFun.limitL(sTitle,6)+"</div>";
							tabs.getActiveTab().setTitle(sTitle||"文档编辑");
						}
					}else{
						this.cfg.docTitle[this.cfg.curFormId] = sTitle;
						var tabs = window.top.viewTabs.tabs;
						if(tabs && tabs.getActiveTab()){
							sTitle ="<div qtip='"+sTitle+"'>"+ucapCommonFun.limitL(sTitle,6)+"</div>";
							tabs.getActiveTab().setTitle(sTitle||"文档编辑");
						}else{
							Ext.getDoc().dom.title = sTitle;
						}
					}
				} else{
					if(""!=curOpenDocType && curOpenDocType!="99"){
						opendocType = curOpenDocType;
					}
					if(opendocType=="01") {//页签式
						var tabs = window.top.viewTabs.tabs;
						if(tabs && tabs.getActiveTab()){
							sTitle ="<div qtip='"+sTitle+"'>"+ucapCommonFun.limitL(sTitle,6)+"</div>";
							tabs.getActiveTab().setTitle(sTitle||"文档编辑");
						}
					}else if(opendocType=="02"){//DIV弹出
						if(wpdoc)
							wpdoc.setTitle(ucapSession.win.winImg+sTitle);
					}else{
						Ext.getDoc().dom.title = sTitle;
					}
				}
			}
		}
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
				//result = eval(value);
				result=ucapCommonFun.evalJavaScript(value);//modify by fsm 2010.7.23 防止事件js出错，导致表单开不了
			}else if(type=="02" && excType==sType){
				//扩展功能
				//result = eval("_UcapForm.tool.executeInteraction('"+value+"');");
				result=ucapCommonFun.evalJavaScript("_UcapForm.tool.executeInteraction('"+value+"');");//modify by fsm 2010.7.23 防止事件js出错，导致表单开不了
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
	/**
	 * 渲染按钮
	 * @param {} sbl 按钮JSON
	 * @param {} tb 渲染的DIV的ID
	 */
	setButton:function(sbl,tb){   
		//if (_ucapDistb==1) return;
		//考虑按钮显示条件、按钮类型
		//只有图片，只有文字，图文类型按钮
		var btn = sbl||this.cfg.subButtonList||[];
		//alert(Ext.encode(btn));
		var altKey = new Ext.KeyMap(document.body);
		var toolbtn = tb||(typeof(_ucapButtonDivName)=='undefined'?"_ucapButtonDivName":_ucapButtonDivName);
		//加载按钮时先清空之前的按钮 add by jc 20100810
		if($(toolbtn))$(toolbtn).innerHTML = "";
		var btnstr = "";
		/**
		 * 返回字符串的像素长度
		 */
		var strlen = function(str) {
			return str.replace(/[^\x00-\xff]/g,"xx").length;
		}
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
					if(bn.name){
						//设置按钮宽度 add by jc 20100907
						bn.width = "width:"+((strlen(bn.name)+4)*7)+"px;"
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
			//$("showMenuLine").style.display="none";
		}else{
			//解决页签太多时折行的问题,当鼠标在页签左边向左移动，在页签右半边向右移动。add by jc 20100819
			//目前一个LI对象的宽度有87
			$("showMenuUL").style.width=87*tabs.length;
			//-10防止DIV弹出框出现滚动条 mdf by jc 20100916
			$("showMenu").style.width=Ext.getBody().getWidth()-10;
			Ext.get("showMenu").on("mousemove",function(){
				$("showMenu").style.width=Ext.getBody().getWidth()-10;
				var e=ucapCommonFun.getEvent();//ie和firefox 事件不同
				var positionX = e.clientX - $("showMenu").offsetLeft || 0;
				var ulObj = Ext.get("showMenuUL");//UL对象
				var smWidth = Ext.get("showMenu").getWidth();//窗口对象
                 if(positionX<=smWidth/2){
                 	//左半边
                 	if(ulObj.getX()<=8 && ulObj.getX()<=Ext.get("showMenu").getWidth()/2){
                 		ulObj.move("l",-1);//向右移动
                 	}
                 }else{//右半边
                 	if(ulObj.getX()>=smWidth-ulObj.getWidth()){
                 		ulObj.move("l",1);//向左移动
                 	}
                 }
			});
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
	embellishForm:function(args,dictTree,poxName){
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
		nameEn = objFalg?(ucapCommonFun.getAttr(item,"nameEn")||item.id):item["nameEn"];//字段的英文名
		if(poxName)nameEn = nameEn + poxName;
		var obj = Ext.getDom(nameEn);
		sourceType = obj?ucapCommonFun.getAttr(obj,"sourceType")||item["sourceType"]:"";
		source = obj?ucapCommonFun.getAttr(obj,"source")||item["source"]:"";
		var displayStyle = obj?ucapCommonFun.getAttr(obj,"displayStyle")||item["displayStyle"]:"";
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
		var displayGivenCondtion = obj?ucapCommonFun.getAttr(obj,"displayGivenCondtion")||item["displayGivenCondtion"]:"";
		if(displayGivenCondtion){
			var isdgc = eval(displayGivenCondtion);
			if(isdgc){
				var displayConversion = obj?ucapCommonFun.getAttr(obj,"displayConversion")||item["displayConversion"]:"";
				var pobj = obj.parentNode;
				//pobj.removeChild(obj);
				//pobj.appendChild("<span>"+displayConversion+"</span>");
				//修改为如下：modify by jc20090914
				pobj.innerHTML = ("<span>"+displayConversion+"</span>");
			}
		}
		/**
		 * 设置是否编辑功能
		 */
		var editGivenCondtion = obj?ucapCommonFun.getAttr(obj,"editGivenCondtion")||item["editGivenCondtion"]:"";
		if(editGivenCondtion){
			var isegc = eval(editGivenCondtion);
			if(isegc && isegc==true && item.readOnly!=undefined && item.readOnly!="undefined")item.readOnly=true;
		}
		
		//var dicShowType = item["itemShow"]["dictionaryType"];
		var fn20 = function(_s,s02){
			var btnCnHtmlTmp = cfg.htmlTmpStr.btn_cn_html;
			var btnHtmlTmp = cfg.htmlTmpStr.btn_html;//视图列按钮
			var obj = Ext.getDom(nameEn);
			var _ss = ucapCommonFun.getAttr(obj,"source")||item["source"];
			var _t=ucapCommonFun.getAttr(obj,"isSingle")||item["isSingle"];
			var fieldNames = ucapCommonFun.getAttr(obj,"columnMap")||item["columnMap"];
			
			if(s02){//视图列
				if(!Ext.getDom(nameEn+"_Cn_"))complieTmp(btnHtmlTmp,obj.parentNode,{"id":nameEn,"text":"选","class":"inputred"});
				var btn = Ext.getDom("btn_"+nameEn);
				Ext.apply(btn,{"onclick":function(){
					var _ev=ucapCommonFun.getAttr(obj,"Evalue")||"";//回调函数
					var _sWidth=ucapCommonFun.getAttr(obj,"sWidth")||"";
					var _sHeight=ucapCommonFun.getAttr(obj,"sHeight")||"";
					//sTitle,purl,recordSplit,colSplit
					var _sTitle=ucapCommonFun.getAttr(obj,"sTitle")||"";
					var _purl=ucapCommonFun.getAttr(obj,"purl")||"";
					var _recordSplitl=ucapCommonFun.getAttr(obj,"recordSplit")||"";
					var _colSplit=ucapCommonFun.getAttr(obj,"colSplit")||"";
					return (function(){var _ss = ucapCommonFun.getAttr(obj,"source")||item["source"];selectView.call(obj,_ss,fieldNames,nameEn,_t,_ev,_sTitle,_purl,_recordSplitl,_colSplit,_sWidth,_sHeight);})();
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
						var conValue = ucapCommonFun.getAttr(obj,"conValue");//firefox
						if(Ext.getDom(conValue)) {
							_ss = Ext.getDom(conValue).value;
						} else {
							if(ucapCommonFun.getUrlParameter(conValue)){
								_ss = ucapCommonFun.getUrlParameter(conValue);
							}else{
								_ss="";
							}
						}
						_source=ucapCommonFun.getAttr(obj,"source")||200;//firefox
					}
					var _ev=ucapCommonFun.getAttr(obj,"Evalue")||"";//firefox
					return (function(){selectDataSD(_source,_t,nameEn,_ss||"",_ev);})();
				}});
			}
		};
		//alert(Ext.encode(item["type"]));
		//进行文本编辑器的配置
		var ewebEditorFn = function(){
			source = (source||"350").split(",");
			var iframe1 = '<iframe id="{id}" src="'+ucapSession.appPath+'eWebEditor/ewebeditor.htm?id='+nameEn+'&style='+(source[1]||"mini")+'" frameborder="0" scrolling="no" width="100%" height="'+source[0]+'"></iframe>';
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
		if(obj && obj.tagName.toLowerCase()!="span" && obj.tagName.toLowerCase()!="div"){
			//加入My97额外参数的扩展 add by jc 20100825
			var wpFn = function(nameEn,source){
				var img = '<span><IMG style="CURSOR: pointer;" onclick="{onclick}" src="'+ucapSession.appPath+'js/ucap/calendar/skin/datePicker.gif" align="absMiddle"/></span>';
				var parm = "{el:'"+nameEn+"',dateFmt:'"+source+"'";
				var wdatePickerParm = ucapCommonFun.getAttr(obj,"wdatePickerParm");
				if(wdatePickerParm && null!=wdatePickerParm){
					parm+=","+wdatePickerParm;
				}
				parm+="}";
				//alert(Ext.encode(wdatePickerParm));
				complieTmp(img,Ext.getDom(nameEn).parentNode,{"onclick":"WdatePicker("+parm+");"});
			};
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
					source = source||ucapSession.defaultDateFormat;
					wpFn(nameEn,source);
					break;
				}
				case "05":{//日期时间
					source = source||ucapSession.defaultDateTimeFormat;
					wpFn(nameEn,source);
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
					var dis = ucapCommonFun.getAttr(obj,"display")||obj.style.display;
					pobj.removeChild(obj);
					var filecfg = {"id":nameEn};
					if((cfg.isRead+"")=="1"){
						if(!item.value[0]){
							filecfg = {"id":nameEn,"display":"none1","obj_display":(dis||"none1"),"br":(dis=="none"?"":"<br/>")};
							complieTmp(filehtml,pobj,filecfg);
						}else{
							filecfg = {"id":nameEn,"class":"inputred","obj_display":(dis||"none1"),"display":"none","downFile":'<span onclick="_UcapForm.tool.valFile(\''+nameEn+'\');" style="color:red;cursor:pointer;">重新上传</span>&#160;&#160;' +
																								'<span onclick="_UcapForm.tool.openFile();" style="cursor:pointer;">下载</span>&#160;&#160;' +
																								'<span onclick="_UcapForm.tool.deleteFile(\''+nameEn+'\');" style="cursor:pointer;">删除</span>'};
							
							complieTmp(filehtml,pobj,filecfg);
						}
					}
					
					break;
				}
				case "20":{//通用选择框
					fn20();
					break;
				}//case 08
				case "10"://扩展字典
				case "03":{//字典
					//以HTML的实际属性值优先获取，不存在从内存对象获取。mdf by jc 20111013
					//var dicShowType = objFalg?ucapCommonFun.getAttr(item,"dictionaryType"):((item["dictionaryType"]||item["itemShow"]["dictionaryType"]));
					var dicShowType = ucapCommonFun.getAttr(obj,"dictionaryType")||item["dictionaryType"]||item["itemShow"]["dictionaryType"];
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
						case "07":{//录入助手
							//录入助手HTML对象构造 mdf by jc 20100628
							var pobj = obj.parentNode;
							pobj.removeChild(obj);
							var rrzs = '<input id="{id}_Cn_" name="{id}_Cn_" class="{class}" value="" /><input id="{id}" name="{id}" value="" style="display:none;"/>';
							complieTmp(rrzs,pobj,{"id":nameEn});
							//目前采用表单加载后执行录入助手渲染事件
							break;
						}
						default:break;
					}
					if(dicShowType=="01" || dicShowType=="02" || dicShowType=="05"){
						if(!dictTree)break;
						var children = dictTree["children"];
						if(!children)break;
						try{
							//当为下拉框时，添加一个“请选择”项  modify by fsm
							if(Ext.DomHelper.useDom&&dicShowType=="01")
							{
								Ext.DomHelper.append(Ext.get(obj), {tag:'option',value:"",html:"请选择"});
							}
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
			//进行默认中文值的转换 add by jc 20091012  
			//modify by zzhan@linewell.com 2012-03-01 不为span时才进行默认中文值的转换，为span时则直接显示值
			var isChinese = (obj && ucapCommonFun.getAttr(obj,"chinese"))?ucapCommonFun.getAttr(obj,"chinese"):item["chinese"];
			if(isChinese){
				if(!Ext.getDom(nameEn+"_Cn_")){
					complieTmp(cfg.htmlTmpStr.input_html,obj.parentNode,{"name":nameEn+"_Cn_","class":"inputred","readOnly":"readOnly"},"afterBegin");
					obj.style.display="none";
				}
			}
		}//end if(obj && obj.tagName.toLowerCase()!="span" && obj.tagName.toLowerCase()!="div"){
		Ext.DomHelper.useDom=false;
	},
	form : function(fjson,ijson,renderto,rowNum,poxName){ 
		var cfg = this.cfg;
		var complieTmp = this.complieTmp;
		var fj = fjson||cfg.form;
		var ij = ijson||cfg.uiItemList//所有字段列表
		//alert(Ext.encode(fj["verifyFields"]));
		//非组合表单中表单UNID的设置
		if(!_UcapForm.cfg.mainUnid)_UcapForm.cfg.mainUnid=fj["unid"];
		//alert(Ext.encode(cfg));
		//加载HTML模板
		var tag = cfg.jspTmpStr.formJson["id"];
		//HTML加载的载体ID
		var divId = renderto||(pfx_ucap+fj["unid"]);
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
		
		//从FormAction中获取表单内容 modify by jc 20110310
		var systemPath = "";
		var appUnid = ucapCommonFun.getUrlParameter("belongToAppId") || this.cfg.belongAppUnid || ucapSession.appUnid || "";
		if(cfg.form.nameEn && cfg.form.nameEn.toLowerCase().indexOf("ucap_")==0){
			systemPath=this.cfg.systemPath;
		}
		switch(cfg.isRead+""){
			case "0" : formName = "R_"+(fj["htmlUrl"]||(fj["unid"]+".html"));break;
			case "1" : formName = fj["htmlUrl"]||(fj["unid"]+".html");break;
			default:{
				formName = "error.html";
				htmlUrl = appPath + "html/" + this.cfg.systemPath + "/" + formName;
				window.location.href = htmlUrl;
				break;
			}
		}
		//增加显示表单配置JSP页面时的逻辑（只支持相对路径） add by jc 20110325
		if(formName && formName.indexOf(".jsp")>-1){
			//判断是否为平台配置相关表单
			if(!systemPath){
				htmlUrl = appPath+ "html/" +(ucapHeader.formHtmlPath || appUnid)+"/"+formName;
			}else{
				htmlUrl = appPath+ "html/" + systemPath+"/" +formName;
			}
			htmlUrl += "?";
		}else{
			htmlUrl = ucapSession.baseAction + "?type=getForm&act=getFormHtml&appUnid="
					+appUnid+"&fileName="+formName+"&systemPath="+systemPath+"&";
		}
		//alert(htmlUrl);
//		var parm = {
//			rds:ucapCommonFun.getRandomString()
//		};
		var embellishForm = this.embellishForm;
		/**
		 * load事件中用到objDiv,isb参数
		 * update事件中没用到objDiv,isb参数
		 */
		var loadFormData = function(objDiv,isb){
			if(isb===true || typeof(isb)=='undefined'){
				//编辑状态
				//绑定字段属性及赋值、绑定事件
				var item,value,nameEn,isFocus = false;
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
						var pox = poxName||"_pox_";
						rowNum = rowNum||0;//目前作为测试值
						try{
							if(rowNum>0){
								embellishForm(item,dict,pox+rowNum);
							}else{
								embellishForm(item,dict);
							}
						}catch(e){}
					}
					//绑定属性及值
					//modify by jc 20100324 确保字段全部加载完后事件能正常运行
					//ucapCommonFun.bindForm(jsonItem);
					//alert(Ext.encode(jsonItem));break;
					//考虑是否要改正规的格式存储起来
				}
				//modify by jc 20100324 确保字段全部加载完后事件能正常运行
				for(var i=0;i<ij.length;i++){
					var jsonItem = {};//需要给页面绑定的属性
					item = ij[i]["item"];//字段的属性
					value =  ij[i]["uiItemValueList"];//字段的值
					item["value"] = value;//将字段的值赋值给字段的属性json中
					nameEn = item["nameEn"];//字段的英文名
	
					//进行焦点获取,防止页面找不到焦点 modify by jc 20100312
					try{
						if(!isFocus){
							var objCn = $(nameEn+"_Cn_");
							if(objCn){
								$(objCn).focus();
								isFocus = true;
							}else if($(nameEn)){
								$(nameEn).focus();
								isFocus = true;
							}
						}
					}catch(e){}
					var pox = poxName||"_pox_";
					rowNum = rowNum||0;//目前作为测试值
					//给页面的nameEn绑定item中的所有属性
					jsonItem[nameEn] = item;
					Ext.apply(jsonItem[nameEn],item["itemShow"]||{});
					Ext.apply(jsonItem[nameEn],item["itemEvents"]||{});
//					alert(Ext.encode(jsonItem));
					//绑定属性及值
					if(rowNum>0){
						ucapCommonFun.bindForm(jsonItem,false,pox+rowNum);
					}else{
						ucapCommonFun.bindForm(jsonItem,false);
					}
					//考虑是否要改正规的格式存储起来
				}
				//非组合表单加载标题
				//if(cfg.formType!="03")
				_UcapForm.tool.setDocumentTitle(fj);
				var formEvents = cfg.form["formEvents"];//事件统一用表单事件
				if(cfg.isTabNew){
					//新文档
					_UcapForm.tool.executeJavaScript(formEvents,"01");
				}else{
					//旧文档
					_UcapForm.tool.executeJavaScript(formEvents,"02");
				}
			}else{
				if(!objDiv)objDiv = Ext.get(divId).dom;
				if(objDiv)objDiv.update('<div class="red" align="center">未找到相关表单,请与管理员联系!<br/>'+htmlUrl+'</div>');
			}
		};
		/**
		 * 获取HTML模板
		 * mdf by jc 20100528
		 * 表单列表进行编辑加载HTML不稳定，经常无法正常渲染后面的事件
		 */
		var url = htmlUrl+"&"+ucapCommonFun.getRandomString();
		//url+="&"+ucapCommonFun.getRandomString();
		var response = Ext.lib.Ajax.getConnectionObject().conn;
		response.open("GET", url, false);
		response.send(null);
		
//		var requestConfig = {
//			url:htmlUrl,
//			params:parm,
//			callback:function(options,success,response){
//				if (success){
					var formHtml = response.responseText;
					//修改出错处理逻辑 add by jc 20110310
					var formHtmlJson = Ext.decode(formHtml);
					if(formHtmlJson && formHtmlJson.error){
						Ext.get(divId).update(formHtmlJson.msg,true);
						return false;
					}
					//进行模板处理
					//判断有多少条记录,有几条记录加载几次模板
					var pox = poxName||"_pox_";
					rowNum = rowNum||0;
					var item,nameEn,newName;
					var html="",formHtmls;
					formHtmls = formHtml;
					if(rowNum>0){
						for(var i=0;i<ij.length;i++){
							item = ij[i]["item"];//字段的属性
							nameEn = item["nameEn"];//字段的英文名
							newName = nameEn+pox+rowNum;
							//要求每个input的id或者name后面必须有一个空格。
							//如：<input type="text" id="" name="" /> mdf by jc 20100629
							var reBtnId = new RegExp('(id=["\']?btn_'+nameEn+'["\']? )',"ig");
							var reCnId = new RegExp('(id=["\']?'+nameEn+'(_Cn_)["\']? )',"ig");
							var reId = new RegExp('(id=["\']?'+nameEn+'["\']? )',"ig");
							var reName = new RegExp('(name=["\']?'+nameEn+'["\']? )',"ig");
							//把"去掉使二次开发时更灵活 mdf by jc 20100601 
							formHtmls = formHtmls.replace(reBtnId,'id=btn_'+newName+' ');
							formHtmls = formHtmls.replace(reCnId,'id='+newName+'_Cn_ ');
							formHtmls = formHtmls.replace(reId,'id='+newName+' ');
							formHtmls = formHtmls.replace(reName,'name='+newName+' ');
						}
					}
					html += formHtmls;
					//加载处理后的模板，并进行数据加载
					Ext.get(divId).update(html,true);
					//修改update加载成功后调用回调函数loadFormData为同步调用mdf by jc 20100706
					loadFormData();
					//Ext.get(divId).load({"url":htmlUrl},parm,loadFormData);
//				}
//			}
//		};
//		Ext.Ajax.request(requestConfig);
	},
	formShow : function(fjson,ijson,renderto,rowNum,poxName){
		//alert(Ext.encode(this.cfg.formShow));
		this.form(fjson||this.cfg.formShow,ijson||this.cfg.uiItemList,renderto,rowNum,poxName);
	},
	composeForm : function(fjson,ijson,renderto){
		//alert(Ext.encode(this.cfg.composeForm));
		var cpForm = fjson||this.cfg.composeForm;
		//如果有配置打开的JSP则直接跳转到该JSP页面
		var jspUrl = cpForm["jspUrl"];
		if(jspUrl && jspUrl.indexOf("jsp")>-1 && window.location.href.indexOf(jspUrl)==-1){
			//如果有配置显示JSP名称则直接跳转到该JSP页面，通过document.jsp跳转。mdf by jc 20100915
			var docJspName = "document.jsp";
			if((this.cfg.composeForm["jspUrl"]||"").indexOf("/")>-1){
				docJspName = "sys/jsp/"+docJspName;
			}
			window.location=window.location.href.replace(docJspName,this.cfg.composeForm["jspUrl"]);
			return false;
			//window.location="document.jsp";
		}
		this.cfg.formType = "03";
		_UcapForm.tool.setDocumentTitle({"titleStyle":cpForm["name"]});
		//以下注释方法已经封装在setDocumentTitle中设置标题了
//		if (window.parent && window.parent.ucapSession.docWin){
//				window.parent.ucapSession.docWin.setTitle(ucapSession.win.winImg+cpForm["name"]);
//		} else {
//			Ext.getDoc().dom.title = cpForm["name"];
//		}
		//Ext.getDoc().dom.title = cpForm["name"];
		//alert(Ext.encode(this.cfg.form));
		//组合表单中主表单UNID的设置
//		if(this.cfg.mainFormType=="02"){
//			//主表单为显示表单关联的表单
//			this.cfg.mainUnid = this.cfg.form["unid"];
//			//显示表单UNID
//			this.cfg.mainShowUnid = this.cfg.formShow["unid"];
//		}else{
//			//普通表单
//			this.cfg.mainUnid = cpForm["mainFormId"];
//		}
		this.cfg.mainUnid = cpForm["mainFormId"];
		//加载tab及div
		this.setTabDiv();
		//初始化主表单数据
		//this.formShow(this.cfg.form||this.cfg.formShow);
		return true;
	},
	setAttrPopedom:function(arg){
		if(arg)
		switch(Ext.type(arg)){
			case "string":{
				var obj = Ext.decode(arg).result||Ext.decode(arg);
				if(obj && obj!="")this.setAttrPopedom(obj);
				break;
			}
			case "object":{
				Ext.apply(this.cfg.attrPopedom,arg.result||arg);
				break;
			}
		}
		//alert(Ext.encode(this.cfg.attrPopedom));
	}
};
/**
 * 分级管理保存刷新树的扩展功能
 */
_UcapForm.saveRefreshTree=function(){
	if(window.opener){
		if(window.opener.ucapManagerTree)
			window.opener.ucapManagerTree.refreshNode();
	}else{
		var ifr = window.top.Ext.query("iframe");
		if(ifr){
			for(var i=0;i<ifr.length;i++){
				if(ucapCommonFun.getAttr(ifr[i],"src").indexOf("sys/system/index.jsp")>-1){
					if(ifr[i].contentWindow.ucapManagerTree)
						ifr[i].contentWindow.ucapManagerTree.refreshNode();
				}else{
					if(window.top.ucapManagerTree)
						window.top.ucapManagerTree.refreshNode();
					else if(ucapManagerTree)
						ucapManagerTree.refreshNode();
				}
			}
		}else if(ucapManagerTree)
			ucapManagerTree.refreshNode();
	}
};
/**
 * 文档保存 
 * @param callBack 执行成功的回调函数，参数是字符串
 * @param msgObj 信息提示对象,{isModifyMsg:1,isSaveMsg:1,modifyMsg:"",saveMsg:""}
 *  isModifyMsg有无【无需保存】信息提示,isSaveMsg有无【保存成功】信息提示，
 *  modifyMsg【无需保存】信息内容，saveMsg【保存提示】信息内容
 *  @param formValidatorMode表单验证模式1,2,3
 */
_UcapForm.simpleDocSave= function(saveCallBack,msgObj,formValidatorMode){
	var re = _UcapForm.docSave(saveCallBack,"1",msgObj,formValidatorMode);
	return re;
};

/**
 * 判断要加入数组的json是否已经存在于数组中,如果已经存在则返回true，否则返回false
 * 
 * @param {}
 *            jresult
 * @param {}
 *            jr
 * @return {}
 */
_UcapForm.checkSingleFormData = function(jresult, jr) {
	var result = false;
	if (Ext.encode(jresult) == "[]" || null == jresult){
		return result;
	}
	for (var i = 0; i < jresult.length; i++) {
		var obj = jresult[i];
		var unid = jr["unid"];
		var formUnid = jr["formUnid"];
		if (obj["unid"] == unid && obj["formUnid"] == formUnid) {
			result = true;
			break;
		}
	}
	return result;
}

/**
 * 表单保存数据逻辑函数
 * @param {} singleForm 当前表单
 * @param {} mid 主表单UNID
 * @param {} mainForm 主表单
 * @param {} isNew 是否为新文档，是为有值（旧文档unid），无则为空
 * @param {} jresult 保存时的JSON对象
 * @param {} sp 当前表单为多记录列表时的后缀
 * @author JC_Seekart
 */
_UcapForm.singleFormData = function(singleForm,mid,mainForm,isNew,jresult,sp){
	var a = singleForm["form"]["unid"];
	//页签是否新建0否1是
	var isTabNew = (!isNew || (singleForm["isNew"]!="" && singleForm["isNew"]==1))?1:0;
	//alert(Ext.encode(a));
	//if(a==mid)continue;
	var jr = {};
	var jitem = [];
	
	var isDel = singleForm["isDel"];
	if("true"==isDel){
		//不判断组合表单，因为这里把组合表单的删除分解成组合表单的主表单删除，故不会有03
		//var form = singleForm["formShow"]||singleForm["form"];
		var form = singleForm["form"];
		if(form){
			//表单UNID
			jr["formUnid"] = form["unid"];
			//文档UNID
			jr["docUnid"] = singleForm["unid"];
			//jr["formType"] = singleForm["formShow"]?"02":"01";
			jr["formType"] = "01";
			jr["isNew"] = "";
			jr["unid"] = "";
			jr["isDel"] = isDel;
			jresult[jresult.length] = jr;
		}
		return;
	}
	var items = singleForm["uiItemList"];
	
	//if(isTabNew)alert("新文档");else alert("旧文档");
	for (var i = 0; i < items.length; i++) {
		var item = items[i]["item"];
		var name = item["nameEn"];
		var value = item["value"]||items[i]["value"];
		var webName = name+(sp||"");
		//alert(Ext.encode(value));
		//alert(!value[0]);
		var obj = Ext.getDom(webName);
		/**
		 * 返回有字段集的json
		 * 格式：{k:"",v:"",t:""}
		 */
		var getKVT = function(v){
			var kvt = {};
			//中文值及实际值的获取
			kvt = ucapCommonFun.getObjValueJson(webName,v,null,name);
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
		//增加执行表单字段值的监控处理事件 add by jc 20110719
		try{
			jitem[i] = _UcapForm.formItemUpdater(jitem[i]);
		}catch(e){
		}
	}
	if(Ext.encode(jitem)=="[]"){
		return;
	}
	var form = singleForm["form"]||singleForm["formShow"];
	if(form){
		//设置显示表单UNID add by jc 20110722
		if(null!=singleForm["formShow"]){
			jr["formShowUnid"] = singleForm["formShow"]["unid"];
		}
		//表单UNID
		jr["formUnid"] = form["unid"];
		//文档UNID
		jr["unid"] = singleForm["unid"];
		//alert(jr["unid"]);
		//判断是否主表
		if(!mid||mid==a){
			//alert("主表单保存");
			//从URL上获取主表信息
			var fformUnid = ucapCommonFun.getUrlParameter("fformUnid");
			var funid = ucapCommonFun.getUrlParameter("funid");
			if(!isNew && fformUnid && funid){
				//表单UNID
				jr["fformUnid"] = fformUnid;
				//文档UNID
				jr["funid"] = funid;
			}
			
		}else if(mid && mid!=a){
			//alert("非主表单保存");
			var cf =  mainForm["composeForm"];
			//不是主表单,并且有主合表单
			if(cf){
				//alert("非主表单有主表保存");
				//表单UNID
				jr["fformUnid"] = mid;
				//文档UNID
				jr["funid"] = mainForm["unid"];
			}else{
				//普通表单、无主从关系的单一表单
			}
		}
	}
	//alert(Ext.encode(jitem));
	if(isTabNew){
		jr["isNew"] = "1";
		//modify by jc 20100525
//		var temp = singleForm;
//		temp["isNew"] = "";
	}else{
		jr["isNew"] = "0";
	}
	jr["item"] = jitem;
	jresult[jresult.length] = jr;
};
/**
 * 表单字段处理逻辑
 * @param item有修改的字段对象{k:'字段名称',v:'字段值',t:'字段类型',s:'是否拼音'}
 * @type 
 */
_UcapForm.formItemUpdater = function(item){
	return item;
};
/**
 * 获取表单保存时数据
 * @param {} mainForm 主表单
 * @param {} isNew 是否为新文档
 * @param {} all 文档记录集
 * @param {} jresult 保存时的JSON对象
 * @author JC_Seekart
 */
_UcapForm.formData = function(mainForm,isNew,all,jresult){
	var mid = mainForm["form"]["unid"];
	for(var a in all){
		this.singleFormData(all[a],mid,mainForm,isNew,jresult);
	}
};
/**
 * 获取修改的数据
 * @param {} mainForm 主表单
 * @param {} isNew 是否为新文档
 * @param {} all 文档记录集
 * @param {} jresult 保存时的JSON对象
 * @return {jresult}
 */
_UcapForm.getAmendData= function(mainForm,isNew,all,jresult){
	/**
	 * 获取表单保存要提交的数据，修改到jresult中
	 */
	_UcapForm.formData(mainForm,isNew,all,jresult);
	/**
	 * 加入视图编辑数据的获取
	 */
	if(_UcapForm.viewData(mainForm,isNew,jresult)==false){
		return false;
	}
	
	/**
	 * 加入编辑视图删除的数据
	 */
	_UcapForm.deleteViewData(jresult);
	
	/**
	 * 保存其它特殊表单信息接口
	 */
	_UcapForm.otherFormData(mainForm,jresult);
	return jresult
};
/**
 * 获取视图保存时数据
 * @param {} mainForm 主表单
 * @param {} isNew 是否为新文档
 * @param {} jresult 保存时的JSON对象
 * @return {Boolean} 返回视图验证结果
 * @author JC_Seekart
 */
_UcapForm.viewData = function(mainForm,isNew,jresult){
	var allView = _UcapForm.handler.allView;
	for(var viewId in allView){
		var objView = $(view.iframePreId + viewId);		
		if(objView && objView.tagName.toLowerCase()=="iframe"){
			var ifrWin = objView.contentWindow;
			if(ifrWin && ifrWin.view){
				var index = ifrWin.view.viewBaseInfos.length-1;
				var saveValidateJsName = ifrWin.view.viewBaseInfos[index].saveValidateJsName||"";
				if(ifrWin.view.viewBaseInfos[index].viewType=="04"){
					//alert("视图表单列表的保存数据组装");
					var editGridDatas = ifrWin.view.getViewFormDatas(mainForm,isNew,jresult);
					if(editGridDatas==false)return false;
					//其它特殊验证
					try{
						if(saveValidateJsName)
							if(!eval(saveValidateJsName+"(jresult)"))return false;
					}catch(e){
						Ext.Msg.alert("系统信息提示","视图保存验证函数名称配置出错,请与管理员联系!")
						return false;
					}
					//if(!window.view.viewSaveValidator(jresult))return false;
				}else{
					//alert("编辑视图的保存数据组装");
					var editGridDatas = ifrWin.view.getEditorGridDatas();
					editGridDatas = Ext.decode(editGridDatas);
					//视图验证 add by jc 20100513
					if(editGridDatas && editGridDatas.error){
						window.top.Ext.Msg.alert("提示信息",editGridDatas.error);
						return false;
					}
					for(var i=0;i<editGridDatas.length;i++){
						/**
						 * 加入主表修改
						 */
						var data = editGridDatas[i];
						if(!data["fformUnid"])data["fformUnid"]=mainForm["form"]["unid"];
						if(!data["funid"])data["funid"]=mainForm["unid"];
						jresult[jresult.length]=data;
					}
					//其它特殊验证
					try{
						if(saveValidateJsName)
							if(!eval(saveValidateJsName+"(editGridDatas)"))return false;
					}catch(e){
						Ext.Msg.alert("系统信息提示","视图保存验证函数名称配置出错,请与管理员联系!")
						return false;
					}
					//if(!window.view.viewSaveValidator(editGridDatas))return false;
				}
			}
		}
	}
};

/**
 *add by  fsm 20110428
 * 获取编辑视图删除的数据 
 * @param {} jresult
 */
_UcapForm.deleteViewData = function(jresult){
	var allView = _UcapForm.handler.allView;
	for(var viewId in allView){
		var objView = $(view.iframePreId + viewId);
		if(objView && objView.tagName.toLowerCase()=="iframe"){
			var ifrWin = objView.contentWindow;
			if(ifrWin && ifrWin.view){
				ifrWin.view.getDeleteEditorGridDatas(jresult);
			}
		}
	}
};


/**
 * 字段更新验证包括字段重名和类型转换
 * add by fsm
 * @param 编辑表格提交的json数据
 * @return  true or false
 */
_UcapForm.fieldUpdaeVaild=function(json)
{
		//ucapCommonFun.showJson(Ext.encode(data));return false;
		var data = {};
		data["json"]=json;
		var url = ucapSession.baseAction;
		url+="?type=fieldValid&action=vaild";
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("POST", url, false);
		conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8"); 
		conn.send("data="+Ext.encode(data));
		var exjson = Ext.decode(conn.responseText);
		var exResult=ucapCommonFun.dealException(exjson);
		if(!exResult)return false;
		if(exjson.result=="true"||exjson.result==true)
		{
			 return true;
		}
		else
		{
			if(exjson.msg!=""&&exjson.msg!=null)
			{
				Ext.Msg.alert("提示信息",exjson.msg);
			}
			else
			{
				Ext.Msg.alert("提示信息","操作失败!");
			}
			return false;		
		}
}

/**
 * 其它需要保存的数据
 * @param {} mainForm
 * @param {} jresult
 * @author JC_Seekart
 */
_UcapForm.otherFormData = function(mainForm,jresult){
	var otherFormData = _UcapForm.ucapForm.otherFormData();
	if(otherFormData && Ext.type(otherFormData)=='array'){
		for(var i=0;i<otherFormData.length;i++){
			/**
			 * 加入主表修改
			 */
			var data = otherFormData[i];
			if(!data["fformUnid"])data["fformUnid"]=mainForm["form"]["unid"];
			if(!data["funid"])data["funid"]=mainForm["unid"];
			jresult[jresult.length]=data;
		}
	}
}
/**
 * 保存并新增表单 
 *  @param simple 1--调用的表单保存，无创建修改表结构的功能
 *  @param msgObj 信息提示对象,{isModifyMsg:1,isSaveMsg:1,modifyMsg:"",saveMsg:""}
 *  isModifyMsg有无【无需保存】信息提示,isSaveMsg有无【保存成功】信息提示，
 *  modifyMsg【无需保存】信息内容，saveMsg【保存提示】信息内容
 *  @param formValidatorMode表单验证模式1,2,3
 */
_UcapForm.docSaveSucReload = function(simple,msgObj,formValidatorMode){
	//保存成功后的回调函数，用于Window窗口重新加载页面
	var saveCallBack = "_UcapFormFun.reloadWinHref";
	_UcapForm.docSave(saveCallBack,simple,msgObj,formValidatorMode);
}
/**
 * 保存表单 
 * @param callBack 执行成功的回调函数，参数是字符串
 *  @param simple 1--调用的表单保存，无创建修改表结构的功能
 *  @param msgObj 信息提示对象,{isModifyMsg:1,isSaveMsg:1,modifyMsg:"",saveMsg:""}
 *  isModifyMsg有无【无需保存】信息提示,isSaveMsg有无【保存成功】信息提示，
 *  modifyMsg【无需保存】信息内容，saveMsg【保存提示】信息内容
 *  @param formValidatorMode表单验证模式1,2,3
 */
_UcapForm.docSave = function(saveCallBack,simple,msgObj,formValidatorMode){
	var defMsg = {isModifyMsg:1,isSaveMsg:1};
	if(!msgObj){
		msgObj = defMsg;
	}else{
		if(typeof(msgObj)=="string")msgObj = Ext.decode(msgObj);
		if(msgObj)Ext.applyIf(msgObj,defMsg);
	}
	//表单验证模式modify by jc 20100512
	if(null==formValidatorMode || typeof(formValidatorMode)=="undefined"){
		formValidatorMode = 2;
	}
	if(!Validator.Validate(_UcapForm.mainDiv,formValidatorMode)){
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
			//获取文件上传的限制条件
			var source= ucapCommonFun.getAttr($(inputId),"source");
			var iframe = $("iframe"+inputId);
			var ifr_src = ucapCommonFun.getAttr(iframe,"src");
			var iframeFlag = iframe.contentWindow.document.body.innerHTML;
			var flag = ucapCommonFun.getAttr(iframe,"flag");
			if(flag=="false"){
				iframeFlag = "false";
			}else{
				bSave = true;
			}
			var fileValue = $("file_"+inputId).value;
			if(fileValue=="")bSave = true;
			var execuCount=0;//用于判断iframe每次只执行一次
			if((ifr_src=="#" && iframeFlag.indexOf("true")==-1 && fileValue!="")){
				if(ucapCommonFun.getAttr(iframe,"flag")!="true"){
					Ext.get("iframe"+inputId).on("load",function(){
							if(execuCount>0)return;//判断每次只执行上传一次
							execuCount=execuCount+1;
							var inputPath = iframe.contentWindow.document.body.innerHTML;
							var json =Ext.decode(inputPath);
							ucapCommonFun.setAttr(iframe,"flag","false");
							if(json&&"undefined"!=json.flag&&!json.flag){
								if(json.messageTip&&json.messageTip.tip){
									alert(json.messageTip.tip);
								}else{
									alert("上传附件失败");
								}
								bSave=false;
							}else{
								if(inputPath=="false"){
									//ucapCommonFun.setAttr(iframe,"flag","true");
									alert("上传附件失败");
									bSave=false;
								}else{
									$(inputId).value = inputPath.replace(/\\/g,"/");
									ucapCommonFun.setAttr(iframe,"flag","true");
									bSave=true;
								}
							}
							if(bSave)_UcapForm.docSave(saveCallBack,simple,msgObj);//bSave为true时，说明文件上传成功
						});
					try{
						var form = $("form_"+inputId);
						var mainForm = _UcapForm.handler.all[_UcapForm.cfg.mainUnid];
						if(""==source&&globalVariables&&globalVariables.attr_upload_max &&globalVariables.attr_upload_type){
							//如果字段配置的属性值为空时，取全局变量设置的值，
							if(globalVariables.attr_upload_max>0 &&""!=globalVariables.attr_upload_type )
								source=globalVariables.attr_upload_max+","+globalVariables.attr_upload_type;
						}
						ucapCommonFun.setAttr(form,"action",appPath+"BackGroundService.upload?upload=1"
											+"&punid="+mainForm.unid+"&source="+source);//传入source参数以限制文件上传
						form.submit();
					}catch(e){
						//return false;
					};
					ucapCommonFun.setAttr(iframe,"flag","true");//正在执行中
					return false;
				}else{
					ucapCommonFun.setAttr(iframe,"flag","false");//未执行或者已经执行过
					return true;
				}
			}else{
				ucapCommonFun.setAttr(iframe,"flag","false");//未执行或者已经执行过
			}
			break;//目前只只支持一个表单有单一上传文件
		}
		return bSave;
	}
	//返回ture则表示上传成功
	if(!uploadFile())return false;
	if(typeof(saveCallBack)!="string" && typeof(saveCallBack)!="function") saveCallBack = "";
	var unid = ucapCommonFun.getUrlParameter("unid");
	var flowParm = "";
	if(window.location.href.indexOf("view.jsp")>-1){
		//视图预览时保存要用到 add by jc 20100607
		isNew = _UcapForm.cfg.unid;
	}
	var all = _UcapForm.handler.all;
	var mid = _UcapForm.cfg.mainUnid;//主表单UNID
	var mainForm = _UcapForm.handler.getFormById(mid);//主表单对象
	//URL上isNew是否新建状态 mdf by jc 20100715
	var isNew = ucapCommonFun.getUrlParameter("isNew");
	if(isNew && isNew=="1"){
		//如果URL上有isNew标识,则以URL的unid为此次保存主文档新文档的unid,如果不存在则用表单默认的
		//注意：流程文档暂时不支持URL上isNew，会出现无权限打开此文档
		mainForm["unid"]=unid||mainForm["unid"];
	}
	isNew = isNew||unid;//用于保存成功后是否进行跳转
	var jresult = [];
	//>---------------执行表单事件--------------
	//主表单事件
	var formEvents = all[mid]["form"]["formEvents"];
	var isContinue;
	if(!isNew){
		//新文档保存前
		isContinue = _UcapForm.tool.executeJavaScript(formEvents,"03");
	}else{
		//旧文档保存前
		isContinue = _UcapForm.tool.executeJavaScript(formEvents,"05");
	}
	//alert(isContinue);
	if(isContinue==false)return false;
	//<--------------执行表单事件结束-----------
	//return;
	//获取修改的数据 modify by zhua 2011-5-19
	jresult=_UcapForm.getAmendData(mainForm,isNew,all,jresult);
	// 判断字段是否验证成功 by@cgc 2011-6-18
//	if (jresult == false) {
//		return false;
//	}
	
	if(Ext.encode(jresult)=="[]"){
		if(msgObj.isModifyMsg){
			Ext.Msg.alert("保存提示",msgObj.modifyMsg||"文档没有修改，无需保存！");
		}
		return false;
	}else if (jresult == false) {//判断当字段类型改变验证失败时，jresult返回false，不弹出对话框，因为验证函数已经有弹出提示框了 by fsm 
		return false;
	}
	//Ext.Msg.alert("test by jc",Ext.encode(jresult));
	//return;//测试要注释
	//type=getForm&act=save
	try{
		//新建时加入流程参数
		if(!isNew || isNew==""){
			//主表单新建的时候加入流程相关参数,modify by jc 20100525
			var nodeid = ucapCommonFun.getUrlParameter("nodeid");
			var flowid = ucapCommonFun.getUrlParameter("flowid");
			nodeid = !nodeid?"":nodeid;
			flowid = !flowid?"":flowid;
			if(flowid!="" && flowParm.indexOf("flowid")<0){
				flowParm += "&flowid="+flowid+"&nodeid="+nodeid;
			}
		}
		var ps ;
    	var belongToAppId = ucapCommonFun.getUrlParameter("belongToAppId");
    	if(typeof simple !="string" ) simple = "0";
    	if(belongToAppId){
    		if(simple=="1"){
    			ps = "type=getForm&act=simpleSave&belongToAppId="+belongToAppId+"&isDocSave="+this.cfg.isDocSave+flowParm+"&"+ucapCommonFun.getRandomString();
    		}else{
    			ps = "type=getForm&act=save&belongToAppId="+belongToAppId+"&isDocSave="+this.cfg.isDocSave+flowParm+"&"+ucapCommonFun.getRandomString();
    		}
    	}else{
    		if(simple=="1"){
    			ps = "type=getForm&act=simpleSave&isDocSave="+this.cfg.isDocSave+flowParm+"&"+ucapCommonFun.getRandomString();
    		}else{
    			ps = "type=getForm&act=save&isDocSave="+this.cfg.isDocSave+flowParm+"&"+ucapCommonFun.getRandomString();
    		}
    	}
	}catch(e){
		if(simple=="1"){
    			ps = "type=getForm&act=simpleSave&isDocSave="+this.cfg.isDocSave+flowParm+"&"+ucapCommonFun.getRandomString();
    		}else{
				ps = "type=getForm&act=save&isDocSave="+this.cfg.isDocSave+flowParm+"&"+ucapCommonFun.getRandomString();
    		}
	}
	var curwin = window;
	if (parent){
		curwin = parent;
	}
	if(!_UcapForm.cfg.otherSaveAction){
		_UcapForm.cfg.otherSaveAction = ucapSession.baseAction;
	}
	var curIsNew="0";
	var requestConfig = {
		url:_UcapForm.cfg.otherSaveAction,
		params:ps,
		jsonData:jresult,
		callback:function(options,success,response){
			if (success){
			    //保存结果标识
				var saveFlag = false;
				var flag = response.responseText;
				var exjson = Ext.decode(flag);
				var exResult=ucapCommonFun.dealException(exjson);
				if(!exResult)return;
				
				if(flag=="1" || flag==1){
					//if(_ucapDistb!=1){
					//curwin.Ext.Msg.alert("保存提示","文档保存成功!");
					flag = "文档保存成功!";
					//}
					if(isNew=="" || isNew=="1"){
						//新文档保存后
						isContinue = _UcapForm.tool.executeJavaScript(formEvents,"04");
						if(isContinue==false)return;
					} else{
						//修改json里面的值
						var submitData = options.jsonData;
						for (var j = 0; j < submitData.length; j++) {
							if(1!=curIsNew){
								//只要设置为新建状态后，就不再进行逻辑处理
								//表单UNID
								var fUnid = submitData[j].formUnid;
								//显示表单UNID mdf by jc 20111722
								var fsUnid = submitData[j].formShowUnid;
								if(all&&all[fUnid]){
									curIsNew=all[fUnid]["isNew"];
								}else if(all&&all[fsUnid]){
									curIsNew = all[fsUnid]["isNew"];
								}
							}
							var dataItems = submitData[j].item;
							if(dataItems!=null)
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
												//解决可多次保存的问题 modify by zhua 2011-5-13
												//itemValue[n].text = ditem.v;
												itemValue[n].value = ditem.v;
											}
										}
									}
								}//end if(ditem)
							}
						}
						//modify by jc 20100330重新加载编辑视图防止新增成功后立刻修改造成多次新增的问题
						var allView = _UcapForm.handler.allView;
						for(var viewId in allView){
							var objView = $(view.iframePreId + viewId);
							if(objView && objView.tagName.toLowerCase()=="iframe"){
								var ifrWin = objView.contentWindow;
								if(ifrWin && ifrWin.view){
//									var index = ifrWin.view.viewBaseInfos.length-1;
//									if(ifrWin.view.viewBaseInfos[index].viewType=="04"){
//										//进行数据的反写
//									}else{
										ifrWin.location.reload();
//									}
								}
							}
						}
						//旧文档保存成功后
						isContinue = _UcapForm.tool.executeJavaScript(formEvents,"06");
						if(isContinue==false)return false;
					}
					//modified by llp 09-06-10
					ucapCommonFun.refreshParentView();
					//视图预览保存后刷新当前视图mdf by jc 20100608
					view.refresh();
					//执行回调函数
					if (saveCallBack!=""){
						var saveCallBack_str = "var fn = "+saveCallBack+";fn('"+mainForm["unid"]+"');";
						ucapCommonFun.evalJavaScript(saveCallBack_str);
					}
				}else if(flag=="0"){
					//curwin.Ext.Msg.alert("保存提示","文档保存失败!");
					flag = "文档保存失败!";
					saveFlag = true;
				}else{
					//curwin.Ext.Msg.alert("保存提示",flag);
				}
			}
			_UcapForm.tool.hideLodingMsg();
			
			if(msgObj.isSaveMsg){
				if(isNew=="" || isNew=="1"|| curIsNew=="1"){
					curwin.Ext.Msg.alert("保存提示",msgObj.saveMsg||flag,_UcapForm.refresh);
				}else{
					curwin.Ext.Msg.alert("保存提示",msgObj.saveMsg||flag);
				}
			}else if(msgObj.isSaveFailMsg && saveFlag){//保存失败的时候给其进行提示，避免发送下去
				curwin.Ext.Msg.alert("保存提示",msgObj.saveMsg||flag);
			}
		}
	}
	//document.write(Ext.encode(jresult));
	//return;
	this.tool.showLodingMsg();
	Ext.Ajax.request(requestConfig);
	return true;
};

/**
 * 实现文档的保存并发送
 */
_UcapForm.docSaveAndSend=function(type){
	var sendType = "1";
	if(type)sendType=type;
	//设置保存时候不进行提示
	var msgObj = {isModifyMsg:false,isSaveMsg:false,isSaveFailMsg:true};
	//进行文档保存
	var result = _UcapForm.simpleDocSave("_UcapForm.refreshFlowDoc("+sendType+");",msgObj);
	
	if(!result){//说明文档已经保存过，不必再保存，直接发送
		_UcapForm.refreshFlowDoc(sendType);
	}
};

/**
 * 刷新流程文档，主要用于保存并发送时的刷新
 */
_UcapForm.refreshFlowDoc=function(type){
	var formType = ucapCommonFun.getUrlParameter("type");
	var flowid= ucapCommonFun.getUrlParameter("flowid");
	var instanceUnid= ucapCommonFun.getUrlParameter("instanceUnid");
	var mid = _UcapForm.cfg.mainUnid;
	var mainForm = _UcapForm.handler.getFormById(mid);//主表单对象
	if(flowid){
		ucapOpenFlow.openOldFlowDoc("&unid="+mainForm["unid"]+"&sendType="+type,_UcapForm.openAndSendFlowDoc);	
	}else if(instanceUnid){
		ucapFlowFun.sendFlow(type);
	}
};

/**
 * 打开并发送流程，作为回调函数进行被调用
 * 
 * @param {} url 地址信息
 */
_UcapForm.openAndSendFlowDoc=function(url){
	// type 打开类型 0 表示 新窗口，1表示当前窗口 2表示div方式
	var type = ucapSession.opendocType;
	if (type==1 || type==2){
		 url = url+"&div=1";
	}
	var unid = ucapCommonFun.getUrlParameter("unid",url);
	var instanceUnid = ucapCommonFun.getUrlParameter("instanceUnid",url);
	var sendType = ucapCommonFun.getUrlParameter("sendType",url);
	ucapFlowFun.locationUrl = url;
	ucapFlowFun.sendFlow(sendType);
};

/**
 * 新建文档时，表单的刷新方法
 * 
 * add by llp 2011-05-25
 */
_UcapForm.refresh=function(){
    var formType = ucapCommonFun.getUrlParameter("type");
	var flowid= ucapCommonFun.getUrlParameter("flowid");
	var mid = _UcapForm.cfg.mainUnid;
	var mainForm = _UcapForm.handler.getFormById(mid);//主表单对象
						
	if(flowid){
		ucapOpenFlow.openOldFlowDoc("&unid="+mainForm["unid"],_UcapForm.openFlowDoc);	
	}else{
		//旧文档不要isNew=1,流程文档暂时不支持URL上isNew
		var tempUrl = window.location.href;
		var urlsp = tempUrl.split("?");
		var urljson = Ext.urlDecode(urlsp[1]||"");
		urljson["unid"] = mainForm["unid"];
		if(urljson["isNew"]=="1"){
			delete urljson["isNew"];
		}
		//alert(Ext.urlEncode(urljson));
		tempUrl = urlsp[0]+"?"+Ext.urlEncode(urljson);
		window.location=tempUrl;
	}
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
 *获取指纹值保存到 fingerPrintId中
 */
_UcapForm.fingerPrint=function(fingerPrintId){
	//var fingertemplate="mspY1lxHhYc6ARNri12BDC+SSUIalhUsgRNJljMBF0AaZQEHNh1bQQpCH0WCI7AhQsFipaNqAQ02pCTBDp8lO0Iil6thwhbXLCDCDpCucEIXdTBcggnjNUtBC+g7lKQPrrToELCAihoDEBoWEQwDcmhfWFU1HyAjAxAUDwoGd3JtaWZpcwkRGgMQIiAcGhFxXFJKQTYrKSoDDw0KBwR2cm9vbm9ydwQDES0qKCYnPUpIQjs2MS0sKwQOBwQBdXNzc3JxcnUDETg3NTIzOUBAPTc0MC0rKgUOBHd1dnZ2c3JxcQMRREJAOzk5Ozs4NDIvLCopBg13dncBAXVybgMRTU5MST86Nzg1MS8sKikpCAwDBAJ3cgMRVVZWWFIxLTIxLy0qKCcnAAD/BBFbXWFvDiEpLCspKCYlJAAA/wQRX2JodA0bIyYnJyYkIyIAAP8EEWNmbXYKFh0hIyQkIyIhAAD/BRBrcQEJExofISMjIiIAAP8Y+IYYtKpQFCHRPvlJ4rmL+agJ0SrRv7hTsw41jbehhkzjWWwKeq0p0eQPFLXUZz6+XalMrm5ne5Zt4IP9+hPjc5ioyB/npNiwv7/B9Zz1z1KnNFmX0bzVP5BLAbTQN6NbuXTp0UEr3PskRLKcOvOs7F2E8Pc467gBx3SbUXVIC/yPDVqlqiIJhJnHm/uLus2DemfS06K/hkuVGlCzBTWqGJR3GBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBg=";
	var fingertemplate="";
	if (navigator.appName == "Microsoft Internet Explorer")	{
			if (typeof zkonline.RegisterTemplate != "undefined") {
				if (  true) {				
					if (zkonline.Register())
					   fingertemplate=zkonline.RegisterTemplate; 
					else
					   fingertemplate="";
				} else {				
					fingertemplate="";					
				}				
			} else {
	            		var errnum = "0";
			    	var emessage = "无法新建用户.";
			    	var etips = "请检查确认已安装ZKOnline客户端和指纹设备已连接.";
		    		ucapCommonFun.DisplayError(errnum,emessage,etips);
			}
		} else {
			if (window["zkonline"]) {
				if (  true) {
					if (zkonline.Register())
					   fingertemplate=zkonline.RegisterTemplate;
					else
					   fingertemplate="";
				} else {
					fingertemplate="";
				}
			} else {
		                var errnum = "0";
			        var emessage = "无法新建用户.";
			        var etips = "请检查确认已安装ZKOnline客户端和指纹设备已连接.";
			        
		    		ucapCommonFun.DisplayError(errnum,emessage,etips);
			}
		}
		//alert(fingertemplate);
		if(fingertemplate!=""){
			$(fingerPrintId+"_msg").innerHTML="已录入";
			 Ext.getDom(fingerPrintId).value=fingertemplate;
		}
};
_UcapForm.initFingerPrint=function( ){
	 for(var i=1;i<=5;i++){
	 	if(Ext.getDom("fingerprint_str"+i)){
	 	if(Ext.getDom("fingerprint_str"+i).value!=''){
	$("fingerprint_str"+i+"_msg").innerHTML="已录入";
	}
	}
	
	}};
/**
 * 表单的关闭事件
 */
_UcapForm.formClose=function(){
	//start 提取和封装 关闭 页签 cguangcong@linewell.com 2012-4-25
	var closeTab = function(){
		if (window.parent.ucapCommonFun.ucapCurOpenType==1){
				var openST = ucapCommonFun.getUrlParameter("openST");
				if(openST=="01"){
					window.top.ucapCommonFun.indexOpen.openMainPage();
					return;
				}
				if(!window.parent.viewTabs.tabs){
					//要重新打开视图
					try{
						var murl = window.parent.view.viewUrl;
						if(!murl){//默认用视图打开
							if(window.parent.view.viewId)
								window.parent.initView(window.parent.view.viewId,window.parent.ucapSession.ucapViewId);
						}else{
							if((murl||"").indexOf("ucapCommonFun.moduleMenuClk")>-1){
								//根据模块打开
								eval("window.parent."+murl);
							}else{
							//}else if((murl||"").indexOf("/document.jsp")==-1){ //考虑所有的其它JSP情况,不只是document.jsp mdf by jc 20100916
								//根据URL打开
								try{
									var iframeid = "ifram_" + window.parent.ucapCommonFun.getRandomString();
									window.parent.$(ucapSession.ucapViewId).innerHTML = 
										window.parent.ucapCommonFun.getIframeHtml(murl, iframeid,window.parent.ucapSession.middleHeight);
									if(window.parent.$(iframeid))window.parent.$(iframeid).src = murl;
								}catch(e){}
							}
						}
					}catch(e){
						alert("当前页面不提供关闭方法");
					}
				}else{
					//关闭当前打开的页签
					if(openST!="02"){
						try{
							if(window.parent && window.parent.viewTabs && window.parent.viewTabs.tabs)
								window.parent.viewTabs.tabs.remove(window.parent.viewTabs.tabs.getActiveTab());
						}catch(e){
							alert("界面方案配置不正确，无法正常关闭！");
						}
							//关闭所有打开的页签
//							window.parent.viewTabs.tabs.items.each(function(c,i) {
//				                    	window.parent.viewTabs.tabs.remove(c);
//			                });
					}else{
						try{
							window.parent.initView(window.parent.view.viewId,window.parent.ucapSession.ucapViewId);
						}catch(e){
							alert("当前页面不提供关闭方法");
						}
					}
				}
			}
	}
	//end 提取和封装 关闭 页签
	
	if (window.parent){
		if (window.parent.ucapSession.docWin){
			//window.parent.ucapSession.docWin.close();
			//modify by jc使三级界面在window下打开时再弹出DIV对话框后，再关闭当前三级界面可以用
			if(window.opener){
				window.close();
			}else{
				var us = window.parent.ucapSession;
				if(us && us.docWin){
					us.docWin.close();
					//支持二级弹出文档的关闭 mdf by jc 20110112
					var len = us.docWins.length;
					if(len>0)
						us.docWin = us.docWins[len-1];
					//add by cguangcong@linewell.com 2012-4-25
					closeTab();
				}
			}
		}else if(window.top==window.self){
			window.close();
		}else{
			//mdf  by cguangcong@linewell.com 2012-4-25
			closeTab();
		}
	} else {
		window.close();
	}
}
/**
 * 加载表单
 */
_UcapForm.ucapForm = function(){
	//标识主表单数据是否加载完毕放入缓存中
	var loadMain = false;
	//配置变量
	var cfg = _UcapForm.cfg;
	//表单工具
	var tool = _UcapForm.tool;
	//主表单UNID，如果是显示表单则转换成表单,主要用于设置从表提交给后台的main参数
	var mainUnid = null;
	/**
	 * returnForm此函数的调用方法是：
	 * _UcapForm.ucapForm(unid,type,formId,isTab,isReload);
	 * 目前在document.jsp页面中调用
	 * @param unid
	 * @param type
	 * @param formId
	 * @param isTab
	 * @param isReload
	 */
	var returnForm = function(unid,type,formId,isTab,isReload){
		//_UcapForm.ucapForm对外开放的函数对象
		//根据传进来的参数与后台交互返回表单json数据集
		//tool.setCfgStr(unid,type,id);
		//根据表单类型加载不同的JSP模板,分为有tab的【组合表单】和无tab的【表单、显示表单】
		var mainDiv = _UcapForm.mainDiv;
		//如果mainDiv存在则采用默认的方式渲染DIV框架并且与后台进行交互
		if(Ext.fly(mainDiv)){
			switch(type){
				case "01":tool.complieTmp(cfg.jspTmpStr.form,mainDiv,cfg.jspTmpStr.formJson);break;
				case "02":tool.complieTmp(cfg.jspTmpStr.form,mainDiv,cfg.jspTmpStr.formJson);break;
				case "03":{
					if(!$("showBox"))
						tool.complieTmp(cfg.jspTmpStr.composeForm,mainDiv,cfg.jspTmpStr.composeFormJson);
					break;
				}
			}
			//加载模板后执行以下加载表单JSON数据的操作
			returnForm.initAjax(unid,type,formId,isTab,isReload);
		}
	};
	returnForm.getMainUnid = function(){return mainUnid;};//对外开放主表单
	returnForm.otherFormData=function(){return null};
	//表单【字段、表单的按钮】
	//显示表单【字段、显示表单的按钮】
	//组合表单【tab集、字段、组合表单的按钮、显示表单、表单】
	//根据不同的【表单类型、表单标识】获取相应的按钮集
	//根据不同的【表单类型、表单标识】获取相应的字段集
	returnForm.initForm = function(json,type,renderto,rowNum,poxName){
		//tool.setCfgJson(json,rowNum);
		type = type||cfg.curFormType;
		switch(type){
			case "01":tool.form(null,json["uiItemList"],renderto,rowNum,poxName);break;
			case "02":tool.formShow(null,json["uiItemList"],renderto,rowNum,poxName);break;
			case "03":{
				if(tool.composeForm()==true){
					//组合表单默认打开的页签 add by jc 20100810
					var defTabIndex = (json.composeForm?json.composeForm.defaultTabIndex:0);
					defTabIndex = defTabIndex<0?0:defTabIndex;
					//默认打开第一个页签
					this.selectTag(defTabIndex);
				}
				break;
			}
		}
		//加载按钮,第一次交互时加载按钮进来
		if(!loadMain)tool.setButton();
		//alert(Ext.encode(cfg.form));
		return this;
	};
	/**
	 * 根据表单类型、表单ID等参数加载表单JSON数据的操作
	 * @param unid 旧文档UNID
	 * @param type 主表单类型
	 * @param formId 主表单UNID
	 * @param isTab 是否加载子按钮
	 * @param isReload 是否重新加载标识
	 * @param isAjax 是否与后台交互加载数据
	 * 以下逻辑用于渲染视图预览
	 * @param curViewId 当前视图
	 * @param renderto 渲染对象
	 * 以下逻辑用于渲染视图表单列表
	 * @param rowNum 视图中的记录索引
	 * @param poxName 字段扩展后缀
	 */
	returnForm.initAjax = function(unid,type,formId,isTab,isReload,isAjax,curViewId,renderto,rowNum,poxName){
		if(null==curViewId){
			//视图预览中需要进行将下列值设置为空串 add by jc 20100607
			rowNum = "";
			poxName="";
		}
		//将当前交互的对象unid,type,formId进行保存设置
		tool.setCfgStr(unid,type,formId);
		//从全局中查找是否已经加载过数据
		var json = _UcapForm.handler.getFormById(formId+(rowNum||""));
		if(cfg.docTitle[formId]){
			//设置文档标题
			if (window.parent && window.parent.ucapSession.docWin){				
				window.parent.ucapSession.docWin.setTitle(ucapSession.win.winImg+cfg.docTitle[formId]);
			} else {
				Ext.getDoc().dom.title = cfg.docTitle[formId]||"";
				var tabs = window.top.viewTabs.tabs;
				if(tabs && tabs.getActiveTab()){
					tabs.getActiveTab().setTitle(cfg.docTitle[formId]||"");
				}
			}
		}
		if(!isAjax && json){
			//不与后台交互，直接从缓存中读取数据加载
			if(!isReload){
				//打开标签时如果是主文档则初始化组合表单里面的主文档数据
				if(!loadMain && formId==cfg.mainUnid){
					this.initForm(json,type,renderto,rowNum,poxName);
					loadMain = true;
				}
				return;
			}else{
				this.initForm(json,null,renderto,rowNum,poxName);
				return;
			}
		}
		//与后台交互，并将json对象初始化为空
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
				((!isTab)?"&subButton=0":"")+((!unid)?"&isNew=1":"")+
				((mainUnid && formId!=mainUnid)?"&main="+mainUnid:"")+flowParm;
		//alert(ps);
		if(!cfg.otherAction){
			//mdy by llp 2009-7-31
			cfg.otherAction = ucapSession.baseAction; 
		}
		
		/**
		 * 以下将表单请求改成同步获取
		 * 原因：测试表单视图列表在异步状态下加载数据不稳定，
		 * 经常无法成功加载数据及渲染数据
		 * mdf by jc 20100528
		 */
		
		var url = cfg.otherAction+"?"+ps;
		url+="&"+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.decode(conn.responseText);
		
//		var requestConfig = {
//			id:_UcapForm.mainDiv,
//			url:cfg.otherAction,
//			params:ps,
//			callback:function(options,success,response){
//				if (success){
//					json = Ext.decode(response.responseText);	
					try{
						var exResult=ucapCommonFun.dealException(json);
						if(!exResult)return;
						//add by jc
						_UcapForm.tool.doTopMenu();
						_UcapForm.cfg.belongAppUnid=json.belongAppUnid;//yjy 2010-7-27 add
						//alert(Ext.encode(json["formShow"]));
						//alert(Ext.encode(json["isRead"]));
						//alert(Ext.encode(json["uiItemList"]));
						var key = formId;//表单标识或显示表单标识，不会是组合表单标识
						//以下逻辑为从不同的表单类型取表单UNID的逻辑
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
								//主表单为显示表单时取组合表单中显示表单中的表单UNID
								mainUnid = json["form"]["unid"];
							}else{
								//主表单为表单时，直接取组合表单中配置的主表单UNID
								mainUnid = json["composeForm"]["mainFormId"];
							}
							key = json["composeForm"]["mainFormId"];
							cfg.formHtmlUrl = json.formHtmlUrl;
						}else{
							//非组合表单设置主表单为表单UNID mdf by jc 20100629
							if(mainUnid==null && null==curViewId){
								mainUnid=json["form"]["unid"];
								cfg.formHtmlUrl = json.formHtmlUrl;
							}
						}
						
						//设置按钮区的文档标题add by jc 20100511
						cfg.formDocTitle = json["formDocTitle"];
						//当主表单为显示表单时，JS全局缓存的Key为显示表单的UNID
						//else if(type=="02"){
							//取显示表单中的表单UNID
							//key = json["form"]["unid"];
						//}
						//加到JS全局缓存中
						//alert("增加到缓存中："+type+"::"+key);
						if(curViewId){
							//加载到视图表单列表全局
							_UcapForm.handler.addViewForm(curViewId,json);
						}else{
							//加载到表单全局
							_UcapForm.handler.addForm(key,json);
						}
						//只有与后台交互才设置配置信息 mdf by jc 20100609
						tool.setCfgJson(json,rowNum);
						//加载表单
						returnForm.initForm(json,type,renderto,rowNum,poxName);
						
					}catch(e){
						returnForm.error(_UcapForm.mainDiv,'加载表单信息失败,请与管理员联系!');
					}
//				}else{
//					returnForm.error(options.id,'加载表单信息失败,请与管理员联系!');
//				}
//			}
//		}
//		Ext.Ajax.request(requestConfig);
	};
	/**
	 * n当前单击的是页签序号
	 * selfObj  单击对象this
	 * isReload是否从全局中重置表单数据
	 * isAjax是否与后台交互获取数据
	 * 增加各种页签类型的重新刷新功能 mdf by jc 20100720
	 */
	returnForm.selectTag = function (n,selfObj,isReload,isAjax){
		//if(n==-1 && selfObj){
			//n = selfObj.getAttribute("n");
		//}
		// 操作内容 
		var oDiv = Ext.query("div[main=#]","showTabBody");
		//以下进行页签DIV的显示与隐藏，放在渲染前面使三级界面的视图高度控制不会出现异常
		var tag = Ext.query('li',"showMenu"); 
		for(var i=0; i<tag.length; i++){ 
			tag[i].className = ""; 
		} 
		tag[n].className = "showMenuHover";
		for(i=0;i<oDiv.length; i++){ 
			if(i==n)oDiv[n].style.display = "block";
			else oDiv[i].style.display = "none";
		} 
		//以下进行页签DIV内容是渲染
		try{
			var types = ucapCommonFun.getAttr(oDiv[n],"types").split(",");
			var contents = ucapCommonFun.getAttr(oDiv[n],"contents").split(",");
			var unid = ucapCommonFun.getUrlParameter("unid");
			var mid = _UcapForm.cfg.mainUnid;//组合表单中配置的主表单UNID
			var mainForm = _UcapForm.handler.getFormById(mid);
			if(!unid)unid=mainForm.unid;
			//alert(types[0]+":"+contents[0]);
			for(var i=0;i<types.length;i++){
				var t = types[i];
				var divId = (!contents[i] || t=="08" || t=="09")?oDiv[n].id:pfx_ucap+contents[i];
				var oFlwDiv = Ext.getDom(divId);
				switch(t){
					case "03" :{//视图
						if(!unid && i==0){
							alert("请先保存再打开视图");
							return;
						}
						_UcapForm.handler.addView(contents[i],contents[i]);
						//将URL上需要覆盖的参数清空
						//将流程的参数清空，modify by zhua 2010-09-7
						var parm = location.href.replace(/(^[^?]*\?)|(&fformUnid=)[\w]*|(&funid=)[\w]*|(&flowid=)[\w]*|(&nodeid=)[\w]*|([&]?unid=)[\w]*/ig,"");
						//alert(parm+"&fformUnid="+cfg.mainUnid+"&funid="+unid);
						if(isReload || isAjax){//是否重新加载视图 add by jc 20100720
							oFlwDiv.innerHTML = "";
						}
						//非第一次打开时加载视图数据,组装新的参数
						if(oFlwDiv.innerHTML==""){
							initJspView(contents[i],divId,"unid="+unid+"&"+parm+"&fformUnid="+_UcapForm.cfg.mainUnid+"&funid="+unid,true,true,true);
						}else{
							//进行对视图进行宽度与高度的控制,window.onresize具体函数在document.jsp中赋值
							window.onresize(divId);
						}
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
						var flowUnid =  ucapGetUrlParameter("flowid");
						//流程实例标识可放在流程监控中进行获取 mdy by llp 2010-05-12
						//if(!instanceUnid){
							//alert("系统提示：非流程文档无监控信息!");
							//return;
						//}
						var src = appPath+"CreateImage?";
						src+="docUnid="+unid;
						src+="&instanceUnid="+instanceUnid
						src+="&flowUnid="+flowUnid+"&"+ucapCommonFun.getRandomString();
						if(oFlwDiv.firstChild.innerHTML=="" && unid){
							_UcapForm.tool.complieTmp(_UcapForm.cfg.htmlTmpStr.ucap_img,oFlwDiv.firstChild,{"id":"ucap_img","src":src});
						}
						//alert(oFlwDiv.firstChild.innerHTML);
						//alert(oFlwDiv.innerHTML);
						break;
					case "07"://打开JSP
						var sUrl = appPath+contents[i];						
						var reload = isReload || isAjax || ucapCommonFun.isReload(sUrl);
						if(Ext.getDom(divId).innerHTML=="" || reload){
							//oDiv[n].style.display = "block";
							var el = Ext.get(divId);
							var mgr = el.getUpdater();
							var parm = location.href.replace(/^[^?]*\?/,"");
							if(sUrl.indexOf("?")>=0){
								sUrl+="&"+parm; //modify by zh 2010-5-12
							}else{
								sUrl+="?"+parm;
							}
							mgr.update({
						        url: sUrl,
						        //params:parm,
						        scripts:true
							});
						}
						break;
					case "08":{//普通附件
						var _div08 = Ext.query("div[types=08]",oFlwDiv)[0];
						if(isReload || isAjax)_div08.innerHTML="";
						if(!_div08.innerHTML && unid){
							//modify by jc 20100304
							ucap_attr_fun.getAttr(contents[i],_div08,unid);
						}
						break;
					}
					case "09":{//模板配置
						var _div09 = Ext.query("div[types=09]",oFlwDiv)[0];
						if(isReload || isAjax)_div09.innerHTML="";
						if(!_div09.innerHTML && unid){
							//modify by jc 20100304
							ucap_attr_fun.getAttrCfg(contents[i],_div09,unid);
						}
						break;
					}
					case "10":{//表单设计器 modify by lliangjian@linewell.com 2011-08-22
						if(!ucapCommonFun.getUrlParameter("unid")){
							alert("请先保存表单基本信息再打开表单设计器");
							this.selectTag(0,null,isReload,isAjax);
							return;
						}
//						var sUrl = appPath+"formDesigner/FormDesigner.jsp";
						var sUrl = appPath+"formDesigner/FormDesigner.jsp";
						var reload = isReload || isAjax || ucapCommonFun.isReload(sUrl);
						if(oFlwDiv.firstChild.innerHTML=="" || reload){
							var el = oFlwDiv.firstChild;
							var parm = location.href.replace(/^[^?]*\?/,"");
							if(sUrl.indexOf("?")>=0){
								sUrl+="&"+parm;
							}else{
								sUrl+="?"+parm;
							}
							el.innerHTML="<iframe id='content' name='content' src='" + sUrl + "' style='width:100%;height:100%'/>";
						}
						break;
					}
					default:{//表、显示表单【01,02】
						//unid,type,formId,isTab,isReload,isAjax
						this.initAjax(unid,t,contents[i],true,isReload||0,isAjax||0);
					}
				}
			}
		}catch(e){}
		
		
	};
	returnForm.templateCfg = function(sType,punid,docType,split){
		//,批量上传总大小为'+ucapHeader.attrFileSizeMax+'M//mdf by jc 20100720已经不存在批量上传的概念,因为都是独立上传 yjy 2010-7-31 取错了
		var sizeMaxHtml = '<span class="red">&#160;&#160;&#160;&#160;说明：单个上传大小限制为'+ucapHeader.attrFileSizeMax+'M</span>';
		var ucap_upload = "ucap-upload-div";
		var addFileIframe = function(){
        	//在最后追加一个iframe
    		var url = appPath+'plus/fileUpload.jsp?docType='+docType+'&split='+(split||"")+'&sType='+sType+'&punid='+(punid||"")+"&"+ucapCommonFun.getRandomString();
    		//窗口发生变化时,iframe属性为ucapAutoHeight!=no的所有iframe高度自适应,mdf by jc 20100716
    		var ifr = Ext.get(ucap_upload).insertHtml('beforeEnd',
    			'<iframe ucapAutoHeight="no" isUpload="false" id="ucap-file-upload-iframe" src="'+url+'" frameborder="0" scrolling="no" width="100%" height="60"></iframe>'
    			,true);
    		//每次单击过增加,让滚动条滚动到最下面 mdf by jc 20100715
    		$(ucap_upload).scrollTop = 2000;
   		};
		var win = new Ext.Window({
			id	:	"ucap_win_templatecfg",
		    title  :ucapSession.win.winImg+'文件上传',
		    width:430,
		    height:300,
		    closable:true,
		    //autoScroll:'auto',
		    plain: true,
		    modal:true,
		    bodyStyle:"background-color:#FFF;",
		    //autoLoad:{url:appPath+'plus/fileUpload.html?'+ucapCommonFun.getRandomString(),scripts:true,nocache: true},
		    html:sizeMaxHtml+'<div id="'+ucap_upload+'" style="background-color:#FFF;width:100%;height:92%;overflow-y:auto"></div>',
		    buttons: [{
		    	id:'addUploadButton',
		        text: '增加',
		        handler: addFileIframe
		   		},
		    	{
		    	id:'uploadButton',
		        text:'开始上传',
		        type:'submit',
		        //disabled:true,
		        handler:function(){
		        	//遍历所有符合条件的iframe进行上传
		        	var fileIframes = Ext.query("iframe[isUpload=false]");
		        	Ext.each(fileIframes,function(fileIframe){
		        		//执行iframe中的文件上传
		        		ucapCommonFun.setAttr(fileIframe,"isUpload","auto");
		        	});
		        	var runner = new Ext.util.TaskRunner();
		        	var task = {
					    run: function(){
					    	var fileIframes = Ext.query("iframe[isUpload=auto]");
					    	if(fileIframes[0])fileIframes[0].contentWindow.file_upload();
					    	if(fileIframes.length<1){
					    		runner.stopAll();
					    	}
					    },
					    interval: 1000 //1 second
					}
					
					runner.start(task);
		        }
		    },{
		    	id:'cancelUploadButton',
		        text: '关闭',
		        handler: function(){
		            win.close();
		            ucap_attr_fun.getInfo(docType,punid);
		        }
		    }
		    ]
		});
		win.show();
		addFileIframe();
	};
	//add by llj 20100902
	returnForm.showUpload = function(sType,punid,docType,split){
		//在别人的浏览器上还是会显示出地址栏和状态栏，这是微软要防止钓鱼网站而设定的，没办法，不过把站点加到本地Internet就可以了。
		/*window.showModalDialog(appPath+"plus/flashUpload/FlashUpLoad.jsp?"
					+"docType="+docType
					+"&mainUrl="+escape(appPath)
					+"&fileSizeMax="+ucapHeader.attrFileSizeMax
					+"&fileTotalSizeMax="+ucapHeader.attrSizeMax
					+"&sType="+sType
					+"&punid="+(punid||"")
					+"&"+ucapCommonFun.getRandomString(),
			window,
			//"dialogHeight:545px;dialogWidth:528px;status:0;help:no"          //IE6用的大小,360用的宽度
			"dialogHeight:500px;dialogWidth:522px;status:0;help:no"				//IE8用的大小
		);
		ucap_attr_fun.getInfo(docType,punid);	//刷新上传文件列表*/
		appUnid = ucapCommonFun.getUrlParameter("belongToAppId")
		if("undefined" == appUnid || null == appUnid || "" == appUnid){
			appUnid = ucapSession.appUnid;
			
		}
		var url = appPath+"plus/flashUpload/FlashUpLoad.jsp?"
					+"docType="+docType
					+"&split="+(split||"")
					+"&mainUrl="+escape(appPath)
					+"&fileSizeMax="+ucapHeader.attrFileSizeMax
					+"&fileTotalSizeMax="+ucapHeader.attrSizeMax
					+"&sType="+sType
					+"&punid="+(punid||"")
					+"&appUnid="+appUnid
					+"&"+ucapCommonFun.getRandomString();
		var win = new Ext.Window({
			id:"ucap_win_showUpload",
		    width:globalVariables.flashUploadWidth || 562,
		    height:globalVariables.flashUploadHeight || 450,//附件上传firefox出现滚动条
		    resizable:false,
		    closable:false,
		    header:false,
		    border:false,
		    bodyBorder:false,
		    hideBorders:true,
		    plain: true,
		    modal:true,
		    bodyStyle:"background-color:#FFF;",
		    html:"<iframe id='uploadIframe' src='"+url+"' width=100% height=100%/>"/*,
		    buttons: [{
		    	id:'closeButton',
		        text: '关闭',
		        handler: function(){
		            win.close();
		            ucap_attr_fun.getInfo(docType,punid);
		        }
		    }]*/
		});
		win.show();
		//return win;
	}
	//end add
	
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
	defaultAttrTypes:"附件|正文|办理单",
	attrTypes:"",
	/**
	 * s格式为：|内容|内容
	 * @param {} s
	 * @return {}
	 */
	setAttrTypes:function(s,b){
		s = s||"";
		if(b)
			this.attrTypes = s;
		else
			this.attrTypes = this.defaultAttrTypes+s;
	},
	/**
	 * 单一附件权限验证结合文档权限
	 * @param {} arg 权限类型名称标识
	 * @return {} 返回true代表禁止操作
	 */
	checkAP : function(arg){
		var _r = _UcapForm.cfg.isRead;//文档只读状态
		var ap = _UcapForm.cfg.attrPopedom;//文档操作权限
		//-1以文档状态显示,0禁止,1允许
		var c = ""+ap[arg];
		var re = (c=="-1")?(_r=="0"):(c=="0");
		return re;
	},
	/**
	 * 获取附件列表
	 * @param {} content 其它类型
	 * @param {} _div08 DIV窗口内容
	 * @param {} unid 文档标识
	 */
	getAttr:function(content,_div08,unid){
		try{
			this.setAttrTypes(content||"附件",true);
		}catch(e){}
		var punid = unid,docType = 0;//普通附件
		var panel = new Ext.Panel({
			//title: '模板配置列表',
			//width:800,
			autoHeight:true,
			tbar: [
				 {text: '刷新',handler: function(){ucap_attr_fun.getInfo(docType,punid);}},
	             {text: '上传附件',handler:function(){
            			var sType=3;
            			//_UcapForm.ucapForm.templateCfg(sType,punid,docType);
            			_UcapForm.ucapForm.showUpload(sType,punid,docType);
          		  },
          		  hidden:this.checkAP("upload")
          		  }
	        ],
	        html:'<div id="ucap_attr_div'+docType+'"></div>',
	    	autoScroll:true,
	        //autoLoad:{url:appPath+"testjc.html",scripts:true,nocache: true},
		    renderTo: _div08
		});
		
		this.getInfo(docType,punid);
	},
	/**
	 * 获取模板配置列表
	 * @param {} content 其它类型
	 * @param {} _div09 DIV窗口内容
	 * @param {} unid 文档标识
	 */
	getAttrCfg:function(content,_div09,unid){
		var punid = unid,docType = 1;//模板配置
		var panel = new Ext.Panel({
			//title: '模板配置列表',
			//width:800,
			tbar: [
				 {text: '刷新',handler: function(){ucap_attr_fun.getInfo(docType,punid);}},
	             {text: '上传正文',handler: function(){
	                	var sType=0;
	                	ucap_attr_fun.setAttrTypes("正文",true);
	                	//alert(ucap_attr_fun.attrTypes);
	                	//_UcapForm.ucapForm.templateCfg(sType,punid,docType);
	                	_UcapForm.ucapForm.showUpload(sType,punid,docType);
	                },
	                hidden:this.checkAP("uploadStraightMatter")},
	            {text: '上传办理单',handler: function(){
	                	var sType=1;
	                	ucap_attr_fun.setAttrTypes("办理单",true);
	                	//alert(ucap_attr_fun.attrTypes);
	                	//_UcapForm.ucapForm.templateCfg(sType,punid,docType);
	                	_UcapForm.ucapForm.showUpload(sType,punid,docType);
	                },
	                hidden:this.checkAP("uploadTransaction")},
	            {text: '上传附件',handler:function(){
            			var sType=3;
            			ucap_attr_fun.setAttrTypes(content||"",true);
            			//alert(ucap_attr_fun.attrTypes);
            			//_UcapForm.ucapForm.templateCfg(sType,punid,docType);
            			_UcapForm.ucapForm.showUpload(sType,punid,docType);
          		  },
	                hidden:this.checkAP("upload")}
	            ,{text: '删除',handler:function(){
            			var rows = ucap_attr_fun.getSelectedAttrRows();
	 					if(rows==null){
	 						Ext.Msg.alert("系统提示","至少选择一个要删除的附件！");
	 						return;
	 					}
	 					var attrUnid = "";
	 					for(var i=0;i<rows.length;i++){
	 						attrUnid += rows[i].data["unid"]+",";
	 					}
            			ucap_attr_fun.delFile(docType,attrUnid,punid);
          		  },
	                hidden:this.checkAP("del")}
	        ],
	        html:'<div id="ucap_attr_div'+docType+'"></div>',
	    	autoScroll:true,
	        //autoLoad:{url:appPath+"testjc.html",scripts:true,nocache: true},
		    renderTo: _div09
		});
		
		this.getInfo(docType,punid);
	},
	/**
	 * 获取附件、模板配置数据内容
	 * @param {} docType 附件类型
	 * @param {} punid 文档标识
	 */
	getInfo : function(docType,punid,appUnid){
		if(!appUnid){
			appUnid = ucapCommonFun.getUrlParameter("belongToAppId")
			if("undefined" == appUnid || null == appUnid || "" == appUnid){
				appUnid = ucapSession.appUnid;
				
			}
		}
		var requestUrl = appPath+'GetAttrInfo?act=info&docType='+docType
							+'&punid='+punid
							+'&appUnid='+appUnid
							+'&type=-1&'+ucapCommonFun.getRandomString();
		Ext.Ajax.request({
			url:requestUrl, 
			success : function(a) { 
				Ext.getDom("ucap_attr_div"+docType).innerHTML="";
				var jsonData = Ext.decode(a.responseText);
				var data = [];
				if(a.responseText!="[null]")
				for(var jd=0;jd<jsonData.length;jd++){
					var _d=[];
					var jdd = jsonData[jd];
					var maxSize=50;//(上限默认maxSizeM以上的文件，不能直接查看文件，只能先下载再查看)
					if(globalVariables&&globalVariables.review_attr_max){
						maxSize=globalVariables.review_attr_max;
					}
					//ucap_attr.openDownloadAttr(\''+docType+'\',\''+(jdd["unid"]||jdd["cfgUnid"])+'\',\''+(_d[1]||"").replace(/['"\/\\]/g,"")
					_d[0] = jdd["caption"]?('<a href="javascript:void(0);" onclick="ucap_attr.openDownloadAttr(\''+docType+'\',\''+(jdd["unid"])+'\',\''+(jdd["fileName"]||"").replace(/(\w*:[\\|\/]\w*[\\|\/])/ig,"").replace(/['"\/\\]/g,"")+'\')">'+jdd["caption"]+'&#160;</a>'):
							('<a href="javascript:void(0);" onclick="ucap_attr.onconfig(\''+jdd["cfgUnid"]+'\')">'+jdd["cfgCaption"]+'&#160;</a>');
							//解决多级路径的替换问题 mdf by jc 20110212 
					_d[1] = (jdd["fileName"]||jdd["cfgFileName"]).replace(/(\w*:[\\|\/]*\w*[\\|\/])/ig,"").replace(/(\w*[\\|\/])*/ig,"");
					_d[2] = jdd["type"]||jdd["cfgType"];;
					switch(_d[2]){
						case "0":_d[2]="正文";break;
						case "1":_d[2]="办理单";break;
						case "2":_d[2]="附件";break;
						//default : _d[2]="其它";break;
					}
					_d[3] = (parseInt((jdd["size"]||jdd["cfgSize"])/1024/10.24)/100)||0.01;
					if(_d[3]>=maxSize){//文件大小超过设置的上限，不允许直接查看文件
						_d[0] = jdd["caption"]?('<a href="javascript:void(0);" title="文件大小超过'+maxSize+'M，请先下载再查看">'+jdd["caption"]+'&#160;</a>'):
							('<a href="javascript:void(0);" onclick="ucap_attr.onconfig(\''+jdd["cfgUnid"]+'\')">'+jdd["cfgCaption"]+'&#160;</a>');
					}
					_d[4] = jdd["created"]||jdd["cfgCreated"];
					_d[5] = "";
					if(!ucap_attr_fun.checkAP("down")){
						//alert(maxSize+"----"+globalVariables.review_attr_max);
						if(_d[3]>=maxSize){//文件大小超过设置的上限，不允许直接查看文件
							_d[5] += '<a disabled="disabled"   title="文件大小超过'+maxSize+'M，请先下载再查看">查看</a>&#160;&#160;';
						}else{
							_d[5] += '<a href="javascript:void(0);" onclick="ucap_attr.openDownloadAttr(\''+docType+'\',\''+(jdd["unid"]||jdd["cfgUnid"])+'\',\''+(_d[1]||"").replace(/['"\/\\]/g,"")+'\')">查看</a>&#160;&#160;';
						}
						_d[5] += '<a href="javascript:void(0);" onclick="ucap_attr_fun.downFile(\''+docType+'\',\''+(jdd["unid"]||jdd["cfgUnid"])+'\')">下载</a>&#160;&#160;';
					}
					if(!ucap_attr_fun.checkAP("del")){
						_d[5] += '<a href="javascript:void(0);" onclick="ucap_attr_fun.delFile(\''+docType+'\',\''+(jdd["unid"]||jdd["cfgUnid"])+'\',\''+(jdd["punid"]||jdd["cfgPunid"])+'\')">删除</a>';
					}
					_d[6] = (jdd["unid"]||jdd["cfgUnid"]);
					_d[7] = (jdd["punid"]||jdd["cfgPunid"]);
					_d[8] = jdd["belongToApp"];
					_d[9] = (jdd["creator"]||"");//获取附件上传者 add by cguangcong@linewell.com 2011-10-10
					_d[10] = (jdd["belongToNode"]||"");//所属节点Id
					_d[11] = (jdd["belongToNodename"]||"");//上传环节名称
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
			       {name: '操作'},
			       {name: 'unid'},
			       {name: 'punid'},
			       {name: 'belongToApp'},
				   {name: '上传者'},
				   {name: 'belongToNode'},
				   {name: '上传环节'}
			    ]);
			    var sm = new xg.CheckboxSelectionModel();
			    var grid2 = new xg.GridPanel({
			    	id:"ucap_attr_grid",
			        store: new Ext.data.Store({
			            reader: reader,
			            data: data
			        }),
			        viewConfig: {
			            forceFit:true
			        },
			        cm: new xg.ColumnModel([
			        	new xg.RowNumberer(),
			        	sm,
			        	{id:'unid',header: "主键", width: 10, sortable: true, dataIndex: 'unid',hidden:true},
			        	{id:'punid',header: "外键", width: 10, sortable: true, dataIndex: 'punid',hidden:true},
			        	{id:'belongToApp',header: "所属系统", width: 10, sortable: true, dataIndex: 'belongToApp',hidden:true},
						{id:'belongToNode',header: "所属节点", width: 10, sortable: true, dataIndex: 'belongToNode',hidden:true},
			            {id:'caption',header: "文件标题", width: 200, sortable: true, dataIndex: '文件标题'},
			            {id:'fileName',header: "文件名称", width: 150, sortable: true, dataIndex: '文件名称'},
			            {id:'type',header: "类型", width: 50, sortable: true, dataIndex: '类型'},
			            {id:'size',header: "文件大小(M)", width: 80, sortable: true, dataIndex: '文件大小(M)'},
						{id:'creator',header: "上传者", width: 100, sortable: true, dataIndex: '上传者'},
						{id:'belongToNodename',header: "上传环节", width: 100, sortable: true, dataIndex: '上传环节'},
			            {id:'created',header: "上传时间", width: 100, sortable: true, dataIndex: '上传时间'},
			            {header: "操作", width: 80, sortable: true, dataIndex: '操作'}
			        ]),
			        sm: sm,
			        bodyStyle:'width:100%',
	    			autoWidth:true,
	    			//frame:true,
			        renderTo: Ext.getDom("ucap_attr_div"+docType)
			    });
			 }
		});
	},
	/**
	 * 返回附件的Ext.grid对象
	 * @return {}
	 */
	getAttrGrid:function(){
		var grid = Ext.getCmp("ucap_attr_grid");
		return grid;
	},
	/**
	 * 返回选中的所有附件行对象，e.g
	 * var rows = ucap_attr_fun.getSelectedAttrRows();
	 * if(rows==null)return;
	 * var unid = rows[0].data["unid"];
	 * @return {} 返回选中的所有附件行对象，不存在返回null;
	 */
	getSelectedAttrRows:function(){
		var grid = this.getAttrGrid();
		if(grid && grid.getSelectionModel()){
			var rows = grid.getSelectionModel().getSelections();
			return rows;
		}else{
			return null;
		}
	},
	/**add by cjianyan@linewell.com 2011-4-26
	 * 附件下载时，扩展此方法，用于下载时，记录日志
	 * @param {} json
	 */
	afterDownFileFun : function(json) {
	},
	/**
	 * 附件下载
	 * @param {} docType 附件类型
	 * @param {} unid 附件标识
	 */
	downFile:function(docType,unid,appUnid){
		if(this.checkAP("down")){
			alert("操作权限不足,下载失败!");
			return;
		}
		if(!appUnid){
			appUnid = ucapCommonFun.getUrlParameter("belongToAppId")
			if("undefined" == appUnid || null == appUnid || "" == appUnid){
				appUnid = ucapSession.appUnid;
				
			}
		}
		var requestUrl = appPath+'GetAttrInfo?act=down&docType='+docType
							+'&unid='+unid
							+'&appUnid='+appUnid
							+'&type=-1&'+ucapCommonFun.getRandomString();
		window.open(requestUrl);
		// add by cjianyan@linewell.com 2011-4-26
		var json = "{\"unid\":\""+unid+"\",\"appUnid\":\""+appUnid+"\",\"docType\":\""+docType+"\",\"isFlag\":0}";
		json = Ext.decode(json);
		ucap_attr_fun.afterDownFileFun(json);
		// end
	},
	/**
	 * 附件删除
	 * @param {} docType 附件类型
	 * @param {} unid 附件标识
	 * @param {} punid 文档标识
	 */
	delFile:function(docType,unid,punid,appUnid){
		if(this.checkAP("del")){
			alert("操作权限不足,删除失败!");
			return;
		}
		Ext.Msg.confirm("系统提示","警告:删除后将无法恢复！您确定要删除文件？",
		function(flag){
			if(flag=="yes"){
				if(!appUnid){
					appUnid = ucapCommonFun.getUrlParameter("belongToAppId")
					if("undefined" == appUnid || null == appUnid || "" == appUnid){
						appUnid = ucapSession.appUnid;
						
					}
				}
				var requestUrl = appPath+'AttrUpload?docType='+docType+'&unid='+unid+'&stateType=3&'
							+'&appUnid='+appUnid
							+'&'+ucapCommonFun.getRandomString();
				Ext.Ajax.request({
					url:requestUrl, 
					success : function(a) { 						
						ucap_attr_fun.getInfo(docType,punid);
						//add by cjianyan@linewell.com 2011-5-5 删除日志记录
						var json = "{\"unid\":\""+unid+"\",\"appUnid\":\""+appUnid+"\",\"docType\":\""+docType+"\",\"isFlag\":2}";
						json = Ext.decode(json);
						ucap_attr_fun.afterDownFileFun(json);
						//end
					 }
				});
			}
		});
	}
}
/**
 * 表单基础函数
 * @type 
 */
var _UcapFormFun = {
	/**
	 * 保存并新增或修改并新增(非流程)
	 */
	reloadWinHref:function(){
		var href = window.location.href.replace(/(\?unid\=\w*)/,"?unid=");
		href = href.replace(/(\&unid\=\w*)/,"&unid=");
		//流程的新增不需要流程实例参数&instanceUnid=
		if(href.indexOf("?instanceUnid=")>-1 || href.indexOf("&instanceUnid=")>-1){
			//href = href.replace(/(\?instanceUnid\=\w*)/,"&unid=");
			//href = href.replace(/(\&instanceUnid\=\w*)/,"&unid=");
			ucapCommonFun.newFlowDoc();
			//alert("流程文档暂不支持保存并新增");
			return;
		}
	    window.location.href = href;
	},
	allValidatorFormJson:{},
	getValidatorFormJson:function(formUnid,formType){
		if(this.allValidatorFormJson[formUnid])return this.allValidatorFormJson[formUnid];
		var pars = "?type=getValidatorForm&formUnid="+formUnid+"&formType="+formType;
		var url = ucapSession.baseAction+pars;
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
//		alert(conn.responseText);
		var items = (Ext.decode(conn.responseText)||{}).items||[];
		var json = {};
		for(var i=0;i<items.length;i++){
//			if(items[i].itemShow)
				json[items[i].nameEn]=items[i].itemShow;
				if(json[items[i].nameEn])
					json[items[i].nameEn].nameCn=items[i].nameCn;
		}
		this.allValidatorFormJson[formUnid]=json;
		return json;
	},
	/**
	 * 获取表单页面URL
	 * @return {}
	 */
	getHtmlFile:function(isRead){
		//从FormAction中获取表单内容 modify by jc 20110310
		var htmlUrl = "",fileName = "";
		var systemPath = "";
		var appUnid = ucapCommonFun.getUrlParameter("belongToAppId") || ucapSession.appUnid || "";
		//平台表ucap_开头的表路径用system
	 	var nameEnObj = $("form_name_en");
		if(nameEnObj && nameEnObj.value.toLowerCase().indexOf("ucap_")==0){
			systemPath=_UcapForm.cfg.systemPath;
		}
		var sform = $("sform_html_url");
		if(sform && sform.value){
			fileName = sform.value;
		}else{
			fileName = ucapCommonFun.getUrlParameter("unid") + ".html"
		}
		fileName = (isRead?"R_":"") + fileName;
		
		htmlUrl = ucapSession.baseAction + "?type=getForm&act=getFormHtml&appUnid="
					+appUnid+"&fileName="+fileName+"&systemPath="+systemPath+"&";
		
		return htmlUrl;
	},
	/**
	 * 获取webEditor对象
	 * @param {} isRead
	 */
	getEWebEditor:function(isRead){
		var sUrl = this.getHtmlFile(isRead);
		var ewebEditorFn = function(){
	 		var nameEn = "ucap_textarea_edit_html";
			var iframe1 = '<iframe id="{id}" src="'+ucapSession.appPath+'eWebEditor/ewebeditor.htm?id='+nameEn+'&style=mini" frameborder="0" scrolling="no" width="100%" height="350"></iframe>';
			_UcapForm.tool.complieTmp(iframe1,Ext.getDom(nameEn).parentNode,{"id":'eWebEditor_'+nameEn});
		};
		
	 	var requestConfig = {
	 		url:sUrl,
			callback:function(options,success,response){
				if (success){
					//找不到文件时，不提示找不到文件，而是直接调用创建HTML方法 mdf by jc 20110310
					var result = response.responseText;
					var json = Ext.decode(result);
					if(json && json.error){
						_UcapFormFun.createHTML();
						return;
					}
					var link = '<LINK href="'+ucapSession.sUserStylePath+'css/ucap.css" type=text/css rel=stylesheet>\n';
					var html = link+response.responseText;
					$("ucap_textarea_edit_html").innerText = html;
					if(!$("eWebEditor_ucap_textarea_edit_html"))ewebEditorFn();
					try{
						eWebEditor_ucap_textarea_edit_html.setHTML(html);
					}catch(e){}
					//alert(response.responseText);
				}else{
					//alert("找不到相关页面"+sUrl);
					_UcapFormFun.createHTML();
				}
			}
	 	};
	 	Ext.Ajax.request(requestConfig);
	},
	/**
	 * 弹出修改HTML页面对话框
	 */
	modifyHTML:function(renderObj){
		if($("ucap_win_modify_html"))return;
		var sUrl = "";
		var win = new Ext.Panel({
			renderTo: renderObj,
			id	:	"ucap_win_modify_html",
		    //title  :ucapSession.win.winImg+'表单页面修改对话框',
		    closable:true,
		    plain: true,
		    modal:true,
		    html:'<textarea style="display:none" id="ucap_textarea_edit_html"></textarea>',
		    tbar: [
					 {text: '读取编辑页面',handler: function(){
					 	_UcapFormFun.getEWebEditor();
					 	sUrl = _UcapFormFun.getHtmlFile();
					 }},
		             {text: '读取只读页面',handler: function(){
		             	_UcapFormFun.getEWebEditor(true);
		             	sUrl = _UcapFormFun.getHtmlFile(true);
		             }},
		             {text: '保存',handler: function(){
		             	//与后台交互SaveFormHTML，将修改后的HTML提交到后台，后台处理要注意<input />最后有个/会丢失，
			        	if(sUrl=="")return;
			        	var belongToAppId = ucapCommonFun.getUrlParameter("belongToAppId")||"";
			        	var json = {};
			        	json["html"] = eWebEditor_ucap_textarea_edit_html.getHTML();
						//修改保存需要的参数 mdf by jc 20110310
			        	var parmJson = Ext.urlDecode(sUrl);
			        	parmJson["type"] = "SaveFormHTML";
			        	var requestConfig = {
					 		url:ucapSession.baseAction,
					 		params:parmJson,
					 		jsonData:json,
							callback:function(options,success,response){
								if (success){
									//alert(response.responseText);
									//alert(sUrl+"修改成功!");
									Ext.Msg.alert("信息提示","修改当前HTML页面成功！")
									//win.close();
								}else{
									alert("无法与后台交互，请检查网络是否正常");
								}
							}
					 	};
					 	Ext.Ajax.request(requestConfig);
		             }}
		        ]
		});
		win.show();
		//默认打开编辑页面
		_UcapFormFun.getEWebEditor();
	 	sUrl = _UcapFormFun.getHtmlFile();
		
	},
	/**
	 * 创建默认的HTML表单
	 */
	createHTML : function(){
		var formId = ucapCommonFun.getUrlParameter("unid");
		var belongToAppId = ucapCommonFun.getUrlParameter("belongToAppId")||"";
		//修改参数名称 mdf by jc 20110310
		var tableName = $V("form_name_en"),systemPath;
		if(tableName && tableName.toLowerCase().indexOf("ucap_")==0){
			systemPath = "system";
		}else{
			systemPath = "";
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"CreateHtmlAction","unid":formId,"belongToAppId":belongToAppId,"systemPath":systemPath},
			//jsonData:json,
			callback:function(options,success,response){
				if(success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					//if(callBackFn && "string"!=callBackFn && callBackFn!=""){
						//ucapCommonFun.evalJavaScript(callBackFn+"(response.responseText);");
					//}else{
						//_UcapFormFun.modifyHTML();
						if(Ext.encode(response.responseText).indexOf("true")>-1){
							Ext.Msg.alert("提示","生成HTML页面成功！");
						}else{
							Ext.Msg.alert("提示","生成HTML页面失败！");
						}
						
					//}
				}
				
			}
		};
		var requestHtmlConfig = {
	 		url:this.getHtmlFile(),
			callback:function(options,success,response){
				if (success){
					Ext.Msg.confirm("系统提示","确定要生成HTML文件吗？这将会覆盖原有的HTML页面！！！",function(yn){if(yn=="yes"){
						Ext.Ajax.request(requestConfig);
					}});
				}else{
					Ext.Msg.confirm("系统提示","确定要生成HTML文件吗？",function(yn){if(yn=="yes"){
						Ext.Ajax.request(requestConfig);
					}});
				}
			}
	 	};
	 	Ext.Ajax.request(requestHtmlConfig);

		
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
			ucapCommonFun.setAttr(obj,"sourceType",c);
			ucapCommonFun.setAttr(obj,"source",d);
			if(typeof f=="undefined") f= 1;
			ucapCommonFun.setAttr(obj,"isSingle",f!=1?"0":f);
			ucapCommonFun.setAttr(obj,"nameEn",obj.id);
			ucapCommonFun.setAttr(obj,"dictionaryType","03");
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
				//modify by jc 将UNID转换为中文名称
				if(objCn)objCn.value = ucapCommonFun.getDisplayNames("201",deptUnid)||deptUnid;
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
	 * 
	 * @param {} o
	 */
	managerSourceTypeClick:function(o){
		var oid = "manager_source_unid";
		if(o){
			var v = o.value+"";
			switch(v){
				case "01":
					this.fn(o,oid,"none","","20","218",1);
					break;
				default:
					this.fn(o,oid,"","none","","",1);
			}
		}
	},
	managerSourceTypeSetCn:function(){
		if(Ext.getDom("manager_source_unid")){
			this.initRadioToCnValue({
				id:"manager_source_type",
				map:{"01":"218"},
				enObj:Ext.getDom("manager_source_unid")
			});
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
				case "10":
					this.fn(o,oid,"none","","20","227",1);
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
				ucapCommonFun.setAttr(obj,"sourceType",c);
				ucapCommonFun.setAttr(obj,"source",d);
				ucapCommonFun.setAttr(obj,"dictionaryType","03");
				ucapCommonFun.setAttr(obj,"isSingle","1");
				ucapCommonFun.setAttr(obj,"nameEn",obj.id);
				if(e)_UcapForm.tool.embellishForm(obj);
				if(obj_Cn_)obj_Cn_.style.display=b;
				if(obj_btn)obj_btn.style.display=b;
			};
			var v = o.value+"";
			switch(v){
				case "03":
					try{
						//2012-09-19 mdf by chuiting@linewell.com
						//BUG1235-字段值来自字典，默认值要可以设置多值
						//v值为"03"(即"默认值类型"为"字典")
						//是否单选：1为单选，0为多选
						var isSingle = "1";
						//"是否单选"控件id
						var isSingleDomId = "fitem_is_single";
						//"是否单选"控件dom节点对象
						var isSingleDom = Ext.getDom(isSingleDomId);
						//"是否单选"控件的值
						var isSingleDomValue = _UcapFormFun.getRadioValue(isSingleDomId);
						//"是否单选"没有被选中，默认选中"是"
						if (null == isSingleDomValue && isSingleDom) {
							isSingleDom.checked = true;
						} else {
							isSingle = isSingleDomValue;
						}
						//联动绑定设置"默认值"
						this.fn(o,"fitem_default_value","none","","03",Ext.getDom("fitem_source").value,"1",isSingle);
						//end 2012-09-19 mdf by chuiting@linewell.com
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
	 * 表单字段配置-是否单选事件
	 * @param {} obj "是否单选"控件对象
	 * 
	 * @author chuiting@linewell.com
	 * @since 2012-09-19
	 */
	fitemIsSingleClick : function(obj) {
		if (obj) {
			//是否单选：1为单选，0为多选
			var isSingleValue = obj.value;
			//字段默认值类型的值
			var defaultTypeValue = _UcapFormFun.getRadioValue("fitem_default_type");
			//字段默认值类型为字典("03")
			if (defaultTypeValue == "03") {
				try {
					//设置默认值控件
					this.fn(obj,"fitem_default_value","none","","03",Ext.getDom("fitem_source").value,"1",isSingleValue);
				} catch(e) {
					_UcapFormFun.fitemIsSingleClick(obj);
				}
			}
		}
	},
	/**
	 * 获取单选按钮选中的值
	 * @param {} radioName 单选按钮名称
	 * 
	 * @author chuiting@linewell.com
	 * @since 2012-09-19
	 */
	getRadioValue : function(radioName) {
		var obj = document.getElementsByName(radioName);
		if (null != obj) {
			for (var i = 0; i < obj.length; i++) {
				if (obj[i].checked) {
					return obj[i].value;
				}
			}
		}
		return null;
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
	 * 频道样式和来源对应关系修改  by@cgc 2011-8-5
	 * @param {} o 事件源对象
	 * @param {} c 是否触发来源类型的单击事件[没有或false时触发]
	 */
	channelStyleClick:function(o,c){
		var objId = "channel_source_type";
		if(o){
			var fn = function(enable,disable){
				for(var i=0;i<disable.length;i++){
					ucapCommonFun.setAttr(disable[i],"disabled", true);
				}
				for(var i=0;i<enable.length;i++){
					ucapCommonFun.setAttr(enable[i],"disabled", false);
					if(!c && i==0){
						ucapCommonFun.setAttr(enable[i],"checked",true);
					}
				}
			};
			var v = o.value+"";
			switch(v){
				case "01":
					var enable = Ext.query("input[id="+objId+"][value!=04][value!=05]");
					var disable = Ext.query("input[id="+objId+"][value=04],[id="+objId+"][value=05]");
					fn(enable,disable);
					break;
				case "02"://增加"图文环绕"和"图文并茂"与数据源的对应关系的处理  add by zzhan@linewell.com
					var enable = Ext.query("input[id="+objId+"][value=01]");
					var disable = Ext.query("input[id="+objId+"][value!=01]");
					fn(enable,disable);
					break;
				case "03":
					var enable = Ext.query("input[id="+objId+"][value=01]");
					var disable = Ext.query("input[id="+objId+"][value!=01]");
					fn(enable,disable);
					break;
				case "08":
					var enable = Ext.query("input[id="+objId+"][value=05]");
					var disable = Ext.query("input[id="+objId+"][value!=05]");
					fn(enable,disable);
					break;
				case "10":
					var enable = Ext.query("input[id="+objId+"][value=01]");
					var disable = Ext.query("input[id="+objId+"][value!=01]");
					fn(enable,disable);
					break;
				default:
					var enable = Ext.query("input[id="+objId+"][value=04]");
					var disable = Ext.query("input[id="+objId+"][value!=04]");
					fn(enable,disable);
					break;
			}
			//2012-03-29  mdf by fshaoming@linewell.com
			//数据来源类型更改后，相应触发数据来源值的文本框
			var obj=Ext.query("input:checked[id="+objId+"]");
			if(obj && obj.length>0&&obj[0]){
				//obj[0]为数据来源类型对象，作为参数，用于联动变更时取值使用
				 _UcapFormFun.channelSourceTypeClick(obj[0]);
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
		//2012-03-31 mdy by fshaoming@linewell.com
		//去掉多余的代码
		//this.channelStyleClick(csobj[0],true);
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
	 * 初始化频道信息，设置display_channel_unid的默认值
	 */
	initChannelId:function(){
		var enObj = $("display_channel_unid");
		var cnObj = $("display_channel_unid_Cn_");
		//扩展功能
		if(enObj.value = ((window.parent && window.parent.ucapCommonFun.getUrlParameter("unid"))
			||(window.opener && window.opener.top.ucapCommonFun.getUrlParameter("unid"))
			)){
		}
		if(enObj.value && enObj.value!="undefined"){
			var dictUnid = ucapCommonFun.getAttr(enObj,"source")||"";
			var cnv = ucapCommonFun.getDisplayNames("211",enObj.value,dictUnid);
			cnObj.value = cnv||enObj.value||"";
		}else{
			var obj= ((window.opener&&window.opener.top)||window.parent)._UcapForm.cfg.unid;
			cnObj.value = enObj.value = obj==null?"":obj;//当obj为null时，赋给cnObj空值  modify by fsm 11.1.18
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
			default:this.fn(o,oid,"","none","","");break;//mdy by fsm修改代码类型切换时，通用框没相应的隐藏
		}
	},
	/**
	 * 联动-表单事件类型fevent_etype
	 * @param {} o
	 */
	feventEtypeClick:function(o){
		var oid = "fevent_evalue";
		var v = o.value+"";
		var fn_ = function(){
			_UcapFormFun.initRadioToCnValue({
				id:"fevent_etype",
				map:{"03":"227","02":"227"},
				enObj:Ext.getDom("fevent_evalue")
			});
		};
		switch(v){
			case "02":
			//扩展功能
				this.fn(o,oid,"none","","20","227",1);
				fn_();
				break;
			case "03":
				this.fn(o,oid,"none","","20","227",1);
				fn_();
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
				ucapCommonFun.setAttr(obj,"sourceType",c);
				ucapCommonFun.setAttr(obj,"source",d);
				ucapCommonFun.setAttr(obj,"dictionaryType","03");
				ucapCommonFun.setAttr(obj,"isSingle",f);
				ucapCommonFun.setAttr(obj,"conValue","view_source_unid");
				ucapCommonFun.setAttr(obj,"nameEn",obj.id);
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
			var dictUnid = ucapCommonFun.getAttr(enObj,"source")||"";
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
	 * 分级管理中funid初始化
	 */
	initFunid:function(){
		var belongToAppId=ucapCommonFun.getUrlParameter("belongToAppId");
		var belongToModuleId=ucapCommonFun.getUrlParameter("belongToModuleId");
		//分级管理新建模块时的所属系统UNID modify by zh 2010-6-9
		var appUnid=ucapCommonFun.getUrlParameter("appUnid");
		if(belongToModuleId&&belongToModuleId!=""){
			Ext.getDom("manager_funid").value=belongToModuleId ;
		} else  if(belongToAppId&&belongToAppId!=""){
			Ext.getDom("manager_type").value="01";
			Ext.getDom("manager_source_type").value="02";
			Ext.getDom("manager_funid").value=belongToAppId ;
			Ext.getDom("manager_belong_app").value=appUnid ;
		} else{
			alert("父id为空");			
		}
		Ext.getDom("manager_edit").value="1";
		 
	},
	/**
	 * 分级管理中模块id初始化
	 */
	initModuleId:function(){
		var belongToModuleId=ucapCommonFun.getUrlParameter("belongToModuleId");
		var belongToAppId=ucapCommonFun.getUrlParameter("belongToAppId");
		if(belongToModuleId&&belongToModuleId!=""){
			if(Ext.getDom("form_module_unid"))
			{
				Ext.getDom("form_module_unid").value=belongToModuleId ;
			}
			if(Ext.getDom("view_module_unid"))
			{
				Ext.getDom("view_module_unid").value=belongToModuleId ;
			}
			if(Ext.getDom("cform_module_unid"))
			{
				Ext.getDom("cform_module_unid").value=belongToModuleId ;
			}
			if(Ext.getDom("dbview_module_unid"))
			{
				Ext.getDom("dbview_module_unid").value=belongToModuleId ;
			}
			if(Ext.getDom("query_module_unid"))
			{
				Ext.getDom("query_module_unid").value=belongToModuleId ;
			}
			if(Ext.getDom("sform_module_unid"))
			{
				Ext.getDom("sform_module_unid").value=belongToModuleId ;
			}
			if(Ext.getDom("fixedquery_module_unid"))
			{
				Ext.getDom("fixedquery_module_unid").value=belongToModuleId ;
			}
			if(Ext.getDom("button_module_unid"))
			{
				Ext.getDom("button_module_unid").value=belongToModuleId ;
			}
			 if($("ucapModuleId_tr"))$("ucapModuleId_tr").style.display="none";
		}  
		if(belongToAppId&&belongToAppId!=""){
			if(Ext.getDom("form_belong_to_app"))
			{
				Ext.getDom("form_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("view_belong_to_app"))
			{
				Ext.getDom("view_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("cform_belong_to_app"))
			{
				Ext.getDom("cform_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("dbview_belong_to_app"))
			{
				Ext.getDom("dbview_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("query_belong_to_app"))
			{
				Ext.getDom("query_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("sform_belong_to_app"))
			{
				Ext.getDom("sform_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("fixedquery_belong_to_app"))
			{
				Ext.getDom("fixedquery_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("interaction_belong_to_app"))
			{
				Ext.getDom("interaction_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("favorite_belong_to_app"))
			{
				Ext.getDom("favorite_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("navigation_belong_to_app"))
			{
				Ext.getDom("navigation_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("channel_belong_to_app"))
			{
				Ext.getDom("channel_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("display_belong_to_app"))
			{
				Ext.getDom("display_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("sequence_belong_to_app"))
			{
				Ext.getDom("sequence_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("button_belong_to_app"))
			{   
				Ext.getDom("button_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("para_belong_to_app"))
			{   
				Ext.getDom("para_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("role_belong_to_app"))
			{   
				Ext.getDom("role_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("post_belong_to_app"))
			{   
				Ext.getDom("post_belong_to_app").value=belongToAppId ;
			}
			if(Ext.getDom("scheme_belong_to_app"))
			{   
				Ext.getDom("scheme_belong_to_app").value=belongToAppId ;
			}
			
			 if($("ucapModuleId_tr"))$("ucapModuleId_tr").style.display="none";
		}
	},
	/**
	 * 字段基本信息初始化
	 */
	initFitem:function(){
		this.initRadioToCnValue({
			id:"fitem_source_type",
			map:{"03":"204","02":"218","10":"227"},
			enObj:Ext.getDom("fitem_source")
		});
		this.initRadioToCnValue({
			id:"fitem_default_type",
			map:{"02":"208","03":"204","10":"227"},
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
		isMht:"0",       //是否同步生成mht格式文件
		isRead:"1",      //是否只读
		isCopy:"1",      //是否可以复制
		isSaveAs:"1",    //是否可以另存
		isPrint:"1",     //是否可以打印
		countPrint:"0",  //最多可以打印的次数
		isHideRevision:"1",  //是否查看痕迹
		punid:"",       //源UNID(表单UNID、文档UNID)
		formId:"",		//主表单UNID
		formType:"",	//主表单类型
		baseUrl:ucapSession.hostPath+appPath,
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
		0:"意见,意见1,意见2,意见3,意见4,意见5,意见6,意见7,意见8",
		1:"opinion_name,opinion_name1,opinion_name2,opinion_name3,opinion_name4,opinion_name5,opinion_name6,opinion_name7,opinion_name8"
	},
	/**
	 * 意见数据源
	 * @type 
	 */
	optionSource:{
		0:"",
		1:""
	},
	/**
	 * 查看正文（视图中）
	 * @param {} formId 如果没有配置formId默认取视图的表单，注不支持组合表单
	 */
	onlookFromView:function(formId){
	    var unid = view.getSelecedUnid();
	    if(!unid || unid.indexOf(",")>-1){
	        Ext.Msg.alert("提示","请选择一条文档记录进行查看");
	        return;
	    }
	    //如果没有配置formId默认取视图的表单，注不支持组合表单
	    formId = formId||view.viewBaseInfos[view.index].formId;
	    /**actionType
		 * "0";//查看
		 * "1";//起草
		 * "2";//批阅
		 * "3";//生成
		 * "10";//配置
		 * "11";//打印
	     */
		ucap_attr.open({"punid":unid,"mainUnid":formId,"actionType":0});
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
		var unid = ucapCommonFun.getUrlParameter("unid");
		ucap_attr.open({"punid":unid,"actionType":0});
	},
	
	//批阅
	onReadOver:function(){
		var unid = ucapCommonFun.getUrlParameter("unid");
		var instanceUnid = ucapCommonFun.getUrlParameter("instanceUnid");
		if(instanceUnid){
			var requestConfig = {
			url : ucapSession.baseAction,
			params : { "type":"getWordForm","act":"3","unid":unid,"instanceUnid":instanceUnid},
			callback : function(options, success, response) {
				if (success) {
					 var exjson = Ext.util.JSON.decode(response.responseText);
						if (exjson.result || exjson.result == "true") {
						ucap_attr.open({"punid":unid,"actionType":2});
					 } 
				} else {
					Ext.Msg.alert("提示", "修改流程状态出错！");
				}
			}
		};
		 Ext.Ajax.request(requestConfig); 
		}
	
	},
	/**
	 * 起草正文
	 */
	ondraft:function(){
		var unid = ucapCommonFun.getUrlParameter("unid");
		//新文档不允许起草正文 mdf by jc 20111228
		if(!unid){
			Ext.Msg.alert("系统提示","请保存文档，再起草正文！");
			return;
		}
		ucap_attr.open({
			"punid":unid,
			"actionType":1,
			"isShowList":true
							});
	},
	/**
	 * 生成正文
	 */
	onfinalize:function(){
		var unid = ucapCommonFun.getUrlParameter("unid");
		ucap_attr.open({"punid":unid,"actionType":3
							});
	},
	/**
	 * 配置模板
	 * @param {} attrUnid 是实际附件的attrUnid
	 */
	onconfig:function(attrUnid){
		var unid = ucapCommonFun.getUrlParameter("unid");
		if(!unid || ucap_attr_fun.checkAP("cfg")){
			alert("文档未保存或无权限进行模板配置！");return;
		}
		ucap_attr.open({"actionType":10,
								"punid":unid,
								"docType":1,
							"unid":attrUnid
							});
	},
	/**
	 * 打印办理单
	 */
	onprint:function(printDocUnid){
		var unid = ucapCommonFun.getUrlParameter("unid");
		ucap_attr.open({"punid":unid,"actionType":11,"attrType":1,"printDocUnid":printDocUnid
							});
	},
	/**
	 * 通过控件直接打开文档,由控件下载文件
	 * @param {} docType 附件类型
	 * @param {} unid 附件的UNID
	 * @param {} fileName
	 * @param {} Interface
	 * @param {} sUrl
	 */
	openDownloadAttr:function(docType,unid,fileName,Interface,sUrl,appUnid){
		//创建VB中的接口
		if(!Interface){
			try{
				Interface = new ActiveXObject("ucapWord.Interface");
			}catch(e){
				Ext.Msg.alert("系统提示：","系统检测：您当前未安装ucap相关控件！");
				return;
			}
		}
		if(!appUnid){
			appUnid = ucapCommonFun.getUrlParameter("belongToAppId")
			if("undefined" == appUnid || null == appUnid || "" == appUnid){
				appUnid = ucapSession.appUnid;
				
			}
		}
		//下载的文件URL
		if(!sUrl){
			sUrl = ucapSession.hostPath+appPath+'GetAttrInfo?act=down&docType='+docType+'&unid='+unid+"&appUnid="+appUnid;
		}else{
			sUrl = ucapSession.hostPath+appPath+sUrl;
		}		
		//不存在则采用默认的文档下载临时文件名
		Interface.FileName=fileName||'temp.doc';
		//成功下载后执行打开，防止打开临时文件
		if(Interface.DownloadAttr(sUrl)){
			//打开模板
			Interface.Launch();
		}
		// add by cjianyan@linewell.com 2011-4-26
		var json = "{\"unid\":\""+unid+"\",\"appUnid\":\""+appUnid+"\",\"docType\":\""+docType+"\",\"isFlag\":1}";
		json = Ext.decode(json);
		ucap_attr_fun.afterDownFileFun(json);
		// end
	},
	//获取基本信息并启动
	/**
	 * 
	 * @param {} json
	 * @param {} Interface
	 * @param {} arg  其中的UNID是用来下载用，可能是模板的UNID，实际要保存的附件UNID是在json.unid中
	 */
	setWordInfoConfig:function(json,Interface,arg){  
		
		//2012-07-13  mdy by wyongjian@linewell.com
		//获取当前业务模块所需参数，用于正文和附件按模块存放
		var formType = ucapCommonFun.getUrlParameter("type");
		var formId = ucapCommonFun.getUrlParameter("formId");
		var instanceUnid = ucapCommonFun.getUrlParameter("instanceUnid")||"";
	   //上传的URL
		var GetWordInfoConfig = {
			url:ucapSession.baseAction,
			params:{"type":"getWordInfo","instanceUnid":instanceUnid,"docId":json["punid"]},
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
							'&unid='+json["unid"] +
							
							//2012-07-13  mdy by wyongjian@linewell.com
							//获取当前业务模块所需参数，用于正文和附件按模块存放
							'&formType='+formType +
							'&formId='+formId;				    					       
					rjson["upUrl"]=url+'&fileName='+(arg["fileName"]||json["fileName"])+'&isMht='+rjson["isMht"];
					rjson["upUrl"] += "&belongToNode="+rjson["belongToNode"]+"&belongToNodeName="+rjson["belongToNodeName"]
					+"&creator="+rjson["creator"];
					
					//rjson["mhtUrl"]=url+'&fileName='+(arg["fileName"]||json["fileName"]).replace(/(.doc)$/g,".mht");
					//alert(rjson["mhtUrl"]);
					rjson = Ext.encode(rjson);	
					//进行状态的设置
					//rjson["docType"]="1";
					//
					Interface.FileName="processing.lw";
					Interface.SaveCfgTxt(rjson);
					//下载并打开文件 mdf by jc 20100623
					ucap_attr.openDownloadAttr((arg["docType"]||json["docType"]),(arg["unid"]||json.unid),json.fileName,Interface);
//					//获取模板
//					var sUrl = ucapSession.hostPath+appPath+'GetAttrInfo?act=down&docType='+(arg["docType"]||json["docType"])+'&unid='+(arg["unid"]||json.unid);
//					Interface.FileName=json.fileName;
//					//成功下载后执行打开，防止打开临时文件
//					if(Interface.DownloadAttr(sUrl)){
//						//打开模板
//						Interface.Launch();
//					}
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
		var GetWordFormCfg = {
				url:ucapSession.baseAction,
				//配置必须在数据表配置中配置，应用部门如需要请重构此方法。mdf by jc 20111227
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
						if(rjson && rjson!=null){
							var spns = ucap_attr.optionCfg[1].split(",")||[];
							var opnJson = {};
							//根据JS中意见配置类型的个数来设置意见类型,多个意见类型相同的,统一归类在一起展示
							for(var k=0;k<spns.length;k++){
								//查询后台返回的意见结果集
								for(var i=0;i<rjson.length;i++){
									var result_1 = "";
									var rj = rjson[i];
									if(spns[k]==c[0]+rj[c[1]]){
										result_1 +=esc(rj[c[0]])+"\n"
												+  esc(rj[c[2]])+"\n"
												+  esc(rj[c[3]])+"\t"
												+  esc(rj[c[4]])+"\t"
												+  esc(rj[c[5]])+"\n";
										opnJson[spns[k]] = (opnJson[spns[k]]||"")+result_1;
									}
								}
								ucap_attr.optionSource[0]+=spns[k]+"\t";
								ucap_attr.optionSource[1]+=esc((opnJson[spns[k]]||""))+"\t";
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
				params:{"act":"1","unid":json.punid,"formUnid":json.formId,"type":"getWordForm"},
				jsonData:json,
				callback:function(options,success,response){
					if(success){
						//alert(response.responseText);
						var result_0 = "";
						var result_1 = "";
						var rjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(rjson);
						if(!exResult)return;
						//增加对Word书签的支持，保存书签需要的JSON数据文件。 add by jc 20110825
						if(rjson.length>0){
							rjson = rjson[0];
							Interface.FileName= json.unid+".json";
							Interface.SaveCfgTxt(Ext.encode(rjson),"0");
						}
						for(fkey in rjson){
							result_0 += fkey.replace(/\t/g,"")+"\t";
							result_1 += esc(rjson[fkey]||"")+"\t";
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
		//初始化表单配置信息
		//ucap_attr.json.formId = _UcapForm.cfg.mainUnid;
		//ucap_attr.json.formType = _UcapForm.cfg.mainFormType;
		//主表单ID不允许为组合表单或显示表单 mdf by jc 20100630
		ucap_attr.json.formId = _UcapForm.ucapForm.getMainUnid();
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
			//alert(_UcapForm.ucapForm.getMainUnid());
			var GetWordListCfg = {
				url:appPath+'GetAttrInfo', 
				params:{"punid":json.punid,"funid":json.formId,"act":"list","type":json["attrType"]},
				callback:function(options,success,response){
					if(success){
						
						var rjson = Ext.decode(response.responseText);						
						var exResult=ucapCommonFun.dealException(rjson);
						if(!exResult)return;
						
						var rlen = rjson.length;
						var attrUnid;
						var docType;
						//单一列表框
						if(rlen==1){
							ucap_attr.openAttr(rjson[0],json);
						}else{//列表式
							if(json["printDocUnid"]){
								for(var k=0;k<rjson.length;k++){
									var cfgUnid = rjson[k].cfgUnid;
									if(cfgUnid==json["printDocUnid"]){
										ucap_attr.openAttr(rjson[k],json);
										return;
									}
								}
							}
							var selectObjId = "ucap_select_list";
							var _html = '<select id="'+selectObjId+'" size="21" style="width:250px;">';
							for(var k=0;k<rjson.length;k++){
								var cfgfn = rjson[k].cfgFileName;
								_html += '<option id="ucap_attr_'+k+'">'+cfgfn.split(/\\|\//)[cfgfn.split(/\\|\//).length-1].replace(".doc","")+'</option>';
								//alert(Ext.encode(rjson[k]));
							}
							_html += "</select>";
							var openAttr = function(pe){
								if (!Ext.DomQuery.pseudos['selected'])
								Ext.DomQuery.pseudos['selected'] = function(c) {
									var r = [];
									for (var i = 0, l = c.length; i < l; i++) {
										if (c[i].selected == true) {
											r[r.length] = c[i];
										}
									}
									return r;
								};
								var obj = Ext.query("option:selected",(pe||this).parentElement);
								if(obj && obj.length>0){
									$(obj[0].id).click();
								}
								if(win)win.close();
							};
							var win = new Ext.Window({
								id	:	"ucap_attr_print_list",
							    title  :ucapSession.win.winImg+'文件列表',
							    width:260,
							    height:300,
							    closable:true,
							    plain: true,
							    modal:true,
								html:_html,
							    buttons: [{
							    	id:'OKAttrButton',
							        text: '打开',
							        handler: function(){
							        	openAttr(Ext.get(selectObjId));
							            win.close();
							        }
							    },{
							    	id:'cancelAttrButton',
							        text: '关闭',
							        handler: function(){
							            win.close();
							        }
							    }]
							});
							win.show();
							for(var k=0;k<rjson.length;k++){
								Ext.get("ucap_attr_"+k).on("click",ucap_attr.openAttr,{"rjson":rjson[k],"tjson":json}); 
							}
							Ext.get(selectObjId).on("dblclick",openAttr,Ext.get(selectObjId));
						}
					}
				}
			};
			Ext.Ajax.request(GetWordListCfg);
		}
	},
	/**
	 * 打开办理单模板并进行邮件合并
	 * @param {} rjson
	 * @param {} json
	 */
	openAttr:function(rjson,json){
		rjson = this["rjson"]||rjson;
		json = this["tjson"]||json;
		if(rjson==null){
			Ext.Msg.alert("系统提示","未配置模板！");
			return;
		}
		var Interface = null;
		try{
			Interface = new ActiveXObject("ucapWord.Interface");
		}catch(e){
			Ext.Msg.alert("系统提示：","系统检测：您当前未安装ucap相关控件！");
			return;
		}
		var docType;
		//直接打开word
		var attrUnid = rjson["unid"];
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
			attrUnid = rjson["cfgUnid"];
			json["stateType"]="1"; //insert
			var win = new ActiveXObject("Linewell.Windows");
			json.unid  = win.GetUNID();
			docType ="1";
		}
		json["fileName"]=json.unid +".doc";
		//进行中文编码
		json["caption"]=escape(rjson["caption"]||rjson["cfgCaption"]).replace(/\%/g,"_");
		json["attrType"]="0";
		json["docType"]="0";
		ucap_attr.setWordOpinionSource(json,Interface,1,0,
			ucap_attr.setWordInfoConfig,{"punid":json.punid,"docType":docType,"fileName":json.fileName,"unid":attrUnid});
	},
	/**
	 * 用于将回车换行及tab转意，
	 * 然后在控件中进行替换
	 * @param {} s
	 * @return {}
	 */
	attr_escapeStr:function(s){
		s = s.replace(/[\r|\n]/ig,"`!p").replace(/(\t)/ig,"`!t").replace(/\>/ig,"`!》").replace(/\</ig,"`!《");
		return s;
	}
};
var _UcapViewFun = {
	/**
	 * 获取视图的sql语句和执行时间
	 */
	getSqlAndTime : function(){
		var viewId= ucapCommonFun.getUrlParameter("unid");
		var requestConfig = {
		url : ucapSession.baseAction,
		params : {"type":"getView","viewId":viewId,"action":"getSqlAndTime",rds:ucapCommonFun.getRandomString()},
		callback : function(options, success, response) {
				if (success) {
					 var  json = Ext.decode(response.responseText)||{};
					 if (json && json.result != "undefined" && json.result== "true"){
					 Ext.getDom("result").value="验证成功！所用时间为："+json.time+"秒";
					 }else{
					 	Ext.getDom("result").value="验证失败！";
					 }
					 Ext.getDom("sql").value=json.sql||"视图配置不正确,请检查相关配置!";
				} else {
					Ext.Msg.alert("提示", "视图配置出错！");
				}
			}
		};
		Ext.Ajax.request(requestConfig); 
	}
};
/**
 * 菜单Paper工具栏
 * @type 
 */
var _UcapDocPaper = {
	msgAlert:function(msg){Ext.Msg.alert("提示",msg)},
	parentObject:new Object(),
	initPaper:function(){
		var viewMId = ucapCommonFun.getUrlParameter("viewMId");
		if(!viewMId)return false;
		//还需要进行非新窗口的数据源获取
		//还需要考虑三级界面中的视图打开的情况
		try{
			this.parentObject = window.opener.view
		}catch(e){
			this.parentObject = view;
		}
		this.parentObject.run = false;
		if(this.parentObject.viewId==viewMId)
			this.parentObject.run = true;
		return this.parentObject.run;
	},
	getFirst:function(){
		if(this.initPaper()){
			this.openDoc("0");
		}else{
			this.msgAlert("当前文档对应视图与当前所开视图不一致,功能暂时不能用!");
		}
	},
	getLast:function(){
		if(this.initPaper()){
			this.openDoc("3");
		}else{
			this.msgAlert("当前文档对应视图与当前所开视图不一致,功能暂时不能用!");
		}
	},
	getNext:function(){
		if(this.initPaper()){
			this.openDoc("2");
		}else{
			this.msgAlert("当前文档对应视图与当前所开视图不一致,功能暂时不能用!");
		}
	},
	getPrev:function(){
		if(this.initPaper()){
			this.openDoc("1");
		}else{
			this.msgAlert("当前文档对应视图与当前所开视图不一致,功能暂时不能用!");
		}
	},
	openDoc:function(verb){
		var unid = ucapCommonFun.getUrlParameter("unid");
		var instanceUnid = ucapCommonFun.getUrlParameter("instanceUnid");
		var viewMId = ucapCommonFun.getUrlParameter("viewMId");
		var openST = ucapCommonFun.getUrlParameter("openST");
		try{
			var result = this.parentObject.getDocPaper(unid,this.parentObject.viewId,verb);
			if(result.error=="" || result.error==null){
				if(instanceUnid){
					var _url = "&unid="+result.unid+"&viewMId="+viewMId+"&openST="+openST;
					_url = ucapOpenFlow.openOldFlowPageDoc(_url);
					if(_url && _url!="undefined")location.href = _url;
					else
						this.msgAlert("无法获取流程相关信息，文档无法打开");
				}else{
					var _url = location.href.replace(/(&unid=[\w]*)/ig,"&unid="+result.unid);
					location.href = _url.replace(/(\?unid=[\w]*)/ig,"\?unid="+result.unid);
				}
			}else{
				this.msgAlert(result.error);
			}
		}catch(e){
		}	
	}
};