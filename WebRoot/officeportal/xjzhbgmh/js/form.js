/**创建者：zhongmin 创建时间：2012-5-24 email:zhongmin@linewell.com**/

/**
 * 求长度方法
 */
String.prototype.len=function(){return this.replace(/[^\x00-\xff]/g,"**").length;}
/**
 * 判断内容是否为空
 * 若是则返回true;否则返回flase
 * @param {} str 属性对应值
 */
function isNull( str ){ 
	if ( str == "" ) return true; 
	var regu = "^[ ]+$"; 
	var re = new RegExp(regu); 
	return re.test(str); 
}
/**
 * 判断内容是否为空且长度在某范围内
 * @param str    预判断字符串
 * @param minLen 最小长度，若为-1，则代表不判断
 * @param maxLen 最大长度
 * @return
 */
function isNullAndLen(str,minLen,maxLen){
	if(isNull(str)) return true;
	var mlen = str.len();
	if(mlen<minLen){
		return true;
	}
	if(mlen>maxLen){
		return true;
	}
	return false;
}
/**
 * 双精度类型验证
 * @param name ID值
 * @param mdefault 原值
 * @return
 */
function DoubleChange(name,mdefault){
	var score = $("#"+name);
	if(isNull(score.val())){score.val(mdefault);}
	else if(isNaN(score.val())){alert("请输入合法数值!"); score.focus();score.val(mdefault);}
}
/**
 * 整数验证
 * @param name ID值
 * @param mdefault 原值
 * @return
 */
function NumChange(name,mdefault){
	var score = $("#"+name);
	var strP=/^(-?[1-9][0-9]*|0)$/;
	if(isNull(score.val())){score.val(mdefault);}
	else if(!strP.test(score.val())){alert("请输入合法数字!");score.focus();score.val(mdefault);}
}

/**
 * 引用login.js
 * 判断字符串中是否包含非法字符
 * @param {} v
 */
function isValidUserName(v){
	var result=true;
	//非法字符数组，以竖线分隔,暂时只判断单引号和双引号
	var danger="'|\"";
	var dangers=danger.split("|");
	for(var i=0;i<dangers.length;i++)
	{
		if(v.indexOf(dangers[i])>-1)
		{
			result=false;
			break;
		}
	}
	return result;
}