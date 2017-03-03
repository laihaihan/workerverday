package com.linewell.core.log;

import java.util.List;
 
import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.UNIDGenerate;

/**
 * <p>
 * ApasLog数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-04-09 16:35:23
 *
 */
public class LogManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_LOG","UNID",GlobalParameter.APP_CORE);
	/**
	 * 新增
	 */
	public boolean doSave(Log log){
		return dbObjectManager.doSave(log);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Log log){
		return dbObjectManager.doUpdate(log);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Log doFindBeanByKey(String keyValue){
		return (Log)dbObjectManager.doFindBeanByKey(new Log(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public Log doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (Log)list.get(0) : null;
	}
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Log(),condition,objs);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
    /**
     * 日志添加
     * 
     * @param punid		外键关联apas_info.unid
     * @param who		事件发送者
     * @param log_do	事件
     * @return
     */
    public boolean doSave(String punid, String who, String log_do,String log_what){
    	Log log = new Log();
    	log.setUnid(new UNIDGenerate().getUnid());
    	log.setPunid(punid);
    	log.setTarget_unid(punid);
    	log.setWho(who);
    	log.setLog_do(log_do);
    	log.setLog_what(log_what);
    	log.setLog_when(DateTime.getNowDateTime());
        return this.doSave(log);
    }
    public boolean doSave(String unid,String punid, String who, String log_do,String log_what){
    	Log log = new Log();
    	log.setUnid(unid);
    	log.setPunid(punid);
    	log.setTarget_unid(punid);
    	log.setWho(who);
    	log.setLog_do(log_do);
    	log.setLog_what(log_what);
    	log.setLog_when(DateTime.getNowDateTime());
    	return this.doSave(log);
    }
   /**
    * 
    * 功能说明:获取办件作废前的状态
    * @param punid
    * @return
    * String
    * @author chh
    * @May 14, 2012
    */
    public String getOldHandlestate(String punid){
    	String condition =" punid='"+punid+"' and log_do='作废申请'  order by log_when desc";
    	List list =doFindListByCondition(condition,null); 
    	if(null!=list && !list.isEmpty()){
    		Log log =(Log)list.get(0);
    		return log.getLog_what();
    	}
    	return "";
    }
    
}
