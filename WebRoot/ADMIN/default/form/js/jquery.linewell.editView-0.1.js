/**
 * 可编辑视图
 * @auth xhuatang@linewell.com
 * @since 2011-07-22
 */
(function($){

  /**
   * 获取当前的行对象
   * @param $obj         当前行内的对象
   * @param rowClassName 行的类名称
   * @param              行的jQuery对象
   */
  var getRowItem = function( $obj, rowClassName ){
    var $rowItem = $obj.parent();    
    //debug($rowItem);
    //如果不为空或者有存在Class对象，获取第一个父类
    while($rowItem 
      && !$rowItem.hasClass(rowClassName)){      
      if(0 === $rowItem.size()){
        $rowItem = null;
        break;
      }
      $rowItem = $rowItem.parent();
    }
    return $rowItem;
  };  
  
  
	//扩展功能
	$.fn.extend({
	  /**
		 * 扩展jQuery，可编辑视图的实现
		 */
		editView : function(options)
		{
      //定义默认的参数      
      var defaultOptions = {        
        //视图所属表单的UNID
        formUnid       : "",

        //定义表单的主键字段
        formPriKey     : "unid",

        //插入数据的按钮的Class名称
        insertClass    : "editViewInsertBtn",

        //修改数据的按钮的Class名称
        updateClass    : "editViewUpdateBtn",

        //删除数据的按钮的Class名称
        deleteClass    : "editViewDeleteBtn",

        //删除选中的按钮的Class名称
        delSelClass    : "editDeleteSelBtn",

        //行模板的Class名称
        templRowClass  : "editViewListTemplate",

        //定义可编辑行的Class名称
        rowItemClass   : "editViewItemClass",

        //行选中的Class名称        
        rowSelClass    : "editViewRowSel",
          
        //行全部选中的Class名称
        rowSelAllClass : "editViewSelAll"
      };

      //合并参数
      options = $.extend(defaultOptions, options);


      //对所有的视图对象进行事件绑定
      return this.each(function(){
        //属性定义
        var o = options;
        //当前的可编辑视图
        var $view = $(this);
        //获取行的末班
        var $rowTemplate = $view.find("." + o.templRowClass);
        //选中的行
        var $selectedRows = [];

        /**
         * 添加选中行
         * @param selectedRows 选中的行数组
         * @param $row         操作的行
         * @param isAdd        是否添加,true:添加 false:删除
         */
        var addSelRow = function($row, isAdd){
          var rowExists = false;
          //判断是否存在于数组中
          for(var i = 0; i < $selectedRows.length; i++){
            if(!rowExists && $selectedRows[i].is($row)){              
              rowExists = true;
            }
            if(!isAdd && rowExists && i < $selectedRows.length - 1){              
              $selectedRows[i] = $selectedRows[i + 1];              
            }
          }
          //如果是添加行，且行不存在于数组
          if(!rowExists && isAdd){            
            $selectedRows[$selectedRows.length] = $row;            
          }else if(rowExists && !isAdd){//是删除行，且行存在于数组中，直接数组长度减1
            $selectedRows.length -= 1;
           
          }          
        };

        /**
         * 删除选中的行
         */
        var delSelRows = function(){
          for(var i = 0; i < $selectedRows.length; i++){
            $selectedRows[i].remove();
          }
          $selectedRows.length = 0;
        };

        /**
         * 添加新行
         */
        var addNewRow = function(){
          //克隆新行并显示
          var $newRow = $rowTemplate.clone();
          $newRow.show();

          //替换行的Class名称
          $newRow.removeClass(o.templRowClass);
          $newRow.addClass(o.rowItemClass);

          //添加行的删除按钮事件
          $newRow.find("." + o.deleteClass).click(function(){            
            $newRow.remove();
          });          


          //添加选中的事件，默认为CheckBox
          $newRow.find("." + o.rowSelClass).click(function(){
            if($(this).attr("type").toLowerCase() === "checkbox"){              
              if($(this).attr("checked")){
                addSelRow($newRow, true);
              }else{
                addSelRow($newRow, false);
              }             
            }
          });
          
          $view.append($newRow);
        };

        //定义添加按钮的单击事件
        $view.find("." + o.insertClass).click(function(){
          addNewRow();
        });

        //删除选中的行
        $view.find("." + o.delSelClass).click(function(){
          delSelRows();
        });

        //选择所有行
        $view.find("." + o.rowSelAllClass).click(function(){
          $view.find("." + o.rowSelClass).each(function(){
            var $selRow = getRowItem($(this), o.rowItemClass);            
            if(null != $selRow && !$(this).attr("checked")){
              $(this).attr("checked", true);
              addSelRow($selRow, true);
            }
          });
        });
        
        
      });//end return
      
		}
	})
})(jQuery);