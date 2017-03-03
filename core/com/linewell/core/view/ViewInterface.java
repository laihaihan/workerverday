package com.linewell.core.view;

import java.util.List;

import javax.servlet.http.HttpServletRequest;




/** <p>
 * 自定义视图接口
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-7-23
 * @version 1.00
 *          <p>
 *          Copyright (c) 2013 www.linewell.com
 *          </p>
 */
public interface ViewInterface {

	/**
	 * 获取节点数据
	 * @param session
	 * @return
	 */
	public List<ViewNode> getListViewNode(HttpServletRequest request);
	
}
