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
  $.fn.tabScroll = function(callbackFn){
    var defaultOptions = {      
      btnLeft : "#tabBtnLeft",
      btnRight : "#tabBtnRight",
      btnDown : "#tabBtnDown",
      tabList : "#info_tab_list",
    };
    var o = defaultOptions;
    
    var $btnLeft = $(o.btnLeft);
    var $btnRigth = $(o.btnRight);
    var $btnDown = $(o.btnDown);
    var $tabList = $(o.tabList);
    var $tabListUl = $("ul", $tabList);   
    var $tabListLi = $("li", $tabList);     
    
    //当前Tab的索引值
    var currentTabIndex = 0;
    //当前Tab的滚动左边值
    var currentScrollLeft = 0;
    //当前list容器的长度
    var tabListLength = $tabList.outerWidth();
    //所有的Tab的Li的总长度
    var tabListLiLength = 0;
     
    //获取所有的li的长度
    $tabListLi.each(function(){
        tabListLiLength += $(this).outerWidth();
    });
    
    //如果所有的长度小于容器的长度，直接退出，不需要执行
    if(tabListLiLength <= tabListLength) {
        $btnLeft.hide();
        $btnRigth.hide();
        return;
    }
    
    /*
     *  设置隐藏的像素
     * @param pix 像素
     */
    var setScroll = function(pix){
        $tabListUl.animate({
                marginLeft : -pix
        }, 500);
    }
    
    /**
     * 向右移动
     */
    $btnRigth.click(function(){        
        if(tabListLiLength - currentScrollLeft <= tabListLength) return;
        var $li = $($tabListLi.get(currentTabIndex));
        currentScrollLeft += $li.outerWidth() ;  
        setScroll(currentScrollLeft);
        currentTabIndex++;
    });
    
    /**
     * 向左移动
     */
    $btnLeft.click(function(){        
        if(currentScrollLeft <= 0) return;
        currentTabIndex--;
        var $li = $($tabListLi.get(currentTabIndex));
        currentScrollLeft -= $li.outerWidth();        
        setScroll(currentScrollLeft);        
    });
   
        
  }
})(jQuery);