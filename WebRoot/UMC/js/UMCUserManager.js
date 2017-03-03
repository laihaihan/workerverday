/**
 * 用户管理中心的窗口
 * @type 
 */
var UMCUserManagerWin = null;

/**
 * 用户管理中心用户管理的实现 by xhuatang@linewell.com 2011-05-12
 */
var UMCUserManager = (function(){
  //--------------private begin---------------
  /**
   * 参数对象
   */
  var options = {
    /**
     * 编辑页面的名称
     */
    editPageName : "editUser.jsp", 
    
    /**
     * 窗口图标
     */
    winImage     : ucapSession.win.winImg,
    
    /**
     * 内容样式
     */
    bodyStyle    : ucapSession.win.winBodyStyle
  };
  
  /**
   * 编辑的窗口对象
   */
  var editWin      = null;
    
  /**
   * 是否为编辑
   */
  var isNewFlag    = false;
  
  /**
   * 初始化编辑的页面
   * @param {String}  editPagePath 编辑页面所在的路径
   * @param {String}  editParams   编辑页面的参数
   * @param {Boolean} isNew        是否为新增用户       
   */
  var initEditPage = function(editPagePath, editParams, isNew){    
    //编辑的页面
    var editPage = editPagePath + options.editPageName + "?" + editParams;
    var pageHtml = "<iframe id='myFrame' width='760' height='525' src='" + editPage + "'></iframe>";
    var title;
    isNewFlag = false;
    if (isNew){
      title = "新建用户";     
      isNewFlag = true;      
    } else {
      title = "编辑用户";
    }    
    var winButtons = [
        {text:"保存并新增下一个",
          handler:function(){}},
        {text:"保存并关闭",
          handler:function(){}},
        {text:"取消",
          handler:function(){UMCUserManagerWin.close();}}  
      ];
    UMCUserManagerWin = new Ext.Window({
        title      : options.winImage + title,
        width      : 780,
        closable   : true,    //关闭
        modal      : true,     
        height     : 557,
        bodyStyle  : options.bodyStyle,
//        autoLoad   : {
//          url:editPage, 
//          scripts:true, 
//          nocache: true
//        },
        html       : pageHtml//,
        //buttons    : winButtons
      });
    UMCUserManagerWin.show();    
  };  
  //--------------private end---------------
  
  //--------------public begin---------------   
  return {
    /**
     * 系统的路径，默认调用Session的路径
     * @type {String}
     */
    appPath       : ucapSession.appPath,
    
    /**
     * 编辑页面所在的路径
     */
    editPagePath  : this.appPath + "UMC/",
    
    /**
     * 交互处理后台
     */
    actionUrl     : "umcAction.action",
    
    /**
     * 打开修改用户的页面  add by xhuatang@linewell.com 2011-05-12
     * @param {String} unid     打开的用户的UNID, 为空则为添加，否则为修改
     * @param {String} formType 打开的表单的类型
     * @param {String} formId   代开用户所属表单的UNID
     * @param {String} deptId   用户所属部门的UNID
     * @param {String} deptName 用户所属部门的名称
     */
    edit : function(unid, formType, formId, deptId, deptName){
      var paramsStr = "unid=" + unid
                   + "&formType=" + formType
                   + "&formId=" + formId
                   + "&deptId=" + deptId
                   + "&deptName=" + deptName;
      var isNew = unid ? false : true;
      initEditPage(this.editPagePath, paramsStr, isNew);
    },//end edit function
    
    /**
     * 提交用户表单
     * @param {JSON}     json        表单的JSON对象
     * @param {Boolean}  isNew       是否为新建
     * @param {function} callbackFun 保存成功回调的方法
     */
    save : function(json, isNew, callbackFun)
    {      
      
      /**
       * 请求交互的对象
       */
      var requestConfig = {
        url      : this.actionUrl,
        params   : {type : "user", act : "save", flag : isNew},
        jsonData : json,
        callback : function(options, success, response){
          if (success){ 
            var json     = Ext.decode(response.responseText);
            var exResult = ucapCommonFun.dealException(json);
            if(!exResult)return;            
            if(callbackFun) callbackFun();
          } else {
            Ext.Msg.alert("提示","保存不成功，请重试！");
          }          
        }
      }   
      Ext.Ajax.request(requestConfig);
    },//end save function
    
    /**
     * 加载用户对象
     * @param {String} unid 用户的unid
     */
    load : function(unid){
      
      /**
       * 请求交互的对象
       */
      var requestConfig = {
        url      : this.actionUrl,
        params   : {type : "user", act : "get", unid : unid},
        callback : function(options, success, response){
          if (success){            
            //alert(response.responseText);
            var json = Ext.decode(response.responseText);     
            var exResult = ucapCommonFun.dealException(json);
            json.password = "";            
            if(!exResult) return;
            if(null != json["attributes"]){
              for(fKey in json["attributes"]){
                var val=json["attributes"][fKey];
                json[fKey]=val;
              }
            }
            ucapCommonFun.setFormValue(json);
          }
        }
      }
      Ext.Ajax.request(requestConfig);      
    }//end load function
  };
  //--------------public end---------------   
}
)();