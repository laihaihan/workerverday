var appPath = "/" + window.location.pathname.split("/")[(window.location.pathname.indexOf("/")>0?0:1)] + "/";
/**
 * 安装系统逻辑JS
 * 
 * @type
 */
var ucapSetup = {
	curNum : 1,
	/**
	 * 上一步、下一步事件
	 * @param {} num
	 */
	previousAndNext : function(num) {
		if (this.curNum == 2 && num == -1) {
			// 上一步为第一步时隐藏上一步按钮
			$("#previous").hide();
		} else if (this.curNum == 8 && num == 1) {
			// 下一步为最后一步时隐藏下一步按钮
			$("#next").hide();
		}
		if (num == 1) {
			// 下一步按钮逻辑
			
			switch(this.curNum){
				case 1:
					if ("UTF-8".toLowerCase() != ucapServerInfo.getEncoding()
							.toLowerCase()) {
						$("#next").attr("disabled", true);
					}
					break;
				case 2:
					$("#next").attr("disabled", true);
					break;
				case 3:
					$("#next").attr("disabled",true);
					break;
				case 5:
					var flag =checkedCacheValue();
					if(!flag){
						return;
					}
					break;
				case 6:
					var flag =logSaveAddressChecked();
					if(!flag){
						return;
					}
					break;
				case 7:
					var flag =flowFileSaveAddressChecked();
					if(!flag){
						return;
					}
					$("#next").attr("disabled",true);
					this.setupAll();
					break;	
				case 8:{
					$("#complete").show();
					$("#previous").hide();
				}
			}
			$("#setup_title_" + this.curNum).addClass("complete");
			$("#setup_title_" + this.curNum).toggleClass("current");
			$("#setup_content_" + this.curNum).hide();
			this.curNum++;
			$("#setup_title_" + this.curNum).addClass("current");
			$("#setup_content_" + this.curNum).show();
			if(this.curNum!=9 && this.curNum!=8){
				$("#previous").show();
			}
			$("#setup_content_title").text($("#setup_title_" + this.curNum).text());
		} else {
			
			// 上一步按钮逻辑
			$("#setup_content_" + this.curNum).hide();
			$("#setup_title_" + this.curNum).toggleClass("current");
			this.curNum--;
			$("#setup_content_" + this.curNum).show();
			$("#setup_title_" + this.curNum).toggleClass("complete");
			$("#setup_title_" + this.curNum).toggleClass("current");
			$("#next").show();
			$("#next").attr("disabled",false);
			$("#setup_content_title").text($("#setup_title_" + this.curNum).text());
		}
	},
	/**
	 * 连接数据库json
	 * 
	 * @return {}
	 */
	getUpdateUserPwdJson : function() {
		var json = {
			"action" : "updateUserPwd",
			"alias" : $("#dbConnName").val(),
			"type" : $("#dbType").val(),
			"dbName" : $("#dbName").val(),
			"port" : $("#port").val(),
			"netName" : $("#netName").val(),
			"ipAddr" : $("#ipAddr").val(),
			"userName" : $("#userName").val(),
			"pwd" : $("#pwd").val(),
			"newUserName" : $("#sysadmin").val(),
			"newPwd" : $("#syspwd").val()
		};
		return json;
	},
	/**
	 * 修改密码
	 */
	updateUserPwd : function() {
		var checkedFlag = checkedUserPwd();
		if (!checkedFlag) {
			return;
		}
		var json = this.getUpdateUserPwdJson();
		$.post(appPath + "setup", json, function(data) {
					var flag = data;
					if (flag == 1) {
						alert("修改密码成功！");
					} else {
						alert(flag);
					}
				});
	},
	/**
	 * 安装
	 */
	setup : function(action) {
		var json = this.getFormJson(action);
		// 获取提交到action.asp之后返回的所有数据
		 $.ajax({
			url :appPath + "setup", 
			data:json ,
			cache : false, 
            async : false,
            type : "POST",
 			success : function(data) {
				var flag = data;
				$("#setupMessage").append("<div>" + flag + "</div>");
			}
		 });
	},
	setupAll :function(){
		$("#setupMessage").empty();
		$("#setupMessage").append("<div>正在安装，请稍候...</div>");
		ucapSetup.setup("saveProxool");
		ucapSetup.setup("saveCacheConfig");
		ucapSetup.setup("saveLogConfig");
		ucapSetup.setup("saveFlowConfig");
			var impFlag = false;
		$("input[name='isDBImport']").each(function() {
			if ($(this).attr("checked")) {
				if ($(this).val() == "1")
					impFlag = true;
				else
					impFlag = false;
			}
		});
		if(impFlag)
			ucapSetup.setup("dbimp");
		ucapSetup.setup("saveSetup");
		//$("#previous").hide();
		$("#next").attr("disabled",false);
		
	},
	/**
	 * 发送服务端处理的json格式数据
	 * 
	 * @return {}
	 */
	getFormJson : function(action) {
		var nagleFlag = false;
		$("input[name='nagle']").each(function() {
					if ($(this).attr("checked")) {
						if ($(this).val() == "1")
							nagleFlag = true;
						else
							nagleFlag = false;
					}
				});

		var impFlag = false;
		$("input[name='isDBImport']").each(function() {
					if ($(this).attr("checked")) {
						if ($(this).val() == "1")
							impFlag = true;
						else
							impFlag = false;
					}
				});
		var json = {};
		json.action = action;
		json.alias = $("#dbConnName").val();
		json.type = $("#dbType").val();
		json.dbName = $("#dbName").val();
		json.ipAddr = $("#ipAddr").val();
		json.port = $("#port").val();
		json.userName = $("#userName").val();
		json.pwd = $("#pwd").val();

		json.netName = $("#netName").val();

		json.cacheType = $("#cacheType").val();
		json.cacheImpl = $("#cacheImpl").val();
		json.OSCacheIsSaveMemoryCache = $("#OSCacheCheckbox").attr("checked");
		json.OSCachesaveDiskAddr = $("#OSCachesaveDiskAddr").val();
		json.MemcachedIPAndPort = $("#MemcachedIPAndPort").val();
		json.MemcachedWeight = $("#MemcachedWeight").val();
		json.MemcachedConnCount = $("#MemcachedConnCount").val();
		json.MemcachedConnMinCount = $("#MemcachedConnMinCount").val();
		json.MemcachedConnMaxCount = $("#MemcachedConnMaxCount").val();
		json.MemcachedMaxExcTime = $("#MemcachedMaxExcTime").val();
		json.MemcachedSleepTime = $("#MemcachedSleepTime").val();
		json.MemcachedNagleFlag = nagleFlag;
		json.MemcachedOverTime = $("#MemcachedOverTime").val();
		json.logSaveAddress = $("#logSaveAddress").val();
		json.flowFileSaveType = $("#flowFileSaveType").val();
		json.flowFileSaveAddress = $("#flowFileSaveAddress").val();
		json.impDBFlag = impFlag;
		return json;
	},

	/**
	 * 绑定校验事件
	 * 
	 * @param {}
	 *            selector 默认值为input
	 */
	bindValidateEvent : function(selector) {
		selector = selector || "input";
		$(selector).each(function() {
			var message = $(this).attr("message");
			if (undefined != message) {
				// 绑定鼠标移开时校验事件
				$(this).blur(function(obj) {
					// 校验结果
					var flag;
					var checkType = $(this).attr("checkType");
					// 获取图片对象
					var imgId = $(this).attr("id") + "_Img";
					// 校验错误
					var cancelSrc = "./images/cancel.png";
					// 校验正确
					var acceptSrc = "./images/accept.png";

					if ($(this).val() != "") {
						if (undefined != checkType) {
							// 根据校验类型进行校验
							if (checkType == "1" || checkType == "2") {
								// IP地址校验
								if (checkType == "1") {
									flag = ValidateIp($(this).val(), ";", true);
								} else {
									flag = ValidateIp($(this).val(), ";", false);
								}
							} else if (checkType == "3") {
								// 数字校验
								flag = isNum($(this).val());
							} else if (checkType == "4") {
								// 逗号分隔的数字校验
								var tem = $(this).val();
								var array = tem.split(",");
								for (var index in array) {
									flag = isNum(array[index]);
									if (!flag) {
										break;
									}
								}
							}

						} else {
							// 无验证类型
							if ($(this).val() == "") {
								flag = false;
							} else {
								flag = true;
							}
						}

					} else {
						// 校验的值为空时
						flag = false;
					}
					// 移除校验结果图片
					$("#" + imgId).remove();
					// 动态加入校验结果图片
					$(this).after("<img id=\"" + imgId + "\" />");

					if (flag) {
						$("#" + imgId).attr("src", acceptSrc);
					} else {
						$("#" + imgId).attr("src", cancelSrc);
						$("#" + imgId).attr("alt", message);
					}
				});
			}
		});
	},

	/**
	 * 绑定下拉改变时事件
	 */
	bindChangeEvent : function(){
		
		//绑定数据库类型事件
		$("#dbType").change(function(){
			var $self = $(this);
			var hintText = "支持多种数据库类型";
			var tbNameText = "数据库名称：";		
			var $selfVal = $self.val();
			switch($selfVal){
				case "1":
					hintText = "支持Oracle 9i与Oracle 10g";	
					tbNameText = "SID："		
					$("#showPort").text("如：1521");	
					$("#port").val("1521");
					$("#trOracle").show();
					break;
				case "2":
					hintText = "支持SqlServer 2000以上的数据库";
					$("#showPort").text("如：1433");
					$("#port").val("1433");
					$("#trOracle").hide();
					break;
				case "3":
					hintText = "支持MySql 4.5以上的数据库";
					$("#showPort").text("如：3306");
					$("#port").val("3306");
					$("#trOracle").hide();
					break;
				case "4":
					hintText = "支持人大进仓的数据库";
					$("#showPort").text("如：54321");
					$("#port").val("54321");
					$("#trOracle").hide();
					break;
				case "5":
					hintText = "支持Sysbase 12.5以上的数据库";
					$("#showPort").text("如：5007");
					$("#port").val("5007");
					$("#trOracle").hide();
					break;
				default:
				  break;
			}		
			$self.parent().find(".hint").text(hintText);
			$("#tbNameText").text(tbNameText);
		});
	
		//绑定流程文件保存类型事件
		$("#flowFileSaveType").change(function(){
			var selVal =$(this).val();
			if("db" == selVal){
				$("#flowAddr").hide();
			}else{
				$("#flowAddr").show();
			}
		});
		
		//绑定缓存类型事件
		$("#cacheType").change(function(){
			var selVal = $(this).val();
			$(".ForOSCache").hide();
			$(".ForMemcached").hide();	
			$("#next").attr("disabled",true);	
			if("OSCache" == selVal)
			{
				$("#cacheImpl").val("com.linewell.ucap.util.cache.OscacheImpl");	
				$(".ForOSCache").show();	
				$("#next").attr("disabled",false);		
			}
			else if("MemCached" == selVal)
			{
				$("#cacheImpl").val("com.linewell.ucap.util.cache.MemcacheImpl");	
				$(".ForMemcached").show();
				$("#next").attr("disabled",false);		
			}
		});
		
	}
};
