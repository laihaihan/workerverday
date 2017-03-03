package com.linewell.core.times;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.util.DateTime;

/**
 * <p>
 * ApasTimes数据库操作
 * </p>
 * 
 * @author:qcongyong email:yesqcy@163.com
 * @version 1.0.0 2011-11-23 17:35:58
 *
 */
public class ApasTimesManager {
	
	private DbObjectManager dbObjectManager = null;

	public ApasTimesManager(String app_unid){
		dbObjectManager = new DbObjectManager("APP_TIMES","UNID",app_unid);
	}

	/**
	 * 新增
	 */
	public boolean doSave(ApasTimes apasTimes){
		return dbObjectManager.doSave(apasTimes);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(ApasTimes apasTimes){
		return dbObjectManager.doUpdate(apasTimes);
	}
	
	/**
	 * 根据主键删除
	 */
	public boolean doDeleteByKey(String keyValue){
		return dbObjectManager.doDeleteByCondition("UNID='"+keyValue+"'");
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据主键查找单个对象
	 */
	public ApasTimes doFindBeanByKey(String keyValue){
		return (ApasTimes)dbObjectManager.doFindBeanByKey(new ApasTimes(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public ApasTimes doFindBeanByCondition(String condition,Object[] params){
		List list = this.doFindListByCondition(condition, params);
		return (null != list && !list.isEmpty()) ? (ApasTimes)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return dbObjectManager.doFindListByCondition(new ApasTimes(), condition, params);
	}

	/**
	 * 根据特殊环节类型查询
	 */
	public List doFindByPunid(String punid){
		return this.doFindListByCondition("punid='"+punid+"'",null);
	}

	/**
	 * 根据punid返回某一审报项目的所有审报项目时间信息
	 * 
	 * @param punid
	 * @param isused
	 * @return ApasTimes
	 */
	public ApasTimes doFindByIsUsed(String punid, String isused) {
		String condition = "punid = '" + punid + "' and isused = '" + isused + "'";
		List list = this.doFindListByCondition(condition, null);
		ApasTimes apasTimes = null;
		if (null != list && list.size() == 1) {
			apasTimes = (ApasTimes) list.get(0);
		}
		return apasTimes;
	}

	/**
	 * 暂停(特殊程序)
	 * 
	 * @param punid  apas_info.unid
	 * @param username  进行暂停操作用户
	 * @param ftype   类别
	 * @param estimate_date   预估结束时间
	 * @return
	 */
	public boolean doStop(String punid,String username,String ftype, String estimate_date){
		this.doRestart(punid,username);
		
		//每次新增都添加一条记录
		ApasTimes apasTimes = new ApasTimes();
		apasTimes.setUnid(new UNIDGenerate().getUnid());
		apasTimes.setPunid(punid);
		apasTimes.setFtype(ftype);
		apasTimes.setSuser(username);
		apasTimes.setSdatetime(DateTime.getNowDateTime());
		apasTimes.setIsused("N");
		apasTimes.setEstimate_date(estimate_date);
		return this.doSave(apasTimes);
	}

	/**
	 * 重启办件
	 * 
	 * @param punid
	 * @param username
	 * @return
	 */
	public boolean doRestart(String punid,String username){
		boolean returnValue = false;
		ApasTimes apasTimes = this.doFindByIsUsed(punid,"N");
		if(null != apasTimes){ //存在则重启
			apasTimes.setEdatetime(DateTime.getNowDateTime());
			apasTimes.setEuser(username);
			apasTimes.setIsused("Y");
			returnValue = this.doUpdate(apasTimes);
		}
		return returnValue;
	}
}