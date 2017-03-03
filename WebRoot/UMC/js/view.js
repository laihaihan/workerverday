/**
 * 视图基本信息
 */
var viewBaseInfo = new Function();
/**
 * 定义视图基本信息对象的属性
 * 
 * @type
 */
viewBaseInfo.prototype = {
	viewId : "", // 视图标识
	formId : "", // 表单标识
	sourceType : "", // 来源类型
	sourceUnid : "", // 来源类型标识
	formType : "", // 表单类型
	isSonView : false, // 是否有子视图
	sonViewIds : "", // 子视图标识
	previewType : "", // 预览方式
	categoryType : "", // 视图分类中的位置，如果视图分类为“00”则表示为没有分类
	checkPosition : "", // 选项列位置
	pageSize : 20,
	viewType : "", // 视图类型
	openJs : "", // 打开的js函数
	isFlowItem : false, // 是否有流程字段
	advancedJson : null, // 高级查询的json配置
	categoryItemType : "", // 分类字段的类型
	categoryItemName : "", // 分类字段的名称
	categoryItemValue : "", // 分类字段的值
	isEdit : false, // 是否直接进入编辑状态
	formItemsJson : null, // 视图编辑中json格式的数据
	loadJs : "", // 视图加载完执行的js函数
	addRowjs : "", // 可编辑表格增加行的js函数
	onlysaveSelected : false, // 只保存选中行,为true只保存选中，false的话保存所有行
	operationPos : -1, // 操作列所在的位置
	opendocType : "", // 打开文档的方式 yjy 2010-5-10 add
	newdocType : "", // 新建文档的方式 yjy 2010-5-10 add
	previewSize : 300, // 预览大小 add by jc 20100612
	searchBarState : 0, // 搜索栏的隐藏显示 0隐藏 1显示 add by fsm 2010.9.14
	jspUrl : "", // 显示的JSP名称
	isSimpleLink : false
	// 是否以单列打开
};

var view = {
	viewType : "01",
	viewId : "",
	viewUrl : "",// 目前主要用于文档以当前页面打开方式，存储URL或者js事件
	renderto : "",
	hasTab : false,
	dataUrl : ucapSession.baseAction + "?type=getView&action=getData",
	checkPosition : "",
	width : 822,
	json : null,
	displayName : "",
	viewBaseInfos : null,
	namePrefix : "viewdiv_",
	pageSize : 10,
	index : 0,
	sqlLikeKey : '~!@0~!@5', // SQL中like的关键字
	sqlAnd : '~!@AND@!~', // SQL并且的关键字(AND)连接
	sqlOr : '~!@OR@!~', // SQL并且的关键字(OR)连接
	sqlLTEQ : '~!@0~!@2', // SQL并且的关键字(<=)连接
	sqlGTEQ : '~!@0~!@1', // SQL并且的关键字(>=)连接
	sqlEQ : '~!@0~!@0', // SQL并且的关键字(=)连接
	fieldDbType : '~!@DB@!~', // 数据库字段
	fieldConstType : '~!@CL@!~', // 常量字段
	fieldEndPrefix : '~!@E@!~', // 结束符
	currentGridIndex : 0, // 当前选中表格的索引
	purl : "", // 上级父的url标识
	mouseOverIndex : -1, // 鼠标移动所在行识别
	pcateUrl : "", // 分类查询传入的值
	isSingle : "", // 是否为单选
	recordSplit : "", // 行分隔符号
	colSplit : "", // 列分隔符号
	isTab : "", // 是否来自页签
	noTbar : "", // 没有按钮区
	noBbar : "", // 没有分页
	stores : null, // 数据存储容器
	advPrefix : "$_A_$", // 作为高级查询的前缀
	moduleUnid : "", // 业务模块标识
	enableDragDrop : false, // GridPanel行的拖动 add by jc 20110303
	deleteViewData : [], // 可编辑表格删除的数据 add by fsm 20110428

	/**
	 * 根据视图标识进行视图加载 by xhuatang@linewell.com
	 * 
	 * @param {}
	 *            viewid 视图的ID
	 * @param {}
	 *            render 渲染的对象
	 * @param {}
	 *            noQuery 是否没有查询
	 * @param {}
	 *            noPreview 是否没有预览
	 * @param {}
	 *            noSelfConfig 是否没有自定义设置
	 */
	load : function(viewid, render, noQuery, noPreview, noSelfConfig) {
		var viewIds = viewid.split(",");
		for (var j = 0; j < viewIds.length; j++) {

			if (undefined == viewIds[j] || viewIds[j] == "") {
				continue;
			}
			if (view.personal.getIndexFromBaseInfo(viewIds[j]) >= 0)
				return;

			// 是否加载视图初始化数据成功 by xhuatang@linewell.com
			var initResult = view.personal.init(viewIds[j]);
			if (!initResult) {
				alert("初始化视图数据失败！");
				return;
			}
           
            //2011-12-05 add by xhuatang@linewell.com 更改UMC用户属性在IE6设置高度的BUG 
            //ucapUmcDept.fixIe6Bug();		   

			var index = view.viewBaseInfos.length - 1;

			view.personal.createGridDiv(index, render);
			

			// 初始化简单查询
			if ("undefined" != noQuery
					&& (noQuery == true || noQuery == "true")) {
				//2011-12-12 modify by xhuatang@linewell.com 添加索引，以保证search id的唯一
				var queryDiv = Ext.getDom("search_" + j);
				if (undefined != queryDiv && null != queryDiv) {
					queryDiv.style.display = "none";
				}
			} else {
				view.personal.initSimpleSelect(view.json, index);
				view.personal.initAdvancedSelect(view.json, index);
			}
			// return;
			view.personal.loadCommonGrid(viewIds[j], index, noPreview,
					noSelfConfig);
			// 中间树形
			if (view.viewBaseInfos[index].categoryType == "02" && index == 0) {// 只有第一个视图才进行建立视图分类
				viewTree.init(view.viewBaseInfos[index].viewId,
						'viewCategories', index,
						view.viewBaseInfos[index].categoryItemType,
						view.viewBaseInfos[index].categoryItemName);
			} else if (view.viewBaseInfos[index].categoryType == "03"
					&& index == 0) {
				//2011-12-12 modify by xhuatang@linewell.com 添加索引，以保证search id的唯一
				var searchDiv = Ext.getDom("search_" + j);
				searchDiv.style.display = "";
				viewBaseInfo.searchBarState = 1;
				userComboBoxTree.init(view.viewBaseInfos[index].viewId,
						'viewCategories', index,
						view.viewBaseInfos[index].categoryItemType,
						view.viewBaseInfos[index].categoryItemName,
						view.viewBaseInfos[index].categoryItemValue);
			}
		}
		
		//2011-12-12 add by xhuatang@linewell.com 设置高度的统一放在ucapUmcDept.resetViewSize()
		ucapUmcDept.resetViewSize();
	},
	/**
	 * 视图的私有方法
	 * 
	 * @type
	 */
	personal : {
		/**
		 * 先进行视图的初始化操作
		 * 
		 * @param {}
		 *            currentViewId 当前视图的unid
		 * @param {}
		 *            index 视图的索引值
		 * @return {Boolean}
		 */
		init : function(currentViewId, index) {

			var url = ucapSession.baseAction;
			url += "?viewId=" + currentViewId + "&type=getView&rand="
					+ Math.random();

			// 加入视图打开中的其他参数，以便在逻辑可进行调用 add by llp 2010-07-15
			var urlsp = url.split("?");
			url = url.substring(urlsp[0].length + 1);
			var urljson = Ext.urlDecode(url);
			var purljson = Ext.urlDecode(view.purl);
			Ext.apply(purljson, urljson);
			url = urlsp[0] + "?" + Ext.urlEncode(purljson);
			// end
			// top.location.href = url;
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", url, false);
			conn.send(null);
			view.json = Ext.util.JSON.decode(conn.responseText);
			var exresult = ucapCommonFun.dealException(view.json);
			if (!exresult)
				return false;

			if (null == view.viewBaseInfos) {
				view.viewBaseInfos = new Array();
			}
			// 获取视图的基本配置信息by xhuatang
			var viewBaseInfoItem = this.loadBaseInfoFromJson(view.json);

			if (undefined == index || index < 0) {
				view.viewBaseInfos[view.viewBaseInfos.length] = viewBaseInfoItem;
			} else {
				view.viewBaseInfos[index] = viewBaseInfoItem;
			}
			return true;
		},
		/**
		 * 把Json信息转换为viewBaseInfo对象 by xhuatang
		 * 
		 * @param {}
		 *            json 视图配置信息的json对象
		 * @return {}
		 */
		loadBaseInfoFromJson : function(json) {
			// new一个对象，以免是对对原有值的替换
			var viewBaseInfoObj = new viewBaseInfo();
			viewBaseInfoObj.viewId = view.json.punid;
			viewBaseInfoObj.formId = view.json.formUnid;
			viewBaseInfoObj.formType = view.json.formType;
			viewBaseInfoObj.sourceType = view.json.sourceType;
			viewBaseInfoObj.sourceUnid = view.json.sourceUnid;
			viewBaseInfoObj.previewType = view.json.previewType;
			viewBaseInfoObj.isSonView = view.json.sonView;
			viewBaseInfoObj.pageSize = view.json.pageSize;
			if (isNaN(viewBaseInfoObj.pageSize)) {
				viewBaseInfoObj.pageSize = 0;
			} else if (parseInt(viewBaseInfoObj.pageSize) <= 0) {
				viewBaseInfoObj.pageSize = 20;
			}
			viewBaseInfoObj.categoryType = view.json.categories;
			viewBaseInfoObj.checkPosition = view.json.checkPosition;
			viewBaseInfoObj.sonViewIds = view.json.sonViewUnids;
			viewBaseInfoObj.viewType = view.json.type;
			viewBaseInfoObj.openJs = view.json.openJs;
			// add by jc 20100527
			viewBaseInfoObj.embellishJsName = view.json.embellishJsName;
			viewBaseInfoObj.saveValidateJsName = view.json.saveValidateJsName;
			viewBaseInfoObj.previewSize = view.json.previewSize;
			// add by jc 20100915
			viewBaseInfoObj.jspUrl = view.json.jspUrl;
			viewBaseInfoObj.isSimpleLink = view.json.simpleLink;

			if ("undefined" != typeof(view.json.flowItem)) {
				viewBaseInfoObj.isFlowItem = view.json.flowItem;
			}

			if (undefined == view.json.categoryItems
					|| view.json.categoryItems.length == 0) {
				viewBaseInfoObj.categoryType = "00";
			} else {
				viewBaseInfoObj.categoryItemType = view.json.categoryItems[0].itemType;
				viewBaseInfoObj.categoryItemName = view.json.categoryItems[0].itemCn;
				viewBaseInfoObj.categoryItemValue = view.json.categoryItems[0].itemValue;
				if (viewBaseInfoObj.categoryType == "") {
					viewBaseInfoObj.categoryType = "01";
				}
				if (viewBaseInfoObj.categoryType == "") {
					viewBaseInfoObj.categoryType = "01";
				}
			}

			var isEdit = 1; // 默认为可编辑 -1不能查看 0 只读 1可编辑
			// 如果是子视图，则文档的打开权限要根据父文档的权限来判断
			if (window.parent && window.parent._UcapForm
					&& window.parent._UcapForm.cfg) {
				if ("undefined" != typeof(window.parent._UcapForm.cfg.isRead)
						&& null != window.parent._UcapForm.cfg.isRead) {
					isEdit = window.parent._UcapForm.cfg.isRead;
				}
			}
			// 如果父文档不可编辑的话，则视图也默认不可编辑
			if (typeof(isEdit) != "undefined" && isEdit == 1) {
				viewBaseInfoObj.isEdit = view.json.edit;
			} else {
				viewBaseInfoObj.isEdit = false;
			}

			// 视图加载完毕的js函数
			viewBaseInfoObj.loadjs = view.json.loadjs;
			viewBaseInfoObj.addRowjs = view.json.addRowjs;
			viewBaseInfoObj.onlysaveSelected = view.json.onlysaveSelected;

			// yjy 2010-5-10
			viewBaseInfoObj.opendocType = view.json.opendocType;
			viewBaseInfoObj.newdocType = view.json.newdocType;
			return viewBaseInfoObj;
		},
		/**
		 * 创建视图容器，div
		 * 
		 * @param {}
		 *            index 视图位置索引
		 * @param {}
		 *            render reader位置
		 */
		createGridDiv : function(index, render) {
			// 创建表格的div
			var mainDiv = document.getElementById(render);
			mainDiv.innerHTML = "";
			if (view.viewBaseInfos[0].categoryType == "02") {
				var mainLeft = Ext.getDom("viewCategories");
				if (undefined == mainLeft) {
					mainLeft = document.createElement("div");
					mainLeft.id = "viewCategories";
					mainDiv.appendChild(mainLeft);
				}
			}
			// by xhuatang
			// alert(view.viewBaseInfos[0].categoryType);
			var mainRight = Ext.getDom("umcMainRight");
			if (undefined == mainRight) {
				mainRight = document.createElement("div");
				mainRight.id = "umcMainRight";
				mainRight.style.styleFloat = "right";
				// mainRight.style.width="940";
				// 防止有视图分类时视图加载到分类底下
				mainDiv.appendChild(mainRight);
			}
			// 普通搜索
			var searchNewDiv = document.createElement("div");
			var searchNewDivHtml = "<div id=\"searchLeft\" class=\"searchLeft\"></div>";

			searchNewDivHtml += "<div id=\"searchBox\" class=\"searchBox\"><div id=\"sim_searchBox\" style=\"float:left\"><img src=\""
					+ ucapSession.sUserImgPath
					+ "icon_search.gif\" align=\"absmiddle\" /> 搜索：";
			searchNewDivHtml += "<input name='keyword' type='text' class='searchinputbox' onkeydown='view.kdSearch("
					+ index
					+ ")' id='keyword' onmousedown=\"if(this.value=='请输入搜索关键字')this.value=''\" value='请输入搜索关键字' size='20' />";
			searchNewDivHtml += " 在 <select name=\"searchName\" id='simpleSearchSelect_"
					+ index + "'>";
			searchNewDivHtml += "<option value='0'>请选择搜索范围</option>";
			searchNewDivHtml += "</select> <input type=\"button\" value=\"搜索\" id=\"simpleSearch_"
					+ index
					+ "\" class=\"btn1\" onclick=view.search("
					+ index
					+ ")></div><div style=\"float:left;padding:5px;\"> <input type=\"button\" class=\"btn1\" id=\"advancedSearch_"
					+ index
					+ "\" onclick=\"view.setSearchMore(this,"
					+ index
					+ ")\" value=\"▼高级搜索\" /></div></div><div class='clearfix'></div>";
			searchNewDiv.innerHTML = searchNewDivHtml;
			//2011-12-12 modify by xhuatang@linewell.com 添加索引，以保证search id的唯一
			searchNewDiv.id = "search_" + index;
			searchNewDiv.className = "search";// add by jc 20091222
			mainRight.appendChild(searchNewDiv);

			// 高级搜索
			var searchMoreNewDiv = document.createElement("div");
			searchMoreNewDiv.id = "searchMore_" + index;
			searchMoreNewDiv.style.display = "none";
			mainRight.appendChild(searchMoreNewDiv);

			// 创建视图div
			var gridDiv = document.createElement("div");
			gridDiv.id = view.namePrefix + index;
			gridDiv.className = "viewGrid";
			mainRight.appendChild(gridDiv);
		},
		/**
		 * 判断视图id是否已在列表中
		 * 
		 * @param {}
		 *            viewId
		 */
		getIndexFromBaseInfo : function(viewId) {
			var result = -1;
			if (undefined != view.viewBaseInfos
					&& view.viewBaseInfos.length > 0) {
				for (var i = 0; i < view.viewBaseInfos.length; i++) {
					var vbi = view.viewBaseInfos[i];
					if (vbi.viewId == viewId) {
						result = i;
						break;
					}
				}
			}
			return result;
		},
		/**
		 * 初始化简单查询
		 * 
		 * @param {}
		 *            json
		 */
		initSimpleSelect : function(json, index) {
			var query = json.query;
			if (undefined == query)
				return;
			var simpleItem = query.querySimpleItems;
			if (undefined == simpleItem)
				return;
			var simpleSearchSelect = Ext.getDom("simpleSearchSelect_" + index);
			if (simpleItem && simpleItem.length == 0) {
				$("sim_searchBox").style.display = "none";
			} else {
				$("sim_searchBox").style.display = "";
				viewBaseInfo.searchBarState = 1;
			}
			// xhuatang
			// $("sim_searchBox").style.display = "none";

			for (var i = 0; i < simpleItem.length; i++) {
				ucapCommonFun.addOption(simpleSearchSelect,
						simpleItem[i].itemNameEn, simpleItem[i].itemNameCn);
			}
		},

		/**
		 * 初始化高级查询 更改视图高级查询，改成与三级页面一样的绑定方式 yjy 2010 4 3
		 * 
		 * @param {}
		 *            json
		 */
		initAdvancedSelect : function(json, index) {
			var query = json.query;
			if ("undefined" == typeof(query) || query == null) {
				//2011-12-12 modify by xhuatang@linewell.com 添加索引，以保证search id的唯一
				var searchDiv = Ext.getDom("search_" + index);
				searchDiv.style.display = "none";
				return;
			}
			var advancedItem = query.queryAdvancedItems;

			if ("undefined" == typeof(advancedItem) || advancedItem == null
					|| advancedItem.length < 1) {
				Ext.getDom("advancedSearch_" + index).style.display = "none";
				// 增加代码 用于判断是否显示搜索栏
				var querySimpleItems = query.querySimpleItems;
				if ("undefined" == typeof(querySimpleItems)
						|| querySimpleItems == null
						|| querySimpleItems.length < 1) {
				    //2011-12-12 modify by xhuatang@linewell.com 添加索引，以保证search id的唯一
					var searchDiv = Ext.getDom("search_" + index);
					searchDiv.style.display = "none";
				}// end
				return;
			} else {// 当有高级查询的时候，设置searchBarState=1，表示有搜索栏，视图必须减去相应的高度 add by
				// fsm
				viewBaseInfo.searchBarState = 1;
			}

			view.viewBaseInfos[index].advancedJson = advancedItem;

			var advancedDiv = Ext.getDom("searchMore_" + index);

			var tri = 0;
			var html = "";// <table class='table2'>
			var timeFormat = "yyyy-MM-dd";
			for (var i = 0; i < advancedItem.length; i++) {
				advancedItem[i].itemNameEn = view.advPrefix
						+ advancedItem[i].itemNameEn;
				var inputHtml = "";
				timeFormat = "yyyy-MM-dd";
				if (advancedItem[i].hasBegin) {
					if ("undefined" != typeof(advancedItem[i].dataType)
							&& (advancedItem[i].dataType == "04" || advancedItem[i].dataType == "05")) {
						// TODO加入日期时间选择框
						inputHtml += "&nbsp;从&nbsp;&nbsp;<input type=\"text\" name='"
								+ advancedItem[i].itemNameEn
								+ "_1' class=\"inputred\" readOnly/>";
						// if(advancedItem[i].dataType=="05")timeFormat=timeFormat+"
						// HH:mm:ss";
						inputHtml += "<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""
								+ advancedItem[i].itemNameEn
								+ "_1\",dateFmt:\""
								+ timeFormat
								+ "\"});' src='"
								+ ucapSession.appPath
								+ "js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
						inputHtml += "&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" name='"
								+ advancedItem[i].itemNameEn
								+ "_2' class=\"inputred\" readOnly/>";
						if (advancedItem[i].dataType == "05")
							timeFormat = timeFormat + " HH:mm:ss";
						inputHtml += "<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""
								+ advancedItem[i].itemNameEn
								+ "_2\",dateFmt:\""
								+ timeFormat
								+ "\"});' src='"
								+ ucapSession.appPath
								+ "js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
					} else {
						inputHtml += "&nbsp;从&nbsp;&nbsp;<input type=\"text\" name='"
								+ advancedItem[i].itemNameEn
								+ "_1' class=\"inputsearchbox\"/>";
						inputHtml += "&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" name='"
								+ advancedItem[i].itemNameEn
								+ "_2' class=\"inputsearchbox\"/>";
					}
				} else {
					if ("undefined" != typeof(advancedItem[i].dataType)
							&& advancedItem[i].dataType == "20") {
						inputHtml += "<input type=\"hidden\" id='"
								+ advancedItem[i].itemNameEn + "' name='"
								+ advancedItem[i].itemNameEn
								+ "' class=\"inputsearchbox\"/>";
						inputHtml += "<input type=\"text\" id='"
								+ advancedItem[i].itemNameEn + "_Cn_' name='"
								+ advancedItem[i].itemNameEn
								+ "_Cn_' class=\"inputred\" readOnly/>";
						inputHtml += "<input type='button' class='btn1' name='btnselect' value='选择' onclick=\""
								+ "selectDataSD('"
								+ advancedItem[i].dataSource
								+ "',1,'"
								+ advancedItem[i].itemNameEn
								+ "')"
								+ "\"/>";
					} else if ("undefined" != typeof(advancedItem[i].dataType)
							&& advancedItem[i].dataType == "03") {
						inputHtml += "<select id='"
								+ advancedItem[i].itemNameEn + "' name='"
								+ advancedItem[i].itemNameEn + "'>"
								+ advancedItem[i].optionValue + "</select>";
					} else if ("undefined" != typeof(advancedItem[i].dataType)
							&& advancedItem[i].dataType == "02") {
						inputHtml += "<input type=\"text\" id='"
								+ advancedItem[i].itemNameEn + "' name='"
								+ advancedItem[i].itemNameEn
								+ "' class=\"inputsearchbox\"/>";
						// inputHtml+="<input type=\"text\"
						// id='"+advancedItem[i].itemNameEn+"_Cn_'
						// name='"+advancedItem[i].itemNameEn+"_Cn_'
						// class=\"inputred\" readOnly/>";
						// selectView(_ss,fieldNames,nameEn,_t,_ev,_sTitle,_purl,_recordSplitl,_colSplit,_sWidth,_sHeight);
						inputHtml += "<input type='button' class='btn1' name='btnselect' value='选择' onclick=\""
								+ "selectView('"
								+ advancedItem[i].dataSource
								+ "','"
								+ advancedItem[i].columnMap
								+ "','"
								+ advancedItem[i].itemNameEn + "')" + "\"/>";
					} else {
						inputHtml += "<input type=\"text\" id='"
								+ advancedItem[i].itemNameEn + "' name='"
								+ advancedItem[i].itemNameEn
								+ "' class=\"inputsearchbox\"/>";
					}
					if ("undefined" != typeof(advancedItem[i].dataType)
							&& (advancedItem[i].dataType == "04" || advancedItem[i].dataType == "05")) {
						inputHtml += "<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""
								+ advancedItem[i].itemNameEn
								+ "\",dateFmt:\""
								+ timeFormat
								+ "\"});' src='"
								+ ucapSession.appPath
								+ "js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
					}
				}
				if (tri % 2 == 0) {
					html += "<tr>";
					html += "<th height='20' class=\"head\">"
							+ advancedItem[i].itemNameCn + "</th>";
					if ((advancedItem.length <= (i + 1))
							|| advancedItem[i + 1].hasBegin) {
						html += "<td colspan='3'>";
						html += inputHtml;
						html += "</td>";
						html += "</tr>"
						tri = tri + 2;
					} else {
						if (advancedItem[i].hasBegin) {
							html += "<td colspan='3'>";
							html += inputHtml;
							html += "</td>";
							tri = tri + 2;
						} else {
							html += "<td>" + inputHtml + "</td>";
							tri = tri + 1;
						}
					}
				} else {
					html += "<th height='20' class=\"head\">"
							+ advancedItem[i].itemNameCn + "</th>";
					html += "<td>";
					html += inputHtml + "</td>";
					html += "</tr>";
					tri = tri + 1;
				}
			}

			if (html != "") {
				if (html.substring(html.length - 5, html.length) != "</tr>") {
					html = html.substring(0, html.length - 5);
				} else {
					html = html.substring(0, html.length - 10);
				}
				// html +="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button'
				// class='btn1' value='搜索'
				// onclick='view.advancedSearch("+index+")'/></td></tr>";
				html += "</td></tr><tr><td colspan='4'  align='right'><input type='button' class='btn1' value='搜索' onclick='view.advancedSearch("
						+ index
						+ ")'/>&nbsp;&nbsp;<input type='button' class='btn1' value='重置'  qtip='重置视图数据'   onclick='view.advancedSeaReset("
						+ index + ")'/>&nbsp;</td></tr>";
			}
			html = "<table class=\"table2\">"
					+ '<COL width="15%"><COL width="35%"><COL width="15%"><COL width="35%">'
					+ html;
			html += "</table>";
			advancedDiv.innerHTML = html;
			/**/
		},
		/**
		 * 加载普通类型的视图数据
		 * 
		 * @param {}
		 *            index
		 */
		loadCommonGrid : function(curViewId, index, noPreview, noSelfConfig) {
			var searchDiv = Ext.getDom('search');
			var vcDiv = Ext.getDom("viewCategories");

			var url = view.personal.getViewDataUrl(curViewId);
			// 定义列模型
			var items = null;
			var remoteSort = true;

			// 如果是编辑就通过编辑模型获取编辑的列数据
			if (view.viewBaseInfos[index].isEdit) {
				// 在高级查询，如果是有来自字典类型的数据，那么在编辑视图中没法适用，主要是因为下面语句把select给弄没了
				items = Ext.util.JSON.decode(view.personal
						.getEditColumnModuleJson(index, view.json));
				remoteSort = false;
			} else {
				items = Ext.util.JSON.decode(view.personal.getColumnModuleJson(
						view.json, index));
			}
			var cm = new Ext.grid.ColumnModel(items);
			// 定义数据源为远程代理和JSON数据格式
			var ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : url
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'root'
						}, view.personal.getJsonReader(view.json)),
				remoteSort : remoteSort
					// 设置排序方式为后台排序，后台获取的参数的方式：排序名称的参数为：sort,排序方式的参数为:dir
				});// end ds

			// 定义复选框
			var sm = null;
			if (view.isSingle == "1") {
				sm = new Ext.grid.RowSelectionModel({
							singleSelect : true
						});
			} else {
				sm = new Ext.grid.CheckboxSelectionModel();
			}

			var gridTbar = null;
			if ("undefined" == typeof(view.noTbar) || view.noTbar != "true") {
				gridTbar = new Ext.Toolbar({
							items : view.personal.getTBarJson(view.json, index,
									noPreview, noSelfConfig)
						});
			}

			var gridBbar = null;
			if ("undefined" == typeof(view.noBbar) || view.noBbar != "true") {
				gridBbar = new Ext.PagingToolbar({
							pageSize : view.viewBaseInfos[index].pageSize,
							store : ds,
							displayInfo : true,// 为false，不显示视图的记录信息，单显示分页
							displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
							emptyMsg : "没有记录"
						});
			}
			// 设置所有列字段默认排序
			// 定义一个表格面板
			var grid = null;
			if (view.viewBaseInfos[index].isEdit) {
				grid = new Ext.grid.EditorGridPanel({
							id : view.namePrefix + index,// 设置标识ID，方便以后引用！
							stripeRows : true,// 让grid相邻两行背景色不同，具体颜色值还可修改ext-all.css中的.x-grid3-row-alt颜色值
							cm : cm,// 列模型
							ds : ds,// 数据源
							sm : sm,// 复选框
							loadMask : true, //
							height : Ext.get("ucapView").getHeight()
									- ucapUmc.otherViewHeight,
							width : Ext.get("umcMainRight").getWidth(),
							tbar : gridTbar,
							// 表格底部分页工具栏
							bbar : gridBbar,
							// 是否单击就进入编辑状态
							clicksToEdit : 1,
							renderTo : view.namePrefix + index
						});

			} else {
				grid = new Ext.grid.GridPanel({
							id : view.namePrefix + index,// 设置标识ID，方便以后引用！
							// 以下三个属性去掉，就可实现去掉表格面板的边框
							// title : view.displayName,// 标题
							// header:true,//是否显示标题栏，为false则不显示
							stripeRows : true,// 让grid相邻两行背景色不同，具体颜色值还可修改ext-all.css中的.x-grid3-row-alt颜色值
							cm : cm,// 列模型
							ds : ds,// 数据源
							sm : sm,// 复选框
							loadMask : true, //              
							height : Ext.get("ucapView").getHeight()
									- ucapUmc.otherViewHeight,
							width : Ext.get("umcMainRight").getWidth(),
							// width : 940,
							// UI视图配置
							// 强制设置了表格的宽度，此属性去点，表格中列的宽度就可以根据列设置的宽度
							viewConfig : {
								forceFit : false
							},
							// 表格顶部动作或按钮工具栏

							tbar : gridTbar,
							// 表格底部分页工具栏
							bbar : gridBbar,
							enableDragDrop : view.enableDragDrop,// GridPanel行的拖动
							// add by jc
							// 20100303
							renderTo : view.namePrefix + index

						});
				grid.on("headerclick", view.personal.headerclick);
				// 鼠标移过去的提示信息
				if (view.json.messageType != ""
						&& view.json.messageType != "01") {
					grid.on("mouseover", view.personal.mouseover);
				}

				// 视图上列移动的数据实现
				grid.getColumnModel().on('columnmoved', view.columnMove);
				// 视图上行双击的事件添加实现
				grid.on('rowdblclick', view.personal.rowdbClick);

				// 单元格单击事件实现
				grid.on('cellclick', view.personal.cellclick);
			}
			// modify by jc 20100401移动部分代码先后执行顺序，使视图加载时出现正在加载中信息
			// 加载首页数据，每页显示10条记录
			ds.load({
						params : {
							start : 0,
							limit : view.viewBaseInfos[index].pageSize
						}
					});// end ds.load
			// add by jc设置视图数据源到全局变量
			if (null == view.stores)
				view.stores = new Array();
			view.stores[view.index] = ds;
			cm.defaultSortable = true;
			if (null != grid.getStore().getSortState()) {
				grid.getStore().getSortState().field = null;
			}
		},
		/**
		 * 获取视图列的json格式数据
		 * 
		 * @param {}
		 *            json
		 */
		getColumnModuleJson : function(json, index) {
			// 先判断是否有选项列
			var columnModuleJson = "";
			view.checkPosition = json.checkPosition;

			// columnModuleJson="new Ext.grid.RowNumberer()";
			// 左边
			var opos = 0;
			if (view.checkPosition == "02") {
				columnModuleJson += "new Ext.grid.CheckboxSelectionModel()";
				opos--;
			}

			var viewItems = json.viewItems;
			for (var i = 0; i < viewItems.length; i++) {
				if (undefined == typeof(viewItems[i].itemNameEn)
						|| viewItems[i].itemNameEn == "")
					continue;
				if (viewItems[i].itemNameEn == "~display~opr~") {
					view.viewBaseInfos[index].operationPos = i - opos;
				}
				if (columnModuleJson == "") {
					columnModuleJson = "{header:'" + viewItems[i].displayName
							+ "'";
				} else {
					columnModuleJson = columnModuleJson + ",{header:'"
							+ viewItems[i].displayName + "'";
				}
				columnModuleJson += ",dataIndex:'"
						+ viewItems[i].itemNameEn.toLowerCase() + "'";
				// 操作列不进行排序，~display~opr~为操作列的名称 myd by llp 2010-05-31
				// 视图序号列不进行排序，~display~seqnum~为操作列的名称 mdf by jc 20100610
				if (viewItems[i].itemNameEn.toLowerCase() == "~display~opr~"
						|| viewItems[i].itemNameEn.toLowerCase() == "~display~seqnum~") {
					columnModuleJson += ",sortable:false"
				}

				var columnWidth = viewItems[i].width;

				var widthType = viewItems[i].widthType;

				if (!viewItems[i].display) {
					columnModuleJson += ",hidden:true,hideable:false";
					opos++;
				}

				if (widthType == "02") {
					columnWidth = view.width * columnWidth / 100;
				}

				columnModuleJson += ",width:" + columnWidth;

				if (viewItems[i].conversion != "") {
					columnModuleJson += ",renderer:" + viewItems[i].conversion;
				}
				columnModuleJson += "}";
			}// 列加载完毕

			// 右边
			if (view.checkPosition == "03") {
				columnModuleJson += ",new Ext.grid.CheckboxSelectionModel()";
			}
			columnModuleJson = "[" + columnModuleJson + "]";

			return columnModuleJson;
		},

		/**
		 * 获取可编辑表格的列模型
		 * 
		 * @param {}
		 *            json 列数据模型
		 */
		getEditColumnModuleJson : function(index, json) {
			// 先根据当前的index属性获取当前的视图展示的表单，以便获取其中的字段信息,直接从先前的表单中进行获取
			var vbi = view.viewBaseInfos[index];
			var url = ucapSession.baseAction;
			url += "?formType=" + vbi.formType + "&formId=" + vbi.formId
					+ "&type=getForm&rand=" + Math.random();
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", url, false);
			conn.send(null);
			var itemsJson = Ext.util.JSON.decode(conn.responseText);
			var exResult = ucapCommonFun.dealException(itemsJson);
			if (!exResult)
				return;

			view.viewBaseInfos[index].formItemsJson = itemsJson;
			var opos = 0;
			// 先判断是否有选项列
			var columnModuleJson = "";
			view.checkPosition = json.checkPosition;

			// columnModuleJson="new Ext.grid.RowNumberer()";
			// 左边
			if (view.checkPosition == "02") {
				columnModuleJson += "new Ext.grid.CheckboxSelectionModel()";
				opos--;
			}

			var viewItems = json.viewItems;

			for (var i = 0; i < viewItems.length; i++) {
				if (undefined == typeof(viewItems[i].itemNameEn)
						|| viewItems[i].itemNameEn == "")
					continue;
				if (viewItems[i].itemNameEn == "~display~opr~") {
					view.viewBaseInfos[index].operationPos = i - opos;
				}
				var itemJson = view.getItemJsonByItemUnid(itemsJson,
						viewItems[i].itemUnid);
				if (columnModuleJson == "") {
					columnModuleJson = "{header:'" + viewItems[i].displayName
							+ "'";
				} else {
					columnModuleJson = columnModuleJson + ",{header:'"
							+ viewItems[i].displayName + "'";
				}
				columnModuleJson += ",dataIndex:'"
						+ viewItems[i].itemNameEn.toLowerCase() + "'";

				var columnWidth = viewItems[i].width;

				var widthType = viewItems[i].widthType;

				if (!viewItems[i].display) {
					columnModuleJson += ",hidden:true,hideable:false";
					opos++;
				}

				if (widthType == "02") {
					columnWidth = view.width * columnWidth / 100;
				}

				columnModuleJson += ",width:" + columnWidth;

				if (viewItems[i].conversion != "") {
					columnModuleJson += ",renderer:" + viewItems[i].conversion;
				} else {
					if (null != itemJson
							&& (itemJson.item.sourceType == "04" || itemJson.item.sourceType == "05")) {
						columnModuleJson += ",renderer:view.formatDate";
					}
				}
				// 判断iseditjs，为0,或者返回false时不可编辑否则可编辑 add by fsm 10.7.22
				var colIsEdit = true;
				if (typeof viewItems[i].iseditjs != "undefined"
						&& viewItems[i].iseditjs != "") {
					colIsEdit = ucapCommonFun
							.evalJavaScript(viewItems[i].iseditjs);
				}
				if (colIsEdit) {
					var editor = view.getEditerByItemJson(itemJson,
							viewItems[i]);
					if (null != editor && editor != "") {
						columnModuleJson += "," + editor;
					}
				}
				// end

				columnModuleJson += "}";
			}// 列加载完毕

			// 右边
			if (view.checkPosition == "03") {
				columnModuleJson += ",new Ext.grid.CheckboxSelectionModel()";
			}
			columnModuleJson = "[" + columnModuleJson + "]";

			return columnModuleJson;
		},
		/**
		 * 获取视图数据的连接地址
		 * 
		 * @return {}
		 */
		getViewDataUrl : function(curViewId) {
			var url;
			var belongToAppId = typeof(ucapManagerTree) != "undefined"
					? ucapManagerTree.curBelongToAppId
					: "";
			url = view.dataUrl + "&rand=" + Math.random() + "&viewId="
					+ curViewId + "&belongToAppId=" + belongToAppId;
			var urlsp = url.split("?");
			url = url.substring(urlsp[0].length + 1);
			var urljson = Ext.urlDecode(url);
			var purljson = Ext.urlDecode(view.purl);
			Ext.apply(purljson, urljson);
			url = urlsp[0] + "?" + Ext.urlEncode(purljson);
			return url;
		},
		/**
		 * 获取视图列json格式数据
		 * 
		 * @param {}
		 *            json
		 */
		getJsonReader : function(json) {
			var jsonReader = "";
			var viewItems = json.viewItems;

			for (var i = 0; i < viewItems.length; i++) {
				if (undefined == typeof(viewItems[i].itemNameEn)
						|| viewItems[i].itemNameEn == "")
					continue;
				if (jsonReader == "") {
					jsonReader += "{name:'"
							+ viewItems[i].itemNameEn.toLowerCase() + "'}"
				} else {
					jsonReader += ",{name:'"
							+ viewItems[i].itemNameEn.toLowerCase() + "'}"
				}
			}
			jsonReader = "[" + jsonReader + "]";
			return Ext.util.JSON.decode(jsonReader);
		},
		/**
		 * 获取工具栏上的json
		 * 
		 * @param {}
		 *            json
		 */
		getTBarJson : function(json, index, noPreview, noSelfConfig) {
			var TBarJson = "";
			var buttonItems = json.subButtonList;
			for (var i = 0; i < buttonItems.length; i++) {
				if (typeof buttonItems[i].button == "undefined"
						|| buttonItems[i].button == "null"
						|| buttonItems[i].button == null
						|| buttonItems[i].displayPosition == "02")
					continue;
				if ("undefined" != typeof(buttonItems[i].js)
						&& buttonItems[i].js != "") {
					var result = ucapCommonFun
							.evalJavaScript(buttonItems[i].js);
					if (!result)
						continue;
				}
				if (TBarJson == "") {
					TBarJson = "{id:'btn" + buttonItems[i].unid + "'";
				} else {
					TBarJson += ",{id:'btn" + buttonItems[i].unid + "'";
				}
				TBarJson += ",text:'" + buttonItems[i].name + "'";
				// 加上按钮的提示信息
				if (buttonItems[i].tip != null && buttonItems[i].tip != "") {
					TBarJson += ",tooltip:'" + buttonItems[i].tip + "'";
				}
				if ("undefined" != typeof(buttonItems[i].picture)
						&& buttonItems[i].picture != "") {
					TBarJson += ",icon:'" + ucapSession.sUserImgPath
							+ buttonItems[i].picture + "'";
					TBarJson += ",iconCls:'x-btn-text-icon'";
				}
				var codeType = buttonItems[i].button.codeType;

				if (codeType == "01") {
					TBarJson += ",handler:function(){view.index=" + index + ";"
							+ buttonItems[i].button.code + "}}";
				} else if (codeType == "02") {// 扩展功能
					TBarJson += ",handler:function(){view.index=" + index + ";"
							+ "view.executeInteration('"
							+ buttonItems[i].button.code + "')}}";
				} else if (codeType == "03") {
					// 说明是流程新建窗口
					TBarJson += ",handler:function(){view.index=" + index + ";"
							+ "ucapCommonFun.newFlowDocByFlowIds('"
							+ buttonItems[i].button.code + "')}}";
				}
			}// end for
			// 添加默认按钮，by xhuatang@linwell.com 2011-05-05
			if (TBarJson == "") {
				TBarJson = "{id:'btnAdd',text:'新增',handler:function(){view.index="
						+ index + ";view.newDocument()" + "}}";
				TBarJson += ",{id:'btndelete',text:'删除',handler:function(){view.index="
						+ index + ";" + "view.deleteDocument()" + "}}";
				TBarJson += ",{id:'btnmodify',text:'修改',handler:function(){view.index="
						+ index + ";" + "view.openDocument(3)" + "}}";
				TBarJson += ",{id:'btnrefresh',text:'刷新',handler:function(){view.index="
						+ index + ";" + "view.refresh()" + "}}";
				TBarJson += ",{id:'btnreset',text:'重置',handler:function(){view.index="
						+ index + ";" + "view.reset()" + "}}";
			}
			if (TBarJson != "") {
				TBarJson = TBarJson + ",'->'";
			} else {
				TBarJson = TBarJson + "'->'";
			}

			TBarJson += ",{id:'btnno',text:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}";
			TBarJson = "[" + TBarJson + "]";

			return Ext.util.JSON.decode(TBarJson);
		},
		/**
		 * 私有方法，通过表格的标识获取表格序号
		 * 
		 * @param {}
		 *            gridId
		 * @return {}
		 */
		getGridNum : function(gridId) {
			var result = 0;
			if (gridId != "") {
				result = Number(gridId.replace(view.namePrefix, ""));
			}

			return result;
		},

		/**
		 * 获取表格的当前行数
		 */
		getGridRowCount : function() {
			var grid = Ext.getCmp(view.namePrefix + view.index);
			var rownum = grid.getStore().getCount();
			return rownum;
		},

		/**
		 * 视图列移动函数
		 * 
		 * @param {}
		 *            columnModal
		 * @param {}
		 *            oldIndex
		 * @param {}
		 *            newIndex
		 */
		columnMove : function(columnModal, oldIndex, newIndex) {
			if (view.viewBaseInfos[view.currentGridIndex].checkPosition == "02") {
				oldIndex = oldIndex - 1;
				newIndex = newIndex - 1;
			}
			var requestConfig = {
				url : ucapSession.baseAction,
				params : {
					"type" : "viewSelfConfig",
					"action" : "sortViewColumn",
					"viewId" : view.viewBaseInfos[view.currentGridIndex].viewId,
					"oldIndex" : oldIndex,
					"newIndex" : newIndex
				},
				callback : function(options, success, response) {
					if (success) {
						var exjson = Ext.util.JSON
								.decode(response.responseText);
						var exResult = ucapCommonFun.dealException(exjson);
						if (!exResult)
							return;

					} else {
						Ext.Msg.alert("提示", "移动失败，下次登录时将不起作用！");
					}
				}
			}

			Ext.Ajax.request(requestConfig);
		},

		/**
		 * 设置单击列所在的表格
		 * 
		 * @param {}
		 *            grid
		 * @param {}
		 *            columnIndex
		 * @param {}
		 *            e
		 */
		headerclick : function(grid, columnIndex, e) {
			view.currentGridIndex = view.personal.getGridNum(grid.id);
		},

		/**
		 * 视图行双击函数
		 * 
		 * @param {}
		 *            grid
		 * @param {}
		 *            rowIndex
		 * @param {}
		 *            e
		 */
		rowdbClick : function(grid, rowIndex, e) {
			var gridNum = view.personal.getGridNum(grid.id);
			var vbi = view.viewBaseInfos[gridNum];
			var openJs = vbi.openJs;

			// 如果打开的脚本为0的话，则不打开相应的文档
			if (openJs == "0")
				return;

			if (vbi.isSonView) {
				var row = grid.getStore().getAt(rowIndex);
				var columnIndex = 0;

				if (view.viewBaseInfos[gridNum].checkPosition == "02") {
					columnIndex = 1;
				}

				var unid = row.data[grid.getColumnModel()
						.getDataIndex(columnIndex)];

				view.openDocument(1, gridNum, unid, vbi.formType, vbi.formId);
			}
		},

		/**
		 * 普通视图的列单击函数
		 * 
		 * @param {}
		 *            grid
		 * @param {}
		 *            rowIndex
		 * @param {}
		 *            columnIndex
		 * @param {}
		 *            e
		 */
		cellclick : function(grid, rowIndex, columnIndex, e) {
			if (columnIndex == 0)
				return;
			var gridNum = view.personal.getGridNum(grid.id);
			// if(view.viewBaseInfos[gridNum].operationPos==(columnIndex-1))return;
			// columnIndex-1 必须有且只有一个隐藏列才起作用，否则会有问题 mdf by jc 20100831
			if (grid.getColumnModel().getDataIndex(columnIndex) == "~display~opr~")
				return;
			var vbi = view.viewBaseInfos[gridNum];
			var openJs = vbi.openJs;
			// 以单列打开，默认为第二列，隐藏列算在内 add by jc 20100916
			var isSimpleLink = vbi.isSimpleLink;
			if (isSimpleLink && columnIndex != 2) {
				return;
			}
			// 如果打开的脚本为0的话，则不打开相应的文档
			if (openJs == "0")
				return;

			if (!vbi.isSonView) {
				var row = grid.getStore().getAt(rowIndex);
				var columnIndex = 0;

				if (view.viewBaseInfos[gridNum].checkPosition == "02") {
					columnIndex = 1;
				}

				var unid = row.data[grid.getColumnModel()
						.getDataIndex(columnIndex)];
				// 视图预览事件 mdf by jc 20100609
				var previewType = view.viewBaseInfos[gridNum].previewType;
				// 默认的宽度与高度
				view.openDocument(1, gridNum, unid, vbi.formType, vbi.formId);

			}
		},
		/**
		 * 鼠标移过去的触发事件代码
		 * 
		 * @param {}
		 *            e
		 * @param {}
		 *            t
		 */
		mouseover : function(e, t) {
			// var grid = Ext.getCmp(view.namePrefix+view.index);
			var curViewId = "";
			// alert(mouseOverIndex);
			var rowIndex = this.getView().findRowIndex(t);

			if (rowIndex == view.mouseOverIndex)
				return;

			view.mouseOverIndex = rowIndex;

			var row = this.getStore().getAt(view.mouseOverIndex);

			if (null == row || typeof(row) == "undefined")
				return;

			var columnIndex = 0;
			var vbi = view.viewBaseInfos[view.personal.getGridNum(this.id)];
			if (vbi.checkPosition == "02") {
				columnIndex = 1;

			}
			curViewId = vbi.viewId;

			var unid = row.data[this.getColumnModel().getDataIndex(columnIndex)];

			var qhtml = ucapCommonFun.getViewTip(curViewId, unid);

			Ext.QuickTips.register({
						target : e.target,
						text : qhtml,
						autoHide : true,
						hideDelay : 0,
						showDelay : 0
					})
		}
	},
	// 高级搜索的重置--fsm-2010.2.4
	advancedSeaReset : function(index) {
		var divobj = Ext.getDom("searchMore_" + index);
		var inputObjs = divobj.getElementsByTagName("input");
		for (var i = 0; i < inputObjs.length; i++) {
			var inputObj = inputObjs[i];
			if (inputObj.getAttribute("type") != "button")
				inputObj.value = "";
		}
		view.reset();
	},
	/**
	 * 设置高级检索
	 * 
	 * @param {}
	 *            obj
	 * @param {}
	 *            index 视图索引
	 */
	setSearchMore : function(obj, index) {
		var searchMoreDiv = document.getElementById('searchMore_' + index);
		var divHeight = searchMoreDiv.offsetHeight;
		if (searchMoreDiv.style.display == '') {
			var gridPanel = null;
			if (view.viewBaseInfos[index].viewType == "02"
					|| view.viewBaseInfos[index].viewType == "03") {
				gridPanel = Ext.getDom(view.namePrefix + index);
				gridPanel.style.height = gridPanel.offsetHeight + divHeight;
			} else {
				gridPanel = Ext.getCmp(view.namePrefix + index);
				gridPanel.setHeight(gridPanel.getInnerHeight()
						+ gridPanel.getFrameHeight() + divHeight);
			}
			searchMoreDiv.style.display = 'none';
			obj.value = "▼高级搜索";
		} else {
			searchMoreDiv.style.display = '';
			divHeight = searchMoreDiv.offsetHeight;
			var gridPanel = null;
			if (view.viewBaseInfos[index].viewType == "02"
					|| view.viewBaseInfos[index].viewType == "03") {
				gridPanel = Ext.getDom(view.namePrefix + index);
				gridPanel.style.height = gridPanel.offsetHeight - divHeight;
			} else {
				gridPanel = Ext.getCmp(view.namePrefix + index);
				gridPanel.setHeight(gridPanel.getInnerHeight()
						+ gridPanel.getFrameHeight() - divHeight);
			}
			// 宽度取不到，则防止宽度为负数出错（用户视图为概要类型时会出错）
			obj.value = "▲高级搜索";
		}
		// 防止视图打开时出现不必要的滚动条mdf by jc 20100609
		// document.body.style.overflowY="auto";
	},

	/**
	 * 单元格编辑后的事件,做为单元格事件的参考
	 * 
	 * @param {}
	 *            obj
	 */
	focus : function(f) {
		var grid = Ext.getCmp(view.namePrefix + view.index);

		var selectModule = grid.getSelectionModel();
		// 获取表格所在的行
		var row = selectModule.getSelected();

		// 设置相应单元格的值
		f.setValue("设置单元格的值!");
	},

	/**
	 * @param insertDataJson
	 *            符合json格式的数据 String
	 * 
	 * 在可编辑表格中插入一行数据
	 * 
	 */
	insertEditorGridData : function(insertDataJson) {
		var grid = Ext.getCmp(view.namePrefix + view.index);
		var recordJson = "";
		var dataJson = "";
		var toLoadData = true;
		if ("undefined" != typeof(insertDataJson) && insertDataJson != "") {
			dataJson = insertDataJson;
			toLoadData = false;
		}
		var colCount = grid.getColumnModel().getColumnCount(false);
		var beginIndex = 1;
		if (view.viewBaseInfos[view.index].checkPosition != "02")
			beginIndex = 0;
		var curSeqNum = grid.getStore().getCount();
		for (var j = beginIndex; j < colCount; j++) {
			var dataIndex = grid.getColumnModel().getDataIndex(j);
			// 增加视图序号add by jc 20100610
			// 增加视图序号add by jc 20100610
			if (dataIndex == "~display~opr~" || dataIndex == "~display~seqnum~") {
				if (dataIndex == "~display~seqnum~") {
					if (recordJson == "") {
						recordJson += "{name:'" + dataIndex + "'}";
						if (toLoadData)
							dataJson += "'" + dataIndex + "'" + ":'"
									+ (curSeqNum + 1) + "'";

					} else {
						recordJson += ",{name:'" + dataIndex + "'}";
						if (toLoadData)
							dataJson += ",'" + dataIndex + "'" + ":'"
									+ (curSeqNum + 1) + "'";
					}
				}

				continue;
			}
			var itemJson = view.getItemJsonByItemUnid(
					view.viewBaseInfos[view.index].formItemsJson, dataIndex);
			var val = "";
			if (null != itemJson && null != itemJson.uiItemValueList) {
				for (var k = 0; k < itemJson.uiItemValueList.length; k++) {
					if (val == "") {
						val = typeof(itemJson.uiItemValueList[k].value) == "undefined"
								? itemJson.uiItemValueList[k].text
								: itemJson.uiItemValueList[k].value;
					} else {
						val += "," + typeof(itemJson.uiItemValueList[k].value) == "undefined"
								? itemJson.uiItemValueList[k].text
								: itemJson.uiItemValueList[k].value;
					}
				}
			}
			if (recordJson == "") {
				recordJson += "{name:'" + dataIndex + "'}";
				if (toLoadData)
					dataJson += dataIndex + ":'" + val + "'";

			} else {
				recordJson += ",{name:'" + dataIndex + "'}";
				if (toLoadData)
					dataJson += "," + dataIndex + ":'" + val + "'";
			}
		}
		var Record = Ext.data.Record.create(Ext.decode("[" + recordJson + "]"));
		var r = new Record(Ext.decode("{" + dataJson + "}"));
		var rowCount = grid.getStore().getCount();
		grid.stopEditing();
		grid.getStore().insert(rowCount, r);
		grid.startEditing(rowCount, beginIndex + 1);
	},

	/**
	 * 删除表格中的数据
	 */
	deleteEditorGridData : function() {
		var grid = Ext.getCmp(view.namePrefix + view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if (null == selectedRow.length || undefined == selectedRow.length)
			selectedRow = new Array(selectedRow);

		var vb = view.viewBaseInfos[view.index];
		if (!vb.isEdit)
			return;
		var formUnid = vb.formId, formType = vb.formType;
		var beginIndex = 1;
		if (vb.checkPosition != "02")
			beginIndex = 0;

		for (var i = 0; i < selectedRow.length; i++) {

			var unidIndex = grid.getColumnModel().getDataIndex(beginIndex);
			var t = {};
			var row = selectedRow[i];
			t["formUnid"] = formUnid;
			t["formType"] = formType;
			t["isDel"] = "true";
			t["isFlowItem"] = vb.flowItem == 1 ? 'true' : 'false';
			var unid = row.data[unidIndex];
			t["docUnid"] = unid;
			var strResult = Ext.encode(row.json);
			if ("" != strResult && null != strResult && "null" != strResult) {
				strResult = "[" + strResult + "]";
			} else {
				strResult = "";
			}
			t["strResult"] = strResult;
			t["unid"] = unid;
			t["isNew"] = "0";
			if ("" != unid && null != unid) {
				view.deleteViewData[view.deleteViewData.length] = t;
			}
			grid.getStore().remove(row);
		}
	},
	/**
	 * add by fsm 2011-4-28 获取可编辑表格删除的数据
	 * 
	 * @param {}
	 *            jresutl
	 */
	getDeleteEditorGridDatas : function(jresutl) {
		var obj = view.deleteViewData;
		for (var i = 0; i < obj.length; i++) {
			var o = obj[i];
			jresutl[jresutl.length] = o;
		}
	},

	/**
	 * 根据编辑视图中配置增加函数，在回车的时候进行增加，如果没有配置此函数，则回车时则不增加
	 */
	addEditorGridRow : function() {
		if (null != view.viewBaseInfos[0].addRowjs
				&& "" != view.viewBaseInfos[0].addRowjs) {
			if (view.viewBaseInfos[0].addRowjs.indexOf(")") > 0) {
				eval(view.viewBaseInfos[0].addRowjs);
			} else {
				eval(view.viewBaseInfos[0].addRowjs + "()");
			}
		}
	},
	/**
	 * 用于获取视图表单列表获取保存数据用的。 目前在form.js的保存中调用
	 * 
	 * @param {}
	 *            mainForm 主表单JSON
	 * @param {}
	 *            isNew 主表单是否为新建，如果有值则是旧文档，无值则是新文档
	 * @param {}
	 *            jresult 在文档保存时存放提交到后台的保存数据
	 * @param {}
	 *            sp 表单列表的后缀
	 * @param {}
	 *            formValidatorMode 表单验证模式
	 * @return {Boolean}
	 * @author JC_Seekart
	 */
	getViewFormDatas : function(mainForm, isNew, jresult, sp, formValidatorMode) {
		// 表单验证模式modify by jc 20100512
		if (null == formValidatorMode
				|| typeof(formValidatorMode) == "undefined") {
			formValidatorMode = 2;
		}
		if (!Validator.Validate(_UcapForm.mainDiv, formValidatorMode)) {
			return false;
		}
		if (!sp)
			sp = "_pox_";
		var mid = mainForm["form"]["unid"];
		var all = _UcapForm.handler.allViewFormList;
		for (var vf in all) {
			for (var i = 0; i < all[vf].length; i++) {
				var singleForm = all[vf][i];
				if (singleForm)
					_UcapForm.singleFormData(singleForm, mid, mainForm, isNew,
							jresult, sp + (i + 1));
			}
		}
		return true;
	},
	/**
	 * 获取可编辑后的数据
	 * 
	 */
	getEditorGridDatas : function() {
		var vb = view.viewBaseInfos[view.index];
		if (!vb.isEdit)
			return "[]";
		var formUnid = vb.formId, formType = vb.formType;
		var grid = Ext.getCmp(view.namePrefix + view.index);
		// 如果没有指定只保存选中行的数据的话，那么保存所有行
		if (!vb.onlysaveSelected) {
			grid.getSelectionModel().selectAll();
		}
		var rowCount = grid.getSelectionModel().getCount(); // 表格中的行数

		if (rowCount < 1)
			return "[]";

		var datas = "[";

		var colCount = grid.getColumnModel().getColumnCount(false);

		var beginIndex = 1;

		if (vb.checkPosition != "02")
			beginIndex = 0;
		for (var i = 0; i < rowCount; i++) {
			var row = grid.getSelectionModel().getSelections()[i];
			var unidIndex = grid.getColumnModel().getDataIndex(beginIndex);
			// 不是新增并且没有过的话，直接跳过
			if ((row.data[unidIndex] != null && row.data[unidIndex] != "")
					&& !row.dirty)
				continue;
			if (datas != "[") {
				datas += ",{";
			} else {
				datas += "{";
			}
			datas += "formUnid:'";
			if (vb.sourceType == "01") {
				datas += vb.sourceUnid;
			} else {
				datas += vb.formId;
			}
			datas += "',unid:'" + (row.data[unidIndex] || "") + "',isNew:";

			if (null == row.data[unidIndex] || row.data[unidIndex] == "") {
				datas += "'1'"
			} else {
				datas += "'0'"
			}

			datas += ",item:[";

			for (var j = beginIndex; j < colCount; j++) {
				var dataIndex = grid.getColumnModel().getDataIndex(j);
				// 过滤视图序号mdf by jc 20100610
				if (dataIndex == unidIndex || dataIndex == "~display~opr~"
						|| dataIndex == "~display~seqnum~")
					continue;
				// 不是新增并且没有过的话，直接跳过
				if ((null != row.data[unidIndex] && row.data[unidIndex] != "")
						&& !row.isModified(dataIndex))
					continue;
				// 视图验证 add by jc 20100513
				var errMsg = Validator.ValidateByData(dataIndex,
						(row.data[dataIndex] || ""), "", formUnid, formType);
				if (errMsg != true) {
					return "{error:'视图第" + (i + 1) + "行：" + errMsg + "!'}";
				}
				// 视图验证结束<---
				datas += "{k:'"
						+ dataIndex
						+ "',v:"
						+ Ext.encode(view
								.formatDate((row.data[dataIndex] || "")))
						+ "},";
			}
			datas = datas.substring(0, datas.length - 1);
			datas += "]";
			datas += "}";
		}
		datas += "]";
		return datas;
	},
	/**
	 * 格式化日期格式的数据
	 * 
	 * @param {}
	 *            value
	 * @return {}
	 */
	formatDate : function(value) {
		try {
			return value.format("Y-m-d");
		} catch (Exception) {
			return value;
		}
	},
	/**
	 * 通过itemsjson及itemUnid获取到相应的item对象
	 * 
	 * @param {}
	 *            itemsJson itemsJson对象
	 * 
	 * @param {}
	 *            itemUnid 字段标识
	 */
	getItemJsonByItemUnid : function(itemsJson, itemUnid) {
		var itemJson = null;

		if (null != itemsJson && itemsJson.uiItemList.length > 0) {
			for (var i = 0; i < itemsJson.uiItemList.length; i++) {
				var tmpItemJson = itemsJson.uiItemList[i];
				if (null != tmpItemJson
						&& null != tmpItemJson.item
						&& (itemUnid == tmpItemJson.item.unid || tmpItemJson.item.nameEn
								.toLowerCase() == itemUnid)) {
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
	 * @param {}
	 *            itemJson
	 * @param {}
	 *            viewItem
	 * @return {}
	 */
	getEditerByItemJson : function(itemJson, viewItem) {
		var editJson = "";
		if (null == itemJson || null == itemJson.item)
			return editJson;
		switch (itemJson.item.sourceType) {
			case '03' :
				editJson = "editor: new Ext.form.ComboBox({typeAhead:true,triggerAction:'all',transform:'"
						+ itemJson.item.nameEn.toLowerCase()
						+ "',lazyRender:true,listClass: 'x-combo-list-small'";
				if (null != itemJson.item.itemShow) {// 加入只读属性
					if ("undefined" != typeof(itemJson.item.itemShow.readOnly)
							&& itemJson.item.itemShow.readOnly) {// 如果字段只读的话
						editJson += ",readOnly:true";
					}
				}
				editJson += "})";

				var dictSelect = document.getElementById(itemJson.nameEn);
				if ("undefined" == typeof(dictSelect) || null == dictSelect) {
					dictSelect = document.createElement("select");
					dictSelect.id = itemJson.item.nameEn.toLowerCase();
					dictSelect.name = itemJson.item.nameEn.toLowerCase();
					dictSelect.style.display = "none";

					if (null != itemJson.dictTree
							&& null != itemJson.dictTree.children) {
						for (var i = 0; i < itemJson.dictTree.children.length; i++) {
							ucapCommonFun.addOption(dictSelect,
									itemJson.dictTree.children[i].value,
									itemJson.dictTree.children[i].text);
						}
					}

					document.body.insertBefore(dictSelect);
				}

				break;
			case '04' :
				editJson = "editor:new Ext.form.DateField({format:'yyyy-MM-dd'";
				if (null != itemJson.item.itemShow) {
					if ("undefined" != typeof(itemJson.item.itemShow.readOnly)
							&& itemJson.item.itemShow.readOnly) {// 如果字段只读的话
						editJson += ",readOnly:true";
					}
				}
				editJson += "})";
				break;
			case '05' :
				editJson = "editor:new Ext.form.DateField({format:'yyyy-MM-dd HH:mm'";
				if (null != itemJson.item.itemShow) {
					if ("undefined" != typeof(itemJson.item.itemShow.readOnly)
							&& itemJson.item.itemShow.readOnly) {// 如果字段只读的话
						editJson += ",readOnly:true";
					}
				}
				editJson += "})";
				break;
			case '20' :
				editJson = "editor: new Ext.form.TextField({";
				if (viewItem.onclick != "") {
					editJson += "listeners:{focus:" + viewItem.onclick + "}";//
				}
				// add by jc 20090818
				if (viewItem.onchange != "") {
					editJson += "listeners:{change:function(field,e){ "
							+ viewItem.onchange + " }}";//
				}
				if (null != itemJson.item.itemShow) {
					if ("undefined" != typeof(itemJson.item.itemShow.readOnly)
							&& itemJson.item.itemShow.readOnly) {// 如果字段只读的话
						if (viewItem.onclick != "")
							editJson += ",";
						editJson += "readOnly:true";
					}
				}
				editJson += "})";
				break;
			default :
				if (itemJson.item.length > 500) {
					editJson = "editor: new Ext.form.TextArea({";
					if (viewItem.onclick != "") {
						editJson += "listeners:{show:view.setTextAreaHeight,focus:"
								+ viewItem.onclick + "}";// 具体onclick事件的编写可以参考view.focus方法
					} else {
						editJson += "listeners:{show:view.setTextAreaHeight}";
					}
				} else {
					editJson = "editor: new Ext.form.TextField({";
					if (viewItem.onclick != "") {
						editJson += "listeners:{focus:" + viewItem.onclick
								+ "}";// 具体onclick事件的编写可以参考view.focus方法
					}
					// add by jc 20090818
					if (viewItem.onchange != "") {
						editJson += "listeners:{change:function(field,e){ "
								+ viewItem.onchange + " }}";//
					}
					if (null != itemJson.item.itemShow) {
						if ("undefined" != typeof(itemJson.item.itemShow.readOnly)
								&& itemJson.item.itemShow.readOnly) {// 如果字段只读的话
							if (viewItem.onclick != "")
								editJson += ",";
							editJson += "readOnly:true";
						}
					}
				}

				editJson += "})";
		}

		return editJson;
	},

	/**
	 * 设置编辑表格中大文本框的高度，以便用户的输入
	 * 
	 * @param {}
	 *            f
	 */
	setTextAreaHeight : function(f) {
		f.setHeight(120);
		var textArea = document.getElementById(f.id);
		var div = textArea.parentNode;
		var toppx = div.style.top;
		var re = /px/g;
		toppx = toppx.replace(re, "");
		if (toppx > 120) {
			div.style.top = toppx - 120 + 20;
		}
	},

	/**
	 * 根据列名称获取表格选中行中指定列的值，列如果多个的话，采用逗号","隔开
	 * 
	 * @param {}
	 *            colNames 获取的列名称
	 * 
	 * @param {}
	 *            outsplit 输出分隔符号
	 */
	getColumnValueByName : function(colName) {
		var result = "";
		var osplit = "";
		if ("undefined" == typeof(colName) || colName == "")
			return result;
		// 为避免视图列字段为大写时取不到值，统一转小写 modify by zhua 2010-09-07
		colName = colName.toLowerCase();
		var colNames = colName.split(",");
		var grid = Ext.getCmp(view.namePrefix + view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if (null == selectedRow.length
				|| "undefined" == typeof(selectedRow.length)) {
			selectedRow = new Array(selectedRow);
		}

		for (var i = 0; i < selectedRow.length; i++) {
			var row = selectedRow[i];
			if (result != "")
				result = result + view.recordSplit;
			for (var j = 0; j < colNames.length; j++) {
				if ("undefined" == typeof(result) || result == "") {
					result = row.data[colNames[j]];
				} else {
					result += view.colSplit + row.data[colNames[j]];
				}
			}
			if (view.isSingle == "1")
				break;// 如果是单选，则执行一次就跳出循环
		}

		return result;
	},
	/**
	 * 普通文档新建窗口
	 */
	newDocument : function() {
		this.openDocument(2);
	},
	/**
	 * 获取分篇信息
	 * 
	 * @param {}
	 *            docUnid 当前文档unid
	 * @param {}
	 *            viewId 当前视图unid
	 * @param {}
	 *            verb 操作类型 0:第一篇；1：上一篇；2：下一篇；3：最后一篇
	 * @return {unid:unid,error:error}
	 */
	getDocPaper : function(docUnid, viewId, verb) {
		var vbi = null;

		for (var i = 0; i < view.viewBaseInfos.length; i++) {
			if (view.viewBaseInfos[i].viewId == viewId) {
				vbi = view.viewBaseInfos[i];
				break;
			}
		}
		var unid = "";
		var error = "";
		if (vbi.viewType == "01") {
			var grid = Ext.getCmp(view.namePrefix + view.index);
			var rowCount = grid.getStore().getCount();
			var beginIndex = 1;
			if (vbi.checkPosition != "02")
				beginIndex = 0;
			if (rowCount > 0) {
				var unidIndex = grid.getColumnModel().getDataIndex(beginIndex);
				var row = null;
				if (verb == "0") {
					row = grid.getStore().getAt(0);
				} else if (verb == "3") {
					row = grid.getStore().getAt(rowCount - 1);
				} else {
					for (var i = 0; i < rowCount; i++) {
						row = grid.getStore().getAt(i);
						var tmpUnid = row.data[unidIndex];
						if (tmpUnid == docUnid) {
							if (verb == "1") {
								if (i == 0) {
									error = "当前文档已经是本视图第一篇了";
								} else {
									row = grid.getStore().getAt(i - 1);
								}
							} else if (verb == "2") {
								if (i >= rowCount - 1) {
									error = "当前文档已经是本视图最后一篇了";
								} else {
									row = grid.getStore().getAt(i + 1);
								}
							}
							break;
						}
					}
				}
				if (null != row)
					unid = row.data[unidIndex];
			} else {
				error = "当前视图中没有文档！";
			}
		} else {
			var oes = document.all("selectid");
			var url = null;
			if (null == oes.length || undefined == oes.length)
				oes = new Array(oes);
			if (verb == "0") {
				unid = oes[0].value;
			} else if (verb == "3") {
				unid = oes[oes.length - 1].value;
			} else {
				for (var i = 0; i < oes.length; i++) {
					if (oes[i].value == docUnid) {
						if (verb == "1") {
							if (i == 0) {
								error = "当前文档已经是本视图第一篇了";
							} else {
								unid = oes[i - 1].value;
							}
						} else if (verb == "2") {
							if (i >= (oes.length - 1)) {
								error = "当前文档已经是本视图最后一篇了";
							} else {
								unid = oes[i + 1].value;
							}
						}
						break;
					}
				}
			}

		}
		var result = {
			"unid" : unid,
			"error" : error
		};
		return result;
	},

	/**
	 * yjy 视图上文档打开 只能在视图上调用
	 * 
	 * @param {}
	 *            type 1 表示是 视图或首页中的单击打开 2 表示是新建文档 3 表示要通过 选中一个文档后，再打开
	 *            如果为空，要重新取值
	 * @param {}
	 *            gridNum
	 * @param {}
	 *            unid
	 * @param {}
	 *            formType
	 * @param {}
	 *            formId
	 */
	openDocument : function(type, gridNum, unid, formType, formId) {
		var vbi = null;
		if ("undefined" == typeof(type) || type == "") {
			Ext.Msg.alert("提示信息", "openDocument打开文档type的类型不能为空");
			return;
		}
		if ("undefined" == typeof(gridNum) || "undefined" == typeof(unid)
				|| "undefined" == typeof(formType)
				|| "undefined" == typeof(formId)) {
			var grid = Ext.getCmp(view.namePrefix + view.index);
			vbi = view.viewBaseInfos[view.index];
			if (type == 3) {
				var row = grid.getSelectionModel().getSelected();
				var unidIndex = 1;
				if (undefined == row || row == null) {
					Ext.MessageBox.alert("提示", "请选择要打开的文档!");
					return;
				}
				unid = row.data[grid.getColumnModel().getDataIndex(unidIndex)];
			};
			if (typeof unid == "undefined")
				unid = "";
			formType = vbi.formType;
			formId = vbi.formId;
		} else {
			vbi = view.viewBaseInfos[gridNum];
		}
		var tmpUrl = "";
		if (2 == type) {// type==2表示新建
			tmpUrl = this.filterSql(view.purl);// 设置文档的url地址的后面的参数
		}
		// 全部打开都可以加载openJs del by xhuatang@linewell.com 2011-05-12
		// if (type == 3) {
		// this.openViewDoc(unid, formType, formId, vbi.isFlowItem, tmpUrl);
		// } else {
		this.openViewDoc(unid, formType, formId, vbi.isFlowItem, tmpUrl,
				vbi.openJs);
		// }
	},
	/**
	 * 处理条件
	 * 
	 * @param {}
	 *            purl
	 * @return {String}
	 */
	filterSql : function(purl) {
		// 过滤父url
		if (undefined == purl || purl == "" || purl == "null" || purl == null)
			return "";

		var canHasInstanceId = true;

		if (purl.indexOf("funid=") >= 0)
			canHasInstanceId = false;

		var purls = purl.split("&");
		var tmpUrl = "";
		for (var i = 0; i < purls.length; i++) {
			var tmpName = purls[i].substring(0, purls[i].indexOf("="));
			if (tmpName == "unid" || tmpName == "type" || tmpName == "formId")
				continue;

			if (!canHasInstanceId && tmpName == "instanceUnid") {
				continue;
			}

			if (tmpUrl == "") {
				tmpUrl = purls[i];
			} else {
				tmpUrl += "&" + purls[i];
			}
		}

		return tmpUrl;
	},
	/**
	 * yjy 视图中打开（首页上也可调用此方法） 也在 视图的配置js中用 view.openViewDoc(height,width)进行调用
	 * 
	 * @param {}
	 *            unid 文档的Unid
	 * @param {}
	 *            formType 文档类型
	 * @param {}
	 *            formId 容器的ID
	 * @param {}
	 *            isFlowItem 是否为流程，默认为 false
	 * @param {}
	 *            tmpUrl 打开文档时，其他的url参数，格式为 text=999&num=333
	 * @param {}
	 *            openJs 打开的方法 可为空
	 * @height div窗口的高度
	 * @width div窗口的宽度
	 * @param {}
	 *            viewId 视图来源
	 * @param {}
	 *            openST 文档打开来源类型01频道、02通过嵌入JSP的视图
	 * @param {}viewDocOpenType
	 *            当openST=01时频道视图文档打开方式【00为新窗口，02为DIV窗口，注意当前窗口01目前不提供】
	 * @param{} channelId yjy 2011-3-25 增加，主要是在首页打开视图时传入频道所在divId
	 */
	openViewDoc : function(unid, formType, formId, isFlowItem, tmpUrl, openJs,
			height, width, viewId, openST, viewDocOpenType, channelId) {
		if (!viewId && (!openST || openST == "undefined"))
			viewId = this.viewId;
		if (!openST)
			openST = "";
		if (typeof isFlowItem == "undefined")
			isFlowItem = false;
		if (undefined != openJs && openJs != "") {
			var openCode = openJs.substring(0, openJs.indexOf("("));
			// 执行相应的脚本
			var ib = openJs.indexOf("(") + 1;
			var iEnd = openJs.indexOf(")");
			var par = openJs.substring(ib, iEnd);
			if (par.trim() == "") {
				par = "";
			} else {
				par = "," + par
			};
			var js;
			if (openJs.indexOf("OpenFlowDocByTodoUnid") > -1) {
				js = openCode + "('" + unid + "',ucapCommonFun.ucapOpenDoc,'"
						+ par + "&viewMId=" + viewId + "&openST=" + openST
						+ "')";
			} else {
				if (tmpUrl && tmpUrl.indexOf("'") >= 0) {
					var re = /'/g;
					tmpUrl = tmpUrl.replace(re, "");
				}
				js = openCode + "('" + unid + "','" + formType + "','" + formId
						+ "'," + isFlowItem + ",'" + tmpUrl + "',''" + par
						+ ",'" + viewId + "','" + openST + "')";
			}
			ucapCommonFun.evalJavaScript(js);
		} else {// 默认普通打开方式
			if (isFlowItem) {
				// 有流程字段则采用流程的方式打开
				// csj 2009.8.6
				// ucapOpenFlow.openOldFlowDoc("&type="+formType+"&unid="+unid,ucapCommonFun.ucapOpenDoc,1);
				// 频道中有流程的视图打开也要根据频道的打开方式打开,common.js中有具体的调用 mdf by jc 20100913
				// ucapOpenFlow.openOldFlowDoc("&unid="+unid+"&viewMId="+viewId+"&openST="+openST,ucapCommonFun.ucapOpenDoc,1);
				var param = "&unid=" + unid + "&viewMId=" + viewId + "&openST="
						+ openST + "&viewDocOpenType=" + viewDocOpenType;
				// yjy 2011-3-25 add 在打开的流程文档URL增加当前频道的divId
				if (openST == "01") {
					// 说明是在首页频道中打开
					if (typeof channelId != "undefined") {
						param += "&cnId=" + channelId;
					};
				}
				ucapOpenFlow
						.openOldFlowDoc(param, ucapCommonFun.ucapOpenDoc, 1);
			} else {
				// 无流程的打开
				var url = ucapCommonFun.getDocJspPath();
				try {
					// var managerNode =
					// ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
					var belongToAppId = typeof(ucapManagerTree) != "undefined"
							? ucapManagerTree.curBelongToAppId
							: false;
					if (belongToAppId) {
						url += "?unid=" + unid + "&belongToAppId="
								+ belongToAppId + "&type=" + formType
								+ "&formId=" + formId + "&viewMId=" + viewId
								+ "&openST=" + openST;
					} else {
						url += "?unid=" + unid + "&type=" + formType
								+ "&formId=" + formId + "&viewMId=" + viewId
								+ "&openST=" + openST;
					}
				} catch (e) {
					url += "?unid=" + unid + "&type=" + formType + "&formId="
							+ formId + "&viewMId=" + viewId + "&openST="
							+ openST;
				}

				if (undefined != tmpUrl && tmpUrl != "") {
					url += "&" + tmpUrl;
				}
				var flag = (unid == "" ? 0 : 1);
				ucapCommonFun.ucapOpenDoc(url, flag, "", height, width, openST,
						viewDocOpenType);
			}
		}
	},
	/**
	 * 删除视图中选中的文档
	 * 
	 * @param {}
	 *            callbackFn 删除成功后的回调函数
	 */
	deleteDocument : function(callbackFn) {
		var str = "";
		var strResult = "";
		if (view.viewBaseInfos[view.index].viewType != "02"
				&& view.viewBaseInfos[view.index].viewType != "03") {
			var grid = Ext.getCmp(view.namePrefix + view.index);
			var selectedRow = grid.getSelectionModel().getSelections();
			if (null == selectedRow.length || undefined == selectedRow.length)
				selectedRow = new Array(selectedRow);
			// strResult="[";
			for (var i = 0; i < selectedRow.length; i++) {
				var row = selectedRow[i];
				str += "," + row.data[grid.getColumnModel().getDataIndex(1)];
				// 删除文档的json数据，删除后记录到操作日志里 modify by fsm 2010.1.20
				if (i == 0) {
					strResult += Ext.encode(row.json);
				} else {
					strResult += "," + Ext.encode(row.json);
				}
			}
			if ("" != strResult && null != strResult && "null" != strResult) {
				strResult = "[" + strResult + "]";
			} else {
				strResult = "";
			}
		} else {
			var oes = document.all("selectid");
			var url = null;
			if (null == oes.length || undefined == oes.length)
				oes = new Array(oes);
			for (i = 0; i < oes.length; i++) {
				if (oes[i].checked) {
					str = str + "," + oes[i].value;
				}
			}
		}
		if (str == "") {
			Ext.MessageBox.alert("提示", "请选择要删除的文档！");
			return;
		}
		str = str.substring(1);
		// str="["+str+"]";
		Ext.MessageBox.confirm("确认", "是否确认要删除选中的文档！", function(btn) {
			if (btn == "yes") {
				var json = {
					"formUnid" : view.viewBaseInfos[view.index].formId,
					formType : view.viewBaseInfos[view.index].formType,
					docUnid : str,
					"strResult" : strResult,
					"isFlowItem" : view.viewBaseInfos[view.index].isFlowItem
				};
				var para = "";
				var belongToAppId = ucapCommonFun
						.getUrlParameter("belongToAppId");
				if (belongToAppId) {
					para = {
						"type" : "getForm",
						"act" : "delete",
						"belongToAppId" : belongToAppId
					};
				} else {
					var belongToAppId = window.top.ucapCommonFun
							.getUrlParameter("belongToAppId");
					if (belongToAppId) {
						para = {
							"type" : "getForm",
							"act" : "delete",
							"belongToAppId" : belongToAppId
						};
					} else {
						try {
							var belongToAppId = typeof(ucapManagerTree) != "undefined"
									? ucapManagerTree.curBelongToAppId
									: false;
							if (belongToAppId && belongToAppId != "") {
								para = {
									"type" : "getForm",
									"act" : "delete",
									"belongToAppId" : belongToAppId
								};
							} else {
								para = {
									"type" : "getForm",
									"act" : "delete"
								};
							}
						} catch (e) {
							para = {
								"type" : "getForm",
								"act" : "delete"
							};
						}
					}
				}
				var _callbackFn = callbackFn || "";
				var requestConfig = {
					url : ucapSession.baseAction,
					params : para,
					jsonData : json,
					callback : function(options, success, response) {
						if (success) {
							var exjson = Ext.util.JSON
									.decode(response.responseText);
							var exResult = ucapCommonFun.dealException(exjson);
							if (!exResult)
								return;
							Ext.Msg.alert("提示", "删除文档成功！");
							// view.refresh();
							if (view.viewBaseInfos[view.index].isEdit) {
								view.deleteEditorGridData();
							} else {
								view.refresh();
							}// 当可直接编辑表格视图，删除后，不刷新视图 modify by fsm 10.7.15
							// 增加回调函数 add by jc 20100716
							ucapCommonFun.evalJavaScript(_callbackFn);
						} else {
							Ext.Msg.alert("提示", "删除文档不成功！");
						}
					}
				}
				Ext.Ajax.request(requestConfig);

			}
		});
	},
	/**
	 * 分级管理删除用户
	 */
	deleteUserDocument : function() {
		var str = "";
		var grid = Ext.getCmp(view.namePrefix + view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if (null == selectedRow.length || undefined == selectedRow.length)
			selectedRow = new Array(selectedRow);
		for (var i = 0; i < selectedRow.length; i++) {
			var row = selectedRow[i];
			str += "," + row.data[grid.getColumnModel().getDataIndex(1)];
		}
		if (str == "") {
			Ext.MessageBox.alert("提示", "请选择要删除的文档！");
			return;
		}
		var belongToAppId = typeof(ucapManagerTree) != "undefined"
				? ucapManagerTree.curBelongToAppId
				: false;
		str = str.substring(1);
		Ext.MessageBox.confirm("确认", "是否确认要删除选中的文档！", function(btn) {
					if (btn == "yes") {
						var json = {
							"belongToAppId" : belongToAppId,
							"formUnid" : view.viewBaseInfos[view.index].formId,
							formType : view.viewBaseInfos[view.index].formType,
							docUnid : str
						};
						var requestConfig = {
							url : ucapSession.baseAction,
							params : {
								"type" : "getForm",
								"act" : "deleteUser"
							},
							jsonData : json,
							callback : function(options, success, response) {
								if (success) {
									var exjson = Ext.util.JSON
											.decode(response.responseText);
									var exResult = ucapCommonFun
											.dealException(exjson);
									if (!exResult)
										return;

									Ext.Msg.alert("提示", "删除文档成功！");
									view.refresh();

								} else {
									Ext.Msg.alert("提示", "删除文档不成功！");
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
	 * @param {}
	 *            type
	 */
	recycleDoc : function(type) {
		var action = "delete";
		var actionTip = "删除";

		if ("undefined" != typeof(type) && type == 1) {
			action = "restore";
			actionTip = "还原";
		}

		var grid = Ext.getCmp(view.namePrefix + view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if (null == selectedRow.length || undefined == selectedRow.length)
			selectedRow = new Array(selectedRow);
		var str = "";
		for (var i = 0; i < selectedRow.length; i++) {
			var row = selectedRow[i];
			str += "," + row.data[grid.getColumnModel().getDataIndex(1)];
		}
		if (str == "") {
			Ext.MessageBox.alert("提示", "请选择要" + actionTip + "的文档！");
			return;
		}
		str = str.substring(1);
		// str="["+str+"]";
		Ext.MessageBox.confirm("确认", "是否确认要" + actionTip + "选中的文档！", function(
						btn) {
					if (btn == "yes") {
						var json = {
							docUnid : str
						};
						var requestConfig = {
							url : ucapSession.baseAction,
							params : {
								"type" : "recycle",
								"action" : action
							},
							jsonData : json,
							callback : function(options, success, response) {
								if (success) {
									var exjson = Ext.util.JSON
											.decode(response.responseText);
									var exResult = ucapCommonFun
											.dealException(exjson);
									if (!exResult)
										return;

									Ext.Msg.alert("提示", actionTip + "文档成功！");
									view.refresh();

								} else {
									Ext.Msg.alert("提示", actionTip + "文档不成功！");
								}
							}
						}
						Ext.Ajax.request(requestConfig);

					}
				});

	},
	/**
	 * 查询时按回车触发的事件
	 * 
	 * @param {}
	 *            index
	 */
	kdSearch : function(index) {
		if (event.keyCode == 13) {// 回车时进行查询
			view.search(index);
		}
	},

	/**
	 * 视图中简单查询的操作
	 * 
	 * @param {}
	 *            index
	 */
	search : function(index) {
		var searchValue = "";
		var divobj = window.event.srcElement.parentElement;
		var options = Ext.getDom("simpleSearchSelect_" + index).options;
		var inputObjs = divobj.getElementsByTagName("input");
		var inputObj = null;

		for (var i = 0; i < inputObjs.length; i++) {
			if (inputObjs[i].name == "keyword") {
				inputObj = inputObjs[i];
				break;
			}
		}
		// mdy by llp 2010-06-01 在搜索关键字可以允许输入","或"，"作为分隔符，查询不同的数据
		var inputObjVal = null;
		if ("undefined" != typeof(inputObj.value)
				&& inputObj.value.indexOf("，") > 0) {
			inputObjVal = inputObj.value.split("，");
		} else {
			inputObjVal = inputObj.value.split(",");
		}
		for (var i = 1; i < options.length; i++) {
			var option = options[i];
			if (option.selected)
				searchValue = "";
			for (var j = 0; j < inputObjVal.length; j++) {
				if (searchValue == "") {
					searchValue = view.fieldDbType + option.value
							+ view.fieldEndPrefix + view.sqlLikeKey
							+ view.fieldConstType + inputObjVal[j]
							+ view.fieldEndPrefix;
				} else {
					searchValue = searchValue + view.sqlOr + view.fieldDbType
							+ option.value + view.fieldEndPrefix
							+ view.sqlLikeKey + view.fieldConstType
							+ inputObjVal[j] + view.fieldEndPrefix;
				}
			}
			if (option.selected) {
				break;
			}
		}
		view.reloadByCon(index, searchValue, "01");
	},

	/**
	 * 高级查询
	 * 
	 * @param {}
	 *            index
	 */
	advancedSearch : function(index) {
		var searchValue = "";
		var divobj = Ext.getDom("searchMore_" + index);
		var inputObjs = divobj.getElementsByTagName("input");
		for (var i = 0; i < inputObjs.length; i++) {
			var inputObj = inputObjs[i];
			var inputObjName = (inputObj.name || inputObj.id).replace(
					view.advPrefix, "");
			// if(inputObj.type=="text" && inputObj.value!=""){//modify by jc
			// 解决通用选择框无法正常取到值
			if ((inputObj.type == "text" || inputObj.type == "hidden")
					&& inputObj.value != "") {
				if (view.hasBeginInputName(inputObjName, index)) {
					if (inputObjName.lastIndexOf("_1") > 0) {
						searchValue = searchValue
								+ view.fieldDbType
								+ inputObjName.substring(0, inputObjName.length
												- 2) + view.fieldEndPrefix
								+ view.sqlGTEQ + view.fieldConstType
								+ inputObj.value + view.fieldEndPrefix
								+ view.sqlAnd;
					} else {
						searchValue = searchValue
								+ view.fieldDbType
								+ inputObjName.substring(0, inputObjName.length
												- 2) + view.fieldEndPrefix
								+ view.sqlLTEQ + view.fieldConstType
								+ inputObj.value + view.fieldEndPrefix
								+ view.sqlAnd;
					}
				} else {
					// 不存在name时
					if (!inputObjName || inputObjName.lastIndexOf("_Cn_") > 0) {
						continue;
					}
					var inputName = inputObjName;
					// if(inputName.lastIndexOf("_Cn_")>0)inputName =
					// inputName.substring(0,inputName.lastIndexOf("_Cn_"));
					searchValue = searchValue + view.fieldDbType + inputName
							+ view.fieldEndPrefix + view.sqlLikeKey
							+ view.fieldConstType + inputObj.value
							+ view.fieldEndPrefix + view.sqlAnd;
				}
			}
		}
		var selectObjs = divobj.getElementsByTagName("select");
		for (var i = 0; i < selectObjs.length; i++) {
			var selectObj = selectObjs[i];
			if (selectObj.value == "")
				continue;
			searchValue = searchValue + view.fieldDbType
					+ selectObj.name.replace(view.advPrefix, "")
					+ view.fieldEndPrefix + view.sqlEQ + view.fieldConstType
					+ selectObj.value + view.fieldEndPrefix + view.sqlAnd;
		}
		if (searchValue == "") {
			Ext.MessageBox.alert("信息提示", "请针对查询字段输入相应的查询值！");
			return;
		}
		searchValue = searchValue.substring(0, searchValue.length
						- view.sqlAnd.length);

		view.reloadByCon(index, searchValue, "01");
	},

	/**
	 * 判断一个对象列表是否已经有包含inputname对象，有返回true，否则返回false
	 * 
	 * @param {}
	 *            inputObjs 判断一个对象列表
	 * @param {}
	 *            inputName 输入框名称
	 * @return {}
	 */
	hasInputByName : function(inputObjs, inputName) {
		var result = false;
		for (var i = 0; i < inputObjs.length; i++) {
			var inputObj = inputObjs[i];
			if (inputObj.name == (inputName + "_Cn_")) {
				result = true;
				break;
			}
		}
		return result;
	},

	/**
	 * 根据外部条件重新加载视图
	 * 
	 * @param {}
	 *            index
	 * @param {}
	 *            searchValue
	 * @param {}
	 *            type
	 * @param {}
	 *            pcateUrl
	 */
	reloadByCon : function(index, searchValue, type, pcateUrl) {
		if ("undefined" != typeof(pcateUrl)) {
			view.pcateUrl = pcateUrl;
		}
		if (view.viewBaseInfos[index].viewType != "02"
				&& view.viewBaseInfos[index].viewType != "03") {
			// 根据外部条件重新加载表格中的数据
			var grid = Ext.getCmp(view.namePrefix + index);

			if (undefined != type && type == "01") {
				if ("undefined" != typeof(grid.getStore().baseParams.categorycon)) {
					grid.getStore().baseParams = {
						extracon : searchValue,
						categorycon : grid.getStore().baseParams.categorycon
					};
				} else {
					grid.getStore().baseParams = {
						extracon : searchValue
					};
				}
			} else {
				grid.getStore().baseParams = {
					categorycon : searchValue
				};
			}
			grid.getStore().removeAll();
			grid.getBottomToolbar().updateInfo();
			grid.getStore().reload({
						params : {
							start : 0,
							limit : view.viewBaseInfos[index].pageSize
						}
					});
		} else {
			// 根据外部条件重新加载表格中的数据
			if (undefined != type && type == "01") {
				if ("undefined" != typeof(view.stores[index].baseParams.categorycon)) {
					view.stores[index].baseParams = {
						extracon : searchValue,
						categorycon : view.stores[index].baseParams.categorycon
					};
				} else {
					view.stores[index].baseParams = {
						extracon : searchValue
					};
				}
			} else {
				view.stores[index].baseParams = {
					categorycon : searchValue
				};
			}
			view.stores[index].reload({
						params : {
							start : 0,
							limit : view.viewBaseInfos[index].pageSize
						}
					});
		}
	},

	/**
	 * 根据一个字段名称判断一个字段是否为起字段
	 * 
	 * @param {}
	 *            inputName
	 * @param {}
	 *            index
	 * @return {Boolean}
	 */
	hasBeginInputName : function(inputName, index) {
		var result = false;

		var advancedQueryItems = view.viewBaseInfos[index].advancedJson;
		if (inputName.substr(inputName.length - 2) == "_1"
				|| inputName.substr(inputName.length - 2) == "_2") {
			inputName = inputName.substr(0, inputName.length - 2);
		} else {
			return result;
		}
		if (undefined != advancedQueryItems) {
			for (var i = 0; i < advancedQueryItems.length; i++) {
				var advancedQueryItem = advancedQueryItems[i];
				if (advancedQueryItem.itemNameEn == view.advPrefix + inputName
						&& advancedQueryItem.hasBegin) {
					return true;
				}

			}
		}

		return result;
	},

	/**
	 * 根据视图标识获取视图名称
	 * 
	 * @param {}
	 *            viewIds 视图标识
	 */
	getViewDisplayName : function(viewIds) {
		var tjson = null;
		var url = ucapSession.baseAction;

		url += "?viewIds=" + viewIds + "&action=getViewName&type=getView&rand="
				+ Math.random();

		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var exjson = Ext.util.JSON.encode(conn.responseText);
		var exResult = ucapCommonFun.dealException(exjson);
		if (!exResult)
			return;

		return conn.responseText;
		// tjson = Ext.util.JSON.decode(conn.responseText);
		// return tjson.titles;
	},
	/*
	 * 通过表格中选中行的标识集， @param {} viewIds 以","分隔的字符串
	 */
	getSelecedUnid : function() {
		var str = "";
		if (view.viewBaseInfos[view.index].viewType != "02"
				&& view.viewBaseInfos[view.index].viewType != "03") {
			var unidIndex = 0;
			if (view.viewBaseInfos[view.index].checkPosition == "02") {
				unidIndex = 1;
			}
			var grid = Ext.getCmp(view.namePrefix + view.index);
			var selectedRow = grid.getSelectionModel().getSelections();
			if (null == selectedRow.length || undefined == selectedRow.length)
				selectedRow = new Array(selectedRow);
			for (var i = 0; i < selectedRow.length; i++) {
				var row = selectedRow[i];
				str += ","
						+ row.data[grid.getColumnModel()
								.getDataIndex(unidIndex)];
			}
		} else {
			var oes = document.all("selectid");
			var url = null;
			if (null == oes.length || undefined == oes.length)
				oes = new Array(oes);
			for (i = 0; i < oes.length; i++) {
				if (oes[i].checked) {
					str = str + "," + oes[i].value;
				}
			}
		}
		if (str != "")
			str = str.substring(1);
		return str;
	},
	/**
	 * 视图编辑保存前验证函数
	 * 
	 * @param {}
	 *            jsondata 保存前的Json数据
	 * @return {Boolean}
	 */
	viewSaveValidator : function(jsondata) {
		return true;
	},
	/**
	 * 进行刷新当前视图 add by xhuatang@linwell.com 2011-05-05
	 */
	refresh : function(viewMId) {
		var index = null, win = window;
		var myview = win.view;
		if (myview && null != myview.personal.getIndexFromBaseInfo) {

			if (viewMId) {
				// 此if里面的代码目前主要用于页签式方式，保存文档时刷新原视图用的
				index = myview.personal.getIndexFromBaseInfo(viewMId);
				// 判断当前window里面是否存在此视图
				if (index == -1) {
					/**
					 * 用于递归所有iframe里的iframe 根据视图UNID返回其window对象及视图index
					 */
					var fn = function(viewMId, wins) {
						var ix = -1;
						var iframes = (wins || window).Ext.query("iframe");// 所有的iframe
						for (var i = 0; i < iframes.length; i++) {
							var ifrWin = iframes[i].contentWindow;
							if (ifrWin.view
									&& ifrWin.view.personal.getIndexFromBaseInfo) {
								ix = ifrWin.view.personal
										.getIndexFromBaseInfo(viewMId);
								if (ix == -1) {
									ix = fn(viewMId, ifrWin);
									if (ix != -1) {
										// 找到返回并退出for循环
										return ix;
									}
								} else {
									// 找到相应的iframe就返回其window对象
									win = ifrWin;
									return ix;
								}
							}// end if
						}// end for
						return ix;
					};// 递归函数fn结束
					index = fn(viewMId);
					myview = win.view;
				}
			}
			if (null == index || index == -1) {
				index = myview.index;
			}

			// 具体的刷新逻辑
			if (myview.viewBaseInfos && myview.viewBaseInfos[index]
					&& myview.viewBaseInfos[index].viewType != "02"
					&& myview.viewBaseInfos[index].viewType != "03") {
				try {
					var grid = win.Ext.getCmp(myview.namePrefix + index);
					if (grid) {
						grid.getStore().removeAll();
						grid.getBottomToolbar().updateInfo();
						grid.getStore().reload();
					} else {
						// 要取嵌入视图的view
					}
				} catch (e) {
				};
			} else {
				if (null != myview.stores && null != myview.stores[index])
					myview.stores[index].reload();
			}
		}
		view.deleteViewData = [];// 视图刷新 重置view.deleteViewData
	},

	/**
	 * 视图重置操作，清空视图上的查询信息 add by xhuatang@linwell.com 2011-05-05
	 */
	reset : function() {
		var grid = Ext.getCmp(view.namePrefix + view.index);
		if (grid) {
			var keywordObj = Ext.getDom("keyword");
			keywordObj.value = "";

			var divobj = Ext.getDom("searchMore_" + view.index);
			var inputObjs = divobj.getElementsByTagName("input");
			for (var i = 0; i < inputObjs.length; i++) {
				var inputObj = inputObjs[i];
				if (inputObj.type == "text" && inputObj.value != "") {
					inputObj.value = "";
				}
			}
			inputObjs = divobj.getElementsByTagName("textarea");
			for (var i = 0; i < inputObjs.length; i++) {
				inputObjs[i].value = "";
			}
			grid.getStore().removeAll();
			grid.getBottomToolbar().updateInfo();
			grid.getStore().baseParams = {
				extracon : "",
				categorycon : ""
			};
			grid.getStore().reload({
						params : {
							start : 0,
							limit : view.viewBaseInfos[view.index].pageSize
						}
					});
		}
		view.deleteViewData = [];// 视图刷新 重置view.deleteViewData
	}
}// end view
// 开始加载

/**
 * 初始化视图
 * 
 * @param {}
 *            viewId 视图编号
 * @param {}
 *            renderto 渲染的对象
 * @param {}
 *            title 视图的标题
 * @param {}
 *            hasTab 是否有页签
 * @param {}
 *            purl 父窗口的链接
 * @param {}
 *            bModuleUnid 模块的UNID
 * @param {}
 *            outTbarHeight 外框的高度
 * @param {}
 *            noQuery 是否有查询 true时没有
 * @param {}
 *            noPreview 是否没有预览 true时没有
 * @param {}
 *            noSelfConfig 是否没有自定义 true时没有
 * @param {}
 *            tabsp
 */
function initView(viewId, renderto, title, hasTab, purl, bModuleUnid,
		outTbarHeight, noQuery, noPreview, noSelfConfig, tabsp) {
	if ("undefined" == typeof(purl)) {
		view.purl = "";
	} else {
		view.purl = purl;
	}
	var titles = [];
	view.viewBaseInfos = new Array();
	view.viewId = viewId;
	view.renderto = renderto;
	Ext.QuickTips.init();// 浮动信息提示
	view.load(viewId, renderto, noQuery, noPreview, noSelfConfig);
	view.moduleUnid = bModuleUnid;
	view.hasTab = false;
};// end ready

/**
 * 重写视图中单元格选择的方法，以便回车时，鼠标可以移动本行的下一单元格
 */
Ext.override(Ext.grid.RowSelectionModel, {
			onEditorKey : function(field, e) {
				var k = e.getKey(), newCell, g = this.grid, ed = g.activeEditor;
				var shift = e.shiftKey;
				var colCount = g.getColumnModel().getColumnCount(false);
				var rowCount = g.getStore().getCount();// 获取当前的行数

				if (k == e.ENTER) {
					e.stopEvent();
					ed.completeEdit();
					if (shift) {
						newCell = g.walkCells(ed.row, ed.col - 1, -1,
								this.acceptsNav, this);
					} else {
						if (rowCount == (ed.row + 1)
								&& colCount == (ed.col + 1)) {
							view.addEditorGridRow();
						} else {
							newCell = g.walkCells(ed.row, ed.col + 1, 1,
									this.acceptsNav, this);
						}
					}
				} else if (k == e.TAB) {
					e.stopEvent();
					ed.completeEdit();
					newCell = g.walkCells(ed.row, ed.col - 1, -1,
							this.acceptsNav, this);
				} else if (k == e.ESC) {
					ed.cancelEdit();
				}
				if (newCell) {
					g.getSelectionModel().selectRow(newCell[0]);
					g.startEditing(newCell[0], newCell[1]);
				}
			}
		});
