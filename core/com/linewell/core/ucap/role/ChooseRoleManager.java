package com.linewell.core.ucap.role;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.tree.TreeNode;
import com.linewell.core.tree.TreeSetting;
import com.linewell.core.ucap.flow.FlowManager;
import com.linewell.core.ucap.flow.FlowParams;
import com.linewell.core.ucap.module.ModuleManager;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.cache.role.Role;
import com.linewell.ucap.platform.cache.role.RoleManager;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.UcapRequest;
import com.linewell.ucap.util.UcapRequestWebManager;
import com.linewell.ucap.workflow.bean.flow.Flow;
import com.linewell.ucap.workflow.bean.flow.FlowNode;

public class ChooseRoleManager {
    private static final Logger logger = Logger.getLogger(ModuleManager.class);
	private static ChooseRoleManager choosePersonnelService;

	public static ChooseRoleManager getInstance() {
		if (choosePersonnelService == null) {
			choosePersonnelService = new ChooseRoleManager();
		}
		return choosePersonnelService;
	}
	

	public List<TreeNode> getListDeptTreeNode(HttpServletRequest request) {
		List<TreeNode> resultList = new ArrayList<TreeNode>();

		UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
		Session ucapSession = (Session) ucapRequest.getSession();
		// 获取用户与部门的信息
		User user = ucapSession.getUser();

		String id = request.getParameter("id");
		String isShowAll = request.getParameter("isShowAll");
		if (StringUtils.isEmpty(id)) {
			TreeNode treeNode = new TreeNode();
			treeNode.setId("88001");			
			treeNode.setName(getTopDeptName());
			treeNode.setParent(true);
			resultList.add(treeNode);

		} else {
			List<Map<String, Object>> deptList = this.getDeptList(id);
			if (deptList.size() > 0) {
				for (Map map : deptList) {

					String deptUnid = map.get("dept_unid").toString();
					if(!StrUtil.isNull(isShowAll)&&"Y".equals(isShowAll)){
						//标识展示所有数据不用做判断
					}else{
						if (user.getDepts().indexOf(deptUnid) == -1 && !"admin".equals(user.getName())) {
							continue;
						}
					}

					TreeNode treeNode = new TreeNode();
					treeNode.setId(deptUnid);
					treeNode.setName(map.get("dept_name").toString());
//					if (this.getDeptList(deptUnid).size() > 0 ) {
//						treeNode.setParent(true);
//					}
					treeNode.setParent(false);

					Map<String, String> otherData = new HashMap<String, String>();
					otherData.put("parentunid", "0");
					otherData.put("deptunid", deptUnid);
					treeNode.setOtherData(otherData);

					resultList.add(treeNode);
				}
			}

		}

		return resultList;
	}
	
	
	
	public List<TreeNode> getListTreeNode(HttpServletRequest request) {
		List<TreeNode> resultList = new ArrayList<TreeNode>();

		UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
		Session ucapSession = (Session) ucapRequest.getSession();
		// 获取用户与部门的信息
		User user = ucapSession.getUser();

		String id = request.getParameter("id");
		if (StringUtils.isEmpty(id)) {
			TreeNode treeNode = new TreeNode();
			treeNode.setId("88001");			
			treeNode.setName(getTopDeptName());
			treeNode.setParent(true);
			resultList.add(treeNode);

		} else {
			List<Map<String, Object>> deptList = this.getDeptList(id);
			if (deptList.size() > 0) {
				for (Map map : deptList) {
					String deptUnid = map.get("dept_unid").toString();
					if (user.getDepts().indexOf(deptUnid) == -1
							&& !"admin".equals(user.getName())&& !"spadmin".equals(user.getName())) {
						continue;
					}

					TreeNode treeNode = new TreeNode();
					treeNode.setId(deptUnid);
					treeNode.setName(map.get("dept_name").toString());
//					if (this.getDeptList(deptUnid).size() > 0 || this.getUserArray(deptUnid).length > 1) {
//						treeNode.setParent(true);
//					}
					treeNode.setParent(true);

					Map<String, String> otherData = new HashMap<String, String>();
					otherData.put("parentunid", "0");
					otherData.put("deptunid", deptUnid);
					treeNode.setOtherData(otherData);

					resultList.add(treeNode);
				}
			}
			String[][] userArray = this.getRoleArray(id);
			for (int i = 1; i < userArray.length; i++) {
				TreeNode treeNode = new TreeNode();
				treeNode.setId(userArray[i][0]);
				treeNode.setName(userArray[i][1]);
				resultList.add(treeNode);
			}

		}

		return resultList;
	}
	
	
	public List<TreeNode> getListPersionTreeNode(HttpServletRequest request) {
		List<TreeNode> resultList = new ArrayList<TreeNode>();

		UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
		Session ucapSession = (Session) ucapRequest.getSession();
		// 获取用户与部门的信息
		User user = ucapSession.getUser();

		String id = request.getParameter("id");
		String isShowAll = request.getParameter("isShowAll");
		if (StringUtils.isEmpty(id)) {
			TreeNode treeNode = new TreeNode();
			treeNode.setId("88001");			
			treeNode.setName(getTopDeptName());
			treeNode.setParent(true);
			resultList.add(treeNode);

		} else {
			List<Map<String, Object>> deptList = this.getDeptList(id);
			if (deptList.size() > 0) {
				for (Map map : deptList) {
					String deptUnid = map.get("dept_unid").toString();
					if(!StrUtil.isNull(isShowAll)&&"Y".equals(isShowAll)){
						//标识展示所有数据不用做判断
					}else{
						if (user.getDepts().indexOf(deptUnid) == -1 && !"admin".equals(user.getName())) {
							continue;
						}
					}
					

					TreeNode treeNode = new TreeNode();
					treeNode.setId(deptUnid);
					treeNode.setName(map.get("dept_name").toString());
//					if (this.getDeptList(deptUnid).size() > 0 || this.getPersionArray(deptUnid).length > 1) {
//						treeNode.setParent(true);
//					}
					treeNode.setParent(true);

					Map<String, String> otherData = new HashMap<String, String>();
					otherData.put("parentunid", "0");
					otherData.put("deptunid", deptUnid);
					treeNode.setOtherData(otherData);

					resultList.add(treeNode);
				}
			}
			String[][] userArray = this.getPersionArray(id);
			for (int i = 1; i < userArray.length; i++) {
				TreeNode treeNode = new TreeNode();
				treeNode.setId(userArray[i][0]);
				treeNode.setName(userArray[i][1]);
				//treeNode.setIcon(request.getContextPath()+"/core/js/ztree/zTreeStyle/img/diy/3.png");//使用自定义图标
				resultList.add(treeNode);
			}
		}

		return resultList;
	}
	

	private String getTopDeptName() {
		String topName = "组织机构";
		try {
			String sql = "select t.dept_name from ucap_dept t where t.dept_unid='88001'";
			String[][] deptName = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			if (deptName.length>1) {
				topName = deptName[1][0];
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		return topName;
	}
	
	public String[][] getPersionArray(String id) {
		String[][] roleArray = null;
		try {
			String sql = "select t.user_unid,t.user_display_name from ucap_user t where t.user_depts= '"+id+"' order by t.user_sort";
			roleArray = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return roleArray;
	}
	
	private String[][] getRoleArray(String id) {
		String[][] roleArray = null;
		try {
			String sql = "select r.role_unid,r.role_name from ucap_roledept t, ucap_dept d, ucap_role r " 
				+ "where r.role_unid(+) = t.roledept_role_unid and d.dept_unid = t.roledept_dept_unid " 
				+ "and r.role_name is not null and d.dept_unid='"+id+"'";
			roleArray = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return roleArray;
	}

	/**
	 * 获取部门List
	 * 
	 * @param id
	 *            所属部门
	 * @return
	 */
	private List<Map<String, Object>> getDeptList(String id) {
		JdbcSession jdbcSession = JdbcFactory.getSession(GlobalParameter.APP_UCAP);
		List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
		String sql = "select * from ucap_dept where dept_belongto='" + id + "' and dept_is_enabled='1' order by dept_sort";
		try {
			deptList = jdbcSession.queryForList(sql);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return deptList;
	}

	public TreeSetting getTreeSetting() {
		return null;
	}
	
	public String formatRoleIdToRoleName(String ids){
		String retValue = "";
		String[] roleIds = StrUtil.formatNull(ids).split(",");
		RoleManager roleManager = new RoleManager();
		try {
			for (int i = 0; i < roleIds.length; i++) {
				Role role = roleManager.doFindByUnid(roleIds[i]);
				if(role != null){
					//retValue += (i == 0 ? "" : ",") + role.getName();
					retValue += role.getName() + ",";
				}
			} 
			if(!StrUtil.isNull(retValue)){
				retValue = retValue.substring(0, retValue.length()-1);
			}
		} catch (ManageException e) {
		    logger.error(e);
		}
		return retValue;
	}
	
	/**
	 * 获取角色树
	 * @param request
	 * @return
	 * @authur yq
	 * @since 2012-9-27
	 */
	public List<TreeNode> getRoleListTreeNode(HttpServletRequest request) {
		List<TreeNode> resultList = new ArrayList<TreeNode>();

		UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
		Session ucapSession = (Session) ucapRequest.getSession();
		// 获取用户与部门的信息
		User user = ucapSession.getUser();

		String id = request.getParameter("id");
		if (StringUtils.isEmpty(id)) {
			TreeNode treeNode = new TreeNode();
			treeNode.setId("-1");			
			treeNode.setName("角色");
			treeNode.setParent(true);
			resultList.add(treeNode);

		} else {
			String[][] userArray = this.getRoleArray2(id);
			if (userArray.length > 0) {
				for (int i = 1; i < userArray.length; i++) {
					//RoleManager role = new RoleManager();
					TreeNode treeNode = new TreeNode();
					treeNode.setId(userArray[i][0]);
					treeNode.setName(userArray[i][1]);
					if(id.equals("-1")){
						treeNode.setParent(true);
					}
					resultList.add(treeNode);
					
				}
			}
			//String[][] userArray = this.getRoleArray(id);
		}

		return resultList;
	}
	/**
	 * 
	 * 功能说明:获取扩展功能列表
	 * @param request
	 * List<TreeNode>
	 * @author chh
	 * @Feb 1, 2013
	 */
	public List<TreeNode> getInteractionListTreeNode(HttpServletRequest request) {
		List<TreeNode> resultList = new ArrayList<TreeNode>();
		String appUnid = request.getParameter("appUnid");
		String[][] array = this.getInteractions(appUnid);
		if (array.length > 0) {
			for (int i = 1; i < array.length; i++) {
				TreeNode treeNode = new TreeNode();
				treeNode.setId(array[i][0]);
				treeNode.setName(array[i][1]);
				resultList.add(treeNode);
				
			}
		}
		return resultList;
	}
	/**
	 * 
	 * 功能说明:获取职位列表
	 * @param request
	 * @return
	 * List<TreeNode>
	 * @author chh
	 * @Feb 1, 2013
	 */
	public List<TreeNode> getPostListTreeNode(HttpServletRequest request) {
		List<TreeNode> resultList = new ArrayList<TreeNode>();
		String appUnid = request.getParameter("appUnid");
		String[][] array = this.getPost(appUnid);
		if (array.length > 0) {
			for (int i = 1; i < array.length; i++) {
				TreeNode treeNode = new TreeNode();
				treeNode.setId(array[i][0]);
				treeNode.setName(array[i][1]);
				resultList.add(treeNode);
			}
		}
		return resultList;
	}
	public List<TreeNode> getNodeListTreeNode(HttpServletRequest request) {
		List<TreeNode> resultList = new ArrayList<TreeNode>();
		FlowParams  flowParams = new FlowParams(request);
		FlowManager flowManager = new FlowManager(flowParams);
		String flowUnid = request.getParameter("flowUnid");
		Flow flow =flowManager.getFlowById(flowUnid);
		Map nodeMap =flow.getNodes();
		Iterator itr =nodeMap.keySet().iterator();
		while(itr.hasNext()){
			FlowNode node=(FlowNode)nodeMap.get(itr.next().toString()); 
			if(node.getName().equals("开始")||node.getName().equals("结束"))continue;
			TreeNode treeNode = new TreeNode();
			treeNode.setId(node.getId());
			treeNode.setName(node.getName());
			resultList.add(treeNode);
		}
		return resultList;
	}
	private String [][] getInteractions(String appUnid){
		String[][] array = null;
		String sql = "";
		try {
			sql = "select t.interaction_unid,t.interaction_name from ucap_interaction t where t.interaction_belong_to_app='"+appUnid+"'";
			array = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return array;
	}
	private String [][] getPost(String appUnid){
		String[][] array = null;
		String sql = "";
		try {
			sql = "select t.post_unid,t.post_name from ucap_post t where t.post_belong_to_app='"+appUnid+"'";
			array = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return array;
	}
	private String[][] getRoleArray2(String id) {
		String[][] roleArray = null;
		String sql = "";
		try {
			if(!StrUtil.isNull(id)){
				if(id.equals("-1")){
					sql = "select r.role_unid,r.role_name from ucap_role r where role_funid is null";
				}else{
					sql = "select r.role_unid,r.role_name from ucap_role r where role_funid='"+id+"'";
				}
			}
			roleArray = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return roleArray;
	}
}