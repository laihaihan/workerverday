package com.linewell.core.buildermodule.tree;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.linewell.core.buildermodule.info.BuilderModuleInfo;
import com.linewell.core.buildermodule.info.BuilderModuleInfoBusiness;
import com.linewell.core.tree.TreeInterface;
import com.linewell.core.tree.TreeNode;
import com.linewell.core.tree.TreeSetting;
import com.linewell.ucap.session.Session;

public class BuilderModuleTree  implements TreeInterface {
	@Override
	public List<TreeNode> getListTreeNode(HttpServletRequest request) {
		List<TreeNode> treeList = new ArrayList<TreeNode>();

		Session session = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String belongToAppId = session.getApp().getUnid();
		String parentunid = request.getParameter("id");
		if (StringUtils.isEmpty(parentunid)) {
			TreeNode treeNode = new TreeNode();
			treeNode.setId("0");
			treeNode.setName("模型列表");
			treeNode.setParent(true);
			treeList.add(treeNode);
		}else if("0".equals(parentunid)){//加载菜单
			BuilderModuleInfoBusiness builderModuleInfoBusiness = new BuilderModuleInfoBusiness();
			List<BuilderModuleInfo> moduleList = builderModuleInfoBusiness.dofindAll();

			for (BuilderModuleInfo builderModuleInfo : moduleList) {
				TreeNode treeNode = new TreeNode();
				treeNode.setId(builderModuleInfo.getUnid());
				treeNode.setName(builderModuleInfo.getTitile());
				treeNode.setParent(false);
				treeList.add(treeNode);
			}
		}
		return treeList;
	}

	@Override
	public TreeSetting getTreeSetting() {
		
		List<String> paramList = new ArrayList<String>();		
		paramList.add("parentunid");
		
		TreeSetting treeSetting = new TreeSetting();
		treeSetting.setParamList(paramList);
		
		return treeSetting;
	}
}
