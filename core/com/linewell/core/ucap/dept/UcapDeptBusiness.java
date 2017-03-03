package com.linewell.core.ucap.dept;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.tree.TreeNode;
import com.linewell.core.ucap.deptrelation.UcapDeptRelation;
import com.linewell.core.ucap.deptrelation.UcapDeptRelationManager;
import com.linewell.core.ucap.user.UserManager;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.cache.dept.Dept;
import com.linewell.ucap.platform.cache.user.User;

public class UcapDeptBusiness {
	
	private static Logger log = Logger.getLogger(UcapDeptBusiness.class);
	private UcapDeptManager manager = new UcapDeptManager();
	private UserManager userManager = new UserManager();
	private UcapDeptRelationManager relationManager = new UcapDeptRelationManager();
	
	/**
	 * 功能：返回當前用戶部門父级部门的所有子部门树形节点列表
	 * 
	 * @param id
	 * @return
	 */
	public static List getAllDepts(String id) {
		List deptList = new ArrayList();
		String sql = "select dept_unid,dept_name from ucap_dept  start with dept_unid='"+id+"' connect by prior dept_unid=dept_belongto ";
		sql += " order by dept_sort";
		try {
			String[][] result = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			for(int i=1;i<result.length;i++){
				TreeNode node = new TreeNode();
				node.setId(result[i][0]); // 组织UNID
				node.setValue(result[i][1]); // 组织名称
				deptList.add(node);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return deptList;
	}
	
	/**
	 * 功能：返回部门id的sql条件语句(包含子部门)
	 * 
	 * @param id
	 * @return
	 */
	public static String getSqlIds(String id) {
		String dept_unids = "";
		List deptList = getAllDepts(id);
		for(int i=0;i<deptList.size();i++){
			TreeNode node = (TreeNode)deptList.get(i);
			dept_unids += (StrUtil.isNull(dept_unids) ? "" : ",") + ("'" + node.getId() + "'");
		}
		return dept_unids;
	}
	
	/**
	 * 获取部门List
	 * 
	 * @param id
	 *            所属部门
	 * @return
	 */
	public List<Map<String, Object>> getDeptList(String id) {
		String sql ="select * from ucap_dept where dept_belongto='"+id+"' and dept_is_enabled='1' order by dept_sort";

		List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
		try {
			JdbcSession jdbcSession = JdbcFactory.getSession(GlobalParameter.APP_UCAP);
			deptList = jdbcSession.queryForList(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return deptList;
	}
	
	/**
	 * 
	 * 功能说明:根据用户所属部门获取所管理部门树形，admin除外得到整个部门树
	 * @param id	部门主键
	 * @param user	当前用户对象
	 * @param app_unid 应用系统主键
	 * @return
	 * List<TreeNode>
	 * @author chh
	 * @Jun 11, 2012
	 */
	public List<TreeNode> getListTreeNode(String id, String app_unid, User user) {
		List<TreeNode> resultList = new ArrayList<TreeNode>();
		if (StringUtils.isEmpty(id)) {
			resultList.add(this.getRootNode(app_unid, user));
		} else {
			String condition = " and dept_unid in (select r.dept_unid from ucap_dept_relation r where r.app_unid = '" + app_unid + "')";
			List<Map<String, Object>> deptList = this.getDeptList(id, condition);
			if (deptList.size() > 0) {
				for (Map map : deptList) {
					String deptUnid = null != map.get("dept_unid") ? map.get("dept_unid").toString() : "";
					String deptName = null != map.get("dept_name") ? map.get("dept_name").toString() : "";
					String belongto = null != map.get("dept_belongto") ? map.get("dept_belongto").toString() : "";

					TreeNode treeNode = new TreeNode();
					treeNode.setId(deptUnid);
					treeNode.setName(deptName);
					treeNode.setValue(belongto);
					List<Map<String, Object>> subDeptList = this.getDeptList(deptUnid);
					if (subDeptList.size() > 0) {
						treeNode.setParent(true);
						//加载子节点
						/*for(Map subMap : subDeptList){
							String subDeptUnid = map.get("dept_unid").toString();
							resultList.addAll(this.getListTreeNode(subDeptUnid,user));
						}*/
					}

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
	
	/**
	 * 获取根节点
	 * 
	 * @param user 当前用户对象
	 * @param app_unid 应用系统主键
	 * @return
	 */
	public TreeNode getRootNode(String app_unid, User user){
		TreeNode treeNode = new TreeNode();
		String condition = "";
		//当前用户为管理员
		if ("admin".equals(user.getName())) {
			condition = "dept_unid in (select r.dept_unid from ucap_dept_relation r where r.app_unid = '" + app_unid + "') and dept_belongto is null order by dept_sort asc";
		} 
		//当前用户为非管理员
		else {
			condition = "dept_unid in (select r.dept_unid from ucap_dept_relation r where r.app_unid = '" + app_unid + "') and dept_unid = '" + user.getEffectiveDept() + "' order by dept_sort asc";
		}
		UcapDept ucapDept = manager.doFindBeanByCondition(condition, null);
		if (ucapDept != null) {
			treeNode.setId(ucapDept.getDept_unid());			
			treeNode.setName(ucapDept.getDept_name());
			condition = "dept_unid in (select r.dept_unid from ucap_dept_relation r where r.app_unid = '" + app_unid + "') and dept_belongto = '" + ucapDept.getDept_unid() + "'";
			List deptLsit = manager.doFindListByCondition(condition, null);
			if (!ListUtil.isNull(deptLsit)) {
				treeNode.setParent(true);
			} else {
				treeNode.setParent(false);
			}
		} else {
			treeNode.setId("");			
			treeNode.setName("当前无可选项");
			treeNode.setParent(false);
		}
		/*TreeNode treeNode = new TreeNode();
		String condition = "dept_unid = '"+user.getEffectiveDept()+"' and app_unid = '"+app_unid+"'";
		UcapDeptRelation deptRelation = relationManager.doFindBeanByCondition(condition, null);
		if (deptRelation == null) {
			treeNode.setId("");			
			treeNode.setName("当前无可选项");
			treeNode.setParent(false);
			return treeNode;
		}
		if(!"admin".equals(user.getName())){
			treeNode.setId(user.getEffectiveDept());			
			treeNode.setName(this.getDeptName(user.getEffectiveDept()));
			List<Map<String, Object>> subDeptList = this.getDeptList(user.getEffectiveDept());
			if (subDeptList.size() > 0) {
				treeNode.setParent(true);
			}
		}else{
			treeNode.setId(GlobalParameter.WAS_TOPDEPTUNID);			
			treeNode.setName(this.getTopDeptName());
			treeNode.setParent(true);
		}*/
		return treeNode;
	}
	
	/**
	 * 
	 * 功能说明:获取最顶级部门名称
	 * @return
	 * String
	 * @author chh
	 * @Jun 11, 2012
	 */
	public String getTopDeptName() {
		String topName = "组织机构";
		topName = this.getDeptName(GlobalParameter.WAS_TOPDEPTUNID);
		return topName;
	}
	
	/**
	 * 
	 * 功能说明:根据部门unid 获取部门名称
	 * @param deptUnid 	-部门unid
	 * @return
	 */
	public String getDeptName(String deptUnid) {
		String deptName = "组织机构";
		try {
			String sql = "select t.dept_name from ucap_dept t where t.dept_unid='"+deptUnid+"'";
			String[][] result = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			if (result.length>1) {
				deptName = result[1][0];
			}
		} catch (SQLException e) {
			e.printStackTrace();
			log.error(e.getMessage(),e);
		}
		return deptName;
	}
	
	/**
	 * 
	 * 功能说明:根据部门unid 获取部门编码
	 * @param deptUnid 	-部门unid
	 * @return
	 */
	public String getDeptCode(String deptUnid) {
		String deptCode = "";
		try {
			String sql = "select t.dept_serial_number from ucap_dept t where t.dept_unid='"+deptUnid+"'";
			String[][] result = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			if (result.length>1) {
				deptCode = result[1][0];
			}
		} catch (SQLException e) {
			e.printStackTrace();
			log.error(e.getMessage(),e);
		}
		return deptCode;
	}
	
	/**
	 * 
	 * 功能说明:根据部门编码获取部门
	 * @param deptCode 	-部门编码
	 * @return
	 */
	public static Dept getDeptByCode(String deptCode) {
		Dept dept = null;
		try {
			String sql = "select dept_unid,dept_name from ucap_dept where dept_serial_number='"+deptCode+"'";
			String[][] result = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			if (result.length > 1) {
				dept = new Dept();
				dept.setUnid(result[1][0]);
				dept.setName(result[1][1]);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			log.error(e.getMessage(),e);
		}
		return dept;
	}
	
	
	
	/**
	 * 获取部门List
	 * 
	 * @param id
	 *            所属部门
	 * @return
	 */
	public List<Map<String, Object>> getDeptList(String id,String contidion) {
		String sql ="select * from ucap_dept where dept_belongto='"+id+"'";
		if(!StrUtil.isNull(contidion)){
			sql += contidion;
		}
		sql += " and dept_is_enabled='1' order by dept_sort";

		List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
		try {
			JdbcSession jdbcSession = JdbcFactory.getSession(GlobalParameter.APP_UCAP);
			deptList = jdbcSession.queryForList(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return deptList;
	}

	/**
	 * 根据主键找单个对象
	 */
	public UcapDept doFindBeanByKey(String keyValue){
		return (UcapDept)manager.doFindBeanByKey(keyValue);
	}
	
	/**
     * 新增
     */
    public boolean doSave(UcapDept ucapDept) {
        return manager.doSave(ucapDept);
    }

    /**
     * 更新
     */
    public boolean doUpdate(UcapDept ucapDept) {
        return manager.doUpdate(ucapDept);
    }
    
    /**
     * 根据查询条件删除
     */
    public boolean doDeleteByCondition(String condition, Object[] objs) {
        return manager.doDeleteByCondition(condition, objs);
    }
	
	/**
	 * 获取上级部门、部门领导、部门管理员与隶属部门
	 * @param dept 部门对象
	 * @return Map<String, String>
	 */
	public Map<String, String> getChineseName(UcapDept dept){
		Map<String, String> nameMap = new HashMap<String, String>();
		//获取上级部门
		nameMap.put("dept_belongto_name", this.getDeptNameByDeptUnid(dept.getDept_belongto()));
		//获取部门领导
		nameMap.put("dept_leaders_name", this.getUserNameByUserUnid(dept.getDept_leaders()));
		//获取部门管理员
		nameMap.put("dept_admins_name", this.getUserNameByUserUnid(dept.getDept_admins()));
		//获取隶属部门
		nameMap.put("dept_underdept_name", this.getDeptNameByDeptUnid(dept.getDept_underdept()));
		return nameMap;
	}
	
	/**
	 * 通过部门的unid，获取部门的名称
	 * @param deptUnid 部门的unid（多个以逗号隔开）
	 * @return String （存在多个以逗号隔开的形式返回）
	 */
	public String getDeptNameByDeptUnid(String deptUnid){
		List<UcapDept> ucapDeptList = null;//自定义部门对象集合
		UcapDept ucapDept = null;//自定义部门对象
		if (!StrUtil.isNull(deptUnid)) {
			deptUnid = "dept_unid in (" + StrUtil.toSqlIds(deptUnid, ",") + ")";
			ucapDeptList = manager.doFindListByCondition(deptUnid, null);
			if (!ListUtil.isNull(ucapDeptList)) {
				deptUnid = "";
				for (int i = 0; i < ucapDeptList.size(); i++) {
					ucapDept = ucapDeptList.get(i);
					if (ucapDept != null) {
						deptUnid += (ucapDept.getDept_name() + ",");
					}
				}
				if (!StrUtil.isNull(deptUnid)) {
					deptUnid = deptUnid.substring(0, deptUnid.length() - 1);
				}
			} else {
				deptUnid = "";
			}
		} else {
			deptUnid = "";
		}
		return deptUnid;
	}
	/**
	 * 通过用户的unid，获取用户的名称
	 * @param userUnid 用户的unid（多个以逗号隔开）
	 * @return String （存在多个以逗号隔开的形式返回）
	 */
	public String getUserNameByUserUnid(String userUnid){
		List<com.linewell.core.ucap.user.User> userList = null;//自定义用户对象集合
		com.linewell.core.ucap.user.User user = null;//自定义用户对象
		if (!StrUtil.isNull(userUnid)) {
			userUnid = "user_unid in (" + StrUtil.toSqlIds(userUnid, ",") + ")";
			userList = userManager.doFindListByCondition(userUnid, null);
			if (!ListUtil.isNull(userList)) {
				userUnid = "";
				for (int i = 0; i < userList.size(); i++) {
					user = userList.get(i);
					if (user != null) {
						userUnid += (user.getUser_display_name() + ",");
					}
				}
				if (!StrUtil.isNull(userUnid)) {
					userUnid = userUnid.substring(0, userUnid.length() - 1);
				}
			} else {
				userUnid = "";
			}
		} else {
			userUnid = "";
		}
		return userUnid;
	}
}
