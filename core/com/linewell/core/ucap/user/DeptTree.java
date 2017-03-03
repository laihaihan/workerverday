package com.linewell.core.ucap.user;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.tree.TreeInterface;
import com.linewell.core.tree.TreeNode;
import com.linewell.core.tree.TreeSetting;
import com.linewell.core.ucap.dept.UcapDeptBusiness;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.UcapRequest;
import com.linewell.ucap.util.UcapRequestWebManager;

public class DeptTree  implements TreeInterface {


	@Override
	public List<TreeNode> getListTreeNode(HttpServletRequest request) {
		UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
		Session ucapSession = (Session) ucapRequest.getSession();
		com.linewell.ucap.platform.cache.user.User user = ucapSession.getUser();// 获取用户与部门的信息

		String id = request.getParameter("id");
		String deptunid = request.getParameter("deptunid");
		String appUnid = request.getParameter("APP_UNID");
		UcapDeptBusiness ucapDeptBusiness = new UcapDeptBusiness();
		List<TreeNode> resultList = ucapDeptBusiness.getListTreeNode(id, appUnid, user);
		return resultList;
	}

	public TreeSetting getTreeSetting() {
		List<String> paramList = new ArrayList<String>();		
		paramList.add("deptunid");		
		paramList.add("parentunid");
		TreeSetting treeSetting = new TreeSetting();
		treeSetting.setParamList(paramList);
		return treeSetting;
	}

}
