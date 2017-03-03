

package com.linewell.core.platform;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.tree.TreeNode;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.cache.dept.Dept;
import com.linewell.ucap.platform.cache.dept.DeptManager;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucapx.dept.DeptApi;

/**
 *功能说明：对系统平台提供的部门的相关操作进行重新封装
 *<P></P>
 *@author chh
 *@since 2012
 *
 */
public class DeptInfoAPI {
	private static Logger log = Logger.getLogger(DeptInfoAPI.class);

	
	/**
	 * 功能：返回當前用戶部門父级部门的所有子部门树形节点列表
	 * 
	 * @param punid
	 * @param systemId
	 * @return
	 */
	public static List getAllDepts(String systemId) {
		List deptList = new ArrayList();
		DeptManager dm = new DeptManager();
		List deptIds = dm.getDeptIds(systemId);
		deptIds = ListUtil.filterRepeat(deptIds);// 过滤掉重复项
		for (int i = 0; i < deptIds.size(); i++) {
			try {
				Dept dept = dm.doFindByUnid(deptIds.get(i).toString());
				TreeNode node = new TreeNode();
				node.setId(dept.getUnid()); // 组织UNID
				node.setValue(dept.getName()); // 组织名称
				deptList.add(node);
			} catch (Exception e) {
			    log.error(e);
			}
		}
		return deptList;
	}
	
	/**
	 * 获取部门List
	 * 
	 * @param id
	 *            所属部门
	 * @return
	 */
	public static List<Map<String, Object>> getDeptList(String id) {
		String sql ="select * from ucap_dept where dept_belongto='"+id+"' and dept_is_enabled='1' order by dept_sort ";

		List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
		try {
			JdbcSession jdbcSession = JdbcFactory.getSession(GlobalParameter.APP_UCAP);
			deptList = jdbcSession.queryForList(sql);
		} catch (SQLException e) {
		    log.error(e);
		}
		return deptList;
	}
	/**
	 * 
	 * 功能说明:根据用户所属部门获取所管理部门树形，admin除外得到整个部门树
	 * @param id
	 * @param user
	 * @return
	 * List<TreeNode>
	 * @author chh
	 * @Jun 11, 2012
	 */
	public static List<TreeNode> getListTreeNode(String id,User user) {
		
		List<TreeNode> resultList = new ArrayList<TreeNode>();
		// 获取用户与部门的信息
		
		if (StringUtils.isEmpty(id)) {
			if(!"admin".equals(user.getName())){
				TreeNode treeNode = new TreeNode();
				treeNode.setId(user.getEffectiveDept());			
				treeNode.setName(getDeptName(user.getEffectiveDept()));
				List<Map<String, Object>> subDeptList = getDeptList(user.getEffectiveDept());
				if (subDeptList.size() > 0) {
					treeNode.setParent(true);
				}
				resultList.add(treeNode);
			}else{
				TreeNode treeNode = new TreeNode();
				treeNode.setId(GlobalParameter.WAS_TOPDEPTUNID);			
				treeNode.setName(getTopDeptName());
				treeNode.setParent(true);
				resultList.add(treeNode);
			}

		} else {
			
			List<Map<String, Object>> deptList = getDeptList(id);
			if (deptList.size() > 0) {
				String deptUnids =getAllChildDepts(user.getEffectiveDept());
				for (Map map : deptList) {
					String deptUnid = null != map.get("dept_unid") ? map.get("dept_unid").toString() : "";
					String deptName = null != map.get("dept_name") ? map.get("dept_name").toString() : "";
					String belongto = null != map.get("dept_belongto") ? map.get("dept_belongto").toString() : "";
					/*
					if (user.getDepts().indexOf(deptUnid) == -1 && !"admin".equals(user.getName())) {
						continue;
					}*/
					
					if(!isChildDept(deptUnids, deptUnid) && ! UserInfoAPI.isAdmin(user.getName())){
						continue;
					}

					TreeNode treeNode = new TreeNode();
					treeNode.setId(deptUnid);
					treeNode.setName(deptName);
					treeNode.setValue(belongto);
					List<Map<String, Object>> subDeptList = getDeptList(deptUnid);
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
	 * 
	 * 功能说明:获取当前部门所有的子部门unid
	 * @param deptUnid
	 * @return
	 * String
	 * @author chh
	 * @Jun 11, 2012
	 */
	public static String getAllChildDepts(String deptUnid){
		String sql="select dept_unid from ucap_dept t where  dept_is_enabled='1' START WITH t.dept_unid ='"+deptUnid+"'"
					+" CONNECT BY PRIOR dept_unid = t.dept_belongto";
		try {
			String [][]ret =JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			if(ret.length>1){
				StringBuffer sb =new StringBuffer();
				for(int i=1;i<ret.length;i++){
					sb.append(ret[i][0]+",");
				}
				return sb.toString();
			}
			
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		return deptUnid;
	}
	/**
	 * 
	 * 功能说明:判断部门是否是该部门的子部门
	 * @param deptUnids
	 * @param childUnid
	 * @return
	 * boolean
	 * @author chh
	 * @Jun 11, 2012
	 */
	public static boolean isChildDept(String deptUnids,String childUnid){
		return deptUnids.contains(childUnid);
	}
	/**
	 * 
	 * 功能说明:获取最顶级部门名称
	 * @return
	 * String
	 * @author chh
	 * @Jun 11, 2012
	 */
	public static String getTopDeptName() {
		String topName = "组织机构";
		topName =getDeptName(GlobalParameter.WAS_TOPDEPTUNID);
		return topName;
	}
	/**
	 * 
	 * 功能说明:根据部门unid 获取部门名称
	 * @param deptUnid 	-部门unid
	 * @return
	 * String
	 * @author chh
	 * @Jun 11, 2012
	 */
	public static String getDeptName(String deptUnid) {
		String topName = "组织机构";
		try {
			String sql = "select t.dept_name from ucap_dept t where t.dept_unid='"+deptUnid+"'";
			String[][] deptName = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			if (deptName.length>1) {
				topName = deptName[1][0];
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		return topName;
	}
	/**
	 * 
	 * 功能说明:根据用户获取满足ztree的json数据，admin则获取整个部门树
	 * @return
	 * String
	 * @author chh
	 * @Jun 11, 2012
	 */
	public static String getDataForZTree(User user){
		JSONArray array = new JSONArray();
		try{
			String sql = "select dept_unid,dept_name,dept_belongto from ucap_dept where dept_is_enabled='1' ";
			if(!UserInfoAPI.isAdmin(user.getName())){
				sql += "and dept_unid ='"+user.getEffectiveDept()+"' ";
			}
			sql += "order by dept_sort";
			String[][] depts = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,sql);
			if(depts.length>1)
			for(int i=1;i<depts.length;i++){
				JSONObject json = new JSONObject();
				json.put("id",depts[i][0]);
				json.put("name",depts[i][1]);
				json.put("pId",depts[i][2]);
				if(GlobalParameter.WAS_TOPDEPTUNID.equals(depts[i][0]) || user.getEffectiveDept().equals(depts[i][0])){
					json.put("open",true);
				}
				array.add(json);
			}
		}catch(Exception e){
			log.error(e.getMessage(),e);
		}
		return array.toString();
	}
	/**
	 * 
	 * 功能说明:获取整个ztree部门树
	 * @return  满足ztree要求的json数据
	 * String
	 * @author chh
	 * @Jun 14, 2012
	 */
	public static  String getDataForZTree(){
		JSONArray array = new JSONArray();
		try{
			String sql = "select dept_unid,dept_name,dept_belongto from ucap_dept ";
			sql += "where dept_is_enabled='1' order by dept_sort";
			
			String[][] depts = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,sql);
			if(depts.length>1)
			for(int i=1;i<depts.length;i++){
				JSONObject json = new JSONObject();
				json.put("id",depts[i][0]);
				json.put("name",depts[i][1]);
				json.put("pId",depts[i][2]);
				if(GlobalParameter.WAS_TOPDEPTUNID.equals(depts[i][0])){
					json.put("open",true);
					//json.put("nocheck",true);
				}
				array.add(json);
			}
		}catch(Exception e){
			log.error(e.getMessage(),e);
		}
		return array.toString();
	}
	/**
	 * 
	 * 功能说明:根据unids获取部门名称列表
	 * @param unids
	 * @return String
	 * @author chh
	 * @Aug 30, 2012
	 */
	public static String getDeptNamesByUnids(String unids){
		String ids=StrUtil.toSqlIds(unids, ",");
		String sql ="select dept_name from ucap_dept t where t.dept_unid in("+ids+")";
		String[][] depts=null;
		try {
			depts = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		if(depts.length>1){
			return StrUtil.arrayToString(depts, ",");
		}
		return "";
	}
	/**
	 * 
	 * 功能说明:根据部门编码获取部门的unid
	 * @param deptCode
	 * @return String
	 * @author chh
	 * @Aug 30, 2012
	 */
	public static String getDeptUnidByCode(String deptCode){
		String sql ="select dept_unid from ucap_dept t where t.dept_serial_number ='"+deptCode+"'";
		String [][] dept =null;
		try {
			dept = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		if(dept.length>1){
			return dept[1][0];
		}
		return "";
	}
	public static String getDeptCodeByUnid(String deptUnid){
		String sql ="select dept_serial_number from ucap_dept t where t.dept_unid ='"+deptUnid+"'";
		String [][] dept =null;
		try {
			dept = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		if(dept.length>1){
			return dept[1][0];
		}
		return "";
	}
	/**
	 * 
	 * 功能说明:根据部门编码获取Dept对象
	 * @param code
	 * @return Dept
	 * @author chh
	 * @Aug 30, 2012
	 */
	public static Dept getDeptByCode(String code){
		DeptApi api =new DeptApi();
		String deptUnid =getDeptUnidByCode(code);
		return api.getDept(deptUnid);
	}
	/**
	 * 
	 * 功能说明:根据unid获取部门对象
	 * @param unid
	 * @author chh
	 * @Sep 11, 2012
	 */
	public static Dept getDeptByUnid(String unid){
		DeptApi api =new DeptApi();
		return api.getDept(unid);
	}
}

