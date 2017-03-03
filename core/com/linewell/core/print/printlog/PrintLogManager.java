package com.linewell.core.print.printlog;

import java.sql.Blob;
import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.UNIDGenerate;

/**
 * <p>
 * 数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-06-04 15:41:20
 *
 */
public class PrintLogManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("APP_PRINTLLOG","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(PrintLog printLog){
		return dbObjectManager.doSave(printLog);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(PrintLog printLog){
		return dbObjectManager.doUpdate(printLog);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public PrintLog doFindBeanByKey(String keyValue){
		return (PrintLog)dbObjectManager.doFindBeanByKey(new PrintLog(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new PrintLog(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public PrintLog doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (PrintLog)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 
	 * @param blob 打印单据实体
	 * @param punid  关联办件的unid
	 * @param opuserid 操作者id
	 * @param opusername 操作者姓名
	 * @return 操作是否成功. true:成功，false失败
	 */
	public String addPrintLog(Blob blob ,String punid,String opuserid,String opusername,String printname){		
		PrintLog printLog = new PrintLog();
		printLog.setUnid(new UNIDGenerate().getUnid());
		printLog.setCreatetime(DateTime.getNowDateTime());
		printLog.setFilecontent(blob);
		printLog.setPunid(punid);
		printLog.setOpuserid(opuserid);
		printLog.setOpusername(opusername);
		printLog.setPrintname(printname);
	    doSave(printLog);
	    return printLog.getUnid();
	}
}