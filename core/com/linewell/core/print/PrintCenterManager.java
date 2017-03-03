package com.linewell.core.print;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * 系统打印中心数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-06-01 10:45:26
 *
 */
public class PrintCenterManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("APP_PRINTCENTER","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(PrintCenter printCenter){
		return dbObjectManager.doSave(printCenter);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(PrintCenter printCenter){
		return dbObjectManager.doUpdate(printCenter);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public PrintCenter doFindBeanByKey(String keyValue){
		return (PrintCenter)dbObjectManager.doFindBeanByKey(new PrintCenter(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new PrintCenter(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public PrintCenter doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (PrintCenter)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	
	/**
	 * 打印模板绑定	
	 * @param unid 打印模板唯一标识
	 * @param punid 对外关联的唯一标识（一般是审批事项unid）
	 * @return 绑定是否成功： 是 true，否： false
	 */
	public boolean bangding(String unid,String punid){
		boolean flag = true;
		List list = doFindListByCondition(" punid='"+punid+"'",new Object[0]);
		for (int i = 0; i < list.size() ; i++) {
			PrintCenter printCenter = (PrintCenter)list.get(i);
			printCenter.setIsbangding("N");
			flag = flag && doUpdate(printCenter);
		}
		
		PrintCenter printCenter = doFindBeanByKey(unid);
		printCenter.setIsbangding("Y");
		flag = flag && doUpdate(printCenter);
		return flag;
	}
	
	/**
	 * 获取环节打印对象
	 * @param serviceid 审批事项id
	 * @param nodeunid 节点id
	 * @return 打印对象列表
	 */
	public List getDocPrintBtn(String serviceid , String nodeunid){
		List list = doFindListByCondition(" punid='"+serviceid+"' and nodeunid='"+nodeunid+"' and status='Y'",new Object[0]);
		return list;
	}
}