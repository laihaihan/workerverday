var _winCookie = {
	jsonName:"lw-win", 
	jsonNum:"num", 
	store:function (id, domId, address) {
		var num = _winCookie.getNum();
		var json = _winCookie.getJson();
		if (!json[id]) {
			json[id] = {};
			json[id].domId = domId;
			json[id].address = address;
			num++;
			$.JSONCookie(_winCookie.jsonName, json);
			$.cookie(_winCookie.jsonNum, num);
		}
	}, 
	remove:function (id) {
		var num = _winCookie.getNum();
		var json = _winCookie.getJson();
		if (json[id]) {
			delete json[id];
			num--;
			$.JSONCookie(_winCookie.jsonName, json);
			$.cookie(_winCookie.jsonNum, num);
		}
	}, 
	modify:function (id, key, value) {
		var json = _winCookie.getJson();
		if (json[id]) {
			json[id][key] = value;
			$.JSONCookie(_winCookie.jsonName, json);
		}
	}, 
	getJson:function () {
		var json = $.JSONCookie(_winCookie.jsonName);
		return (json == null) ? {} : json;
	}, 
	getNum:function () {
		var num = $.cookie(_winCookie.jsonNum);
		return (num == null) ? 0 : num;
	}
};