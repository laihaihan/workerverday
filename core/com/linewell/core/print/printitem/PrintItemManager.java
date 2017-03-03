package com.linewell.core.print.printitem;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.db.TableBean;
import com.linewell.core.db.TableOpertionTool;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.Reflection;
import com.linewell.core.util.UNIDGenerate;

/**
 * <p>
 * 保留历史域信息数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-06-04 15:41:49
 *
 */
public class PrintItemManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("APP_PRINTITEM","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(PrintItem printItem){
		return dbObjectManager.doSave(printItem);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(PrintItem printItem){
		return dbObjectManager.doUpdate(printItem);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public PrintItem doFindBeanByKey(String keyValue){
		return (PrintItem)dbObjectManager.doFindBeanByKey(new PrintItem(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new PrintItem(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public PrintItem doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (PrintItem)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	
	/**
	 * 反射的bean和动态获取表信息的方式构造存储域日志信息
	 * @param obj 构造类的实例
	 * @param tablename 表名
	 * @param punid 关联打印日志的唯一标识
	 * @return 操作十是否成功： 成功：true,失败:false
	 */
	public boolean addPrintItem(Object obj,String tablename,String punid){
		Reflection rf= new Reflection();
		if(null==obj)return false;
		List setter = rf.getGetterMethodName(obj);
		TableOpertionTool tableOpertionTool = new TableOpertionTool();
		for (int i = 0; i < setter.size(); i++) {
			String tmpStr = (String) setter.get(i);
			TableBean tableBean = tableOpertionTool.getTableColmuns(tablename, tmpStr, GlobalParameter.APP_CORE);
			if(null == tableBean){
				tableBean = new TableBean();
			}
			Object value = jodd.bean.BeanUtil.getProperty(obj, tmpStr.toLowerCase());
			PrintItem printItem = new PrintItem();
			printItem.setUnid(new UNIDGenerate().getUnid());
			printItem.setPunid(punid);
			printItem.setItemvalue(value.toString());
			printItem.setItemname(tableBean.getFieldname());
			printItem.setType(tableBean.getType());
			printItem.setItemmemo(tableBean.getColumns());
			doSave(printItem);
		}
		return false;
	}
	
	public static void main(String[] args) {
		PrintItem printItem = new PrintItem();
		printItem.setItemmemo("sss测试");
		
		Object obj = jodd.bean.BeanUtil.getProperty(printItem, "itemmemo");
		System.out.println(obj);
	}
}