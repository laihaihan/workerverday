/*
 * 首页频道相关JS 处理方法
 * yjianyou@linewell.com
 * 
 */
Ext.onReady(function(){
	Ext.namespace('ucapPortal'); 
	Ext.namespace('ucapChannel'); 
	//ucapfloatpage.setFloatContent("公告","http://www.baidu.com/img/baidu_logo_jr_1005_520.gif","","../../test.jsp",300,300);
    //ucapPortal.init();	
});
var tools=
	[{
        id:'gear',
        qtip:'编辑频道',
        handler: function(e, target, panel){
        	//add by cjianyan@linewell.com 2011-5-19
        	if(!ucapHeader.selfConfig){//如果没有自定义权限的话，则不能编辑频道
        		Ext.MessageBox.alert("提示","没有权限编辑频道！",Ext.MessageBox.OK);
        		return;
        	}
         	ucapChannel.setChannel(panel);
         }
    },
    {
        id:'plus',
        qtip:'增加频道',
        handler: function(e, target, panel){  
        	if(!ucapHeader.selfConfig){//如果没有自定义权限的话，则不能增加频道
        		Ext.MessageBox.alert("提示","没有权限增加频道！",Ext.MessageBox.OK);
        		return;
        	}
        	ucapChannel.addChannel(panel);
          }
    },
    {
        id:'close',
        qtip:'删除频道',
        handler: function(e, target, panel){
        	if(!ucapHeader.selfConfig){//如果没有自定义权限的话，则不能删除频道
        		Ext.MessageBox.alert("提示","没有权限删除频道！",Ext.MessageBox.OK);
        		return;
        	}
        	//判断当前频道是否为最后一个，如果是最后一个，则不允许删除
        	var ids= ucapPortal.ucapPortalObj.columnContents.split(",");
        	var isLast = true;
        	var iCount = 0;
        	for (var i=0;i<ids.length;i++){
        		var disid = ids[i].split(";");
        		for(var j=0;j<disid.length;j++){
	        		if (disid[j]!="*" ) {
	        			iCount++;
	        		}
	        		if (iCount >1){
	        			isLast = false;
	        			break;
	        		}
        		}
        		if (!isLast) break;
        	}
        	if (isLast) {
        		Ext.Msg.alert("删除频道提示","已经是最后一个频道，不能删除！");
        		return;
        	}
        	Ext.MessageBox.confirm("删除频道提示","你是否确定要删除当前频道？",callBack);
        	function callBack(id){
        		if (id=="yes"){
	        		panel.ownerCt.remove(panel, true);
	           		ucapPortal.savePortal(panel.getId());
        		}
        	}
        }
    }];
 
var ucapPortal={
	/**
	 * yjy 2010-7-15 增加一个回调函数，这样允许二次开发自己单独设置中间的频道
	 * 默认参数为 ucapPortal.channels的值
	 * @type 函数名称
	 */
	callBackFun:null,
	/**
	 * 当前频道的样式
	 * @type 
	 */
	portletType:{
		/**
		 * 1 列表 2 图文环绕 3图文并茂 4 FLASH 5 视频 6 音乐 7 图片 8快捷方式 9 URL 10表格方式
		 * @type Number
		 */
		disType:1,
		/**
		 * 1 视图、2 RSS、3 JSON 4 URL 5快捷方式
		 * @type Number
		 */
		sourceType:1,
		/**
		 * 当前频道的对象
		 */
		channel:""
	},
	paraChannel:new Array(),
	breakInit:false,//是否继续初始化，默认开始为假
	channels:null, //频道样式对象
	portal:null,   //所有频道对象
	portalid:"",    //用于区别是首页显示门户还是门户配置中心
	actionParams:{"type":"portal","act":"getValue","random":ucapCommonFun.getRandomString()},
	ucapPortalObj:[],
	/**
	 * 设置频道的WIN对象
	 */
	setChannelWin:null,
	/**
	 * 正在装载的显示内容
	 * @type 
	 */
	loadHtml:"<img src='"+ucapSession.sUserStylePath+"images/default/shared/blue-loading.gif'"
			 +"/img>正在加载中......",
	/**
	 * 从后台获取数据
	 */
	init:function(lid){	
		document.body.style.overflowY="hidden";
		if (ucapSession.indexType=="02"){
			ucapCommonFun.indexOpen.openModule(ucapSession.index);
			return;
		}		
		this.breakInit = false;
		
		if (typeof lid != "undefined" && lid != "")
		{
			//ucapPortal.actionParams["layoutid"] =lid;
			this.portalid=lid;
		}
		else
		{
			//ucapPortal.actionParams["layoutid"] ="";
			this.portalid="";
		}
		ucapPortal.actionParams["lid"] =this.portalid;
		var requestConfig = {
			url:ucapSession.baseAction,
			params:ucapPortal.actionParams,
			callback:function(options,success,response){
				if (success){
					if ( response.responseText==""){
						Ext.Msg.alert("提示信息","无法获取频道相关信息，可能是没有配置！");
						Ext.getDom("portal_id").innerHTML="";
						Ext.getDom("portal_info").style.display="none";
						return;
					}
					if (ucapPortal.breakInit){
						Ext.getDom("portal_id").innerHTML="";
						Ext.getDom("portal_info").style.display="none";
						return;
					}
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					ucapPortal.channels =json.channels;
					ucapPortal.ucapPortalObj = json.portal;
					//yjy 2010-7-15增加回调函数处理
					if (typeof ucapPortal.callBackFun =="function"){
						ucapPortal.callBackFun.call(this,ucapPortal.channels);
					} else {
						ucapPortal.createPortal();
					}
				} else {
					Ext.Msg.alert("提示信息","无法获取频道相关信息！");
					Ext.getDom("portal_id").innerHTML="";
					Ext.getDom("portal_info").style.display="none";
					return;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 生成频道样式
	 * @param {} contentId 容器id
	 * @param {} wid 频道宽度
	 */
	createPortal:function(contentId,wid){
		for(var i=0;i<this.channels.length;i++){
			if (typeof(this.channels[i].items)=="undefined") continue;
			for(var j=0;j<this.channels[i].items.length;j++){
				
				//取频道的样式
				var style = parseInt(this.channels[i].items[j].style,10);
				if (typeof(this.channels[i].items[j].titlePicture)!="undefined"){
					this.channels[i].items[j].title ="<img align=\"absmiddle\" src=\""+ucapSession.appPath+
							this.channels[i].items[j].titlePicture+"\"/>"+this.channels[i].items[j].title;
					
				}
				if (style!=9 && style!=10 && typeof(this.channels[i].items[j].html)!="undefined"
					&& this.channels[i].items[j].html=="*"){
					this.channels[i].items[j].html ="<div id='"+i+"_"+j+"'>"+ this.loadHtml+"</div>";
				}	
				//以下是采用嵌入式的HTML方式
				ucapChannel.html.url = this.channels[i].items[j].source;
				if (style==10){
					//说明是 表格样式，要重新设置 defaultSrc的值
					this.channels[i].items[j].items.defaultSrc = this.getViewIframeSrc(this.channels[i].items[j].items.defaultSrc);
				}else if (style==9){
					if((ucapChannel.html.url||"").toLowerCase().indexOf("http://")==-1){
						ucapChannel.html.url = ucapSession.appPath + this.channels[i].items[j].source;
						this.channels[i].items[j].items.defaultSrc = ucapChannel.html.url;
					}
				}
			}
		}
		
		var width = wid || 800;	//频道宽度,如果contentId有值，没设宽度默认800,contentId没赋值用页面的宽度
		var height=ucapSession.middleHeight;
		if(typeof(contentId)=="undefined"){	//如果频道放在容器默认容器中  modify by lliangjian@linewell.com 2011-1-11
			Ext.getDom("portal_id").innerHTML="";
			Ext.getDom("portal_info").style.display="none";
			
			if (typeof(Ext.getDom("leftBox"))!="undefined" && Ext.getDom("leftBox")!=null ) {
				width=document.body.offsetWidth-Ext.getDom("leftBox").offsetWidth;
			}else if(null!=Ext.getDom("portalcfgid")){
				width =Ext.getDoc().dom.body.clientWidth-270;
				height=Ext.getDoc().dom.body.clientHeight-123;
			}else if(null!=Ext.getDom("portalWidth")){
					width =Ext.getDoc().dom.body.clientWidth;
					height=Ext.getDoc().dom.body.clientHeight;
			}
			else{
				width =document.body.offsetWidth;
			}
			contentId = "portal_id";
		}
		this.portal = new Ext.ux.Portal({
	    	width:width-15,
	    	closable:true,
	    	border:false,
	    	height:height,
	    	renderTo:contentId,
	    	items:this.channels
	    });    
	    this.portal.setWidth(width);
	    for(var i=0;i<this.channels.length;i++){
			if (typeof(this.channels[i].items)=="undefined") continue;
			for(var j=0;j<this.channels[i].items.length;j++){
				var divId = (i+"_"+j);
				this.setItemPortal(this.channels[i].items[j],ucapPortal.setPortletHtml, divId);
			}
	    }
	},
	/**
	 * yjy 2011-3-25 根据频道的div ID更新频道的内容
	 * @param {} divId 格式为 0_1的样式
	 */
	updateChannel:function(divId){
		if (typeof divId=="undefined" || divId=="") return;
		var cn = divId.split("_");
		ucapPortal.setItemPortal(ucapPortal.channels[cn[0]].items[cn[1]],ucapPortal.setPortletHtml, divId);
	},
	/**
	 * yjy 2010-7-15 update
	 * @param {} channelItem      单个频道的JSON对象
	 * @param {} setItemHtmlFun   设置的回调函数，默认参数为 paraChannel对象
	 * @param {} divId            要直接设置div的值，也可为空，则自己在 回调函数中处理
	 */
	setItemPortal:function(channelItem,setItemHtmlFun,divId){
		if (typeof setItemHtmlFun!="function") setItemHtmlFun = ucapPortal.setPortletHtml;
		var style = parseInt(channelItem.style,10);
		var paraChannel={	
			id:"", //显示频道的ID
			html:"",//如果有值，说明不用去后台取值，可能是图片、URL等
			style:"", //频道样式01 列表 02 图文环绕 03图文并茂 04 FLASH 05 视频 06 音乐 07 图片 08快捷方式 09 URL 10表格方式
			embelish:"", //频道自定义函数
			content:[], //记录内容
			docImg:"",  //记录的前置图标
			imgNum:0,  //图片所在的列
			imgWidth:"80", //图片宽度
			imgHeight:"80", //图片的高度
			url:"",       //URL地址
			unidName:"id", //主键的名称
			rowNum:"",    //显示的记录个数
			roll:"",   //方向
			rollamount:"",//速度
			docType:9, //1 表示打开模块 2表示打开视图 3表示打开URL 9表示打开文档
			sourceType:"",//1 视图、2 RSS、3 JSON 4 URL 5快捷方式
			viewInfo:{},//来源是视图时，保存视图的相关信息
			divId:"",//当前频道对应的DivId yjy 2011-3-25 add
			column:9999//视图的列数
		}
		paraChannel.divId =divId;//保存当前频道对应的DivId yjy 2011-3-25 add
		if (typeof(channelItem.dataPicture)!="undefined"){
			paraChannel.docImg = ucapSession.appPath+ channelItem.dataPicture;
		}
		
		if (typeof(channelItem.pictureColumn)!="undefined"){
			paraChannel.imgNum = channelItem.pictureColumn;
			paraChannel.imgHeight = channelItem.pictureHeight;
			paraChannel.imgWidth = channelItem.pictureWidth;
		}
		paraChannel.url = channelItem.source;
		paraChannel.sourceType = parseInt(channelItem.sourceType,10);
		if (paraChannel.sourceType==1){		
			if(typeof channelItem.column!="undefined" && channelItem.column!=""){
				//paraChannel.column = parseInt(channelItem.column);
				paraChannel.column = channelItem.column;
			}			
			paraChannel.rowNum = channelItem.rowNum;
		}
		//取频道的样式
		var style = parseInt(channelItem.style,10);
		paraChannel.embelish = channelItem.embellish;
		paraChannel.viewDocOpenType = channelItem.viewDocOpenType;
		paraChannel.id = channelItem.id;
		paraChannel.style = style;
		if (style==1 || style==2 || style==3){
			if (channelItem.roll){
				//说明有	滚动				
				paraChannel.roll=channelItem.rollType;
				paraChannel.rollamount=channelItem.rollSpeed;						
			}
		}
		var html="";// 为4 5 6 7时，不用提交到后台 yjy 2010-6-1更新
		if(paraChannel.style==4){
			html = ucapChannel.html.getFlashHtml(paraChannel);
		} else if(paraChannel.style==5){				
			html = ucapChannel.html.getVideoHtml(paraChannel);
		} else if (paraChannel.style==6){
			html = ucapChannel.html.getMusicHtml(paraChannel);
		} else if (paraChannel.style==7){
			html = ucapChannel.html.getImgHtml(paraChannel);
		};
	
		if (style==9 || style==10 ){
			html = channelItem.items.defaultSrc;
		}
		paraChannel.html=html;
		if (paraChannel.html==""){
			//如果类型为JSON,则不和后台交互,直接通过渲染函数进行解析,暂时不对JSON进行默认解析
			if(paraChannel.sourceType==3){
				setItemHtmlFun.call(this,paraChannel,divId);
			}else{
				
				var requestConfig = {
					url:ucapSession.baseAction,
					params:{"type":"portal","act":"getPortletValue",portletDisUnid:paraChannel.id,"random":ucapCommonFun.getRandomString()},
					callback:function(options,success,response){
						if (success){
							if ( response.responseText==""){
								paraChannel.html="false";
							} else {
								var json = Ext.decode(response.responseText);
								var exResult=ucapCommonFun.dealException(json);
								if(!exResult)return;
								if (paraChannel.sourceType==1){		
									paraChannel.docType = 9;
									//解决频道列表无法设置要展示几列的问题 mdf by jc 20100623
									if(!paraChannel.column)paraChannel.column = 99999;
									paraChannel.content = json.recordList;
									if(null==json.viewInfo){
										paraChannel.viewInfo ="";		
									}else{
										paraChannel.viewInfo = json.viewInfo;
									}								
									if (paraChannel.content && paraChannel.content.length>0){
										for(var t in paraChannel.content[0]) {
								    		paraChannel.unidName = t;
								    		break;
										}
									}
								} else if(paraChannel.sourceType==2){			
									paraChannel.docType = 3;
									paraChannel.content = json.rssItems;
								} else if (paraChannel.sourceType ==5){
									paraChannel.content = json.shortCutList;
								}
							}
						} else {
							paraChannel.html="false";
						}
						setItemHtmlFun.call(this,paraChannel,divId);
					}
				}
				Ext.Ajax.request(requestConfig);
				
			}//end if(paraChannel.sourceType==3){
			
		} else {
			setItemHtmlFun.call(this,paraChannel,divId);
		}
	},
	/**
	 * yjy 2010-5-14 改为单个频道分开加载
	 * @param {} paraChannel
	 * @param {} divId 要设置的div
	 */
	setPortletHtml:function(paraChannel,divId){
		if (paraChannel.html=="false"){
			paraChannel.html="无法获取频道相关信息！";
		}
		if (paraChannel.html!=""){
			if($(divId))$(divId).innerHTML=paraChannel.html;
			return;
		}
		if (paraChannel.sourceType==1){
			//说明是视图
			var obj = Ext.getCmp(paraChannel.id);
			if (obj){
				var titleDiv = "channelTitle"+divId;
				//判断视图是否为空   by cgc 2011.5.25
				if(""==paraChannel.viewInfo){
					totalCount=0;
				}else{
					totalCount=paraChannel.viewInfo.totalCount;
				}
				var title="(<a href=\"javascript:ucapCommonFun.indexOpen.directOpenView('"+
					paraChannel.url+"')\" title=\"单击后打开此频道关联视图！\"><font color='red'>"+
					(paraChannel.rowNum>totalCount?totalCount:paraChannel.rowNum)+
					"/"+totalCount+"</font></a>)"
					//防止布局改变时，记录条数会重复 add by fsm 2011.1.18 
					
					//2011-3-25 yjy update，保证永远只有一次的数据，但记录数可能会发生变化（在单个频道更新时可能出现）
					if ($(titleDiv)){
						//说明已经存在，只要替换掉值就可以
						$(titleDiv).innerHTML = title;						
					} else {			
						//说明是第一次设置值
						title="<a href=\"javascript:ucapCommonFun.indexOpen.directOpenView('"+paraChannel.url+"')\" title=\"单击后打开此频道关联视图！\">"
								+obj.title+"</a><span id='"+titleDiv+"'>"+title+"</span>";
						try{
							//防止出现频道加载一半obj对象无法再设置Title值的错误 mdf by jc 20100701
							obj.setTitle(title);
						}catch(e){
							return;
						}
					}
				
			}
		}
		//暂时不进行JSON的默认解析,以后考虑一个JSON格式再进行默认渲染的函数 mdf by jc 20100730
		if(paraChannel.sourceType==3 && !paraChannel.embelish){
			if($(divId))$(divId).innerHTML= "系统提示:频道类型为JSON,暂时不提供默认渲染函数,需要配置一个自定义渲染函数";
			return;
		}
		//下面根据样式进行设置
		var html="";
		if(paraChannel.embelish){
			//有自定义函数时
			try{
				paraChannel.embelish = paraChannel.embelish.replace(/(\(.*\)[;]?)$/,'');//过滤掉函数(参数)
				var fn = function(){return eval(paraChannel.embelish+".call(paraChannel,paraChannel,$(divId))")};
				html = fn();
			}catch(e){html="频道自定义渲染失败!"}
		} else {
			if (paraChannel.style==1){
				html = ucapChannel.html.getClomnHtml(paraChannel);						
			} else if(paraChannel.style==2){
				html = ucapChannel.html.getGraphicHtml(paraChannel);
			} else if (paraChannel.style==3){
				html = ucapChannel.html.getIllustrationsHtml(paraChannel);					
			} else if (paraChannel.style==8){
				html = ucapChannel.html.getShortcutsHtml(paraChannel);
			}
		}
		if (paraChannel.roll !=""){
			//说明有	滚动				
			var sTd ='<marquee behavior="scroll" direction="'+paraChannel.roll+'" scrollamount="'
			+paraChannel.rollamount+'"'+'" onmouseover="this.stop()" onmouseout="this.start()">';
			html = sTd+html+'</marquee>';
		}
		if($(divId))$(divId).innerHTML= html;
   },
	/**
	 * 根据视图的UNID，返回iframe用的URL值
	 * @param {} viewId
	 */
	getViewIframeSrc:function(viewId){
		var url=ucapSession.hostPath+ucapSession.appPath +
			"sys/jsp/view.jsp?viewId="+viewId+"&noQuery=true&noPreview=true&noTbar=true&noBbar=true";
		return url;
	},	
	/**
	 * 保存频道位置个性化设置
	 * @return {}
	 * "portal":{"column":"3","columnContent":
	 * "10010;10011;10005,10002;10015;10012,10008;10013;10016","columnWidth":"20,50,30",
	 * "punid":"1E46850068000044001738","schemeUnid":"1E46850068000044001738","unid":"101"}
	 */
	savePortal:function(id){
	    var items=this.portal.items;
	    var ids="";
	    for(var i=0;i<items.getCount();i++){
			var c=items.get(i);  
			if (c.items.length==0){
		   		ids +="*";
		   	} else {
				c.items.each(function(portlet){
					ids += portlet.getId()+";";
				});    
				ids = ids.substring(0,ids.length-1);
		   	}
			ids += ","; 
	   }
	   ids = ids.substring(0,ids.length-1);
	   this.ucapPortalObj.columnContents = ids;   
	   this.postPortal(id);
	},
	/**
	 * 把改变化后的ucapPortalObj对象Porst给后台，进行个性化保存
	 */
	postPortal:function(id){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"savePortal","deleteUnid":id},
			jsonData:ucapPortal.ucapPortalObj,
			callback:function(options,success,response){
				if (success){	
					//成功后要改变 ucapPortalObj中的相关值
					var nochange=response.responseText;
					if (nochange!="nochange"){
						//说明有改变，要重设其值
						ucapPortal.ucapPortalObj =Ext.util.JSON.decode(nochange);										
						var exResult=ucapCommonFun.dealException(ucapPortal.ucapPortalObj);
						if(!exResult)return;
					} 
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 根据频道的ID，获取频道的显示类型，频道的来源
	 * @param {} channelId
	 */
	setCurChannelType:function(channelId){
		for(var i=0;i<this.channels.length;i++){
			if (typeof(this.channels[i].items)=="undefined") continue;
			for(var j=0;j<this.channels[i].items.length;j++){
				if (this.channels[i].items[j].id == channelId){
					this.portletType.disType = parseInt(this.channels[i].items[j].style,10);
					if (typeof(this.channels[i].items[j].sourceType)=="undefined"){
						this.portletType.sourceType =-1;
					} else
						this.portletType.sourceType = parseInt(this.channels[i].items[j].sourceType,10);	
					this.portletType.channel = this.channels[i].items[j];
					break;
				}
			}
		}
		var json = this.portletType.channel;
		if (typeof(json.titlePicture)=="undefined") json.titlePicture="";
		if (typeof(json.dataPicture)=="undefined") json.dataPicture ="";
		if (typeof(json.pictureColumn)=="undefined") json.pictureColumn ="";
		if (typeof(json.pictureHeight)=="undefined") json.pictureHeight ="";
		if (typeof(json.pictureWidth)=="undefined") json.pictureWidth ="";
		if (typeof(json.source)=="undefined") json.source ="";		
		if (typeof(json.height)=="undefined")
			this.portletType.channel.height =0;
	},
	/**
	 * public
	 * 根据频道的UNID，设置divId的值，本方法对外公布
	 * @param {} channelUnid     频道的Unid
	 * @param {} divId           要设置的div
	 */
	ucapSetChannelHtml:function(channelUnid,divId){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"getChannel","channelUnid":channelUnid},
			jsonData:ucapPortal.ucapPortalObj,
			callback:function(options,success,response){
				if (success){	
					var channel=Ext.decode(response.responseText);
					ucapPortal.setItemPortal(channel,ucapPortal.setPortletHtml, divId);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}

/**
 * 频道内容的设置
 * @type 
 */

var ucapChannel={
	column:"", //列数
	columnWidth:"",//列宽
	columnContents:new Array(), //列对应的频道ID
	oldJson:null,
	html:{
		getDocTipClk:function(docUnid,paraChannel){
			var html="";
			if (typeof paraChannel.viewInfo.messageType !="undefined"){
				if (paraChannel.viewInfo.messageType!="01" && paraChannel.viewInfo.messageType !=""){
					//说明有提示信息
					html= ' qtip="'+ ucapCommonFun.getViewTip(paraChannel.viewInfo.unid,docUnid)+'"';
				}
			}
			if (paraChannel.viewInfo.formUnid!="" && paraChannel.docType==9){
				//说明来源是视图方式 modify by jc 20091110
				var divId="";
				if (paraChannel.viewInfo.flowItem){
					//说明是流程 yjy 2011-3-25 add 为了在文档发生改变时能自动更新当前频道
					divId= paraChannel.divId;
				}
				var js = " view.openViewDoc('"+docUnid+"','"+paraChannel.viewInfo.formType+"'," +
		    		  "'"+paraChannel.viewInfo.formUnid+"',"+paraChannel.viewInfo.flowItem+",'','"+
		    		  paraChannel.viewInfo.openJs+"','','','"+(paraChannel.viewInfo.viewId||"")+"','01','"
		    		  +(paraChannel.viewDocOpenType||"00")+"','"+divId+"')";//增加一个参数divId yjy 2011-3-25 add
				html += " onclick=\" "+js+"\" "+'>';
			
			} else{
				html += ucapClk.getClk(docUnid,paraChannel.docType)+'>';	
			}
			return html;
		},
		/**
		 * 生成列表的HTML格式
		 */
		getClomnHtml:function(paraChannel){
			if (paraChannel.content.length==0)return "";
			var html ='<ul class="textList2">';
			var c= 'onmouseover="this.className=\'text2_hover\'" onmouseout="this.className=\'';
			var img="";
			if (paraChannel.docImg!=""){
				img = '<img src="'+paraChannel.docImg+'" />&nbsp;';
			}
			//begin 频道自定义展示字段列 modify by zhua@linewell.com
			var  columnArr;
			var hasSplit=false;
			var fieldMap;  
   			if(paraChannel.column && paraChannel.column !="" &&paraChannel.column.length>0){
       			columnArr=paraChannel.column.split(",");
				if(columnArr.length>1){
					hasSplit=true;
				}
				fieldMap= new customMap.Map();
				var position=0;
				for(var j in paraChannel.content[0]) {				
		    			fieldMap.putValue(position,j)
		    			position++;
	       		}
   			}			
			//end
			for(var i=0;i<paraChannel.content.length;i++){
				var cls = "text2_"+i%2;
				html +='<li class="'+cls+'" ' + c + cls+'\'">';
				html +=img;
				html +='<a href="javascript:void(0)" ';
				
				var docUnid = paraChannel.content[i][paraChannel.unidName];				
				html +=this.getDocTipClk(docUnid,paraChannel);
				if(hasSplit){
					for(var s=0;s<columnArr.length;s++){
						var sign=parseInt(columnArr[s]);
						if(sign>=fieldMap.size()) break;
						if(sign<0) continue;
						html +=paraChannel.content[i][fieldMap.getValue(sign)]+"&nbsp;";	
					}
				}else{
					var icount=0;
					for(var j in paraChannel.content[i]) {
		    			if (j!=paraChannel.unidName){
		    				if (paraChannel.docType==9){
		    					icount++;
		    					if (icount>paraChannel.column) break;
		    				}
		    				html +=paraChannel.content[i][j]+"&nbsp;";	
		    			}
	       			}				
				}
					
				html +='</a></li>';
			}
			html+='</ul>';
			return html;
		},
		/**
		 * 生成图文环绕的HTML格式
		 */
		getGraphicHtml:function(paraChannel){
			if (paraChannel.content.length==0)return "";
			var html ='<ul class="textList4">';
			var img="";
			if (paraChannel.docImg!=""){
				img = '<img  src="'+paraChannel.docImg+'" />';
			}		
			//取出图片所在的列的值
			var src ="";
			var imgTitle="";
			var num =0;
			var srcName ="";
			for(var j in paraChannel.content[0]) {
				if (paraChannel.imgNum == num){
					src = paraChannel.content[0][j];
					srcName = j;
				} else if (j!=paraChannel.unidName){
    				imgTitle +=paraChannel.content[0][j]+"&nbsp;";	
				};    		
				num++;
   			}	
			html +='<li>';
			html +='<a href="javascript:void(0)" ';
			var docUnid = paraChannel.content[0][paraChannel.unidName];
			html += this.getDocTipClk(docUnid,paraChannel);
			html +='<img src="'+src+'" width='+paraChannel.imgWidth +' height='+paraChannel.imgHeight+' title="'
					+imgTitle +'"/>&nbsp;';
			html += imgTitle;			
			html +='</a></li>';
			for(var i=1;i<paraChannel.content.length;i++){
				html +='<li>'+img;
				html +='<a href="javascript:void(0)" ';
				
				var docUnid = paraChannel.content[0][paraChannel.unidName];
				//var docid =paraChannel.getViewDocUrl(docUnid);
				html += this.getDocTipClk(docUnid,paraChannel);	
				html += '&nbsp;';
				
				var icount=0;
				for(var j in paraChannel.content[i]) {	    				
					if ( srcName != j && j!=paraChannel.unidName ){
						if (paraChannel.docType==9){
    						icount++;
    						if (icount>paraChannel.column) break;
	    				}	
	    				html +=paraChannel.content[i][j]+"&nbsp;";	
					}        				
         		}				
				html +='</a></li>';
			}
			html+='</ul>';
			return html;
		},
		/**
		 * 生成图文并茂的HTML格式
		 */
		getIllustrationsHtml:function(paraChannel){
			if (paraChannel.content.length==0)return "";
			var img="";
			if (paraChannel.docImg!=""){
				img = '<img  src="'+paraChannel.docImg+'" />';
			}					
			var num =0;
			var srcName ="";
			for(var j in paraChannel.content[0]) {
				if (paraChannel.imgNum == num){
					srcName = j;
				}   		
				num++;
   			}	   			
			var html ='';
			//取出图片所在的列的值
			for(var i=0;i<paraChannel.content.length;i++){
				var docUnid = paraChannel.content[i][paraChannel.unidName];
				var clk= this.getDocTipClk(docUnid,paraChannel);		
				html +='<ul class="imgList_3"><li class="pic">';
				html +='<a href="javascript:void(0)" ';
				html += clk ;
				html +='<img src="'+paraChannel.content[i][srcName]+'" width='+paraChannel.imgWidth +
						' height='+paraChannel.imgHeight +'/>';
				html +='</a></li>';
				
				html +='<li class="picText"><a href="javascript:void(0)"  '+ clk ;		
				var icount=0;
				for(var j in paraChannel.content[i]) {					
					if (srcName != j && j!=paraChannel.unidName ){
						if (paraChannel.docType==9){
    						icount++;
    						if (icount>paraChannel.column) break;
	    				}
						html +=paraChannel.content[i][j]+"<br>";	
					}
         		}		
				html +='</a></li></ul>';
			}
			return html;
			
		},
		/**
		 * 生成flash格式的HTML
		 */
		getFlashHtml:function(paraChannel){
			if (paraChannel.url=="")return "";
			return ucapChannel.otherHtml.getFlashHtml(paraChannel.url);
		},
		/**
		 * 生成video格式的HTML
		 */
		getVideoHtml:function(paraChannel){
			if (paraChannel.url=="")return "";
			return ucapChannel.otherHtml.getVideoHtml(paraChannel.url);
		},
		/**
		 * 生成音乐播放格式的HTML
		 */
		getMusicHtml:function(paraChannel){
			if (paraChannel.url=="")return "";
			return ucapChannel.otherHtml.getMusicHtml(paraChannel.url);
		},
		/**
		 * 生成图片格式的HTML
		 */
		getImgHtml:function(paraChannel){
			if (paraChannel.url=="")return "";
			return '<img alt="单击打开新窗口查看" src="'+paraChannel.url+'" '+ucapClk.getClk(paraChannel.url,3)+' />';
		},
		/**
		 * 生成快捷方式的HTML 类型有 模块  视图  URL 按钮
		 * 第一列为 名称，第二列为 类型，第三列 为内容，第四列 图标 第五列为 提示信息
		 * 1 表示打开模块 2表示打开视图 3表示打开URL 4表示打开文档 
		 *  name type content icon title
		 */
		getShortcutsHtml:function(paraChannel){
			if (paraChannel.content.length==0)return "";
			var html ='<ul class="textList3">';
			html +='<li class="shortcuts_top"></li>';	
			//取出图片所在的列的值
			for(var i=0;i<paraChannel.content.length;i++){			
				html +='<li>';
				html +="&nbsp;&nbsp;&nbsp;"+ucapMenu.getCutHtml(paraChannel.content[i],1);
				html +='</li>';			
			}
			html +='<li class="shortcuts_bottom"></li></ul>';
			return html;
		}	
	},
	otherHtml:{
		getFlashHtml:function(flash,width,height){
			var html='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' +
					'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0"';
			var wh ="";
			if (typeof(width)!="undefined" && typeof(height)!="undefined" ){
				wh =' width="'+width+'" height="'+height+'"';
			} else {
				wh =' width="100%" height="100%" ';
			}
			html +=wh+'>';
			html +='<param name=movie value="'+flash+'">';
			html +='<param name=quality value=high>';
			html +='<param name="wmode" value="opaque" />';
			html +='<embed src="'+flash+'" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"' +
					' type="application/x-shockwave-flash" ';
			html += wh+'></embed></object>';
			return html;
		},
		getVideoHtml:function(url,width,height){
			var wh ="";
			if (typeof(width)!="undefined" && typeof(height)!="undefined" ){
				wh =' width="'+width+'" height="'+height+'"';
			} else {
				wh =' width="100%" height="100%" ';
			}
			if(url && url.toLowerCase().indexOf("http://") == -1 
								&& url.toLowerCase().indexOf("https://") == -1 && url.indexOf("mms:")==-1){
				url =ucapSession.appPath+url;
			}
			var html='<object  classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" ';
			html +='codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112"';
			html +=' align="baseline" border="0" '+wh+' standby="Loading Microsoft Windows Media Player components..." ';
			html +='type="application/x-oleobject">';
			html +='<param name="URL" value="'+url+'">';
			html +='<param name="autoStart" value="true">';
			html +='<param name="invokeURLs" value="false">';
			html +='<param name="playCount" value="100">';
			html +='<param name="wmode" value="opaque" />';
			html +=' <param name="defaultFrame" value="datawindow">';
	        html +='</object> ';
	    	return html;
		},
		getMusicHtml:function(url,width,height){
			if (typeof(height)!="undefined" ){		
				height="68";
			};
			if (typeof(width)!="undefined"){
				width ="100%";
			}
			return this.getVideoHtml(url,width,height);
		}	
	},
	/**
	 * 频道设置要根据不同的类型进行判断
	 */
	setChannel:function(panel){
		var channelUnid = panel.getId();
		ucapPortal.setCurChannelType(channelUnid);
		var html="";
		var width;
		var height;
		var type;
		if (ucapPortal.portletType.disType==4 || ucapPortal.portletType.disType==5 
			|| ucapPortal.portletType.disType==6 || ucapPortal.portletType.disType==7
			|| ucapPortal.portletType.disType==9){
			html ="sys/cfgJsp/portal/setUrlChannel.jsp";	
			width=600;
			height=225;
			type = 3;
		} else if (ucapPortal.portletType.disType==1 || ucapPortal.portletType.disType==10){			
			html ="sys/cfgJsp/portal/setColumnChannel.jsp";
			width=600;
			height=300;
			type =1;
		} else if (ucapPortal.portletType.disType==8){
			html ="sys/cfgJsp/portal/setCutChannel.jsp";
			width=600;
			height=225;
		} else {
			html ="sys/cfgJsp/portal/setImgChannel.jsp";
			width=600;
			height=325;
			type=2;
		}
		if (ucapPortal.portletType.sourceType==1 || ucapPortal.portletType.sourceType==5){
			html+="?sourceType="+ucapPortal.portletType.sourceType+"&source="+
					ucapPortal.portletType.channel.source;
		}
		var button=[{text:"确定",handler:function(){ucapChannel.updateChannel();}},
				{text:"取消",
					handler:function(){ucapPortal.setChannelWin.close();}}	
			];
		ucapPortal.setChannelWin = new Ext.Window({
			title:ucapSession.win.winImg+"频道设置",
	        width:width,
	        closable:true,    //关闭
	        modal: true,     
			height:height,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});		
		
		ucapPortal.setChannelWin.show();	
		return;
	},	
	/**
	 * 更新频道确定后的操作 private
	 */
	updateChannel:function(){
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		var name = json.channelName;
		var url = json.source;
		if (Ext.encode(ucapChannel.oldJson)==Ext.encode(json)){
			Ext.Msg.alert("提示信息","当前频道的值没有更新，请确认！");
			return;
		}
		if (json.adaptive=="1"){
			json.channelHeight=0;
		}
		if (json.roll ){
			if (json.roll=="1"){
				json.roll= true;
			}else {
				json.roll= false;
			}
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"channel","act":"update","unid":ucapPortal.portletType.channel.id,
					"portalId":ucapPortal.ucapPortalObj.unid},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;					
					ucapPortal.init(ucapPortal.portalid);
					ucapPortal.setChannelWin.close();
					//window.location.reload();
				} else {
					Ext.Msg.alert("提示","保存不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 增加频道
	 */
	addChannel:function(panel){
		
		var channelUnid = panel.getId();
		ucapPortal.setCurChannelType(channelUnid);
		
		var html="sys/cfgJsp/portal/selectAddType.jsp";
		var width = 200;
		var height = 150;
		
		var button=[{text:"确定",handler:function(){ucapChannel.selectConfirm();}},
				{text:"取消",
					handler:function(){ucapPortal.setChannelWin.close();}}	
			];
		ucapPortal.setChannelWin = new Ext.Window({
			title:ucapSession.win.winImg+"新增频道选择框",
	        width:width,
	        closable:true,    //关闭
	        modal: true,     
			height:height,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapPortal.setChannelWin.show();
	},
	/**
	 * 新建频道确认后操作
	 * private
	 */
	selectConfirm:function(){
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		ucapPortal.setChannelWin.close();
		if (json.type==2){
			ucapChannel.newChannel();
		} else {
			ucapChannel.selectChannel();
		};
		
	},
	/**
	 * 新建一个频道对话框
	 * 
	 */
	newChannel:function(){
		var html="sys/cfgJsp/portal/newChannel.jsp";
		var width = 600;
		var height = 350;
		
		var button=[{text:"确定",handler:function(){ucapChannel.newChannelConfirm();}},
				{text:"取消",
					handler:function(){ucapPortal.setChannelWin.close();}}	
			];
		ucapPortal.setChannelWin = new Ext.Window({
			title:ucapSession.win.winImg+"新建频道对话框",
	        width:width,
	        closable:true,    //关闭
	        modal: true,     
			height:height,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapPortal.setChannelWin.show();
	},
	/**
	 * 新建频道确认后 private
	 */
	newChannelConfirm:function(){
		var json = ucapCommonFun.getFormJSon("dialogHtml");	
		if(null==json.channelName || json.channelName==""){
			Ext.Msg.alert("提示","频道名称不允许为空！");
			return;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"channel","act":"add","unid":ucapPortal.portletType.channel.id,
					"portalId":ucapPortal.ucapPortalObj.unid},
			jsonData:json,
			callback:function(options,success,response){				
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					ucapPortal.init(ucapPortal.portalid);
					ucapPortal.setChannelWin.close();
					//window.location.reload();
				} else {
					Ext.Msg.alert("提示","新增频道不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 选择已有频道对话框
	 */
	selectChannel:function(){
		var html="sys/cfgJsp/portal/selectChannel.jsp";
		var width = 300;
		var height = 350;
		
		var button=[{text:"确定",handler:function(){ucapChannel.selectChannelConfirm();}},
				{text:"取消",
					handler:function(){ucapPortal.setChannelWin.close();}}	
			];
		ucapPortal.setChannelWin = new Ext.Window({
			title:ucapSession.win.winImg+"选择频道对话框",
	        width:width,
	        closable:true,    //关闭
	        modal: true,     
			height:height,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapPortal.setChannelWin.show();
	},
	/**
	 * 选择一个已有频道后执行 private
	 */
	selectChannelConfirm:function(){
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		var unid="";
		if (channelType==0){
			unid = json.user;
		} else if (channelType==1){
			unid = json.dept;
		} else if (channelType==2){
			unid = json.system;
		}		
		if (unid==""){
			Ext.Msg.alert("新建频道提示","请选择一个频道！");
			return;
		}
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"channel","act":"selectAdd","unid":ucapPortal.portletType.channel.id,
					"newUnid":unid,
					"portalId":ucapPortal.ucapPortalObj.unid},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					ucapPortal.init(ucapPortal.portalid);
					ucapPortal.setChannelWin.close();
					//window.location.reload();
				} else {
					Ext.Msg.alert("提示","新增频道不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);	
	},
	getChannelSourceText:function(type){
		var t;
		if (type=="1"){
			t="视图";
		} else if (type=="2"){
			t="RSS格式的地址";
		} else if (type=="3"){
			t="JSON格式的地址";
		} else if (type=="4"){
			t="URL地址";
		} else {
			t="内容";
		}
		return t;
	}
}


/**
 * 浮动窗口的设置
 * add by  fsm
 */
var ucapfloatpage={
	 //window.onload = getMsg;
	 //window.onresize = resizeDiv;
	 //window.onerror = function(){}	
	divTop:0,
	divLeft:0,
	divWidth:0,
	divHeight:0,
	docHeight:0,
	docWidth:0,
	objTimer:0,
	i:0,
	/**
	 * 显示浮动框
	 */
	getMsg:function(){
		try
		{
			if(document.getElementById("loft_win").style.visibility=="visible"||document.getElementById("loft_win_min").style.visibility=="visible")
	       		return;
			this.divTop = parseInt(document.getElementById("loft_win").style.top,10);
	        this.divLeft = parseInt(document.getElementById("loft_win").style.left,10);
	        this.divHeight = parseInt(document.getElementById("loft_win").offsetHeight,10);
	        this.divWidth = parseInt(document.getElementById("loft_win").offsetWidth,10);
	        this.docWidth = document.body.clientWidth;
	        this.docHeight = document.body.clientHeight;
	        document.getElementById("loft_win").style.top = parseInt(document.body.scrollTop,10) + this.docHeight + 10;// divHeight
	        document.getElementById("loft_win").style.left = parseInt(document.body.scrollLeft,10) + this.docWidth - this.divWidth;
	        document.getElementById("loft_win").style.visibility="visible";
	        this.objTimer = window.setInterval("ucapfloatpage.moveDiv()",10);
	   	}
	  catch(e){
	  
	  }
 	},
	  /**
	   * 初始化位置
	   */
	resizeDiv:function()
	 {
		this.i+=1;
		//if(i>300) closeDiv() //如果不让自动消失由用户来自己关闭---屏蔽这句
		try
		{
			this.divHeight = parseInt(document.getElementById("loft_win").offsetHeight,10);
			this.divWidth = parseInt(document.getElementById("loft_win").offsetWidth,10);
			this.docWidth = document.body.clientWidth;
			this.docHeight = document.body.clientHeight;
			document.getElementById("loft_win").style.top = this.docHeight - this.divHeight + parseInt(document.body.scrollTop,10);
			document.getElementById("loft_win").style.left = this.docWidth - this.divWidth + parseInt(document.body.scrollLeft,10);
		  }
		  catch(e){
		  	
		  }
	 },
	 /**
	  * 最小化
	  */
	minsizeDiv:function(){
		this.i+=1
		//if(i>300) closeDiv() //如果不让自动消失由用户来自己关闭---屏蔽这句
		try
		{
			this.divHeight = parseInt(document.getElementById("loft_win_min").offsetHeight,10);
			this.divWidth = parseInt(document.getElementById("loft_win_min").offsetWidth,10);
			this.docWidth = document.body.clientWidth;
			this.docHeight = document.body.clientHeight;
			document.getElementById("loft_win_min").style.top = this.docHeight - this.divHeight + parseInt(document.body.scrollTop,10);
			document.getElementById("loft_win_min").style.left = this.docWidth - this.divWidth + parseInt(document.body.scrollLeft,10);
		}
		catch(e){}
	},
	 /**
	  * 移动
	  */
	moveDiv:function(){
		try
		 {
			  if(parseInt(document.getElementById("loft_win").style.top,10) <= (this.docHeight - this.divHeight + parseInt(document.body.scrollTop,10)))
			  {
				   window.clearInterval(this.objTimer);
				   this.resizeDiv(); 
				   //objTimer = window.setInterval("resizeDiv()",1);
			  }
			  this.divTop = parseInt(document.getElementById("loft_win").style.top,10);
			  document.getElementById("loft_win").style.top = this.divTop -1;
		}
		catch(e){
		
		}
	 },
	 minDiv:function(){
		this.closeDiv();
		document.getElementById('loft_win_min').style.visibility='visible';
		this.objTimer = window.setInterval("ucapfloatpage.minsizeDiv()",1);
	 },
	maxDiv:function(){
		document.getElementById('loft_win_min').style.visibility='hidden';
		document.getElementById('loft_win').style.visibility='visible';
		document.getElementById("ContentDiv").style.visibility='visible';
		//objTimer = window.setInterval("resizeDiv()",1);
		//resizeDiv()
		ucapfloatpage.getMsg();
	 },
	closeDiv:function(){
		document.getElementById('loft_win').style.visibility='hidden';
		document.getElementById('loft_win_min').style.visibility='hidden';
		document.getElementById("ContentDiv").style.visibility='hidden';
		if(this.objTimer)
		{
			window.clearInterval(this.objTimer);
		}
	 },
	 move:false,
	 /**
	 * 鼠标按下时，触发
	 */
	startdrag:function(obj) {
		if (event.button == 1 && event.srcElement.tagName.toUpperCase() == "DIV") 
		{
			obj.setCapture();
			this.move=true;
		} 
	},
	 /**
	 * 当鼠标经过div时，触发
	 */
	drag:function(obj) {
		if(this.move)
		{
			var oldwin=obj.parentNode;
			oldwin.style.left=event.clientX-100;
			oldwin.style.top=event.clientY-10;
	     }
	},	
	 /**
	 * 鼠标弹开时，触发
	 */
	stopdrag:function(obj){
		 obj.releaseCapture(); 
		 this.move=false;
	 },
	 
    refeshNumber:0,
    /**
    *渲染浮动框的内容    add  by  fsm
    @param  title 标题
    @param  iconurl 图标url地址
    @param  strhtml 显示的字符串
    @param  url  url地址
    @param  width 宽
    @param  width 高
    */
    setFloatContent:function(title,iconurl,strhtml,url,width,height)
    {
    	if(width&&width>0)
        {
            Ext.get("loft_win").setWidth(width);
        }
        if(height&&height>0)
        {
            Ext.get("ContentDiv").setHeight(height);
        }
        ucapfloatpage.getMsg();
        var str=Ext.get("ContentDiv");
        if(strhtml&&strhtml!=""&&url=="")
        {
            str.dom.innerHTML=strhtml;
        }
        else
        {
            if(url&&url!="")
            {
                str.load({
                url:url,
                params:"",
                text:"Loading..."
                });
                str.show();
           } 
        }
        if(iconurl&&""!=iconurl)
            Ext.get("icondiv").dom.src=iconurl;
        if(title&&title!="")
            Ext.get("titlediv").dom.innerHTML=title;
        ucapfloatpage.refeshNumber++;
    }
 
}