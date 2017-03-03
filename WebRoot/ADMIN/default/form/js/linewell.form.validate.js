linewell.extendNs("linewell.form.validate");

/**
 *  表单验证类
 *  该脚本基于jquery开发，需要引入jquery库以及linewell.core.js 与 linewell.utils.js
 * 
 *  调用示例：
 *  lw.form.validate.run("#formName", function(msgs){
 *      for(var i = 0; i < msgs.length; i ++){
 *          $("#" + msgs[i].fieldId).after("<span style='color:#ff0000'>" + msgs[i].message + "</span>");
 *      }     
 *  });
 * 
 *  @author xhuatang@linewell.com
 *  @since 2011-08-05
 */
(function($, lw){
  lw.form.validate = (function(){
    /**
     * 表单字段验证规则
     */
    var validateRegular = {
      "Notnull"      : /^(.+)?\S+(.+)?$/,
      "Require"      : /.+/,
      "Email"        : /^((\s?)+$)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
      "Phone"        : /^(([0\+]\d{2,3})|(0\d{2,3}))?(-)?(\d{7,8})(-(\d{3,}))?$/,
      "Mobile"       : /^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/,
      "Url"          : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
      "IdCard"       : /^\d{15}(\d{2}[A-Za-z0-9])?$/,
      "Currency"     : /^\d+(\.\d+)?$/,
      "Number"       : /^\d+$/,
      "Zip"          : /^[1-9]\d{5}$/,
      "QQ"           : /^[1-9]\d{4,9}$/,
      "Integer"      : /^[-\+]?\d+$/,
      "Double"       : /^[-\+]?\d+(\.\d+)?$/,
      "English"      : /^[A-Za-z]+$/,
      "Chinese"      : /^[\u0391-\uFFE5]+$/,
      "UnSafe"       : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
      "Date"         : /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/,
      "DateTime"     : /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29)) ([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,
      "SeveralComma" : /^([^,]*,.*)/,//至少一个逗号的字符串,add by jc 20100526行政执法用来判断人员选择框是否选择了两个人
      "IsSafe"       : function(str){return !this.UnSafe.test(str);},
      "SafeString"   : "this.IsSafe(value)",
      "Limit"        : "this.limit(value.length,getAttribute('min'),  getAttribute('field_len'))",
      "LimitB"       : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('field_len'))",
      "Repeat"       : "value == document.getElementsByName(getAttribute('to'))[0].value",
      "Range"        : "getAttribute('min') < value && value < getAttribute('field_len')",
      "Compare"      : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
      "Custom"       : "this.Exec(value, getAttribute('regexp'))",
      "Group"        : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('field_len'))"	
    };

    /**
     * 定义验证信息的结构体
     */
    var ValidateMessage = new Function();
    ValidateMessage.prototype = {
      /**
       * 字段的ID
       */
      fieldId : "",
      /**
       * 验证的信息
       */
      message : ""
    };
    
    var resultMsgs = [];

    /**
     * 验证结果处理的类型
     */
    var ResultType = {
      isAlert   : "1",
      isDefault : "0"
    };

    /**
     * 运行正则表达式
     * @return {boolean} 是否有存在正则内容
     */
    var execReg = function(op, reg){
      return new RegExp(reg, "g").test(op);
    };


    /**
     * 验证表单处理
     * @param {jQuery} $validateForms 验证的表单对象
     * @param 
     * @return
     */
    var runValidate = function($validateForms){       
        $validateForms.find(lw.form.FormFieldsType).each(function(){
            var $field = $(this);
            var vType = $field.attr("valiateType");
            if(vType){
                switch(vType){
                    case "Date"     :
                        cusMsg = ',日期格式填写不对，只能为YYYY-MM-DD';
                        break;
                    case "DateTime" :
                        cusMsg = ',日期时间格式填写不对，只能为YYYY-MM-DD hh:mm';
                        break;
                    case "Notnull"  :
                        cusMsg = ',不能为空';
                        break;
                    case "Integer"  :
                        cusMsg = ',只能为整数';
                        break;
                    case "Number"   :
                        cusMsg = ',只能为数值';
                        break;
                    case "Double":
                        cusMsg = ',只能为实数';
                        break;
                    default :
                        cusMsg = ',输入不符合规则';
                        break;
                }//end switch
                
                var fieldVal = $field.val();
                if(!validateRegular[vType].test(fieldVal)){                
                    var messObj = new ValidateMessage();        
                    messObj.fieldId = $field.attr("id");
                    messObj.message = $field.attr("nameCn") + cusMsg;                    
                    resultMsgs[resultMsgs.length] = messObj;
                }
                                
            }//end if vType
            
        });
    };
    
    /**
     * 验证结果输出
     * @param {ValidateMessage[]} msgs        处理结果信息
     * @param {ResultType}        reslultType 处理类型
     */
    var validateResult = function(resultType){
      //如果没有类型要求，直接用alert输出结果
      if(!resultType){
           resultType = ResultType.isAlert;
      }
      //处理Alert输出
      if(resultType === ResultType.isAlert){
        var alertMsg = "";
        for(var i = 0; i < resultMsgs.length; i = i + 1){
          if(alertMsg){
               alertMsg += "\n";
          }
          alertMsg += resultMsgs[i].message;
        }
        alert(alertMsg);
      }
    };

    return {
      /**
       * 验证表单，可以输入多个表单同时验证
       * 需要验证的表单用,隔开
       * 调用方式：lw.form.validate.validateForm(".form1,.form2");
       * 第一个参数为需要验证的表单对象，全局验证可以为空
       * 第二个参数为验证结果的回调函数，传入错误信息的数组为参数
       * @return 返回是否验证成功
       */
      run : function(){
        //获取参数
        var args = arguments;
        //验证的表单
        var $validateForms = null;
        //验证结果的处理方法
        var resultFn = null;
        
        //如果参数为空，则所有的表单域都需要验证
        if(!args || args.length === 0){
            $validateForms = $("body");            
        }else if(args.length === 1){//如果只有一个参数
            if( args[0] && (typeof args[0] === "function")){
                resultFn = args[0];
                $validateForms = $("body");
            }else{
                $validateForms = $(args[0]);
            }
        }else if(args.length === 2){//如果有2个参数，则第一个为Form对象，第二个为返回的结果集对象
          $validateForms = $(args[0]);
          resultFn = args[1];
        }

        //保证表单加载完成执行验证
        $validateForms.ready(function(){
            runValidate($(this));
            if(resultFn){
                resultFn.call(this, resultMsgs);
            }else{
                validateResult();
            }
        });
        
        if(resultMsgs){
            return true;
        }else{
            return false;
        }
        
      }//end run
    };//end return
  })();
})(jQuery, linewell);