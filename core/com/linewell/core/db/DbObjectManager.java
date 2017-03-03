package com.linewell.core.db;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.util.Reflection;
import com.linewell.core.util.StrUtil;

/**
 * <p>
 *  DB操作实体类
 * </p>
 * 
 * @author 文件创建者姓名:张建辉 zjianhui@linewell.com
 * @version 1.0.0 date: 
 * <p>
 * Copyright (c) 09.22 2011 Linewell.com
 * </p>
 */
public class DbObjectManager {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(DbObjectManager.class);
    
	private String TABLENAME;
	private String KEYSTR;
	private String JNDI;
	
	/**
	 * 构造函数
	 * @author zjianhui@linewell.com
	 * @date:  09.22 2011
	 * <p>
	 * @param tablename 表名
	 * @param keyStr  主键名称
	 * @param jndi  数据库链接池上下文
	 * @return 构建后的sql
	 * </p>
	 */
	public DbObjectManager(String tablename,String keyStr,String jndi){
		TABLENAME = tablename.toUpperCase();
		KEYSTR = keyStr.toLowerCase();
		JNDI = jndi;
	}
		
	/**
	 * 构造插入数据库动作
	 * @author zjianhui@linewell.com
	 * @date:  09.22 2011
	 * <p>
	 * @param obj 需要操作的映射数据库对象
	 * @return 构建后的sql
	 * </p>
	 */
	public boolean doSave(Object obj){
		DbObjectBuilder dbObjectBuilder = new DbObjectBuilder();
		String sql = dbObjectBuilder.createDBInsertSql(obj,TABLENAME);
		Object[] params = dbObjectBuilder.createDBInsertParams(obj,TABLENAME);
		
		boolean save_status = false;
		try {
			if(JDBCTool.doSQLUpdate(JNDI,sql,params)){
				save_status = true;
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		return save_status;		
	}
		
	/**
	 * 构造更新数据库动作
	 * @author zjianhui@linewell.com
	 * @date:  09.22 2011
	 * <p>
	 * @param obj 需要操作的映射数据库对象
	 * @return 构建后的sql
	 * </p>
	 */
	public boolean doUpdate(Object obj){
		DbObjectBuilder dbObjectBuilder = new DbObjectBuilder();
		String sql = dbObjectBuilder.createDBUpdateSql(obj,TABLENAME,KEYSTR);
		Object[] params = dbObjectBuilder.createDBUpdateParams(obj, TABLENAME,KEYSTR);
		
		boolean save_status = false;
		try {
			if(JDBCTool.doSQLUpdate(JNDI,sql,params)){
				save_status = true;
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		return save_status;
	}
	
	/**
	 * 构造删除数据库动作
	 * @author zjianhui@linewell.com
	 * @date:  09.22 2011
	 * <p>
	 * @param obj 需要操作的映射数据库对象
	 * @return 构建后的sql
	 * </p>
	 */
	public boolean doDeleteByCondition(String condition,Object... params){
		String sql = "delete from "+ TABLENAME + (!StrUtil.isNull(condition) ? " where " + condition : ""); 		
		boolean save_status = false;
		try {
			if(JDBCTool.doSQLUpdate(JNDI,sql,params)){
				save_status = true;
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		return save_status;
	}
	
	/**
	 * 根据条件唯一定位查询
	 * @author zjianhui@linewell.com
	 * @date: Jul 8, 2011 
	 * <p>
	 * @param UserExtInfo
	 * @param keyValue
	 * @return
	 * </p>
	 */
	public Object doFindBeanByCondition(Object obj,String condition){
		DbObjectBuilder dbObjectBuilder = new DbObjectBuilder();
		String sql = dbObjectBuilder.createDbSelectSql(obj, TABLENAME, null, null);
		sql = sql + (!StrUtil.isNull(condition) ? " and " + condition : "");
		try {
			Object[][] rs = JDBCTool.doSQLQuery(JNDI,sql,null);
			if(null == rs || rs.length < 2){
				return null;
			}
			dbObjectBuilder.createDBObjectBySz(rs, obj);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return obj;
	}
	
	
	/**
	 * 根据unid唯一定位查询
	 * @author zjianhui@linewell.com
	 * @date: Jul 8, 2011 
	 * <p>
	 * @param UserExtInfo
	 * @param keyValue
	 * @return
	 * </p>
	 */
	public Object doFindBeanByKey(Object obj,String keyValue){
		DbObjectBuilder dbObjectBuilder = new DbObjectBuilder();
		String sql = dbObjectBuilder.createDbSelectSql(obj, TABLENAME, KEYSTR, keyValue);
		try {
			Object[][] rs = JDBCTool.doSQLQuery(JNDI,sql,null);
			if(null == rs || rs.length < 2){
				return null;
			}
			dbObjectBuilder.createDBObjectBySz(rs, obj);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return obj;
	}
		
	/**
	 * 调用者构造条件sql
	 * @author zjianhui@linewell.com
	 * @date: Jul 8, 2011 
	 * <p>
	 * @param obj
	 * @param condition sql 条件  例：  field = 'value' and field1 = 'value2'
	 * @return
	 * </p>
	 */
	public List doFindListByCondition(Object obj,String condition,Object... args){
		List list = new ArrayList();
		DbObjectBuilder dbObjectBuilder = new DbObjectBuilder();
		String sql = dbObjectBuilder.createDbSelectSql(obj, TABLENAME, null, null);
		sql = sql + (!StrUtil.isNull(condition) ? " and " + condition : "");
		try {
			Object[][] rs = JDBCTool.doSQLQuery(JNDI,sql,args);
			Object[] objs = new Object[rs.length - 1];
			for (int i = 0; i < objs.length; i++) {
				Reflection reflection = new Reflection();
				try {
					objs[i] = reflection.copy(obj);
				} catch (Exception e) {
				    logger.error(e);
					e.printStackTrace();
				}
			} 
			list = dbObjectBuilder.createDBObjectListBySz(rs, objs);
		} catch (SQLException e) {
		    logger.error(e);
			e.printStackTrace();
		}
		return list;
	}
}