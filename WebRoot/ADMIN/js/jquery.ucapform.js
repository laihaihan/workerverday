/**
 * jquery实现表单通用保存
 *
 * @author xhuatang@linewell.com
 * @since 2011-11-30
 */
lw.extendNs("linewell.jqueryucapform");

(function($){

    /**
     * 实现linewell.jqueryucapform
     */
    linewell.jqueryucapform = (function(){
    
        /**
         * 定义Bean的操作标志
         */
        var LwBeanFlgs = {
            /**
             * 插入标志
             */
            Insert: "1",
            /**
             * 修改操作
             */
            Update: "2",
            /**
             * 删除标志
             */
            Delete: "3",
            /**
             * 默认
             */
            Default: "0"
        };
        
        /**
         * 定义需要处理的表单的字段类型选择器
         */
        var lwFormFieldsType = "input:not(:file):not([name='_ucap_doc_unid']):not([name='_ucap_doc_flag']),select[formUnid!=''],textarea[formUnid!='']";
        
        /**
         * 定义表单的参数
         */
        var formOptions = {
            /**
             * 交互的url地址
             */
            actionUrl: appPath + "BaseAction.action?type=getForm",
            
            /**
             * 扩展参数
             */
            extParams: "",
            
            /**
             * 主表单的UNID
             */
            mainFormUnid: "",
            
            /**
             * 主表单的记录UNID
             */
            mainUnid: "",
            
            /**
             * 需要提交的表单对象，为空则为整个页面的表单对象
             */
            formName: "",
            /**
             * 其他提交的表单对象
             */
            formItems: [],
            
            /**
             * 开始提交前
             */
            beforeSave: function(){
            },
            
            /**
             * 提交后
             */
            afterSave: function(){
                var args = arguments;
                if (args.length > 1) {
                    alert("保存成功");
                }
                else {
                    alert("保存失败");
                }
            }// end afterSave function
        };
        
        /**
         * 定义表单的工具对象
         */
        var formUtils = {
        
            /**
             * 获取单个表单的对象
             *
             * @param formsJson
             *            单个或者多个表单的JSON
             * @param formId
             *            需要获取的表单的ID
             * @param docUnid
             *            文档的UNID
             * @param docFlag
             *            文档的标志
             * @return 返回当前表单域的JSON对象
             */
            getFormJson: function(formsJson, formId, docUnid, docFlag){
                // 定义表单域对象
                var formJson = null;
                // 循环获取所有的JSON对象
                for (var i in formsJson) {
                    if (formId === formsJson[i]["formUnid"] &&
                    docUnid === formsJson[i]["unid"]) {
                        formJson = formsJson[i];
                        break;
                    }
                }
                
                // 判断是否可获取到表单的对象
                if (null === formJson) {
                    var formJson = {};
                    formJson.formUnid = formId;
                    formJson.unid = docUnid;
                    formJson.isNew = docFlag;
                    formJson.item = [];
                    
                    // 如果不是主表单，添加主表单的信息
                    if (formId !== formOptions.mainFormUnid) {
                        formJson.fformUnid = formOptions.mainFormUnid;
                        formJson.funid = formOptions.mainUnid;
                    }
                    
                    // 新增一个JSON表单
                    formsJson[formsJson.length] = formJson;
                }
                
                return formJson;
            },// end getFormItems
            /**
             * 获取所有的表单的当前unid
             */
            getDocUnids: function(){
                var docUnids = {};
                
                // 获取所有表单的UNID
                $("input:hidden[name='_ucap_doc_unid']").each(function(){
                    docUnids[$(this).attr("formUnid")] = $(this).val();
                });
                return docUnids;
            },
            
            /**
             * 获取文档的标志
             */
            getDocFlags: function(){
                var docFlags = {};
                
                // 获取所有表单的UNID
                $("input:hidden[name='_ucap_doc_flag']").each(function(){
                    var flag = $(this).val();
                    if (!flag) 
                        flag = LwBeanFlgs.Insert;
                    docFlags[$(this).attr("formUnid")] = flag;
                });
                return docFlags;
            },
            
            /**
             * 获取对象的JSON
             *
             * @param formItemsJson
             *            所有的k,v的JSON
             * @param key
             *            查询的k值
             */
            getItemJson: function(formItemsJson, key){
                var itemJson = null;
                
                // 判断是否已经有保存k, v对象
                for (var i in formItemsJson) {
                    if (key === formItemsJson[i]["k"]) {
                        itemJson = formItemsJson[i];
                        break;
                    }
                }
                
                // 构建ItemJson对象
                if (null == itemJson) {
                    itemJson = {};
                    itemJson.k = key;
                    itemJson.v = "";
                    formItemsJson[formItemsJson.length] = itemJson;
                }
                
                return itemJson;
            },
            
            /**
             * 获取表单每个域的json
             *
             * @param formObj
             *            表单的jQuery对象
             * @param beanFlgList
             *            Bean对象的提交标记
             */
            getFormsJson: function($formObj){
                // 单个或者多个表单的JSON
                var formsJson = [];
                // 获取所有的文档UNID
                var docUnids = formUtils.getDocUnids();
                // 获取所有文档的属性
                var docFlags = formUtils.getDocFlags();
                
                // 遍历文本输入框
                $formObj.find(lwFormFieldsType).each(function(){
                
                    var $this = $(this);
                    // 获取字段输入表单的名称
                    var tmpKey = $this.attr("name");
                    // 需要有字段名称，名称为空，则不添加内容
                    if (!tmpKey) {
                        return;
                    }
                    // 所属的表单的ID
                    var formId = $this.attr("formUnid");
                    // 不属于表单，则不需要添加内容
                    if (!formId) {
                        return;
                    }
                    
                    // 文档的UNID
                    var docUnid = docUnids[formId] ? docUnids[formId] : "";
                    
                    // 默认的文档的操作标记
                    var docFlag = docFlags[formId] ? docFlags[formId] : LwBeanFlgs.Insert;
                    
                    // 定义表单域的JSON对象
                    var formJson = formUtils.getFormJson(formsJson, formId, docUnid, docFlag);
                    
                    // 获取k,v对象
                    var itemsJson = formJson.item;
                    
                    // 对象的JSON，如果没有则新增
                    var itemJson = formUtils.getItemJson(itemsJson, tmpKey);
                    
                    // 如果是文本输入框
                    if ($this.is("input")) {
                        // 如果是文本框、密码框
                        if ($this.is(":text,:password")) {
                            // formItemsJson[tmpKey] = $this.val();
                            itemJson.v = $this.val();
                        }
                        else 
                            if ($this.is(":checkbox,:radio")) {// 如果是单选框、复选框
                                // 如果被选中
                                if ($this.is(":checked")) {
                                    if (itemJson.v) {
                                        itemJson.v += "," + $this.val();
                                    }
                                    else {
                                        itemJson.v = $this.val();
                                    }
                                }
                            }// end if
                    }
                    else 
                        if ($this.is("select")) {// 如果是下拉框
                            if ($this.is("[multiple='multiple']")) {
                                itemJson.v = "";
                                if ($this.val()) {
                                    for (var i in $this.val()) {
                                        if (itemJson.v) 
                                            itemJson.v += ",";
                                        itemJson.v += $this.val()[i];
                                    }// end for
                                }// end if
                            }
                            else {
                                itemJson.v = $this.val();
                            }// end else
                        }
                        else 
                            if ($this.is("textarea")) {
                                itemJson.v = $this.val();
                            }// end if
                });// end each
                return formsJson;
            },// end getFormItemsJson
            /**
             * 绑定表单的值
             *
             * @param itemJson
             *            表单对象
             */
            bindFormData: function(itemJson){
            
                for (var i = 0; i < itemJson.length; i++) {
                
                    // 字段的属性
                    var item = itemJson[i]["item"];
                    
                    // 将字段的值赋值给字段的属性json中
                    var valuesJson = itemJson[i]["uiItemValueList"];
                    
                    // 字段的英文名
                    var nameEn = item["nameEn"];
                    
                    if (valuesJson.length === 0) {
                        continue;
                    }
                    
                    // 展示属性
                    var itemShow = item["itemShow"];
                    var $itemEn = $("input[name='" + nameEn + "']");
                    
                    // 循环赋值
                    for (var j = 0; j < valuesJson.length; j++) {
                        var valueJson = valuesJson[j];
                        // 如果有显示属性
                        if (itemShow && valueJson.value) {
                        
                            // 如果是单选框或者复选框
                            if ("radio" === $itemEn.attr("type") ||
                                "checkbox" === $itemEn.attr("type")) {
                                $("input[name='" + nameEn + "'][value='" +
                                valueJson.value +
                                "']").attr("checked", true);
                                continue;
                            }
                            
							
							if(j > 0){
								// 如果为通用选择框
	                            $itemEn.val($itemEn.val() + ",");
	                            if (itemShow["chinese"]) {								                                
	                                $("#" + nameEn + "_Cn_").val($("#" + nameEn + "_Cn_").val() + ",");
	                            }
							}
                            // 如果为通用选择框
                            $itemEn.val($itemEn.val() + valueJson.value);
                            if (itemShow["chinese"]) {								
                                $("#" + nameEn + "_Cn_").val($("#" + nameEn + "_Cn_").val() + valueJson.text);
                            }
                            
                        }
                        else {// 普通输入框
                            $itemEn.val(valueJson.text);
                        }
                    }// end for
                }// end for
            }// end bindFormData
        };
        
        /**
         * jqueryucapform包含的内容
         */
        var form = {
            /**
             * 初始化通用保存内容
             *
             * @param options
             *            参数
             */
            init: function(options){
                // 直接覆盖默认值
                formOptions = $.extend(formOptions, options);
            },
            
            /**
             * 调用通用保存保存文档
             */
            save: function(){
                // 获取设置参数
                var options = formOptions;
                
                var $forms;
                
                var formName = options.formName;
                
                options.beforeSave.call(this);
                
                // 默认为表单名称，如果表单不存在，则为所有的body的内容
                if (!formName) {
                    $forms = $("body");
                }
                else {
                    $forms = $(formName);
                }
                
                // 如果是多个表单对象同时提交，则分别处理提交
                $forms.each(function(){
                    var o = options;
                    var $formObj = $(this);
                    // var formJson = [];
                    
                    // 获取表单对象
                    var formsJson = formUtils.getFormsJson($formObj);
                    
                    // if (o.formItems) {
                    // // 添加外部传入的表单对象
                    // for (var i = 0; i < o.formItems.length; i++) {
                    // formItems[formItems.length] = o.formItems[i];
                    // }
                    // }
                    
                    var postData = $.toJSON(formsJson);
                    
                    lw.utils.debug(postData);
                    
                    // 保存的URL
                    var saveActionUrl = o.actionUrl +
	                    "&act=simpleSave&isDocSave=" +
	                    o.extParams +
	                    "&" +
	                    ucapCommonFun.getRandomString();
                    
                    // 提交到后台
                    $.ajax({
                        type: "post",
                        url: saveActionUrl,
                        data: postData,
                        dataType: "json",
                        contentType: "application/json",
                        async: false,
                        success: function(data, textStatus){
                            o.afterSave.call(this, data, textStatus);
                        },
                        error: function(){
                            o.afterSave.call(this);
                        },
                        statusCode: {// 处理错误状态
                            404: function(){
                                o.afterSave.call(this);
                            }
                        }
                    });// end ajax
                });// end each
            },// save end
            /**
             * 加载表单
             *
             * @param unid
             *            文档UNID
             * @param formUnid
             *            表单UNID
             * @param formType
             *            表单类型
             * @param isNew
             *            是否为新增
             */
            loadData: function(unid, formUnid, formType, isNew){
                // 加载数据的UNID
                var loadUrl = formOptions.actionUrl + "&unid=" + unid +
                "&formType=" +
                formType +
                "&formId=" +
                formUnid +
                "&isNew=" +
                isNew +
                formOptions.extParams +
                "&" +
                ucapCommonFun.getRandomString();
                if (formOptions.mainFormUnid &&
                formUnid != formOptions.mainFormUnid) {
                    loadUrl += "&main=" + formOptions.mainFormUnid;
                }
                // 从后台获取表单的数据
                $.ajax({
                    type: "post",
                    url: loadUrl,
                    dataType: "json",
                    contentType: "application/json",
                    success: function(data, textStatus){
						var dataString = $.toJSON(data);                    
                        lw.utils.debug(dataString);
						
                        formUtils.bindFormData(data["uiItemList"]);
                    },
                    error: function(){
                    
                    },
                    statusCode: {// 处理错误状态
                        404: function(){
                        
                        }
                    }
                });// end ajax
            }
        };
        
        // 返回jqueryucapform包含的内容
        return form;
    })();// 实现linewell.jqueryucapform 结束
})(jQuery);
