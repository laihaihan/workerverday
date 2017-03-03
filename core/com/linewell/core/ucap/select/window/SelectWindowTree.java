package com.linewell.core.ucap.select.window;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.linewell.core.constant.CoreConstants;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.tree.TreeInterface;
import com.linewell.core.tree.TreeNode;
import com.linewell.core.tree.TreeSetting;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.session.Session;
/**
 * <p>
 * 	根据不同类型获取树结构
 * </P>
 * 
 * @author lfunian@linewell.com
 * @date 2013-7-22
 * @version 1.00
 * <p>
 * 	Copyright (c) 2013 www.linewell.com
 * </p>
 */
public class SelectWindowTree implements TreeInterface {

	@Override
	public List<TreeNode> getListTreeNode(HttpServletRequest request) {
		SelectWindowBusiness business = new SelectWindowBusiness();
		List<TreeNode> treeList = new ArrayList<TreeNode>();
		Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		String appUnid = ucapsession.getApp().getUnid();
		String treeType = request.getParameter("type");
		String parentunid = request.getParameter("id");
		String resultJson = null;
		//获取部门树
		if (CoreConstants.DICT_DEPT.equals(treeType)) {
			resultJson = business.getDeptTreeByBelongTo(parentunid, GlobalParameter.APP_UCAP);
		}
		//获取人员树
		else if (CoreConstants.DICT_USER.equals(treeType)) {
			resultJson = business.getUserTreeByBelongTo(parentunid, GlobalParameter.APP_UCAP);
		}
		//获取职位树
		else if(CoreConstants.DICT_POST.equals(treeType)){
			
		}
		//获取角色树
		else if(CoreConstants.DICT_ROLE.equals(treeType)){
			resultJson = business.getRoleTreeByBelongTo(parentunid, GlobalParameter.APP_UCAP, appUnid);
		}
		if (!StrUtil.isNull(resultJson)) {
			JSONArray jsonArray=JSONArray.fromObject(resultJson);
			for (int i = 0; i < jsonArray.size(); i++) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				if (jsonObject != null) {
					TreeNode treeNode = new TreeNode();
					treeNode.setId(jsonObject.getString("id"));
					treeNode.setName(jsonObject.getString("name"));
					treeNode.setParent(jsonObject.getBoolean("parent"));
					treeList.add(treeNode);
				}
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
