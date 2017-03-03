package com.linewell.core.ucap.dept;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.ucap.dept.UcapDept;

public class UcapDeptManager {
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_DEPT", "DEPT_UNID", GlobalParameter.APP_UCAP);

    /**
     * 新增
     */
    public boolean doSave(UcapDept ucapDept) {
        return dbObjectManager.doSave(ucapDept);
    }

    /**
     * 更新
     */
    public boolean doUpdate(UcapDept ucapDept) {
        return dbObjectManager.doUpdate(ucapDept);
    }

    /**
     * 根据条件查找单个对象
     */
    public UcapDept doFindBeanByCondition(String condition, Object[] objs) {
        List list = this.doFindListByCondition(condition, objs);
        return (null != list && !list.isEmpty()) ? (UcapDept) list.get(0) : null;
    }

    /**
     * 自定义条件查询对象列表
     */
    public List doFindListByCondition(String condition, Object[] objs) {
        return dbObjectManager.doFindListByCondition(new UcapDept(), condition, objs);
    }

    /**
     * 根据查询条件删除
     */
    public boolean doDeleteByCondition(String condition, Object[] objs) {
        return dbObjectManager.doDeleteByCondition(condition, objs);
    }
    
    /**
	 * 根据主键找单个对象
	 */
	public UcapDept doFindBeanByKey(String keyValue){
		return (UcapDept)dbObjectManager.doFindBeanByKey(new UcapDept(), keyValue);
	}
}
