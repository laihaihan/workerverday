package com.linewell.core.db.test;

import java.util.List;

import com.linewell.core.db.DbObjectManager;


public class BigFieldTestManager {

	private DbObjectManager dbObjectManager = new DbObjectManager("DBTEST","unid","02EA829BF2BA1F4FF0F49145A502C353");

	public boolean doSave(BigFieldTest bigFieldTest){
		return dbObjectManager.doSave(bigFieldTest);
	}
	
	public boolean doUpdate(BigFieldTest bigFieldTest){
		return dbObjectManager.doUpdate(bigFieldTest);
	}
	
	public BigFieldTest doFindBeanByKey(String keyValue){
		return (BigFieldTest)dbObjectManager.doFindBeanByKey(new BigFieldTest(), keyValue);
	}

	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new BigFieldTest(),condition,objs);
	}
}
