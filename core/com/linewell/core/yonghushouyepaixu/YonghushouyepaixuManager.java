package com.linewell.core.yonghushouyepaixu;

import java.util.List;

import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * 数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-05-12 09:08:54
 * 
 */
class YonghushouyepaixuManager {

    private DbObjectManager dbObjectManager = new DbObjectManager("CORE_USER_PORTLETS", "unid", "3E2592D5DD95DA5C339C0935F7E9DAA8");

    /**
     * 新增
     */
    public boolean doSave(Yonghushouyepaixu yonghushouyepaixu) {
        return dbObjectManager.doSave(yonghushouyepaixu);
    }

    /**
     * 更新
     */
    public boolean doUpdate(Yonghushouyepaixu yonghushouyepaixu) {
        return dbObjectManager.doUpdate(yonghushouyepaixu);
    }

    /**
     * 根据主键找单个对象
     */
    public Yonghushouyepaixu doFindBeanByKey(String keyValue) {
        Object[] objs = new Object[1];
        objs[0] = keyValue;
        return doFindBeanByCondition("unid =?", objs);
    }

    /**
     * 根据主键找单个对象
     */
    public Yonghushouyepaixu doFindBeanByUserID(String keyValue) {
        Object[] objs = new Object[1];
        objs[0] = keyValue;
        return doFindBeanByCondition("userid =?", objs);
    }

    /**
     * 根据条件查找单个对象
     */
    public Yonghushouyepaixu doFindBeanByCondition(String condition, Object[] objs) {
        List list = this.doFindListByCondition(condition, objs);
        return (null != list && !list.isEmpty()) ? (Yonghushouyepaixu) list.get(0) : null;
    }

    /**
     * 自定义条件查询对象列表
     */
    public List doFindListByCondition(String condition, Object[] objs) {
        return dbObjectManager.doFindListByCondition(new Yonghushouyepaixu(), condition, objs);
    }

    /**
     * 根据主键删除单个对象
     */
    public boolean doDeleteByKey(String keyValue) {
        String condition = "unid='" + keyValue + "'";
        return dbObjectManager.doDeleteByCondition(condition);
    }

    /**
     * 根据查询条件删除
     */
    public boolean doDeleteByCondition(String condition, Object[] objs) {
        return dbObjectManager.doDeleteByCondition(condition, objs);
    }
}