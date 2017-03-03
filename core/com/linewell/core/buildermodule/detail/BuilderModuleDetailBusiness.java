package com.linewell.core.buildermodule.detail;

import java.util.List;

import com.linewell.core.util.ListUtil;

public class BuilderModuleDetailBusiness {
	
	/**
	 * 指定字段是否存在
	 * @param unid info信息表主键
	 * @param caption 标题（备注）
	 * @return true:存在，false：不存在
	 */
	public boolean captionIsExit(String unid ,String caption){
		BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
		Object[] objs = new Object[2];
		objs[0] =unid;
		objs[1] =caption;
		
		boolean flag = false;
		List list = builderModuleDetailManager.doFindListByCondition(" punid =? and caption=?", objs);
		if(!ListUtil.isNull(list)){
			flag = true;
		}
		return flag;
	}
	
	
	/**
	 * 指定字段是否存在
	 * @param unid info信息表主键
	 * @param caption 标题（备注）
	 * @return true:存在，false：不存在
	 */
	public boolean ennameIsExit(String unid ,String enname){
		BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
		Object[] objs = new Object[2];
		objs[0] =unid;
		objs[1] =enname;
		
		boolean flag = false;
		List list = builderModuleDetailManager.doFindListByCondition(" punid =? and enname=?", objs);
		if(!ListUtil.isNull(list)){
			flag = true;
		}
		return flag;
	}
	
	/**
	 * 指定字段是否存在
	 * @param unid info信息表主键
	 * @param caption 标题（备注）
	 * @return true:存在，false：不存在
	 */
	public boolean detailUnidIsExit(String unid){
		BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
		Object[] objs = new Object[1];
		objs[0] =unid;
		
		boolean flag = false;
		List list = builderModuleDetailManager.doFindListByCondition(" unid =?", objs);
		if(!ListUtil.isNull(list)){
			flag = true;
		}
		return flag;
	}
	
	
	public List getNeedViewList(String unid){
		BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
		Object[] objs = new Object[2];
		objs[0] = unid;
		objs[1] = 1;
		return  builderModuleDetailManager.doFindListByCondition(" punid=? and isshowinview=?", objs);
	}
}
