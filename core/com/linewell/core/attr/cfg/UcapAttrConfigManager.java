package com.linewell.core.attr.cfg;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.Reflection;
import com.linewell.core.util.StrUtil;
import com.linewell.core.db.DbObjectBuilder;
import com.linewell.core.db.DbObjectManager;
import com.linewell.core.db.JDBCTool;

/**
 * <p>
 * 数据库操作
 * </p>
 * 
 * @author:cbingcan email:cbingcan@linewell.com
 * @version 1.0.0 2012-10-16 16:32:44
 *
 */
public class UcapAttrConfigManager {
	
	private static final Log logger = LogFactory.getLog(UcapAttrConfigManager.class);
	
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_ATTR_CONFIG","ATTR_CFG_UNID",GlobalParameter.APP_UCAP);
	
	/**
	 * 新增
	 */
	public boolean doSave(UcapAttrConfig ucapAttrConfig){
		return dbObjectManager.doSave(ucapAttrConfig);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UcapAttrConfig ucapAttrConfig){
		return dbObjectManager.doUpdate(ucapAttrConfig);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UcapAttrConfig doFindBeanByKey(String keyValue){
		return (UcapAttrConfig)dbObjectManager.doFindBeanByKey(new UcapAttrConfig(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UcapAttrConfig(),condition,objs);
	}
	
	
	public List doFindListByConditionExceptBlob(String condition,Object[] args){
		List list = new ArrayList();
		DbObjectBuilder dbObjectBuilder = new DbObjectBuilder();
		String sql = "select Attr_cfg_punid,Attr_cfg_file_name,Attr_cfg_created," +
				"Attr_cfg_size,Attr_cfg_belong_to_app,Attr_cfg_isdocsave," +
				"Attr_relsource_unid,Attr_cfg_unid,Attr_cfg_type,Attr_cfg_caption from UCAP_ATTR_CONFIG where 1=1 "; 
		sql = sql + (!StrUtil.isNull(condition) ? " and " + condition : "");
		try {
			Object[][] rs = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,sql,args);
			if(rs.length<2){
				return list;
			}
			for (int i = 1; i < rs.length; i++) {
				UcapAttrConfig uac = new UcapAttrConfig();
				Object[] obj = rs[i];
				uac.setAttr_cfg_punid((String)obj[0]);
				uac.setAttr_cfg_file_name((String)obj[1]);
				uac.setAttr_cfg_created((String)obj[2]);
				uac.setAttr_cfg_size((String)obj[3]);
				uac.setAttr_cfg_belong_to_app((String)obj[4]);
				uac.setAttr_cfg_isdocsave((String)obj[5]);
				uac.setAttr_relsource_unid((String)obj[6]);
				uac.setAttr_cfg_unid((String)obj[7]);
				uac.setAttr_cfg_type((String)obj[8]);
				uac.setAttr_cfg_caption((String)obj[9]);
				list.add(uac);
			} 
		} catch (SQLException e) {
		    logger.error(e);
			e.printStackTrace();
		}
		return list;
	}
	
	
	public boolean doUpdateExceptBlob(String[] params){
		String sql = "update UCAP_ATTR_CONFIG set Attr_cfg_punid=?,Attr_cfg_type=?,Attr_cfg_caption=? where  attr_cfg_unid=? ";
		//Object[] params = dbObjectBuilder.createDBUpdateParams(obj, TABLENAME,KEYSTR);
	 //[360DDBACB66C932F193307D8716D50DC, 会议纪要（空表）.doc, 2013-06-16 01:02:11, 46592, 0659A28480E94DE9E072242AA3523AE4, 1, , oracle.sql.BLOB@1e3260db, 73CC486EDA3479490D1929A3686362BE, 0, 会议纪要（空表）, 73CC486EDA3479490D1929A3686362BE]
		
		boolean save_status = false;
		try {
			if(JDBCTool.doSQLUpdate(GlobalParameter.APP_UCAP,sql,params)){
				save_status = true;
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		return save_status;
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UcapAttrConfig doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UcapAttrConfig)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}