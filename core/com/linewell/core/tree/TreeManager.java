package com.linewell.core.tree;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

public class TreeManager {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(TreeManager.class);

	private static TreeManager treeManager;

	public static TreeManager getInstance() {
		if (treeManager == null) {
			treeManager = new TreeManager();
		}
		return treeManager;
	}

	/**
	 * 获取树形配置类
	 * 
	 * @param _class
	 * @return
	 */
	public TreeSetting getTreeSetting(String clazz) {
		TreeSetting treeSetting = null;
		try {
			TreeInterface treeInterface = (TreeInterface) Class.forName(clazz).newInstance();
			treeSetting = treeInterface.getTreeSetting();
		} catch (InstantiationException e) {
			logger.error("不能实例化类:" + clazz);
		} catch (IllegalAccessException e) {
			logger.error("非法存取类:" + clazz);
		} catch (ClassNotFoundException e) {
			logger.error("找不到具体的类:" + clazz);
		}
		if (treeSetting == null) {
			treeSetting = new TreeSetting();
		}
		return treeSetting;
	}

	/**
	 * 获取树节点数据
	 * 
	 * @param treeNodeList
	 * @return ZtreeNodes数据
	 */
	public String getZTreeNodes(List<TreeNode> treeNodeList) {
		HttpServletRequest request = ServletActionContext.getRequest();

		StringBuffer sb = new StringBuffer();
		for (TreeNode treeNode : treeNodeList) {
			sb.append("{");
			sb.append("id:\"" + treeNode.getId() + "\",");
			// 图标
			if (StringUtils.isNotEmpty(treeNode.getIcon())) {
				sb.append("icon:\"" + request.getContextPath() + "/" + treeNode.getIcon() + "\",");
			}
			// 是否父节点
			if (treeNode.isParent()) {
				sb.append("isParent:true,");
			}
			// 其它数据
			Map<String, String> otherData = treeNode.getOtherData();
			if (otherData != null) {
				for (Map.Entry<String, String> entry : otherData.entrySet()) {
					sb.append(entry.getKey() + ":\"" + entry.getValue() + "\",");
				}
			}
			// 名称
			sb.append("name:\"" + treeNode.getName() + "\"");
			sb.append("},");
		}
		return StringUtils.substringBeforeLast(sb.toString(), ",");
	}
	
	
	public String getData(HttpServletRequest request,String clazz){		
		String zData = "[";
		try {
			TreeInterface treeInterface = (TreeInterface)Class.forName(clazz).newInstance();
			List<TreeNode> treeNodeList = treeInterface.getListTreeNode(request);
			zData += getZTreeNodes(treeNodeList);
		} catch (InstantiationException e) {
			logger.error("不能实例化类:"+clazz);
		} catch (IllegalAccessException e) {
			logger.error("非法存取类:"+clazz);
		} catch (ClassNotFoundException e) {
			logger.error("找不到具体的类:"+clazz);
		}
		zData+="]";
		
		return zData;
	}
}
