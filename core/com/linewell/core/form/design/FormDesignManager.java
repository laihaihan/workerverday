package com.linewell.core.form.design;

import java.util.List;
import java.util.Map;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;
import com.linewell.core.html.HtmlBean;
import com.linewell.ucap.util.UNIDGenerate;

/**
 * <p>
 * FormDesign数据库操作
 * </p>
 * 
 * @author: email:zjianhui@linewell.com
 * @version 1.0.0 2012-02-14 17:05:28
 *
 */
public class FormDesignManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("FORM_DESIGN","UNID",GlobalParameter.APP_CORE);
	/**
	 * 新增
	 */
	public boolean doSave(FormDesign formDesign){
		return dbObjectManager.doSave(formDesign);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(FormDesign formDesign){
		return dbObjectManager.doUpdate(formDesign);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public FormDesign doFindBeanByKey(String keyValue){
		return (FormDesign)dbObjectManager.doFindBeanByKey(new FormDesign(), keyValue);
	}

	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new FormDesign(),condition,objs);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	
	public String[] createTableAuto(Map map,String punid){
		//对表纵向表res_formdesign添加不存在的记录
		int i = 0;
		java.util.Iterator it = map.entrySet().iterator();
		String[] createTablResDetail = new String[map.size()];
		while (it.hasNext()) {
			java.util.Map.Entry entry = (java.util.Map.Entry) it.next();
			String columnname = entry.getKey().toString();
			HtmlBean htmlBean = (HtmlBean) entry.getValue();
			
			FormDesign formDesign = new FormDesign();
			formDesign.setUnid(new UNIDGenerate().getUnid());
			formDesign.setPunid(punid);
			formDesign.setColumnname(columnname);
			formDesign.setColumntype(htmlBean.getType());
			formDesign.setDefaulvalue(htmlBean.getDefaultValue());
			formDesign.setVerifymodule(htmlBean.getIsmust());
			this.doSave(formDesign);
			i = i + 1;
		}
		return createTablResDetail;
	}
	
}
