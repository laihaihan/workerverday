var docForm = {
	exjson:null,
	action:null,
	formUnid:null,
	docUnid:null,
	initForm:function(){
		 var requestConfig = {
			url:appPath + "BaseAction.action" ,
			params:{type:"fileConfig",action:docForm.action,formUnid:docForm.formUnid,docUnid:docForm.docUnid},	
			callback:function(options,success,response){
					if(success){
						var exjson = Ext.decode(response.responseText);	
						docForm.exjson =exjson;
						docForm.initSetFields(docForm.exjson.items);
					}else{
						alert("获取数据失败");
					}
			}
		};
		Ext.Ajax.request(requestConfig);
	},
	checkedDBConn:function(){
		var flag =docForm.commonValidate(docForm.exjson.items);
		if(!flag){
			alert("数据填写有错！");
			return;
		}
		var params={type:"fileConfig",action:"checkedProxool"};
		
		docForm.exjson.items = docForm.getFields(docForm.exjson.items);
		var requestConfig = {
			url:appPath + "BaseAction.action" ,
			params:params,	
			jsonData:docForm.exjson,
			callback:function(options,success,response){
				if(success){
					if(response.responseText =="true"){
						 
      					Ext.getDom("_saveButton").disabled=false;
    
						alert("测试连接成功！");
					}else{
						alert("连接数据库失败");
					}
				}else{
					alert("连接数据库失败");
				}
			}
		};
		Ext.Ajax.request(requestConfig);
	},
	saveForm:function(){
		var flag =docForm.commonValidate(docForm.exjson.items);
		if(!flag){
			alert("数据填写有错！");
			return;
		}
		var params={type:"fileConfig",action:docForm.exjson.action};
		docForm.exjson.items = docForm.getFields(docForm.exjson.items);
		var requestConfig = {
			url:appPath + "BaseAction.action" ,
			params:params,	
			jsonData:docForm.exjson,
			callback:function(options,success,response){
				if(success){
					if(response.responseText =="true"){
						alert("保存成功");
					}else{
						alert("保存失败");
					}
				}else{
					alert("保存失败");
				}
			}
		};
		Ext.Ajax.request(requestConfig);
	},
	
	getFields:function(items){
		if(items==null){
			return null;
		}
		for(var key in items){
			if (Ext.type(items[key]) == "array") {
				for(var n=0;n<items[key].length;n++){
					items[key][n] = docForm.getFields(items[key][n]);
				}
			}else{
				obj = Ext.getDom(key);
				if(null!=obj){
					if(obj.tagName.toLowerCase() =="input"){
						if(obj.getAttribute("type").toLowerCase() == "text" || obj.getAttribute("type").toLowerCase() == "password" ){
							items[key] = obj.value;
						}else if(obj.getAttribute("type").toLowerCase() == "checkbox"){
							var allobj = Ext.query('[name=' + key+ '],[id=' + key + ']');
							var tem="";
							for(var i=0;i<allobj.length;i++){
								if(allobj[i].checked == true){
									tem = tem + allobj[i].value +",";
								}
							}
							tem = tem.substring(0,tem.length -1);
							items[key]= tem;
						}else if(obj.getAttribute("type").toLowerCase() == "radio"){
							var allobj = Ext.query('[name=' + key+ '],[id=' + key + ']');
							if(allobj!=null){
								var flag = false;
								for(var i=0;i<allobj.length;i++){
									if(allobj[i].checked == true){
										items[key] =allobj[i].value ;
										flag = true;
										break;
									}
								}
								if(!flag){
									items[key] ="";
								}
							}
						}
					}else if(obj.tagName.toLowerCase() =="select"){
						items[key] = obj.value;
					}
					
				}
			}
		}
		return items;
	},
	
	/**
	 * ͨ�ø�ֵ
	 * @param {} items
	 */
	initSetFields:function(items){
		for(var key in items){
			if (Ext.type(items[key]) == "array") {
				for(var n=0;n<items[key].length;n++){
					docForm.initSetFields(items[key][n]);
				}
			}else{
				obj = Ext.getDom(key);
				if(null!=obj){
					if(obj.tagName.toLowerCase() =="input"){
						docForm.bindValidateEvent(obj,key);
						if(obj.getAttribute("type").toLowerCase() == "text" || obj.getAttribute("type").toLowerCase() == "password" ){
							obj.value = items[key];
						}else if(obj.getAttribute("type").toLowerCase() == "checkbox"){
							var temValue =items[key];
							if(temValue!=""){
								var allobj = Ext.query('[name=' + key+ '],[id=' + key + ']');
								for(var i=0;i<allobj.length;i++){
									if(temValue.indexOf(allobj[i].value)>-1){
										allobj[i].checked = true;
									}
								}
							}
						}else if(obj.getAttribute("type").toLowerCase() == "radio"){
							var allobj = Ext.query('[name=' + key+ '],[id=' + key + ']');
							if(allobj!=null){
								for(var i=0;i<allobj.length;i++){
									if(allobj[i].value == items[key]){
										allobj[i].checked = true;
									}else{
										allobj[i].checked = false;
									}
								}
							}
						}
					}else if(obj.tagName.toLowerCase() =="select"){
						for (var i = 0; i < obj.options.length; i++) {        
					        if (obj.options[i].value == items[key]) {        
					            obj.options[i].selected = true; 
					            break;        
					        }        
					    }
					    //特殊处理，cache.HTML的文件中调用change()；方法。cjy
					    if("cacheType" == key)
							change();
					}
				}
			}
		}
	},
	
	/**
	 * 绑定校验事件
	 * 
	 * @param {}
	 *            selector 默认值为input
	 */
	bindValidateEvent : function(obj,key) {
		if(obj!=null){
			var message = obj.getAttribute("message");
			var checkType =obj.getAttribute("checkType");
			if(obj.tagName.toLowerCase() =="input" && message != null){
				obj.attachEvent("onblur",function(){
					
					// 校验错误
					var cancelSrc = "./images/cancel.png";
					
					// 校验正确
					var acceptSrc = "./images/accept.png";
					var imgObj =key +"_Img";
					imgObj = Ext.getDom(imgObj);
					
					// 移除校验结果图片
					
					if(imgObj){
						imgObj.parentNode.removeChild(imgObj);
					}	
					var flag = false;
					if(obj.value == ""){
						flag = false;
					}else{
						if(checkType!=null){
							// 根据校验类型进行校验
							if (checkType == "1" || checkType == "2") {
								// IP地址校验
								if (checkType == "1") {
									flag = ValidateIp(obj.value, ";", true);
								} else {
									flag = ValidateIp(obj.value, ";", false);
								}
							} else if (checkType == "3") {
								// 数字校验
								flag = isNum(obj.value);
							} else if (checkType == "4") {
								// 逗号分隔的数字校验
								var tem = obj.value;
								var array = tem.split(",");
								for (var i=0;i< array.length;i++) {
									flag = isNum(array[i]);
									alert(flag);
									if (!flag) {
										break;
									}
								}
							}
						}else{
							flag = true;
						}
					}
					if(!flag){
					// 动态加入校验结果图片
						Ext.get(key).insertHtml("afterEnd","<img id='"+key+"_Img' src='"+cancelSrc+"' alt='"+message+"'/>");
					}else{
						Ext.get(key).insertHtml("afterEnd","<img id='"+key+"_Img' src='"+acceptSrc+"' alt='"+""+"'/>");
					}
				});
			}
		}
	},
	/**
	 * 保存时，调用此方法
	 * @param {} obj
	 * @param {} key
	 */
	commonValidate : function(items){
		var flag = true;
		for(var key in items){
			if (Ext.type(items[key]) == "array") {
				for(var n=0;n<items[key].length;n++){
					flag = docForm.commonValidate(items[key][n]);
					if(!flag){
						return flag;
					}
				}
			}else{
				obj = Ext.getDom(key);
				if(obj!=null){
					flag = docForm.validate(obj,key);
					
					if(!flag){
						return flag;
					}
				}
				
			}
		}
		return flag;
	},
	validate : function(obj,key){
		if(obj!=null){
			var message = obj.getAttribute("message");
			var checkType =obj.getAttribute("checkType");
			if(obj.tagName.toLowerCase() =="input" && message != null){
				// 校验错误
				var cancelSrc = "./images/cancel.png";
				// 校验正确
				var acceptSrc = "./images/accept.png";
				var imgObj =key +"_Img";
				imgObj = Ext.getDom(imgObj);
				// 移除校验结果图片
				if(imgObj){
					imgObj.parentNode.removeChild(imgObj);
				}	
				var flag = false;
				if(obj.value == ""){
					flag = false;
				}else{
					if(checkType!=null){
						// 根据校验类型进行校验
						if (checkType == "1" || checkType == "2") {
							// IP地址校验
							if (checkType == "1") {
								flag = ValidateIp(obj.value, ",", true);
							} else {
								flag = ValidateIp(obj.value, ",", false);
							}
						} else if (checkType == "3") {
							// 数字校验
							flag = isNum(obj.value);
						} else if (checkType == "4") {
							// 逗号分隔的数字校验
							var tem = obj.value;
							var array = tem.split(",");
							for (var i=0;i< array.length;i++) {
								flag = isNum(array[i]);
								if (!flag) {
									break;
								}
							}
						}
					}else{
						flag = true;
					}
				}
				if(!flag){
				// 动态加入校验结果图片
					Ext.get(key).insertHtml("afterEnd","<img id='"+key+"_Img' src='"+cancelSrc+"' alt='"+message+"'/>");
				}else{
					Ext.get(key).insertHtml("afterEnd","<img id='"+key+"_Img' src='"+acceptSrc+"' alt='"+""+"'/>");
				}
				return flag;
			}else{
				return true;
			}
		}
	}
	
}
