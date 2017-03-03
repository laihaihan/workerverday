package com.linewell.core.ucap.module;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.UNIDGenerate;

/**
 * <p>
 * SubButton数据库操作
 * </p>
 * 
 * @author: zjianhui@linewell.com
 * @version 1.0.0 2012-02-09 16:56:56
 *
 */
public class ModuleLeafManager {
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_MODULE_LEAF","LEAF_UNID",GlobalParameter.APP_UCAP);

	public boolean doSave(ModuleLeaf moduleLeaf){
		return dbObjectManager.doSave(moduleLeaf);
	}
	
	public boolean doUpdate(ModuleLeaf moduleLeaf){
		return dbObjectManager.doUpdate(moduleLeaf);
	}
	
	public ModuleLeaf doFindBeanByKey(String keyValue){
		return (ModuleLeaf)dbObjectManager.doFindBeanByKey(new ModuleLeaf(), keyValue);
	}

	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new ModuleLeaf(),condition,objs);
	}

	public boolean doDel(String unid){
		return dbObjectManager.doDeleteByCondition(" LEAF_UNID='"+unid+"'");
	}
	
	/**
	 * 生成模块
	 * @author zjianhui@linewell.com
	 * @date: Jul 8, 2011 
	 * <p>
	 * @param moduleName
	 * @param parentModuleID
	 * @return
	 * </p>
	 */
	public String createModule(String moduleName,String parentModuleID,String viewUrl){
		//生成新的模块
		ModuleLeaf moduleLeaf = new ModuleLeaf();
		moduleLeaf.setLeaf_unid(new UNIDGenerate().getUnid()); 
		moduleLeaf.setLeaf_name(moduleName);
		moduleLeaf.setLeaf_type("02");
		moduleLeaf.setLeaf_open_type("03");
		moduleLeaf.setLeaf_punid(moduleLeaf.getLeaf_unid());
		moduleLeaf.setLeaf_contents("view.action?fn=grid&viewId="+viewUrl);
		moduleLeaf.setLeaf_version("2");
		moduleLeaf.setLeaf_default_open("0");
		moduleLeaf.setLeaf_execute_type("01");
		
		doSave(moduleLeaf);

		//根据parentModuleID找到父亲项目id，讲新模块id更新到父模块
		ModuleLeaf moduleLeafFathar = doFindBeanByKey(parentModuleID);
		if(null != moduleLeafFathar){//不存在则为一级菜单，
			moduleLeafFathar.setLeaf_childrens(moduleLeafFathar.getLeaf_childrens()+","+moduleLeaf.getLeaf_unid());
			doUpdate(moduleLeafFathar);
		}else{
			ModuleManager moduleManager = new ModuleManager();
			CoreModule coreModule = moduleManager.doFindBeanByKey(parentModuleID);
			coreModule.setModule_childrens(coreModule.getModule_childrens() +","+ moduleLeaf.getLeaf_unid());
			moduleManager.doUpdate(coreModule);
		}
		
		return moduleLeaf.getLeaf_unid();
	}
}
