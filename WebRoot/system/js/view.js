/**
 * 
 * @type 
 */
var configFileView={
  		gridLoadJson:{},
  		grid:{},
  		primaryKey:"",
  		selectedRowData:"",
  		isNew:true,
  		oldKeyValue:"",
  		html:"",
  		actionName:"",
  		primaryKeyColumnId:1,
  		initView:function(actionName){//初始化 视图
  			configFileView.actionName = actionName;
		    var requestConfig = {
					url:appPath + "BaseAction.action" ,
					params:{type:"fileConfig",action:"getFileInfo",actionName:configFileView.actionName},			
					callback:function(options,success,response){
							if(success){
								var exjson = Ext.decode(response.responseText);	
								configFileView.initData(response.responseText);
								configFileView.loadView(exjson);
							}else{
								alert("数据加载失败");
							}
					}
				};
			Ext.Ajax.request(requestConfig);
		},
		initData:function(responseText){
			var exjson = Ext.decode(responseText);	
			configFileView.gridLoadJson =  exjson;
			configFileView.primaryKey =exjson.primaryKey;
			configFileView.html = exjson.html;
			configFileView.primaryKeyColumnId = exjson.primaryKeyColumnId;
		},
		refresh:function(){//刷新视图
			 var requestConfig = {
					url:appPath + "BaseAction.action" ,
					params:{type:"fileConfig",action:"getFileInfo",actionName:configFileView.actionName},	
					callback:function(options,success,response){
						if(success){
							var exjson = Ext.decode(response.responseText);	
							configFileView.initData(response.responseText);
							configFileView.searchQuery();
						}else{
							alert("数据加载失败");
						}
					}
			};
			Ext.Ajax.request(requestConfig);
		},
		loadView:function(json){//初始化
			configFileView.loadGrid(json);
			configFileView.loadSearch(json.columns);
	    },
	    loadSearch:function(columns){//初始化搜索
	    	if(columns){
	    		for(var i=0;i<columns.length;i++){
	    			var objSelect = Ext.getDom("queryKey");
	    			var varItem = new Option(columns[i].header,columns[i].dataIndex);
			        objSelect.options[objSelect.options.length] = varItem;
	    		}
	    	}
	    },
	    checkedKeys:function(newKey,oldKey){
	    	if(oldKey ){
	    		if(newKey==oldKey)
	    			return true;
	    	}
	    	var datas = configFileView.gridLoadJson.datas;
	    	var row ;
	    	for(var i = 0 ; i < datas.length ; i++ ){
	    		row = datas[i];
	    		if(newKey ==row[configFileView.primaryKey]){
	    			return false;
	    		}
	    	}
	    	return true;
	    },
	    getSelectionRowKeys:function(){//获取选中的主键值
	    	var i = configFileView.primaryKeyColumnId ;
	    	var result="";
			var keyIndex = configFileView.grid.getColumnModel().getDataIndex(i);
			var selectedRow =configFileView.grid.getSelectionModel().getSelections();
			if(selectedRow.length>0){			
				for(var i=0;i<selectedRow.length;i++){
					var row =selectedRow[i];
					result = result + row.data[keyIndex]
					if((i+1)<selectedRow.length){
						result = result + "," ;
					}
				}
			}
			
			return result ;
	    },
		searchQuery:function(){//查询
	    	var keyValue = Ext.getDom("queryKey").value;
	    	var value    = Ext.getDom("queryValue").value;
	    	var newLoadJson=configFileView.gridLoadJson;
	    	if(value!=""){
	    		if(keyValue==0){
	    			alert("请选择查询范围");
	    			return;
	    		}else{
	    			newLoadJson={};
	    			newLoadJson.columns = configFileView.gridLoadJson.columns;
	    			newLoadJson.primaryKey =configFileView.gridLoadJson.primaryKey;
	    			newLoadJson.displayColumns =configFileView.gridLoadJson.displayColumns;
	    			newLoadJson.datas = [];　
	    			var keyFlag = false;
	    			var keyFlagValue ;
	    			var newId=0;
	    			for(var i=0;i<configFileView.gridLoadJson.datas.length;i++){
	    				if(!keyFlag){
						    for(var key in configFileView.gridLoadJson.datas[i]){
						        if(key == keyValue && configFileView.gridLoadJson.datas[i][key].indexOf(value)>-1){
						        	keyFlag = true;
						        	keyFlagValue =key;
						        	newLoadJson.datas[newId] = configFileView.gridLoadJson.datas[i];
						        	newId++;
						        	break;
						        }
						    }
						}else{
							if(configFileView.gridLoadJson.datas[i][keyFlagValue].indexOf(value)>-1){
								newLoadJson.datas[newId] = configFileView.gridLoadJson.datas[i];
								newId++;
							}
						}
	    			}    			
	    		}
	    	}
	    	configFileView.loadGrid(newLoadJson);
	    	configFileView.loadSearch(newLoadJson.columns);
		},
		newDocument:function(){
			Ext.getCmp("ucap_system_doc").show() ;
			//Ext.getCmp("ucap_system_doc").expand() ;
			Ext.getCmp("ucapSystemCenterPanel").syncSize();
			configFileView.oldKeyValue ="";
			configFileView.isNew = true;
			configFileView.selectedRowData= null;
			var doc = Ext.get("ucap_system_document");
			var docUpdater = doc.getUpdater();
			var sUrl = appPath + configFileView.html;
			docUpdater.update({
		        url: sUrl,
		        scripts:true
			});
			Ext.getCmp("saveButton").setHandler(configFileView.saveForm);
		},
		openDocument:function(){
			Ext.getCmp("ucap_system_doc").show() ;
			Ext.getCmp("ucapSystemCenterPanel").syncSize();
			configFileView.oldKeyValue =configFileView.selectedRowData[configFileView.primaryKey];
			configFileView.isNew = false;
	    	var doc = Ext.get("ucap_system_document");
			var docUpdater = doc.getUpdater();
			var sUrl = appPath + configFileView.html;
			docUpdater.update({
		        url: sUrl,
		        scripts:true,
		        callback:configFileView.renderedDocValue
			});
			Ext.getCmp("saveButton").setHandler(configFileView.saveForm);
		},
		renderedDocValue:function(el,success,response){
			var obj ;
			for(var key in configFileView.selectedRowData){
				obj = Ext.getDom(key);
				if(null!=obj){
					docForm.bindValidateEvent(obj,key);//绑定验证
					if(obj.tagName.toLowerCase() =="input"){
						if(obj.getAttribute("type").toLowerCase() == "text"){
							obj.value = configFileView.selectedRowData[key];
						}else if(obj.getAttribute("type").toLowerCase() == "checkbox"){
							
							var temValue = configFileView.selectedRowData[key];
							if(temValue!=""){
								var allobj = Ext.query('[name=' + key+ '],[id=' + key + ']');
								for(var i=0;i<allobj.length;i++){
									if(temValue.indexOf(allobj[i].value)>-1){
										allobj[i].checked = true;
									}
								}
							}
							//if(configFileView.selectedRowData[key] == true){
							//	obj.checked = true;
							//}else{
							//	obj.checked = false;
							//}
						}else if(obj.getAttribute("type").toLowerCase() == "radio"){
							
							var allobj = Ext.query('[name=' + key+ '],[id=' + key + ']');
							if(allobj!=null){
								for(var i=0;i<allobj.length;i++){
									//alert(String(configFileView.selectedRowData[key]));
									if(allobj[i].value == String(configFileView.selectedRowData[key])){
										allobj[i].checked = true;
									}else{
										allobj[i].checked = false;
									}
								}
							}
							
							//if(configFileView.selectedRowData[key] == true){
							//	obj.selected = true;
							//}else{
							//	obj.selected = false;
							//}
						}
					}else if(obj.tagName.toLowerCase() =="select"){
						for (var i = 0; i < obj.options.length; i++) {        
					        if (obj.options[i].value == configFileView.selectedRowData[key]) {        
					            obj.options[i].selected = true; 
					            break;        
					        }        
					    }       
					}
				}
			}
		},
		saveForm:function(){
			var flag =configFileView.checkedKeys(Ext.getDom(configFileView.primaryKey).value,configFileView.oldKeyValue);
			if(!flag){
				alert("关键值不能重复");
				return ;
			}
			var json =configFileView.getKeyValue();	
			var Vjson ={items:json};
			flag = docForm.commonValidate(Vjson);
			if(!flag){
				alert("数据校验有错！");
				return;
			}
			var sendJson= {isNew:configFileView.isNew,oldKeyValue:configFileView.oldKeyValue,items:json};
			var params={type:"fileConfig",action:"saveForm",actionName:configFileView.actionName};
			
			var requestConfig = {
					url:appPath + "BaseAction.action" ,
					params:params,
					jsonData:sendJson,
					callback:function(options,success,response){
						if(success){
							if(configFileView.isNew){
								alert("文档保存成功！");
							}else{
								alert("文档修改成功！");
							}
							configFileView.refresh();
						}else{
							alert("数据加载失败");
						}
					}
			};
			Ext.Ajax.request(requestConfig);
			
			
		},
		getKeyValue:function(){
			var displayColumns = configFileView.gridLoadJson.displayColumns;
			var displayCol;
			var key;
			var obj;
			var json ="[";
			for(var i=0;i<displayColumns.length;i++){
				displayCol = displayColumns[i];
				key =displayCol.name;
				obj = Ext.getDom(key);
				
				if(null!=obj){
					if(obj.tagName.toLowerCase() =="input"){
						if(obj.getAttribute("type").toLowerCase() == "text" ){
							json  =json + "{\"" +  key +"\":\"" +  obj.value +"\"}";
						}else if(obj.getAttribute("type").toLowerCase() == "checkbox"){
							var allobj = Ext.query('[name=' + key+ '],[id=' + key + ']');
							var tem="";
							for(var j=0;j<allobj.length;j++){
								if(allobj[j].checked == true){
									tem = tem + allobj[j].value +",";
								}
							}
							if(tem != "")
								tem = tem.substring(0,tem.length -1);
							json  =json + "{\"" +  key +"\":\"" + tem + "\"}";
						}else if(obj.getAttribute("type").toLowerCase() == "radio"){
							var allobj = Ext.query('[name=' + key+ '],[id=' + key + ']');
							if(allobj!=null){
								var flag = false;
								for(var j=0;j<allobj.length;j++){
									if(allobj[j].checked == true){
										json  =json + "{\"" +  key +"\":\"" + allobj[j].value + "\"}";
										flag = true;
										break;
									}
								}
								if(!flag){
									json  =json + "{\"" +  key +"\":\"\"}";
								}
							}
						}
					}else if(obj.tagName.toLowerCase() =="select"){
						json  =json + "{\"" +  key +"\":\"" + obj.value +"\"}";
						
					}
				}else{
					json  =json + "{\"" +  key +"\":\"\"}";
				}
				if((1+i)<displayColumns.length){
					json = json +","
				}
			}
			json = json +"]";
			var exjson = Ext.decode(json);	
			return exjson;
		},
		deleteForm:function(){//删除记录
			var selectKeys =configFileView.getSelectionRowKeys();
			if(selectKeys==""){
				alert("请选择需要删除的记录");
			}else{
			Ext.MessageBox.confirm("确认","是否确认要删除选中的文档！",function(btn){
				if(btn=="yes"){
					 var requestConfig = {
						url:appPath + "BaseAction.action" ,
						params:{type:"fileConfig",action:"delete",actionName:configFileView.actionName,keys:selectKeys},		
						callback:function(options,success,response){
							if(success){
								if(response.responseText=="true"){
									alert("删除成功！");
									configFileView.refresh();
								}else{
									alert("删除记录失败！");
								}
							}else{
								alert("删除记录失败！");
							}
						}
					};
					Ext.Ajax.request(requestConfig);
				}
			});
			}
		},
		loadGrid :function(exjson){//初始化Grid
			var ucap_system_grid =Ext.getDom("ucap_system_grid");
	    	var viewDiv = Ext.getDom("viewDiv") ;
	    	if(viewDiv){
	    		ucap_system_grid.removeChild(viewDiv);
	    	}
	    	viewDiv = document.createElement("div");
	    	viewDiv.id="viewDiv";
	    	viewDiv.innerHTML="<div id=\"grid\"></div>";
	    	ucap_system_grid.appendChild(viewDiv); 
			var sm = new Ext.grid.CheckboxSelectionModel();	
			var columnsHasSm =[];
			columnsHasSm[0] =sm;
			for(var i=0;i<exjson.columns.length;i++){
				columnsHasSm[columnsHasSm.length] =exjson.columns[i];
			}
			var cm = new Ext.grid.ColumnModel(columnsHasSm);	
			//ds使用的MemoryProxy对象和JsonReader对象
			var ds = new Ext.data.Store({
			        proxy: new Ext.data.PagingMemoryProxy(exjson),
			        reader: new Ext.data.JsonReader({root: 'datas'},exjson.displayColumns)
			   });
			var height = Ext.get("ucap_system_panel").getHeight();
			var autoHeight = false;
			if(!height){
				autoHeight = true;
			}
			configFileView.grid = new Ext.grid.GridPanel({
			    el: 'grid',
			    ds: ds,
			    cm: cm,
			    sm: sm,
			    height:height,
			    autoScroll : true,
			    loadMask:true,  //
			    autoHeight:autoHeight,// 自动设置高度，这个配置很重要
        		
			    bbar: new Ext.PagingToolbar({		    	
					pageSize : 20,
					store : ds,
					
					displayInfo : true,//为false，不显示视图的记录信息，单显示分页
					displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
					emptyMsg : "没有记录"
				}),
			    tbar: [ 
					{                       
	  					text: '添加',   
	  					handler: function(btn, pressed){ 
	  						configFileView.newDocument();
	            		}   
					}, 
					'-',                  
					{                       
	   					text: '编辑',   
	   					handler: function(btn, pressed){  
	   						var selectedRow =configFileView.grid.getSelectionModel().getSelections();
	   						if(selectedRow.length==0){
	   							alert("请选择编辑记录");
	   						}else{
	   							configFileView.selectedRowData =selectedRow[0].data;
	   							configFileView.openDocument();
	   						}
	          			}   
					}, 
					'-',                  
					{                       
	   					text: '删除',   
	   					handler: function(btn, pressed){ 
	   						configFileView.deleteForm();
	                    }    
				  	},
				  	'-',
				  	{                       
	    	 			text: '刷新',   
	     				handler: function(btn, pressed){
	       					configFileView.refresh();
	  					}   
					},    
	         		'-',
	         		new Ext.Panel({
	         			html:'<div id="reseach" width="100%" style="background:d9e5f3;"> 请输入查询内容：<input type="text" id="queryValue"/>\
			        				<select id="queryKey" ><option id="0">请选择..</option>\
			        				</select><input type="button" onclick="configFileView.searchQuery();" value="搜索"/></div>'
			        				})
	         		]	    
			});
			configFileView.grid.render();
			ds.load({params : {
					start : 0,
					limit : 20
				}});
			configFileView.grid.on("rowdblclick",function(gridPanel,rowIndex,e){ 
				configFileView.rowdbClick(gridPanel,rowIndex,e);
			});
			configFileView.grid.on("bodyresize",function(){alert();});
	    },
	    rowdbClick:function(gridPanel,rowIndex,e){
			configFileView.selectedRowData = gridPanel.getStore().getAt(rowIndex).data; 
	    	configFileView.openDocument();
	    }
  	};