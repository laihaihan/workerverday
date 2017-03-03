/**
 * 页面步骤的对象
 * @author xhuatang@linewell.com
 * @since 2011-11-30
 */
var pageStep = {
    /**
     * 可以跳转到下一步
     */
    canGoNext: false,
    
    /**
     * 可以跳转到上一步
     */
    canGoPre: false,
    
    /**
     *  下一页的链接
     */
    nextUrl: "",
    
    /**
     *  上一页的链接
     */
    preUrl: "",
    
    
    /**
     * 上一步的处理逻辑
     */
    preAction: function(){
    
    },
    
    /**
     * 下一步的处理逻辑
     */
    nextAction: function(){
    
    },
    
    /**
     * 跳转到下一步
     */
    next: function(){
        if (this.canGoNext) {
            location.href = this.nextUrl + "&" + Math.random();
        }
    },
    
    /**
     * 跳转到上一步
     */
    previous: function(){
        if (this.canGoPre) {
            location.href = this.preUrl + "&" + Math.random();
        }
    }
}
