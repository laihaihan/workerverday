package com.linewell.core.tree;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

/** <p>
 * 树形接口
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date 2011-2-15
 * @version 1.00
 *          <p>
 *          Copyright (c) 2011 www.linewell.com
 *          </p>
 */
public interface TreeInterface {
	/**
	 * 获取配置类
	 * @return
	 */
	public TreeSetting getTreeSetting();
	
	/**
	 * 获取节点数据
	 * @param session
	 * @return
	 */
	public List<TreeNode> getListTreeNode(HttpServletRequest request);
}
