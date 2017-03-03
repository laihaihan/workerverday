package com.linewell.core.ucap.menu;

import java.util.List;

import com.linewell.core.ucap.module.CoreModule;
import com.linewell.core.ucap.module.ModuleLeaf;
import com.linewell.core.ucap.module.ModuleLeafManager;
import com.linewell.core.ucap.module.ModuleManager;
import com.linewell.core.util.StrUtil;


/**
 * <p>
 *  业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-07-31 11:55:00
 *
 */
public class UcapMenuLeafBusiness {
	public static final String ADMINMENUUNID = "85FF9BFFB1927F4176C1CD8959862EBE";//后台管理菜单项(保存在ucap_module中)

	UcapMenuLeafManager manager = new UcapMenuLeafManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(UcapMenuLeaf ucapmenuleaf){
		return manager.doSave(ucapmenuleaf);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UcapMenuLeaf ucapmenuleaf){
		return manager.doUpdate(ucapmenuleaf);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public UcapMenuLeaf doFindBeanByKey(String keyValue){
		return manager.doFindBeanByKey(keyValue);
	}
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List<UcapMenuLeaf> doFindListByCondition(String condition,Object[] objs){
		return manager.doFindListByCondition(condition,objs);
	}
	
		
	/**
	 * 根据主键删除对象
	 */
	public boolean doDeleteByCondition(String condition,Object[] objs){
		return manager.doDeleteByCondition(condition,objs);
	}
	
	
	/**
	 * 取出系统相关所有模块id
	 * @param appunid
	 * @return
	 */
	public String getAllModuleAndModuleLeaf(String appunid){
		String ids = "";
		//取出所有的module
		ModuleManager moduleManager = new ModuleManager();
		ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
		Object[] objs = new Object[1];
		objs[0] = appunid;
		List<CoreModule> moduleList = moduleManager.doFindListByCondition(" module_belong_to_app = ?", objs);
		for (CoreModule coreModule:moduleList) {
			ids = ids + coreModule.getModule_unid()+",";	
			String moduleChildrens = coreModule.getModule_childrens();
			if(!StrUtil.isNull(moduleChildrens)){
				String[] mcArray = moduleChildrens.split(",");
				for (int i = 0; i < mcArray.length; i++) {
					//取出所有的moduleLeaf
					ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(mcArray[i]);
					if(null != moduleLeaf){
						ids = ids + moduleLeaf.getLeaf_unid()+",";
						String leafChildrens = moduleLeaf.getLeaf_childrens();
						if(!StrUtil.isNull(leafChildrens)){
							String[] lcArray = leafChildrens.split(",");
							for (int j = 0; j < lcArray.length; j++) {
								//取出所有的moduleLeaf
								ModuleLeaf moduleLeafChildren = moduleLeafManager.doFindBeanByKey(lcArray[j]);
								if(null != moduleLeafChildren){
									ids = ids + moduleLeafChildren.getLeaf_unid()+",";
								}
							}
						}
					}
				}
			}
		}
		
		return ids;
	}		
}