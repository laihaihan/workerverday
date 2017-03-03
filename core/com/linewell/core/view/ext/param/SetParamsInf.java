package com.linewell.core.view.ext.param;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;


/**
 * <p>
 * 视图自定义设置SQL(${XX})参数值
 * 类似request.getParameter("VIEW_NAME");VIEW_NAME必须大写
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date 2011-2-17
 * @version 1.00
 *          <p>
 *          Copyright (c) 2011 www.linewell.com
 *          </p>
 */
public interface SetParamsInf {
	
	/**
	 * 设置sql参数值
	 * @return
	 */
	public Map<String, String> setParams(HttpServletRequest request);
}
