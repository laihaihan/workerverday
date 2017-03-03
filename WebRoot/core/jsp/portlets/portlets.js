//创建portlet
function makePortlet(obj,path){
	var type = '';
	if(!obj.title || obj.title==''){
		obj.title = '&nbsp;';
	}

	var link =obj.source;
	if(obj.source.indexOf("http://")<0 && obj.source.indexOf('www.')>-1){
		link = 'http://'+obj.source;
		type = 'url';
	}
	if(obj.source.indexOf(".jsp") >-1 || obj.source.indexOf('http://')>-1){
		type = 'url';
	}
	if(obj.source.indexOf(".action") >-1 ){
		link = path +"/"+obj.source;
	}
	var portlet = {
           attrs: {
               id: obj.unid 
           },
           title: obj.title,
           icon: 'ui-icon-signal-diag',
           beforeRefresh: function() {
               //alert("before refresh");
           },
           afterRefresh: function(data) {
               //alert("after refresh: " + data);
           },
           content: {
               //设置区域内容属性
               attrs: {
                   //'class': 'highlight-content'
               },
               style: {
                   height: obj.height
               },
               type: 'ajax',
               dataType: 'json',
               url: 'shouyepeizhi.action',
               formatter: function(o, pio, data) {
               	   if('url'==type){
	                   var iframeContent = "<iframe scrolling='no' frameborder='0'  src='"+link+"' style='width:100%;height:100%;' style='padding:1px' marginheight='0' marginwidth='0'></iframe>";
	                   return iframeContent;
               	   }else{
               	   		var content = '';
						content = '<ul style="padding: 0px;margin:0px;" class="content">' ;
               	   		$.ajax({
               	   			url:'shouyepeizhi.action',
							dataType:'json',
							cache:false,
							async:false,
               	   			data:{
								fn:'getViewData',
								unid: obj.unid,
								viewColumns: obj.view_column,
								viewId: obj.source.substring(obj.source.lastIndexOf("=")+1,obj.source.length),
								rows: !$.isNumeric(obj.recordnum) ? '10' : obj.recordnum //默认显示10行
							},
							success:function(data){
								if(data.columns){
									for(j=0;j<data.resultList.rows.length;j++){
										var temp ='',link = '';
										for(i=0;i<data.columns.length;i++){
				                 			temp += data.resultList.rows[j][data.columns[i].field];
				                 			temp += '&nbsp;&nbsp;&nbsp;';
				                 			link = '<a href="#" onclick="view(\''+obj.source.substring(obj.source.lastIndexOf("=")+1,obj.source.length)+'\',\''+data.resultList.rows[j].UNID+'\');">'+temp+'</a>';
										}
										content += '<li title='+temp+'>';
										content += '<img src="css/arrow_c.gif"/>';
										content += link;
										content += '</li>';
									}
								}else{
									//do something
								}
							}
               	   		});
               	   		content += '</ul>';
				        return content;
               	   }
               }
           }
    }
    return portlet;
}
//首页渲染创建
function create(winWidth,leftObj,centerObj,rightObj) {
		winWidth = winWidth*0.98;
		if(!leftObj){
			leftObj = new Array();
		}
		if(!centerObj){
			centerObj = new Array();
		}
		if(!rightObj){
			rightObj = new Array();
		}
		//centerObj = leftObj;
        $('#portlets').portlet({
            sortable: true,
            create: function() {
                //alert('created portlet.');
            },
            removeItem: function() {
                alert('after remove');
            },
            getSort: function(data){
            	//保存到数据库
            	$.ajax({
            		url: 'shouyepeizhi.action',
            		dataType: 'json',
            		cache: false,//禁用缓存
            		data: {
            			fn:'saveSort',
            			sort: data
            		},
           		    success: function(data, textStatus, jqXHR) {
           		    	//alert(data.result);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                    }
            	});
            },
            columns: [{
            	id:'left',
                width: '25%',
                portlets: leftObj
            }, {
            	id:'center',
                width: '50%',
                portlets: centerObj
            }, {
            	id:'right',
                width: '25%',
                portlets: rightObj
            }]
        });
}

//
function view(viewId,unid){
	$.ajax({
   		url: 'shouyepeizhi.action',
   		dataType: 'json',
   		cache: false,//禁用缓存
   		data: {
   			fn:'getView',
   			viewId: viewId
   		},
  		    success: function(data, textStatus, jqXHR) {
  		    	var height = screen.availHeight-200;
				var width = screen.availWidth-100;
  		    	top.lwin.open(data.view.openContent+unid,data.view.name,width,height);
           },
           error: function(jqXHR, textStatus, errorThrown) {
           }
   	});
}