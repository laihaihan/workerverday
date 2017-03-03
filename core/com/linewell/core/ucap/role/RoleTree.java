package com.linewell.core.ucap.role;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.tree.TreeInterface;
import com.linewell.core.tree.TreeNode;
import com.linewell.core.tree.TreeSetting;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.session.Session;

public class RoleTree implements TreeInterface {

	@Override
	public List<TreeNode> getListTreeNode(HttpServletRequest request) {
		Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		List<TreeNode> treeNodeList = new ArrayList<TreeNode>();
		String id = request.getParameter("id");
		String appUnid = request.getParameter("APP_UNID");
		if (StrUtil.isNull(appUnid)) { 
			appUnid = session.getApp().getUnid();
		}
		RoleManager roleManager = new RoleManager();
		List<Role> roleList = null;
		if (StrUtil.isNull(id)) {
			roleList = roleManager.doFindListByCondition(" role_belong_to_app = ? and role_funid is null order by role_sort asc", new Object[]{appUnid});
		} else {
			roleList = roleManager.doFindListByCondition(" role_funid = ? and role_belong_to_app = ? order by role_sort asc", new Object[]{id, appUnid});
		}
        for (Role role : roleList) {
            String roleUnid = role.getRole_unid();
            TreeNode treeNode = new TreeNode();
            treeNode.setId(roleUnid);
            treeNode.setName(role.getRole_name());
            List<Role> childrenList = roleManager.doFindListByCondition("  role_funid= ? and role_belong_to_app = ? ", new Object[]{role.getRole_unid(),appUnid});
            if (childrenList !=null && childrenList.size() > 0) {
                treeNode.setParent(true);
            }
            treeNodeList.add(treeNode);
        }
		return treeNodeList;
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
