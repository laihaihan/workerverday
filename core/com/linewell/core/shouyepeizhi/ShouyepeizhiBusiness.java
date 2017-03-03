package com.linewell.core.shouyepeizhi;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;

/**
 * <p>
 * 业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-05-08 11:39:43
 * 
 */
public class ShouyepeizhiBusiness {
    private final Logger logger = Logger.getLogger(this.getClass());

    ShouyepeizhiManager manager = new ShouyepeizhiManager();

    /**
     * 新增
     */
    public boolean doSave(Shouyepeizhi shouyepeizhi) {
        return manager.doSave(shouyepeizhi);
    }

    /**
     * 更新
     */
    public boolean doUpdate(Shouyepeizhi shouyepeizhi) {
        return manager.doUpdate(shouyepeizhi);

    }

    /**
     * 根据主键找单个对象
     */
    public Shouyepeizhi doFindBeanByKey(String keyValue) {
        return manager.doFindBeanByKey(keyValue);
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

    /**
     * 查询对应jndi下所有表，并将表名称和字段名称封装成map，再将map以list的方式存储返回
     * 
     * @param jndi
     *            数据库JNDI
     * @return
     */
    public List<Map<String, String>> selectRole(String jndi) {
        List<Map<String, String>> arList = new ArrayList<Map<String, String>>();
        String sql = "SELECT role_unid,role_name FROM UCAP_ROLE WHERE role_belong_to_app='" + jndi + "'";
        try {
            String[][] res = JDBCTool.doSQLQuery("proxool", sql);
            for (int i = 1; i < res.length; i++) {
                Map<String, String> map = new HashMap<String, String>();
                map.put("ROLEUNID",res[i][0] );
                map.put("ROLENAME", res[i][1]);
                arList.add(map);
            }
        } catch (SQLException e) {
            logger.error(e.getMessage());
        }
        return arList;
    }
}