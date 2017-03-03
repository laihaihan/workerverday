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
