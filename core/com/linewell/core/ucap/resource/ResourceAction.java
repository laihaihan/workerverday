package com.linewell.core.ucap.resource;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.tree.TreeNode;
import com.linewell.core.ucap.role.ChooseRoleManager;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 *    获取平台资源
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 5, 2012
 * @version 1.0  
 */
public class ResourceAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	public String execute() throws Exception {

		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		String fn = request.getParameter("fn");
		JSONArray jsonArray = new JSONArray();
		ChooseRoleManager chooseRoleManager = new ChooseRoleManager();
		if("getRole".equals(fn)){
			List<TreeNode>  treeNodeList = chooseRoleManager.getListTreeNode(request);
			for (TreeNode treeNode : treeNodeList) {
				JSONObject json = new JSONObject();
				json.put("id", treeNode.getId());
				json.put("name", treeNode.getName());
				json.put("type", "role");
				json.put("isParent", treeNode.isParent());
				jsonArray.add(json);
			}			
		}else if ("getPersion".equals(fn)){
			List<TreeNode>  treeNodeList = chooseRoleManager.getListPersionTreeNode(request);
			for (TreeNode treeNode : treeNodeList) {
				JSONObject json = new JSONObject();
				json.put("id", treeNode.getId());
				json.put("name", treeNode.getName());
				json.put("isParent", treeNode.isParent());
				json.put("type", "persion");
				jsonArray.add(json);
			}
		}else if ("getDept".equals(fn)){
			List<TreeNode>  treeNodeList = chooseRoleManager.getListDeptTreeNode(request);
			for (TreeNode treeNode : treeNodeList) {
				JSONObject json = new JSONObject();
				json.put("id", treeNode.getId());
				json.put("name", treeNode.getName());
				json.put("isParent", treeNode.isParent());
				json.put("type", "dept");
				jsonArray.add(json);
			}
		}else if("getRoleOnly".equals(fn)){
			List<TreeNode>  treeNodeList = chooseRoleManager.getRoleListTreeNode(request);
			jsonArray =getArray( treeNodeList);	
		}else if("getInteraction".equals(fn)){
			List<TreeNode>  treeNodeList = chooseRoleManager.getInteractionListTreeNode(request);
			jsonArray =getArray( treeNodeList);	
		}else if("getPost".equals(fn)){
			List<TreeNode>  treeNodeList = chooseRoleManager.getPostListTreeNode(request);
			jsonArray =getArray( treeNodeList);	
		}
		//获取流程的环节节点
		else if("getNodes".equals(fn)){
			List<TreeNode>  treeNodeList = chooseRoleManager.getNodeListTreeNode(request);
			jsonArray =getArray(treeNodeList);	
		}
		
        //返回值
		PrintUtil.print(response, jsonArray.toString());
        return null;
	
	}

	private JSONArray  getArray(List<TreeNode> treeNodeList) {
		JSONArray jsonArray = new JSONArray();
		for (TreeNode treeNode : treeNodeList) {
			JSONObject json = new JSONObject();
			json.put("id", treeNode.getId());
			json.put("name", treeNode.getName());
			json.put("isParent", treeNode.isParent());
			jsonArray.add(json);
		}
		return jsonArray; 
	}
}
