//建立form的命名空间
lw.extendNs("linewell.form");

/**
 * jQuery表单保存扩展
 * 该脚本基于jquery开发，需要引入jquery库、jquery.json-2.2.min.js、linewell.core.js、linewell.utils.js
 * @auth xhuatang@linewell.com
 * @since 2011-07-18
 */
(function($, lw){
  /**
   * 定义linewell.form的实现
   */
  lw.form = (function(){

    /**
     * 定义Bean的操作标志
     */
    var LwBeanFlgs = {
        /**
         * 插入标志
         */
        Insert  : "1",
        /**
         * 修改操作
         */
        Update  : "2",
        /**
         * 删除标志
         */
        Delete  : "3",
        /**
         * 默认
         */
        Default : "0"
    };

    /**
     * 定义表单记录的对象
     */
    var LwFormItem = new Function();
    LwFormItem.prototype = {
      //表单的UNID
      formUnid     : "",      
      //文档的UNID
      docUnid      : "",
      //定义对象的标志位
      ucapBeanFlg  : LwBeanFlgs.Default,
      //字段信息
      items        : {}
    };

    /**
     * 定义需要处理的表单的字段类型选择器
     */
    var lwFormFieldsType = "input:not(:file):not([name='_ucap_doc_unid']):not([name='_ucap_doc_flag']),select,textarea";


    /**
     * 获取单个表单的对象
     * @param formsJson 单个或者多个表单的JSON
     * @param formId    需要获取的表单的ID
     * @param docUnid   文档的UNID
     * @return          返回当前表单域的JSON对象
     */
    var getFormItems = function(formsJson, formId, docUnid){
      //定义表单域对象
      var formItems = null;    
      //循环获取所有的JSON对象
      for(var i in formsJson){
        if(
          formId === formsJson[i]["formUnid"]
          && docUnid === formsJson[i]["docUnid"]){
          formItems = formsJson[i]["items"];
          break;
        }
      }
      return formItems;
    };//end getFormItems    
    

    /**
     * 获取所有的表单的当前unid
     */
    var getDocUnids = function(){
      var docUnids = {};

      //获取所有表单的UNID
      $("input:hidden[name='_ucap_doc_unid']").each(function(){
        docUnids[$(this).attr("formUnid")] = $(this).val();
      });
      return docUnids;
    };

    /**
     * 获取文档的标志
     */
    var getDocFlags = function(){
      var docFlags = {};

      //获取所有表单的UNID
      $("input:hidden[name='_ucap_doc_flag']").each(function(){
        var flag = $(this).val();
        if(!flag) flag = LwBeanFlgs.Insert;
        docFlags[$(this).attr("formUnid")] = flag;
      });
      return docFlags;
    };


    /**
     * 获取表单每个域的json
     * @param formObj     表单的jQuery对象
     * @param beanFlgList Bean对象的提交标记 
     */
    var  getFormItemsJson = function( $formObj){
      //单个或者多个表单的JSON
      var formsJson = [];
      var docUnids = getDocUnids();
      var docFlags = getDocFlags();
      
      //遍历文本输入框
      $formObj.find(lwFormFieldsType).each(function(){
        var $this = $(this);
        //临时的名称
        var tmpKey = $this.attr("name");
        if(!tmpKey) return;
        //所属的表单的ID
        var formId = $this.attr("formUnid");        
        //formId = formId ? formId : "";
        if(!formId) return;
        

        

        //文档的UNID
        var docUnid = docUnids[formId] ? docUnids[formId] : "";
        //默认的文档的操作标记
        var docFlag = docFlags[formId] ? docFlags[formId] : LwBeanFlgs.Insert;
        
        //定义表单域的JSON对象
        var formItemsJson = getFormItems(formsJson, formId, docUnid);
       
        
        //判断是否可获取到表单的对象
        if(null === formItemsJson){
          var formItem = new LwFormItem();
          formItem.ucapBeanFlg = docFlag;//getFormFlg(beanFlags, formId);
          formItem.formUnid    = formId;
          formItem.docUnid     = docUnid;
          formItem.items       = {};
          formItemsJson        = formItem.items;

          //新增一个JSON表单
          formsJson[formsJson.length] = formItem;          
        }      
        
        
        //如果是文本输入框
        if($this.is("input")){
          //如果是文本框、密码框
          if($this.is(":text,:password")){
            formItemsJson[tmpKey] = $this.val();
          }else if($this.is(":checkbox,:radio")){//如果是单选框、复选框          
            //如果被选中
            if($this.is(":checked")){
              if(formItemsJson[tmpKey]){
                formItemsJson[tmpKey] += "," + $this.val();
              }else{
                formItemsJson[tmpKey] = $this.val();
              }          
            }else if(!formItemsJson[tmpKey]){//保证每个表单域的对象都有值
              formItemsJson[tmpKey] = "";
            }
          }//end if        
        }else if($this.is("select")){//如果是下拉框
          if($this.is("[multiple='multiple']")){
            formItemsJson[tmpKey] = "";
            
            if($this.val()){
              for(var i in $this.val()){
                if(formItemsJson[tmpKey]) formItemsJson[tmpKey] += ",";
                formItemsJson[tmpKey] += $this.val()[i];
              }
            }//end if          
          }else{
            formItemsJson[tmpKey] = $this.val();        
          }//end else
          
        }else if($this.is("textarea")){
          formItemsJson[tmpKey] = $this.val();
        }//end if
        
      });//end each
      
      return formsJson;
    };//end getFormItemsJson   

    var form = {

//      /**
//       * 定义UCAPBean的标志
//       */
//      UcapBeanFlgs : LwBeanFlgs,
      
      /**
       * 定义表单的记录对象
       */
      FormItem : LwFormItem,

      /**
       * 定义需要处理的表单输入对象
       */
      FormFieldsType : lwFormFieldsType,
            
      /*
       * 表单的参数信息 
       */
      FormOptions : {
    	  /**
         * 交互的url地址
         */
        actionUrl  : "app.action",      
        /**
         * 表单的UNID
         */
        formUnid   : "",      
        /**
         * 文档的类型
         */
        formType   : "",
        /**
         * 需要提交的表单对象，为空则为整个页面的表单对象
         */        
        formName   : "",      
        /**
         * 其他提交的表单对象
         */
        formItems  : []
      },
      
      /**
       * 获取表单的JSON
       * @param formClass 标识表单的Class对象,也可以是formID，类似于css的命名方式
       * return 表单的JSON字符串
       */
      geFormJson : function(formClass){
          var jsonObj = getFormItemsJson($(formClass));
          return $.toJSON(jsonObj);
      },
      

      /**
       * 表单保存
       * @param formName 表单名称，用jQuery选择的方式命名，如：lw.form.save(".form")       
       */
      save : function() {       

        //合并参数
        var options = this.FormOptions;//$.extend(defaultOptions, options);        
        var $forms;
        
        var formName = options.formName;
        

        if(!formName){
        	$forms = $("body");
        }else{
        	$forms = $(formName);
        }
        
        //如果是多个表单对象同时提交，则分别处理提交
        $forms.each(function() {       
          var o = options;
          var $formObj = $(this);          
          var formJson = {};         

          //获取表单对象
          var formItems = getFormItemsJson($formObj);
          
          if(o.formItems){
            //添加外部传入的表单对象
            for(var i = 0; i < o.formItems.length; i++){
              formItems[formItems.length] = o.formItems[i];
            }
          }
          
          //表单的JSON对象设定
          formJson["formUnid"]  = o.formUnid;
          //formJson["docUnid"]   = o.docUnid;
          formJson["formType"]  = o.formType;
          formJson["forms"]     = formItems;

          
          lw.utils.debug($.toJSON(formJson));

          //提交到后台
          $.ajax({
            type        : "post",
            url         : o.actionUrl,
            data        : $.toJSON(formJson),            
            dataType    : "json",
            contentType : "application/json",
            success     : function(data, textStatus){
              alert("保存成功!");
            },
            error       : function(){
              alert("保存失败!");
            },            
            statusCode  : {//处理错误状态
              404 : function() {
                alert('page not found');
              }
            }
          });//end ajax            
          
          
        });//end each
        
      }//end formSave
    
    }//end form

    return form;

  })();//end linewell.form的实现
  
 
})(jQuery, linewell);