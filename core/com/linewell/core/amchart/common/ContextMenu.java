package com.linewell.core.amchart.common;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Feb 15, 2010 10:42:10 PM 
 * @version  v1.0
 * 类说明 :目前主要用于饼、柱、线三种图形 对应setting文件中的context_menu元素
 */
public class ContextMenu {
    public boolean default_items_zoom=true;
    public boolean default_items_print=true;
    
    /**
     *  [true] (true / false) 
     *  to show or not flash players zoom menu 
     * @return
     */
	public boolean isDefault_items_print() {
		return default_items_print;
	}
	
	/**
	 *  [true] (true / false) 
     *  to show or not flash players zoom menu 
	 * @param default_items_print
	 */
	public void setDefault_items_print(boolean default_items_print) {
		this.default_items_print = default_items_print;
	}
	
	/**
	 * [true] (true / false) 
	 * to show or not flash players print menu
	 * @return
	 */
	public boolean isDefault_items_zoom() {
		return default_items_zoom;
	}
	
	/**
	 * [true] (true / false) 
	 * to show or not flash players print menu
	 * @param default_items_zoom
	 */
	public void setDefault_items_zoom(boolean default_items_zoom) {
		this.default_items_zoom = default_items_zoom;
	}
    
   
}
