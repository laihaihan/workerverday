var ggfwptView = {
baseAction:view.tomcatroot+"/cmsApplyAction.action",
cateunid:function(){return this.func_getParameter('cateunid');},
totalpage:0,//总页数
pagesize:20,//每页记录数
cpage:1,//页面指针
count:1,
curcount:1,
outstr:"",
page:10,//分页时多少页数换页
siteDomain:view.siteDomain,
// 获取[导航]信息
getNavberStr:function () {
	var cateunidstr="";
	try{
	cateunidstr=this.cateunid();
	}catch(e){
	cateunidstr=ggfwptView.cateunid;	
	}
	var params = "type=cmsAction&act=getNavBar&cateunid="+cateunidstr+"&url=view.html";
	var requestConfig = {
		url : this.baseAction,
		params : params,
		callback : function(options, success, response) {
			if ( success ) {
				var strHTML = "";
				strHTML=response.responseText;
				document.getElementById("trNavBer").innerHTML = strHTML;
			} else {
				alert("Ajax获取失败");
			}
		}
	}
	Ext.Ajax.request(requestConfig);
},
// 获取[栏目名称]信息
getCateName:function () {
	var cateunidstr="";
	try{
	cateunidstr=this.cateunid();
	}catch(e){
	cateunidstr=ggfwptView.cateunid;	
	}
	var params = "type=cmsAction&act=getCateTitle&cateunid="+cateunidstr;
	var requestConfig = {
		url : this.baseAction,
		params : params,
		callback : function(options, success, response) {
			if ( success ) {
				var strHTML = "";
				strHTML=response.responseText;
				document.getElementById("TdCateName").innerHTML = strHTML;
			} else {
				alert("Ajax获取失败");
			}
		}
	}
	Ext.Ajax.request(requestConfig);
},
//获取栏目列表信息
getCategoryInfo:function () {
	
	                var params = "type=cmsAction&act=getCateList&punid=" +this.cateunid()+"&siteunid="+view.siteunid;
					var url = this.baseAction + "?" + params;
					var conn = Ext.lib.Ajax.getConnectionObject().conn;
					conn.open("GET", url, false);
					conn.send(null);
				var strHTML = "";
				if ( ("null" != conn.responseText) && ("" != conn.responseText) ) {
					var objJson = Ext.util.JSON.decode(conn.responseText);
				} else {
					var objJson = [];
				}
				if ( (null != objJson) && (objJson.length > 0) ) {
				var intCount_01 = 0;
					for (var i = 0; i < objJson.length; i++) {
						var tmpJson = objJson[i];
						if (null == tmpJson) {
							continue;
						}
						intCount_01 = intCount_01 +1;
					var strObjUnid_01 = tmpJson.id;
					var strObjName_01 = tmpJson.text;
					// 链接地址
					var strObjUrl_01 = tmpJson.path;
					var strObjLeaf_01 = tmpJson.leaf;
					if(strObjLeaf_01==true){
						strObjUrl_01="view1.html?cateunid="+strObjUnid_01;
					}else{
						strObjUrl_01="view.html?cateunid="+strObjUnid_01;
					}
					strHTML = strHTML	+"<table cellspacing=\"5\" cellpadding=\"0\" width=\"100%\" bgcolor=\"#ffffff\" border=\"0\">";
					strHTML = strHTML	+"<tr><td bgcolor=\"#fff2e1\" height=\"22\" align=\"left\">";
					strHTML = strHTML	+"<img  src=\"../images/zhinan/ic2.gif\" width=\"9\" height=\"9\" hspace=\"7\" align=\"absmiddle\" />";
					strHTML = strHTML	+"<a href=\""+strObjUrl_01+"\" target=\"_blank\"><strong>"+strObjName_01+"</strong></a></td>";
					strHTML = strHTML	+"</tr>";
					
					//取子节点
					var childparams = "type=cmsAction&act=getCateList&punid=" +strObjUnid_01+"&siteunid="+view.siteunid;
					var childurl = this.baseAction + "?" + childparams;
					var childconn = Ext.lib.Ajax.getConnectionObject().conn;
					childconn.open("GET", childurl, false);
					childconn.send(null);
						if ( ("null" != childconn.responseText) && ("" != childconn.responseText) ) {
							var listCate_01 = Ext.util.JSON.decode(childconn.responseText);
						} else {
							var listCate_01 = null; 
							var articleparams = "type=cmsAction&act=getList&cateunid=" +strObjUnid_01+"&count=6";
							var articleurl = this.baseAction + "?" + articleparams;
							var articleconn = Ext.lib.Ajax.getConnectionObject().conn;
							articleconn.open("GET", articleurl, false);
							articleconn.send(null);
							if ( ("null" != articleconn.responseText) && ("" != articleconn.responseText) ) {
								var list_01 = Ext.util.JSON.decode(articleconn.responseText);
								if ( (null != list_01) && (list_01.length > 0) ) {
									
							strHTML = strHTML	+"<tr>";
							strHTML = strHTML	+"<td valign=\"top\" align=\"middle\" height=\"25\">";
							strHTML = strHTML	+"<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\">";
							var intCount_02 = 0;
							var flag = 0;
								for (var j = 0; j < list_01.length; j++) {
									var tmpJson_02 = list_01[j];
									if (null == tmpJson_02) {
										continue;
									}
									flag = flag +1;
									intCount_02=intCount_02+1;
								var strObjUnid_02 = tmpJson_02.id;
								var strObjName_02 = tmpJson_02.text;
								if(strObjName_02.length>=25){
	    							strObjName_02=strObjName_02.substr(1,25)+"...";
	    						}
								var strObjUrl_02 = "../"+tmpJson_02.path;
								if(tmpJson_02.type=="1" && null!=tmpJson_02.fromurl && tmpJson_02.fromurl!=""){
								strObjUrl_02=tmpJson_02.fromurl;
								}
									if(flag==1){
										strHTML = strHTML	+"<tr>";
									}
								strHTML = strHTML	+"<td align=\"left\" width=\"50%\" height=\"24\">";
								strHTML = strHTML	+"<a href=\""+strObjUrl_02+"\" target=\"_blank\">．"+strObjName_02+"</a></td>";
									if(intCount_02%2==0){
										flag=0;
										strHTML = strHTML	+"<tr>";
									}
								}
									if(intCount_02%2!=0){
										flag=0;
										strHTML = strHTML	+"<td>&nbsp;</td></tr>";
									}
								strHTML = strHTML	+"<tr><td align=\"right\" colspan=\"2\"><a href=\"view1.html?cateunid="+strObjUnid_01+"\" target=\"_blank\">更多&gt;&gt;</a></td></tr>";
								strHTML = strHTML	+"</table></td></tr>";
								}
							}
						}
						if ( (null != listCate_01) && (listCate_01.length > 0) ) {
							strHTML = strHTML	+"<tr>";
							strHTML = strHTML	+"<td valign=\"top\" align=\"middle\" height=\"25\">";
							strHTML = strHTML	+"<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\">";
							var intCount_02 = 0;
							var flag = 0;
								for (var j = 0; j < listCate_01.length; j++) {
									var tmpJson_02 = listCate_01[j];
									if (null == tmpJson_02) {
										continue;
									}
									flag = flag +1;
									intCount_02=intCount_02+1;
								var strObjUnid_02 = tmpJson_02.id;
								var strObjName_02 = tmpJson_02.text;
								var strObjLeaf_02 = tmpJson_02.leaf;
								var strObjUrl_02 = tmpJson_02.path;
									if(strObjLeaf_02==true){
										strObjUrl_02="view1.html?cateunid="+strObjUnid_02;
									}else{
										strObjUrl_02="view.html?cateunid="+strObjUnid_02;
									}
									if(flag==1){
										strHTML = strHTML	+"<tr>";
									}
								strHTML = strHTML	+"<td align=\"left\" width=\"50%\" height=\"24\">";
								strHTML = strHTML	+"<a href=\""+strObjUrl_02+"\" target=\"_blank\">"+strObjName_02+"</a></td>";
									if(intCount_02%2==0){
										flag=0;
										strHTML = strHTML	+"<tr>";
									}
								}
									if(intCount_02%2!=0){
										flag=0;
										strHTML = strHTML	+"<td>&nbsp;</td></tr>";
									}
								strHTML = strHTML	+"</table></td></tr>";
								}
					}
					document.getElementById("cate_list").innerHTML = strHTML+"</table>";
				}
},
//获取视图列表信息
getArticleInfo:function () { 
	var cateunidstr="";
	try{
		cateunidstr=this.cateunid(); 
	}catch(e){
		cateunidstr=ggfwptView.cateunid;	
	}
	var params = "type=cmsAction&act=getList&cateunid=" +cateunidstr;
	var requestConfig = {
		url : this.baseAction,
		params : params,
		callback : function(options, success, response) {
			if ( success ) {
				var strHTML = "<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\">";
				
				if ( ("null" != response.responseText) && ("" != response.responseText) ) {
					var objJson = Ext.util.JSON.decode(response.responseText);
				} else {
					var objJson = [];
				}
				if ( (null != objJson) && (objJson.length > 0) ) {
					//var intCount = 1;
					var begin=0;
					var end=0;
					if(ggfwptView.cpage<=1){
					begin=0;
					}else{
					begin=(ggfwptView.cpage-1)*ggfwptView.pagesize;
					}
					end=ggfwptView.cpage*ggfwptView.pagesize;
					if(end>objJson.length){
					end=objJson.length;
					}
					for (var i = begin; i < end; i++) {
						var tmpJson = objJson[i];
						if (null == tmpJson) {
							continue;
						}
						strHTML = strHTML+"<tr>";
                        strHTML = strHTML+"<td align=\"left\" width=\"90%\" height=\"24\" class=\"td_buttom\" ><a href=\""+view.siteDomain+"/"+tmpJson.path+"\">．"+tmpJson.text+"</a></td>";
                    	var date=tmpJson.publishdate;
						if(date!=null&&date!=""&&date.length>=10){
							date=date.substring(0,10);
						}
                    	strHTML = strHTML+"<td width=\"10%\"  class=\"td_buttom\"  >"+date+"</td>";
                  		strHTML = strHTML+"</tr>";
					}
				}
				// 进行赋值操作
				
				document.getElementById("divListInfo").innerHTML = strHTML+"</table>";
				
				if(objJson.length>0){
					var page=parseInt(objJson.length/ggfwptView.pagesize);
					page=page+1;
					ggfwptView.totalpage=page;
				}
				ggfwptView.setpage();    //调用分页
				
			} else {
				// Ajax获取失败
			}
		}
	}
	Ext.Ajax.request(requestConfig);
},
//从静态页面取参数
func_getParameter:function (paras){
	var url = location.href.split("#")[0];
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = new Array();  
	for (i=0; i<paraString.length; i++){ 
		paraObj[paraString[i].substring(0,paraString[i].indexOf("=")).toLowerCase()] = paraString[i].substring(paraString[i].indexOf("=")+1,paraString[i].length);
	} 
	var returnValue = paraObj[paras.toLowerCase()];
	if(returnValue!=null && typeof(returnValue)=="undefined"){ 
		return ""; 
	}else{ 
		return returnValue; 
	} 
},
gotopage:function (target)   
{       
    this.cpage = target;        //把页面计数定位到第几页   
	this.getArticleInfo();
    //this.setpage();   
    //reloadpage(target);    //调用显示页面函数显示第几页,这个功能是用在页面内容用ajax载入的情况   
}, 
setpage:function ()   
{   
    if(this.totalpage<=this.page){        //总页数小于十页   
        for (this.count=1;this.count<=this.totalpage;this.count++)   
        {    if(this.count!=this.cpage)   
            {   
                this.outstr = this.outstr + "<a href='javascript:void(0)' onclick='ggfwptView.gotopage("+this.count+")' class='page'>"+this.count+"</a>";   
            }else{   
                this.outstr = this.outstr + "<span class='current' >"+this.count+"</span>";   
            }   
        }   
    }   
    if(this.totalpage>this.page){        //总页数大于十页   
        if(parseInt((this.cpage-1)/this.page) == 0)   
        {               
            for (this.count=1;this.count<=this.page;this.count++)   
            {    if(this.count!=this.cpage)   
                {   
                    this.outstr = this.outstr + "<a href='javascript:void(0)' onclick='ggfwptView.gotopage("+this.count+")' class='page'>"+this.count+"</a>";   
                }else{   
                    this.outstr = this.outstr + "<span class='current'>"+this.count+"</span>";   
                }   
            }   
            this.outstr = this.outstr + "<a href='javascript:void(0)' onclick='ggfwptView.gotopage("+this.count+")' class='pagenext'>下"+this.page+"页</a>";   
        }   
        else if(parseInt((this.cpage-1)/this.page) == parseInt(this.totalpage/this.page))   
        {       
            this.outstr = this.outstr + "<a href='javascript:void(0)' onclick='ggfwptView.gotopage("+(parseInt((this.cpage-1)/this.page)*this.page)+")' class='pagepre'>上"+this.page+"页</a>";   
            for (this.count=parseInt(this.totalpage/this.page)*this.page+1;this.count<=this.totalpage;this.count++)   
            {    if(this.count!=this.cpage)   
                {   
                    this.outstr = this.outstr + "<a href='javascript:void(0)' onclick='ggfwptView.gotopage("+this.count+")' class='page'>"+this.count+"</a>";   
                }else{   
                    this.outstr = this.outstr + "<span class='current'>"+this.count+"</span>";   
                }   
            }   
        }   
        else  
        {       
            this.outstr = this.outstr + "<a href='javascript:void(0)' onclick='ggfwptView.gotopage("+(parseInt((this.cpage-1)/this.page)*this.page)+")' class='pagepre'>上"+this.page+"页</a>";   
            for (this.count=parseInt((this.cpage-1)/this.page)*this.page+1;this.count<=parseInt((this.cpage-1)/this.page)*this.page+this.page;this.count++)   
            {           
                if(this.count!=this.cpage)   
                {   
                    this.outstr = this.outstr + "<a href='javascript:void(0)' onclick='ggfwptView.gotopage("+this.count+")' class='page'>"+this.count+"</a>";   
                }else{   
                    this.outstr = this.outstr + "<span class='current'>"+this.count+"</span>";   
                }   
            }   
            this.outstr = this.outstr + "<a href='javascript:void(0)' onclick='ggfwptView.gotopage("+this.count+")' class='pagenext'>下"+this.page+"页 </a>";   
        }   
    } 
    document.getElementById("setpage").innerHTML = "<div id='setpage'><span id='info'>共"+this.totalpage+"页|第"+this.cpage+"页<\/span>&nbsp;&nbsp;" + this.outstr + "<\/div>";
    this.outstr = "";   
}
}