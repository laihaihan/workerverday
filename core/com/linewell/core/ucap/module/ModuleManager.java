package com.linewell.core.ucap.module;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.ucap.bussiness.permission.BussinessPermission;
import com.linewell.core.ucap.bussiness.permission.BussinessPermissionManager;
import com.linewell.core.ucap.menu.UcapMenuLeaf;
import com.linewell.core.ucap.menu.UcapMenuLeafBusiness;
import com.linewell.core.ucap.role.RoleManager;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.platform.authorized.module.Module;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.StringUtil;

/**
 * <p>
 * 	平台模块辅助类
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-2-3
 * @version 1.00
 * <p>
 * 	Copyright (c) 2011 www.linewell.com
 * </p>
 */
public class ModuleManager {
    private static final Logger logger = Logger.getLogger(ModuleManager.class);
	
    private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_MODULE","MODULE_UNID",GlobalParameter.APP_UCAP);

	public boolean doSave(CoreModule coreModule){
		return dbObjectManager.doSave(coreModule);
	}
	
	public boolean doUpdate(CoreModule coreModule){
		return dbObjectManager.doUpdate(coreModule);
	}
	
	public CoreModule doFindBeanByKey(String keyValue){
		return (CoreModule)dbObjectManager.doFindBeanByKey(new CoreModule(), keyValue);
	}

	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new CoreModule(), condition, objs);
	}
	
	
/*    
    *//**
     * 更新模块子菜单信息
     * @param moduleUnid 主模块唯一标识
     * @param childrenUnid 子菜单唯一标识
     * @return
     *//*
    public boolean updateModuleChildrens(String moduleUnid,String childrenUnid){
    	
    }*/
    
    
	/**
	 * 获取菜单下面一级模块列表
	 * @param menuunid 菜单id
	 * @param request HttpServletRequest
	 * @return  list 链表 内嵌Module对象
	 */
	public List<Module> getModuleListByPunid(HttpServletRequest request,String menuunid){
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String result = new UiModule().getModuleJson(menuunid,request.getContextPath(), ucapSession);
		
		//对象转换，便于使用
		JSONArray jsonArray=JSONArray.fromObject(result);
		List<Module> moduleList = new ArrayList<Module>();
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject iObj = jsonArray.getJSONObject(i);
			Module module = new Module();
			module.setUnid(iObj.get("id").toString());//菜单id
			module.setName(iObj.get("name").toString());//菜单名称
 			String children = "";
			if(null != iObj.get("children")){
				children = iObj.get("children").toString();
			}
			module.setChildrens(children);
			moduleList.add(module);
		}
		return moduleList;
	}
	

	/**
	 * 获取菜单下面一级模块列表
	 * @param menuunid 菜单id
	 * @param request HttpServletRequest
	 * @return  list 链表 内嵌Module对象
	 */
	public List<ModuleLeaf> getModuleListByPunid(String menuunid){
		List<ModuleLeaf>  leafList = new ArrayList<ModuleLeaf>();
		
 		//leafunid.content找到到module记录
		UcapMenuLeafBusiness ucapMenuLeafBusiness= new UcapMenuLeafBusiness();
		UcapMenuLeaf ucapMenuLeaf = ucapMenuLeafBusiness.doFindBeanByKey(menuunid);
		if(null != ucapMenuLeaf){
			//module.childen找到所有子记录		
			ModuleManager moduleManager = new ModuleManager();
			CoreModule coreModule= moduleManager.doFindBeanByKey(ucapMenuLeaf.getLeaf_content());
			if(null != coreModule){
				String leafStr = coreModule.getModule_childrens();
				if(!StrUtil.isNull(leafStr)){
					String[] leafSplit = leafStr.split(",");
					for (int i = 0; i < leafSplit.length; i++) {
						ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
						leafList.add(moduleLeafManager.doFindBeanByKey(leafSplit[i]));
					}
				}
			}
		}
		return leafList;
	}
	
	
	/**
	 * 获取三级模块列表
	 * @param menuunid 菜单id
	 * @param request HttpServletRequest
	 * @return  list 链表 内嵌Module对象
	 */
	public List<Module> getThreeModuleListByPunid(HttpServletRequest request,String menuunid){
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String result = new UiModule().getModuleJson(menuunid,request.getContextPath(), ucapSession);
		
		//对象转换，便于使用
		JSONArray jsonArray=JSONArray.fromObject(result);
		List<Module> moduleList = new ArrayList<Module>();
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject iObj = jsonArray.getJSONObject(i);
			Module module = new Module();
			module.setUnid(iObj.get("id").toString());//菜单id
			module.setName(iObj.get("name").toString());//菜单名称
			System.out.println(iObj.get("children")); 
			
			moduleList.add(module);
		}
		return moduleList;
	}
	
	
	
	
	/**
	 * 获取json格式的系统菜单树
	 * @param leafId
	 * @param belongToApp
	 * @param jndi
	 * @return
	 */
	public String getModuleTreeByLeafAndApply(String leafId,String belongToApp,String jndi){

		//1.定义返回
		JSONArray jsonArray = new JSONArray();
		try {
			//当leafId 为空 获取Tree root
			if(StringUtils.isEmpty(leafId)){
				String sqlModule = "select module_unid,t.module_display_name,t.module_childrens from ucap_module t where t.module_belong_to_app='"+belongToApp+"'";
				Object[][] rs = JDBCTool.doSQLQuery(jndi, sqlModule, new Object[0]);
				for (int i = 1; i < rs.length; i++) {
					JSONObject json = new JSONObject();
					json.put("unid", rs[i][0].toString());
					json.put("name", rs[i][1].toString());
					json.put("leafId", rs[i][2].toString());
					
					//是否父节点
					if(StringUtils.isNotEmpty(rs[i][2].toString())){
						json.put("isParent",true);
					}
					jsonArray.add(json);
				}
			}
			//当leafId有值 获取底下模块节点UCAP_MODULE_LEAF
			else{
				String children = StringUtil.toString(leafId.split(","),true);
				String sqlModuleLeaf = "select t.leaf_unid,t.leaf_name,t.leaf_childrens from ucap_module_leaf t  where t.leaf_punid in  ("+children+")";
				Object[][] rs = JDBCTool.doSQLQuery(jndi, sqlModuleLeaf, new Object[0]);
				for (int i = 1; i < rs.length; i++) {
					JSONObject json = new JSONObject();
					json.put("unid", rs[i][0].toString());
					json.put("name", rs[i][1].toString());
					json.put("leafId", rs[i][2].toString());
					
					//是否父节点
					if(StringUtils.isNotEmpty(rs[i][2].toString())){
						json.put("isParent",true);
					}
					jsonArray.add(json);
				}
			}				
		} catch (SQLException e) {
		    logger.error(e);
		}

		return jsonArray.toString();
	
	}
	
	

	/**
	 * 获取json格式的系统菜单树
	 * @param leafId
	 * @param belongToApp
	 * @param jndi
	 * @return
	 */
	public String getModuleTreeByLeafAndApplyAndRoleUnid(String leafId,String belongToApp,String jndi,String roleunid){
		RoleManager roleManager = new RoleManager();
		String[][] modulers = roleManager.getRoleModuleList(roleunid);
		//1.定义返回
		JSONArray jsonArray = new JSONArray();
		try {
			//当leafId 为空 获取Tree root
			if(StringUtils.isEmpty(leafId)){
				String sqlModule = "select module_unid,t.module_display_name,t.module_childrens ,leaf_unid from ucap_module t ," +
						" ucap_menu_leaf l where t.module_unid  = l.leaf_content " +
						" and t.module_belong_to_app='"+belongToApp+"'";
				Object[][] rs = JDBCTool.doSQLQuery(jndi, sqlModule, new Object[0]);
				for (int i = 1; i < rs.length; i++) {
					JSONObject json = new JSONObject();
					json.put("unid", rs[i][3].toString());
					json.put("name", rs[i][1].toString());
					json.put("leafId", rs[i][2].toString());
					if(isCheck(rs[i][3].toString(),modulers)){
						json.put("checked", true);
					}
					
					//是否父节点
					if(StringUtils.isNotEmpty(rs[i][2].toString())){
						json.put("isParent",true);
					}
					jsonArray.add(json);
				}
			}
			//当leafId有值 获取底下模块节点UCAP_MODULE_LEAF
			else{
				String children = StringUtil.toString(leafId.split(","),true);
				String sqlModuleLeaf = "select t.leaf_unid,t.leaf_name,t.leaf_childrens from ucap_module_leaf t  where t.leaf_punid in  ("+children+")";
				Object[][] rs = JDBCTool.doSQLQuery(jndi, sqlModuleLeaf, new Object[0]);
				for (int i = 1; i < rs.length; i++) {
					JSONObject json = new JSONObject();
					json.put("unid", rs[i][0].toString());
					json.put("name", rs[i][1].toString());
					json.put("leafId", rs[i][2].toString());

					if(isCheck(rs[i][0].toString(),modulers)){
						json.put("checked", true);
					}
					
					//是否父节点
					if(StringUtils.isNotEmpty(rs[i][2].toString())){
						json.put("isParent",true);
					}
					jsonArray.add(json);
				}
			}
		} catch (SQLException e) {
		    logger.error(e);
		}

		return jsonArray.toString();
	
	}
	
	/**
	 * 是否包含在模块权限里面
	 * @param moduleunid
	 * @param rs
	 * @return
	 */
	public boolean  isCheck(String moduleunid , String[][] rs){
		if(null != rs && rs.length>1){
			for (int i = 1; i < rs.length; i++) {
				if(rs[i][0].equals(moduleunid)){
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * 权限重新赋予
	 * @param selectedNodesUnids
	 * @param roleunid
	 * @param appunid
	 * @return
	 */
	public boolean saveBussinessModuel(String selectedNodesUnids,String roleunid,String appunid){
		BussinessPermissionManager bussinessPermissionaManager = new BussinessPermissionManager();
		//删除旧数据
		bussinessPermissionaManager.doDeleteByCondition(" bp_subjectid = '"+roleunid+"'");
		boolean flag = true;
		//写入新赋予的权限列表
		String[] selectedNodesUnidArrat = selectedNodesUnids.split(",");
		ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
		for (int i = 0; i < selectedNodesUnidArrat.length; i++) {
			if(!StrUtil.isNull(selectedNodesUnidArrat[i])){
				//是否在module_leaf表里
				//ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(selectedNodesUnidArrat[i]);
				//if(null != moduleLeaf){
					BussinessPermission bussinessPermission = new BussinessPermission();
					bussinessPermission.setBp_unid(new UNIDGenerate().getUnid());
					bussinessPermission.setBp_belong_to_app(appunid);
					bussinessPermission.setBp_mode("0");
					bussinessPermission.setBp_objectid(selectedNodesUnidArrat[i]);
					bussinessPermission.setBp_subjectid(roleunid);
					flag =  flag && bussinessPermissionaManager.doSave(bussinessPermission);
				//}else{//不存在则为菜单
			//	}
			}
		}
		return flag;
	}
}
