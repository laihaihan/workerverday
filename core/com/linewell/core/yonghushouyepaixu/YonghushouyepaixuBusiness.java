package com.linewell.core.yonghushouyepaixu;

import java.util.List;

/**
 * <p>
 * 业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-05-12 09:08:54
 * 
 */
public class YonghushouyepaixuBusiness {

    YonghushouyepaixuManager manager = new YonghushouyepaixuManager();

    /**
     * 新增
     */
    public boolean doSave(Yonghushouyepaixu yonghushouyepaixu) {
        return manager.doSave(yonghushouyepaixu);
    }

    /**
     * 更新
     */
    public boolean doUpdate(Yonghushouyepaixu yonghushouyepaixu) {
        return manager.doUpdate(yonghushouyepaixu);

    }

    /**
     * 根据主键找单个对象
     */
    public Yonghushouyepaixu doFindBeanByKey(String keyValue) {
        return manager.doFindBeanByKey(keyValue);
    }

    /**
     * 根据主键找单个对象
     */
    public Yonghushouyepaixu doFindBeanByUserID(String keyValue) {
        return manager.doFindBeanByUserID(keyValue);
    }

    /**
     * 自定义条件查询对象列表
     */
    public List doFindListByCondition(String condition, Object[] objs) {
        return manager.doFindListByCondition(condition, objs);
    }

    /**
     * 根据主键删除对象
     */
    public boolean doDeleteByCondition(String condition, Object[] objs) {
        return manager.doDeleteByCondition(condition, objs);
    }
}