package com.linewell.core.print.printireport;

import java.io.File;
import java.util.List;

import org.apache.log4j.Logger;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * ireport打印方式数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-06-01 14:46:25
 *
 */
public class PrintIreportManager {
	
	private Logger logger = Logger.getLogger(this.getClass());
	
	private DbObjectManager dbObjectManager = new DbObjectManager("APP_PRINTIREPORT","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(PrintIreport printIreport){
		return dbObjectManager.doSave(printIreport);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(PrintIreport printIreport){
		return dbObjectManager.doUpdate(printIreport);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public PrintIreport doFindBeanByKey(String keyValue){
		return (PrintIreport)dbObjectManager.doFindBeanByKey(new PrintIreport(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new PrintIreport(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public PrintIreport doFindBeanByCondition(String condition){
		List list = this.doFindListByCondition(condition, new Object[0]);
		return (null != list && !list.isEmpty()) ? (PrintIreport)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 取出指定目录下的所有ireport文件
	 */
	public File[] getIReportFiles(String filepath){
		File fileDir = new File(filepath);
		if (!fileDir.exists() || !fileDir.isDirectory()) {
			logger.error("["+filepath+"]目录不存在或不是文件夹！");
			return null;
		}
		
		IReportFileFilter filter = new IReportFileFilter();
		return fileDir.listFiles(filter);
	}
}