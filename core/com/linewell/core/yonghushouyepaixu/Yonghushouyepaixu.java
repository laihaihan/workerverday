package com.linewell.core.yonghushouyepaixu;

/**
 * <p>
 * 实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-05-12 09:08:54
 * @version 1.00
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */

public class Yonghushouyepaixu {

    /**
     * 主键
     */
    private String unid          = "";

    /**
     * 用户标识
     */
    private String userid        = "";

    /**
     * 排序
     */
    private String portlets_sort = "";
    
    /**
     * 列宽（百分比）
     */
    private String column_width = "";
    
    /**
     * 所属应用系统
     * @return
     */
    private String belong_to_apps = "";
    

    public String getBelong_to_apps() {
        return belong_to_apps;
    }

    public void setBelong_to_apps(String belong_to_apps) {
        this.belong_to_apps = belong_to_apps;
    }

    public String getColumn_width() {
        return column_width;
    }

    public void setColumn_width(String column_width) {
        this.column_width = column_width;
    }

    /**
     * 获取主键
     * 
     * @return String
     */
    public String getUnid() {
        return unid;
    }

    /**
     * 设置主键
     * 
     * @param unid
     *            String 主键
     */
    public void setUnid(String unid) {
        this.unid = unid;
    }

    /**
     * 获取用户标识
     * 
     * @return String
     */
    public String getUserid() {
        return userid;
    }

    /**
     * 设置用户标识
     * 
     * @param userid
     *            String 用户标识
     */
    public void setUserid(String userid) {
        this.userid = userid;
    }

    /**
     * 获取排序
     * 
     * @return String
     */
    public String getPortlets_sort() {
        return portlets_sort;
    }

    /**
     * 设置排序
     * 
     * @param portlets_sort
     *            String 排序
     */
    public void setPortlets_sort(String portlets_sort) {
        this.portlets_sort = portlets_sort;
    }

}
