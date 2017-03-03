package com.linewell.core.ucap.role;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.tree.TreeNode;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

public class ChoosePersonnelAction extends ActionSupport {

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
			for (TreeNode treeNode : treeNodeList) {
				JSONObject json = new JSONObject();
				json.put("id", treeNode.getId());
				json.put("name", treeNode.getName());
				json.put("isParent", treeNode.isParent());
				jsonArray.add(json);
			}	
		}
		
        //返回值
		PrintUtil.print(response, jsonArray.toString());
        return null;
	
	}
	
	public static void main(String[] args) {
		JSONArray jsonArray = new JSONArray();
		JSONArray jsonArray1 = new JSONArray();
		JSONObject json1 = new JSONObject();
		json1.put("id", "88001111");
		json1.put("name","角色111");
		json1.put("open", true);
		JSONObject json11 = new JSONObject();
		json11.put("id", "88001111222222");
		json11.put("name","角色11122222222222222");
		json11.put("open", true);
		jsonArray1.add(json1);
		jsonArray1.add(json11);
		JSONObject json = new JSONObject();
		json.put("id", "88001");
		json.put("name","角色");
		json.put("open", true);
		json.put("children",jsonArray1);
		jsonArray.add(json);
		
 		System.out.println(jsonArray);
	}
}
