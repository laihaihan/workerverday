/**
 * 桌面小插件
*/
var portlet = {
	path:'',
	appendUrl:function(src){
		
	},
	getTemplate:function(result,content){
		var template = 	"<div class=\"portlet\" id='"+result.portlet_unid+"'>" +
						"<div id=\"FUNC00005\" class=\"DesktopBlock\">" + 
						"<input type='hidden' name='portlet' value='"+result.portlet_unid+"'>" + 
						"    <div id=\"Block\">" + 
						"      <div id=\"BlockHead\">" + 
						"        <table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">" + 
						"        <tbody>" + 
						"        <tr valign=\"center\">" + 
						"          <td width=\"25\"><img width=\"15\" height=\"15\" border=\"0\" src=\""+portlet.path+"/core/portlets/images/FUNC00005.gif\"></td>" + 
						"          <td>"+result.portlet_name+"</td>" + 
						"          <td width=\"40\"><a style=\"text-decoration:underline\" href=\"javascript:portlet.showMore('"+result.portlet_name+"','"+result.portlet_src+"')\">更多</a></td>" + 
						"          <td width=\"14\"><img width=\"11\" height=\"11\" border=\"0\" src=\""+portlet.path+"/core/portlets/images/refresh.gif\" alt=\"刷新\" onClick=\"\"></td>" + 
						"          <td width=\"14\"><img width=\"11\" height=\"11\" border=\"0\" src=\""+portlet.path+"/core/portlets/images/close.gif\" alt=\"删除\" onClick=\"delPortalet('"+result.portlet_unid+"')\"></td>" + 
						"          <td width=\"5\"></td>" + 
						"        </tr>" + 
						"        </tbody>" + 
						"        </table>" + 
						"      </div>" + 
						"      <div id=\"FUNC00005MAX\" class=\"BlockMemo\"  style=\"padding: 0pt;\">"
						+content+
						"        <div id=\"BlockFoot\">" + 
						"        </div>" + 
						"      </div>" + 
						"    </div>" + 
						"  </div>" + 
						"</div>";
		return template;
	},
	appendFlash:function(result){
		var content = "<div class=\"BlockDetail\">";
		content += "	<ul>";
		content += "		<object width=\"100%\" height=\"100%\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"><param value=\""+portlet.path+result.portletSrc+"\" name=\"movie\"><param value=\"high\" name=\"quality\"><param value=\"opaque\" name=\"wmode\"><embed width=\"100%\" height=\"100%\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\" quality=\"high\" src=\""+portlet.path+result.portletSrc+"\"></object>";
		content += "	</ul>";
		content += "</div>";
		
		portlet.addColumn(portlet.getTemplate(result,content));
	},
	appendView:function(result){
		var content = "<div id=\"p_"+result.portlet_unid+"\" class=\"BlockDetail\">";
			content += "	<ul>";
			content +=  "		<li class='DetailLine'></li>";
			content += "		<li class='DetailLine'></li>";
			content += "		<li class='DetailLine'></li>";
			content += "		<li class='DetailLine'></li>";
			content += "		<li class='DetailLine'></li>";
			content += "	</ul>";
			content += "</div>";
		
		portlet.addColumn(portlet.getTemplate(result,content));
		/*
		$.ajax({
			type:'post',
			cache:false,
			url:'view.action',
			dataType:'json',
			data:{
				fn:'grid_list',
				viewId:result.portletSrc,
				rows:5,
				page:1			
			},
			error:function(){
			
			},
			success:function(responseText){
				var rows = responseText.rows;
				var columns = $.parseJSON(result.portletViewColumn);
				
				if(rows.length>0){
					$('#p_'+result.portlet_unid+" ul").empty();
					li="<table width='100%'>";
					for(var i=0;i<rows.length;i++){
						 
						
						li+="<tr style='cursor:hand'>";
						
						for(var j=0;j<columns.length;j++){						
							if(columns[j]['columnCheckbox']=='1'){
								li+="<td class='DetailLine' style='display:none;'>";
								li+=rows[i][columns[j]['columnField']];
								li+="</td>";
							}else{
								li+="<td class='DetailLine'>";
								li+=rows[i][columns[j]['columnField']];
								li+="</td>";
							}							
						}
						
						li+="</tr>";
						
					}
					li+="</table>";
					$('#p_'+result.portlet_unid+" ul").append(li);
					if(rows.length<5){
						for(var i=0;i<(5-rows.length);i++){
							var li =  "<li class='DetailLine'><li>";
							$('#p_'+result.portlet_unid+" ul").append(li);
						}
					}
					
					var view = portlet.getView(result.portletSrc);
					$('#p_'+result.portlet_unid+" ul tr").bind('click',function(){
						var id = $(this).find('td:hidden').text();
						top.popup.showModalDialog(view.viewOpenContent+id,"选择视图",top.clientWidth-30,top.clientHeight-30);
					});					
				}				
			}		
		});
		*/
	},
	getView:function(id){
		var view ;
		$.ajax({
			url:'view.action',
			dataType:'json',
			cache:false,
			async:false,
			data:{
				fn:'getView',
				unid:id
			},
			error:function(){
				top.popup.errorService();
			},
			success:function(result){
				view = result;
			}
		});
		return view;		
	},
	addPortlet:function(id){
		$.ajax({
			url:'portlet.action',
			dataType:'json',
			cache:false,
			async:false,
			data:{
				fn:'getPortlet',
				unid:id
			},
			error:function(){
				top.popup.errorService();
			},
			success:function(result){
				if(result.portlet_unid.length==32){				
					var content = "";
					if(result.portlet_type==2){
						content = portlet.appendFlash(result);
							
					}else if(result.portlet_type==0){
						/*
						content += "<div id=\"BlockDetail\">";
						content += "	<ul>";
						content +=  "		<li class='DetailLine'>1</li>";
						content += "		<li class='DetailLine'>2</li>";
						content += "		<li class='DetailLine'>3</li>";
						content += "		<li class='DetailLine'>4</li>";
						content += "		<li class='DetailLine'>5</li>";
						content += "	</ul>";
						content += "</div>";
						*/
						content = portlet.appendView(result);		
					}
					
				}
			}
		});
		
	},
	addColumn:function(template){
		$('.column').eq(0).append(template);
	},
	displayData:function(portletId){
		$.ajax({
			url:'portlet.action',
			dataType:'json',
			cache:false,
			async:false,
			data:{
				fn:'getPortlet',
				unid:portletId
			},
			error:function(){
				top.popup.errorService();
			},
			success:function(result){
				if(result.portlet_unid.length==32){
					if(result.portlet_type==2){
						content = portlet.appendFlash(result);
							
					}else if(result.portlet_type==0){
						$.ajax({
							type:'post',
							cache:false,
							url:'view.action',
							dataType:'json',
							data:{
								fn:'grid_list',
								viewId:result.portlet_src,
								rows:5,
								page:1			
							},
							error:function(){
							
							},
							success:function(responseText){
								var rows = responseText.rows;
								var columns = $.parseJSON(result.portlet_view_column);
								
								if(rows.length>0){
									$('#p_'+result.portlet_unid+" ul").empty();
									li="<table width='100%' style='table-layout:fixed' cellpadding='0' cellspacing='0'>";
									for(var i=0;i<rows.length;i++){
										 
										
										li+="<tr style='cursor:hand;height:21px;'>";
										
										for(var j=0;j<columns.length;j++){						
											if(columns[j]['checkbox']=='1'){
												li+="<td class='DetailLine' style='display:none;'>";
												li+=rows[i][columns[j]['field']];
												li+="</td>";
											}else{
												li+="<td class='DetailLine' nowrap='nowrap' style='overflow: hidden' title='"+rows[i][columns[j]['field']]+"'>&nbsp;";
												li+=rows[i][columns[j]['field']];
												li+="</td>";
											}							
										}
										
										li+="</tr>";
										
									}
									li+="</table>";
									$('#p_'+result.portlet_unid+" ul").append(li);
									/*
									if(rows.length<5){
										for(var i=0;i<(5-rows.length);i++){
											var li =  "<li class='DetailLine'><li>";
											$('#p_'+result.portlet_unid+" ul").append(li);
										}
									}
									*/
									
									var view = portlet.getView(result.portlet_src);
									var viewWidth = view.width;
									var viewHeigth = view.height;
									
									if(top.clientWidth<=viewWidth){
										viewWidth = top.clientWidth-30;
									}
									if(top.clientHeight<=viewHeigth){
										viewHeigth = top.clientHeight-30;							
									}
									
									$('#p_'+result.portlet_unid+" ul tr").bind('click',function(){
										var id = $(this).find('td:hidden').text();
										if(view.openContent.indexOf("vedio_play.jsp") > -1){//视频播放视图不能用popup方式打开，否则当窗口关闭时，视频仍然在播放
											var config = "dialogWidth="+viewWidth+"px;dialogHeight="+viewHeigth+"px;center=y;resizable=1;status=0;scroll=1;help=0;";
											window.showModalDialog(top.appPath+view.openContent+id, view.name, config);
										}else if(view.openContent.indexOf("file_download.jsp") > -1){//文件下载页面不需要打开窗口
											location.href = top.appPath+view.openContent+id;
										}else{
											top.popup.showModalDialog(view.openContent+id,view.name,viewWidth,viewHeigth);
										}
									});					
								}				
							}		
						});
					}					
				}
			}
		});
	},
	showMore:function(title,viewid){
		top.tabs.openTab(title,'','view.action?fn=grid&viewId='+viewid+'&_rand='+Math.random(),'');
	}
}