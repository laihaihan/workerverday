 /*************************************************
	Validator v1.01
	code by 我佛山人
	modify
	根据Ext整合到LINEWELL的UCAP
	by JC_SeekArt V-2009.04.17
	
*************************************************/

Validator = {
	Notnull : /^(.+)?\S+(.+)?$/,
	Require : /.+/,
	Email : /^((\s?)+$)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
	Phone : /^(([0\+]\d{2,3})|(0\d{2,3}))?(-)?(\d{7,8})(-(\d{3,}))?$/,
	Mobile : /^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/,
	Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	IdCard : /^\d{15}(\d{2}[A-Za-z0-9])?$/,
	Currency : /^\d+(\.\d+)?$/,
	Number : /^\d+$/,
	Zip : /^[1-9]\d{5}$/,
	QQ : /^[1-9]\d{4,9}$/,
	Integer : /^[-\+]?\d+$/,
	Double : /^[-\+]?\d+(\.\d+)?$/,
	English : /^[A-Za-z]+$/,
	Chinese :  /^[\u0391-\uFFE5]+$/,
	UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	Date 		: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/,
	DateTime	: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29)) ([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,
	SeveralComma:/^([^,]*,.*)/,//至少一个逗号的字符串,add by jc 20100526行政执法用来判断人员选择框是否选择了两个人
	IsSafe : function(str){return !this.UnSafe.test(str);},
	SafeString : "this.IsSafe(value)",
	Limit : "this.limit(value.length,getAttribute('min'),  getAttribute('field_len'))",
	LimitB : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('field_len'))",
	Repeat : "value == document.getElementsByName(getAttribute('to'))[0].value",
	Range : "getAttribute('min') < value && value < getAttribute('field_len')",
	Compare : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
	Custom : "this.Exec(value, getAttribute('regexp'))",
	Group : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('field_len'))",
	Item:[],
	ErrorItem : [],
	ErrorMessage : ["以下原因导致提交失败：\t\t\t\t"],
	/**
	 * 视图验证 add by jc 20100513
	 * @param {} id
	 * @param {} value
	 * @param {} nameCn
	 * @param {} vDataObj
	 * @return {} 返回验证信息，通过返回true
	 */
	ValidateByData:function(id,value,nameCn,formUnid,formType){
		//获取视图验证数据源
		vDataObj = _UcapFormFun.getValidatorFormJson(formUnid,formType);
		if(id && vDataObj){
			var fd = vDataObj[id];
			if(fd){
				//alert(Ext.encode(formData));
				var errMsg = this.requireFun(id,value,(nameCn||fd.nameCn),fd.require,
					fd.validateMessage,fd.validateScope,fd.valiateType,fd.validateEmpty);
				return errMsg;
			}
		}
		return true;
	},
	/**
	 * 表单验证函数
	 * @param {} str DIV容器ID
	 * @param {} mode 验证模式
	 * @return {Boolean}
	 */
	Validate : function(str, mode){
		var require,msg,vScope,vType,vEmpty,nameCn,lengthMax;
		str = str?('div#'+str+' input,textarea,select'):"input,textarea,select";//增加下拉框为空时的提示信息 modify by  fsm
		var objs = Ext.query(str);
		this.Item = objs;
		this.ErrorItem=[];
		this.ErrorMessage = ["以下原因导致提交失败：\t\t\t\t"];
		this.ClearState();
		var elementStr="";
		var tempValue="";
		for(var i=0;i<objs.length;i++){
			with(objs[i]){
				tempValue=value;
				require = getAttribute("require")||objs[i]["require"];
				msg = getAttribute("validateMessage")||objs[i]["validateMessage"]||"";
				vScope = getAttribute("validateScope")||objs[i]["validateScope"]||"";
				//mdf by jc 不进行默认取字段长度的判断，会变成判断数字大小
//				if(!vScope && getAttribute("type")=="text"){
//					lengthMax = getAttribute("length")||"";
//					if(""!=lengthMax)vScope = ","+lengthMax;
//				}
				vType = getAttribute("valiateType")||objs[i]["valiateType"]||"";
				vEmpty = getAttribute("validateEmpty")||objs[i]["validateEmpty"];
				nameCn = getAttribute("nameCn")||objs[i]["nameCn"];
				
				if(elementStr.indexOf("~@"+id+"@~")>-1)continue;
				elementStr+="~@"+id+"@~,";
				if(getAttribute("Type")&&(getAttribute("Type").toLowerCase()=="radio"||getAttribute("Type").toLowerCase()=="checkbox")){	
					var chkObj=document.getElementsByName(id);
					var chkStr="";
					for(var j=0;j<chkObj.length;j++){
						chkStr+=(chkObj[j]).getAttribute("CHECKED")||"";
					}
					if(chkStr.trim()==""){
						tempValue="";
					}


				}//单选框未选中时提示信息  modify by  fsm  2010.7.19
				
				var errMsg = this.requireFun(id,tempValue,nameCn,require,msg,vScope,vType,vEmpty);
				if(errMsg!=true)this.AddError(i, errMsg);
				
			}//end with(objs[i])
		}//结束for
		if(this.ErrorMessage.length > 1){
			mode = mode || 3;
			var errCount = this.ErrorItem.length;
			switch(mode){
			case 2 :
				//for(var i=1;i<errCount;i++)
					//if(this.ErrorItem[i])this.ErrorItem[i].style.color = "red";
			case 1 :
				try{
					window.top.Ext.Msg.alert("表单验证提示信息",this.ErrorMessage.join("<br/>&#160;&#160;&#160;&#160;&#160;&#160;"));
				}catch(e){
					alert(this.ErrorMessage.join("\n"));
				}
				//this.ErrorItem[1].focus();
				if(mode==1){
					return false;
					//break;
				}
			case 3 :
				for(var i=0;i<errCount;i++){
					try{
						if(this.ErrorItem[i])
							Ext.DomHelper.append(this.ErrorItem[i].parentNode,
								'<span style="color:red;cursor:hand;width:20px;" id="__ErrorMessagePanel" title="'+this.ErrorMessage[i+1].replace(/\d+:/,"")+'">&#160;！</span>');
					}catch(e){
						//alert(e.description);
					}
				}
				//this.ErrorItem[1].focus();
				if(mode==3){
					try{
						window.top.Ext.Msg.alert("表单验证提示信息","表单数据不完整,请填完整后再提交!");
					}catch(e){
						alert("表单数据不完整,请填完整后再提交!");
					}
				}
				break;
			default :
				alert(this.ErrorMessage.join("\n"));
				break;
			}
			return false;
		}
			return true;
	},
	/**
	 * 单个记录的验证
	 * @param {} id 字段ID
	 * @param {} value 字段实际值
	 * @param {} nameCn 字段中文值
	 * @param {} require 是否验证
	 * @param {} msg 错误提示信息
	 * @param {} vScope 验证范围
	 * @param {} vType 验证类型
	 * @param {} vEmpty 为空是否验证
	 * return 返回错误信息,正确返回true
	 */
	requireFun:function(id,value,nameCn,require,msg,vScope,vType,vEmpty){
		//是否进行验证,默认进行验证
		var errMsg=true;
		if(require && require==1)return errMsg;
		var bResult = true;
		
		var eeObj = $("eWebEditor_" + id);
		if (eeObj) {
			try {
				eval("value = eWebEditor_" + id + ".getHTML()");
			} catch (e) {
				// alert("获取文本编辑器时出错!");
			}
			//去掉验证值中的空行，防止原来正则不允许段落空行的限制 mdf by jc 20100602
			value = value.replace(/\s+/ig,"");
		}
		if($(id) && $(id).tagName && $(id).tagName.toLowerCase()=="textarea"){
			//去掉textarea验证值中的空行，防止原来正则不允许段落空行的限制 mdf by jc 20100603
			value = value.replace(/\s+/ig,"");
		}
		//validateMessage\validateScope
		if((!vEmpty || vEmpty==0) && Ext.isEmpty(value) && vType!="Notnull")return errMsg;
		
		switch(vType){
			case "":break;	
			default:{
				if(vType && this[vType] && !this[vType].test(value)){
					if(null==msg || msg==""){
						var cusMsg='';
						switch(vType){
							case "Date" 	:
								cusMsg = ',日期格式填写不对，只能为YYYY-MM-DD';
								break;
							case "DateTime" :
								cusMsg = ',日期时间格式填写不对，只能为YYYY-MM-DD hh:mm';
								break;
							case "Notnull"	:
							 	cusMsg = ',不能为空';
								break;
							case "Integer"	:
								cusMsg = ',只能为整数';
								break;
							case "Number"	:
								cusMsg = ',只能为数值';
								break;
							case "Double":
								cusMsg = ',只能为实数';
								break;
							default :
								cusMsg = ',输入不符合规则';
								break;
						}
						errMsg=nameCn+cusMsg;
					}else{
						errMsg=msg;//errMsg=nameCn+","+msg;//modify by  fsm 当设置验证提示信息时，去掉平台自带的字段提示
					}
					bResult = false;
				}
			}//end default
		}//end switch
		//进行范围的判断 modify by jc 不进行验证类型，也可以验证长度大小范围
		if(bResult && vScope){
			var vs = vScope.split(",");
			var comValue,vaMsg;
			var isNum = false;//是否数字（整数，数值，实数） add by jc
			switch(vType){
				case "Integer"	:
					isNum = true;
					break;
				case "Number"	:
					isNum = true;
					break;
				case "Double":
					isNum = true;
			}
			if(isNum){
				//进行数字大小的比较
				comValue = parseFloat(value)||0;
				vaMsg = "数值";
			}else{
				//进行长度验证
				comValue = value.length;
				vaMsg = "长度";
			}
			var len = comValue;
			if(vs.length==1){
				//alert("等于");
				bResult = (len == vs[0]);
				if(!bResult)errMsg = nameCn+","+vaMsg+"不等于"+vs[0]
			}else if(vs.length==2){
				var min=parseFloat(vs[0]),max=parseFloat(vs[1]);
				if(vs[0]==""){
					//小于vs[1]
					bResult = (len<=max);
					if(!bResult)errMsg = nameCn+","+vaMsg+"必须小于等于"+max;
				}else{
					if(vs[1]==""){
						//大于vs[0]
						bResult = (len>=min);
						if(!bResult)errMsg = nameCn+","+vaMsg+"必须大于等于"+min;
					}else{
						//大于vs[0],小于vs[1]
						bResult = (len>=min && len<=max);
						if(!bResult)errMsg = nameCn+","+vaMsg+"不在"+min+"到"+max+"范围";
					}
				}
			}
			return errMsg;
		}//结束范围判断
		return errMsg;
	},
	limit : function(len,min, max){
		min = min || 0;
		max = max || Number.MAX_VALUE;
		return min <= len && len <= max;
	},
	LenB : function(str){
		return str.replace(/[^\x00-\xff]/g,"**").length;
	},
	ClearState : function(elem){
		var errors = Ext.query("span[id=__ErrorMessagePanel]");
		for(var i=0;i<errors.length;i++){
			errors[i].parentNode.removeChild(errors[i]);
		}
	},
	AddError : function(index, str){
		//this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
		this.ErrorItem[this.ErrorItem.length] = this.Item[index];
		//this.ErrorMessage[index] = index + ":" + str;
		this.ErrorMessage[this.ErrorItem.length] = str;
	},
	Exec : function(op, reg){
		return new RegExp(reg,"g").test(op);
	},
	/**
	 * 验证范围
	 * @param {} op1
	 * @param {} operator
	 * @param {} op2
	 * @return {}
	 */
	compare : function(op1,operator,op2){
		switch (operator) {
			case "NotEqual":
				return (op1 != op2);
			case "GreaterThan":
				return (op1 > op2);
			case "GreaterThanEqual":
				return (op1 >= op2);
			case "LessThan":
				return (op1 < op2);
			case "LessThanEqual":
				return (op1 <= op2);
			default:
				return (op1 == op2);            
		}
	},
	/**
	 * 验证checkbox
	 * @param {} name
	 * @param {} min
	 * @param {} max
	 * @return {}
	 */
	MustChecked : function(name, min, max){
		var groups = document.getElementsByName(name);
		var hasChecked = 0;
		min = min || 1;
		max = max || groups.length;
		for(var i=groups.length-1;i>=0;i--)
			if(groups[i].checked) hasChecked++;
		return min <= hasChecked && hasChecked <= max;
	}
};