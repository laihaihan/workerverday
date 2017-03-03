/**
 * 用户管理中心验证类 by xhuatang@linewell.com 2011-05-13
 * @type Object
 */
var UMCValidator = (function(){
  /**
   * 参数
   */
  var options = {
  	notnull      : /^(.+)?\S+(.+)?$/,
  	require      : /.+/,
  	email        : /^((\s?)+$)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
  	mobile       : /(^((\(\d{3}\))|(\d{3}\-))?1\d{10}$)|(^(([0\+]\d{2,3})|(0\d{2,3}))?(-)?(\d{7,8})(-(\d{3,}))?$)/,
  	idcard       : /^\d{15}(\d{2}[A-Za-z0-9])?$/,
  	qq           : /^[1-9]\d{4,9}$/,
  	realname     :  /^[\u0391-\uFFE5]{2,10}$/,
    username     : /^[A-Za-z]([A-Za-z0_9]|_){0,19}$/,
    password     : /^.{6,20}$/,
    notNullMsg   : "不能为空",
    fieldConfigs : [],
    /**
     * 定义提示信息的html
     * @type String
     */
    tipHtml : "<div class='tips_input'>{Html}</div>",
    /**
     * 定义错误信息的html
     * @type String
     */
    errorHtml : "<div class='tips_error'>{Html}</div>",
    /**
     * 定义正确信息的HTML
     * @type String
     */
    correctHtml : "<div class='tips_correct'></div>"
  };
  
  /**
   * 获取字段的配置信息
   * @param id 对象的ID
   */
  var findFieldConfig = function(id){
    for(var i = 0; i < options.fieldConfigs.length; i++){
      var fieldConfig = options.fieldConfigs[i];       
      if(fieldConfig.id == id){          
        return fieldConfig;
      }
    }
  };
  
  /**
   * 判断是否验证通过
   * @param 需要验证的对象
   */
  var isValidated = function(obj){
    var fieldConfig = findFieldConfig(obj.id);
    return options[fieldConfig.type].test(obj.value);
  };
  
  /**
   * 获取信息
   * @param {} id   对象的ID
   * @param {} type 类型 1：提示 2：错误 3：正确
   */
  var getMessage = function(id, type){
    var fieldConfig = findFieldConfig(id);      
    if(1 === type){
      return fieldConfig.tip;
    }else if(2 === type){
      return fieldConfig.errorMsg;
    }
    return "";
  };
  
  /**
   * 显示消息
   * @param {} obj 要显示的表单对象
   * @param {} msg 信息
   * @param {} type 类型 1：提示 2：错误 3：正确 4:不能为空
   */
  var showMessage = function(obj, type){
    if(!type) type = 0;
    var msg = getMessage(obj.id, type);
    var tipsNode = obj.parentNode.parentNode.lastChild;
    var resultHTML = "";
    //提示信息
    if(1 === type){
      resultHTML = options.tipHtml.replace("{Html}", msg);
    }
    //错误信息
    else if(2 === type){
      resultHTML = options.errorHtml.replace("{Html}", msg);
    }
    //正确信息
    else if(3 === type){
      resultHTML = options.correctHtml;
    }
    else if(4 == type){
      resultHTML = options.errorHtml.replace("{Html}", options.notNullMsg);
    }
    tipsNode.innerHTML = resultHTML;
  };
  
  /**
   * 定义字段获取焦点事件
   */
  var fieldFocus = function(){
    //如果为空，则显示提示
    if(!this.value){               
      showMessage(this, 1);
    }    
  };
  
  /**
   * 判断表单字段对象
   * @param obj 对象
   */
  var checkField = function(obj){
    var isChecked = true;    
    var fieldConfig = findFieldConfig(obj.id);
    
    //判断格式是否正确，如果为正确的输入
    if(obj.value != "" && isValidated(obj)){
      showMessage(obj, 3);
    }
    else if(fieldConfig.notNull && obj.value == ""){
      isChecked = false;
      showMessage(obj, 4);
    }
    //输入不正确，且不为空
    else if(obj.value != ""){
      isChecked = false;
      showMessage(obj, 2);
    }
    else{
      showMessage(obj);
    }
    return isChecked;
  };
  
  /**
   * 定义字段获取焦点事件
   */
  var fieldBlur = function(){
    checkField(this);
  };  
  
  
  //public 
  return {
    /**
     * 初始化验证
     * @param {} fieldConfigs 
     */
    init : function(fieldConfigs){
      options.fieldConfigs = fieldConfigs;      
      for(var i = 0; i < fieldConfigs.length; i++){
        var fieldConfig = fieldConfigs[i];
        var obj = Ext.getDom(fieldConfig.id);
        if(null != obj){    
          obj.onfocus = fieldFocus;
          obj.onblur = fieldBlur;
        }
      }
    },//end init
    
    /**
     * 验证
     */
    validate : function(){
      var isChecked = true;
      var fieldConfigs = options.fieldConfigs;      
      for(var i = 0; i < fieldConfigs.length; i++){        
        var obj = Ext.getDom(fieldConfigs[i].id);
        if(!checkField(obj) && isChecked){
          isChecked = false;
        }
      }
      return isChecked;
    }
  };//end public return
})();