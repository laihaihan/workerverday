package com.linewell.core.view.ext.data;

import javax.servlet.http.HttpServletRequest;

/**
 * 
 * <p>
 * 	数据来源接口
 * </p>
 * 
 * @author cyingquan@linewell.com
 * @version 2012 6 5
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public interface ViewDataInf {
	
	public String getViewData(HttpServletRequest request);
}
