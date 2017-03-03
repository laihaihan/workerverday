/**
 * 应用的下拉选择框
 * @author xhuatang@linewell.com
 * @since 2011-08-03
 */
(function($){
  /**
   * 应用选择框
   * @param toId 需要赋值的ID
   */
  $.fn.appSelector = function(callbackFn){
    var defaultOptions = {      
      selectedName : ".selectbox_text",
      selectorDivName : ".app_selector"
    };
    var o = defaultOptions;
    $(o.selectedName).click(function(){
      if("none" == $(o.selectorDivName).css("display")){
        $(o.selectorDivName).slideDown();
      }else{
        $(o.selectorDivName).slideUp();
      }
    });
    //定义单击事件
    $(o.selectorDivName).find("a").click(function(){
       $(o.selectedName).text($(this).text());
       $(o.selectorDivName).slideUp();
       callbackFn.call(this, $(this).attr("id"));      
    });
  };
})(jQuery);