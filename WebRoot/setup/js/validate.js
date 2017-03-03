/**
 * 验证ip 和 port端口 可以只验证单独ip 和ip+port
 * 
 * @param {}
 *            ipAndPort
 * @param {}
 *            split
 * @param {}
 *            hasPort
 * @return {Boolean}
 */
function ValidateIp(ipAndPort, split, hasPort) {
	if ("" == ipAndPort) {
		return false;
	}
	if (hasPort) {
		var ip = ipAndPort;
		//IP端口正则表达式
		var patrn = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]):[1-9][0-9]*$/;
		var ipArray = ip.split(split);
		for (var i = 0; i < ipArray.length; i++) {
			var anIp = ipArray[i];
			if (!patrn.exec(anIp)) {
				return false;
			}
			//验证端口
			var ipPort = anIp.split(":");
			if (!ipPort[1] || ipPort[1] > 65535) {
				return false;
			}

		}
		return true;
	} else {
		var ip = ipAndPort;
		//IP正则表达式
		var patrn = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
		var ipArray = ip.split(split);
		for (var i = 0; i < ipArray.length; i++) {
			var anIp = ipArray[i];
			if (!patrn.exec(anIp)) {
				return false;
			}
		}
		return true;
	}
}

/**
 * 日志配置表单验证
 * 
 * @return {Boolean}
 */
function logSaveAddressChecked() {
	if ("" == $("#logSaveAddress").val()) {
		alert("请填写log4j保存路径！");
		return false;
	}
	return true;
}

/**
 * 流程保存地址验证
 * 
 * @return {Boolean}
 */
function flowFileSaveAddressChecked() {
	if ("" == $("#flowFileSaveAddress").val()) {
		alert("请填写流程文件保存地址！");
		return false;
	}
	return true;
}

/**
 * 验证整数
 * 
 * @param {}
 *            value
 * @return {}
 */
function isNum(value) {
	var patrn = /^\+?[1-9][0-9]*$/;
	return patrn.exec(value);
}

/**
 * 缓存数据验证
 * 
 * @return {Boolean}
 */
function checkedCacheValue() {
	var cacheType = $("#cacheType").val();
	if ("0" == cacheType) {
		alert("请选择缓存类型！");
		return false;
	} else if ("OSCache" == cacheType) {
		if ("" == $("#OSCachesaveDiskAddr").val()) {
			alert("请填写硬盘保存位置！");
			return false;
		}
		if (!checkDirPath($("#OSCachesaveDiskAddr").val())) {
			alert("硬盘保存路径，有错！");
			return false;
		}

	} else if ("MemCached" == cacheType) {
		var MemcachedIPAndPort = $("#MemcachedIPAndPort").val();
		if ("" == MemcachedIPAndPort) {
			alert("请填写ip地址和端口！");
			return false;
		} else {
			if (!ValidateIp(MemcachedIPAndPort, ";", true)) {
				alert("ip地址和端口填写有误，请重新填写！");
				return false;
			}
		}
		var patrn = /^\+?[1-9][0-9]*$/;
		if ("" == $("#MemcachedWeight").val()) {
			alert("请填写各个服务器的权重,必须为整数，用逗号隔开！");
			return false;
		}
		if ("" == $("#MemcachedConnCount").val()) {
			alert("请填写初始化的连接数,必须为整数！");
			return false;
		} else if (!patrn.exec($("#MemcachedConnCount").val())) {
			alert("初始化的连接数必须为整数！");
			return false;
		}
		if ("" == $("#MemcachedConnMinCount").val()) {
			alert("请填写最小连接数,必须为整数！");
			return false;
		} else if (!patrn.exec($("#MemcachedConnMinCount").val())) {
			alert("最小连接数必须为整数！");
			return false;
		}
		if ("" == $("#MemcachedConnMaxCount").val()) {
			alert("请填写最大连接数,必须为整数！");
			return false;
		} else if (!patrn.exec($("#MemcachedConnMaxCount").val())) {
			alert("必须为整数！");
			return false;
		}
		if ("" == $("#MemcachedMaxExcTime").val()) {
			alert("请填写最大处理时间,必须为整数！");
			return false;
		} else if (!patrn.exec($("#MemcachedMaxExcTime").val())) {
			alert("最大处理时间必须为整数！");
			return false;
		}
		if ("" == $("#MemcachedSleepTime").val()) {
			alert("请填写睡眠时间,必须为整数！");
			return false;
		} else if (!patrn.exec($("#MemcachedSleepTime").val())) {
			alert("睡眠时间必须为整数！");
			return false;
		}
		if ("" == $("#MemcachedOverTime").val()) {
			alert("请填写超时时间,必须为整数！");
			return false;
		} else if (!patrn.exec($("#MemcachedOverTime").val())) {
			alert("超时时间必须为整数！");
			return false;
		}
	}
	return true;
}

/**
 * 数据库连接数据校验
 * 
 * @return {Boolean}
 */
function checkDBconnData() {
	if ("" == $("#dbConnName").val()) {
		alert("请输入数据库连接名称");
		return false;
	}
	if ("0" == $("#dbType").val()) {
		alert("请选择数据库类型");
		return false;
	}
	if ("" == $("#userName").val()) {
		alert("请输入数据库用户名");
		return false;
	}
	if ("" == $("#dbName").val()) {
		alert("请输入数据库名称");
		return false;
	}
	var patrn = /^\+?[1-9][0-9]*$/;
	if ("" == $("#port").val() || !patrn.exec($("#port").val())) {
		alert("请输入正确端口号(必须为整数)");
		return false;
	}
	if ("" == $("#ipAddr").val()) {
		alert("请输入数据库IP地址");
		return false;
	}
	if (!ValidateIp($("#ipAddr").val(), ";", false)) {
		alert("输入数据库IP地址有错");
		return false;
	}
	return true;
}

/**
 * 连接数据库json
 * 
 * @return {}
 */
function getConnCheckJson() {
	var json = {
		"action" : "checkDBConn",
		"alias" : $("#dbConnName").val(),
		"type" : $("#dbType").val(),
		"dbName" : $("#dbName").val(),
		"port" : $("#port").val(),
		"netName" : $("#netName").val(),
		"ipAddr" : $("#ipAddr").val(),
		"userName" : $("#userName").val(),
		"pwd" : $("#pwd").val()
	};
	return json;
}

/**
 * 验证数据库连接
 */
function checkDBConn() {
	var flag = checkDBconnData();
	if (!flag)
		return;
	var json = getConnCheckJson();
	// 获取提交到action.asp之后返回的所有数据
	$.post(appPath+"setup", json, function(data) {
		var flag = data;
		if (flag == 1) {
			alert("连接数据库成功。");
			$("#next").attr("disabled", false);
		} else {
			alert(flag);
			$("#next").attr("disabled", true);
		}
	});
}

/**
 * 验证路径是否存在问题
 * 
 * @param {}
 *            dirPathValue
 * @return {Boolean}
 */
function checkDirPath(dirPathValue) {
	if ("" == dirPathValue) {
		return false;
	}
	var isFlag = false;
	var json = {
		dirPath : dirPathValue,
		action : "checkDirPath"
	};
	// 获取提交到action.asp之后返回的所有数据
	$.ajax({
		url : appPath+"setup",
		data : json,
		async : false,
		success : function(result) {
			var flag = result;
			if (flag == 1) {
				isFlag = true;
			} else {
				isFlag = false;
			}
		}
	});
	return isFlag;
}

/**
 * 
 * @return {Boolean}
 */
function checkedUserPwd() {
	if ("" == $("#sysadmin").val()) {
		alert("登录账号不能为空");
		return false;
	}
	if ("" == $("#syspwd").val() || "" == $("#sysNewpwd").val()) {
		alert("登录密码不能为空！");
		return false;
	}
	if ($("#syspwd").val() != $("#sysNewpwd").val()) {
		alert("两次密码不一致！");
		return false;
	}
	return true;
}



