/**
 * 确认生成模块的代码
 * @author xhuatang@linewell.com
 * @since 2011-08-02
 */
var modulePrompt = (function(){

var promptWin = null;

/**
 * 确定按钮
 */
var buttonOk = {
  text : "确定",
  handler:function(){
    
  }
};

/**
 * 取消按钮
 */
var buttonCancle = {
  text : "取消",
  handler:function(){
    promptWin.close();
  }
};

/**
 * 加载jsp文件
 */
var loadJsp = "jsp/modulePrompt.jsp?rnd=" + Math.random() ;

/**
 * 获取确认窗口
 */
var getPromptWin = function(){
  return new Ext.Window({
        title      : '模块代码生成确认',
        closable : true,
        width    : 600,
        height   : 350,
        autoLoad : loadJsp,  
        buttons  : [buttonOk, buttonCancle]
    });
};

/**
 * 定义确认生成模块返回的代码
 */
var modulePrompt = {
  /**
   * 生成代码的方式
   */
  GeneratorType : {
    /**
     * 只有新表单生成
     */
    onlyNew : "1",
    /**
     * 覆盖所有的模块
     */
    override : "2"    
  },
  /**
   * 显示确认窗口
   * @param existsNewForm 是否存在新表单, true:是 false:否
   * @param okCallbackFn    确定回调方法
   */
  show : function(existsNewForm, okCallbackFn){
    if(existsNewForm) loadJsp += "&exists=1"; 
    buttonOk.handler = function(){
      //代码生成的模式
      var generateType = null;
      var formIds = "";
      while(true){
        //如果只生成新表
        if(Ext.getDom("generatorOnlyNew") 
			  && Ext.getDom("generatorOnlyNew").checked){
			  generateType = modulePrompt.GeneratorType.onlyNew;  
			  formIds = formRelation.newIds;
			  break;
        }
        //如果是覆盖生成
        if(Ext.getDom("generatorOverride") 
          	&& Ext.getDom("generatorOverride").checked){
          	generateType = modulePrompt.GeneratorType.override;  
          	formIds = formRelation.allIds;
         	break;
        }
        break;
      }      
      //回调函数
      okCallbackFn.call(this, generateType,formIds);
    }
    
    promptWin = getPromptWin();  
    
    promptWin.show();
  }
};
return modulePrompt;

})();